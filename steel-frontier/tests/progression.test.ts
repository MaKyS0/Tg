import { describe, expect, it } from 'vitest';
import { ProgressionSystem } from '../src/game/ProgressionSystem';
import { MemoryStorage, SaveSystem } from '../src/game/SaveSystem';
import { registry } from '../src/data/registry';

describe('progression', () => {
  it('starts with tier I tanks of every nation', () => {
    const p = new ProgressionSystem(ProgressionSystem.newProfile());
    expect(p.ownedTanks().length).toBe(6);
    expect(p.ownedTanks().every((t) => t.tier === 1)).toBe(true);
  });

  it('research → buy → modules → sell flow', () => {
    const p = new ProgressionSystem(ProgressionSystem.newProfile());
    const next = registry.childrenOf('ussr_main1')[0];
    expect(p.tankState(next.id)).toBe('researchable');
    expect(p.research(next.id).ok).toBe(false);
    p.progress('ussr_main1').xp = next.researchXp + 100;
    expect(p.research(next.id).ok).toBe(true);
    expect(p.progress('ussr_main1').xp).toBe(100);
    expect(p.tankState(next.id)).toBe('researched');
    p.data.credits = next.price + 100000;
    expect(p.buy(next.id).ok).toBe(true);
    expect(p.isOwned(next.id)).toBe(true);

    // Top gun needs the top turret first.
    const t = registry.getTank(next.id);
    const topGun = t.modules.gun[1];
    const topTurret = t.modules.turret.at(-1)!;
    const prog = p.progress(next.id);
    prog.xp = 100000;
    expect(p.researchModule(next.id, topGun.id).ok).toBe(true);
    if (topTurret.id !== t.modules.turret[0].id) {
      const r = p.buyAndEquipModule(next.id, topGun.id);
      expect(r.ok).toBe(false);
      expect(p.researchModule(next.id, topTurret.id).ok).toBe(true);
      // Stock suspension cannot carry the top configuration.
      p.researchModule(next.id, t.modules.suspension[1].id);
      p.buyAndEquipModule(next.id, t.modules.suspension[1].id);
      expect(p.buyAndEquipModule(next.id, topTurret.id).ok).toBe(true);
    }
    expect(p.buyAndEquipModule(next.id, topGun.id).ok).toBe(true);
    expect(prog.equipped.gun).toBe(topGun.id);
    const ammoTotal = Object.values(prog.ammo).reduce((a, b) => a + b, 0);
    expect(ammoTotal).toBe(topGun.ammoCapacity);

    const credits = p.data.credits;
    expect(p.sell(next.id).ok).toBe(true);
    expect(p.data.credits).toBeGreaterThan(credits);
    expect(p.isOwned(next.id)).toBe(false);
    expect(p.isResearched(next.id)).toBe(true);
  });

  it('crew gains skill and perk points', () => {
    const p = new ProgressionSystem(ProgressionSystem.newProfile());
    const crew = p.progress('ussr_main1').crew;
    p.addCrewXp(crew, 5_000_000);
    expect(crew.skill).toBe(100);
    expect(crew.perkPoints).toBeGreaterThan(0);
    expect(p.learnPerk('ussr_main1', 'camo').ok).toBe(true);
  });
});

describe('save system', () => {
  it('round-trips and recovers from corruption via backup', () => {
    const storage = new MemoryStorage();
    const saves = new SaveSystem(storage);
    const data = ProgressionSystem.newProfile();
    data.credits = 12345;
    saves.save(data);
    data.credits = 999;
    saves.save(data);
    expect(saves.load(ProgressionSystem.newProfile).data.credits).toBe(999);
    storage.set('steel-frontier.save', '{"broken": tru');
    const loaded = saves.load(ProgressionSystem.newProfile);
    expect(loaded.source).toBe('backup');
    expect(loaded.data.credits).toBe(12345);
  });

  it('rejects tampered data and fills missing fields', () => {
    const storage = new MemoryStorage();
    const saves = new SaveSystem(storage);
    const data = ProgressionSystem.newProfile();
    const enc = JSON.parse(saves.encode(data));
    enc.data.credits = 99999999;
    expect(saves.decode(JSON.stringify(enc))).toBeNull();
    const partial = { ...data } as Record<string, unknown>;
    delete partial.stats;
    const env = saves.encode(partial as never);
    storage.set('steel-frontier.save', env);
    const loaded = saves.load(ProgressionSystem.newProfile);
    expect(loaded.data.stats.battles).toBe(0);
  });

  it('export/import string', () => {
    const saves = new SaveSystem(new MemoryStorage());
    const data = ProgressionSystem.newProfile();
    data.freeXp = 777;
    const str = saves.exportString(data);
    expect(saves.importString(str)?.freeXp).toBe(777);
    expect(saves.importString('garbage')).toBeNull();
  });
});
