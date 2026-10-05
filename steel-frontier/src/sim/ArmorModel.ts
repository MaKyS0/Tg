import { Vector3 } from 'three';
import type { CrewRole, TankData, TurretModule } from '../data/types';
import { DEG } from '../core/math';

/**
 * Geometric armour model shared by ballistics (hit detection), the armour system (penetration) and
 * the renderer (mesh generation), so what you see is exactly what you hit.
 *
 * Tank local frame: +Z forward, +X left, +Y up, origin at ground level under the hull centre.
 */

export type PlateTag =
  | 'upperFront' | 'lowerFront' | 'side' | 'rear' | 'roof' | 'bottom'
  | 'turretFront' | 'turretSide' | 'turretRear' | 'turretRoof' | 'turretRing'
  | 'mantlet' | 'track' | 'screen' | 'cupola' | 'barrel';

export type ComponentFrame = 'hull' | 'turret' | 'gun';
export type ComponentRole = 'main' | 'spaced' | 'external';

export interface Face {
  /** Vertex indices (convex polygon, CCW seen from outside). */
  verts: number[];
  normal: Vector3;
  d: number;
  tag: PlateTag;
  thickness: number;
}

export interface ArmorComponent {
  name: string;
  frame: ComponentFrame;
  role: ComponentRole;
  /** Which tank part a penetration of this component damages internally. */
  part: 'hull' | 'turret' | 'none';
  vertices: Vector3[];
  faces: Face[];
  /** External module destroyed/damaged when this component is struck. */
  module?: 'tracks' | 'gun';
}

export type InternalModuleId = 'engine' | 'ammoRack' | 'fuelTank' | 'gunBreech' | 'turretRing' | 'radio' | 'transmission';

export interface InternalBox {
  id: InternalModuleId | CrewRole;
  kind: 'module' | 'crew';
  frame: ComponentFrame;
  min: Vector3;
  max: Vector3;
}

export interface ArmorLayout {
  components: ArmorComponent[];
  internals: InternalBox[];
  /** Turret ring centre in hull frame. */
  turretPivot: Vector3;
  /** Gun trunnion in turret frame. */
  gunPivot: Vector3;
  barrelLength: number;
  boundingRadius: number;
  hullTop: number;
  turretTop: number;
}

function planeFrom(verts: Vector3[], idx: number[], centroid: Vector3): { normal: Vector3; d: number; verts: number[] } {
  const a = verts[idx[0]];
  const b = verts[idx[1]];
  const c = verts[idx[2]];
  const n = new Vector3().subVectors(b, a).cross(new Vector3().subVectors(c, a)).normalize();
  let order = idx;
  if (n.dot(new Vector3().subVectors(a, centroid)) < 0) {
    n.negate();
    order = [...idx].reverse();
  }
  return { normal: n, d: n.dot(a), verts: order };
}

/**
 * Lofts two convex rings with the same vertex count into a convex polyhedron.
 * Side quad i connects ring edge i -> i+1. Caps are tagged separately.
 */
function loft(ringA: Vector3[], ringB: Vector3[], sideTags: PlateTag[], sideThickness: number[],
  capA: [PlateTag, number], capB: [PlateTag, number]): { vertices: Vector3[]; faces: Face[] } {
  const n = ringA.length;
  const vertices = [...ringA, ...ringB];
  const centroid = new Vector3();
  for (const v of vertices) centroid.add(v);
  centroid.divideScalar(vertices.length);
  const faces: Face[] = [];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const p = planeFrom(vertices, [i, j, n + j, n + i], centroid);
    faces.push({ verts: p.verts, normal: p.normal, d: p.d, tag: sideTags[i], thickness: sideThickness[i] });
  }
  const a = planeFrom(vertices, ringA.map((_, i) => i), centroid);
  faces.push({ verts: a.verts, normal: a.normal, d: a.d, tag: capA[0], thickness: capA[1] });
  const b = planeFrom(vertices, ringB.map((_, i) => n + i), centroid);
  faces.push({ verts: b.verts, normal: b.normal, d: b.d, tag: capB[0], thickness: capB[1] });
  return { vertices, faces };
}

function box(min: Vector3, max: Vector3, tags: { front: PlateTag; side: PlateTag; rear: PlateTag; top: PlateTag; bottom: PlateTag },
  t: { front: number; side: number; rear: number; top: number; bottom: number }): { vertices: Vector3[]; faces: Face[] } {
  // Ring in the X-Y plane at z = max (front) and z = min (rear), lofted along Z.
  const ring = (z: number) => [
    new Vector3(max.x, min.y, z), new Vector3(min.x, min.y, z), new Vector3(min.x, max.y, z), new Vector3(max.x, max.y, z),
  ];
  return loft(ring(min.z), ring(max.z),
    [tags.bottom, tags.side, tags.top, tags.side],
    [t.bottom, t.side, t.top, t.side],
    [tags.rear, t.rear], [tags.front, t.front]);
}

export function buildArmorLayout(tank: TankData, turret: TurretModule, barrelLength: number): ArmorLayout {
  const h = tank.hull;
  const { length: L, width: W, height: H, clearance: C } = h.dims;
  const hw = W / 2;
  const a = h.armor;
  const top = C + H;
  const noseY = C + H * 0.42;
  const lowerRun = Math.min((noseY - C) * Math.tan(h.angles.lowerFront * DEG), L * 0.18);
  const upperRun = Math.min((top - noseY) * Math.tan(h.angles.upperFront * DEG), L * 0.32);
  // Side profile (z, y) going around; lofted along X from +hw to -hw.
  const style = tank.style;
  const slopedRear = style?.hullRear === 'sloped';
  const profile: Array<[number, number]> = [
    [slopedRear ? -L / 2 + L * 0.05 : -L / 2, C], // rear bottom
    [L / 2 - lowerRun, C], // front bottom
    [L / 2, noseY], // nose
    [L / 2 - upperRun, top], // front roof edge
    [slopedRear ? -L / 2 + L * 0.06 : -L / 2 + 0.15, top], // rear roof edge
  ];
  const tags: PlateTag[] = ['bottom', 'lowerFront', 'upperFront', 'roof', 'rear'];
  const thick = [a.bottom, a.lowerFront, a.upperFront, a.roof, a.rear];
  if (slopedRear) {
    // Angled upper rear plate over a short vertical lower one.
    profile.push([-L / 2, C + H * 0.45]);
    tags.push('rear');
    thick.push(a.rear);
  }
  const ringL = profile.map(([z, y]) => new Vector3(hw * 0.86, y, z));
  const ringR = profile.map(([z, y]) => new Vector3(-hw * 0.86, y, z));
  const hull = loft(ringL, ringR, tags, thick, ['side', a.side], ['side', a.side]);

  const components: ArmorComponent[] = [
    { name: 'hull', frame: 'hull', role: 'main', part: 'hull', vertices: hull.vertices, faces: hull.faces },
  ];

  // Tracks (spaced armour that also gets immobilised).
  const tw = h.trackWidth;
  const trackTop = C + H * 0.35;
  for (const side of [1, -1]) {
    const xOuter = side * hw;
    const xInner = side * (hw - tw);
    const tb = box(
      new Vector3(Math.min(xOuter, xInner), 0, -L / 2 - 0.05),
      new Vector3(Math.max(xOuter, xInner), trackTop, L / 2 - 0.05),
      { front: 'track', side: 'track', rear: 'track', top: 'track', bottom: 'track' },
      { front: h.trackArmor, side: h.trackArmor, rear: h.trackArmor, top: h.trackArmor, bottom: h.trackArmor },
    );
    components.push({ name: side > 0 ? 'trackL' : 'trackR', frame: 'hull', role: 'spaced', part: 'none', module: 'tracks', ...tb });
    if (h.screens > 0) {
      const sx = side * (hw + 0.08);
      const sb = box(
        new Vector3(Math.min(sx, sx + side * 0.03), C + 0.05, -L * 0.42),
        new Vector3(Math.max(sx, sx + side * 0.03), top - 0.05, L * 0.4),
        { front: 'screen', side: 'screen', rear: 'screen', top: 'screen', bottom: 'screen' },
        { front: h.screens, side: h.screens, rear: h.screens, top: h.screens, bottom: h.screens },
      );
      components.push({ name: side > 0 ? 'screenL' : 'screenR', frame: 'hull', role: 'spaced', part: 'none', ...sb });
    }
  }

  // Turret / casemate: plan-view ring (x, z) at base, tapered ring at top.
  const s = turret.shape;
  const ta = turret.armor;
  const tl = s.length;
  const twid = s.width / 2;
  const cheek = Math.min(tl * 0.35, Math.tan(s.frontAngle * DEG) * twid * 0.8);
  let turretKind = style?.turret ?? 'welded';
  if (!tank.hasTurret && (turretKind === 'cast' || turretKind === 'wedge')) turretKind = 'welded';
  let frontHalf = twid * 0.62;
  let plan: Array<[number, number]>;
  let planTags: PlateTag[];
  let planThick: number[];
  let slope = s.slope;
  const edgeTag = (p: [number, number], q: [number, number]): PlateTag => {
    const mz = (p[1] + q[1]) / 2;
    return mz > tl * 0.18 ? 'turretFront' : mz < -tl * 0.3 ? 'turretRear' : 'turretSide';
  };
  const tagThick = (t: PlateTag) => (t === 'turretFront' ? ta.front : t === 'turretRear' ? ta.rear : ta.side);
  if (turretKind === 'cast') {
    // Rounded cast turret: egg-shaped plan, narrower toward the gun, strongly tapered walls.
    plan = [];
    const n = 12;
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2 + Math.PI / n;
      const sz = Math.sin(ang);
      plan.push([Math.cos(ang) * twid * (1 - 0.22 * Math.max(0, sz)), sz * tl / 2]);
    }
    plan.reverse();
    frontHalf = twid * 0.5;
    slope = Math.max(slope, 0.26);
  } else if (turretKind === 'wedge') {
    plan = [[twid * 0.3, tl / 2], [twid, tl * 0.02], [twid * 0.84, -tl / 2], [-twid * 0.84, -tl / 2], [-twid, tl * 0.02], [-twid * 0.3, tl / 2]];
    frontHalf = twid * 0.45;
    slope = Math.max(slope, 0.2);
  } else if (turretKind === 'box') {
    const ch = Math.min(0.18, tl * 0.08);
    plan = [[twid * 0.88, tl / 2], [twid, tl / 2 - ch], [twid, -tl / 2], [-twid, -tl / 2], [-twid, tl / 2 - ch], [-twid * 0.88, tl / 2]];
    frontHalf = twid * 0.8;
    slope = Math.min(slope, 0.07);
  } else {
    plan = [[frontHalf, tl / 2], [twid, tl / 2 - cheek], [twid * 0.92, -tl / 2], [-twid * 0.92, -tl / 2], [-twid, tl / 2 - cheek], [-frontHalf, tl / 2]];
  }
  if (turretKind === 'welded' || turretKind === 'wedge' || turretKind === 'box') {
    planTags = ['turretFront', 'turretSide', 'turretRear', 'turretSide', 'turretFront', 'turretFront'];
  } else {
    planTags = plan.map((p, i) => edgeTag(p, plan[(i + 1) % plan.length]));
  }
  planThick = planTags.map(tagThick);
  const tBase = 0;
  const tTop = s.height;
  const k = 1 - slope;
  const ringBase = plan.map(([x, z]) => new Vector3(x, tBase, z));
  const ringTop = plan.map(([x, z]) => new Vector3(x * k, tTop, z * k));
  const tur = loft(ringBase, ringTop, planTags, planThick, ['turretRing', ta.side], ['turretRoof', ta.roof]);
  components.push({ name: 'turret', frame: 'turret', role: 'main', part: 'turret', vertices: tur.vertices, faces: tur.faces });
  if (tank.hasTurret && style?.bustle) {
    // Rear bustle (ammo/radio stowage) overhanging the engine deck.
    const bl = tl * 0.26;
    const bw = twid * 0.72 * (turretKind === 'cast' ? 0.85 : 1);
    const bust = box(
      new Vector3(-bw, tTop * 0.22, -tl / 2 - bl), new Vector3(bw, tTop * 0.86, -tl / 2 + tl * 0.12),
      { front: 'turretRear', side: 'turretSide', rear: 'turretRear', top: 'turretRoof', bottom: 'turretRear' },
      { front: ta.rear, side: Math.round(ta.side * 0.8), rear: ta.rear, top: ta.roof, bottom: ta.rear },
    );
    components.push({ name: 'bustle', frame: 'turret', role: 'main', part: 'turret', ...bust });
  }

  const turretPivot = new Vector3(0, top - 0.02, s.offsetZ);
  const gunPivot = new Vector3(0, s.height * 0.45, tl / 2 - 0.1);

  // Gun mantlet (in gun frame so it follows elevation) and barrel.
  const mw = Math.max(0.5, frontHalf * 1.1);
  const mh = Math.max(0.35, s.height * 0.42);
  const mant = box(
    new Vector3(-mw / 2, -mh / 2, -0.05), new Vector3(mw / 2, mh / 2, 0.28),
    { front: 'mantlet', side: 'mantlet', rear: 'mantlet', top: 'mantlet', bottom: 'mantlet' },
    { front: ta.mantlet, side: ta.mantlet * 0.6, rear: ta.mantlet, top: ta.mantlet * 0.5, bottom: ta.mantlet * 0.5 },
  );
  components.push({ name: 'mantlet', frame: 'gun', role: 'spaced', part: 'none', ...mant });
  const br = Math.max(0.06, tank.modules.gun[0].caliber / 1000);
  const barrel = box(
    new Vector3(-br, -br, 0.25), new Vector3(br, br, barrelLength),
    { front: 'barrel', side: 'barrel', rear: 'barrel', top: 'barrel', bottom: 'barrel' },
    { front: 15, side: 15, rear: 15, top: 15, bottom: 15 },
  );
  components.push({ name: 'barrel', frame: 'gun', role: 'external', part: 'none', module: 'gun', ...barrel });

  // Commander cupola: classic weak spot on the turret roof.
  if (tank.hasTurret && tank.tier >= 3) {
    const cr = Math.min(0.35, twid * 0.3);
    const cz = -tl * 0.15;
    const cx = twid * 0.35;
    const cup = box(
      new Vector3(cx - cr, tTop - 0.02, cz - cr), new Vector3(cx + cr, tTop + 0.28, cz + cr),
      { front: 'cupola', side: 'cupola', rear: 'cupola', top: 'cupola', bottom: 'cupola' },
      { front: Math.round(ta.side * 0.55), side: Math.round(ta.side * 0.55), rear: Math.round(ta.side * 0.5), top: ta.roof, bottom: ta.roof },
    );
    components.push({ name: 'cupola', frame: 'turret', role: 'main', part: 'turret', ...cup });
  }

  // Internal modules & crew (axis-aligned boxes).
  const ib = (id: InternalBox['id'], kind: InternalBox['kind'], frame: ComponentFrame, min: [number, number, number], max: [number, number, number]): InternalBox =>
    ({ id, kind, frame, min: new Vector3(...min), max: new Vector3(...max) });
  const innerW = hw * 0.8;
  const internals: InternalBox[] = [
    ib('engine', 'module', 'hull', [-innerW * 0.7, C + 0.05, -L / 2 + 0.2], [innerW * 0.7, C + H * 0.75, -L / 2 + L * 0.28]),
    ib('fuelTank', 'module', 'hull', [innerW * 0.55, C + 0.05, -L * 0.22], [innerW, C + H * 0.8, L * 0.05]),
    ib('ammoRack', 'module', 'hull', [-innerW, C + 0.05, -L * 0.2], [-innerW * 0.45, C + H * 0.6, L * 0.12]),
    ib('transmission', 'module', 'hull', [-innerW * 0.6, C + 0.05, L / 2 - lowerRun - 0.6], [innerW * 0.6, C + H * 0.45, L / 2 - lowerRun]),
    ib('turretRing', 'module', 'hull', [-twid * 0.8, top - 0.25, s.offsetZ - tl * 0.4], [twid * 0.8, top, s.offsetZ + tl * 0.4]),
    ib('driver', 'crew', 'hull', [0.05, C + 0.1, L / 2 - upperRun - 0.9], [innerW * 0.75, C + H * 0.85, L / 2 - upperRun * 0.3]),
    ib('radio', 'module', 'turret', [-twid * 0.7, 0.1, -tl / 2 + 0.05], [twid * 0.7, s.height * 0.6, -tl / 2 + 0.45]),
    ib('gunBreech', 'module', 'turret', [-0.3, s.height * 0.2, -tl * 0.05], [0.3, s.height * 0.7, tl / 2 - 0.1]),
    ib('gunner', 'crew', 'turret', [-twid * 0.85, 0.0, -tl * 0.15], [-0.32, s.height * 0.8, tl * 0.3]),
    ib('commander', 'crew', 'turret', [0.32, 0.0, -tl * 0.35], [twid * 0.85, s.height * 0.9, 0.0]),
    ib('loader', 'crew', 'turret', [0.32, 0.0, 0.0], [twid * 0.85, s.height * 0.8, tl * 0.35]),
  ];
  if (tank.crew.includes('radioman')) {
    internals.push(ib('radioman', 'crew', 'hull', [-innerW * 0.75, C + 0.1, L / 2 - upperRun - 0.9], [-0.05, C + H * 0.85, L / 2 - upperRun * 0.3]));
  }

  const boundingRadius = Math.sqrt((L / 2 + 0.5) ** 2 + hw * hw + (top + s.height + 0.5) ** 2) + Math.max(0, barrelLength - L / 2);
  return {
    components,
    internals: internals.filter((b) => b.kind === 'module' || tank.crew.includes(b.id as CrewRole)),
    turretPivot,
    gunPivot,
    barrelLength,
    boundingRadius,
    hullTop: top,
    turretTop: top + s.height,
  };
}

/** Ray vs convex component. Returns entry distance & face (or null). Origin inside → null (handled by caller). */
export function rayComponent(c: ArmorComponent, o: Vector3, d: Vector3, maxT: number): { tIn: number; tOut: number; face: Face } | null {
  let tIn = -Infinity;
  let tOut = Infinity;
  let entry: Face | null = null;
  for (const f of c.faces) {
    const denom = f.normal.dot(d);
    const dist = f.d - f.normal.dot(o);
    if (Math.abs(denom) < 1e-9) {
      if (dist < 0) return null;
      continue;
    }
    const t = dist / denom;
    if (denom < 0) {
      if (t > tIn) {
        tIn = t;
        entry = f;
      }
    } else if (t < tOut) tOut = t;
    if (tIn > tOut) return null;
  }
  if (!entry || tIn < 0 || tIn > maxT) return null;
  return { tIn, tOut, face: entry };
}

export function rayBox(min: Vector3, max: Vector3, o: Vector3, d: Vector3, maxT: number): number {
  let tmin = 0;
  let tmax = maxT;
  for (const k of ['x', 'y', 'z'] as const) {
    if (Math.abs(d[k]) < 1e-9) {
      if (o[k] < min[k] || o[k] > max[k]) return -1;
      continue;
    }
    let t1 = (min[k] - o[k]) / d[k];
    let t2 = (max[k] - o[k]) / d[k];
    if (t1 > t2) [t1, t2] = [t2, t1];
    tmin = Math.max(tmin, t1);
    tmax = Math.min(tmax, t2);
    if (tmin > tmax) return -1;
  }
  return tmin;
}
