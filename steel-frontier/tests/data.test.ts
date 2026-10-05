import { describe, expect, it } from 'vitest';
import { registry } from '../src/data/registry';
import { NATIONS } from '../src/data/nations';
import { MAPS } from '../src/data/maps';
import { GAME_MODES } from '../src/data/gameModes';

describe('content data', () => {
  it('passes registry validation', () => {
    expect(registry.validate()).toEqual([]);
  });

  it('has at least 6 nations, 5 classes and dozens of tanks', () => {
    expect(NATIONS.length).toBeGreaterThanOrEqual(6);
    const classes = new Set(registry.allTanks().map((t) => t.cls));
    expect([...classes].sort()).toEqual(['HT', 'LT', 'MT', 'SPG', 'TD']);
    expect(registry.allTanks().length).toBeGreaterThan(100);
  });

  it('every nation has a tier I to X line', () => {
    for (const n of NATIONS) {
      const tiers = new Set(registry.tanksOfNation(n.id).map((t) => t.tier));
      for (let t = 1; t <= 10; t++) expect(tiers.has(t)).toBe(true);
    }
  });

  it('tanks have unique names and all ammo kinds exist', () => {
    const names = registry.allTanks().map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
    const kinds = new Set(registry.allTanks().flatMap((t) => t.modules.gun.flatMap((g) => g.ammo.map((a) => a.kind))));
    expect([...kinds].sort()).toEqual(['AP', 'APCR', 'HE', 'HEAT']);
  });

  it('class roles produce expected stat ordering', () => {
    const t8 = (cls: string) => registry.allTanks().filter((t) => t.tier === 8 && t.cls === cls && !t.premium);
    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
    expect(avg(t8('HT').map((t) => t.hull.hp))).toBeGreaterThan(avg(t8('MT').map((t) => t.hull.hp)));
    expect(avg(t8('LT').map((t) => t.hull.maxSpeed))).toBeGreaterThan(avg(t8('HT').map((t) => t.hull.maxSpeed)));
    expect(avg(t8('HT').map((t) => t.hull.armor.upperFront))).toBeGreaterThan(avg(t8('LT').map((t) => t.hull.armor.upperFront)));
    expect(avg(t8('TD').map((t) => t.modules.gun[1].ammo[0].damage))).toBeGreaterThan(avg(t8('MT').map((t) => t.modules.gun[1].ammo[0].damage)));
  });

  it('has 8+ maps and 4+ modes with consistent data', () => {
    expect(MAPS.length).toBeGreaterThanOrEqual(8);
    expect(GAME_MODES.length).toBeGreaterThanOrEqual(4);
    for (const m of MAPS) {
      const h = m.size / 2;
      for (const p of [m.spawns.a, m.spawns.b, m.bases.a, m.bases.b, m.bases.neutral]) {
        expect(Math.abs(p[0])).toBeLessThan(h);
        expect(Math.abs(p[1])).toBeLessThan(h);
      }
    }
  });
});
