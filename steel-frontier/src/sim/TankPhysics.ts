import { Vector3 } from 'three';
import { SURFACES } from '../data/surfaces';
import { GRAVITY, clamp, forwardFromYaw, rightFromYaw } from '../core/math';
import type { Tank } from './Tank';
import type { World } from './World';

const ROLL_RESISTANCE = 0.06;
const MIN_TRACTION_SPEED = 1.3;
const MAX_TRACTIVE_ACCEL = 5.6;
const BRAKE_DECEL = 5.5;
const IDLE_DECEL = 1.6;
const SUSPENSION_K = 60;
const SUSPENSION_C = 11;
const FALL_DAMAGE_SPEED = 7;

const _f = new Vector3();
const _r = new Vector3();
const _n = new Vector3();
const _push = { nx: 0, nz: 0, depth: 0 };

/**
 * Track-laying vehicle dynamics: engine power limited traction, terrain resistance by surface class,
 * slope gravity, lateral grip (drifting on low-grip surfaces), differential track speeds,
 * spring-damper hull pitch/roll and free fall from ledges.
 */
export function stepTankPhysics(tank: Tank, world: World, dt: number, frozen: boolean): void {
  const T = world.terrain;
  const st = tank.stats;
  const input = tank.input;
  const pos = tank.position;
  const vel = tank.velocity;
  tank.prevPosition.copy(pos);
  tank.prevYaw = tank.yaw;
  tank.prevTurretYaw = tank.turretYaw;

  const m = st.mass;
  forwardFromYaw(tank.yaw, _f);
  rightFromYaw(tank.yaw, _r);
  T.normalAt(pos.x, pos.z, _n);

  const surfaceId = T.surfaceAt(pos.x, pos.z);
  tank.surface = surfaceId;
  const surface = SURFACES[surfaceId];
  const ice = T.isIce(pos.x, pos.z);
  const waterDepth = T.waterDepthAt(pos.x, pos.z);
  let grip = surface.grip * (ice ? 0.4 : 1);
  let resistance = tank.suspension.resistance[surface.resistanceClass] * (ice ? 0.75 : 1);
  let speedFactor = surface.speedFactor;
  if (waterDepth > 0.1) {
    resistance *= 1 + waterDepth * 1.4;
    speedFactor *= Math.max(0.35, 1 - waterDepth * 0.35);
    grip *= 0.8;
  }

  const canDrive = st.canMove && !frozen && !tank.airborne;
  const throttle = canDrive ? clamp(input.throttle, -1, 1) : 0;
  const steer = canDrive ? clamp(input.steer, -1, 1) : 0;

  let vLong = vel.dot(_f);
  let vLat = vel.dot(_r);

  // --- Longitudinal ---------------------------------------------------------
  const slopeAccel = GRAVITY * _n.y * (_n.x * _f.x + _n.z * _f.z);
  const slopeLat = GRAVITY * _n.y * (_n.x * _r.x + _n.z * _r.z);
  const vmax = (throttle >= 0 ? st.maxSpeed : st.reverseSpeed) * speedFactor;
  let drive = 0;
  if (throttle !== 0) {
    const tractionLimit = Math.min(grip * m * GRAVITY * _n.y, MAX_TRACTIVE_ACCEL * m);
    drive = (throttle * st.power) / Math.max(Math.abs(vLong), MIN_TRACTION_SPEED);
    drive = clamp(drive, -tractionLimit, tractionLimit);
    // Governor: no drive force above the speed limit in the commanded direction.
    const dirSpeed = vLong * Math.sign(throttle);
    if (dirSpeed > vmax) drive = 0;
    else if (dirSpeed > vmax - 1) drive *= vmax - dirSpeed;
  }
  let a = drive / m + slopeAccel;
  // Rolling resistance always opposes motion (static friction when nearly stopped).
  const rollDecel = ROLL_RESISTANCE * resistance * GRAVITY * _n.y;
  const aero = 0.0004 * vLong * Math.abs(vLong);
  vLong += a * dt - aero * dt;
  const opposing = throttle !== 0 && Math.sign(throttle) !== Math.sign(vLong) && Math.abs(vLong) > 0.2;
  let decel = rollDecel;
  if (opposing || input.brake) decel += BRAKE_DECEL * grip;
  else if (throttle === 0) decel += IDLE_DECEL;
  if (Math.abs(vLong) <= decel * dt) {
    // Track brakes hold the tank unless the slope overcomes static grip.
    const holdLimit = (grip + 0.15) * GRAVITY;
    vLong = throttle === 0 && Math.abs(slopeAccel) < holdLimit ? 0 : vLong;
    if (throttle === 0 && Math.abs(slopeAccel) < holdLimit) a = 0;
  } else {
    vLong -= Math.sign(vLong) * decel * dt;
  }

  // --- Lateral (skid / drift) -------------------------------------------------
  vLat += slopeLat * dt;
  const latFriction = grip * GRAVITY * 1.3;
  if (Math.abs(vLat) <= latFriction * dt) vLat = 0;
  else vLat -= Math.sign(vLat) * latFriction * dt;

  // --- Yaw -------------------------------------------------------------------
  const speedRatio = clamp(Math.abs(vLong) / Math.max(1, st.maxSpeed), 0, 1);
  const softPenalty = clamp(1.25 - resistance * 0.18, 0.6, 1);
  let targetRate = -steer * st.hullTraverse * (1 - 0.3 * speedRatio) * softPenalty;
  if (vLong < -0.5) targetRate = -targetRate; // reversing: keys follow the rear like a car
  if (!st.canMove) targetRate = 0;
  const yawAccel = st.hullTraverse * (2.5 + grip);
  const dYaw = clamp(targetRate - tank.yawRate, -yawAccel * dt, yawAccel * dt);
  tank.yawRate += dYaw;
  tank.yaw += tank.yawRate * dt;

  // Track grip carries velocity into the new heading; low grip lets the hull slide (drift).
  const carry = clamp(grip / 0.85, 0, 1);
  const newF = forwardFromYaw(tank.yaw, _f);
  const newR = rightFromYaw(tank.yaw, _r);
  const rot = tank.yawRate * dt * (1 - carry);
  const cs = Math.cos(rot);
  const sn = Math.sin(rot);
  const vl = vLong * cs + vLat * sn;
  const vt = -vLong * sn + vLat * cs;
  vel.x = newF.x * vl + newR.x * vt;
  vel.z = newF.z * vl + newR.z * vt;

  tank.speedLong = vl;
  const halfW = tank.data.hull.dims.width / 2;
  tank.trackSpeedL = vl + tank.yawRate * halfW;
  tank.trackSpeedR = vl - tank.yawRate * halfW;

  // --- Integrate horizontal ----------------------------------------------------
  pos.x += vel.x * dt;
  pos.z += vel.z * dt;
  tank.odometer += Math.hypot(vel.x, vel.z) * dt;

  // Map boundary
  const lim = T.half - 15;
  if (pos.x < -lim || pos.x > lim) {
    pos.x = clamp(pos.x, -lim, lim);
    vel.x = 0;
  }
  if (pos.z < -lim || pos.z > lim) {
    pos.z = clamp(pos.z, -lim, lim);
    vel.z = 0;
  }

  resolveStaticCollisions(tank, world);

  // --- Vertical: ground following & free fall --------------------------------------
  const ground = T.heightAt(pos.x, pos.z);
  if (pos.y > ground + 0.25) {
    tank.airborne = true;
    tank.vy -= GRAVITY * dt;
    pos.y += tank.vy * dt;
  }
  if (pos.y <= ground + 0.25) {
    if (tank.airborne && tank.vy < -FALL_DAMAGE_SPEED && tank.alive) {
      const impact = -tank.vy - FALL_DAMAGE_SPEED;
      world.damage.dealDamage(tank, null, impact * impact * m * 0.00012 + 5);
      world.damage.damageModule(tank, 'tracks', impact * 30);
    }
    tank.airborne = false;
    pos.y = ground;
    tank.vy = 0;
  }

  // --- Pitch / roll suspension -------------------------------------------------------
  const L = tank.data.hull.dims.length * 0.42;
  const W = halfW * 0.85;
  const hf = T.heightAt(pos.x + newF.x * L, pos.z + newF.z * L);
  const hb = T.heightAt(pos.x - newF.x * L, pos.z - newF.z * L);
  const hl = T.heightAt(pos.x - newR.x * W, pos.z - newR.z * W);
  const hr = T.heightAt(pos.x + newR.x * W, pos.z + newR.z * W);
  const pitchTarget = Math.atan2(hf - hb, 2 * L) - a * 0.004;
  const rollTarget = Math.atan2(hl - hr, 2 * W) + tank.yawRate * vl * 0.002;
  const massSoft = clamp(30000 / m, 0.5, 1.5);
  tank.pitchVel += (SUSPENSION_K * massSoft * (pitchTarget - tank.pitch) - SUSPENSION_C * tank.pitchVel) * dt;
  tank.rollVel += (SUSPENSION_K * massSoft * (rollTarget - tank.roll) - SUSPENSION_C * tank.rollVel) * dt;
  tank.pitch += tank.pitchVel * dt;
  tank.roll += tank.rollVel * dt;
  tank.updateQuaternion();

  // --- Drowning --------------------------------------------------------------------
  if (tank.alive && waterDepth > tank.data.hull.dims.height + tank.data.hull.dims.clearance) {
    tank.drowning += dt;
    if (tank.drowning > 6) world.damage.destroy(tank, null, false);
  } else tank.drowning = Math.max(0, tank.drowning - dt * 2);
}

/** Tank hull approximated by circles along its length vs static colliders. Destructibles may be flattened. */
function resolveStaticCollisions(tank: Tank, world: World): void {
  const S = world.statics;
  const dims = tank.data.hull.dims;
  const r = dims.width * 0.48;
  const span = Math.max(0, dims.length / 2 - r);
  const f = forwardFromYaw(tank.yaw, _f);
  const massT = tank.stats.mass / 1000;
  for (const off of span > 0.3 ? [-span, 0, span] : [0]) {
    const cx = tank.position.x + f.x * off;
    const cz = tank.position.z + f.z * off;
    S.queryCircle(cx, cz, r + 1, (c) => {
      if (!c.blocksMove) return;
      const y = tank.position.y;
      if (y + 0.5 < c.y0 || y + 1 > c.y1) return;
      if (!S.circlePenetration(c, cx, cz, r, _push)) return;
      const vn = tank.velocity.x * _push.nx + tank.velocity.z * _push.nz;
      if (c.destructible) {
        const momentum = massT * Math.max(0, -vn);
        if (momentum >= c.destructible.strength) {
          world.destroyCollider(c, tank);
          const keep = 1 - Math.min(0.6, (c.destructible.strength / Math.max(1, momentum)) * 0.5);
          tank.velocity.x *= keep;
          tank.velocity.z *= keep;
          return;
        }
      }
      tank.position.x += _push.nx * _push.depth;
      tank.position.z += _push.nz * _push.depth;
      if (vn < 0) {
        tank.velocity.x -= _push.nx * vn * 1.1;
        tank.velocity.z -= _push.nz * vn * 1.1;
        if (-vn > 8 && tank.alive) world.damage.dealDamage(tank, null, (-vn - 8) * massT * 0.4);
      }
    });
  }
}

/** Pairwise tank collisions with momentum exchange and ramming damage. */
export function resolveTankCollisions(world: World): void {
  const tanks = world.tanks;
  for (let i = 0; i < tanks.length; i++) {
    const a = tanks[i];
    for (let j = i + 1; j < tanks.length; j++) {
      const b = tanks[j];
      const ra = a.data.hull.dims.length * 0.5;
      const rb = b.data.hull.dims.length * 0.5;
      const dx = b.position.x - a.position.x;
      const dz = b.position.z - a.position.z;
      if (dx * dx + dz * dz > (ra + rb) * (ra + rb)) continue;
      if (Math.abs(a.position.y - b.position.y) > 4) continue;
      collidePair(world, a, b);
    }
  }
}

function collidePair(world: World, a: Tank, b: Tank): void {
  const fa = forwardFromYaw(a.yaw);
  const fb = forwardFromYaw(b.yaw);
  const circles = (t: Tank, f: Vector3) => {
    const r = t.data.hull.dims.width * 0.48;
    const span = Math.max(0, t.data.hull.dims.length / 2 - r);
    return [-span, 0, span].map((o) => ({ x: t.position.x + f.x * o, z: t.position.z + f.z * o, r }));
  };
  const ca = circles(a, fa);
  const cb = circles(b, fb);
  let best = { depth: 0, nx: 0, nz: 0, px: 0, pz: 0 };
  for (const p of ca) {
    for (const q of cb) {
      const dx = q.x - p.x;
      const dz = q.z - p.z;
      const d = Math.sqrt(dx * dx + dz * dz);
      const depth = p.r + q.r - d;
      if (depth > best.depth && d > 1e-4) best = { depth, nx: dx / d, nz: dz / d, px: (p.x + q.x) / 2, pz: (p.z + q.z) / 2 };
    }
  }
  if (best.depth <= 0) return;
  const ma = a.stats.mass;
  const mb = b.stats.mass;
  const total = ma + mb;
  // Separate proportionally to the other tank's mass (wrecks are heavy to push).
  const wa = a.alive ? mb / total : 0.1;
  const wb = b.alive ? ma / total : 0.1;
  const norm = wa + wb;
  a.position.x -= best.nx * best.depth * (wa / norm);
  a.position.z -= best.nz * best.depth * (wa / norm);
  b.position.x += best.nx * best.depth * (wb / norm);
  b.position.z += best.nz * best.depth * (wb / norm);
  const rel = (b.velocity.x - a.velocity.x) * best.nx + (b.velocity.z - a.velocity.z) * best.nz;
  if (rel >= 0) return;
  const e = 0.15;
  const jImp = (-(1 + e) * rel) / (1 / ma + 1 / mb);
  a.velocity.x -= (jImp / ma) * best.nx;
  a.velocity.z -= (jImp / ma) * best.nz;
  b.velocity.x += (jImp / mb) * best.nx;
  b.velocity.z += (jImp / mb) * best.nz;
  const closing = -rel;
  if (closing > 2.5 && a.team !== b.team) {
    const reduced = (ma * mb) / total;
    const energy = 0.5 * reduced * closing * closing;
    const dmgA = energy * 1.3e-4 * (mb / total) * 2;
    const dmgB = energy * 1.3e-4 * (ma / total) * 2;
    const pos = new Vector3(best.px, (a.position.y + b.position.y) / 2 + 1, best.pz);
    if (a.alive && b.alive) {
      world.damage.dealDamage(b, a, dmgB);
      world.damage.dealDamage(a, b, dmgA);
      world.events.emit('ram', { a, b, damage: Math.round(dmgB), pos });
    }
  }
}
