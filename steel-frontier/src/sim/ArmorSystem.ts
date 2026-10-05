import { Quaternion, Vector3 } from 'three';
import { AMMO_KINDS, HEAT_LOSS_PER_METER } from '../data/ammo';
import type { AmmoData, CrewRole } from '../data/types';
import { RAD, DEG, clamp } from '../core/math';
import type { Random } from '../core/Random';
import { rayBox, rayComponent, type ArmorComponent, type ComponentFrame, type PlateTag } from './ArmorModel';
import type { ModuleId, Tank } from './Tank';

export type HitKind = 'penetration' | 'ricochet' | 'noPenetration' | 'heSplash' | 'critical' | 'miss';

export interface ModuleHit {
  id: ModuleId;
  damage: number;
}

export interface HitResult {
  kind: HitKind;
  damage: number;
  point: Vector3;
  normal: Vector3;
  plate: PlateTag | null;
  angle: number; // deg
  thickness: number; // nominal mm
  effective: number; // mm along the shell path
  penetration: number; // shell penetration at impact
  modules: ModuleHit[];
  crew: CrewRole[];
  /** World-space direction after ricochet. */
  ricochetDir: Vector3 | null;
  /** Shell distance travelled to the first armour contact along the ray. */
  t: number;
  fireChance: number;
}

/** Kinetic penetration falls with velocity (de Marre style); chemical/explosive rounds are constant. */
export function penetrationAtVelocity(ammo: AmmoData, velocity: number): number {
  const exp = AMMO_KINDS[ammo.kind].velocityPenExponent;
  if (exp <= 0) return ammo.penetration;
  return ammo.penetration * Math.pow(clamp(velocity / ammo.velocity, 0.05, 1.2), exp);
}

/** Normalization incl. the overmatch bonus (caliber > 2× armour). */
export function effectiveNormalization(ammo: AmmoData, thickness: number): number {
  let n = ammo.normalization;
  if (n > 0 && ammo.caliber > 2 * thickness) n *= (1.4 * ammo.caliber) / (2 * thickness);
  return n;
}

export function isOvermatch(ammo: AmmoData, thickness: number): boolean {
  return ammo.caliber > 3 * thickness;
}

/** Effective thickness and ricochet decision for one plate. */
export function plateInteraction(ammo: AmmoData, thickness: number, angleDeg: number): { effective: number; ricochet: boolean; normAngle: number } {
  const overmatch = isOvermatch(ammo, thickness);
  const ricochet = ammo.kind !== 'HE' && !overmatch && angleDeg > ammo.ricochetAngle;
  const norm = effectiveNormalization(ammo, thickness);
  const a = Math.max(0, angleDeg - norm);
  const effective = thickness / Math.max(0.05, Math.cos(a * DEG));
  return { effective, ricochet, normAngle: Math.min(norm, angleDeg) };
}

interface FrameXform {
  pos: Vector3;
  quat: Quaternion;
  inv: Quaternion;
}

const _o = new Vector3();
const _d = new Vector3();
const _tmp = new Vector3();

/** Computes the world transforms of hull / turret / gun frames of a tank. */
export function tankFrames(tank: Tank): Record<ComponentFrame, FrameXform> {
  const hullQ = tank.quaternion.clone();
  const turQ = tank.turretQuaternion(new Quaternion());
  const gunQ = tank.gunQuaternion(new Quaternion());
  const turPos = tank.turretWorldPosition(new Vector3());
  const gunPos = tank.gunWorldPosition(new Vector3());
  return {
    hull: { pos: tank.position.clone(), quat: hullQ, inv: hullQ.clone().invert() },
    turret: { pos: turPos, quat: turQ, inv: turQ.clone().invert() },
    gun: { pos: gunPos, quat: gunQ, inv: gunQ.clone().invert() },
  };
}

interface ComponentHit {
  comp: ArmorComponent;
  tIn: number;
  tOut: number;
  normalLocal: Vector3;
  thickness: number;
  tag: PlateTag;
  frame: FrameXform;
}

function collectHits(tank: Tank, frames: Record<ComponentFrame, FrameXform>, origin: Vector3, dir: Vector3, maxT: number): ComponentHit[] {
  const hits: ComponentHit[] = [];
  for (const comp of tank.layout.components) {
    const fr = frames[comp.frame];
    _o.copy(origin).sub(fr.pos).applyQuaternion(fr.inv);
    _d.copy(dir).applyQuaternion(fr.inv);
    const h = rayComponent(comp, _o, _d, maxT);
    if (h) hits.push({ comp, tIn: h.tIn, tOut: h.tOut, normalLocal: h.face.normal, thickness: h.face.thickness, tag: h.face.tag, frame: fr });
  }
  hits.sort((a, b) => a.tIn - b.tIn);
  return hits;
}

/** Quick test whether a ray hits any armour component (used by AI/aim raycasts). */
export function rayHitsTank(tank: Tank, origin: Vector3, dir: Vector3, maxT: number): number {
  _tmp.copy(tank.position).sub(origin);
  const along = _tmp.dot(dir);
  const r = tank.layout.boundingRadius;
  if (along < -r || along > maxT + r) return -1;
  const perp2 = _tmp.lengthSq() - along * along;
  if (perp2 > r * r) return -1;
  const frames = tankFrames(tank);
  const hits = collectHits(tank, frames, origin, dir, maxT);
  return hits.length ? hits[0].tIn : -1;
}

function emptyResult(): HitResult {
  return {
    kind: 'miss', damage: 0, point: new Vector3(), normal: new Vector3(), plate: null, angle: 0, thickness: 0, effective: 0,
    penetration: 0, modules: [], crew: [], ricochetDir: null, t: 0, fireChance: 0,
  };
}

/**
 * Full shell-vs-tank interaction: walks armour components in order along the shell path, applying
 * ricochet, normalization, overmatch, spaced armour, HEAT jet decay and HE splash rules, then traces
 * the post-penetration path through internal modules and crew.
 */
export function resolveShellHit(tank: Tank, origin: Vector3, dir: Vector3, maxT: number, ammo: AmmoData, velocity: number, rng: Random): HitResult {
  const result = emptyResult();
  const frames = tankFrames(tank);
  const hits = collectHits(tank, frames, origin, dir, maxT);
  if (hits.length === 0) return result;

  let pen = penetrationAtVelocity(ammo, velocity) * rng.range(0.92, 1.08);
  result.penetration = Math.round(pen);
  const firstT = hits[0].tIn;
  result.t = firstT;
  let firstContact = true;
  let prevExit = -1;

  for (const h of hits) {
    const comp = h.comp;
    const localDir = _d.copy(dir).applyQuaternion(h.frame.inv);
    const cos = -localDir.dot(h.normalLocal);
    const angle = Math.acos(clamp(cos, -1, 1)) * RAD;
    const worldPoint = origin.clone().addScaledVector(dir, h.tIn);
    const worldNormal = h.normalLocal.clone().applyQuaternion(h.frame.quat);

    if (comp.role === 'external') {
      // Barrel: chance to damage the gun, shell continues.
      if (rng.chance(ammo.kind === 'HE' ? 0.8 : 0.45)) result.modules.push({ id: 'gun', damage: ammo.damage * 0.5 });
      if (firstContact) {
        result.point.copy(worldPoint);
        result.normal.copy(worldNormal);
        result.plate = h.tag;
      }
      if (ammo.kind === 'HE') {
        result.kind = 'critical';
        return result;
      }
      continue;
    }

    // The HEAT jet loses penetration over the air gap since the previous plate (spaced armour).
    if (ammo.kind === 'HEAT' && prevExit >= 0) pen *= Math.max(0, 1 - HEAT_LOSS_PER_METER * Math.max(0, h.tIn - prevExit));
    const plate = plateInteraction(ammo, h.thickness, angle);
    if (firstContact || comp.role === 'main') {
      result.point.copy(worldPoint);
      result.normal.copy(worldNormal);
      result.plate = h.tag;
      result.angle = angle;
      result.thickness = h.thickness;
      result.effective = Math.round(plate.effective);
    }

    if (ammo.kind === 'HE') {
      // HE detonates on first contact.
      if (comp.role === 'main' && pen >= plate.effective) {
        result.kind = 'penetration';
        result.damage = Math.round(ammo.damage * rng.range(0.85, 1.15));
        traceInternals(tank, frames, worldPoint, dir, 2.0, ammo, result, rng, 1.2);
      } else {
        // Splash: armour thickness under the blast absorbs damage; spaced armour absorbs most of it.
        let armour = h.thickness;
        if (comp.role === 'spaced') {
          const behind = hits.find((x) => x.comp.role === 'main' && x.tIn > h.tIn);
          armour = h.thickness * 2 + (behind ? behind.thickness : h.thickness);
          if (comp.module === 'tracks') result.modules.push({ id: 'tracks', damage: ammo.damage * 0.9 });
        }
        const radiusFactor = ammo.explosionRadius > 2 ? 1.25 : 1;
        result.damage = Math.max(0, Math.round((ammo.damage * 0.5 - armour * 1.1) * radiusFactor * rng.range(0.9, 1.1)));
        result.kind = 'heSplash';
        if (h.tag === 'lowerFront' || h.tag === 'side') result.modules.push({ id: 'tracks', damage: ammo.damage * 0.3 });
        result.fireChance = 0.02;
      }
      return result;
    }

    if (plate.ricochet) {
      result.kind = firstContact ? 'ricochet' : 'noPenetration';
      const n = worldNormal;
      result.ricochetDir = dir.clone().addScaledVector(n, -2 * dir.dot(n)).normalize();
      return result;
    }
    if (pen < plate.effective) {
      result.kind = 'noPenetration';
      if (comp.module === 'tracks') {
        result.modules.push({ id: 'tracks', damage: ammo.damage * 0.8 });
        result.kind = 'critical';
      }
      return result;
    }
    // Plate penetrated.
    pen -= plate.effective;
    firstContact = false;
    prevExit = Math.max(prevExit, h.tIn + Math.min(0.15, h.tOut - h.tIn));
    if (comp.role === 'spaced') {
      if (comp.module === 'tracks') result.modules.push({ id: 'tracks', damage: ammo.damage * 0.6 });
      continue;
    }
    // Main armour penetrated: shell enters the fighting compartment.
    result.kind = 'penetration';
    result.damage = Math.round(ammo.damage * rng.range(0.85, 1.15));
    const inner = dir.clone();
    if (plate.normAngle > 0) {
      // Rotate the path toward the inward plate normal.
      const inward = worldNormal.clone().negate();
      inner.lerp(inward, Math.sin(plate.normAngle * DEG)).normalize();
    }
    const depth = Math.min(4, Math.max(0.6, h.tOut - h.tIn));
    traceInternals(tank, frames, worldPoint, inner, depth, ammo, result, rng, 1);
    return result;
  }
  // Only external parts were struck.
  result.kind = result.modules.length ? 'critical' : 'miss';
  return result;
}

function traceInternals(tank: Tank, frames: Record<ComponentFrame, FrameXform>, point: Vector3, dir: Vector3, depth: number,
  ammo: AmmoData, result: HitResult, rng: Random, damageMul: number): void {
  const isHe = ammo.kind === 'HE';
  for (const box of tank.layout.internals) {
    const fr = frames[box.frame];
    _o.copy(point).sub(fr.pos).applyQuaternion(fr.inv);
    _d.copy(dir).applyQuaternion(fr.inv);
    let hit = rayBox(box.min, box.max, _o, _d, depth) >= 0;
    if (!hit && isHe) {
      // HE fragments: anything within the blast radius of the entry point.
      const cx = (box.min.x + box.max.x) / 2 - _o.x;
      const cy = (box.min.y + box.max.y) / 2 - _o.y;
      const cz = (box.min.z + box.max.z) / 2 - _o.z;
      hit = Math.sqrt(cx * cx + cy * cy + cz * cz) < ammo.explosionRadius;
    }
    if (!hit) continue;
    if (box.kind === 'crew') {
      if (rng.chance(isHe ? 0.6 : 0.45)) result.crew.push(box.id as CrewRole);
    } else {
      const id = box.id === 'gunBreech' ? 'gun' : (box.id as ModuleId);
      result.modules.push({ id, damage: ammo.damage * rng.range(0.5, 1.0) * damageMul });
      if (id === 'engine') result.fireChance = Math.max(result.fireChance, tank.engine.fireChance);
      if (id === 'fuelTank') result.fireChance = Math.max(result.fireChance, 0.3);
    }
  }
}

/** Non-destructive estimate for HUD penetration indicator and AI ammo choice. */
export function previewShot(tank: Tank, origin: Vector3, dir: Vector3, maxT: number, ammo: AmmoData, velocity: number): {
  hit: boolean; effective: number; penetration: number; ricochet: boolean; angle: number; plate: PlateTag | null;
} {
  const frames = tankFrames(tank);
  const hits = collectHits(tank, frames, origin, dir, maxT);
  const pen = penetrationAtVelocity(ammo, velocity);
  let effective = 0;
  let firstT = -1;
  for (const h of hits) {
    if (h.comp.role === 'external') continue;
    if (firstT < 0) firstT = h.tIn;
    const localDir = _d.copy(dir).applyQuaternion(h.frame.inv);
    const angle = Math.acos(clamp(-localDir.dot(h.normalLocal), -1, 1)) * RAD;
    const plate = plateInteraction(ammo, h.thickness, angle);
    if (ammo.kind === 'HE') {
      return { hit: true, effective: plate.effective, penetration: pen, ricochet: false, angle, plate: h.tag };
    }
    effective += plate.effective;
    if (ammo.kind === 'HEAT' && h.comp.role === 'spaced') effective += pen * HEAT_LOSS_PER_METER * 0.3;
    if (plate.ricochet && effective === plate.effective) {
      return { hit: true, effective, penetration: pen, ricochet: true, angle, plate: h.tag };
    }
    if (h.comp.role === 'main') return { hit: true, effective, penetration: pen, ricochet: false, angle, plate: h.tag };
  }
  return { hit: false, effective: 0, penetration: pen, ricochet: false, angle: 0, plate: null };
}
