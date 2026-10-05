import { describe, expect, it } from 'vitest';
import { createBattle } from '../src/sim/Battle';
import { MapBuilder } from '../src/sim/MapBuilder';
import { registry } from '../src/data/registry';
import { MAPS } from '../src/data/maps';

describe('headless battle simulation', () => {
  it('builds every map with terrain, props and walkable spawns', () => {
    for (const m of MAPS) {
      const t0 = performance.now();
      const map = new MapBuilder(m).build();
      const ms = performance.now() - t0;
      expect(map.props.length).toBeGreaterThan(100);
      expect(map.statics.colliders.length).toBeGreaterThan(50);
      for (const h of map.terrain.heights) expect(Number.isFinite(h)).toBe(true);
      console.log(`map ${m.id}: ${map.props.length} props, ${map.statics.colliders.length} colliders, ${Math.round(ms)} ms`);
    }
  });

  it('bots fight a full battle that ends with a result', () => {
    const battle = createBattle({ mapId: 'steppe', modeId: 'standard', player: null, teamSize: 10, difficulty: 'hard', seed: 42, countdown: 2 });
    const w = battle.world;
    let shots = 0;
    let hits = 0;
    w.events.on('shot', () => shots++);
    w.events.on('hit', () => hits++);
    const start = w.tanks.map((t) => t.position.clone());
    const t0 = performance.now();
    let steps = 0;
    while (!w.mode.outcome && w.battleTime < 600) {
      w.step();
      steps++;
    }
    const ms = performance.now() - t0;
    const moved = w.tanks.filter((t, i) => t.position.distanceTo(start[i]) > 30).length;
    const dead = w.tanks.filter((t) => !t.alive).length;
    for (const t of w.tanks) {
      expect(Number.isFinite(t.position.x)).toBe(true);
      expect(Number.isFinite(t.position.y)).toBe(true);
    }
    console.log(`battle: ${(steps / 60).toFixed(0)} s simulated in ${Math.round(ms)} ms, shots ${shots}, hits ${hits}, dead ${dead}, moved ${moved}, outcome ${JSON.stringify(w.mode.outcome)}`);
    expect(moved).toBeGreaterThan(w.tanks.length * 0.7);
    expect(shots).toBeGreaterThan(20);
    expect(hits).toBeGreaterThan(5);
    expect(dead).toBeGreaterThan(2);
    expect(w.mode.outcome).not.toBeNull();
  });

  it('every game mode runs on every map without errors', () => {
    for (const mode of registry.modes.keys()) {
      const battle = createBattle({ mapId: MAPS[[...registry.modes.keys()].indexOf(mode) % MAPS.length].id, modeId: mode, player: null, teamSize: 5, difficulty: 'normal', seed: 7, countdown: 1 });
      for (let i = 0; i < 60 * 40; i++) battle.world.step();
      expect(battle.world.time).toBeGreaterThan(39);
    }
  });
});
