import { describe, expect, it } from 'vitest';
import { MapBuilder } from '../src/sim/MapBuilder';
import { MAPS } from '../src/data/maps';
import { World } from '../src/sim/World';
import { getGameMode } from '../src/data/gameModes';
import { registry } from '../src/data/registry';
import { Tank, stockLoadout } from '../src/sim/Tank';
import { SURFACE_INDEX } from '../src/data/surfaces';
import type { MapData } from '../src/data/types';

const flatMap: MapData = {
  ...MAPS[0], id: 'flat-test', features: [], biome: { ...MAPS[0].biome, noiseAmp: 0 }, size: 600,
  spawns: { a: [0, -250], b: [0, 250] }, bases: { a: [0, -220], b: [0, 220], neutral: [0, 0] },
};

function tank(id: string, team: number): Tank {
  const d = registry.getTank(id);
  return new Tank(d, team, id, stockLoadout(d, 100, true));
}

describe('navigation', () => {
  it('finds paths between both spawns on every map', () => {
    for (const m of MAPS) {
      const map = new MapBuilder(m).build();
      const w = new World(map, getGameMode('standard'), 1);
      const path = w.nav.findPath(m.spawns.a[0], m.spawns.a[1], m.spawns.b[0], m.spawns.b[1]);
      expect(path, m.id).not.toBeNull();
      const end = path![path!.length - 1];
      expect(Math.hypot(end[0] - m.spawns.b[0], end[1] - m.spawns.b[1]), m.id).toBeLessThan(40);
      for (const p of path!) expect(w.nav.isWalkable(p[0], p[1])).toBe(true);
    }
  });
});

describe('detection', () => {
  it('spots in the open, not through a wall, and bushes add camouflage', () => {
    const map = new MapBuilder(flatMap).build();
    const w = new World(map, getGameMode('standard'), 2, 0);
    const obs = w.addTank(tank('ussr_main6', 0), 0, -150, 0);
    const tgt = w.addTank(tank('germany_heavy7', 1), 0, 100, Math.PI);
    w.step();
    expect(w.detection.canSee(obs, tgt)).toBe(true);
    // A tall wall between them blocks line of sight.
    map.statics.addCollider({ shape: 'box', x: 0, z: 0, hx: 20, hz: 1, rot: 0, r: 20, y0: 0, y1: 60, blocksMove: true, blocksShell: true, blocksView: true, destructible: null, propId: -1 });
    expect(w.detection.canSee(obs, tgt)).toBe(false);
    const plain = w.detection.detectionDistance(obs, tgt, 0);
    map.statics.addFoliage({ x: tgt.position.x, z: tgt.position.z, r: 4, y0: 0, y1: 50, camo: 0.42 });
    expect(w.detection.detectionDistance(obs, tgt, 0)).toBeLessThan(plain);
    // Firing burns camouflage.
    tgt.lastShotTime = w.time;
    expect(w.detection.detectionDistance(obs, tgt, 0)).toBeGreaterThan(w.detection.detectionDistance(obs, tgt, 0.3));
  });
});

describe('physics', () => {
  it('lighter tanks accelerate faster; soft ground slows tanks', () => {
    const map = new MapBuilder(flatMap).build();
    map.terrain.surface.fill(SURFACE_INDEX.asphalt);
    const w = new World(map, getGameMode('standard'), 3, 0);
    const lt = w.addTank(tank('usa_light6', 0), -40, -100, 0);
    const ht = w.addTank(tank('usa_heavy6', 0), 40, -100, 0);
    w.addTank(tank('usa_heavy6', 1), 0, 250, 0); // keeps the battle running
    lt.input.throttle = 1;
    ht.input.throttle = 1;
    for (let i = 0; i < 60 * 6; i++) w.step();
    expect(lt.speedLong).toBeGreaterThan(ht.speedLong);
    expect(lt.position.z).toBeGreaterThan(ht.position.z);
    const asphaltSpeed = ht.speedLong;
    const map2 = new MapBuilder(flatMap).build();
    map2.terrain.surface.fill(SURFACE_INDEX.mud);
    const w2 = new World(map2, getGameMode('standard'), 3, 0);
    const ht2 = w2.addTank(tank('usa_heavy6', 0), 40, -100, 0);
    w2.addTank(tank('usa_heavy6', 1), 0, 250, 0);
    ht2.input.throttle = 1;
    for (let i = 0; i < 60 * 6; i++) w2.step();
    expect(ht2.speedLong).toBeLessThan(asphaltSpeed);
  });

  it('destroyed tracks immobilise the tank and engine damage halves power', () => {
    const map = new MapBuilder(flatMap).build();
    const w = new World(map, getGameMode('standard'), 4, 0);
    const t = w.addTank(tank('ussr_main5', 0), 0, -100, 0);
    w.addTank(tank('usa_heavy6', 1), 0, 250, 0);
    const p0 = t.stats.power;
    w.damage.damageModule(t, 'engine', t.modules.engine.maxHp * 0.6);
    expect(t.stats.power).toBeCloseTo(p0 * 0.5, 0);
    w.damage.damageModule(t, 'tracks', 1e6);
    expect(t.stats.canMove).toBe(false);
    t.input.throttle = 1;
    const start = t.position.clone();
    for (let i = 0; i < 120; i++) w.step();
    expect(t.position.distanceTo(start)).toBeLessThan(0.5);
  });
});

describe('game mode', () => {
  it('capture progresses with capturers and resets when a capturer is damaged', () => {
    const map = new MapBuilder(flatMap).build();
    const w = new World(map, getGameMode('standard'), 5, 0);
    const base = w.mode.bases.find((b) => b.owner === 1)!;
    const capper = w.addTank(tank('ussr_main5', 0), base.x, base.z, 0);
    const defender = w.addTank(tank('germany_main5', 1), base.x + 200, base.z + 100, 0);
    for (let i = 0; i < 60 * 10; i++) w.step();
    expect(base.points[0]).toBeGreaterThan(8);
    capper.lastDamagedBy = defender.id;
    w.damage.dealDamage(capper, defender, 10);
    expect(base.points[0]).toBeLessThan(1);
    expect(defender.battle.defensePoints).toBeGreaterThan(5);
  });
});
