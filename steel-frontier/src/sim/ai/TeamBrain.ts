import { Vector3 } from 'three';
import type { RadioKind } from '../events';
import type { Tank } from '../Tank';
import type { World } from '../World';

export interface HelpRequest {
  from: Tank;
  pos: Vector3;
  time: number;
}

/** Shared per-team tactical knowledge: radio commands, help calls, focus target, last known enemy positions. */
export class TeamBrain {
  focusTarget: Tank | null = null;
  focusUntil = 0;
  aggressiveUntil = 0;
  regroupUntil = 0;
  readonly helpRequests: HelpRequest[] = [];
  readonly lastKnown = new Map<number, { pos: Vector3; time: number }>();
  private lastRadio = -100;
  private unsub: () => void;

  constructor(private readonly world: World, readonly team: number) {
    this.unsub = world.events.on('radio', (e) => {
      if (e.team !== team || !e.from) return;
      this.onRadio(e.kind, e.from);
    });
  }

  dispose(): void {
    this.unsub();
  }

  private onRadio(kind: RadioKind, from: Tank): void {
    const t = this.world.time;
    switch (kind) {
      case 'help':
        this.helpRequests.push({ from, pos: from.position.clone(), time: t });
        if (this.helpRequests.length > 6) this.helpRequests.shift();
        break;
      case 'attack':
        this.aggressiveUntil = t + 40;
        this.regroupUntil = 0;
        break;
      case 'retreat':
        this.regroupUntil = t + 30;
        this.aggressiveUntil = 0;
        break;
      case 'target': {
        const target = this.findAimedEnemy(from);
        if (target) {
          this.focusTarget = target;
          this.focusUntil = t + 25;
        }
        break;
      }
      default:
        break;
    }
  }

  /** The enemy closest to where `from` is aiming. */
  private findAimedEnemy(from: Tank): Tank | null {
    let best: Tank | null = null;
    let bestD = 30;
    for (const e of this.world.tanks) {
      if (e.team === from.team || !e.alive || !this.world.detection.isKnownToTeam(from.team, e)) continue;
      const d = e.position.distanceTo(from.aimTarget);
      if (d < bestD) {
        bestD = d;
        best = e;
      }
    }
    return best;
  }

  update(): void {
    const w = this.world;
    for (const e of w.tanks) {
      if (e.team === this.team || !e.alive) continue;
      if (w.detection.isKnownToTeam(this.team, e)) {
        const rec = this.lastKnown.get(e.id);
        if (rec) {
          rec.pos.copy(e.position);
          rec.time = w.time;
        } else this.lastKnown.set(e.id, { pos: e.position.clone(), time: w.time });
      }
    }
    for (const [id, rec] of this.lastKnown) {
      const t = w.tankById(id);
      if (!t || !t.alive || w.time - rec.time > 60) this.lastKnown.delete(id);
    }
    while (this.helpRequests.length && w.time - this.helpRequests[0].time > 25) this.helpRequests.shift();
    if (this.focusTarget && (!this.focusTarget.alive || w.time > this.focusUntil)) this.focusTarget = null;
  }

  /** Rate-limited bot radio chatter. */
  say(from: Tank, kind: RadioKind, text: string, force = false): void {
    if (!force && this.world.time - this.lastRadio < 7) return;
    this.lastRadio = this.world.time;
    this.world.events.emit('radio', { team: this.team, from, text, kind });
  }
}

/** Grid square label like "Д4" for radio messages. */
export function gridSquare(world: World, pos: Vector3): string {
  const letters = 'АБВГДЕЖЗИК';
  const size = world.terrain.size;
  // Minimap convention: screen right = world -X, screen up = world +Z.
  const i = Math.max(0, Math.min(9, Math.floor(((size / 2 - pos.x) / size) * 10)));
  const j = Math.max(0, Math.min(9, Math.floor(((size / 2 - pos.z) / size) * 10)));
  return `${letters[j]}${i + 1}`;
}
