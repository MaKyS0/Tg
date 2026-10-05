import { BinaryHeap } from '../core/BinaryHeap';
import type { Vec2 } from '../data/types';
import type { MapInstance } from './MapBuilder';
import type { Collider } from './StaticWorld';

const CELL = 4;
const BLOCKED = 1e9;
const SQRT2 = Math.SQRT2;

/** Grid navigation (A* with octile heuristic + line-of-sight smoothing) built from terrain and statics. */
export class NavGrid {
  readonly dim: number;
  readonly half: number;
  readonly cost: Float32Array;
  private g: Float32Array;
  private parent: Int32Array;
  private stamp: Uint32Array;
  private closed: Uint32Array;
  private run = 0;
  private heap = new BinaryHeap(4096);

  constructor(private readonly map: MapInstance) {
    this.half = map.terrain.half;
    this.dim = Math.ceil(map.terrain.size / CELL);
    const n = this.dim * this.dim;
    this.cost = new Float32Array(n);
    this.g = new Float32Array(n);
    this.parent = new Int32Array(n);
    this.stamp = new Uint32Array(n);
    this.closed = new Uint32Array(n);
    for (let j = 0; j < this.dim; j++) for (let i = 0; i < this.dim; i++) this.cost[j * this.dim + i] = this.evaluate(i, j);
    this.addClearance();
  }

  private center(i: number): number {
    return -this.half + (i + 0.5) * CELL;
  }

  private evaluate(i: number, j: number): number {
    const T = this.map.terrain;
    const x = this.center(i);
    const z = this.center(j);
    if (!T.inBounds(x, z, 22)) return BLOCKED;
    const slope = T.slopeAt(x, z);
    if (slope > 0.62) return BLOCKED;
    const depth = T.waterDepthAt(x, z);
    if (depth > 1.7) return BLOCKED;
    let c = 1;
    if (slope > 0.3) c += (slope - 0.3) * 9;
    if (depth > 0.2) c += 1.5 + depth * 2;
    const surf = T.surfaceAt(x, z);
    if (surf === 'mud' || surf === 'sand' || surf === 'snow') c += 0.4;
    if (surf === 'asphalt') c -= 0.15;
    let blocked = false;
    const push = { nx: 0, nz: 0, depth: 0 };
    this.map.statics.queryCircle(x, z, 4, (col) => {
      if (blocked || !col.blocksMove) return;
      if (!this.map.statics.circlePenetration(col, x, z, 2.2, push)) return;
      if (col.destructible && col.destructible.strength < 60) c += 2.5;
      else blocked = true;
    });
    return blocked ? BLOCKED : c;
  }

  private addClearance(): void {
    const d = this.dim;
    const extra = new Float32Array(d * d);
    for (let j = 1; j < d - 1; j++) {
      for (let i = 1; i < d - 1; i++) {
        const idx = j * d + i;
        if (this.cost[idx] >= BLOCKED) continue;
        let near = 0;
        for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) if (this.cost[idx + dj * d + di] >= BLOCKED) near++;
        extra[idx] = near * 0.6;
      }
    }
    for (let k = 0; k < d * d; k++) if (this.cost[k] < BLOCKED) this.cost[k] += extra[k];
  }

  /** Recomputes cells around a destroyed obstacle so the AI can use the new gap. */
  onColliderDestroyed(c: Collider): void {
    const r = (c.shape === 'circle' ? c.r : Math.hypot(c.hx, c.hz)) + 6;
    const i0 = this.cellOf(c.x - r);
    const i1 = this.cellOf(c.x + r);
    const j0 = this.cellOf(c.z - r);
    const j1 = this.cellOf(c.z + r);
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) this.cost[j * this.dim + i] = this.evaluate(i, j);
  }

  cellOf(v: number): number {
    return Math.max(0, Math.min(this.dim - 1, Math.floor((v + this.half) / CELL)));
  }

  isWalkable(x: number, z: number): boolean {
    return this.cost[this.cellOf(z) * this.dim + this.cellOf(x)] < BLOCKED;
  }

  /** Spiral search for the nearest walkable cell centre. */
  nearestWalkable(x: number, z: number, maxRadius = 30): Vec2 | null {
    const ci = this.cellOf(x);
    const cj = this.cellOf(z);
    for (let r = 0; r <= maxRadius; r++) {
      for (let dj = -r; dj <= r; dj++) {
        for (let di = -r; di <= r; di++) {
          if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue;
          const i = ci + di;
          const j = cj + dj;
          if (i < 0 || j < 0 || i >= this.dim || j >= this.dim) continue;
          if (this.cost[j * this.dim + i] < BLOCKED) return [this.center(i), this.center(j)];
        }
      }
    }
    return null;
  }

  findPath(fx: number, fz: number, tx: number, tz: number, maxExpand = 40000): Vec2[] | null {
    const d = this.dim;
    const startCell = this.nearestWalkable(fx, fz, 6);
    const goalCell = this.nearestWalkable(tx, tz, 12);
    if (!startCell || !goalCell) return null;
    const si = this.cellOf(startCell[0]);
    const sj = this.cellOf(startCell[1]);
    const gi = this.cellOf(goalCell[0]);
    const gj = this.cellOf(goalCell[1]);
    const start = sj * d + si;
    const goal = gj * d + gi;
    const run = ++this.run;
    const heap = this.heap;
    heap.clear();
    this.g[start] = 0;
    this.stamp[start] = run;
    this.parent[start] = -1;
    heap.push(start, 0);
    let expanded = 0;
    let best = start;
    let bestH = Infinity;
    while (heap.length > 0 && expanded < maxExpand) {
      const cur = heap.pop();
      if (this.closed[cur] === run) continue;
      this.closed[cur] = run;
      expanded++;
      if (cur === goal) {
        best = goal;
        break;
      }
      const ci = cur % d;
      const cj = (cur - ci) / d;
      const h0 = octile(ci, cj, gi, gj);
      if (h0 < bestH) {
        bestH = h0;
        best = cur;
      }
      for (let dj = -1; dj <= 1; dj++) {
        for (let di = -1; di <= 1; di++) {
          if (di === 0 && dj === 0) continue;
          const ni = ci + di;
          const nj = cj + dj;
          if (ni < 0 || nj < 0 || ni >= d || nj >= d) continue;
          const nidx = nj * d + ni;
          const c = this.cost[nidx];
          if (c >= BLOCKED || this.closed[nidx] === run) continue;
          if (di !== 0 && dj !== 0 && (this.cost[cj * d + ni] >= BLOCKED || this.cost[nj * d + ci] >= BLOCKED)) continue;
          const step = (di !== 0 && dj !== 0 ? SQRT2 : 1) * c;
          const ng = this.g[cur] + step;
          if (this.stamp[nidx] === run && ng >= this.g[nidx]) continue;
          this.stamp[nidx] = run;
          this.g[nidx] = ng;
          this.parent[nidx] = cur;
          heap.push(nidx, ng + octile(ni, nj, gi, gj));
        }
      }
    }
    // Reconstruct (to the goal or the closest reached cell).
    const cells: number[] = [];
    for (let c = best; c !== -1; c = this.parent[c]) {
      cells.push(c);
      if (cells.length > d * 4) break;
    }
    cells.reverse();
    return this.smooth(cells.map((c) => [this.center(c % d), this.center(Math.floor(c / d))] as Vec2));
  }

  /** Removes intermediate points while the straight line stays on cheap, walkable cells. */
  private smooth(path: Vec2[]): Vec2[] {
    if (path.length <= 2) return path;
    const out: Vec2[] = [path[0]];
    let anchor = 0;
    for (let i = 2; i < path.length; i++) {
      if (!this.lineWalkable(path[anchor], path[i])) {
        out.push(path[i - 1]);
        anchor = i - 1;
      }
    }
    out.push(path[path.length - 1]);
    return out;
  }

  lineWalkable(a: Vec2, b: Vec2): boolean {
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const len = Math.hypot(dx, dz);
    const n = Math.ceil(len / (CELL * 0.5));
    for (let k = 1; k < n; k++) {
      const x = a[0] + (dx * k) / n;
      const z = a[1] + (dz * k) / n;
      const c = this.cost[this.cellOf(z) * this.dim + this.cellOf(x)];
      if (c >= 3.5) return false;
    }
    return true;
  }
}

function octile(ai: number, aj: number, bi: number, bj: number): number {
  const dx = Math.abs(ai - bi);
  const dz = Math.abs(aj - bj);
  return (dx + dz + (SQRT2 - 2) * Math.min(dx, dz)) * 0.9;
}
