import { Vector3 } from 'three';
import type { AmmoData } from '../data/types';
import { GRAVITY } from '../core/math';

/**
 * Point-mass shell ballistics with gravity and quadratic air drag (a = -k|v|v).
 * Used identically by live projectiles, aim prediction, artillery solver and AI.
 */
export function shellGravity(ammo: AmmoData): number {
  return GRAVITY * ammo.gravityScale;
}

/** Advances position/velocity in place by dt using semi-implicit Euler. */
export function integrateShell(pos: Vector3, vel: Vector3, ammo: AmmoData, dt: number): void {
  const speed = vel.length();
  const k = ammo.dragK * speed;
  vel.x -= vel.x * k * dt;
  vel.y -= vel.y * k * dt + shellGravity(ammo) * dt;
  vel.z -= vel.z * k * dt;
  pos.addScaledVector(vel, dt);
}

export interface TrajectorySample {
  x: number; // horizontal distance
  y: number; // height relative to origin
  t: number;
}

/**
 * Simulates the 2D trajectory (horizontal distance, height) for a given elevation angle and returns
 * the height when the horizontal distance `range` is reached (or null if the shell falls short).
 */
export function heightAtRange(ammo: AmmoData, elevation: number, range: number, maxTime = 30): { y: number; t: number } | null {
  const step = 1 / 120;
  let x = 0;
  let y = 0;
  let vx = Math.cos(elevation) * ammo.velocity;
  let vy = Math.sin(elevation) * ammo.velocity;
  const g = shellGravity(ammo);
  let t = 0;
  while (t < maxTime) {
    const speed = Math.sqrt(vx * vx + vy * vy);
    const k = ammo.dragK * speed;
    const nvx = vx - vx * k * step;
    const nvy = vy - (vy * k + g) * step;
    const nx = x + nvx * step;
    const ny = y + nvy * step;
    if (nx >= range) {
      const f = (range - x) / Math.max(1e-6, nx - x);
      return { y: y + (ny - y) * f, t: t + step * f };
    }
    if (ny < -2000 || nvx < 1) return null;
    x = nx;
    y = ny;
    vx = nvx;
    vy = nvy;
    t += step;
  }
  return null;
}

/**
 * Finds the elevation angle needed to hit a point at horizontal distance `range` and height `dy`.
 * `high` selects the high-arc solution (artillery over obstacles). Returns null if out of range.
 */
export function solveElevation(ammo: AmmoData, range: number, dy: number, high = false): number | null {
  if (range < 0.5) return Math.atan2(dy, Math.max(0.01, range));
  // Elevation that maximises range lies below 45° with drag; search a bracket by sampling.
  const samples = 24;
  let bestAngle = 0;
  let bestY = -Infinity;
  const lo = -0.35;
  const hi = 1.25;
  const values: Array<{ a: number; y: number }> = [];
  for (let i = 0; i <= samples; i++) {
    const a = lo + ((hi - lo) * i) / samples;
    const r = heightAtRange(ammo, a, range);
    const y = r ? r.y : -Infinity;
    values.push({ a, y });
    if (y > bestY) {
      bestY = y;
      bestAngle = a;
    }
  }
  if (bestY < dy) return null;
  // Bisection on the requested branch (monotonic on each side of the max).
  let a0: number;
  let a1: number;
  if (!high) {
    a0 = lo;
    a1 = bestAngle;
    if ((heightAtRange(ammo, a0, range)?.y ?? -Infinity) > dy) return a0;
  } else {
    a0 = bestAngle;
    a1 = hi;
  }
  for (let k = 0; k < 28; k++) {
    const mid = (a0 + a1) / 2;
    const y = heightAtRange(ammo, mid, range)?.y ?? -Infinity;
    const above = y > dy;
    if (!high) {
      if (above) a1 = mid;
      else a0 = mid;
    } else if (above) a0 = mid;
    else a1 = mid;
  }
  return (a0 + a1) / 2;
}

/** Fast elevation estimate for flat-trajectory guns (gravity only, small-angle solution with drag correction). */
export function quickElevation(ammo: AmmoData, range: number, dy: number): number {
  const g = shellGravity(ammo);
  const v = ammo.velocity * Math.exp(-ammo.dragK * range * 0.5);
  const v2 = v * v;
  const disc = v2 * v2 - g * (g * range * range + 2 * dy * v2);
  if (disc < 0) return Math.PI / 4;
  return Math.atan((v2 - Math.sqrt(disc)) / (g * range));
}

/** Maximum horizontal range on flat ground (artillery UI). */
export function maxRange(ammo: AmmoData): number {
  let best = 0;
  for (let a = 0.2; a <= 1.1; a += 0.05) {
    let lo = 0;
    let hi = 6000;
    for (let k = 0; k < 20; k++) {
      const mid = (lo + hi) / 2;
      const r = heightAtRange(ammo, a, mid);
      if (r && r.y >= 0) lo = mid;
      else hi = mid;
    }
    best = Math.max(best, lo);
  }
  return best;
}

/** Samples a 3D trajectory for prediction/visualisation. Calls `visit` per segment; stop by returning true. */
export function traceTrajectory(origin: Vector3, dir: Vector3, ammo: AmmoData, maxTime: number, step: number,
  visit: (a: Vector3, b: Vector3, t: number) => boolean): void {
  const pos = origin.clone();
  const vel = dir.clone().multiplyScalar(ammo.velocity);
  const prev = new Vector3();
  for (let t = 0; t < maxTime; t += step) {
    prev.copy(pos);
    integrateShell(pos, vel, ammo, step);
    if (visit(prev, pos, t + step)) return;
  }
}
