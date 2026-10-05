import type { GameModeData, Vec2 } from '../data/types';
import type { Tank } from './Tank';
import type { World } from './World';

export const BASE_RADIUS = 40;

export interface BaseState {
  /** Owning team (its enemies capture it); -1 = neutral (anyone captures). */
  owner: number;
  x: number;
  z: number;
  radius: number;
  points: [number, number];
  capturers: Tank[];
  contested: boolean;
}

export interface BattleOutcome {
  winner: number; // 0, 1 or -1 draw
  reason: 'destroyed' | 'capture' | 'timeout' | 'surrender';
}

/** Rules engine for game modes: bases, capture, win conditions, timer. Data-driven by GameModeData. */
export class GameModeState {
  readonly bases: BaseState[] = [];
  outcome: BattleOutcome | null = null;
  private contribution = new Map<number, number>();
  /** Assault: team 0 attacks, team 1 defends. */
  readonly attackers: number;

  constructor(private readonly world: World, readonly data: GameModeData, bases: { a: Vec2; b: Vec2; neutral: Vec2 }) {
    const mk = (owner: number, p: Vec2): BaseState => ({ owner, x: p[0], z: p[1], radius: BASE_RADIUS, points: [0, 0], capturers: [], contested: false });
    if (data.bases === 'both') this.bases.push(mk(0, bases.a), mk(1, bases.b));
    else if (data.bases === 'neutral') this.bases.push(mk(-1, bases.neutral));
    else this.bases.push(mk(1, bases.b));
    this.attackers = data.bases === 'defender' ? 0 : -1;
  }

  get timeLeft(): number {
    return Math.max(0, this.data.timeLimit - this.world.battleTime);
  }

  /** Team that may capture the base. */
  canCapture(base: BaseState, team: number): boolean {
    return base.owner === -1 || base.owner !== team;
  }

  update(dt: number): void {
    if (this.outcome) return;
    const w = this.world;
    for (const base of this.bases) {
      base.capturers = [];
      const present = [0, 0];
      for (const t of w.tanks) {
        if (!t.alive) continue;
        const dx = t.position.x - base.x;
        const dz = t.position.z - base.z;
        if (dx * dx + dz * dz > base.radius * base.radius) continue;
        present[t.team]++;
        if (this.canCapture(base, t.team)) base.capturers.push(t);
      }
      base.contested = base.owner === -1 ? present[0] > 0 && present[1] > 0 : present[base.owner] > 0 && base.capturers.length > 0;
      for (const team of [0, 1]) {
        if (!this.canCapture(base, team)) continue;
        const mine = base.capturers.filter((t) => t.team === team);
        if (mine.length === 0) {
          base.points[team] = 0;
          for (const t of w.tanks) if (t.team === team) this.contribution.delete(t.id);
          continue;
        }
        if (base.contested) continue;
        const n = Math.min(this.data.maxCapturers, mine.length);
        const gain = this.data.captureRate * n * dt;
        base.points[team] = Math.min(100, base.points[team] + gain);
        for (const t of mine.slice(0, n)) {
          const share = gain / n;
          this.contribution.set(t.id, (this.contribution.get(t.id) ?? 0) + share);
          t.battle.capturePoints += share;
        }
        if (base.points[team] >= 100 && this.data.winByCapture) {
          this.finish(team, 'capture');
          return;
        }
      }
    }
    const alive = [0, 0];
    for (const t of w.tanks) if (t.alive) alive[t.team]++;
    if (this.data.winByDestroy || this.data.bases === 'defender') {
      if (alive[0] === 0 && alive[1] === 0) return this.finish(-1, 'destroyed');
      if (alive[0] === 0) return this.finish(1, 'destroyed');
      if (alive[1] === 0) return this.finish(0, 'destroyed');
    } else if (alive[0] === 0 && alive[1] === 0) return this.finish(-1, 'destroyed');
    if (w.battleTime >= this.data.timeLimit) {
      this.finish(this.data.timeoutResult === 'defenders' ? 1 : -1, 'timeout');
    }
  }

  /** Damage to a capturing tank resets its share of capture points; the damager earns defence points. */
  onTankDamaged(tank: Tank): void {
    if (!this.data.captureResetOnDamage) return;
    const c = this.contribution.get(tank.id);
    if (!c) return;
    for (const base of this.bases) {
      if (base.capturers.includes(tank)) base.points[tank.team] = Math.max(0, base.points[tank.team] - c);
    }
    this.contribution.delete(tank.id);
    const attacker = this.world.tankById(tank.lastDamagedBy);
    if (attacker && attacker.team !== tank.team) attacker.battle.defensePoints += c;
  }

  finish(winner: number, reason: BattleOutcome['reason']): void {
    if (this.outcome) return;
    this.outcome = { winner, reason };
    this.world.events.emit('battleEnd', { winner, reason });
  }

  /** Bases a team should attack (capture) and defend. */
  attackBase(team: number): BaseState | null {
    return this.bases.find((b) => this.canCapture(b, team)) ?? null;
  }

  defendBase(team: number): BaseState | null {
    return this.bases.find((b) => b.owner === team) ?? (this.bases[0]?.owner === -1 ? this.bases[0] : null);
  }
}
