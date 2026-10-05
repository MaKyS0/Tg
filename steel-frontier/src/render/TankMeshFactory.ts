import {
  BufferAttribute, BufferGeometry, Color, Group, Mesh, MeshStandardMaterial, Vector2, Vector3, type Material,
} from 'three';
import type { ArmorComponent } from '../sim/ArmorModel';
import type { Tank } from '../sim/Tank';
import type { NationData, TankStyle } from '../data/types';
import { DEG } from '../core/math';
import { Random } from '../core/Random';
import { geo, merge, place, srgb } from './geometry';
import { TextureFactory } from './TextureFactory';

export interface TankParts {
  root: Group;
  hull: Group;
  turret: Group;
  gun: Group;
  barrel: Group;
  trackL: Mesh;
  trackR: Mesh;
  bodyMeshes: Mesh[];
  lod: { root: Group; hull: Group; turret: Group; gun: Group };
}

interface SharedMaterials {
  camo: MeshStandardMaterial;
  metal: MeshStandardMaterial;
  rubber: MeshStandardMaterial;
  burnt: MeshStandardMaterial;
}

interface TankGeometries {
  hull: BufferGeometry;
  hullMetal: BufferGeometry;
  turret: BufferGeometry;
  turretMetal: BufferGeometry;
  gun: BufferGeometry;
  gunMetal: BufferGeometry;
  mantlet: BufferGeometry;
  track: BufferGeometry;
  lodHull: BufferGeometry;
  lodTurret: BufferGeometry;
  lodGun: BufferGeometry;
}

const materialCache = new Map<string, SharedMaterials>();
const geometryCache = new Map<string, TankGeometries>();
const burntMaterial = new MeshStandardMaterial({ color: srgb('#1f1c1a'), roughness: 1, metalness: 0.2 });
const rubberMaterial = new MeshStandardMaterial({ color: srgb('#1b1a19'), roughness: 0.95, metalness: 0, vertexColors: true });

export function nationMaterials(n: NationData, pattern: TankStyle['camo'] = 'blotch'): SharedMaterials {
  const key = `${n.id}|${pattern}`;
  let m = materialCache.get(key);
  if (!m) {
    const camo = new MeshStandardMaterial({
      map: TextureFactory.camo(n.colors.base, n.colors.dark, n.colors.light, n.id.length * 101 + n.id.charCodeAt(0), pattern),
      normalMap: TextureFactory.armorNormal(),
      normalScale: new Vector2(0.7, 0.7),
      roughnessMap: TextureFactory.armorRoughness(),
      aoMap: TextureFactory.armorAO(),
      aoMapIntensity: 0.8,
      roughness: 0.82,
      metalness: 0.35,
      vertexColors: true,
    });
    const metal = new MeshStandardMaterial({
      color: srgb('#3d3b38'), roughness: 0.55, metalness: 0.75, roughnessMap: TextureFactory.armorRoughness(), aoMap: TextureFactory.armorAO(), aoMapIntensity: 0.5, vertexColors: true,
    });
    m = { camo, metal, rubber: rubberMaterial, burnt: burntMaterial };
    materialCache.set(key, m);
  }
  return m;
}

/** Triangulated, flat-shaded geometry of a convex armour component with planar per-face UVs. */
function componentGeometry(c: ArmorComponent, uvScale = 0.5): BufferGeometry {
  const pos: number[] = [];
  const nor: number[] = [];
  const uv: number[] = [];
  const t = new Vector3();
  const b = new Vector3();
  for (const f of c.faces) {
    const n = f.normal;
    t.set(0, 1, 0);
    if (Math.abs(n.y) > 0.9) t.set(1, 0, 0);
    b.crossVectors(n, t).normalize();
    t.crossVectors(b, n).normalize();
    for (let i = 1; i < f.verts.length - 1; i++) {
      for (const vi of [f.verts[0], f.verts[i], f.verts[i + 1]]) {
        const v = c.vertices[vi];
        pos.push(v.x, v.y, v.z);
        nor.push(n.x, n.y, n.z);
        uv.push(v.dot(b) * uvScale, v.dot(t) * uvScale);
      }
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3));
  g.setAttribute('normal', new BufferAttribute(new Float32Array(nor), 3));
  g.setAttribute('uv', new BufferAttribute(new Float32Array(uv), 2));
  g.setAttribute('color', new BufferAttribute(new Float32Array(pos.length).fill(1), 3));
  return g;
}

const HALF_PI = Math.PI / 2;
/** Cylinder whose axis runs along X (wheels, drums lying sideways). */
const axleX = (r: number, w: number, x: number, y: number, z: number, seg = 14, color = '#ffffff') => place(geo.cyl(r, r, w, seg, color), x, y, z, 0, 0, HALF_PI);
/** Cylinder whose axis runs along Z (barrels, pipes, lights). */
const axleZ = (r0: number, r1: number, len: number, x: number, y: number, z: number, seg = 12, color = '#ffffff') =>
  place(geo.cyl(r1, r0, len, seg, color), x, y, z, HALF_PI, 0, 0);

interface RunningGear {
  camo: BufferGeometry[];
  metal: BufferGeometry[];
  rubber: BufferGeometry[];
}

/** Road wheels, sprocket, idler and return rollers for one side, styled per vehicle design. */
function runningGear(style: TankStyle, side: number, x: number, L: number, tw: number, trackTop: number): RunningGear {
  const out: RunningGear = { camo: [], metal: [], rubber: [] };
  const usable = L - 1.3;
  const z0 = -usable / 2;
  const wheel = (r: number, z: number, y: number, xo = 0, width = tw * 0.72) => {
    out.camo.push(axleX(r * 0.86, width, x + xo, y, z, 14, '#c8c8c8'));
    out.rubber.push(axleX(r, width * 0.82, x + xo, y, z, 16));
    out.metal.push(axleX(r * 0.3, width + 0.04, x + xo, y, z, 8, '#5a5752'));
    out.metal.push(axleX(r * 0.12, width + 0.08, x + xo, y, z, 6, '#2a2826'));
  };
  const n = style.wheelCount;
  switch (style.wheels) {
    case 'large': {
      // Christie-style: few big road wheels, track rides on top of them.
      const r = Math.min(trackTop * 0.46, usable / n / 2 * 0.96);
      for (let i = 0; i < n; i++) wheel(r, z0 + r + (i * (usable - 2 * r)) / Math.max(1, n - 1), r + 0.05);
      break;
    }
    case 'interleaved': {
      const r = Math.min(trackTop * 0.42, usable / (n * 0.62 + 1) / 1.1);
      for (let i = 0; i < n; i++) {
        const z = z0 + r + (i * (usable - 2 * r)) / Math.max(1, n - 1);
        wheel(r, z, r + 0.05, (i % 2 ? -1 : 1) * tw * 0.16, tw * 0.34);
      }
      break;
    }
    case 'bogie': {
      // Vertical-volute / leaf-spring bogies with two small wheels each.
      const bogies = Math.max(2, n / 2);
      const r = Math.min(0.24, trackTop * 0.27);
      for (let b = 0; b < bogies; b++) {
        const cz = z0 + 0.45 + (b * (usable - 0.9)) / Math.max(1, bogies - 1);
        wheel(r, cz - r * 1.15, r + 0.05);
        wheel(r, cz + r * 1.15, r + 0.05);
        out.metal.push(place(geo.box(tw * 0.5, r * 1.2, r * 2.6, '#4a4844'), x, r * 1.9 + 0.05, cz));
        out.metal.push(place(geo.cyl(r * 0.35, r * 0.35, r * 1.4, 8, '#3b3936'), x - side * tw * 0.05, r * 2.6 + 0.05, cz));
        out.metal.push(axleX(0.07, tw * 0.5, x, trackTop - 0.12, cz, 8, '#4a4844'));
      }
      break;
    }
    default: {
      const r = Math.min(0.3, trackTop * 0.32, usable / n / 2 * 0.95);
      for (let i = 0; i < n; i++) wheel(r, z0 + r + (i * (usable - 2 * r)) / Math.max(1, n - 1), r + 0.05);
    }
  }
  if (style.returnRollers && style.wheels !== 'bogie') {
    const count = Math.max(2, Math.round(L / 1.6));
    for (let i = 0; i < count; i++) out.metal.push(axleX(0.075, tw * 0.55, x, trackTop - 0.12, -usable * 0.4 + (i * usable * 0.8) / Math.max(1, count - 1), 8, '#4a4844'));
  }
  // Drive sprocket (toothed) and idler at the ends of the track run.
  const sz = (style.sprocketFront ? 1 : -1) * (L / 2 - 0.3);
  const sr = Math.max(0.24, trackTop * 0.36);
  const sy = trackTop - sr * 0.95;
  out.metal.push(axleX(sr * 0.82, tw * 0.6, x, sy, sz, 10, '#4c4a46'));
  out.metal.push(axleX(sr * 0.32, tw * 0.75, x, sy, sz, 8, '#2c2a28'));
  for (let k = 0; k < 10; k++) {
    const a = (k / 10) * Math.PI * 2;
    out.metal.push(place(geo.box(tw * 0.42, 0.07, 0.09, '#3a3835'), x, sy + Math.sin(a) * sr * 0.9, sz + Math.cos(a) * sr * 0.9, a, 0, 0));
  }
  const ir = sr * 0.88;
  const iz = -sz;
  out.metal.push(axleX(ir * 0.9, tw * 0.55, x, trackTop - ir - 0.04, iz, 12, '#4a4844'));
  out.metal.push(axleX(ir * 0.35, tw * 0.7, x, trackTop - ir - 0.04, iz, 8, '#2a2826'));
  return out;
}

function buildGeometries(tank: Tank): TankGeometries {
  const key = `${tank.data.id}|${tank.turret.id}|${tank.gun.id}`;
  const hit = geometryCache.get(key);
  if (hit) return hit;
  const style = tank.data.style;
  const rng = new Random(style.seed + 7);
  const L = tank.layout;
  const H = tank.data.hull;
  const d = H.dims;
  const comp = (name: string) => L.components.find((c) => c.name === name);
  const hw = d.width / 2;
  const tw = H.trackWidth;
  const trackTop = d.clearance + d.height * 0.35;
  const C = d.clearance;
  const top = C + d.height;
  const noseY = C + d.height * 0.42;
  const upperRun = Math.min((top - noseY) * Math.tan(H.angles.upperFront * DEG), d.length * 0.32);
  const lowerRun = Math.min((noseY - C) * Math.tan(H.angles.lowerFront * DEG), d.length * 0.18);
  const glacisTilt = Math.atan2(upperRun, top - noseY);
  const gn = new Vector3(0, Math.sin(glacisTilt), Math.cos(glacisTilt));
  /** Places a part flat on the upper front plate at fraction f (0 = nose, 1 = roof edge). */
  const onGlacis = (g: BufferGeometry, f: number, x: number, lift: number) =>
    place(g, x, noseY + (top - noseY) * f + gn.y * lift, d.length / 2 - upperRun * f + gn.z * lift, -glacisTilt, 0, 0);

  const hullCamo: BufferGeometry[] = [componentGeometry(comp('hull')!)];
  const hullMetal: BufferGeometry[] = [];
  const hullRubber: BufferGeometry[] = [];

  // --- Fenders, skirts, running gear ---
  for (const side of [1, -1]) {
    const tx = side * (hw - tw / 2);
    hullCamo.push(place(geo.box(tw + 0.1, 0.05, d.length * 0.98), tx, trackTop + 0.03, 0));
    // Front mudguard sloping down toward the nose.
    hullCamo.push(place(geo.box(tw + 0.1, 0.04, 0.45), tx, trackTop - 0.08, d.length / 2 - 0.05, 0.45, 0, 0));
    const scr = comp(side > 0 ? 'screenL' : 'screenR');
    if (scr) hullCamo.push(componentGeometry(scr));
    else if (style.skirts) {
      hullCamo.push(place(geo.box(0.03, 0.42, d.length * 0.86), side * (hw + 0.03), trackTop - 0.17, -0.02));
      for (let k = 0; k < 5; k++) hullMetal.push(place(geo.box(0.05, 0.04, 0.04, '#55524d'), side * (hw + 0.05), trackTop + 0.01, -d.length * 0.4 + (k * d.length * 0.8) / 4));
    }
    const rg = runningGear(style, side, tx, d.length, tw, trackTop);
    hullCamo.push(...rg.camo);
    hullMetal.push(...rg.metal);
    hullRubber.push(...rg.rubber);
  }

  // --- Hull fittings ---
  // Headlights and horn on the front fenders.
  for (const side of [1, -1]) {
    if (side < 0 && rng.chance(0.4)) continue;
    const lx = side * (hw - tw * 0.6);
    hullMetal.push(axleZ(0.1, 0.085, 0.14, lx, trackTop + 0.16, d.length / 2 - 0.3, 10, '#3d3b38'));
    hullMetal.push(axleZ(0.075, 0.075, 0.02, lx, trackTop + 0.16, d.length / 2 - 0.22, 10, '#f4ecc0'));
  }
  // Tow hooks at the nose.
  for (const side of [1, -1]) hullMetal.push(place(geo.box(0.1, 0.12, 0.16, '#34322f'), side * hw * 0.55, C + 0.12, d.length / 2 - lowerRun * 0.5 + 0.02));
  // Driver's hatch and vision block.
  const driverX = hw * 0.42;
  const driverZ = d.length / 2 - upperRun - 0.3;
  hullCamo.push(place(geo.cyl(0.24, 0.26, 0.05, 14, '#d0d0d0'), driverX, top + 0.025, driverZ));
  hullMetal.push(onGlacis(geo.box(0.32, 0.1, 0.06, '#1a1d1f'), 0.88, driverX, 0.03));
  if (style.hullMg) {
    hullCamo.push(onGlacis(geo.blob(0.13, 1, style.seed % 97, 0.0, '#c8c8c8'), 0.55, -hw * 0.42, 0.04));
    hullMetal.push(axleZ(0.025, 0.025, 0.5, -hw * 0.42, noseY + (top - noseY) * 0.55 + gn.y * 0.1, d.length / 2 - upperRun * 0.55 + gn.z * 0.1 + 0.2, 6, '#1d1d1d'));
  }
  if (style.spareTracks) {
    // Spare track links bolted to the glacis as extra protection.
    const cx = (rng.chance(0.5) ? 1 : -1) * hw * 0.5;
    const links = 2 + rng.int(0, 2);
    for (let i = 0; i < links; i++) {
      hullMetal.push(onGlacis(geo.box(tw * 0.85, 0.12, 0.035, '#7a756c'), 0.2 + i * 0.13, cx, 0.02));
      hullMetal.push(onGlacis(geo.box(tw * 0.3, 0.05, 0.03, '#8f897e'), 0.2 + i * 0.13, cx, 0.05));
    }
  }
  // Toolboxes / stowage on the fenders.
  for (const side of [1, -1]) {
    const tx = side * (hw - tw / 2);
    if (rng.chance(0.75)) hullCamo.push(place(geo.box(tw * 0.8, 0.24, 0.8 + rng.next() * 0.4, '#c4c4c4'), tx, trackTop + 0.17, d.length * (rng.next() * 0.3 - 0.05)));
    if (rng.chance(0.5)) hullMetal.push(axleZ(0.035, 0.035, 1.1, tx, trackTop + 0.1, -d.length * 0.2, 6, '#4b3a28'));
  }
  if (style.fuelDrums) {
    for (const side of [1, -1]) hullCamo.push(axleZ(0.21, 0.21, 0.8, side * (hw - tw / 2), trackTop + 0.27, -d.length / 2 + 0.6, 14, '#a8a8a0'));
  }
  if (style.jerrycans) {
    const side = rng.chance(0.5) ? 1 : -1;
    for (let i = 0; i < 3; i++) hullCamo.push(place(geo.box(0.13, 0.36, 0.27, '#b8b8b0'), side * (hw - tw * 0.35), trackTop + 0.23, -d.length / 2 + 0.35 + i * 0.3));
  }
  // Engine deck with louvred grilles.
  const turretRear = tank.turret.shape.offsetZ - tank.turret.shape.length / 2 - (comp('bustle') ? tank.turret.shape.length * 0.26 : 0);
  const deckFront = Math.min(-d.length / 2 + d.length * 0.34, turretRear - 0.05);
  const deckBack = -d.length / 2 + (style.hullRear === 'sloped' ? d.length * 0.08 : 0.3);
  if (style.engineDeck && deckFront - deckBack > 0.45 && tank.turret.shape.offsetZ > -d.length * 0.1) {
    const len = deckFront - deckBack;
    const cz = (deckFront + deckBack) / 2;
    hullMetal.push(place(geo.box(d.width * 0.5, 0.03, len, '#2a2927'), 0, top + 0.015, cz));
    const slats = Math.max(4, Math.round(len / 0.12));
    for (let i = 0; i < slats; i++) hullCamo.push(place(geo.box(d.width * 0.48, 0.025, 0.05, '#b0b0b0'), 0, top + 0.04, deckBack + 0.05 + (i * (len - 0.1)) / (slats - 1), 0.5, 0, 0));
    for (const side of [1, -1]) hullCamo.push(place(geo.cyl(0.12, 0.12, 0.04, 12, '#c0c0c0'), side * hw * 0.55, top + 0.02, cz));
  }
  // Exhausts and mufflers on the rear plate.
  for (const side of [1, -1]) {
    hullMetal.push(axleX(0.11, 0.55, side * hw * 0.42, C + d.height * 0.55, -d.length / 2 - 0.1, 10, '#3a2f27'));
    hullMetal.push(axleZ(0.05, 0.05, 0.3, side * hw * 0.42, C + d.height * 0.55, -d.length / 2 - 0.25, 8, '#1c1a19'));
  }
  hullMetal.push(axleZ(0.035, 0.035, 0.55, -hw * 0.35, C + d.height * 0.6, d.length / 2 - 0.05, 6, '#1e1e1e'));

  // Track belts (own material for UV scrolling): open loop so road wheels stay visible.
  const belt = (len: number, y: number, z: number, rx: number) => {
    const b = geo.box(tw, 0.07, len);
    const uv = b.getAttribute('uv') as BufferAttribute;
    const pos = b.getAttribute('position') as BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getZ(i) / 0.6, pos.getX(i) * 2 + pos.getY(i));
    return place(b, 0, y, z, rx, 0, 0);
  };
  const rise = trackTop - 0.075;
  const endLen = Math.hypot(rise, 0.4) + 0.06;
  const endAngle = Math.atan2(rise, 0.4);
  const trackGeo = merge([
    belt(d.length - 0.5, trackTop - 0.04, 0, 0),
    belt(d.length - 1.3, 0.035, 0, 0),
    belt(endLen, trackTop / 2, d.length / 2 - 0.45, -endAngle),
    belt(endLen, trackTop / 2, -d.length / 2 + 0.45, endAngle),
  ]);

  // --- Turret ---
  const s = tank.turret.shape;
  const turComp = comp('turret')!;
  const turretCamo: BufferGeometry[] = [componentGeometry(turComp)];
  const bustle = comp('bustle');
  if (bustle) turretCamo.push(componentGeometry(bustle));
  const turretMetal: BufferGeometry[] = [];
  const twid = s.width / 2;
  const tTop = s.height;
  let topHalf = 0;
  for (const v of turComp.vertices) if (Math.abs(v.y - tTop) < 1e-3) topHalf = Math.max(topHalf, Math.abs(v.x));
  const sideAt = (y: number) => twid + (topHalf - twid) * (y / tTop);
  if (tank.data.hasTurret) {
    // Commander's cupola with vision blocks, loader's hatch, sight housing.
    const cup = comp('cupola');
    if (cup) {
      const cr = Math.min(0.35, twid * 0.3);
      const cx = twid * 0.35;
      const cz = -s.length * 0.15;
      turretCamo.push(place(geo.cyl(cr * 0.92, cr, 0.26, 16, '#d6d6d6'), cx, tTop + 0.11, cz));
      turretCamo.push(place(geo.cyl(cr * 0.7, cr * 0.75, 0.05, 14, '#c8c8c8'), cx, tTop + 0.265, cz));
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        turretMetal.push(place(geo.box(0.09, 0.07, 0.05, '#15191b'), cx + Math.sin(a) * cr * 0.95, tTop + 0.16, cz + Math.cos(a) * cr * 0.95, 0, a, 0));
      }
      if (tank.data.tier >= 4 && rng.chance(0.6)) {
        turretMetal.push(place(geo.box(0.06, 0.25, 0.06, '#2a2a2a'), cx, tTop + 0.4, cz - cr * 0.6));
        turretMetal.push(axleZ(0.022, 0.022, 0.9, cx, tTop + 0.5, cz - cr * 0.6 + 0.3, 6, '#1d1d1d'));
      }
    }
    turretCamo.push(place(geo.cyl(0.23, 0.24, 0.04, 14, '#cfcfcf'), -twid * 0.38, tTop + 0.02, -s.length * 0.08));
    turretMetal.push(place(geo.box(0.16, 0.12, 0.26, '#2c2b29'), -twid * 0.2, tTop + 0.06, s.length * 0.28));
    turretMetal.push(place(geo.box(0.1, 0.03, 0.02, '#14181a'), -twid * 0.2, tTop + 0.07, s.length * 0.28 + 0.13));
    turretMetal.push(place(geo.cyl(0.018, 0.018, 1.9, 4, '#222'), -twid * 0.62, tTop + 0.95, -s.length * 0.38));
    turretMetal.push(place(geo.cyl(0.07, 0.08, 0.08, 8, '#333'), -twid * 0.62, tTop + 0.04, -s.length * 0.38));
    if (!bustle && style.turret !== 'cast') turretCamo.push(place(geo.box(s.width * 0.7, tTop * 0.4, 0.32, '#c0c0c0'), 0, tTop * 0.45, -s.length / 2 - 0.13));
    if ((style.turret === 'box' || style.turret === 'welded') && rng.chance(0.7)) {
      for (const side of [1, -1]) turretCamo.push(place(geo.box(0.14, tTop * 0.42, s.length * 0.38, '#bcbcbc'), side * (sideAt(tTop * 0.5) + 0.07), tTop * 0.5, -s.length * 0.12));
    }
    if (style.turret === 'cast' && style.spareTracks) {
      for (let i = 0; i < 3; i++) turretMetal.push(place(geo.box(0.05, 0.14, tw * 0.9, '#4a4743'), sideAt(tTop * 0.45) + 0.03, tTop * 0.45, -s.length * 0.05 + i * 0.16, 0, HALF_PI, 0));
    }
    if (style.smokeLaunchers) {
      for (const side of [1, -1]) {
        for (let i = 0; i < 3; i++) {
          turretMetal.push(place(geo.cyl(0.045, 0.045, 0.24, 8, '#3a3a36'), side * (sideAt(tTop * 0.7) + 0.06), tTop * 0.72 + i * 0.02, s.length * 0.18 + i * 0.11, HALF_PI - 0.55, 0, -side * 0.35));
        }
      }
    }
    if (style.basket) {
      const bz = -s.length / 2 - (bustle ? s.length * 0.26 : 0) - 0.2;
      const bw = s.width * 0.75;
      turretMetal.push(place(geo.box(bw, 0.03, 0.42, '#3b3a33'), 0, tTop * 0.4, bz));
      for (const y of [0.55, 0.75]) turretMetal.push(place(geo.box(bw, 0.025, 0.025, '#3b3a33'), 0, tTop * y, bz - 0.2));
      for (const side of [1, -1]) turretMetal.push(place(geo.box(0.025, tTop * 0.4, 0.42, '#3b3a33'), side * bw / 2, tTop * 0.6, bz));
      turretCamo.push(place(geo.box(bw * 0.8, tTop * 0.25, 0.32, '#8e8a70'), 0, tTop * 0.52, bz));
    }
  } else if (tank.data.cls === 'SPG') {
    turretMetal.push(place(geo.box(s.width * 0.85, 0.08, s.length * 0.8, '#2b2a28'), 0, s.height + 0.02, 0));
  } else {
    // Casemate: commander's hatch, periscopes, antenna.
    turretCamo.push(place(geo.cyl(0.25, 0.27, 0.06, 14, '#cfcfcf'), twid * 0.4, tTop + 0.03, -s.length * 0.2));
    turretMetal.push(place(geo.box(0.16, 0.1, 0.22, '#2c2b29'), -twid * 0.3, tTop + 0.05, s.length * 0.15));
    turretMetal.push(place(geo.cyl(0.018, 0.018, 1.7, 4, '#222'), -twid * 0.7, tTop + 0.85, -s.length * 0.4));
  }

  // --- Gun: mantlet + painted barrel + muzzle hardware ---
  const mantlet = componentGeometry(comp('mantlet')!);
  const cal = Math.max(0.06, tank.gun.caliber / 1000);
  const len = tank.layout.barrelLength;
  const gunCamo: BufferGeometry[] = [];
  const gunMetal: BufferGeometry[] = [];
  const b0 = 0.25;
  const split = b0 + (len - b0) * 0.38;
  gunCamo.push(axleZ(cal * 1.45, cal * 1.25, 0.32, 0, 0, b0 + 0.06, 14, '#cccccc'));
  gunCamo.push(axleZ(cal * 1.3, cal * 1.12, split - b0, 0, 0, (b0 + split) / 2, 14));
  gunCamo.push(axleZ(cal * 1.0, cal * 0.86, len - split, 0, 0, (split + len) / 2, 14));
  if (style.evacuator) gunCamo.push(axleZ(cal * 1.55, cal * 1.55, Math.max(0.3, len * 0.13), 0, 0, split + (len - split) * 0.45, 14, '#d4d4d4'));
  if (style.thermalSleeve) for (let i = 0; i < 4; i++) gunMetal.push(axleZ(cal * 1.12, cal * 1.12, 0.05, 0, 0, b0 + 0.5 + i * (len - 0.8) / 4, 12, '#3a3936'));
  switch (style.muzzle) {
    case 'double': {
      const bl = cal * 1.3;
      gunMetal.push(axleZ(cal * 0.95, cal * 0.95, cal * 3.4, 0, 0, len - cal * 1.6, 12, '#3a3835'));
      gunMetal.push(place(geo.box(cal * 2.7, cal * 1.9, bl), 0, 0, len - cal * 0.6));
      gunMetal.push(place(geo.box(cal * 2.7, cal * 1.9, bl), 0, 0, len - cal * 2.6));
      break;
    }
    case 'single':
      gunMetal.push(place(geo.box(cal * 2.4, cal * 1.8, cal * 2.6), 0, 0, len - cal * 1.2));
      break;
    case 'cylinder':
      gunMetal.push(axleZ(cal * 1.35, cal * 1.35, cal * 3.2, 0, 0, len - cal * 1.6, 14, '#3a3835'));
      for (let i = 0; i < 3; i++) gunMetal.push(axleZ(cal * 1.4, cal * 1.4, cal * 0.35, 0, 0, len - cal * (0.6 + i * 1.0), 14, '#1d1c1b'));
      break;
    default:
      gunCamo.push(axleZ(cal * 1.05, cal * 1.05, cal * 1.2, 0, 0, len - cal * 0.6, 14));
  }

  // --- LOD ---
  const lodHull = merge([place(geo.box(d.width * 0.86, d.height, d.length * 0.95), 0, C + d.height / 2, 0), place(geo.box(d.width, trackTop, d.length, '#333'), 0, trackTop / 2, 0)]);
  const lodTurret = place(geo.box(s.width * 0.85, s.height, s.length * (bustle ? 1.1 : 0.85)), 0, s.height / 2, bustle ? -s.length * 0.1 : 0);
  const lodGun = place(geo.cyl(cal * 1.2, cal * 1.2, len, 6, '#444'), 0, 0, len / 2, HALF_PI, 0, 0);

  const nonEmpty = (parts: BufferGeometry[]) => (parts.length ? merge(parts) : merge([geo.box(0.01, 0.01, 0.01)]));
  const hullCombinedMetal = merge([...hullMetal, ...hullRubber.map((g) => tint(g, 0.12))]);
  const result: TankGeometries = {
    hull: merge(hullCamo), hullMetal: hullCombinedMetal, turret: merge(turretCamo), turretMetal: nonEmpty(turretMetal),
    gun: merge(gunCamo), gunMetal: nonEmpty(gunMetal), mantlet: merge([mantlet]), track: merge([trackGeo]), lodHull, lodTurret, lodGun,
  };
  geometryCache.set(key, result);
  return result;
}

/** Darkens a part's vertex colour (rubber tyres share the metal draw call). */
function tint(g: BufferGeometry, k: number): BufferGeometry {
  const c = g.getAttribute('color') as BufferAttribute;
  for (let i = 0; i < c.count; i++) c.setXYZ(i, c.getX(i) * k, c.getY(i) * k, c.getZ(i) * k);
  return g;
}

/** Builds the visual hierarchy root → hull → turret → gun → barrel matching the simulation frames. */
export function createTankParts(tank: Tank, nation: NationData, shadows: boolean): TankParts {
  const g = buildGeometries(tank);
  const mats = nationMaterials(nation, tank.data.style.camo);
  const trackTex = TextureFactory.track();
  const mkTrackMat = () => {
    const tex = trackTex.clone();
    tex.needsUpdate = true;
    return new MeshStandardMaterial({ map: tex, roughness: 0.8, metalness: 0.6, color: new Color(0.9, 0.9, 0.9) });
  };
  const mesh = (geometry: BufferGeometry, material: Material) => {
    const m = new Mesh(geometry, material);
    m.castShadow = shadows;
    m.receiveShadow = true;
    return m;
  };
  const root = new Group();
  const hull = new Group();
  const turret = new Group();
  const gun = new Group();
  const barrel = new Group();
  root.add(hull);
  const hullMesh = mesh(g.hull, mats.camo);
  const hullMetal = mesh(g.hullMetal, mats.metal);
  const hw = tank.data.hull.dims.width / 2;
  const tw = tank.data.hull.trackWidth;
  const trackL = mesh(g.track, mkTrackMat());
  trackL.position.x = hw - tw / 2;
  const trackR = mesh(g.track, mkTrackMat());
  trackR.position.x = -(hw - tw / 2);
  hull.add(hullMesh, hullMetal, trackL, trackR);
  turret.position.copy(tank.layout.turretPivot);
  hull.add(turret);
  const turretMesh = mesh(g.turret, mats.camo);
  const turretMetal = mesh(g.turretMetal, mats.metal);
  turret.add(turretMesh, turretMetal);
  gun.position.copy(tank.layout.gunPivot);
  gun.rotation.order = 'YXZ';
  turret.add(gun);
  const mantlet = mesh(g.mantlet, mats.camo);
  gun.add(mantlet, barrel);
  const gunMesh = mesh(g.gun, mats.camo);
  const gunMetal = mesh(g.gunMetal, mats.metal);
  barrel.add(gunMesh, gunMetal);

  const lodRoot = new Group();
  const lodHull = new Group();
  const lodTurret = new Group();
  const lodGun = new Group();
  lodRoot.add(lodHull);
  lodHull.add(new Mesh(g.lodHull, mats.camo));
  lodTurret.position.copy(tank.layout.turretPivot);
  lodTurret.add(new Mesh(g.lodTurret, mats.camo));
  lodHull.add(lodTurret);
  lodGun.position.copy(tank.layout.gunPivot);
  lodGun.rotation.order = 'YXZ';
  lodGun.add(new Mesh(g.lodGun, mats.camo));
  lodTurret.add(lodGun);
  lodRoot.visible = false;
  for (const m of [lodHull, lodTurret, lodGun]) for (const c of m.children) if (c instanceof Mesh) c.castShadow = shadows;

  return {
    root, hull, turret, gun, barrel, trackL, trackR,
    bodyMeshes: [hullMesh, hullMetal, turretMesh, turretMetal, mantlet, gunMesh, gunMetal],
    lod: { root: lodRoot, hull: lodHull, turret: lodTurret, gun: lodGun },
  };
}

export function burntMaterialFor(): MeshStandardMaterial {
  return burntMaterial;
}
