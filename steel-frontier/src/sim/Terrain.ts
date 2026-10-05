import { Vector3 } from 'three';
import { SURFACE_IDS } from '../data/surfaces';
import type { SurfaceId } from '../data/types';
import { clamp } from '../core/math';

/** Heightfield terrain with per-cell surface types. Pure data; used by physics, ballistics, AI and rendering. */
export class Terrain {
  readonly half: number;
  readonly res: number; // cells per side
  readonly verts: number; // vertices per side
  readonly heights: Float32Array;
  readonly surface: Uint8Array;
  /** Cells flagged as frozen ice (low grip, no water). */
  readonly ice: Uint8Array;

  constructor(
    readonly size: number,
    readonly cell: number,
    readonly waterLevel: number,
  ) {
    this.half = size / 2;
    this.res = Math.round(size / cell);
    this.verts = this.res + 1;
    this.heights = new Float32Array(this.verts * this.verts);
    this.surface = new Uint8Array(this.res * this.res);
    this.ice = new Uint8Array(this.res * this.res);
  }

  vertexX(i: number): number {
    return -this.half + i * this.cell;
  }

  getVertexHeight(i: number, j: number): number {
    i = clamp(i, 0, this.verts - 1);
    j = clamp(j, 0, this.verts - 1);
    return this.heights[j * this.verts + i];
  }

  heightAt(x: number, z: number): number {
    const fx = clamp((x + this.half) / this.cell, 0, this.res - 1e-4);
    const fz = clamp((z + this.half) / this.cell, 0, this.res - 1e-4);
    const i = Math.floor(fx);
    const j = Math.floor(fz);
    const tx = fx - i;
    const tz = fz - j;
    const v = this.verts;
    const h00 = this.heights[j * v + i];
    const h10 = this.heights[j * v + i + 1];
    const h01 = this.heights[(j + 1) * v + i];
    const h11 = this.heights[(j + 1) * v + i + 1];
    return (h00 * (1 - tx) + h10 * tx) * (1 - tz) + (h01 * (1 - tx) + h11 * tx) * tz;
  }

  normalAt(x: number, z: number, out = new Vector3()): Vector3 {
    const e = this.cell;
    const hl = this.heightAt(x - e, z);
    const hr = this.heightAt(x + e, z);
    const hd = this.heightAt(x, z - e);
    const hu = this.heightAt(x, z + e);
    return out.set(hl - hr, 2 * e, hd - hu).normalize();
  }

  /** Slope as 1 - normal.y-ish gradient magnitude (rise/run). */
  slopeAt(x: number, z: number): number {
    const e = this.cell;
    const dx = (this.heightAt(x + e, z) - this.heightAt(x - e, z)) / (2 * e);
    const dz = (this.heightAt(x, z + e) - this.heightAt(x, z - e)) / (2 * e);
    return Math.sqrt(dx * dx + dz * dz);
  }

  cellIndex(x: number, z: number): number {
    const i = clamp(Math.floor((x + this.half) / this.cell), 0, this.res - 1);
    const j = clamp(Math.floor((z + this.half) / this.cell), 0, this.res - 1);
    return j * this.res + i;
  }

  surfaceAt(x: number, z: number): SurfaceId {
    return SURFACE_IDS[this.surface[this.cellIndex(x, z)]];
  }

  isIce(x: number, z: number): boolean {
    return this.ice[this.cellIndex(x, z)] === 1;
  }

  waterDepthAt(x: number, z: number): number {
    if (this.isIce(x, z)) return 0;
    return Math.max(0, this.waterLevel - this.heightAt(x, z));
  }

  inBounds(x: number, z: number, margin = 0): boolean {
    const h = this.half - margin;
    return x > -h && x < h && z > -h && z < h;
  }

  /**
   * Marches a ray against the heightfield. Returns hit distance or -1.
   * `step` defaults to half a cell; hit is refined by bisection.
   */
  raycast(origin: Vector3, dir: Vector3, maxDist: number, step = this.cell * 0.5): number {
    let prevT = 0;
    let prevAbove = origin.y - this.heightAt(origin.x, origin.z);
    if (prevAbove < 0) return 0;
    for (let t = step; t <= maxDist + step; t += step) {
      const tt = Math.min(t, maxDist);
      const x = origin.x + dir.x * tt;
      const y = origin.y + dir.y * tt;
      const z = origin.z + dir.z * tt;
      const above = y - this.heightAt(x, z);
      if (above < 0) {
        let lo = prevT;
        let hi = tt;
        for (let k = 0; k < 6; k++) {
          const mid = (lo + hi) / 2;
          const my = origin.y + dir.y * mid;
          const ma = my - this.heightAt(origin.x + dir.x * mid, origin.z + dir.z * mid);
          if (ma < 0) hi = mid;
          else lo = mid;
        }
        return hi;
      }
      prevT = tt;
      prevAbove = above;
      if (tt >= maxDist) break;
    }
    return -1;
  }

  /** True if a straight segment between two points does not intersect the ground. */
  segmentClear(a: Vector3, b: Vector3, step = this.cell): boolean {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const n = Math.max(1, Math.ceil(len / step));
    for (let k = 1; k < n; k++) {
      const t = k / n;
      const y = a.y + dy * t;
      if (y < this.heightAt(a.x + dx * t, a.z + dz * t)) return false;
    }
    return true;
  }
}
