import { Vector3 } from 'three';
import type { AmmoData } from '../data/types';
import { ObjectPool } from '../core/ObjectPool';
import { integrateShell } from './Ballistics';
import { resolveShellHit } from './ArmorSystem';
import type { World } from './World';
import type { Tank } from './Tank';
import type { StaticHit } from './StaticWorld';

export interface Shell {
  id: number;
  active: boolean;
  owner: Tank | null;
  ammo: AmmoData;
  pos: Vector3;
  prev: Vector3;
  vel: Vector3;
  age: number;
  maxAge: number;
  ricochets: number;
}

const SUBSTEPS = 2;
const _dir = new Vector3();
const _seg = new Vector3();
const _staticHit: StaticHit = { t: 0, collider: null as never, normal: new Vector3() };

/** Pooled projectiles with continuous collision against tanks, statics and terrain. */
export class ProjectileSystem {
  readonly active: Shell[] = [];
  private nextId = 1;
  private pool = new ObjectPool<Shell>(
    () => ({
      id: 0, active: false, owner: null, ammo: null as never, pos: new Vector3(), prev: new Vector3(), vel: new Vector3(),
      age: 0, maxAge: 0, ricochets: 0,
    }),
    (s) => {
      s.active = false;
      s.owner = null;
    },
    512,
  );

  constructor(private readonly world: World) {}

  spawn(owner: Tank | null, ammo: AmmoData, pos: Vector3, dir: Vector3): Shell | null {
    const s = this.pool.acquire();
    if (!s) return null;
    s.id = this.nextId++;
    s.active = true;
    s.owner = owner;
    s.ammo = ammo;
    s.pos.copy(pos);
    s.prev.copy(pos);
    s.vel.copy(dir).multiplyScalar(ammo.velocity);
    s.age = 0;
    s.maxAge = ammo.gravityScale > 3 ? 25 : 6;
    s.ricochets = 0;
    this.active.push(s);
    return s;
  }

  update(dt: number): void {
    const h = dt / SUBSTEPS;
    for (let i = this.active.length - 1; i >= 0; i--) {
      const s = this.active[i];
      s.prev.copy(s.pos);
      for (let k = 0; k < SUBSTEPS && s.active; k++) {
        const from = _seg.copy(s.pos);
        integrateShell(s.pos, s.vel, s.ammo, h);
        s.age += h;
        this.collide(s, from);
      }
      if (s.active && (s.age > s.maxAge || !this.world.terrain.inBounds(s.pos.x, s.pos.z, -50) || s.pos.y < -50)) s.active = false;
      if (!s.active) {
        this.active[i] = this.active[this.active.length - 1];
        this.active.pop();
        this.pool.release(s);
      }
    }
  }

  private collide(s: Shell, from: Vector3): void {
    const w = this.world;
    _dir.subVectors(s.pos, from);
    const len = _dir.length();
    if (len < 1e-6) return;
    _dir.divideScalar(len);
    const origin = from.clone();

    // Nearest terrain / static / water contact on this segment.
    let bestT = len;
    let bestKind: 'none' | 'ground' | 'static' | 'water' = 'none';
    const tg = w.terrain.raycast(origin, _dir, len);
    if (tg >= 0 && tg < bestT) {
      bestT = tg;
      bestKind = 'ground';
    }
    const sh = w.statics.raycast(origin, _dir, bestT, (c) => c.blocksShell, _staticHit);
    let staticCollider = null;
    if (sh && sh.t < bestT) {
      bestT = sh.t;
      bestKind = 'static';
      staticCollider = sh.collider;
    }
    if (_dir.y < 0) {
      const wl = w.terrain.waterLevel;
      if (from.y > wl && s.pos.y <= wl) {
        const tw = (wl - from.y) / _dir.y;
        if (tw < bestT && w.terrain.waterDepthAt(from.x + _dir.x * tw, from.z + _dir.z * tw) > 0.3) {
          bestT = tw;
          bestKind = 'water';
        }
      }
    }

    // Tanks (alive and wrecks) — closest armour contact before bestT.
    let hitTank: Tank | null = null;
    let tankT = bestT;
    for (const t of w.tanks) {
      if (t === s.owner && s.age < 0.15) continue;
      const r = t.layout.boundingRadius;
      const cx = t.position.x - origin.x;
      const cy = t.position.y + 1 - origin.y;
      const cz = t.position.z - origin.z;
      const along = cx * _dir.x + cy * _dir.y + cz * _dir.z;
      if (along < -r || along > tankT + r) continue;
      const perp2 = cx * cx + cy * cy + cz * cz - along * along;
      if (perp2 > r * r) continue;
      const result = resolveShellHit(t, origin, _dir, tankT, s.ammo, s.vel.length(), w.rng);
      if (result.kind === 'miss') continue;
      if (result.t <= tankT) {
        tankT = result.t;
        hitTank = t;
        w.pendingHit = result;
      }
    }

    if (hitTank && w.pendingHit) {
      const res = w.pendingHit;
      w.pendingHit = null;
      w.damage.applyShellHit(hitTank, s.owner, s.ammo, res);
      if (res.kind === 'ricochet' && res.ricochetDir && s.ricochets < 1) {
        s.ricochets++;
        const speed = s.vel.length() * 0.7;
        s.pos.copy(res.point).addScaledVector(res.ricochetDir, 0.3);
        s.vel.copy(res.ricochetDir).multiplyScalar(speed);
        w.events.emit('ricochet', { pos: res.point.clone(), dir: res.ricochetDir.clone() });
        return;
      }
      s.pos.copy(res.point);
      s.active = false;
      return;
    }

    if (bestKind === 'none') return;
    const point = origin.clone().addScaledVector(_dir, bestT);
    if (bestKind === 'static' && staticCollider) {
      const info = staticCollider.destructible;
      if (info) {
        info.hp -= s.ammo.damage * (s.ammo.kind === 'HE' ? 2 : 1);
        if (info.hp <= 0) w.destroyCollider(staticCollider, s.owner);
        if (info.passThrough || (info.hp <= 0 && s.ammo.kind !== 'HE')) {
          s.vel.multiplyScalar(0.9);
          return;
        }
      }
      w.events.emit('impact', { pos: point, normal: _staticHit.normal.clone(), kind: 'static', ammo: s.ammo, surface: 'stone' });
      if (s.ammo.kind === 'HE') w.damage.applySplash(point, s.ammo, s.owner);
      s.active = false;
      return;
    }
    const normal = bestKind === 'ground' ? w.terrain.normalAt(point.x, point.z) : new Vector3(0, 1, 0);
    w.events.emit('impact', { pos: point, normal, kind: bestKind, ammo: s.ammo, surface: w.terrain.surfaceAt(point.x, point.z) });
    if (s.ammo.kind === 'HE' && bestKind !== 'water') w.damage.applySplash(point, s.ammo, s.owner);
    s.pos.copy(point);
    s.active = false;
  }
}
