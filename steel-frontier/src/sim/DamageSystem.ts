import { Quaternion, Vector3 } from 'three';
import type { AmmoData, CrewRole } from '../data/types';
import type { HitResult } from './ArmorSystem';
import type { ModuleId, ModuleStatus, Tank } from './Tank';
import type { World } from './World';

const REPAIR_TIME: Record<ModuleId, number> = {
  engine: 12, transmission: 12, tracks: 10, gun: 10, turretRing: 9, radio: 8, ammoRack: 10, fuelTank: 10,
};

const FIRE_DURATION = 7;
const FIRE_DPS_FRACTION = 0.012;
const CONSUMABLE_COOLDOWN = 60;

/** Applies hit results to tanks: HP, modules, crew, fires, repairs, consumables and destruction. */
export class DamageSystem {
  constructor(private readonly world: World) {}

  applyShellHit(target: Tank, attacker: Tank | null, ammo: AmmoData, res: HitResult): void {
    const enemy = attacker && attacker.team !== target.team;
    if (attacker && enemy) attacker.battle.hits++;
    if (target.alive) {
      if (res.kind === 'penetration') {
        if (attacker && enemy) attacker.battle.penetrations++;
        this.dealDamage(target, attacker, res.damage);
      } else if (res.kind === 'heSplash' && res.damage > 0) {
        this.dealDamage(target, attacker, res.damage);
        target.battle.damageBlocked += Math.max(0, ammo.damage - res.damage);
      } else if (res.kind === 'ricochet' || res.kind === 'noPenetration' || res.kind === 'critical' || res.kind === 'heSplash') {
        target.battle.damageBlocked += ammo.damage;
      }
      if (target.alive) {
        for (const m of res.modules) this.damageModule(target, m.id, m.damage);
        for (const role of res.crew) this.woundCrew(target, role);
        if (res.fireChance > 0 && !target.burning && this.world.rng.chance(res.fireChance)) this.startFire(target);
      }
    }
    this.world.events.emit('hit', { target, attacker, result: res, ammo });
  }

  dealDamage(target: Tank, attacker: Tank | null, amount: number): number {
    if (!target.alive || amount <= 0) return 0;
    const actual = Math.min(target.hp, Math.round(amount));
    target.hp -= actual;
    target.battle.damageReceived += actual;
    target.lastDamageTime = this.world.time;
    if (attacker) {
      target.lastDamagedBy = attacker.id;
      target.damagers.set(attacker.id, (target.damagers.get(attacker.id) ?? 0) + actual);
      if (attacker.team !== target.team) {
        attacker.battle.damageDealt += actual;
        const spotter = this.world.detection.lastSpotter(target);
        if (spotter && spotter !== attacker) spotter.battle.assistDamage += actual;
      }
    }
    this.world.mode.onTankDamaged(target);
    if (target.hp <= 0) this.destroy(target, attacker, false);
    return actual;
  }

  damageModule(tank: Tank, id: ModuleId, amount: number): void {
    const m = tank.modules[id];
    if (!tank.alive || m.status === 'destroyed') return;
    m.hp = Math.max(0, m.hp - amount);
    let status: ModuleStatus = m.status;
    if (m.hp <= 0) status = 'destroyed';
    else if (m.hp <= m.maxHp * 0.5) status = 'damaged';
    if (status === m.status) return;
    m.status = status;
    if (status === 'destroyed') m.repairTimer = REPAIR_TIME[id];
    tank.refreshStats();
    this.world.events.emit('moduleChanged', { tank, module: id, status, repaired: false });
    const rng = this.world.rng;
    if (id === 'ammoRack' && status === 'destroyed' && rng.chance(0.35)) {
      this.destroy(tank, this.world.tankById(tank.lastDamagedBy), true);
      return;
    }
    if (id === 'engine' && status === 'destroyed' && rng.chance(tank.engine.fireChance)) this.startFire(tank);
    if (id === 'fuelTank' && rng.chance(status === 'destroyed' ? 0.3 : 0.12)) this.startFire(tank);
  }

  woundCrew(tank: Tank, role: CrewRole): void {
    const c = tank.crew.find((x) => x.role === role);
    if (!c || c.wounded) return;
    c.wounded = true;
    tank.refreshStats();
    this.world.events.emit('crewWounded', { tank, role });
  }

  startFire(tank: Tank): void {
    if (!tank.alive || tank.burning) return;
    tank.burning = true;
    tank.fireTimer = FIRE_DURATION * (tank.perks.has('firefight') ? 0.5 : 1);
    this.world.events.emit('fire', { tank, burning: true });
  }

  /** HE splash from ground/static impacts. */
  applySplash(point: Vector3, ammo: AmmoData, owner: Tank | null): void {
    const R = ammo.explosionRadius;
    const local = new Vector3();
    const inv = new Quaternion();
    for (const t of this.world.tanks) {
      if (!t.alive) continue;
      const reach = R + t.layout.boundingRadius;
      if (t.position.distanceToSquared(point) > reach * reach) continue;
      inv.copy(t.quaternion).invert();
      local.copy(point).sub(t.position).applyQuaternion(inv);
      const d = t.data.hull.dims;
      const hx = d.width / 2;
      const hz = d.length / 2;
      const top = t.layout.turretTop;
      const qx = Math.max(-hx, Math.min(hx, local.x));
      const qy = Math.max(0, Math.min(top, local.y));
      const qz = Math.max(-hz, Math.min(hz, local.z));
      const dist = Math.hypot(local.x - qx, local.y - qy, local.z - qz);
      if (dist > R) continue;
      const a = t.data.hull.armor;
      let armour: number;
      if (local.y > d.clearance + d.height * 0.9) armour = a.roof;
      else if (Math.abs(local.x) > hx * 0.95) armour = a.side + (t.data.hull.screens ? t.data.hull.screens * 2 : 0);
      else armour = local.z > 0 ? a.upperFront : a.rear;
      const dmg = (ammo.damage * 0.5 * (1 - dist / R) - armour * 1.1) * (ammo.explosionRadius > 2 ? 1.2 : 1);
      if (dmg > 0) {
        if (owner && owner.team !== t.team) owner.battle.hits++;
        this.dealDamage(t, owner, dmg);
        if (local.y < 1 && this.world.rng.chance(0.4)) this.damageModule(t, 'tracks', ammo.damage * 0.3);
      }
    }
    this.world.statics.queryCircle(point.x, point.z, R + 1, (c) => {
      if (!c.destructible) return;
      c.destructible.hp -= ammo.damage * 0.6;
      if (c.destructible.hp <= 0) this.world.destroyCollider(c, owner);
    });
  }

  destroy(tank: Tank, killer: Tank | null, ammoRack: boolean): void {
    if (!tank.alive) return;
    tank.alive = false;
    tank.hp = 0;
    tank.burning = false;
    tank.refreshStats();
    tank.battle.survivedTime = this.world.time;
    if (killer && killer.team !== tank.team) killer.battle.kills++;
    this.world.events.emit('tankDestroyed', { tank, killer, ammoRack });
  }

  update(dt: number): void {
    const w = this.world;
    for (const t of w.tanks) {
      if (!t.alive) continue;
      if (t.burning) {
        t.fireTimer -= dt;
        this.dealDamage(t, w.tankById(t.lastDamagedBy), t.maxHp * FIRE_DPS_FRACTION * dt + w.rng.next() * 0.5);
        if (w.rng.chance(dt * 0.3)) this.damageModule(t, 'engine', 20);
        if (t.fireTimer <= 0 && t.alive) {
          t.burning = false;
          w.events.emit('fire', { tank: t, burning: false });
        }
      }
      for (const m of Object.values(t.modules)) {
        if (m.status !== 'destroyed') continue;
        m.repairTimer -= dt * t.stats.repairSpeed;
        if (m.repairTimer <= 0) {
          m.status = 'damaged';
          m.hp = Math.round(m.maxHp * 0.5);
          t.refreshStats();
          w.events.emit('moduleChanged', { tank: t, module: m.id, status: 'damaged', repaired: true });
        }
      }
      for (let i = 0; i < 3; i++) t.consumableCooldown[i] = Math.max(0, t.consumableCooldown[i] - dt);
      const c = t.input.consumable;
      if (c !== null && c >= 0 && c < 3) this.useConsumable(t, c);
    }
  }

  useConsumable(t: Tank, index: number): boolean {
    if (t.consumableUsed[index] || t.consumableCooldown[index] > 0) return false;
    if (index === 0) {
      if (!Object.values(t.modules).some((m) => m.status !== 'ok')) return false;
      for (const m of Object.values(t.modules)) {
        if (m.status !== 'ok') this.world.events.emit('moduleChanged', { tank: t, module: m.id, status: 'ok', repaired: true });
        m.status = 'ok';
        m.hp = m.maxHp;
        m.repairTimer = 0;
      }
    } else if (index === 1) {
      if (!t.crew.some((c) => c.wounded)) return false;
      for (const c of t.crew) c.wounded = false;
    } else {
      if (!t.burning) return false;
      t.burning = false;
      this.world.events.emit('fire', { tank: t, burning: false });
    }
    t.consumableUsed[index] = true;
    t.consumableCooldown[index] = CONSUMABLE_COOLDOWN;
    t.refreshStats();
    this.world.events.emit('consumable', { tank: t, index });
    return true;
  }
}
