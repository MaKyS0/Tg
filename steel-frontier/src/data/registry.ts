import { NATIONS } from './nations';
import { buildTankRows } from './techTree';
import { buildTank } from './tankFactory';
import { MAPS } from './maps';
import { GAME_MODES } from './gameModes';
import type { GameModeData, MapData, ModuleData, ModuleSlot, NationData, TankData } from './types';

/** Central read-only lookup for all content. Systems query data here instead of importing tables. */
export class DataRegistry {
  readonly tanks = new Map<string, TankData>();
  readonly nations = new Map<string, NationData>();
  readonly maps = new Map<string, MapData>();
  readonly modes = new Map<string, GameModeData>();
  private children = new Map<string, string[]>();
  private modules = new Map<string, { tankId: string; module: ModuleData }>();

  constructor(nations: NationData[], tanks: TankData[], maps: MapData[], modes: GameModeData[]) {
    for (const n of nations) this.nations.set(n.id, n);
    for (const m of maps) this.maps.set(m.id, m);
    for (const m of modes) this.modes.set(m.id, m);
    for (const t of tanks) this.addTank(t);
  }

  addTank(t: TankData): void {
    if (this.tanks.has(t.id)) throw new Error(`Duplicate tank id ${t.id}`);
    this.tanks.set(t.id, t);
    for (const p of t.parents) {
      const list = this.children.get(p) ?? [];
      list.push(t.id);
      this.children.set(p, list);
    }
    const slots: ModuleSlot[] = ['gun', 'turret', 'engine', 'suspension', 'radio'];
    for (const s of slots) for (const m of t.modules[s]) this.modules.set(m.id, { tankId: t.id, module: m });
  }

  getTank(id: string): TankData {
    const t = this.tanks.get(id);
    if (!t) throw new Error(`Unknown tank ${id}`);
    return t;
  }

  getNation(id: string): NationData {
    const n = this.nations.get(id);
    if (!n) throw new Error(`Unknown nation ${id}`);
    return n;
  }

  getMap(id: string): MapData {
    const m = this.maps.get(id);
    if (!m) throw new Error(`Unknown map ${id}`);
    return m;
  }

  getMode(id: string): GameModeData {
    const m = this.modes.get(id);
    if (!m) throw new Error(`Unknown mode ${id}`);
    return m;
  }

  getModule(id: string): ModuleData {
    const m = this.modules.get(id);
    if (!m) throw new Error(`Unknown module ${id}`);
    return m.module;
  }

  childrenOf(id: string): TankData[] {
    return (this.children.get(id) ?? []).map((c) => this.getTank(c));
  }

  tanksOfNation(nation: string): TankData[] {
    return [...this.tanks.values()].filter((t) => t.nation === nation);
  }

  starterTanks(): TankData[] {
    return [...this.tanks.values()].filter((t) => t.parents.length === 0 && !t.premium);
  }

  allTanks(): TankData[] {
    return [...this.tanks.values()];
  }

  /** Returns a list of human-readable problems; empty when content is consistent. */
  validate(): string[] {
    const errors: string[] = [];
    for (const t of this.tanks.values()) {
      if (!this.nations.has(t.nation)) errors.push(`${t.id}: unknown nation ${t.nation}`);
      if (t.tier < 1 || t.tier > 10) errors.push(`${t.id}: tier out of range`);
      for (const p of t.parents) {
        const parent = this.tanks.get(p);
        if (!parent) errors.push(`${t.id}: missing parent ${p}`);
        else if (t.tier - parent.tier > 1 || t.tier < parent.tier) errors.push(`${t.id}: bad tier step from ${p}`);
      }
      for (const slot of ['gun', 'turret', 'engine', 'suspension', 'radio'] as ModuleSlot[]) {
        if (t.modules[slot].length === 0) errors.push(`${t.id}: no ${slot} modules`);
      }
      for (const turret of t.modules.turret) {
        for (const g of turret.guns) if (!t.modules.gun.some((x) => x.id === g)) errors.push(`${t.id}: turret ${turret.id} references missing gun ${g}`);
      }
      for (const g of t.modules.gun) {
        if (g.ammo.length === 0) errors.push(`${t.id}: gun ${g.id} has no ammo`);
        if (g.reloadTime <= 0) errors.push(`${t.id}: gun ${g.id} bad reload`);
      }
      const stockLoad = this.loadOf(t, {
        gun: t.modules.gun[0].id, turret: t.modules.turret[0].id, engine: t.modules.engine[0].id,
        suspension: t.modules.suspension[0].id, radio: t.modules.radio[0].id,
      });
      if (stockLoad > t.modules.suspension[0].maxLoad + 1e-6) errors.push(`${t.id}: stock config overloads stock suspension`);
      const top = {
        gun: t.modules.gun.at(-1)!.id, turret: t.modules.turret.at(-1)!.id, engine: t.modules.engine.at(-1)!.id,
        suspension: t.modules.suspension.at(-1)!.id, radio: t.modules.radio.at(-1)!.id,
      };
      if (this.loadOf(t, top) > t.modules.suspension.at(-1)!.maxLoad + 1e-6) errors.push(`${t.id}: top config overloads top suspension`);
    }
    for (const n of this.nations.values()) {
      if (!this.starterTanks().some((t) => t.nation === n.id)) errors.push(`nation ${n.id} has no starter tank`);
    }
    return errors;
  }

  /** Total mass (t) for a given module configuration. */
  loadOf(t: TankData, cfg: Record<ModuleSlot, string>): number {
    let mass = t.hull.mass;
    for (const slot of Object.keys(cfg) as ModuleSlot[]) {
      const m = t.modules[slot].find((x) => x.id === cfg[slot]);
      if (m) mass += m.mass;
    }
    return mass;
  }
}

export const registry = new DataRegistry(
  NATIONS,
  buildTankRows().map((row) => buildTank(row, NATIONS.find((n) => n.id === row.nation)!)),
  MAPS,
  GAME_MODES,
);
