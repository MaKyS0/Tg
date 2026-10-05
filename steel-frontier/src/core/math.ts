import { Vector3 } from 'three';

export const DEG = Math.PI / 180;
export const RAD = 180 / Math.PI;
export const TAU = Math.PI * 2;
export const GRAVITY = 9.81;

export function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Wraps an angle into [-PI, PI]. */
export function wrapAngle(a: number): number {
  a = (a + Math.PI) % TAU;
  if (a < 0) a += TAU;
  return a - Math.PI;
}

/** Moves `current` toward `target` by at most `maxDelta` (angular, shortest path). */
export function approachAngle(current: number, target: number, maxDelta: number): number {
  const d = wrapAngle(target - current);
  if (Math.abs(d) <= maxDelta) return target;
  return current + Math.sign(d) * maxDelta;
}

export function approach(current: number, target: number, maxDelta: number): number {
  if (current < target) return Math.min(current + maxDelta, target);
  return Math.max(current - maxDelta, target);
}

/** Frame-rate independent exponential smoothing factor. */
export function damp(lambda: number, dt: number): number {
  return 1 - Math.exp(-lambda * dt);
}

export function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Forward vector for a yaw angle. Tank local frame: +Z forward, +X left, +Y up. */
export function forwardFromYaw(yaw: number, out = new Vector3()): Vector3 {
  return out.set(Math.sin(yaw), 0, Math.cos(yaw));
}

export function rightFromYaw(yaw: number, out = new Vector3()): Vector3 {
  return out.set(-Math.cos(yaw), 0, Math.sin(yaw));
}

export function yawOf(dx: number, dz: number): number {
  return Math.atan2(dx, dz);
}

export function dist2D(ax: number, az: number, bx: number, bz: number): number {
  const dx = ax - bx;
  const dz = az - bz;
  return Math.sqrt(dx * dx + dz * dz);
}

/** Distance from point to polyline segment in XZ. */
export function distToSegment2D(px: number, pz: number, ax: number, az: number, bx: number, bz: number): number {
  const abx = bx - ax;
  const abz = bz - az;
  const len2 = abx * abx + abz * abz;
  let t = len2 > 0 ? ((px - ax) * abx + (pz - az) * abz) / len2 : 0;
  t = clamp(t, 0, 1);
  return dist2D(px, pz, ax + abx * t, az + abz * t);
}

export function formatNumber(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
