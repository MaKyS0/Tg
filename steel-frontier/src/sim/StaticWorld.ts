import { Vector3 } from 'three';

export type DestructibleKind = 'house' | 'fence' | 'tree' | 'car' | 'crate' | 'wall' | 'barricade' | 'wagon';

export interface DestructibleInfo {
  kind: DestructibleKind;
  /** Momentum (t·m/s) a ramming tank needs to flatten it. */
  strength: number;
  hp: number;
  /** Shells keep flying after destroying it. */
  passThrough: boolean;
}

export interface Collider {
  id: number;
  shape: 'box' | 'circle';
  x: number;
  z: number;
  hx: number;
  hz: number;
  rot: number;
  r: number;
  y0: number;
  y1: number;
  blocksMove: boolean;
  blocksShell: boolean;
  blocksView: boolean;
  destructible: DestructibleInfo | null;
  alive: boolean;
  propId: number;
  foliage: number[];
}

export interface Foliage {
  id: number;
  x: number;
  z: number;
  r: number;
  y0: number;
  y1: number;
  camo: number;
  alive: boolean;
}

export interface StaticHit {
  t: number;
  collider: Collider;
  normal: Vector3;
}

const GRID = 16;

/** Spatial hash of static colliders and foliage with segment/circle queries. */
export class StaticWorld {
  readonly colliders: Collider[] = [];
  readonly foliage: Foliage[] = [];
  private cells: number[][];
  private foliageCells: number[][];
  private dim: number;
  private half: number;
  private stamp = 1;
  private stamps: Uint32Array = new Uint32Array(1024);
  private fstamps: Uint32Array = new Uint32Array(1024);

  constructor(size: number) {
    this.half = size / 2;
    this.dim = Math.ceil(size / GRID);
    this.cells = Array.from({ length: this.dim * this.dim }, () => []);
    this.foliageCells = Array.from({ length: this.dim * this.dim }, () => []);
  }

  private cellCoord(v: number): number {
    return Math.max(0, Math.min(this.dim - 1, Math.floor((v + this.half) / GRID)));
  }

  addCollider(c: Omit<Collider, 'id' | 'alive' | 'foliage'> & { foliage?: number[] }): Collider {
    const col: Collider = { ...c, id: this.colliders.length, alive: true, foliage: c.foliage ?? [] };
    this.colliders.push(col);
    const ext = col.shape === 'circle' ? col.r : Math.hypot(col.hx, col.hz);
    for (let j = this.cellCoord(col.z - ext); j <= this.cellCoord(col.z + ext); j++)
      for (let i = this.cellCoord(col.x - ext); i <= this.cellCoord(col.x + ext); i++) this.cells[j * this.dim + i].push(col.id);
    if (this.stamps.length < this.colliders.length) {
      const s = new Uint32Array(this.stamps.length * 2);
      s.set(this.stamps);
      this.stamps = s;
    }
    return col;
  }

  addFoliage(f: Omit<Foliage, 'id' | 'alive'>): Foliage {
    const fol: Foliage = { ...f, id: this.foliage.length, alive: true };
    this.foliage.push(fol);
    for (let j = this.cellCoord(f.z - f.r); j <= this.cellCoord(f.z + f.r); j++)
      for (let i = this.cellCoord(f.x - f.r); i <= this.cellCoord(f.x + f.r); i++) this.foliageCells[j * this.dim + i].push(fol.id);
    if (this.fstamps.length < this.foliage.length) {
      const s = new Uint32Array(this.fstamps.length * 2);
      s.set(this.fstamps);
      this.fstamps = s;
    }
    return fol;
  }

  /** Overlap test against walkable-blocking colliders around a circle. Calls back with penetration info. */
  queryCircle(x: number, z: number, r: number, cb: (c: Collider) => void): void {
    const stamp = ++this.stamp;
    for (let j = this.cellCoord(z - r); j <= this.cellCoord(z + r); j++) {
      for (let i = this.cellCoord(x - r); i <= this.cellCoord(x + r); i++) {
        for (const id of this.cells[j * this.dim + i]) {
          if (this.stamps[id] === stamp) continue;
          this.stamps[id] = stamp;
          const c = this.colliders[id];
          if (c.alive) cb(c);
        }
      }
    }
  }

  queryFoliage(x: number, z: number, r: number, cb: (f: Foliage) => void): void {
    const stamp = ++this.stamp;
    for (let j = this.cellCoord(z - r); j <= this.cellCoord(z + r); j++) {
      for (let i = this.cellCoord(x - r); i <= this.cellCoord(x + r); i++) {
        for (const id of this.foliageCells[j * this.dim + i]) {
          if (this.fstamps[id] === stamp) continue;
          this.fstamps[id] = stamp;
          const f = this.foliage[id];
          if (f.alive) cb(f);
        }
      }
    }
  }

  /**
   * Resolves overlap of a circle with colliders. Returns push-out vector and the colliders touched.
   * `filter` decides whether a collider is solid for this query.
   */
  circlePenetration(c: Collider, x: number, z: number, r: number, out: { nx: number; nz: number; depth: number }): boolean {
    if (c.shape === 'circle') {
      const dx = x - c.x;
      const dz = z - c.z;
      const d = Math.sqrt(dx * dx + dz * dz);
      const depth = r + c.r - d;
      if (depth <= 0) return false;
      out.nx = d > 1e-6 ? dx / d : 1;
      out.nz = d > 1e-6 ? dz / d : 0;
      out.depth = depth;
      return true;
    }
    const cs = Math.cos(c.rot);
    const sn = Math.sin(c.rot);
    const dx = x - c.x;
    const dz = z - c.z;
    // Local frame: lx along rotated X, lz along rotated Z.
    const lx = dx * cs - dz * sn;
    const lz = dx * sn + dz * cs;
    const qx = Math.max(-c.hx, Math.min(c.hx, lx));
    const qz = Math.max(-c.hz, Math.min(c.hz, lz));
    let ex = lx - qx;
    let ez = lz - qz;
    let d = Math.sqrt(ex * ex + ez * ez);
    let depth: number;
    if (d < 1e-6) {
      // Center inside box: push along smallest axis.
      const px = c.hx - Math.abs(lx);
      const pz = c.hz - Math.abs(lz);
      if (px < pz) {
        ex = Math.sign(lx) || 1;
        ez = 0;
        depth = px + r;
      } else {
        ex = 0;
        ez = Math.sign(lz) || 1;
        depth = pz + r;
      }
      d = 1;
    } else {
      depth = r - d;
      if (depth <= 0) return false;
    }
    const nlx = ex / d;
    const nlz = ez / d;
    out.nx = nlx * cs + nlz * sn;
    out.nz = -nlx * sn + nlz * cs;
    out.depth = depth;
    return true;
  }

  /** Ray (origin, unit dir) vs collider in 3D. Returns distance or -1 and writes the outward normal. */
  rayCollider(c: Collider, o: Vector3, d: Vector3, maxT: number, normal: Vector3): number {
    if (c.shape === 'circle') {
      const ox = o.x - c.x;
      const oz = o.z - c.z;
      const a = d.x * d.x + d.z * d.z;
      if (a < 1e-9) {
        if (ox * ox + oz * oz > c.r * c.r) return -1;
        const t = d.y > 0 ? (c.y0 - o.y) / d.y : (c.y1 - o.y) / d.y;
        if (t < 0 || t > maxT) return -1;
        normal.set(0, d.y > 0 ? -1 : 1, 0);
        return t;
      }
      const b = ox * d.x + oz * d.z;
      const cc = ox * ox + oz * oz - c.r * c.r;
      const disc = b * b - a * cc;
      if (disc < 0) return -1;
      const sq = Math.sqrt(disc);
      let t = (-b - sq) / a;
      if (t < 0) t = cc < 0 ? 0 : (-b + sq) / a;
      if (t < 0 || t > maxT) return -1;
      const y = o.y + d.y * t;
      if (y < c.y0 || y > c.y1) {
        // Could hit the top cap.
        if (d.y < 0 && o.y > c.y1) {
          const tc = (c.y1 - o.y) / d.y;
          const px = ox + d.x * tc;
          const pz = oz + d.z * tc;
          if (tc >= 0 && tc <= maxT && px * px + pz * pz <= c.r * c.r) {
            normal.set(0, 1, 0);
            return tc;
          }
        }
        return -1;
      }
      normal.set(ox + d.x * t, 0, oz + d.z * t).normalize();
      return t;
    }
    // Box: slab test in local frame.
    const cs = Math.cos(c.rot);
    const sn = Math.sin(c.rot);
    const rx = o.x - c.x;
    const rz = o.z - c.z;
    const lo = [rx * cs - rz * sn, o.y - (c.y0 + c.y1) / 2, rx * sn + rz * cs];
    const ld = [d.x * cs - d.z * sn, d.y, d.x * sn + d.z * cs];
    const ext = [c.hx, (c.y1 - c.y0) / 2, c.hz];
    let tmin = 0;
    let tmax = maxT;
    let axis = -1;
    let sign = 1;
    for (let k = 0; k < 3; k++) {
      if (Math.abs(ld[k]) < 1e-9) {
        if (lo[k] < -ext[k] || lo[k] > ext[k]) return -1;
        continue;
      }
      let t1 = (-ext[k] - lo[k]) / ld[k];
      let t2 = (ext[k] - lo[k]) / ld[k];
      let s = -1;
      if (t1 > t2) {
        const tmp = t1;
        t1 = t2;
        t2 = tmp;
        s = 1;
      }
      if (t1 > tmin) {
        tmin = t1;
        axis = k;
        sign = s;
      }
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return -1;
    }
    if (axis === -1) {
      normal.set(-d.x, -d.y, -d.z);
      return 0;
    }
    const nl = [0, 0, 0];
    nl[axis] = sign;
    // Local -> world (inverse rotation).
    normal.set(nl[0] * cs + nl[2] * sn, nl[1], -nl[0] * sn + nl[2] * cs);
    return tmin;
  }

  /** Walks the grid along a segment and returns the closest hit satisfying `filter`. */
  raycast(o: Vector3, d: Vector3, maxT: number, filter: (c: Collider) => boolean, out?: StaticHit): StaticHit | null {
    const stamp = ++this.stamp;
    let best: StaticHit | null = null;
    const n = new Vector3();
    const steps = Math.ceil(maxT / (GRID * 0.5)) + 1;
    for (let s = 0; s <= steps; s++) {
      const t = Math.min(maxT, s * GRID * 0.5);
      if (best && t - GRID > best.t) break;
      const px = o.x + d.x * t;
      const pz = o.z + d.z * t;
      const ci = this.cellCoord(px);
      const cj = this.cellCoord(pz);
      for (let j = Math.max(0, cj - 1); j <= Math.min(this.dim - 1, cj + 1); j++) {
        for (let i = Math.max(0, ci - 1); i <= Math.min(this.dim - 1, ci + 1); i++) {
          for (const id of this.cells[j * this.dim + i]) {
            if (this.stamps[id] === stamp) continue;
            this.stamps[id] = stamp;
            const c = this.colliders[id];
            if (!c.alive || !filter(c)) continue;
            const th = this.rayCollider(c, o, d, best ? best.t : maxT, n);
            if (th >= 0 && (!best || th < best.t)) {
              best = out ?? { t: 0, collider: c, normal: new Vector3() };
              best.t = th;
              best.collider = c;
              best.normal.copy(n);
            }
          }
        }
      }
      if (t >= maxT) break;
    }
    return best;
  }

  /** Sum of foliage camouflage crossed by a segment, ignoring foliage within `skipNear` of the start. */
  foliageAlong(a: Vector3, b: Vector3, skipNear: number): number {
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len < 1e-3) return 0;
    const ux = dx / len;
    const uz = dz / len;
    let sum = 0;
    const stamp = ++this.stamp;
    for (let t = 0; t <= len; t += GRID * 0.5) {
      const ci = this.cellCoord(a.x + ux * t);
      const cj = this.cellCoord(a.z + uz * t);
      for (const id of this.foliageCells[cj * this.dim + ci]) {
        if (this.fstamps[id] === stamp) continue;
        this.fstamps[id] = stamp;
        const f = this.foliage[id];
        if (!f.alive) continue;
        const fx = f.x - a.x;
        const fz = f.z - a.z;
        const along = fx * ux + fz * uz;
        if (along < skipNear || along > len + f.r) continue;
        const perp = Math.abs(fx * uz - fz * ux);
        if (perp > f.r) continue;
        const y = a.y + (b.y - a.y) * Math.min(1, along / len);
        if (y < f.y0 || y > f.y1 + 0.5) continue;
        sum += f.camo;
      }
    }
    return sum;
  }

  /** Foliage camouflage of a tank standing at x,z (inside bushes/canopies). */
  foliageAt(x: number, z: number, radius: number): number {
    let best = 0;
    this.queryFoliage(x, z, radius + 4, (f) => {
      const d = Math.hypot(f.x - x, f.z - z);
      if (d < f.r + radius * 0.6) best = Math.max(best, f.camo);
    });
    return best;
  }

  destroy(c: Collider): void {
    c.alive = false;
    for (const fid of c.foliage) this.foliage[fid].alive = false;
  }
}
