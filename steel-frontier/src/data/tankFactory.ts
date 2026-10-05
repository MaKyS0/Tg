import { CLASS_ARCHETYPES } from './classes';
import { AMMO_KINDS } from './ammo';
import type {
  AmmoData, AmmoKind, CrewRole, EngineModule, GunModule, NationData, RadioModule, SuspensionModule,
  TankClass, TankData, TurretModule,
} from './types';
import type { TankRow, TankTweak } from './techTree';
import { clamp } from '../core/math';

// Tier tables (index = tier). Fractional tiers are interpolated, which is how stock modules are derived.
const HP_BY_TIER = [100, 150, 230, 330, 450, 610, 800, 1040, 1330, 1680, 2080];
const DAMAGE_BY_TIER = [30, 40, 55, 75, 110, 150, 190, 230, 280, 330, 390];
const PEN_BY_TIER = [30, 38, 52, 68, 90, 115, 145, 175, 205, 235, 265];
const DPM_BY_TIER = [1200, 1300, 1450, 1600, 1750, 1900, 2050, 2250, 2500, 2800, 3150];
export const TANK_PRICE = [0, 0, 3000, 12000, 35000, 80000, 150000, 260000, 420000, 650000, 950000];
export const TANK_RESEARCH_XP = [0, 0, 400, 1400, 3200, 6500, 12000, 20000, 32000, 48000, 70000];
const CALIBERS = [20, 37, 45, 50, 57, 75, 76, 85, 88, 90, 100, 105, 107, 120, 122, 128, 130, 150, 152, 155, 180];

function tierValue(table: number[], tier: number): number {
  const t = clamp(tier, 0, table.length - 1);
  const i = Math.floor(t);
  const f = t - i;
  return i >= table.length - 1 ? table[table.length - 1] : table[i] * (1 - f) + table[i + 1] * f;
}

function caliberForDamage(damage: number, artillery: boolean): number {
  const target = artillery ? 50 + damage * 0.18 : 25 + Math.pow(damage, 0.72) * 1.2;
  let best = CALIBERS[0];
  for (const c of CALIBERS) if (Math.abs(c - target) < Math.abs(best - target)) best = c;
  return best;
}

const round5 = (v: number) => Math.round(v / 5) * 5;
const round10 = (v: number) => Math.round(v / 10) * 10;

function crewFor(cls: TankClass, tier: number): CrewRole[] {
  if (tier <= 2) return cls === 'LT' ? ['commander', 'driver', 'gunner'] : ['commander', 'driver', 'gunner', 'loader'];
  switch (cls) {
    case 'LT': return ['commander', 'gunner', 'driver', 'radioman'];
    case 'TD': return ['commander', 'gunner', 'driver', 'loader'];
    default: return ['commander', 'gunner', 'driver', 'loader', 'radioman'];
  }
}

function makeAmmo(gunId: string, kind: AmmoKind, caliber: number, basePen: number, baseDamage: number,
  baseVelocity: number, artillery: boolean): AmmoData {
  const k = AMMO_KINDS[kind];
  const massBase = 1.5e-5 * Math.pow(caliber, 3);
  const mass = Math.max(0.3, massBase * k.massMul);
  const area = Math.PI * Math.pow(caliber / 2000, 2);
  const dragK = (0.5 * 1.225 * k.dragCd * area) / mass;
  let penetration = basePen * k.penMul;
  if (kind === 'HE') penetration = Math.max(basePen * 0.35, caliber * 0.5);
  let damage = baseDamage * k.damageMul;
  if (artillery && kind !== 'HE') damage = baseDamage * 0.85;
  if (artillery && kind === 'HE') damage = baseDamage;
  const velocity = baseVelocity * (artillery ? (kind === 'HE' ? 1 : 1.08) : k.velocityMul);
  return {
    id: `${gunId}_${kind}`,
    kind,
    name: `${k.name} ${caliber} мм`,
    caliber,
    penetration: Math.round(penetration),
    damage: Math.round(damage),
    velocity: Math.round(velocity),
    mass: Math.round(mass * 100) / 100,
    dragK,
    gravityScale: artillery ? 5.2 : 1.5,
    normalization: k.normalization,
    ricochetAngle: k.ricochetAngle,
    explosionRadius: kind === 'HE' ? (0.5 + caliber / 75) * (artillery ? 1.8 : 1) : 0,
    price: Math.round(damage * (artillery ? 0.9 : 1.4) * k.priceMul),
    premium: k.premium,
  };
}

interface GunContext {
  tankId: string;
  nation: NationData;
  cls: TankClass;
  tweak: TankTweak;
  tier: number;
}

function makeGun(ctx: GunContext, effTier: number, index: number, stock: boolean): GunModule {
  const A = CLASS_ARCHETYPES[ctx.cls];
  const f = ctx.nation.flavor;
  const tw = ctx.tweak;
  const artillery = ctx.cls === 'SPG';
  const id = `${ctx.tankId}_gun${index}`;
  const damage = round5(tierValue(DAMAGE_BY_TIER, effTier) * A.alphaMul * f.alpha * (tw.alpha ?? 1));
  const pen = Math.round(tierValue(PEN_BY_TIER, effTier) * A.penMul * f.penetration * (tw.pen ?? 1));
  const caliber = caliberForDamage(damage, artillery);
  const dpm = tierValue(DPM_BY_TIER, effTier) * A.dpmMul;
  let reload = clamp((60 * damage) / dpm * f.reload * (tw.reload ?? 1), 1.6, 45);
  let magazine: GunModule['magazine'] = null;
  const mag = tw.magazine ?? (f.magazine && ctx.tier >= f.magazine.fromTier && f.magazine.classes.includes(ctx.cls) && !stock
    ? { size: f.magazine.size + (ctx.tier >= 9 ? 1 : 0), interShot: f.magazine.interShot }
    : null);
  if (mag) {
    magazine = { size: mag.size, interShot: mag.interShot };
    reload = reload * mag.size * 1.05;
  }
  const velocity = artillery
    ? 165 + effTier * 7
    : (560 + 42 * effTier) * f.shellVelocity * (ctx.cls === 'TD' ? 1.08 : ctx.cls === 'HT' ? 0.95 : 1);
  const premiumKind: AmmoKind = tw.premiumShell ?? (ctx.cls === 'HT' || ctx.cls === 'TD' ? 'HEAT' : 'APCR');
  const kinds: AmmoKind[] = artillery ? ['HE', 'AP', 'HEAT'] : ['AP', premiumKind, 'HE'];
  const ammo = kinds.map((k) => makeAmmo(id, k, caliber, pen, damage, velocity, artillery));
  const calibersLong = artillery ? 26 : ctx.cls === 'TD' ? 58 : ctx.cls === 'HT' ? 46 : ctx.cls === 'LT' ? 44 : 52;
  return {
    id,
    slot: 'gun',
    name: `${ctx.nation.modulePrefix.gun} ${caliber} мм L/${calibersLong}${stock ? '' : ' М'}`,
    tier: Math.max(1, Math.round(effTier)),
    caliber,
    ammo,
    reloadTime: Math.round(reload * 100) / 100,
    magazine,
    accuracy: Math.round(A.accuracy * f.accuracy * (1 - 0.012 * effTier) * (stock ? 1.06 : 1) * (tw.accuracy ?? 1) * 1000) / 1000,
    aimTime: Math.round(A.aimTime * f.aimTime * (stock ? 1.1 : 1) * 100) / 100,
    elevation: A.elevation,
    depression: Math.round(A.depression * f.depression),
    ammoCapacity: Math.round(clamp(A.ammoCapacity * Math.sqrt(76 / Math.max(caliber, 40)), 18, 120)),
    barrelLength: clamp((caliber / 1000) * calibersLong, 1.4, 6.8),
    artillery,
    mass: Math.round(Math.pow(caliber, 2) * 0.00024 * 100) / 100,
    price: stock ? 0 : Math.round(TANK_PRICE[ctx.tier] * 0.14 + 1500),
    researchXp: stock ? 0 : Math.round(TANK_RESEARCH_XP[ctx.tier] * 0.14 + 150),
  };
}

export function buildTank(row: TankRow, nation: NationData): TankData {
  const A = CLASS_ARCHETYPES[row.cls];
  const f = nation.flavor;
  const tw: TankTweak = row.tweak ?? {};
  const t = row.tier;
  const size = tw.size ?? 1;

  const hp = round10(tierValue(HP_BY_TIER, t) * A.hpMul * f.hp * (tw.hp ?? 1));
  const baseFront = A.armorFrontBase + A.armorFrontPerTier * t;
  const front = baseFront * f.hullArmor * (tw.armor ?? 1);
  const armor = {
    upperFront: Math.round(front),
    lowerFront: Math.round(front * 0.8),
    side: Math.round(Math.max(10, front * A.sideRatio)),
    rear: Math.round(Math.max(8, front * 0.4)),
    roof: Math.round(clamp(front * 0.18, 8, 40)),
    bottom: Math.round(clamp(front * 0.15, 8, 35)),
  };
  const length = (A.dims.length + 0.2 * t) * size;
  const width = (A.dims.width + 0.06 * t) * size;
  const height = (A.dims.height + 0.03 * t) * size;
  const hasTurret = tw.hasTurret ?? A.hasTurret;

  // --- Guns -------------------------------------------------------------------
  const gctx: GunContext = { tankId: row.id, nation, cls: row.cls, tweak: tw, tier: t };
  const guns = [makeGun(gctx, Math.max(0.6, t - 0.65), 0, true), makeGun(gctx, t, 1, false)];

  // --- Turrets / superstructure -----------------------------------------------
  const tFront = baseFront * f.turretArmor * (tw.turretArmor ?? 1) * (tw.armor ?? 1) * (row.cls === 'HT' ? 1.25 : row.cls === 'TD' ? 1.15 : 1.1);
  const turretShapeFor = (stock: boolean) => {
    const scale = stock ? 0.94 : 1;
    if (!hasTurret) {
      const spg = row.cls === 'SPG';
      return {
        length: length * (spg ? 0.38 : 0.45),
        width: width * (spg ? 0.72 : 0.78),
        height: (spg ? 0.95 : 0.75) + 0.02 * t,
        frontAngle: spg ? 10 : 20,
        slope: spg ? 0.05 : 0.22,
        offsetZ: spg ? -length * 0.22 : length * 0.12,
      };
    }
    return {
      length: width * (row.cls === 'HT' ? 0.7 : 0.62) * scale,
      width: width * (row.cls === 'HT' ? 0.66 : 0.6) * scale,
      height: (0.55 + 0.025 * t) * (row.cls === 'HT' ? 1.15 : 1) * scale,
      frontAngle: nation.id === 'ussr' ? 34 : nation.id === 'germany' ? 12 : 24,
      slope: nation.id === 'ussr' ? 0.3 : nation.id === 'germany' ? 0.08 : 0.18,
      offsetZ: row.cls === 'HT' ? -length * 0.02 : length * 0.05,
    };
  };
  const makeTurret = (index: number, stock: boolean): TurretModule => {
    const k = stock && hasTurret ? 0.85 : 1;
    const fr = Math.round(tFront * k * (row.cls === 'SPG' ? 0.6 : 1));
    return {
      id: `${row.id}_turret${index}`,
      slot: 'turret',
      name: hasTurret ? `${nation.modulePrefix.turret} ${row.tier}-${index + 1}` : 'Рубка',
      tier: Math.max(1, stock ? t - 1 : t),
      armor: {
        front: fr,
        side: Math.round(Math.max(10, fr * (row.cls === 'TD' ? 0.45 : 0.62))),
        rear: Math.round(Math.max(8, fr * 0.42)),
        roof: row.cls === 'SPG' ? 6 : Math.round(clamp(fr * 0.18, 8, 45)),
        mantlet: Math.round(fr * 0.55),
      },
      shape: turretShapeFor(stock),
      traverseSpeed: Math.round((A.turretTraverse * (stock ? 0.88 : 1) + (t - 5) * 0.4) * (hasTurret && row.cls === 'TD' ? 0.8 : 1)),
      viewRange: Math.round(A.viewRange * f.view * (tw.view ?? 1) * (stock ? 0.95 : 1) + t * 2),
      hpBonus: stock || !hasTurret ? 0 : round10(hp * 0.06),
      guns: stock && hasTurret ? [guns[0].id] : guns.map((g) => g.id),
      mass: Math.round(width * width * 0.25 * (1 + fr / 120) * (hasTurret ? 1 : 0.6) * 100) / 100,
      price: stock ? 0 : Math.round(TANK_PRICE[t] * 0.1 + 1000),
      researchXp: stock ? 0 : Math.round(TANK_RESEARCH_XP[t] * 0.1 + 100),
    };
  };
  const turrets = hasTurret ? [makeTurret(0, true), makeTurret(1, false)] : [makeTurret(0, true)];

  // --- Mass budget, engines, suspension ----------------------------------------
  const targetMass = (A.massBase + A.massPerTier * t) * size;
  const stockModulesMass = guns[0].mass + turrets[0].mass + 0.6 + 0.4;
  const hullMass = Math.max(3, targetMass - stockModulesMass);
  const stockTotal = hullMass + stockModulesMass;
  const topTotal = hullMass + guns[1].mass + turrets[turrets.length - 1].mass + 0.7 + 0.45;

  const powerBase = A.specificPower * targetMass * f.mobility * (tw.speed ?? 1);
  const engines: EngineModule[] = [0, 1].map((i) => ({
    id: `${row.id}_engine${i}`,
    slot: 'engine',
    name: `${nation.modulePrefix.engine}-${Math.round(powerBase * (i === 0 ? 0.86 : 1))}`,
    tier: Math.max(1, t - (i === 0 ? 1 : 0)),
    power: Math.round(powerBase * (i === 0 ? 0.86 : 1)),
    fireChance: i === 0 ? 0.2 : 0.15,
    mass: i === 0 ? 0.6 : 0.7,
    price: i === 0 ? 0 : Math.round(TANK_PRICE[t] * 0.08 + 800),
    researchXp: i === 0 ? 0 : Math.round(TANK_RESEARCH_XP[t] * 0.08 + 80),
  }));

  const soft = row.cls === 'LT' ? 1.6 : row.cls === 'HT' ? 2.2 : 1.9;
  const suspensions: SuspensionModule[] = [0, 1].map((i) => ({
    id: `${row.id}_susp${i}`,
    slot: 'suspension',
    name: `${nation.modulePrefix.suspension} ${row.tier}-${i + 1}`,
    tier: Math.max(1, t - (i === 0 ? 1 : 0)),
    maxLoad: Math.round((i === 0 ? stockTotal + (topTotal - stockTotal) * 0.45 + 0.1 : topTotal + 1.5) * 100) / 100,
    traverseSpeed: Math.round(A.hullTraverse * f.mobility * (i === 0 ? 0.88 : 1) * (tw.speed ?? 1)),
    resistance: i === 0 ? { hard: 1.0, medium: 1.2, soft } : { hard: 0.95, medium: 1.1, soft: soft * 0.9 },
    dispersionMove: Math.round(A.dispersionMove * (i === 0 ? 1.1 : 1) * 1000) / 1000,
    dispersionTraverse: Math.round(A.dispersionMove * 0.9 * (i === 0 ? 1.1 : 1) * 1000) / 1000,
    mass: 0.4 + i * 0.05,
    price: i === 0 ? 0 : Math.round(TANK_PRICE[t] * 0.07 + 700),
    researchXp: i === 0 ? 0 : Math.round(TANK_RESEARCH_XP[t] * 0.07 + 70),
  }));
  // Mass of the suspension itself is included in the budget above (0.4/0.45).

  const radios: RadioModule[] = [0, 1].map((i) => ({
    id: `${row.id}_radio${i}`,
    slot: 'radio',
    name: `${nation.modulePrefix.radio}-${t}${i === 0 ? 'A' : 'M'}`,
    tier: Math.max(1, t - (i === 0 ? 1 : 0)),
    range: Math.round((300 + 45 * t) * (i === 0 ? 0.8 : 1)),
    mass: 0.05,
    price: i === 0 ? 0 : Math.round(TANK_PRICE[t] * 0.04 + 400),
    researchXp: i === 0 ? 0 : Math.round(TANK_RESEARCH_XP[t] * 0.04 + 40),
  }));

  const gears = 4 + Math.floor(t / 3);
  const sizeCamo = clamp(1 / size, 0.8, 1.2);
  const premium = row.premium ?? false;

  return {
    id: row.id,
    name: row.name,
    nation: nation.id,
    cls: row.cls,
    tier: t,
    premium,
    description: row.description ?? `${A.name} ${nation.name}. ${A.role}.`,
    hull: {
      mass: Math.round(hullMass * 100) / 100,
      hp,
      armor,
      angles: {
        upperFront: clamp(A.upperAngle + f.slope, 10, 68),
        lowerFront: clamp(A.lowerAngle + f.slope * 0.5, 10, 65),
      },
      dims: {
        length,
        width,
        height,
        clearance: 0.42 + 0.01 * t,
        noseHeight: 0.42,
      },
      trackWidth: width * 0.19,
      trackArmor: Math.round(10 + 2 * t),
      screens: tw.screens && t >= 4 ? Math.round(5 + t) : 0,
      transmission: { name: `${gears}-ступ. механическая`, gears, efficiency: 0.68 + 0.01 * t },
      maxSpeed: Math.round(A.maxSpeed * f.mobility * (tw.speed ?? 1) + t * 0.3),
      reverseSpeed: Math.round(A.reverseSpeed * (tw.speed ?? 1)),
    },
    hasTurret,
    traverseLimit: hasTurret ? 180 : A.traverseLimit,
    modules: { gun: guns, turret: turrets, engine: engines, suspension: suspensions, radio: radios },
    crew: crewFor(row.cls, t),
    camo: {
      stationary: Math.round(A.camo.stationary * (tw.camo ?? 1) * sizeCamo * 1000) / 1000,
      moving: Math.round(A.camo.moving * (tw.camo ?? 1) * sizeCamo * 1000) / 1000,
      firingPenalty: clamp(0.25 + guns[1].caliber / 400, 0.3, 0.75),
    },
    price: premium ? Math.round(TANK_PRICE[t] * 1.6) : TANK_PRICE[t],
    researchXp: premium ? 0 : TANK_RESEARCH_XP[t],
    parents: row.parents,
    treeRow: row.treeRow,
  };
}
