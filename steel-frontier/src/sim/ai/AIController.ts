import { Vector3 } from 'three';
import type { Vec2 } from '../../data/types';
import { DEG, clamp, wrapAngle, yawOf } from '../../core/math';
import { previewShot, rayHitsTank } from '../ArmorSystem';
import { maxRange } from '../Ballistics';
import type { Tank } from '../Tank';
import type { TankController, World } from '../World';
import type { DifficultyProfile } from './AIDifficulty';
import { gridSquare, type TeamBrain } from './TeamBrain';

export type AIRole = 'scout' | 'flanker' | 'brawler' | 'sniper' | 'artillery';
export type AIState = 'advance' | 'engage' | 'cover' | 'retreat' | 'capture' | 'defend' | 'support' | 'hunt' | 'hold';

const ROLE_BY_CLASS: Record<string, AIRole> = { LT: 'scout', MT: 'flanker', HT: 'brawler', TD: 'sniper', SPG: 'artillery' };

const _v = new Vector3();
const _v2 = new Vector3();
const _dir = new Vector3();

interface Memory {
  pos: Vector3;
  vel: Vector3;
  time: number;
}

/**
 * Behaviour: utility-style strategic layer (advance/engage/capture/defend/support/retreat/hunt) on
 * top of A* navigation with local avoidance & unstuck logic, plus a fire-control layer that
 * selects targets by threat/penetrability, picks ammo, leads moving targets, waits for aim
 * convergence, aims at weak spots, angles armour and uses cover while reloading.
 */
export class AIController implements TankController {
  readonly role: AIRole;
  state: AIState = 'advance';
  target: Tank | null = null;
  private goal: Vec2 | null = null;
  private path: Vec2[] = [];
  private pathIndex = 0;
  private repathTimer = 0;
  private thinkTimer: number;
  private targetTimer = 0;
  private reactionLeft = 0;
  private aimWait = 0;
  private aimNoise = new Vector3();
  private noiseTimer = 0;
  private memoryTimer = 0;
  private stuckTimer = 0;
  private stuckCount = 0;
  private stuckCheckPos = new Vector3();
  private unstuckTimer = 0;
  private unstuckSteer = 1;
  private lane: Vec2[];
  private laneIndex = 0;
  private holdSpot: Vec2 | null = null;
  private firingSpot: Vec2 | null = null;
  private lastAmmoSwitch = -100;
  private lastHelpCall = -100;
  private memory = new Map<number, Memory>();
  private losCache = new Map<number, { time: number; clear: boolean }>();
  private wasDamagedAt = -100;
  private strafeDir = 1;
  private strafeTimer = 0;
  private reverseOut = false;

  constructor(readonly tank: Tank, private readonly world: World, private readonly brain: TeamBrain, readonly difficulty: DifficultyProfile) {
    this.role = ROLE_BY_CLASS[tank.data.cls] ?? 'flanker';
    this.thinkTimer = world.rng.range(0, difficulty.thinkInterval);
    this.stuckCheckPos.copy(tank.position);
    const lanes = world.map.data.lanes;
    const pick = this.role === 'brawler' ? lanes.heavy : this.role === 'scout' || this.role === 'flanker'
      ? (world.rng.chance(0.6) ? lanes.light : lanes.center)
      : lanes.center;
    const flip = tank.team === 1;
    this.lane = flip ? [...pick].reverse() : [...pick];
    if (this.role === 'sniper' || this.role === 'scout') {
      const spots = this.role === 'sniper' ? world.map.data.sniperSpots : world.map.data.scoutSpots;
      const list = tank.team === 0 ? spots.a : spots.b;
      if (list.length) this.holdSpot = world.rng.pick(list);
    }
    if (this.role === 'artillery') {
      const spawn = tank.team === 0 ? world.map.data.spawns.a : world.map.data.spawns.b;
      this.holdSpot = [spawn[0] + world.rng.range(-60, 60), spawn[1] + (tank.team === 0 ? 20 : -20)];
    }
  }

  // ===========================================================================
  update(world: World, dt: number): void {
    const t = this.tank;
    const inp = t.input;
    if (!t.alive) {
      inp.throttle = 0;
      inp.steer = 0;
      inp.fire = false;
      return;
    }
    if (t.lastDamageTime > this.wasDamagedAt) this.onDamaged();
    this.thinkTimer -= dt;
    if (this.thinkTimer <= 0) {
      this.thinkTimer = this.difficulty.thinkInterval * world.rng.range(0.8, 1.2);
      this.think();
    }
    this.targetTimer -= dt;
    if (this.targetTimer <= 0) {
      this.targetTimer = 0.35 + world.rng.next() * 0.2;
      this.selectTarget();
    }
    this.memoryTimer -= dt;
    if (this.memoryTimer <= 0) {
      this.memoryTimer = 0.25;
      this.updateMemory();
    }
    this.drive(dt);
    this.fireControl(dt);
    this.useConsumables();
  }

  /** Extinguisher on fire, repair kit when immobilised/disarmed under fire, medkit for a wounded crew. */
  private useConsumables(): void {
    const t = this.tank;
    const inp = t.input;
    if (this.difficulty.id === 'easy') return;
    if (t.burning && !t.consumableUsed[2]) inp.consumable = 2;
    else if (!t.consumableUsed[0] && (t.modules.tracks.status === 'destroyed' || t.modules.gun.status === 'destroyed')
      && (this.target || this.world.time - t.lastDamageTime < 5)) inp.consumable = 0;
    else if (!t.consumableUsed[1] && t.crew.filter((c) => c.wounded).length >= 2) inp.consumable = 1;
  }

  // --- Perception ------------------------------------------------------------
  private visibleEnemies(): Tank[] {
    const out: Tank[] = [];
    for (const e of this.world.tanks) {
      if (e.team !== this.tank.team && e.alive && this.world.detection.isVisibleTo(this.tank, e)) out.push(e);
    }
    return out;
  }

  private updateMemory(): void {
    for (const e of this.visibleEnemies()) {
      const m = this.memory.get(e.id);
      if (m) {
        m.pos.copy(e.position);
        m.vel.copy(e.velocity);
        m.time = this.world.time;
      } else this.memory.set(e.id, { pos: e.position.clone(), vel: e.velocity.clone(), time: this.world.time });
    }
  }

  private onDamaged(): void {
    const t = this.tank;
    this.wasDamagedAt = t.lastDamageTime;
    const attacker = this.world.tankById(t.lastDamagedBy);
    if (attacker && attacker.team !== t.team && attacker.alive && this.world.detection.isVisibleTo(t, attacker)) {
      if (!this.target || this.world.rng.chance(0.6)) this.setTarget(attacker);
    }
    if (t.hpFraction < 0.5 && this.world.time - this.lastHelpCall > 30) {
      this.lastHelpCall = this.world.time;
      this.brain.say(t, 'help', `${t.callsign}: Нужна помощь в квадрате ${gridSquare(this.world, t.position)}!`, true);
    }
    if (this.difficulty.coverChance > 0 && t.reloadTimer > 3 && this.world.rng.chance(this.difficulty.coverChance * 0.6)) this.seekCover();
  }

  private lineOfFire(target: Tank, aim: Vector3): boolean {
    const cached = this.losCache.get(target.id);
    if (cached && this.world.time - cached.time < 0.4) return cached.clear;
    const from = this.tank.gunWorldPosition(_v2).clone();
    const clear = this.world.detection.lineOfSight(from, aim) && (!this.difficulty.carefulFire || !this.allyInLine(from, aim));
    this.losCache.set(target.id, { time: this.world.time, clear });
    return clear;
  }

  private allyInLine(from: Vector3, to: Vector3): boolean {
    _dir.subVectors(to, from);
    const len = _dir.length();
    _dir.divideScalar(len);
    for (const a of this.world.tanks) {
      if (a === this.tank || a.team !== this.tank.team || !a.alive) continue;
      const tHit = rayHitsTank(a, from, _dir, len);
      if (tHit >= 0) return true;
    }
    return false;
  }

  // --- Strategic layer ---------------------------------------------------------
  private think(): void {
    const w = this.world;
    const t = this.tank;
    const mode = w.mode;
    const visible = this.visibleEnemies();
    const hp = t.hpFraction;
    const myPos = t.position;
    const allies = w.tanks.filter((x) => x.team === t.team && x.alive);
    const enemiesAlive = w.tanks.filter((x) => x.team !== t.team && x.alive).length;
    const defend = mode.defendBase(t.team);
    const attack = mode.attackBase(t.team);
    const time = w.battleTime;

    // 1. Defend base under capture.
    if (defend && this.role !== 'artillery') {
      const enemyPts = defend.owner === -1 ? defend.points[1 - t.team] : defend.points[1 - t.team];
      const dist = Math.hypot(myPos.x - defend.x, myPos.z - defend.z);
      if (enemyPts > 12 && dist < 520 && (this.role !== 'sniper' || dist < 250)) {
        if (this.state !== 'defend') this.brain.say(t, 'defend', `${t.callsign}: Возвращаюсь на защиту базы!`);
        this.state = 'defend';
        const capturer = defend.capturers.find((c) => c.team !== t.team);
        if (capturer && w.detection.isVisibleTo(t, capturer)) this.setTarget(capturer);
        this.setGoal([defend.x + w.rng.range(-20, 20), defend.z + w.rng.range(-20, 20)]);
        return;
      }
    }

    // 2. Retreat when badly damaged.
    const regroup = w.time < this.brain.regroupUntil;
    if ((hp < this.difficulty.retreatHp || (regroup && hp < 0.5)) && visible.some((e) => e.position.distanceTo(myPos) < 260)) {
      this.state = 'retreat';
      const home = t.team === 0 ? w.map.data.bases.a : w.map.data.bases.b;
      const cover = this.findCover(visible[0], 60);
      this.setGoal(cover ?? home);
      return;
    }

    // 3. Capture.
    const canCaptureNow = attack && (
      !mode.data.winByDestroy
      || enemiesAlive <= Math.max(1, Math.floor(allies.length / 3))
      || time > mode.data.timeLimit * 0.55
      || (mode.attackers === t.team && time > 70)
      || (mode.data.bases === 'neutral' && time > 50 && this.role !== 'sniper' && this.role !== 'artillery')
      || (visible.length === 0 && this.brain.lastKnown.size === 0 && time > 100)
    );
    if (attack && canCaptureNow && this.role !== 'artillery' && (this.role !== 'sniper' || enemiesAlive <= 2 || time > mode.data.timeLimit * 0.75)) {
      if (this.state !== 'capture') this.brain.say(t, 'capture', `${t.callsign}: Иду на захват базы!`);
      this.state = 'capture';
      if (!this.goal || Math.hypot(this.goal[0] - attack.x, this.goal[1] - attack.z) > attack.radius) {
        this.setGoal([attack.x + w.rng.range(-18, 18), attack.z + w.rng.range(-18, 18)]);
      }
      return;
    }

    // 4. Support allies who called for help.
    const help = this.brain.helpRequests.find((h) => h.from !== t && h.from.alive && h.pos.distanceTo(myPos) < 280);
    if (help && this.role !== 'artillery' && this.role !== 'sniper' && visible.length === 0) {
      this.state = 'support';
      this.setGoal([help.pos.x + w.rng.range(-25, 25), help.pos.z + w.rng.range(-25, 25)]);
      return;
    }

    // 5. Engage visible targets according to role.
    if (this.target && this.target.alive && visible.includes(this.target)) {
      if (this.state === 'cover') return;
      this.state = 'engage';
      this.planEngagement(this.target);
      return;
    }

    // 6. Role positions / advance along lanes / hunt.
    if (this.holdSpot && (this.role === 'sniper' || this.role === 'artillery' || (this.role === 'scout' && time < 200)) && w.time >= this.brain.aggressiveUntil) {
      this.state = 'hold';
      this.setGoal(this.holdSpot);
      return;
    }
    if (this.laneIndex < this.lane.length) {
      this.state = 'advance';
      const p = this.lane[this.laneIndex];
      if (Math.hypot(myPos.x - p[0], myPos.z - p[1]) < 30) this.laneIndex++;
      const next = this.lane[Math.min(this.laneIndex, this.lane.length - 1)];
      // Heavies and mediums move in loose groups: don't run far ahead of allies.
      this.setGoal(next);
      return;
    }
    this.state = 'hunt';
    let best: Vec2 | null = null;
    let bestD = Infinity;
    for (const rec of this.brain.lastKnown.values()) {
      const d = rec.pos.distanceTo(myPos);
      if (d < bestD) {
        bestD = d;
        best = [rec.pos.x, rec.pos.z];
      }
    }
    if (!best) {
      const enemySpawn = t.team === 0 ? w.map.data.spawns.b : w.map.data.spawns.a;
      best = attack ? [attack.x, attack.z] : enemySpawn;
    }
    this.setGoal(best);
  }

  private planEngagement(target: Tank): void {
    const t = this.tank;
    const w = this.world;
    const d = target.position.distanceTo(t.position);
    const aggressive = w.time < this.brain.aggressiveUntil;
    switch (this.role) {
      case 'artillery':
      case 'sniper':
        if (this.holdSpot) this.setGoal(this.holdSpot);
        else this.setGoal(null);
        break;
      case 'brawler': {
        const want = aggressive ? 60 : 140;
        if (d > want + 40) this.setGoal(this.approachPoint(target, want));
        else this.setGoal(null);
        break;
      }
      case 'flanker': {
        const want = aggressive ? 100 : 200;
        if (d > want + 60) this.setGoal(this.approachPoint(target, want));
        else if (d < 70) this.setGoal(this.retreatPoint(target, 60));
        else this.setGoal(null);
        break;
      }
      case 'scout':
        if (d < 120) {
          // Circle-strafe at close range.
          const ang = yawOf(t.position.x - target.position.x, t.position.z - target.position.z) + this.strafeDir * 0.6;
          this.setGoal([target.position.x + Math.sin(ang) * 70, target.position.z + Math.cos(ang) * 70]);
        } else if (this.holdSpot && w.battleTime < 240) this.setGoal(this.holdSpot);
        else this.setGoal(null);
        break;
    }
  }

  private approachPoint(target: Tank, distance: number): Vec2 {
    const p = this.tank.position;
    const dx = p.x - target.position.x;
    const dz = p.z - target.position.z;
    const side = this.role === 'flanker' ? this.strafeDir * 0.5 : 0;
    const ang = Math.atan2(dx, dz) + side;
    return [target.position.x + Math.sin(ang) * distance, target.position.z + Math.cos(ang) * distance];
  }

  private retreatPoint(target: Tank, extra: number): Vec2 {
    const p = this.tank.position;
    const dx = p.x - target.position.x;
    const dz = p.z - target.position.z;
    const len = Math.hypot(dx, dz) || 1;
    return [p.x + (dx / len) * extra, p.z + (dz / len) * extra];
  }

  /** Point near the tank that hides it from `threat` (terrain or buildings block the line of sight). */
  private findCover(threat: Tank | undefined, maxDist = 45): Vec2 | null {
    if (!threat) return null;
    const w = this.world;
    const p = this.tank.position;
    const eye = threat.eyePosition(new Vector3());
    let best: Vec2 | null = null;
    let bestScore = Infinity;
    const awayYaw = yawOf(p.x - threat.position.x, p.z - threat.position.z);
    for (const r of [12, 24, maxDist]) {
      for (let k = 0; k < 10; k++) {
        const ang = awayYaw + ((k - 4.5) / 4.5) * Math.PI * 0.75;
        const x = p.x + Math.sin(ang) * r;
        const z = p.z + Math.cos(ang) * r;
        if (!w.nav.isWalkable(x, z)) continue;
        const y = w.terrain.heightAt(x, z) + this.tank.layout.turretTop * 0.8;
        _v.set(x, y, z);
        if (w.detection.lineOfSight(eye, _v)) continue;
        const score = r + Math.abs(k - 4.5) * 3;
        if (score < bestScore) {
          bestScore = score;
          best = [x, z];
        }
      }
      if (best) break;
    }
    return best;
  }

  private seekCover(): void {
    const threat = this.target ?? this.visibleEnemies()[0];
    const spot = this.findCover(threat);
    if (!spot) return;
    this.firingSpot = [this.tank.position.x, this.tank.position.z];
    this.state = 'cover';
    this.setGoal(spot);
  }

  /** Sideways waypoint to get around an obstacle the grid does not know about (wrecks, tanks, steep bumps). */
  private addDetour(): void {
    const t = this.tank;
    const w = this.world;
    const side = w.rng.chance(0.5) ? 1 : -1;
    for (const ang of [side * 1.2, -side * 1.2, side * 2.2, -side * 2.2]) {
      const yaw = t.yaw + ang;
      const x = t.position.x + Math.sin(yaw) * 22;
      const z = t.position.z + Math.cos(yaw) * 22;
      if (!w.nav.isWalkable(x, z) || w.terrain.slopeAt(x, z) > 0.35) continue;
      this.path.splice(this.pathIndex, 0, [x, z]);
      this.repathTimer = 5;
      return;
    }
  }

  private setGoal(goal: Vec2 | null): void {
    if (!goal) {
      this.goal = null;
      this.path = [];
      return;
    }
    const changed = !this.goal || Math.hypot(goal[0] - this.goal[0], goal[1] - this.goal[1]) > 20;
    this.goal = goal;
    if (changed || this.repathTimer <= 0 || this.pathIndex >= this.path.length) this.repath();
  }

  private repath(): void {
    if (!this.goal) return;
    const p = this.tank.position;
    const path = this.world.nav.findPath(p.x, p.z, this.goal[0], this.goal[1]);
    this.path = path ?? [this.goal];
    this.pathIndex = this.path.length > 1 ? 1 : 0;
    this.repathTimer = 6 + this.world.rng.next() * 2;
  }

  // --- Target selection --------------------------------------------------------
  private setTarget(e: Tank | null): void {
    if (e !== this.target) {
      this.target = e;
      this.reactionLeft = this.difficulty.reaction * this.world.rng.range(0.8, 1.3);
      this.aimWait = 0;
    }
  }

  private selectTarget(): void {
    const t = this.tank;
    const w = this.world;
    const visible = this.visibleEnemies();
    if (visible.length === 0) {
      this.setTarget(null);
      return;
    }
    const maxRangeM = t.isArtillery ? this.artyRange() : 650;
    let best: Tank | null = null;
    let bestScore = -Infinity;
    const gun = t.gunWorldPosition(new Vector3());
    const defend = w.mode.defendBase(t.team);
    for (const e of visible) {
      const d = e.position.distanceTo(t.position);
      if (d > maxRangeM) continue;
      const aim = this.aimPointFor(e, false);
      if (!t.isArtillery && !this.lineOfFire(e, aim)) continue;
      let score = 1.2 * (1 - d / maxRangeM) + 0.7 * (1 - e.hpFraction);
      // Threat: target aiming at us or recently hurt us.
      e.gunDirection(_dir);
      _v.subVectors(t.position, e.position).normalize();
      if (_dir.dot(_v) > 0.97) score += 0.35;
      if (t.lastDamagedBy === e.id && w.time - t.lastDamageTime < 8) score += 0.6;
      if (e === this.target) score += 0.35; // stickiness
      if (e.data.cls === 'SPG') score += 0.25;
      if (this.brain.focusTarget === e) score += 0.8;
      if (defend && defend.capturers.includes(e)) score += 1.0;
      if (this.difficulty.smartAmmo && !t.isArtillery) {
        _dir.subVectors(aim, gun).normalize();
        const best = this.bestAmmoAgainst(e, gun, _dir, d);
        score += best.ratio > 1.1 ? 0.5 : best.ratio < 0.85 ? -0.7 : 0;
      }
      if (t.isArtillery) score += e.isMoving ? -0.3 : 0.4;
      if (score > bestScore) {
        bestScore = score;
        best = e;
      }
    }
    this.setTarget(best);
  }

  private cachedArtyRange = -1;

  /** Usable artillery range (95% of the ballistic maximum on flat ground). */
  private artyRange(): number {
    if (this.cachedArtyRange < 0) this.cachedArtyRange = maxRange(this.tank.ammoTypes[0]) * 0.95;
    return this.cachedArtyRange;
  }

  private bestAmmoAgainst(e: Tank, gun: Vector3, dir: Vector3, dist: number): { index: number; ratio: number } {
    const t = this.tank;
    let best = { index: t.selectedAmmo, ratio: 0 };
    for (let i = 0; i < t.ammoTypes.length; i++) {
      if (t.ammoCounts[i] <= 0) continue;
      const a = t.ammoTypes[i];
      const v = a.velocity * Math.exp(-a.dragK * dist);
      const p = previewShot(e, gun, dir, dist + 20, a, v);
      if (!p.hit) continue;
      let ratio = p.ricochet ? 0.2 : p.penetration / Math.max(1, p.effective);
      if (a.kind === 'HE') ratio = p.penetration >= p.effective ? 1.15 : Math.max(0.3, (a.damage * 0.5 - p.effective) / Math.max(1, a.damage * 0.5));
      // Prefer cheaper standard rounds when they already penetrate comfortably.
      const preference = a.premium ? -0.25 : 0;
      if (ratio + (ratio > 1.15 ? preference : 0) > best.ratio + (best.ratio > 1.15 && t.ammoTypes[best.index].premium ? -0.25 : 0)) best = { index: i, ratio };
    }
    return best;
  }

  /** Aim point on the target: weak spots for skilled bots, centre mass otherwise, plus lead and error. */
  private aimPointFor(e: Tank, withLead: boolean): Vector3 {
    const t = this.tank;
    const out = new Vector3();
    const dims = e.data.hull.dims;
    const local = new Vector3(0, dims.clearance + dims.height * 0.6, 0);
    if (this.difficulty.weakspots && !t.isArtillery) {
      const toMe = _v.subVectors(t.position, e.position);
      const rel = wrapAngle(yawOf(toMe.x, toMe.z) - e.yaw);
      const a = Math.abs(rel);
      if (a > 55 * DEG && a < 125 * DEG) {
        // Side: middle of the hull side above the tracks.
        local.set(Math.sign(rel) * dims.width * 0.45, dims.clearance + dims.height * 0.55, -dims.length * 0.1);
      } else if (a <= 55 * DEG) {
        // Front: lower glacis for experts, upper hull for hard.
        local.set(0, this.difficulty.id === 'expert' ? dims.clearance + dims.height * 0.22 : dims.clearance + dims.height * 0.7, dims.length * 0.47);
      } else {
        local.set(0, dims.clearance + dims.height * 0.6, -dims.length * 0.45);
      }
    }
    out.copy(local).applyQuaternion(e.quaternion).add(e.position);
    if (withLead && this.difficulty.lead > 0) {
      const d = out.distanceTo(t.position);
      const flight = d / Math.max(50, t.ammo.velocity * 0.9) * (t.isArtillery ? 2.2 : 1);
      out.addScaledVector(e.velocity, flight * this.difficulty.lead);
    }
    return out;
  }

  // --- Movement --------------------------------------------------------------------
  private drive(dt: number): void {
    const t = this.tank;
    const inp = t.input;
    const w = this.world;
    this.repathTimer -= dt;
    this.strafeTimer -= dt;
    if (this.strafeTimer <= 0) {
      this.strafeTimer = 4 + w.rng.next() * 4;
      this.strafeDir = w.rng.chance(0.5) ? 1 : -1;
    }

    // Cover state: return to firing spot when nearly reloaded.
    if (this.state === 'cover' && t.reloadTimer < 1.2 && this.firingSpot) {
      this.state = 'engage';
      this.setGoal(this.firingSpot);
      this.firingSpot = null;
    }

    // Unstuck manoeuvre
    if (this.unstuckTimer > 0) {
      this.unstuckTimer -= dt;
      inp.throttle = -0.8;
      inp.steer = this.unstuckSteer;
      if (this.unstuckTimer <= 0 && this.stuckCount < 2) this.repath();
      return;
    }

    let throttle = 0;
    let steer = 0;
    let wantYaw: number | null = null;
    if (this.goal && this.path.length) {
      while (this.pathIndex < this.path.length - 1) {
        const p = this.path[this.pathIndex];
        if (Math.hypot(t.position.x - p[0], t.position.z - p[1]) < 7) this.pathIndex++;
        else break;
      }
      const wp = this.path[Math.min(this.pathIndex, this.path.length - 1)];
      const dx = wp[0] - t.position.x;
      const dz = wp[1] - t.position.z;
      const distWp = Math.hypot(dx, dz);
      const finalDist = Math.hypot(this.goal[0] - t.position.x, this.goal[1] - t.position.z);
      if (finalDist > 6) {
        wantYaw = Math.atan2(dx, dz);
        let diff = wrapAngle(wantYaw - t.yaw);
        // Back out to nearby points behind (keeps the front armour toward the enemy).
        this.reverseOut = finalDist < 35 && Math.abs(diff) > 2.3 && (this.state === 'cover' || this.state === 'retreat');
        if (this.reverseOut) diff = wrapAngle(diff + Math.PI);
        steer = -clamp(diff * 2.2, -1, 1);
        const turnSlow = Math.abs(diff) > 1.1 ? 0.15 : 1 - Math.abs(diff) / 2.2;
        throttle = clamp(turnSlow * clamp(finalDist / 25, 0.35, 1), 0, 1);
        if (this.reverseOut) {
          throttle = -throttle;
          if (t.speedLong < -0.5) steer = -steer; // physics mirrors steering while reversing
        }
        if (this.repathTimer <= 0 && distWp > 3) this.repath();
      }
    }

    // Engagement posture when stopped: angle armour or face the target (casemates).
    if (throttle === 0 && this.target && this.target.alive) {
      const toT = _v.subVectors(this.target.position, t.position);
      const yawT = Math.atan2(toT.x, toT.z);
      let desired: number | null = null;
      if (t.data.traverseLimit < 180) {
        const off = wrapAngle(yawT - t.yaw);
        if (Math.abs(off) > t.data.traverseLimit * DEG * 0.75) desired = yawT;
      } else if (this.difficulty.angleArmor && (t.data.cls === 'HT' || t.data.cls === 'MT') && toT.length() < 350) {
        const angled = yawT + (this.strafeDir > 0 ? 0.48 : -0.48);
        if (Math.abs(wrapAngle(angled - t.yaw)) > 0.12) desired = angled;
      }
      if (desired !== null) steer = -clamp(wrapAngle(desired - t.yaw) * 2, -1, 1);
    }

    // Local avoidance: bend the heading away from tanks in the forward cone.
    if (throttle > 0) {
      let push = 0;
      for (const o of w.tanks) {
        if (o === t) continue;
        const dx = o.position.x - t.position.x;
        const dz = o.position.z - t.position.z;
        const d2 = dx * dx + dz * dz;
        if (d2 > 22 * 22) continue;
        const d = Math.sqrt(d2);
        const fwd = (Math.sin(t.yaw) * dx + Math.cos(t.yaw) * dz) / d;
        if (fwd < 0.55) continue;
        const lateral = -Math.cos(t.yaw) * dx + Math.sin(t.yaw) * dz; // >0: obstacle on the right
        const weight = (1 - d / 22) * (o.alive && Math.abs(o.speedLong) > 1 ? 0.7 : 1.2);
        push += (lateral >= 0 ? -1 : 1) * weight;
        if (d < 9 && fwd > 0.85) throttle *= 0.5;
      }
      steer = clamp(steer + push * 1.4, -1, 1);
    }

    // Stuck detection: back off, then insert a sideways detour if it keeps happening.
    this.stuckTimer += dt;
    if (this.stuckTimer > 2.5) {
      const moved = this.stuckCheckPos.distanceTo(t.position);
      if (Math.abs(throttle) > 0.3 && moved < 1.5 && t.stats.canMove && !w.frozen) {
        this.stuckCount++;
        this.unstuckTimer = 1.4 + w.rng.next();
        this.unstuckSteer = w.rng.chance(0.5) ? 1 : -1;
        if (this.stuckCount >= 2) this.addDetour();
      } else if (moved > 6) this.stuckCount = 0;
      this.stuckTimer = 0;
      this.stuckCheckPos.copy(t.position);
    }

    inp.throttle = clamp(throttle, -1, 1);
    inp.steer = clamp(steer, -1, 1);
    inp.brake = throttle === 0;
  }

  // --- Fire control ----------------------------------------------------------------
  private fireControl(dt: number): void {
    const t = this.tank;
    const inp = t.input;
    const w = this.world;
    inp.fire = false;
    const target = this.target;
    if (!target || !target.alive) {
      // Keep the gun pointed along the movement direction / toward last known enemy.
      let rec: Memory | null = null;
      for (const m of this.memory.values()) if (!rec || m.time > rec.time) rec = m;
      if (rec && w.time - rec.time < 20) inp.aimPoint = _v2.copy(rec.pos).setY(rec.pos.y + 1.5).clone();
      else inp.aimPoint = new Vector3(t.position.x + Math.sin(t.yaw) * 100, t.position.y + 2, t.position.z + Math.cos(t.yaw) * 100);
      return;
    }
    this.noiseTimer -= dt;
    const dist = target.position.distanceTo(t.position);
    if (this.noiseTimer <= 0) {
      this.noiseTimer = 1 + w.rng.next();
      const err = Math.tan(this.difficulty.aimErrorDeg * DEG) * dist;
      this.aimNoise.set(w.rng.gaussian() * err, w.rng.gaussian() * err * 0.5, w.rng.gaussian() * err);
    }
    const aim = this.aimPointFor(target, true).add(this.aimNoise);
    inp.aimPoint = aim;

    // Ammo choice (switching costs a reload, so decide early).
    if (this.difficulty.smartAmmo && w.time - this.lastAmmoSwitch > 8 && !t.isArtillery) {
      const gun = t.gunWorldPosition(new Vector3());
      _dir.subVectors(aim, gun).normalize();
      const best = this.bestAmmoAgainst(target, gun, _dir, dist);
      if (best.index !== t.selectedAmmo && (t.reloadTimer > t.stats.reload * 0.5 || best.ratio > 1)) {
        inp.ammoSlot = best.index;
        this.lastAmmoSwitch = w.time;
      }
    }

    if (this.reactionLeft > 0) {
      this.reactionLeft -= dt;
      return;
    }
    if (t.reloadTimer > 0 || !t.stats.canFire) return;
    this.aimWait += dt;
    // Gun must be roughly on target.
    const gunDir = t.gunDirection(new Vector3());
    const gunPos = t.gunWorldPosition(new Vector3());
    _dir.subVectors(aim, gunPos).normalize();
    const horizontalErr = Math.abs(wrapAngle(Math.atan2(gunDir.x, gunDir.z) - Math.atan2(_dir.x, _dir.z)));
    if (horizontalErr > Math.max(1.5 * DEG, t.dispersion * 2)) return;
    if (!t.isArtillery && !this.lineOfFire(target, aim)) return;
    const converged = t.dispersion <= t.stats.accuracy * this.difficulty.patience;
    if (converged || this.aimWait > this.difficulty.maxAimWait * (t.isArtillery ? 3 : 1)) {
      inp.fire = true;
      this.aimWait = 0;
      if (this.difficulty.coverChance > 0 && t.stats.reload > 5 && w.rng.chance(this.difficulty.coverChance * 0.5)
        && (this.role === 'brawler' || this.role === 'flanker' || this.role === 'sniper')) {
        this.seekCover();
      }
    }
  }
}
