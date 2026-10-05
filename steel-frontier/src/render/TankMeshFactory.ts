import {
  BufferAttribute, BufferGeometry, Color, Group, Mesh, MeshStandardMaterial, Vector2, Vector3, type Material,
} from 'three';
import type { ArmorComponent } from '../sim/ArmorModel';
import type { Tank } from '../sim/Tank';
import type { NationData } from '../data/types';
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
  burnt: MeshStandardMaterial;
}

const materialCache = new Map<string, SharedMaterials>();
const geometryCache = new Map<string, { hull: BufferGeometry; hullMetal: BufferGeometry; turret: BufferGeometry; turretMetal: BufferGeometry; gun: BufferGeometry; mantlet: BufferGeometry; track: BufferGeometry; lodHull: BufferGeometry; lodTurret: BufferGeometry; lodGun: BufferGeometry }>();
const burntMaterial = new MeshStandardMaterial({ color: srgb('#1f1c1a'), roughness: 1, metalness: 0.2 });

export function nationMaterials(n: NationData): SharedMaterials {
  let m = materialCache.get(n.id);
  if (!m) {
    const camo = new MeshStandardMaterial({
      map: TextureFactory.camo(n.colors.base, n.colors.dark, n.colors.light, n.id.length * 101 + n.id.charCodeAt(0)),
      normalMap: TextureFactory.armorNormal(),
      normalScale: new Vector2(0.7, 0.7),
      roughnessMap: TextureFactory.armorRoughness(),
      roughness: 0.85,
      metalness: 0.35,
      vertexColors: true,
    });
    const metal = new MeshStandardMaterial({
      color: srgb('#3d3b38'), roughness: 0.55, metalness: 0.75, roughnessMap: TextureFactory.armorRoughness(), vertexColors: true,
    });
    m = { camo, metal, burnt: burntMaterial };
    materialCache.set(n.id, m);
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
    // Tangent basis for planar UVs.
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
  const col = new Float32Array((pos.length / 3) * 3).fill(1);
  g.setAttribute('color', new BufferAttribute(col, 3));
  return g;
}

function buildGeometries(tank: Tank) {
  const key = `${tank.data.id}|${tank.turret.id}|${tank.gun.id}`;
  const hit = geometryCache.get(key);
  if (hit) return hit;
  const L = tank.layout;
  const d = tank.data.hull.dims;
  const comp = (name: string) => L.components.find((c) => c.name === name);
  const hw = d.width / 2;
  const tw = tank.data.hull.trackWidth;
  const trackTop = d.clearance + d.height * 0.35;

  // --- Hull: armour shell + fenders + details (camo), running gear (metal) ---
  const hullParts: BufferGeometry[] = [componentGeometry(comp('hull')!)];
  for (const side of [1, -1]) {
    hullParts.push(place(geo.box(tw + 0.08, 0.05, d.length * 0.98), side * (hw - tw / 2), trackTop + 0.03, 0));
    const scr = comp(side > 0 ? 'screenL' : 'screenR');
    if (scr) hullParts.push(componentGeometry(scr));
  }
  // Stowage boxes, exhaust housings, headlights
  hullParts.push(place(geo.box(d.width * 0.5, 0.18, 0.35, '#cfcfcf'), 0, d.clearance + d.height + 0.05, -d.length / 2 + 0.4));
  hullParts.push(place(geo.box(0.5, 0.2, 0.3), hw * 0.55, d.clearance + d.height * 0.95, -d.length * 0.25));
  const metalParts: BufferGeometry[] = [];
  const wheelR = Math.max(0.25, trackTop * 0.42);
  const nWheels = Math.max(4, Math.round(d.length / 0.95));
  for (const side of [1, -1]) {
    const x = side * (hw - tw / 2);
    for (let i = 0; i < nWheels; i++) {
      const z = -d.length / 2 + 0.55 + (i * (d.length - 1.1)) / (nWheels - 1);
      metalParts.push(place(geo.cyl(wheelR, wheelR, tw * 0.7, 12, '#4a4844'), x, wheelR + 0.06, z, 0, 0, Math.PI / 2));
      metalParts.push(place(geo.cyl(wheelR * 0.45, wheelR * 0.45, tw * 0.78, 8, '#2a2826'), x, wheelR + 0.06, z, 0, 0, Math.PI / 2));
    }
    metalParts.push(place(geo.cyl(wheelR * 0.85, wheelR * 0.85, tw * 0.9, 12, '#3a3835'), x, trackTop - wheelR * 0.75, d.length / 2 - 0.2, 0, 0, Math.PI / 2));
    metalParts.push(place(geo.cyl(wheelR * 0.85, wheelR * 0.85, tw * 0.9, 12, '#3a3835'), x, trackTop - wheelR * 0.75, -d.length / 2 + 0.2, 0, 0, Math.PI / 2));
    metalParts.push(place(geo.cyl(0.07, 0.07, 0.5, 6, '#222'), side * hw * 0.5, d.clearance + d.height * 0.8, -d.length / 2 - 0.1, Math.PI / 2, 0, 0));
  }
  metalParts.push(place(geo.cyl(0.12, 0.14, 0.12, 8, '#d8d2a0'), hw * 0.65, d.clearance + d.height * 0.85, d.length / 2 - 0.25, Math.PI / 2, 0, 0));
  metalParts.push(place(geo.cyl(0.035, 0.035, 0.55, 6, '#1e1e1e'), -hw * 0.35, d.clearance + d.height * 0.6, d.length / 2 - 0.05, Math.PI / 2, 0, 0));

  // Track belts (own material for UV scrolling): an open loop (top/bottom runs + slanted ends) so the
  // road wheels stay visible from the side. U runs along the belt length.
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
  const turretParts: BufferGeometry[] = [componentGeometry(comp('turret')!)];
  const cup = comp('cupola');
  if (cup) turretParts.push(componentGeometry(cup));
  const s = tank.turret.shape;
  const turretMetal: BufferGeometry[] = [];
  if (tank.data.hasTurret) {
    turretMetal.push(place(geo.cyl(0.02, 0.02, 1.8, 4, '#222'), -s.width * 0.35, s.height + 0.9, -s.length * 0.35));
    turretMetal.push(place(geo.cyl(0.2, 0.22, 0.06, 10, '#3b3a37'), -s.width * 0.2, s.height + 0.02, -s.length * 0.1));
    turretParts.push(place(geo.box(s.width * 0.75, s.height * 0.35, 0.35), 0, s.height * 0.4, -s.length / 2 - 0.12));
  } else if (tank.data.cls === 'SPG') {
    // Open-top fighting compartment rim
    turretMetal.push(place(geo.box(s.width * 0.85, 0.08, s.length * 0.8, '#2b2a28'), 0, s.height + 0.02, 0));
  }

  // --- Gun: mantlet (camo) + barrel (metal) ---
  const mantlet = componentGeometry(comp('mantlet')!);
  const cal = Math.max(0.06, tank.gun.caliber / 1000);
  const len = tank.layout.barrelLength;
  const gunParts: BufferGeometry[] = [
    place(geo.cyl(cal * 1.25, cal * 1.6, len - 0.25, 12, '#4a4844'), 0, 0, 0.25 + (len - 0.25) / 2, Math.PI / 2, 0, 0),
  ];
  if (tank.data.tier >= 5) gunParts.push(place(geo.cyl(cal * 1.9, cal * 1.9, len * 0.12, 12, '#3c3a37'), 0, 0, 0.25 + len * 0.55, Math.PI / 2, 0, 0));
  gunParts.push(place(geo.box(cal * 3.6, cal * 2.4, cal * 4), 0, 0, len - cal * 1.8, 0, 0, 0));

  // --- LOD ---
  const lodHull = merge([place(geo.box(d.width * 0.95, d.height, d.length * 0.95), 0, d.clearance + d.height / 2, 0), place(geo.box(d.width, trackTop, d.length, '#333'), 0, trackTop / 2, 0)]);
  const lodTurret = place(geo.box(s.width * 0.85, s.height, s.length * 0.85), 0, s.height / 2, 0);
  const lodGun = place(geo.cyl(cal * 1.3, cal * 1.3, len, 6, '#444'), 0, 0, len / 2, Math.PI / 2, 0, 0);

  const result = {
    hull: merge(hullParts), hullMetal: merge(metalParts), turret: merge(turretParts),
    turretMetal: turretMetal.length ? merge(turretMetal) : merge([geo.box(0.01, 0.01, 0.01)]),
    gun: merge(gunParts), mantlet: merge([mantlet]), track: merge([trackGeo]), lodHull, lodTurret, lodGun,
  };
  geometryCache.set(key, result);
  return result;
}

/** Builds the visual hierarchy root → hull → turret → gun → barrel matching the simulation frames. */
export function createTankParts(tank: Tank, nation: NationData, shadows: boolean): TankParts {
  const g = buildGeometries(tank);
  const mats = nationMaterials(nation);
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
  const gunMesh = mesh(g.gun, mats.metal);
  barrel.add(gunMesh);

  // LOD hierarchy
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
  lodGun.add(new Mesh(g.lodGun, mats.metal));
  lodTurret.add(lodGun);
  lodRoot.visible = false;
  for (const m of [lodHull, lodTurret, lodGun]) for (const c of m.children) if (c instanceof Mesh) c.castShadow = shadows;

  return {
    root, hull, turret, gun, barrel, trackL, trackR,
    bodyMeshes: [hullMesh, hullMetal, turretMesh, turretMetal, mantlet, gunMesh],
    lod: { root: lodRoot, hull: lodHull, turret: lodTurret, gun: lodGun },
  };
}

export function burntMaterialFor(): MeshStandardMaterial {
  return burntMaterial;
}
