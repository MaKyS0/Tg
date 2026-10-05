import { registry } from '../data/registry';
import { crewXpForLevel, CREW_PERKS, MAX_PERKS, PERK_XP } from '../data/crew';
import type { GunModule, ModuleData, ModuleSlot, TankData } from '../data/types';
import { stockLoadout, type TankLoadout } from '../sim/Tank';
import { defaultSettings, defaultStats, type CrewProgress, type SaveData, type TankProgress } from './SaveSystem';
import type { RewardBreakdown } from './Economy';

export type TankState = 'locked' | 'researchable' | 'researched' | 'owned';
export type ModuleState = 'locked' | 'researchable' | 'researched' | 'purchased' | 'equipped';

const SLOTS: ModuleSlot[] = ['gun', 'turret', 'engine', 'suspension', 'radio'];
const STARTING_CREDITS = 40000;

export interface ActionResult {
  ok: boolean;
  message: string;
}

const fail = (message: string): ActionResult => ({ ok: false, message });
const ok = (message: string): ActionResult => ({ ok: true, message });

/** Research tree, purchases, modules, ammo loadouts, crew training and battle reward bookkeeping. */
export class ProgressionSystem {
  constructor(public data: SaveData) {}

  static newProfile(): SaveData {
    const starters = registry.starterTanks();
    const tanks: Record<string, TankProgress> = {};
    for (const t of starters) tanks[t.id] = ProgressionSystem.newTankProgress(t, true);
    return {
      version: 0, createdAt: Date.now(), updatedAt: Date.now(), credits: STARTING_CREDITS, freeXp: 0,
      researched: starters.map((t) => t.id), tanks, selectedTank: starters.find((t) => t.nation === 'ussr')?.id ?? starters[0].id,
      settings: defaultSettings(), stats: defaultStats(), lastMode: 'standard', lastMap: 'random',
    };
  }

  static newTankProgress(t: TankData, owned: boolean): TankProgress {
    const stock = stockLoadout(t, 50);
    return {
      xp: 0,
      owned,
      researchedModules: SLOTS.map((s) => t.modules[s][0].id),
      purchasedModules: SLOTS.map((s) => t.modules[s][0].id),
      equipped: { ...stock.modules },
      ammo: stock.ammo,
      crew: { skill: 50, xp: 0, perkXp: 0, perks: [], perkPoints: 0 },
      battles: 0, wins: 0, damage: 0, kills: 0,
    };
  }

  progress(id: string): TankProgress {
    let p = this.data.tanks[id];
    if (!p) {
      p = ProgressionSystem.newTankProgress(registry.getTank(id), false);
      this.data.tanks[id] = p;
    }
    return p;
  }

  isResearched(id: string): boolean {
    return this.data.researched.includes(id);
  }

  isOwned(id: string): boolean {
    return !!this.data.tanks[id]?.owned;
  }

  ownedTanks(): TankData[] {
    return registry.allTanks().filter((t) => this.isOwned(t.id));
  }

  tankState(id: string): TankState {
    if (this.isOwned(id)) return 'owned';
    if (this.isResearched(id)) return 'researched';
    const t = registry.getTank(id);
    if (t.premium) return 'researched';
    if (t.parents.some((p) => this.isResearched(p))) return 'researchable';
    return 'locked';
  }

  /** XP available for researching `id`: best parent's tank XP plus free XP. */
  availableXpFor(id: string): { parent: string | null; tankXp: number; total: number } {
    const t = registry.getTank(id);
    let best: string | null = null;
    let bestXp = 0;
    for (const p of t.parents) {
      if (!this.isResearched(p)) continue;
      const xp = this.data.tanks[p]?.xp ?? 0;
      if (best === null || xp > bestXp) {
        best = p;
        bestXp = xp;
      }
    }
    return { parent: best, tankXp: bestXp, total: bestXp + this.data.freeXp };
  }

  private spendXp(tankId: string | null, amount: number): void {
    let left = amount;
    if (tankId) {
      const p = this.progress(tankId);
      const use = Math.min(p.xp, left);
      p.xp -= use;
      left -= use;
    }
    this.data.freeXp -= left;
  }

  research(id: string): ActionResult {
    if (this.tankState(id) !== 'researchable') return fail('Танк недоступен для исследования');
    const t = registry.getTank(id);
    const xp = this.availableXpFor(id);
    if (xp.total < t.researchXp) return fail(`Недостаточно опыта: нужно ${t.researchXp}`);
    this.spendXp(xp.parent, t.researchXp);
    this.data.researched.push(id);
    this.progress(id);
    return ok(`Исследован ${t.name}`);
  }

  buy(id: string): ActionResult {
    const t = registry.getTank(id);
    const state = this.tankState(id);
    if (state === 'owned') return fail('Танк уже в ангаре');
    if (state !== 'researched') return fail('Сначала исследуйте танк');
    if (this.data.credits < t.price) return fail(`Недостаточно кредитов: нужно ${t.price}`);
    this.data.credits -= t.price;
    const p = this.progress(id);
    p.owned = true;
    if (!this.isResearched(id)) this.data.researched.push(id);
    return ok(`Куплен ${t.name}`);
  }

  sellPrice(id: string): number {
    const t = registry.getTank(id);
    const p = this.data.tanks[id];
    let modules = 0;
    if (p) {
      for (const slot of SLOTS) for (const m of t.modules[slot]) if (p.purchasedModules.includes(m.id)) modules += m.price;
    }
    return Math.round(t.price * 0.5 + modules * 0.5);
  }

  sell(id: string): ActionResult {
    if (!this.isOwned(id)) return fail('Танк не в ангаре');
    if (this.ownedTanks().length <= 1) return fail('Нельзя продать последний танк');
    const t = registry.getTank(id);
    const price = this.sellPrice(id);
    this.data.credits += price;
    const p = this.progress(id);
    p.owned = false;
    p.crew = { skill: 50, xp: 0, perkXp: 0, perks: [], perkPoints: 0 };
    p.purchasedModules = SLOTS.map((s) => t.modules[s][0].id);
    const stock = stockLoadout(t, 50);
    p.equipped = { ...stock.modules };
    p.ammo = stock.ammo;
    if (this.data.selectedTank === id) this.data.selectedTank = this.ownedTanks()[0].id;
    return ok(`Продан ${t.name} за ${price} кр.`);
  }

  // --- Modules ---------------------------------------------------------------
  findModule(tank: TankData, moduleId: string): { slot: ModuleSlot; module: ModuleData; index: number } | null {
    for (const slot of SLOTS) {
      const list = tank.modules[slot] as ModuleData[];
      const index = list.findIndex((m) => m.id === moduleId);
      if (index >= 0) return { slot, module: list[index], index };
    }
    return null;
  }

  moduleState(tankId: string, moduleId: string): ModuleState {
    const t = registry.getTank(tankId);
    const p = this.progress(tankId);
    const f = this.findModule(t, moduleId);
    if (!f) return 'locked';
    if (p.equipped[f.slot] === moduleId) return 'equipped';
    if (p.purchasedModules.includes(moduleId)) return 'purchased';
    if (p.researchedModules.includes(moduleId)) return 'researched';
    const prev = (t.modules[f.slot] as ModuleData[])[f.index - 1];
    if (!prev || p.researchedModules.includes(prev.id)) return 'researchable';
    return 'locked';
  }

  researchModule(tankId: string, moduleId: string): ActionResult {
    if (this.moduleState(tankId, moduleId) !== 'researchable') return fail('Модуль недоступен для исследования');
    const t = registry.getTank(tankId);
    const m = this.findModule(t, moduleId)!.module;
    const p = this.progress(tankId);
    if (p.xp + this.data.freeXp < m.researchXp) return fail(`Недостаточно опыта: нужно ${m.researchXp}`);
    this.spendXp(tankId, m.researchXp);
    p.researchedModules.push(moduleId);
    return ok(`Исследован модуль ${m.name}`);
  }

  /** Configuration after hypothetically equipping a module, with gun/turret compatibility fixes. */
  configWith(tankId: string, moduleId: string): Record<ModuleSlot, string> {
    const t = registry.getTank(tankId);
    const p = this.progress(tankId);
    const f = this.findModule(t, moduleId)!;
    const cfg = { ...p.equipped, [f.slot]: moduleId };
    const turret = t.modules.turret.find((x) => x.id === cfg.turret)!;
    if (!turret.guns.includes(cfg.gun)) {
      cfg.gun = [...t.modules.gun].reverse().find((g) => turret.guns.includes(g.id) && p.purchasedModules.includes(g.id))?.id ?? turret.guns[0];
    }
    return cfg;
  }

  canEquip(tankId: string, moduleId: string): ActionResult {
    const t = registry.getTank(tankId);
    const f = this.findModule(t, moduleId);
    if (!f) return fail('Неизвестный модуль');
    const cfg = this.configWith(tankId, moduleId);
    if (f.slot === 'gun') {
      const turret = t.modules.turret.find((x) => x.id === cfg.turret)!;
      if (!turret.guns.includes(moduleId)) return fail('Орудие требует другую башню');
    }
    const susp = t.modules.suspension.find((s) => s.id === cfg.suspension)!;
    const load = registry.loadOf(t, cfg);
    if (load > susp.maxLoad + 1e-6) return fail(`Перегруз ходовой: ${load.toFixed(1)} т из ${susp.maxLoad.toFixed(1)} т`);
    return ok('');
  }

  buyAndEquipModule(tankId: string, moduleId: string): ActionResult {
    const state = this.moduleState(tankId, moduleId);
    if (state === 'equipped') return ok('Уже установлен');
    if (state === 'locked' || state === 'researchable') return fail('Сначала исследуйте модуль');
    const t = registry.getTank(tankId);
    const f = this.findModule(t, moduleId)!;
    const p = this.progress(tankId);
    const check = this.canEquip(tankId, moduleId);
    if (!check.ok) return check;
    if (state === 'researched') {
      if (this.data.credits < f.module.price) return fail(`Недостаточно кредитов: нужно ${f.module.price}`);
      this.data.credits -= f.module.price;
      p.purchasedModules.push(moduleId);
    }
    const cfg = this.configWith(tankId, moduleId);
    const gunChanged = cfg.gun !== p.equipped.gun;
    p.equipped = cfg;
    if (gunChanged) p.ammo = this.defaultAmmo(t, cfg.gun);
    return ok(`Установлен ${f.module.name}`);
  }

  defaultAmmo(t: TankData, gunId: string): Record<string, number> {
    const loadout = stockLoadout(t, 50);
    const gun = t.modules.gun.find((g) => g.id === gunId)!;
    if (gun.id === loadout.modules.gun) return loadout.ammo;
    const cap = gun.ammoCapacity;
    const out: Record<string, number> = {};
    out[gun.ammo[0].id] = Math.round(cap * 0.65);
    out[gun.ammo[1].id] = Math.round(cap * 0.15);
    out[gun.ammo[2].id] = cap - out[gun.ammo[0].id] - out[gun.ammo[1].id];
    return out;
  }

  equippedGun(tankId: string): GunModule {
    const t = registry.getTank(tankId);
    const p = this.progress(tankId);
    return t.modules.gun.find((g) => g.id === p.equipped.gun) ?? t.modules.gun[0];
  }

  setAmmo(tankId: string, ammoId: string, count: number): ActionResult {
    const gun = this.equippedGun(tankId);
    const p = this.progress(tankId);
    if (!gun.ammo.some((a) => a.id === ammoId)) return fail('Снаряд не подходит');
    const others = gun.ammo.filter((a) => a.id !== ammoId).reduce((s, a) => s + (p.ammo[a.id] ?? 0), 0);
    p.ammo[ammoId] = Math.max(0, Math.min(Math.round(count), gun.ammoCapacity - others));
    return ok('');
  }

  /** Cost of refilling the configured ammo after a battle (shells used are re-bought). */
  restockCost(tankId: string, used: Record<string, number>): number {
    const gun = this.equippedGun(tankId);
    let cost = 0;
    for (const a of gun.ammo) cost += (used[a.id] ?? 0) * a.price;
    return cost;
  }

  // --- Crew --------------------------------------------------------------------
  crewTrainingCost(tankId: string, target: 75 | 100): number {
    const t = registry.getTank(tankId);
    return target === 75 ? 4000 + t.tier * 3000 : 15000 + t.tier * 12000;
  }

  trainCrew(tankId: string, target: 75 | 100): ActionResult {
    const p = this.progress(tankId);
    if (!p.owned) return fail('Танк не в ангаре');
    if (p.crew.skill >= target) return fail('Экипаж уже обучен');
    const cost = this.crewTrainingCost(tankId, target);
    if (this.data.credits < cost) return fail(`Недостаточно кредитов: нужно ${cost}`);
    this.data.credits -= cost;
    p.crew.skill = target;
    p.crew.xp = 0;
    return ok(`Экипаж обучен до ${target}%`);
  }

  addCrewXp(crew: CrewProgress, xp: number): void {
    let left = xp;
    while (left > 0 && crew.skill < 100) {
      const need = crewXpForLevel(crew.skill) - crew.xp;
      if (left >= need) {
        left -= need;
        crew.skill++;
        crew.xp = 0;
      } else {
        crew.xp += left;
        left = 0;
      }
    }
    if (crew.skill >= 100 && left > 0 && crew.perks.length + crew.perkPoints < MAX_PERKS) {
      crew.perkXp += left;
      while (crew.perkXp >= PERK_XP && crew.perks.length + crew.perkPoints < MAX_PERKS) {
        crew.perkXp -= PERK_XP;
        crew.perkPoints++;
      }
    }
  }

  learnPerk(tankId: string, perkId: string): ActionResult {
    const p = this.progress(tankId);
    if (p.crew.perkPoints <= 0) return fail('Нет очков навыков');
    if (!CREW_PERKS.some((x) => x.id === perkId)) return fail('Неизвестный навык');
    if (p.crew.perks.includes(perkId)) return fail('Навык уже изучен');
    p.crew.perkPoints--;
    p.crew.perks.push(perkId);
    return ok('Навык изучен');
  }

  /** Loadout used to spawn the player's tank in battle. */
  loadoutFor(tankId: string): TankLoadout {
    const p = this.progress(tankId);
    return { modules: { ...p.equipped }, ammo: { ...p.ammo }, crewSkill: p.crew.skill, perks: [...p.crew.perks] };
  }

  /** Converts free XP at a credit cost (1 XP = 25 cr). */
  convertToFreeXp(tankId: string, amount: number): ActionResult {
    const p = this.progress(tankId);
    const amt = Math.min(Math.floor(amount), p.xp);
    const cost = amt * 25;
    if (amt <= 0) return fail('Нет опыта для перевода');
    if (this.data.credits < cost) return fail(`Недостаточно кредитов: нужно ${cost}`);
    this.data.credits -= cost;
    p.xp -= amt;
    this.data.freeXp += amt;
    return ok(`Переведено ${amt} опыта в свободный`);
  }

  applyBattleRewards(tankId: string, rewards: RewardBreakdown, stats: { damage: number; kills: number; spotted: number; shots: number; hits: number }): void {
    const p = this.progress(tankId);
    p.xp += rewards.xp;
    p.battles++;
    if (rewards.outcome === 'win') p.wins++;
    p.damage += stats.damage;
    p.kills += stats.kills;
    this.addCrewXp(p.crew, rewards.crewXp);
    this.data.freeXp += rewards.freeXp;
    this.data.credits = Math.max(0, this.data.credits + rewards.creditsNet);
    const s = this.data.stats;
    s.battles++;
    if (rewards.outcome === 'win') s.wins++;
    else if (rewards.outcome === 'loss') s.losses++;
    else s.draws++;
    s.damage += stats.damage;
    s.kills += stats.kills;
    s.spotted += stats.spotted;
    s.shots += stats.shots;
    s.hits += stats.hits;
    s.bestDamage = Math.max(s.bestDamage, stats.damage);
    s.bestKills = Math.max(s.bestKills, stats.kills);
    s.totalXp += rewards.xp;
    s.creditsEarned += Math.max(0, rewards.creditsNet);
  }
}
