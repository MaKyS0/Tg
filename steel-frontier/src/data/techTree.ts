import type { NationId, TankClass } from './types';
import { NATIONS } from './nations';

/** Per-tank adjustments on top of class/tier/nation baselines. All fields are multipliers unless noted. */
export interface TankTweak {
  armor?: number;
  turretArmor?: number;
  hp?: number;
  speed?: number;
  alpha?: number;
  pen?: number;
  reload?: number;
  accuracy?: number;
  view?: number;
  camo?: number;
  size?: number;
  hasTurret?: boolean;
  screens?: boolean;
  magazine?: { size: number; interShot: number };
  premiumShell?: 'APCR' | 'HEAT';
}

export interface TankRow {
  id: string;
  name: string;
  nation: NationId;
  cls: TankClass;
  tier: number;
  parents: string[];
  treeRow: number;
  premium?: boolean;
  tweak?: TankTweak;
  description?: string;
}

interface LineTemplate {
  key: string;
  row: number;
  steps: Array<[number, TankClass]>;
  parent: { line: string; tier: number } | null;
}

const range = (from: number, to: number, cls: TankClass): Array<[number, TankClass]> =>
  Array.from({ length: to - from + 1 }, (_, i) => [from + i, cls] as [number, TankClass]);

export const LINE_TEMPLATES: LineTemplate[] = [
  { key: 'light', row: 0, steps: range(4, 8, 'LT'), parent: { line: 'main', tier: 3 } },
  { key: 'main', row: 1, steps: [...range(1, 3, 'LT'), ...range(4, 10, 'MT')], parent: null },
  { key: 'heavy', row: 2, steps: range(5, 10, 'HT'), parent: { line: 'main', tier: 4 } },
  { key: 'td', row: 3, steps: range(4, 10, 'TD'), parent: { line: 'main', tier: 3 } },
  { key: 'spg', row: 4, steps: range(4, 7, 'SPG'), parent: { line: 'main', tier: 3 } },
];

/** Nation-specific design philosophies applied per line (and optionally a single tier: "line:tier"). */
export const NATION_LINE_TWEAKS: Record<NationId, Record<string, TankTweak>> = {
  ussr: {
    heavy: { armor: 1.06, turretArmor: 1.1, accuracy: 1.05, premiumShell: 'APCR' },
    td: { alpha: 1.08, armor: 1.05 },
    'td:10': { armor: 1.25, hp: 1.05 },
    light: { speed: 1.05 },
  },
  germany: {
    main: { screens: true },
    heavy: { screens: true, armor: 1.05, accuracy: 0.95 },
    td: { armor: 1.12, screens: true, pen: 1.04 },
    spg: { reload: 0.95 },
  },
  usa: {
    td: { hasTurret: true, armor: 0.85, premiumShell: 'HEAT', camo: 0.9 },
    heavy: { turretArmor: 1.15, premiumShell: 'HEAT', hp: 1.04 },
    main: { premiumShell: 'HEAT' },
  },
  uk: {
    heavy: { armor: 1.12, speed: 0.92, reload: 0.95 },
    td: { armor: 1.25, speed: 0.82, hasTurret: true, camo: 0.85 },
    'td:10': { armor: 1.35, hp: 1.1 },
    light: { premiumShell: 'APCR' },
  },
  france: {
    heavy: { armor: 0.95, speed: 1.08, premiumShell: 'HEAT' },
    light: { speed: 1.12, view: 1.05 },
    td: { premiumShell: 'HEAT', speed: 1.1, armor: 0.85 },
  },
  japan: {
    heavy: { hp: 1.08, armor: 1.08, alpha: 1.08, speed: 0.9, premiumShell: 'HEAT' },
    td: { alpha: 1.1, camo: 1.05 },
    main: { premiumShell: 'HEAT' },
  },
};

/** Standalone vehicles outside the generated lines (premium tanks bought directly with credits). */
export const EXTRA_TANKS: TankRow[] = [
  {
    id: 'ussr_prem8', name: 'СТ-8П «Гарпун»', nation: 'ussr', cls: 'MT', tier: 8, parents: [], treeRow: 5, premium: true,
    tweak: { armor: 1.1, alpha: 1.05 }, description: 'Премиум-машина: повышенный доход кредитов.',
  },
  {
    id: 'germany_prem7', name: 'SK-7P «Wächter»', nation: 'germany', cls: 'HT', tier: 7, parents: [], treeRow: 5, premium: true,
    tweak: { armor: 1.15, screens: true }, description: 'Премиум-машина: повышенный доход кредитов.',
  },
  {
    id: 'usa_prem6', name: 'XT6P «Ironhide»', nation: 'usa', cls: 'TD', tier: 6, parents: [], treeRow: 5, premium: true,
    tweak: { hasTurret: true, premiumShell: 'HEAT' }, description: 'Премиум-машина: повышенный доход кредитов.',
  },
];

export function buildTankRows(): TankRow[] {
  const rows: TankRow[] = [];
  for (const nation of NATIONS) {
    const tweaks = NATION_LINE_TWEAKS[nation.id] ?? {};
    for (const line of LINE_TEMPLATES) {
      const names = nation.names[line.key];
      if (!names || names.length !== line.steps.length) {
        throw new Error(`Nation ${nation.id} has ${names?.length ?? 0} names for line ${line.key}, expected ${line.steps.length}`);
      }
      line.steps.forEach(([tier, cls], i) => {
        const id = `${nation.id}_${line.key}${tier}`;
        let parents: string[];
        if (i > 0) parents = [`${nation.id}_${line.key}${line.steps[i - 1][0]}`];
        else if (line.parent) parents = [`${nation.id}_${line.parent.line}${line.parent.tier}`];
        else parents = [];
        rows.push({
          id,
          name: names[i],
          nation: nation.id,
          cls,
          tier,
          parents,
          treeRow: line.row,
          tweak: { ...tweaks[line.key], ...tweaks[`${line.key}:${tier}`] },
        });
      });
    }
  }
  return [...rows, ...EXTRA_TANKS];
}
