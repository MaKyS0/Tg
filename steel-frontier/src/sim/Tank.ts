import { Euler, Quaternion, Vector3 } from 'three';
import type {
  AmmoData, CrewRole, EngineModule, GunModule, ModuleSlot, RadioModule, SuspensionModule, TankData, TurretModule,
} from '../data/types';
import { buildArmorLayout, type ArmorLayout } from './ArmorModel';
import { DEG } from '../core/math';

/** Control commands for one tank. Produced by player input, AI or (in future) the network. */
export interface TankInput {
  throttle: number; // -1..1
  steer: number; // -1 (left) .. 1 (right)
  brake: boolean;
  aimPoint: Vector3 | null;
  fire: boolean;
  ammoSlot: number | null;
  lockTurret: boolean;
  consumable: number | null; // 0 repair, 1 medkit, 2 extinguisher
}

export function emptyInput(): TankInput {
  return { throttle: 0, steer: 0, brake: false, aimPoint: null, fire: false, ammoSlot: null, lockTurret: false, consumable: null };
}

export interface CrewState {
  role: CrewRole;
  skill: number; // 0..100
  wounded: boolean;
}

export interface TankLoadout {
  modules: Record<ModuleSlot, string>;
  ammo: Record<string, number>;
  crewSkill: number;
  perks: string[];
}

export type ModuleId = 'engine' | 'transmission' | 'tracks' | 'gun' | 'turretRing' | 'radio' | 'ammoRack' | 'fuelTank';
export type ModuleStatus = 'ok' | 'damaged' | 'destroyed';

export interface ModuleState {
  id: ModuleId;
  hp: number;
  maxHp: number;
  status: ModuleStatus;
  repairTimer: number;
}

export const MODULE_NAMES: Record<ModuleId, string> = {
  engine: 'Двигатель',
  transmission: 'Трансмиссия',
  tracks: 'Ходовая',
  gun: 'Орудие',
  turretRing: 'Погон башни',
  radio: 'Радиостанция',
  ammoRack: 'Боеукладка',
  fuelTank: 'Топливный бак',
};

/** Effective (runtime) characteristics after modules, crew, perks and damage. */
export interface TankStats {
  mass: number; // kg
  power: number; // W at sprocket
  maxSpeed: number; // m/s
  reverseSpeed: number;
  hullTraverse: number; // rad/s
  turretTraverse: number; // rad/s
  elevationSpeed: number; // rad/s
  reload: number; // s
  aimTime: number;
  accuracy: number; // rad
  dispersionMove: number; // per km/h
  dispersionHull: number; // per deg/s
  dispersionTurret: number; // per deg/s
  viewRange: number;
  radioRange: number;
  camoStationary: number;
  camoMoving: number;
  repairSpeed: number;
  canFire: boolean;
  canMove: boolean;
}

export interface BattleStats {
  damageDealt: number;
  damageReceived: number;
  damageBlocked: number;
  assistDamage: number;
  kills: number;
  shots: number;
  hits: number;
  penetrations: number;
  spotted: number;
  capturePoints: number;
  defensePoints: number;
  survivedTime: number;
  shellsUsed: Record<string, number>;
}

const MODULE_HP_BASE: Record<ModuleId, number> = {
  engine: 140, transmission: 120, tracks: 150, gun: 110, turretRing: 100, radio: 70, ammoRack: 120, fuelTank: 120,
};

let nextTankId = 1;

export class Tank {
  readonly id: number;
  readonly layout: ArmorLayout;
  readonly gun: GunModule;
  readonly turret: TurretModule;
  readonly engine: EngineModule;
  readonly suspension: SuspensionModule;
  readonly radio: RadioModule;
  readonly ammoTypes: AmmoData[];
  readonly crew: CrewState[];
  readonly modules: Record<ModuleId, ModuleState>;
  readonly maxHp: number;
  readonly stats: TankStats;
  readonly battle: BattleStats;

  input: TankInput = emptyInput();
  hp: number;
  alive = true;

  // Kinematics
  readonly position = new Vector3();
  readonly velocity = new Vector3();
  readonly quaternion = new Quaternion();
  readonly prevPosition = new Vector3();
  prevYaw = 0;
  prevTurretYaw = 0;
  yaw = 0;
  yawRate = 0;
  pitch = 0;
  roll = 0;
  pitchVel = 0;
  rollVel = 0;
  vy = 0;
  speedLong = 0;
  trackSpeedL = 0;
  trackSpeedR = 0;
  surface = 'grass';
  drowning = 0;
  airborne = false;
  odometer = 0;

  // Turret & gun
  turretYaw = 0;
  gunPitch = 0;
  turretRate = 0;
  dispersion: number;
  reloadTimer = 0;
  magazineLeft: number;
  ammoCounts: number[];
  selectedAmmo = 0;
  pendingAmmo = -1;
  lastShotTime = -100;
  /** Aim target world point the gun is converging to. */
  readonly aimTarget = new Vector3();
  /** Cached artillery elevation solution (the solver is expensive). */
  readonly aimCache = { point: new Vector3(1e9, 0, 0), elevation: null as number | null, time: -1, ammo: '' };

  // Status
  burning = false;
  fireTimer = 0;
  consumableCooldown = [0, 0, 0];
  consumableUsed = [false, false, false];
  lastDamagedBy = -1;
  lastDamageTime = -100;
  readonly damagers = new Map<number, number>();
  /** Last time each enemy team spotted this tank (for minimap/rendering). */
  spottedUntil = 0;
  isPlayer = false;

  constructor(
    readonly data: TankData,
    readonly team: number,
    readonly callsign: string,
    loadout: TankLoadout,
  ) {
    this.id = nextTankId++;
    const pick = <S extends ModuleSlot>(slot: S) => {
      const list = data.modules[slot] as Array<{ id: string }>;
      return (list.find((m) => m.id === loadout.modules[slot]) ?? list[0]) as unknown;
    };
    this.gun = pick('gun') as GunModule;
    this.turret = pick('turret') as TurretModule;
    this.engine = pick('engine') as EngineModule;
    this.suspension = pick('suspension') as SuspensionModule;
    this.radio = pick('radio') as RadioModule;
    if (!this.turret.guns.includes(this.gun.id)) this.gun = data.modules.gun.find((g) => this.turret.guns.includes(g.id)) ?? data.modules.gun[0];
    this.ammoTypes = this.gun.ammo;
    this.ammoCounts = this.ammoTypes.map((a) => loadout.ammo[a.id] ?? 0);
    if (this.ammoCounts.every((c) => c <= 0)) this.ammoCounts[0] = this.gun.ammoCapacity;
    this.selectedAmmo = this.ammoCounts.findIndex((c) => c > 0);
    this.layout = buildArmorLayout(data, this.turret, this.gun.barrelLength);
    this.maxHp = data.hull.hp + this.turret.hpBonus;
    this.hp = this.maxHp;
    this.crew = data.crew.map((role) => ({ role, skill: loadout.crewSkill, wounded: false }));
    const tierMul = 0.7 + data.tier * 0.09;
    this.modules = Object.fromEntries(
      (Object.keys(MODULE_HP_BASE) as ModuleId[]).map((id) => {
        const hp = Math.round(MODULE_HP_BASE[id] * tierMul);
        return [id, { id, hp, maxHp: hp, status: 'ok' as ModuleStatus, repairTimer: 0 }];
      }),
    ) as Record<ModuleId, ModuleState>;
    this.magazineLeft = this.gun.magazine?.size ?? 1;
    this.perks = new Set(loadout.perks);
    this.stats = this.computeStats();
    this.dispersion = this.stats.accuracy * 4;
    this.reloadTimer = 2;
    this.battle = {
      damageDealt: 0, damageReceived: 0, damageBlocked: 0, assistDamage: 0, kills: 0, shots: 0, hits: 0,
      penetrations: 0, spotted: 0, capturePoints: 0, defensePoints: 0, survivedTime: 0, shellsUsed: {},
    };
  }

  readonly perks: Set<string>;

  get ammo(): AmmoData {
    return this.ammoTypes[this.selectedAmmo];
  }

  get hpFraction(): number {
    return this.hp / this.maxHp;
  }

  get isArtillery(): boolean {
    return this.gun.artillery;
  }

  crewEfficiency(role: CrewRole): number {
    const member = this.crew.find((c) => c.role === role) ?? this.crew.find((c) => c.role === 'commander');
    if (!member) return 0.75;
    const commander = this.crew.find((c) => c.role === 'commander');
    const commanderBonus = commander && !commander.wounded && role !== 'commander' ? commander.skill * 0.0005 : 0;
    const skill = member.wounded ? member.skill * 0.5 : member.skill;
    return 0.5 + skill * 0.005 + commanderBonus;
  }

  /** Multiplier ≥ 1 for "time" stats (reload, aim) and ≤ 1 for "rate" stats depending on crew efficiency. */
  private crewTimeMul(role: CrewRole): number {
    return 1 + (1 - this.crewEfficiency(role)) * 0.5;
  }

  moduleFactor(id: ModuleId, damaged: number, destroyed: number): number {
    const s = this.modules[id].status;
    return s === 'ok' ? 1 : s === 'damaged' ? damaged : destroyed;
  }

  /** Recomputes runtime characteristics. Called on spawn and whenever module/crew state changes. */
  computeStats(): TankStats {
    const d = this.data;
    const massT = d.hull.mass + this.gun.mass + this.turret.mass + this.engine.mass + this.suspension.mass + this.radio.mass;
    const driver = this.crewEfficiency('driver');
    const drv = 1 / this.crewTimeMul('driver');
    const engineF = this.moduleFactor('engine', 0.5, 0);
    const transF = this.moduleFactor('transmission', 0.75, 0);
    const tracksOk = this.modules.tracks.status !== 'destroyed';
    const ringF = this.moduleFactor('turretRing', 0.5, 0);
    const radioF = this.moduleFactor('radio', 0.6, 0.25);
    const viewF = this.moduleFactor('radio', 0.92, 0.82);
    const gunStatus = this.modules.gun.status;
    const ammoRackF = this.moduleFactor('ammoRack', 1.5, 1.8);
    const perkCamo = this.perks.has('camo') ? 1.15 : 1;
    const perkEye = this.perks.has('eagle') ? 1.08 : 1;
    const elevSpeed = (d.cls === 'HT' ? 16 : d.cls === 'SPG' ? 10 : 22) * DEG;
    return {
      mass: massT * 1000,
      power: this.engine.power * 735.5 * d.hull.transmission.efficiency * engineF * transF * (0.9 + driver * 0.1),
      maxSpeed: (d.hull.maxSpeed / 3.6) * transF * (this.modules.tracks.status === 'damaged' ? 0.85 : 1),
      reverseSpeed: d.hull.reverseSpeed / 3.6,
      hullTraverse: this.suspension.traverseSpeed * DEG * drv * transF,
      turretTraverse: this.turret.traverseSpeed * DEG * ringF * (1 / this.crewTimeMul('gunner')),
      elevationSpeed: elevSpeed,
      reload: this.gun.reloadTime * this.crewTimeMul('loader') * ammoRackF,
      aimTime: this.gun.aimTime * this.crewTimeMul('gunner') * (gunStatus === 'damaged' ? 1.25 : 1),
      accuracy: (this.gun.accuracy / 100) * this.crewTimeMul('gunner') * (gunStatus === 'damaged' ? 1.5 : 1),
      dispersionMove: this.suspension.dispersionMove * 0.6 * (this.perks.has('smooth') ? 0.85 : 1),
      dispersionHull: this.suspension.dispersionTraverse * 0.6 * (this.perks.has('smooth') ? 0.85 : 1),
      dispersionTurret: (d.cls === 'TD' ? 0.05 : 0.08) * (this.perks.has('snapshot') ? 0.85 : 1),
      viewRange: Math.min(445, this.turret.viewRange * (0.85 + this.crewEfficiency('commander') * 0.15) * viewF * perkEye),
      radioRange: this.radio.range * radioF * (0.85 + this.crewEfficiency('radioman') * 0.15),
      camoStationary: d.camo.stationary * perkCamo,
      camoMoving: d.camo.moving * perkCamo,
      repairSpeed: (this.perks.has('repair') ? 1.25 : 1) * (0.8 + this.crewEfficiency('driver') * 0.2),
      canFire: gunStatus !== 'destroyed' && this.alive,
      canMove: tracksOk && engineF > 0 && transF > 0 && this.alive,
    };
  }

  refreshStats(): void {
    Object.assign(this.stats, this.computeStats());
  }

  /** Hull orientation from yaw/pitch/roll. */
  updateQuaternion(): void {
    _euler.set(-this.pitch, this.yaw, this.roll, 'YXZ');
    this.quaternion.setFromEuler(_euler);
  }

  /** Horizontal aiming angle of turret frame / gun frame relative to the hull. */
  get turretFrameYaw(): number {
    return this.data.hasTurret ? this.turretYaw : 0;
  }

  get gunFrameYaw(): number {
    return this.data.hasTurret ? 0 : this.turretYaw;
  }

  /** World transform helpers ------------------------------------------------ */
  turretQuaternion(out: Quaternion): Quaternion {
    _q.setFromAxisAngle(_up, this.turretFrameYaw);
    return out.copy(this.quaternion).multiply(_q);
  }

  gunQuaternion(out: Quaternion): Quaternion {
    this.turretQuaternion(out);
    _q.setFromAxisAngle(_up, this.gunFrameYaw);
    out.multiply(_q);
    _q.setFromAxisAngle(_xAxis, -this.gunPitch);
    return out.multiply(_q);
  }

  turretWorldPosition(out: Vector3): Vector3 {
    return out.copy(this.layout.turretPivot).applyQuaternion(this.quaternion).add(this.position);
  }

  gunWorldPosition(out: Vector3): Vector3 {
    this.turretQuaternion(_q2);
    return out.copy(this.layout.gunPivot).applyQuaternion(_q2).add(this.turretWorldPosition(_v));
  }

  gunDirection(out: Vector3): Vector3 {
    this.gunQuaternion(_q2);
    return out.set(0, 0, 1).applyQuaternion(_q2);
  }

  muzzlePosition(out: Vector3): Vector3 {
    this.gunWorldPosition(out);
    return out.addScaledVector(this.gunDirection(_v2), this.layout.barrelLength);
  }

  /** Eye point used for spotting (top of turret). */
  eyePosition(out: Vector3): Vector3 {
    return out.set(0, this.layout.turretTop + 0.3, this.layout.turretPivot.z).applyQuaternion(this.quaternion).add(this.position);
  }

  get isMoving(): boolean {
    return Math.abs(this.speedLong) > 0.6 || Math.abs(this.yawRate) > 0.15;
  }
}

const _euler = new Euler();
const _q = new Quaternion();
const _q2 = new Quaternion();
const _v = new Vector3();
const _v2 = new Vector3();
const _up = new Vector3(0, 1, 0);
const _xAxis = new Vector3(1, 0, 0);

export function stockLoadout(t: TankData, crewSkill = 75, top = false): TankLoadout {
  const pick = (slot: ModuleSlot) => (top ? t.modules[slot].at(-1)!.id : t.modules[slot][0].id);
  const modules = { gun: pick('gun'), turret: pick('turret'), engine: pick('engine'), suspension: pick('suspension'), radio: pick('radio') };
  const gun = t.modules.gun.find((g) => g.id === modules.gun)!;
  const cap = gun.ammoCapacity;
  const ammo: Record<string, number> = {};
  if (gun.artillery) {
    ammo[gun.ammo[0].id] = Math.round(cap * 0.7);
    ammo[gun.ammo[1].id] = Math.round(cap * 0.2);
    ammo[gun.ammo[2].id] = cap - ammo[gun.ammo[0].id] - ammo[gun.ammo[1].id];
  } else {
    ammo[gun.ammo[0].id] = Math.round(cap * 0.65);
    ammo[gun.ammo[1].id] = Math.round(cap * 0.15);
    ammo[gun.ammo[2].id] = cap - ammo[gun.ammo[0].id] - ammo[gun.ammo[1].id];
  }
  return { modules, ammo, crewSkill, perks: [] };
}
