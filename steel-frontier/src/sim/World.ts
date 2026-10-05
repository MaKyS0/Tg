import { Vector3 } from 'three';
import { EventBus } from '../core/EventBus';
import { Random } from '../core/Random';
import type { GameModeData } from '../data/types';
import type { HitResult } from './ArmorSystem';
import { DamageSystem } from './DamageSystem';
import { DetectionSystem } from './DetectionSystem';
import type { WorldEvents } from './events';
import { GameModeState } from './GameMode';
import type { MapInstance } from './MapBuilder';
import { NavGrid } from './Navigation';
import { ProjectileSystem } from './ProjectileSystem';
import type { Collider } from './StaticWorld';
import type { Tank } from './Tank';
import { stepTankCombat } from './TankCombat';
import { resolveTankCollisions, stepTankPhysics } from './TankPhysics';

/** Anything that drives a tank: local player, AI, or a future network proxy. */
export interface TankController {
  readonly tank: Tank;
  update(world: World, dt: number): void;
}

export const SIM_DT = 1 / 60;

/**
 * Authoritative, render-agnostic battle simulation stepped at a fixed rate. All gameplay state lives
 * here, which keeps the door open for a server-authoritative multiplayer build.
 */
export class World {
  readonly events = new EventBus<WorldEvents>();
  readonly tanks: Tank[] = [];
  readonly controllers: TankController[] = [];
  /** Hooks executed before controllers each step (team knowledge refresh etc.). */
  readonly preStep: Array<() => void> = [];
  readonly rng: Random;
  readonly nav: NavGrid;
  readonly projectiles: ProjectileSystem;
  readonly damage: DamageSystem;
  readonly detection: DetectionSystem;
  readonly mode: GameModeState;
  /** Scratch slot used by the projectile system to hand the nearest hit result around. */
  pendingHit: HitResult | null = null;
  time = 0;
  /** Seconds of pre-battle countdown during which tanks cannot move or fire. */
  countdown: number;
  private tankMap = new Map<number, Tank>();

  constructor(readonly map: MapInstance, modeData: GameModeData, seed: number, countdown = 5) {
    this.rng = new Random(seed);
    this.nav = new NavGrid(map);
    this.projectiles = new ProjectileSystem(this);
    this.damage = new DamageSystem(this);
    this.detection = new DetectionSystem(this);
    this.mode = new GameModeState(this, modeData, map.data.bases);
    this.countdown = countdown;
  }

  get terrain() {
    return this.map.terrain;
  }

  get statics() {
    return this.map.statics;
  }

  /** Time since the countdown finished. */
  get battleTime(): number {
    return Math.max(0, this.time - this.countdown);
  }

  get frozen(): boolean {
    return this.time < this.countdown;
  }

  addTank(tank: Tank, x: number, z: number, yaw: number): Tank {
    tank.position.set(x, this.terrain.heightAt(x, z), z);
    tank.prevPosition.copy(tank.position);
    tank.yaw = yaw;
    tank.prevYaw = yaw;
    tank.updateQuaternion();
    tank.aimTarget.copy(tank.position).add(new Vector3(Math.sin(yaw) * 100, 2, Math.cos(yaw) * 100));
    this.tanks.push(tank);
    this.tankMap.set(tank.id, tank);
    return tank;
  }

  addController(c: TankController): void {
    this.controllers.push(c);
  }

  tankById(id: number): Tank | null {
    return this.tankMap.get(id) ?? null;
  }

  destroyCollider(c: Collider, by: Tank | null): void {
    if (!c.alive) return;
    this.statics.destroy(c);
    this.nav.onColliderDestroyed(c);
    this.events.emit('destructible', { collider: c, by, pos: new Vector3(c.x, (c.y0 + c.y1) / 2, c.z) });
  }

  step(dt = SIM_DT): void {
    this.time += dt;
    const frozen = this.frozen || this.mode.outcome !== null;
    for (const fn of this.preStep) fn();
    for (const c of this.controllers) c.update(this, dt);
    for (const t of this.tanks) stepTankCombat(t, this, dt, frozen);
    for (const t of this.tanks) stepTankPhysics(t, this, dt, frozen);
    resolveTankCollisions(this);
    this.projectiles.update(dt);
    this.damage.update(dt);
    this.detection.update(dt);
    if (!this.frozen) this.mode.update(dt);
    for (const t of this.tanks) {
      t.input.ammoSlot = null;
      t.input.consumable = null;
    }
  }
}
