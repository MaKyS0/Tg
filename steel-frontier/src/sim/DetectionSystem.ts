import { Vector3 } from 'three';
import { clamp } from '../core/math';
import type { Tank } from './Tank';
import type { World } from './World';

const PROXIMITY = 50;
const MAX_VIEW = 445;
const MEMORY = 2.5;
const SCAN_INTERVAL = 0.5;
const FIRING_WINDOW = 3;
const OBSERVER_BUSH_IGNORE = 15;

interface SpotRecord {
  time: number;
  spotter: Tank;
}

const _eye = new Vector3();
const _pt = new Vector3();
const _dir = new Vector3();

/**
 * View range vs camouflage spotting with line of sight through terrain/buildings, foliage along the
 * ray, bush cover at the target, movement/firing/size modifiers and radio-linked team sharing.
 */
export class DetectionSystem {
  private records: Array<Map<number, SpotRecord>> = [new Map(), new Map()];
  private everSpotted: Array<Set<number>> = [new Set(), new Set()];
  private timers = new Map<number, number>();

  constructor(private readonly world: World) {}

  update(dt: number): void {
    const w = this.world;
    for (const obs of w.tanks) {
      if (!obs.alive) continue;
      let t = this.timers.get(obs.id) ?? (obs.id * 0.037) % SCAN_INTERVAL;
      t -= dt;
      if (t <= 0) {
        t += SCAN_INTERVAL;
        this.scan(obs);
      }
      this.timers.set(obs.id, t);
    }
  }

  private scan(obs: Tank): void {
    const w = this.world;
    for (const target of w.tanks) {
      if (target.team === obs.team || !target.alive) continue;
      if (this.canSee(obs, target)) {
        const rec = this.records[obs.team].get(target.id);
        const first = !this.everSpotted[obs.team].has(target.id);
        if (!rec || w.time - rec.time > MEMORY) {
          if (first) {
            this.everSpotted[obs.team].add(target.id);
            obs.battle.spotted++;
          }
          w.events.emit('spotted', { tank: target, byTeam: obs.team, first });
        }
        this.records[obs.team].set(target.id, { time: w.time, spotter: obs });
        target.spottedUntil = w.time + MEMORY;
      }
    }
  }

  /** Detection distance for a target as seen by `obs`, before line-of-sight. */
  detectionDistance(obs: Tank, target: Tank, foliageAlong: number): number {
    const view = Math.min(MAX_VIEW, obs.stats.viewRange);
    const firing = this.world.time - target.lastShotTime < FIRING_WINDOW;
    let camo = target.isMoving ? target.stats.camoMoving : target.stats.camoStationary;
    let bush = this.world.statics.foliageAt(target.position.x, target.position.z, target.data.hull.dims.width / 2);
    if (firing) {
      camo *= 1 - target.data.camo.firingPenalty;
      bush *= 0.25;
    }
    if (target.isMoving) bush *= 0.7;
    const total = clamp(camo + bush + Math.min(0.5, foliageAlong), 0, 0.95);
    return Math.max(PROXIMITY, view - (view - PROXIMITY) * total);
  }

  canSee(obs: Tank, target: Tank): boolean {
    const d = obs.position.distanceTo(target.position);
    if (d > MAX_VIEW) return false;
    if (d < PROXIMITY) return true;
    if (d > obs.stats.viewRange) return false;
    obs.eyePosition(_eye);
    // Two check points: turret top and hull centre.
    const points = [
      _pt.set(0, target.layout.turretTop * 0.95, target.layout.turretPivot.z).applyQuaternion(target.quaternion).add(target.position),
    ];
    const center = new Vector3(0, target.layout.hullTop * 0.6, 0).applyQuaternion(target.quaternion).add(target.position);
    points.push(center);
    let foliage = Infinity;
    let los = false;
    for (const p of points) {
      if (!this.lineOfSight(_eye, p)) continue;
      los = true;
      foliage = Math.min(foliage, this.world.statics.foliageAlong(_eye, p, OBSERVER_BUSH_IGNORE));
    }
    if (!los) return false;
    return d <= this.detectionDistance(obs, target, foliage);
  }

  lineOfSight(a: Vector3, b: Vector3): boolean {
    const w = this.world;
    if (!w.terrain.segmentClear(a, b)) return false;
    _dir.subVectors(b, a);
    const len = _dir.length();
    _dir.divideScalar(len);
    return !w.statics.raycast(a, _dir, len, (c) => c.blocksView);
  }

  /** Whether `viewer` currently has information about `target` (own sight or radio-linked ally). */
  isVisibleTo(viewer: Tank, target: Tank): boolean {
    if (viewer.team === target.team) return true;
    const rec = this.records[viewer.team].get(target.id);
    if (!rec || this.world.time - rec.time > MEMORY) return false;
    if (rec.spotter === viewer) return true;
    const link = rec.spotter.stats.radioRange + viewer.stats.radioRange;
    return rec.spotter.position.distanceToSquared(viewer.position) <= link * link;
  }

  /** Team-level knowledge (used for minimap of the player team and AI target lists). */
  isKnownToTeam(team: number, target: Tank): boolean {
    if (target.team === team) return true;
    const rec = this.records[team].get(target.id);
    return !!rec && this.world.time - rec.time <= MEMORY;
  }

  wasEverSpotted(team: number, target: Tank): boolean {
    return this.everSpotted[team].has(target.id);
  }

  /** True if any enemy currently spots this tank ("sixth sense"). */
  isSpotted(tank: Tank): boolean {
    const rec = this.records[1 - tank.team].get(tank.id);
    return !!rec && this.world.time - rec.time <= SCAN_INTERVAL * 2.2;
  }

  lastSpotter(target: Tank): Tank | null {
    const rec = this.records[1 - target.team].get(target.id);
    return rec && this.world.time - rec.time <= MEMORY ? rec.spotter : null;
  }
}
