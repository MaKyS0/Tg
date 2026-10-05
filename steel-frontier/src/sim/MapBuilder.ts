import { Noise2D } from '../core/Noise';
import { Random } from '../core/Random';
import { clamp, smoothstep } from '../core/math';
import { SURFACE_INDEX } from '../data/surfaces';
import type { BuildingStyle, MapData, MapFeature, SurfaceId, TreeKind, Vec2 } from '../data/types';
import { Terrain } from './Terrain';
import { StaticWorld, type Collider, type DestructibleInfo } from './StaticWorld';

export type PropKind =
  | 'building' | 'house' | 'ruin' | 'hall' | 'chimney' | 'silo' | 'container' | 'wall' | 'fence'
  | 'tree' | 'bush' | 'rock' | 'car' | 'crate' | 'barricade' | 'wagon' | 'lighthouse' | 'rail';

export interface PropInstance {
  id: number;
  kind: PropKind;
  x: number;
  y: number;
  z: number;
  rot: number;
  sx: number;
  sy: number;
  sz: number;
  variant: number;
  colliderId: number;
}

export interface MapInstance {
  data: MapData;
  terrain: Terrain;
  statics: StaticWorld;
  props: PropInstance[];
  roads: Array<{ points: Vec2[]; width: number; surface: 'asphalt' | 'dirt' }>;
  rails: Vec2[][];
}

export const TREE_KINDS: TreeKind[] = ['pine', 'broadleaf', 'palm', 'birch', 'dead'];
export const BUILDING_STYLES: BuildingStyle[] = ['stone', 'wood', 'adobe', 'concrete'];

const DESTRUCTIBLES: Record<string, DestructibleInfo> = {
  houseWood: { kind: 'house', strength: 210, hp: 260, passThrough: false },
  houseAdobe: { kind: 'house', strength: 300, hp: 380, passThrough: false },
  fence: { kind: 'fence', strength: 4, hp: 1, passThrough: true },
  tree: { kind: 'tree', strength: 38, hp: 40, passThrough: true },
  car: { kind: 'car', strength: 45, hp: 120, passThrough: false },
  crate: { kind: 'crate', strength: 6, hp: 1, passThrough: true },
  wall: { kind: 'wall', strength: 150, hp: 300, passThrough: false },
  barricade: { kind: 'barricade', strength: 420, hp: 600, passThrough: false },
  wagon: { kind: 'wagon', strength: 900, hp: 900, passThrough: false },
};

const BASE_HEIGHT = 12;
const BASE_CLEAR_RADIUS = 48;

function polylineDistance(px: number, pz: number, pts: Vec2[]): { d: number; seg: number; t: number } {
  let best = Infinity;
  let seg = 0;
  let bt = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const abx = bx - ax;
    const abz = bz - az;
    const l2 = abx * abx + abz * abz;
    const t = l2 > 0 ? clamp(((px - ax) * abx + (pz - az) * abz) / l2, 0, 1) : 0;
    const dx = px - (ax + abx * t);
    const dz = pz - (az + abz * t);
    const d = Math.sqrt(dx * dx + dz * dz);
    if (d < best) {
      best = d;
      seg = i;
      bt = t;
    }
  }
  return { d: best, seg, t: bt };
}

const cosFalloff = (d: number, r: number) => (d >= r ? 0 : 0.5 * (1 + Math.cos((Math.PI * d) / r)));

/** Converts declarative MapData into terrain + static world + render props. Deterministic per seed. */
export class MapBuilder {
  private rng: Random;
  private noise: Noise2D;
  private noise2: Noise2D;
  private terrain: Terrain;
  private statics: StaticWorld;
  private props: PropInstance[] = [];
  private roads: MapInstance['roads'] = [];
  private rails: Vec2[][] = [];
  private reserved: Array<{ x: number; z: number; r: number }> = [];

  constructor(private readonly data: MapData, cellSize = 2) {
    this.rng = new Random(data.seed);
    this.noise = new Noise2D(data.seed);
    this.noise2 = new Noise2D(data.seed ^ 0x5bd1e995);
    this.terrain = new Terrain(data.size, cellSize, data.waterLevel);
    this.statics = new StaticWorld(data.size);
  }

  build(): MapInstance {
    for (const _ of this.steps()) {
      // run synchronously
    }
    return this.result();
  }

  result(): MapInstance {
    return { data: this.data, terrain: this.terrain, statics: this.statics, props: this.props, roads: this.roads, rails: this.rails };
  }

  /** Generation split into stages so the loader can yield between them. */
  *steps(): Generator<string> {
    yield 'Рельеф';
    this.buildHeights();
    yield 'Покрытия';
    this.buildSurfaces();
    yield 'Постройки';
    this.reserveZones();
    this.placeStructures();
    yield 'Растительность';
    this.placeNature();
    yield 'Готово';
  }

  // --------------------------------------------------------------------------
  private buildHeights(): void {
    const { terrain: T, data } = this;
    const b = data.biome;
    const v = T.verts;
    const H = T.heights;
    const half = T.half;
    for (let j = 0; j < v; j++) {
      for (let i = 0; i < v; i++) {
        const x = T.vertexX(i);
        const z = T.vertexX(j);
        let h = BASE_HEIGHT + this.noise.fbm(x * b.noiseScale, z * b.noiseScale, 5) * b.noiseAmp;
        h += this.noise2.fbm(x * 0.03, z * 0.03, 2) * 0.35;
        H[j * v + i] = h;
      }
    }
    const additive = data.features.filter((f) => ['hill', 'ridge', 'mountains', 'plateau', 'dunes'].includes(f.type));
    for (const f of additive) this.applyAdditive(f);

    // Road center heights sampled before carving so roads form causeways across rivers.
    const roadFeatures = data.features.filter((f): f is Extract<MapFeature, { type: 'road' }> => f.type === 'road');
    const roadHeights = roadFeatures.map((r) => r.points.map(([x, z]) => Math.max(T.heightAt(x, z), data.waterLevel + 0.5)));

    for (const f of data.features) {
      if (f.type === 'valley' || f.type === 'river' || f.type === 'lake' || f.type === 'sea') this.applyCarve(f);
    }
    // Rim: mountains frame the playable area (not on the sea side).
    const sea = data.features.find((f): f is Extract<MapFeature, { type: 'sea' }> => f.type === 'sea');
    for (let j = 0; j < v; j++) {
      for (let i = 0; i < v; i++) {
        const x = T.vertexX(i);
        const z = T.vertexX(j);
        const edge = Math.max(Math.abs(x), Math.abs(z));
        if (sea) {
          const toSea = sea.side === 'east' ? x : sea.side === 'west' ? -x : sea.side === 'north' ? z : -z;
          if (toSea > sea.distance - 40) continue;
        }
        const rim = smoothstep(half - 48, half - 4, edge);
        if (rim > 0) H[j * v + i] += rim * (28 + 12 * this.noise.ridged(x * 0.01, z * 0.01, 3));
      }
    }

    // Settlements & bases are flattened toward their mean height.
    const flats: Array<{ x: number; z: number; rx: number; rz: number }> = [];
    for (const f of data.features) {
      if (f.type === 'town' || f.type === 'industrial') flats.push({ x: f.at[0], z: f.at[1], rx: f.size[0] / 2 + 30, rz: f.size[1] / 2 + 30 });
      if (f.type === 'village') flats.push({ x: f.at[0], z: f.at[1], rx: f.radius + 20, rz: f.radius + 20 });
    }
    for (const p of [data.bases.a, data.bases.b, data.bases.neutral, data.spawns.a, data.spawns.b]) flats.push({ x: p[0], z: p[1], rx: 55, rz: 55 });
    for (const fl of flats) this.flattenArea(fl.x, fl.z, fl.rx, fl.rz, 0.8);

    roadFeatures.forEach((road, ri) => {
      const hs = roadHeights[ri];
      this.forEachVertexNear(road.points, road.width / 2 + 10, (idx, x, z) => {
        const { d, seg, t } = polylineDistance(x, z, road.points);
        const target = hs[seg] * (1 - t) + hs[seg + 1] * t;
        const w = 1 - smoothstep(road.width / 2, road.width / 2 + 10, d);
        H[idx] = H[idx] * (1 - w) + target * w;
      });
    });

  }

  private forEachVertexNear(points: Vec2[], margin: number, fn: (idx: number, x: number, z: number) => void): void {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const [x, z] of points) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
    }
    this.forEachVertexInRect(minX - margin, minZ - margin, maxX + margin, maxZ + margin, fn);
  }

  private forEachVertexInRect(x0: number, z0: number, x1: number, z1: number, fn: (idx: number, x: number, z: number) => void): void {
    const T = this.terrain;
    const i0 = clamp(Math.floor((x0 + T.half) / T.cell), 0, T.verts - 1);
    const i1 = clamp(Math.ceil((x1 + T.half) / T.cell), 0, T.verts - 1);
    const j0 = clamp(Math.floor((z0 + T.half) / T.cell), 0, T.verts - 1);
    const j1 = clamp(Math.ceil((z1 + T.half) / T.cell), 0, T.verts - 1);
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) fn(j * T.verts + i, T.vertexX(i), T.vertexX(j));
  }

  private applyAdditive(f: MapFeature): void {
    const H = this.terrain.heights;
    switch (f.type) {
      case 'hill':
        this.forEachVertexInRect(f.at[0] - f.radius, f.at[1] - f.radius, f.at[0] + f.radius, f.at[1] + f.radius, (idx, x, z) => {
          const d = Math.hypot(x - f.at[0], z - f.at[1]);
          H[idx] += f.height * cosFalloff(d, f.radius) * (0.85 + 0.3 * this.noise2.noise(x * 0.02, z * 0.02));
        });
        break;
      case 'mountains':
        this.forEachVertexInRect(f.at[0] - f.radius, f.at[1] - f.radius, f.at[0] + f.radius, f.at[1] + f.radius, (idx, x, z) => {
          const d = Math.hypot(x - f.at[0], z - f.at[1]);
          const k = cosFalloff(d, f.radius);
          if (k > 0) H[idx] += f.height * k * (0.45 + 1.1 * this.noise.ridged(x * 0.008, z * 0.008, 4));
        });
        break;
      case 'plateau':
        this.forEachVertexInRect(f.at[0] - f.radius * 1.2, f.at[1] - f.radius * 1.2, f.at[0] + f.radius * 1.2, f.at[1] + f.radius * 1.2, (idx, x, z) => {
          const d = Math.hypot(x - f.at[0], z - f.at[1]) * (1 + 0.15 * this.noise2.noise(x * 0.03, z * 0.03));
          H[idx] += f.height * (1 - smoothstep(f.radius * 0.7, f.radius * 1.05, d));
        });
        break;
      case 'ridge':
        this.forEachVertexNear(f.points, f.width, (idx, x, z) => {
          const { d } = polylineDistance(x, z, f.points);
          const k = cosFalloff(d, f.width);
          if (k > 0) H[idx] += f.height * k * (1 + (f.rough ?? 0.3) * 0.5 * this.noise.noise(x * 0.02, z * 0.02));
        });
        break;
      case 'dunes': {
        const cs = Math.cos(f.direction);
        const sn = Math.sin(f.direction);
        this.forEachVertexInRect(f.at[0] - f.radius, f.at[1] - f.radius, f.at[0] + f.radius, f.at[1] + f.radius, (idx, x, z) => {
          const d = Math.hypot(x - f.at[0], z - f.at[1]);
          const k = cosFalloff(d, f.radius);
          if (k <= 0) return;
          const u = (x * cs + z * sn) * 0.035 + this.noise2.noise(x * 0.01, z * 0.01) * 2;
          const wave = Math.pow(0.5 + 0.5 * Math.sin(u), 1.6);
          H[idx] += f.height * k * wave;
        });
        break;
      }
      default:
        break;
    }
  }

  private applyCarve(f: MapFeature): void {
    const T = this.terrain;
    const H = T.heights;
    const wl = this.data.waterLevel;
    switch (f.type) {
      case 'valley':
        this.forEachVertexNear(f.points, f.width, (idx, x, z) => {
          const { d } = polylineDistance(x, z, f.points);
          H[idx] -= f.depth * cosFalloff(d, f.width);
        });
        break;
      case 'river': {
        const bank = 14;
        this.forEachVertexNear(f.points, f.width / 2 + bank, (idx, x, z) => {
          const { d } = polylineDistance(x, z, f.points);
          const hw = f.width / 2;
          if (d < hw) {
            const target = wl - f.depth * (1 - (d / hw) * (d / hw));
            H[idx] = Math.min(H[idx], target);
          } else if (d < hw + bank) {
            const k = 1 - smoothstep(hw, hw + bank, d);
            const target = wl + 0.3;
            if (H[idx] > target) H[idx] = H[idx] * (1 - k) + target * k;
          }
        });
        break;
      }
      case 'lake': {
        const R = f.radius * 1.35;
        this.forEachVertexInRect(f.at[0] - R, f.at[1] - R, f.at[0] + R, f.at[1] + R, (idx, x, z) => {
          const d = Math.hypot(x - f.at[0], z - f.at[1]) * (1 + 0.12 * this.noise2.noise(x * 0.02, z * 0.02));
          if (f.frozen) {
            if (d < f.radius) H[idx] = wl + 0.15;
            else if (d < R) {
              const k = 1 - smoothstep(f.radius, R, d);
              H[idx] = H[idx] * (1 - k) + (wl + 0.15) * k;
            }
            return;
          }
          if (d < f.radius) H[idx] = Math.min(H[idx], wl - f.depth * (1 - (d / f.radius) ** 2));
          else if (d < R) {
            const k = 1 - smoothstep(f.radius, R, d);
            if (H[idx] > wl + 0.3) H[idx] = H[idx] * (1 - k) + (wl + 0.3) * k;
          }
        });
        break;
      }
      case 'sea': {
        this.forEachVertexInRect(-T.half, -T.half, T.half, T.half, (idx, x, z) => {
          const u = f.side === 'east' ? x : f.side === 'west' ? -x : f.side === 'north' ? z : -z;
          const shore = f.distance + 25 * this.noise2.noise(x * 0.01, z * 0.01);
          if (u > shore - 50) {
            const k = smoothstep(shore - 50, shore + 40, u);
            const target = wl - 8 * smoothstep(shore, shore + 140, u) - 0.5;
            H[idx] = H[idx] * (1 - k) + Math.min(H[idx], target) * k;
            if (u > shore - 50 && u < shore + 10) H[idx] = Math.min(H[idx], wl + 1.5 + (shore - u) * 0.1);
          }
        });
        break;
      }
      default:
        break;
    }
  }

  private flattenArea(cx: number, cz: number, rx: number, rz: number, strength: number): void {
    const H = this.terrain.heights;
    let sum = 0;
    let n = 0;
    this.forEachVertexInRect(cx - rx * 0.6, cz - rz * 0.6, cx + rx * 0.6, cz + rz * 0.6, (idx) => {
      sum += H[idx];
      n++;
    });
    const target = Math.max(n ? sum / n : BASE_HEIGHT, this.data.waterLevel + 0.6);
    this.forEachVertexInRect(cx - rx, cz - rz, cx + rx, cz + rz, (idx, x, z) => {
      const dx = (x - cx) / rx;
      const dz = (z - cz) / rz;
      const d = Math.sqrt(dx * dx + dz * dz);
      const k = (1 - smoothstep(0.6, 1, d)) * strength;
      if (k > 0) H[idx] = H[idx] * (1 - k) + target * k;
    });
  }

  // --------------------------------------------------------------------------
  private setSurfaceRect(x0: number, z0: number, x1: number, z1: number, fn: (x: number, z: number) => SurfaceId | null): void {
    const T = this.terrain;
    const i0 = clamp(Math.floor((x0 + T.half) / T.cell), 0, T.res - 1);
    const i1 = clamp(Math.ceil((x1 + T.half) / T.cell), 0, T.res - 1);
    const j0 = clamp(Math.floor((z0 + T.half) / T.cell), 0, T.res - 1);
    const j1 = clamp(Math.ceil((z1 + T.half) / T.cell), 0, T.res - 1);
    for (let j = j0; j <= j1; j++) {
      for (let i = i0; i <= i1; i++) {
        const x = -T.half + (i + 0.5) * T.cell;
        const z = -T.half + (j + 0.5) * T.cell;
        const s = fn(x, z);
        if (s) T.surface[j * T.res + i] = SURFACE_INDEX[s];
      }
    }
  }

  private buildSurfaces(): void {
    const T = this.terrain;
    const b = this.data.biome;
    const wl = this.data.waterLevel;
    const shoreSurface: SurfaceId = b.ground === 'snow' ? 'snow' : b.ground === 'sand' ? 'sand' : 'mud';
    this.setSurfaceRect(-T.half, -T.half, T.half, T.half, (x, z) => {
      const h = T.heightAt(x, z);
      const slope = T.slopeAt(x, z);
      if (slope > 0.75) return b.steep;
      if (h < wl + 0.4) return shoreSurface;
      const n = this.noise2.fbm(x * 0.012, z * 0.012, 3);
      if (n > 0.28) return b.secondary;
      if (slope > 0.45 && n > -0.1) return b.steep;
      if (b.ground === 'grass' && n < -0.42) return 'dirt';
      return b.ground;
    });
    for (const f of this.data.features) {
      switch (f.type) {
        case 'field': {
          const cs = Math.cos(f.rotation ?? 0);
          const sn = Math.sin(f.rotation ?? 0);
          const R = Math.hypot(f.size[0], f.size[1]) / 2;
          this.setSurfaceRect(f.at[0] - R, f.at[1] - R, f.at[0] + R, f.at[1] + R, (x, z) => {
            const dx = x - f.at[0];
            const dz = z - f.at[1];
            const lx = dx * cs - dz * sn;
            const lz = dx * sn + dz * cs;
            return Math.abs(lx) < f.size[0] / 2 && Math.abs(lz) < f.size[1] / 2 ? f.surface : null;
          });
          break;
        }
        case 'lake':
          if (f.frozen) {
            const R = f.radius;
            this.setSurfaceRect(f.at[0] - R, f.at[1] - R, f.at[0] + R, f.at[1] + R, (x, z) => {
              if (Math.hypot(x - f.at[0], z - f.at[1]) * (1 + 0.12 * this.noise2.noise(x * 0.02, z * 0.02)) < R) {
                T.ice[T.cellIndex(x, z)] = 1;
                return 'snow';
              }
              return null;
            });
          }
          break;
        case 'sea':
          this.setSurfaceRect(-T.half, -T.half, T.half, T.half, (x, z) => {
            const h = T.heightAt(x, z);
            return h < wl + 2.5 && T.slopeAt(x, z) < 0.5 ? 'sand' : null;
          });
          break;
        case 'town':
        case 'industrial': {
          const [cx, cz] = f.at;
          const [sx, sz] = f.size;
          this.setSurfaceRect(cx - sx / 2, cz - sz / 2, cx + sx / 2, cz + sz / 2, () => (f.type === 'town' ? 'dirt' : 'dirt'));
          break;
        }
        default:
          break;
      }
    }
    for (const f of this.data.features) {
      if (f.type === 'road') {
        this.roads.push({ points: f.points, width: f.width, surface: f.surface });
        this.paintPolyline(f.points, f.width / 2, f.surface);
      } else if (f.type === 'rail') {
        this.rails.push(f.points);
        this.paintPolyline(f.points, 3, 'stone');
      }
    }
  }

  private paintPolyline(points: Vec2[], halfWidth: number, surface: SurfaceId): void {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const [x, z] of points) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
    }
    const m = halfWidth + 2;
    this.setSurfaceRect(minX - m, minZ - m, maxX + m, maxZ + m, (x, z) => {
      if (this.terrain.waterDepthAt(x, z) > 0.2) return null;
      return polylineDistance(x, z, points).d < halfWidth ? surface : null;
    });
  }

  // --------------------------------------------------------------------------
  private reserveZones(): void {
    const d = this.data;
    for (const p of [d.bases.a, d.bases.b, d.bases.neutral]) this.reserved.push({ x: p[0], z: p[1], r: BASE_CLEAR_RADIUS });
    for (const p of [d.spawns.a, d.spawns.b]) this.reserved.push({ x: p[0], z: p[1], r: 60 });
  }

  private nearRoad(x: number, z: number, margin: number): boolean {
    for (const r of this.roads) if (polylineDistance(x, z, r.points).d < r.width / 2 + margin) return true;
    for (const r of this.rails) if (polylineDistance(x, z, r).d < 3 + margin) return true;
    return false;
  }

  /** Checks terrain + existing colliders + reserved zones for free space. */
  private canPlace(x: number, z: number, radius: number, opts: { allowRoad?: boolean; maxSlope?: number; ignoreReserved?: boolean } = {}): boolean {
    const T = this.terrain;
    if (!T.inBounds(x, z, 30 + radius)) return false;
    if (T.waterDepthAt(x, z) > 0.05 || T.heightAt(x, z) < this.data.waterLevel + 0.2) return false;
    if (T.slopeAt(x, z) > (opts.maxSlope ?? 0.5)) return false;
    if (!opts.ignoreReserved) for (const r of this.reserved) if (Math.hypot(x - r.x, z - r.z) < r.r + radius) return false;
    if (!opts.allowRoad && this.nearRoad(x, z, radius + 1)) return false;
    let free = true;
    this.statics.queryCircle(x, z, radius + 1, (c) => {
      if (!free) return;
      const out = { nx: 0, nz: 0, depth: 0 };
      if (this.statics.circlePenetration(c, x, z, radius + 0.5, out)) free = false;
    });
    return free;
  }

  private addProp(kind: PropKind, x: number, z: number, rot: number, sx: number, sy: number, sz: number, variant: number,
    collider: Partial<Collider> & { shape?: 'box' | 'circle' } | null, yOffset = 0): PropInstance {
    const T = this.terrain;
    let y = T.heightAt(x, z);
    if (collider && collider.shape !== 'circle') {
      // Sit boxes on the lowest corner so they never float.
      const cs = Math.cos(rot), sn = Math.sin(rot);
      for (const [lx, lz] of [[sx / 2, sz / 2], [-sx / 2, sz / 2], [sx / 2, -sz / 2], [-sx / 2, -sz / 2]]) {
        y = Math.min(y, T.heightAt(x + lx * cs + lz * sn, z - lx * sn + lz * cs));
      }
    }
    y += yOffset;
    const prop: PropInstance = { id: this.props.length, kind, x, y, z, rot, sx, sy, sz, variant, colliderId: -1 };
    if (collider) {
      const c = this.statics.addCollider({
        shape: collider.shape ?? 'box',
        x, z,
        hx: collider.hx ?? sx / 2,
        hz: collider.hz ?? sz / 2,
        rot,
        r: collider.r ?? Math.max(sx, sz) / 2,
        y0: y - 0.5,
        y1: y + (collider.y1 ?? sy),
        blocksMove: collider.blocksMove ?? true,
        blocksShell: collider.blocksShell ?? true,
        blocksView: collider.blocksView ?? true,
        destructible: collider.destructible ?? null,
        propId: prop.id,
        foliage: collider.foliage,
      });
      prop.colliderId = c.id;
    }
    this.props.push(prop);
    return prop;
  }

  private placeBuilding(style: BuildingStyle, x: number, z: number, rot: number, w: number, d: number, h: number): boolean {
    if (!this.canPlace(x, z, Math.max(w, d) * 0.55, { maxSlope: 0.35 })) return false;
    const variant = BUILDING_STYLES.indexOf(style);
    if (style === 'wood' || style === 'adobe') {
      this.addProp('house', x, z, rot, w, h, d, variant, { destructible: style === 'wood' ? DESTRUCTIBLES.houseWood : DESTRUCTIBLES.houseAdobe });
    } else {
      this.addProp('building', x, z, rot, w, h, d, variant, {});
    }
    return true;
  }

  private placeStructures(): void {
    for (const f of this.data.features) {
      switch (f.type) {
        case 'town': this.placeTown(f); break;
        case 'industrial': this.placeIndustrial(f); break;
        case 'village': this.placeVillage(f); break;
        case 'lighthouse':
          this.addProp('lighthouse', f.at[0], f.at[1], 0, 8, 28, 8, 0, { shape: 'circle', r: 4 });
          break;
        default: break;
      }
    }
    for (const rail of this.rails) this.placeRail(rail);
    for (const f of this.data.features) {
      switch (f.type) {
        case 'ruins': this.scatter(f.at, f.radius, f.count, 3, (x, z, rot) => {
          const w = this.rng.range(4, 10);
          this.addProp('ruin', x, z, rot, w, this.rng.range(1.2, 3.5), this.rng.range(0.8, 1.4), 0, {});
        }); break;
        case 'barricades': this.scatter(f.at, f.radius, f.count, 2, (x, z, rot) => {
          this.addProp('barricade', x, z, rot, 2.4, 1.4, 2.4, this.rng.int(0, 1), { destructible: DESTRUCTIBLES.barricade });
        }, true); break;
        case 'cars': this.scatter(f.at, f.radius, f.count, 3, (x, z, rot) => {
          this.addProp('car', x, z, rot, 1.9, 1.5, 4.3, this.rng.int(0, 5), { destructible: DESTRUCTIBLES.car, y1: 1.5 });
        }, true); break;
        case 'crates': this.scatter(f.at, f.radius, f.count, 1.5, (x, z, rot) => {
          const s = this.rng.range(1.2, 1.8);
          this.addProp('crate', x, z, rot, s, s, s, this.rng.int(0, 2), { destructible: DESTRUCTIBLES.crate, blocksView: false });
        }); break;
        default: break;
      }
    }
  }

  private scatter(at: Vec2, radius: number, count: number, size: number, place: (x: number, z: number, rot: number) => void, allowRoad = false): void {
    let placed = 0;
    for (let attempt = 0; attempt < count * 8 && placed < count; attempt++) {
      const a = this.rng.next() * Math.PI * 2;
      const r = Math.sqrt(this.rng.next()) * radius;
      const x = at[0] + Math.cos(a) * r;
      const z = at[1] + Math.sin(a) * r;
      if (!this.canPlace(x, z, size, { allowRoad })) continue;
      place(x, z, this.rng.next() * Math.PI * 2);
      placed++;
    }
  }

  private placeTown(f: Extract<MapFeature, { type: 'town' }>): void {
    const [cx, cz] = f.at;
    const [sx, sz] = f.size;
    const B = f.block;
    const street = 14;
    const nx = Math.floor(sx / B);
    const nz = Math.floor(sz / B);
    const x0 = cx - (nx * B) / 2;
    const z0 = cz - (nz * B) / 2;
    // Streets as asphalt
    for (let i = 0; i <= nx; i++) {
      const x = x0 + i * B;
      this.paintPolyline([[x, z0], [x, z0 + nz * B]], street / 2, 'asphalt');
    }
    for (let j = 0; j <= nz; j++) {
      const z = z0 + j * B;
      this.paintPolyline([[x0, z], [x0 + nx * B, z]], street / 2, 'asphalt');
    }
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < nz; j++) {
        const bx = x0 + i * B + B / 2;
        const bz = z0 + j * B + B / 2;
        const inner = B - street - 4;
        const roll = this.rng.next();
        if (roll < 0.14) {
          // Park
          for (let k = 0; k < 6; k++) {
            const x = bx + this.rng.range(-inner / 2, inner / 2);
            const z = bz + this.rng.range(-inner / 2, inner / 2);
            this.placeTree(x, z, 'broadleaf');
          }
          for (let k = 0; k < 4; k++) this.placeBush(bx + this.rng.range(-inner / 2, inner / 2), bz + this.rng.range(-inner / 2, inner / 2));
          continue;
        }
        if (roll < 0.22) continue; // plaza
        const ruined = this.rng.next() < (f.ruined ?? 0);
        const cols = this.rng.int(1, 2);
        const rows = this.rng.int(1, 2);
        const cw = inner / cols;
        const rw = inner / rows;
        for (let a = 0; a < cols; a++) {
          for (let b = 0; b < rows; b++) {
            const x = bx - inner / 2 + cw * (a + 0.5);
            const z = bz - inner / 2 + rw * (b + 0.5);
            const w = cw - this.rng.range(2, 5);
            const d = rw - this.rng.range(2, 5);
            if (ruined) {
              if (this.canPlace(x, z, Math.max(w, d) * 0.5, { maxSlope: 0.4 })) {
                this.addProp('ruin', x, z, 0, w, this.rng.range(2, 6), d * 0.25, 1, {});
                this.addProp('ruin', x + w * 0.3, z + d * 0.3, Math.PI / 2, d * 0.6, this.rng.range(1.5, 4), w * 0.15, 1, {});
              }
            } else {
              this.placeBuilding(f.style, x, z, 0, w, d, this.rng.range(8, 19));
            }
          }
        }
      }
    }
  }

  private placeVillage(f: Extract<MapFeature, { type: 'village' }>): void {
    let placed = 0;
    for (let attempt = 0; attempt < f.houses * 12 && placed < f.houses; attempt++) {
      const a = this.rng.next() * Math.PI * 2;
      const r = Math.sqrt(this.rng.next()) * f.radius;
      const x = f.at[0] + Math.cos(a) * r;
      const z = f.at[1] + Math.sin(a) * r;
      const rot = this.nearestRoadAngle(x, z) ?? this.rng.next() * Math.PI;
      const w = this.rng.range(6, 9);
      const d = this.rng.range(5, 7);
      if (!this.placeBuilding(f.style, x, z, rot, w, d, this.rng.range(4, 6))) continue;
      placed++;
      // Fence around some yards
      if (this.rng.chance(0.55) && f.style !== 'stone') {
        const cs = Math.cos(rot), sn = Math.sin(rot);
        const fx = w / 2 + 4;
        const fz = d / 2 + 4;
        const segs: Array<[number, number, number, number]> = [
          [0, fz, fx * 2, 0], [0, -fz, fx * 2, 0], [fx, 0, fz * 2, Math.PI / 2], [-fx, 0, fz * 2, Math.PI / 2],
        ];
        for (const [lx, lz, len, ra] of segs) {
          if (this.rng.chance(0.25)) continue;
          const px = x + lx * cs + lz * sn;
          const pz = z - lx * sn + lz * cs;
          if (!this.canPlace(px, pz, 0.6, { maxSlope: 0.6 })) continue;
          this.addProp('fence', px, pz, rot + ra, len, 1.3, 0.15, 0, { destructible: DESTRUCTIBLES.fence, blocksView: false });
        }
      }
      if (this.rng.chance(0.5)) this.placeTree(x + this.rng.range(-10, 10), z + this.rng.range(-10, 10), this.rng.pick(this.data.biome.treeKinds));
    }
  }

  private nearestRoadAngle(x: number, z: number): number | null {
    let best = 40;
    let ang: number | null = null;
    for (const r of this.roads) {
      const { d, seg } = polylineDistance(x, z, r.points);
      if (d < best) {
        best = d;
        const [ax, az] = r.points[seg];
        const [bx, bz] = r.points[seg + 1];
        ang = Math.atan2(bx - ax, bz - az);
      }
    }
    return ang;
  }

  private placeIndustrial(f: Extract<MapFeature, { type: 'industrial' }>): void {
    const [cx, cz] = f.at;
    const [sx, sz] = f.size;
    this.setSurfaceRect(cx - sx / 2, cz - sz / 2, cx + sx / 2, cz + sz / 2, (x, z) => (this.noise2.noise(x * 0.02, z * 0.02) > 0 ? 'asphalt' : null));
    const halls = 9;
    let placed = 0;
    for (let attempt = 0; attempt < 200 && placed < halls; attempt++) {
      const x = cx + this.rng.range(-sx / 2 + 30, sx / 2 - 30);
      const z = cz + this.rng.range(-sz / 2 + 30, sz / 2 - 30);
      const w = this.rng.range(30, 50);
      const d = this.rng.range(18, 28);
      const rot = this.rng.chance(0.5) ? 0 : Math.PI / 2;
      if (!this.canPlace(x, z, Math.max(w, d) * 0.55, { maxSlope: 0.4 })) continue;
      this.addProp('hall', x, z, rot, w, this.rng.range(11, 16), d, 0, {});
      placed++;
      if (this.rng.chance(0.7)) {
        const ox = x + Math.cos(rot) * (w / 2 + 6);
        const oz = z - Math.sin(rot) * (w / 2 + 6);
        if (this.canPlace(ox, oz, 3)) this.addProp('chimney', ox, oz, 0, 4.5, this.rng.range(32, 48), 4.5, 0, { shape: 'circle', r: 2.2 });
      }
    }
    for (let k = 0; k < 10; k++) {
      const x = cx + this.rng.range(-sx / 2, sx / 2);
      const z = cz + this.rng.range(-sz / 2, sz / 2);
      if (this.canPlace(x, z, 6)) this.addProp('silo', x, z, 0, 10, this.rng.range(10, 16), 10, 0, { shape: 'circle', r: 5 });
    }
    for (let k = 0; k < 40; k++) {
      const x = cx + this.rng.range(-sx / 2, sx / 2);
      const z = cz + this.rng.range(-sz / 2, sz / 2);
      const rot = this.rng.chance(0.5) ? 0 : Math.PI / 2;
      if (this.canPlace(x, z, 4)) this.addProp('container', x, z, rot, 2.5, 2.6, 6.1, this.rng.int(0, 4), {});
    }
    for (let k = 0; k < 16; k++) {
      const x = cx + this.rng.range(-sx / 2, sx / 2);
      const z = cz + this.rng.range(-sz / 2, sz / 2);
      const rot = this.rng.chance(0.5) ? 0 : Math.PI / 2;
      if (this.canPlace(x, z, 6)) this.addProp('wall', x, z, rot, 12, 2.4, 0.5, 0, { destructible: DESTRUCTIBLES.wall });
    }
  }

  private placeRail(points: Vec2[]): void {
    for (let i = 0; i < points.length - 1; i++) {
      const [ax, az] = points[i];
      const [bx, bz] = points[i + 1];
      const len = Math.hypot(bx - ax, bz - az);
      const rot = Math.atan2(bx - ax, bz - az);
      const n = Math.floor(len / 20);
      for (let k = 0; k < n; k++) {
        const t = (k + 0.5) / n;
        const x = ax + (bx - ax) * t;
        const z = az + (bz - az) * t;
        this.addProp('rail', x, z, rot, 2.2, 0.2, len / n, 0, null, 0.05);
      }
      // Wagons standing on the track in a few clusters
      for (let w = 0; w < 4; w++) {
        const t = this.rng.range(0.15, 0.85);
        const x = ax + (bx - ax) * t;
        const z = az + (bz - az) * t;
        if (this.reserved.some((r) => Math.hypot(r.x - x, r.z - z) < r.r + 10)) continue;
        let ok = true;
        this.statics.queryCircle(x, z, 9, (c) => {
          if (this.props[c.propId]?.kind === 'wagon') ok = false;
        });
        if (ok) this.addProp('wagon', x, z, rot, 3, 3.6, 13, this.rng.int(0, 2), { destructible: DESTRUCTIBLES.wagon }, 0.6);
      }
    }
  }

  // --------------------------------------------------------------------------
  private placeTree(x: number, z: number, kind: TreeKind): boolean {
    if (!this.canPlace(x, z, 1.2, { maxSlope: 0.7 })) return false;
    const scale = this.rng.range(0.8, 1.3);
    const height = (kind === 'pine' ? 14 : kind === 'palm' ? 11 : kind === 'dead' ? 9 : 11) * scale;
    const canopyR = (kind === 'pine' ? 2.8 : kind === 'palm' ? 3 : kind === 'dead' ? 1.5 : 3.8) * scale;
    const y = this.terrain.heightAt(x, z);
    const fol = this.statics.addFoliage({ x, z, r: canopyR, y0: y + height * 0.25, y1: y + height, camo: kind === 'dead' ? 0.05 : 0.18 });
    this.addProp('tree', x, z, this.rng.next() * Math.PI * 2, scale, height, scale, TREE_KINDS.indexOf(kind), {
      shape: 'circle', r: 0.45 * scale, y1: height, destructible: DESTRUCTIBLES.tree, blocksView: false, foliage: [fol.id],
    });
    return true;
  }

  private placeBush(x: number, z: number): boolean {
    if (!this.canPlace(x, z, 1.5, { maxSlope: 0.7 })) return false;
    const s = this.rng.range(1.6, 3.2);
    const y = this.terrain.heightAt(x, z);
    this.statics.addFoliage({ x, z, r: s * 1.1, y0: y - 0.2, y1: y + s * 1.1, camo: 0.42 });
    this.addProp('bush', x, z, this.rng.next() * Math.PI * 2, s, s * 0.9, s, this.rng.int(0, 2), null);
    return true;
  }

  private placeNature(): void {
    for (const f of this.data.features) {
      if (f.type === 'forest') {
        const count = Math.round((Math.PI * f.radius * f.radius * f.density) / 70);
        let placed = 0;
        for (let attempt = 0; attempt < count * 3 && placed < count; attempt++) {
          const a = this.rng.next() * Math.PI * 2;
          const r = Math.sqrt(this.rng.next()) * f.radius;
          const x = f.at[0] + Math.cos(a) * r;
          const z = f.at[1] + Math.sin(a) * r;
          const n = this.noise2.noise(x * 0.03, z * 0.03);
          if (n < -0.25) continue; // clearings
          if (this.placeTree(x, z, f.kind)) placed++;
          if (this.rng.chance(0.25)) this.placeBush(x + this.rng.range(-5, 5), z + this.rng.range(-5, 5));
        }
      } else if (f.type === 'bushes') {
        let placed = 0;
        for (let attempt = 0; attempt < f.count * 4 && placed < f.count; attempt++) {
          const a = this.rng.next() * Math.PI * 2;
          const r = Math.sqrt(this.rng.next()) * f.radius;
          // Bushes grow in small clumps
          const x = f.at[0] + Math.cos(a) * r;
          const z = f.at[1] + Math.sin(a) * r;
          const clump = this.rng.int(1, 3);
          for (let c = 0; c < clump; c++) if (this.placeBush(x + this.rng.range(-4, 4), z + this.rng.range(-4, 4))) placed++;
        }
      } else if (f.type === 'rocks') {
        this.scatter(f.at, f.radius, f.count, f.size, (x, z, rot) => {
          const s = f.size * this.rng.range(0.6, 1.4);
          this.addProp('rock', x, z, rot, s * 1.2, s * 0.8, s, this.rng.int(0, 2), { shape: 'circle', r: s * 0.55, y1: s * 0.8 }, -s * 0.15);
        });
      }
    }
    // Sparse lone trees across the map
    const kinds = this.data.biome.treeKinds;
    for (let k = 0; k < 140; k++) {
      const x = this.rng.range(-this.terrain.half + 40, this.terrain.half - 40);
      const z = this.rng.range(-this.terrain.half + 40, this.terrain.half - 40);
      if (this.noise2.noise(x * 0.01, z * 0.01) > 0.15) this.placeTree(x, z, this.rng.pick(kinds));
    }
  }
}
