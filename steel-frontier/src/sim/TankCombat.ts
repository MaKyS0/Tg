import { Quaternion, Vector3 } from 'three';
import { DEG, RAD, approach, clamp, wrapAngle } from '../core/math';
import { quickElevation, solveElevation, heightAtRange } from './Ballistics';
import type { AmmoData } from '../data/types';
import type { Tank } from './Tank';
import type { World } from './World';

const AFTER_SHOT_BLOOM = 3.2;
const _v = new Vector3();
const _v2 = new Vector3();
const _q = new Quaternion();
const _dir = new Vector3();

/** World elevation angle (rad) needed to hit `target` from `from` with this ammo; null if unreachable. */
export function aimElevation(ammo: AmmoData, from: Vector3, target: Vector3, highArc = false): number | null {
  const dx = target.x - from.x;
  const dz = target.z - from.z;
  const range = Math.sqrt(dx * dx + dz * dz);
  const dy = target.y - from.y;
  if (ammo.gravityScale > 3) return solveElevation(ammo, range, dy, highArc);
  let e = quickElevation(ammo, range, dy);
  // Two correction iterations against the drag-aware trajectory.
  for (let i = 0; i < 2; i++) {
    const r = heightAtRange(ammo, e, range, 8);
    if (!r) break;
    e += Math.atan2(dy - r.y, Math.max(range, 1)) * 0.95;
  }
  return e;
}

/**
 * Turret traverse, gun elevation (with ballistic compensation), dispersion bloom/aim convergence,
 * reload/magazine logic and firing.
 */
export function stepTankCombat(tank: Tank, world: World, dt: number, frozen: boolean): void {
  const st = tank.stats;
  const input = tank.input;
  const prevTurret = tank.turretYaw;

  // Ammo switching: requires reloading the gun.
  if (input.ammoSlot !== null && input.ammoSlot !== tank.selectedAmmo && input.ammoSlot < tank.ammoTypes.length) {
    if (tank.ammoCounts[input.ammoSlot] > 0) {
      tank.selectedAmmo = input.ammoSlot;
      tank.reloadTimer = st.reload;
      tank.magazineLeft = tank.gun.magazine?.size ?? 1;
    }
  }

  // --- Aim ------------------------------------------------------------------
  if (tank.alive && input.aimPoint && !input.lockTurret) {
    tank.aimTarget.copy(input.aimPoint);
    const gunPos = tank.gunWorldPosition(_v);
    const ammo = tank.ammo;
    let elev: number | null;
    const cache = tank.aimCache;
    if (ammo.gravityScale > 3 && cache.ammo === ammo.id && cache.point.distanceToSquared(input.aimPoint) < 1 && world.time - cache.time < 0.4) {
      elev = cache.elevation;
    } else {
      elev = aimElevation(ammo, gunPos, input.aimPoint, false);
      cache.point.copy(input.aimPoint);
      cache.elevation = elev;
      cache.time = world.time;
      cache.ammo = ammo.id;
    }
    const dx = input.aimPoint.x - gunPos.x;
    const dz = input.aimPoint.z - gunPos.z;
    const azimuth = Math.atan2(dx, dz);
    const e = elev ?? 45 * DEG;
    _dir.set(Math.sin(azimuth) * Math.cos(e), Math.sin(e), Math.cos(azimuth) * Math.cos(e));
    // Desired direction expressed in the hull frame.
    _q.copy(tank.quaternion).invert();
    _dir.applyQuaternion(_q);
    let desiredYaw = Math.atan2(_dir.x, _dir.z);
    const desiredPitch = Math.atan2(_dir.y, Math.sqrt(_dir.x * _dir.x + _dir.z * _dir.z));
    const limit = tank.data.traverseLimit * DEG;
    if (tank.data.traverseLimit < 180) desiredYaw = clamp(desiredYaw, -limit, limit);
    const maxStep = st.turretTraverse * dt;
    const diff = wrapAngle(desiredYaw - tank.turretYaw);
    tank.turretYaw = wrapAngle(tank.turretYaw + clamp(diff, -maxStep, maxStep));
    if (tank.data.traverseLimit < 180) tank.turretYaw = clamp(tank.turretYaw, -limit, limit);
    const pitchTarget = clamp(desiredPitch, -tank.gun.depression * DEG, tank.gun.elevation * DEG);
    tank.gunPitch = approach(tank.gunPitch, pitchTarget, st.elevationSpeed * dt);
  }
  tank.turretRate = Math.abs(wrapAngle(tank.turretYaw - prevTurret)) / Math.max(dt, 1e-4);

  // --- Dispersion -------------------------------------------------------------
  const speedKmh = Math.abs(tank.speedLong) * 3.6;
  const hullDeg = Math.abs(tank.yawRate) * RAD;
  const turretDeg = tank.turretRate * RAD;
  const target = st.accuracy * Math.sqrt(
    1 + (st.dispersionMove * speedKmh) ** 2 + (st.dispersionHull * hullDeg) ** 2 + (st.dispersionTurret * turretDeg) ** 2,
  );
  if (target > tank.dispersion) tank.dispersion = target;
  else tank.dispersion = Math.max(target, tank.dispersion * Math.exp(-dt / Math.max(0.2, st.aimTime)));

  // --- Reload ------------------------------------------------------------------
  if (tank.alive && tank.reloadTimer > 0) {
    tank.reloadTimer = Math.max(0, tank.reloadTimer - dt);
  }

  // --- Fire --------------------------------------------------------------------
  if (!tank.alive || frozen || !input.fire || !st.canFire || tank.reloadTimer > 0) return;
  if (tank.ammoCounts[tank.selectedAmmo] <= 0) {
    const alt = tank.ammoCounts.findIndex((c) => c > 0);
    if (alt < 0) return;
    tank.selectedAmmo = alt;
    tank.reloadTimer = st.reload;
    return;
  }
  fire(tank, world);
}

function fire(tank: Tank, world: World): void {
  const ammo = tank.ammo;
  const muzzle = tank.muzzlePosition(new Vector3());
  const dir = tank.gunDirection(new Vector3());
  // Random deviation inside the dispersion cone (truncated normal, ~95% inside the circle).
  const rng = world.rng;
  const radial = tank.dispersion * Math.min(1, Math.abs(rng.gaussian()) / 2);
  const ang = rng.next() * Math.PI * 2;
  const up = Math.abs(dir.y) > 0.95 ? _v2.set(1, 0, 0) : _v2.set(0, 1, 0);
  const side = new Vector3().crossVectors(dir, up).normalize();
  const upv = new Vector3().crossVectors(side, dir).normalize();
  dir.addScaledVector(side, Math.cos(ang) * radial).addScaledVector(upv, Math.sin(ang) * radial).normalize();

  world.projectiles.spawn(tank, ammo, muzzle, dir);
  tank.ammoCounts[tank.selectedAmmo]--;
  tank.battle.shots++;
  tank.battle.shellsUsed[ammo.id] = (tank.battle.shellsUsed[ammo.id] ?? 0) + 1;
  tank.lastShotTime = world.time;
  tank.dispersion *= AFTER_SHOT_BLOOM;
  const mag = tank.gun.magazine;
  if (mag) {
    tank.magazineLeft--;
    if (tank.magazineLeft <= 0) {
      tank.magazineLeft = mag.size;
      tank.reloadTimer = tank.stats.reload;
    } else tank.reloadTimer = mag.interShot;
  } else tank.reloadTimer = tank.stats.reload;
  // Recoil kicks the hull (heavier guns on lighter tanks kick more).
  const kick = (ammo.caliber / 100) * (25000 / tank.stats.mass) * 0.35;
  const rel = tank.turretFrameYaw + tank.gunFrameYaw;
  tank.pitchVel += Math.cos(rel) * kick;
  tank.rollVel += Math.sin(rel) * kick * 0.6;
  world.events.emit('shot', { tank, ammo, pos: muzzle, dir });
}
