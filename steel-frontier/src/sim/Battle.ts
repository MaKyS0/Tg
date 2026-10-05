import { Random } from '../core/Random';
import { registry } from '../data/registry';
import type { Difficulty, TankClass, TankData, Vec2 } from '../data/types';
import { AIController } from './ai/AIController';
import { DIFFICULTIES } from './ai/AIDifficulty';
import { TeamBrain } from './ai/TeamBrain';
import { MapBuilder, type MapInstance } from './MapBuilder';
import { Tank, stockLoadout, type TankLoadout } from './Tank';
import { World } from './World';

export interface BattleSetup {
  mapId: string;
  modeId: string;
  player: { tankId: string; loadout: TankLoadout; callsign: string } | null;
  teamSize: number;
  difficulty: Difficulty;
  seed: number;
  countdown?: number;
}

export interface Battle {
  world: World;
  player: Tank | null;
  ais: AIController[];
  brains: TeamBrain[];
  setup: BattleSetup;
}

const CALLSIGNS = ['Ястреб', 'Беркут', 'Гром', 'Тайфун', 'Кречет', 'Сапсан', 'Волк', 'Медведь', 'Барс', 'Вепрь', 'Филин', 'Лис',
  'Ворон', 'Тур', 'Сыч', 'Кобра', 'Рысь', 'Орёл', 'Сокол', 'Мираж', 'Шквал', 'Буран', 'Зенит', 'Каскад', 'Пламя', 'Вега', 'Гранит',
  'Сигма', 'Рубин', 'Аргон'];

/** Class/tier slots for one team. Mirrored for the enemy so matches stay balanced. */
export function buildComposition(teamSize: number, playerTier: number, rng: Random): Array<{ cls: TankClass; tier: number }> {
  const spg = playerTier >= 3 ? Math.max(0, Math.round(teamSize * 0.1)) : 0;
  const td = Math.round(teamSize * 0.2);
  const ht = playerTier >= 4 ? Math.round(teamSize * 0.26) : 0;
  const lt = Math.max(1, Math.round(teamSize * 0.14));
  const mt = Math.max(0, teamSize - spg - td - ht - lt);
  const slots: Array<{ cls: TankClass; tier: number }> = [];
  const push = (cls: TankClass, n: number) => {
    for (let i = 0; i < n; i++) {
      const spread = rng.next();
      const tier = Math.max(1, Math.min(10, playerTier + (spread < 0.25 ? -1 : spread > 0.75 ? 1 : 0)));
      slots.push({ cls, tier });
    }
  };
  push('SPG', spg);
  push('TD', td);
  push('HT', ht);
  push('LT', lt);
  push('MT', mt);
  return slots.slice(0, teamSize);
}

/** Picks a researchable tank matching a slot, falling back to the nearest available class/tier. */
export function pickTank(cls: TankClass, tier: number, rng: Random): TankData {
  const all = registry.allTanks().filter((t) => !t.premium);
  // Tier fairness first: the requested class within ±1 tier, otherwise any class at that tier band.
  for (const spread of [0, 1]) {
    const pool = all.filter((t) => t.cls === cls && Math.abs(t.tier - tier) <= spread);
    if (pool.length) return rng.pick(pool);
  }
  for (let spread = 0; spread <= 3; spread++) {
    const pool = all.filter((t) => Math.abs(t.tier - tier) <= spread && (t.cls !== 'SPG' || cls === 'SPG'));
    if (pool.length) return rng.pick(pool);
  }
  return rng.pick(all);
}

export function spawnPoints(world: World, center: Vec2, facing: Vec2, count: number): Array<{ x: number; z: number; yaw: number }> {
  const yaw = Math.atan2(facing[0] - center[0], facing[1] - center[1]);
  const fx = Math.sin(yaw);
  const fz = Math.cos(yaw);
  const rx = -Math.cos(yaw);
  const rz = Math.sin(yaw);
  const perRow = 5;
  const rows = Math.ceil(count / perRow);
  const out: Array<{ x: number; z: number; yaw: number }> = [];
  for (let i = 0; i < count; i++) {
    // Rows are centred on the spawn point so big teams never spill onto the map rim.
    const row = Math.floor(i / perRow) - (rows - 1) / 2;
    const col = (i % perRow) - (perRow - 1) / 2;
    let x = center[0] + rx * col * 15 - fx * row * 14;
    let z = center[1] + rz * col * 15 - fz * row * 14;
    const w = world.nav.nearestWalkable(x, z, 10);
    if (w) [x, z] = w;
    out.push({ x, z, yaw });
  }
  return out;
}

export function createBattle(setup: BattleSetup, prebuiltMap?: MapInstance): Battle {
  const mapData = registry.getMap(setup.mapId);
  const map = prebuiltMap ?? new MapBuilder(mapData).build();
  const world = new World(map, registry.getMode(setup.modeId), setup.seed, setup.countdown ?? 5);
  const rng = new Random(setup.seed ^ 0xa5a5a5);
  const difficulty = DIFFICULTIES[setup.difficulty];
  const brains = [new TeamBrain(world, 0), new TeamBrain(world, 1)];
  const playerData = setup.player ? registry.getTank(setup.player.tankId) : null;
  const tier = playerData?.tier ?? 5;
  const composition = buildComposition(setup.teamSize, tier, rng);
  const topChance = { easy: 0.3, normal: 0.6, hard: 0.9, expert: 1 }[setup.difficulty];
  const crewSkill = { easy: 55, normal: 75, hard: 90, expert: 100 }[setup.difficulty];
  const callsigns = rng.shuffle([...CALLSIGNS]);
  let callsignIdx = 0;

  const ais: AIController[] = [];
  let player: Tank | null = null;
  for (const team of [0, 1]) {
    const slots = composition.map((s) => ({ ...s }));
    if (team === 0 && playerData) {
      let idx = slots.findIndex((s) => s.cls === playerData.cls);
      if (idx < 0) idx = slots.length - 1;
      slots.splice(idx, 1);
    }
    const spawn = team === 0 ? mapData.spawns.a : mapData.spawns.b;
    const enemySpawn = team === 0 ? mapData.spawns.b : mapData.spawns.a;
    const points = spawnPoints(world, spawn, enemySpawn, slots.length + (team === 0 && playerData ? 1 : 0));
    let pi = 0;
    if (team === 0 && playerData && setup.player) {
      const p = points[pi++];
      player = new Tank(playerData, 0, setup.player.callsign, setup.player.loadout);
      player.isPlayer = true;
      world.addTank(player, p.x, p.z, p.yaw);
    }
    for (const slot of slots) {
      const data = pickTank(slot.cls, slot.tier, rng);
      const loadout = stockLoadout(data, crewSkill, rng.chance(topChance));
      const name = `${callsigns[callsignIdx++ % callsigns.length]}-${rng.int(10, 99)}`;
      const tank = new Tank(data, team, name, loadout);
      const p = points[pi++];
      world.addTank(tank, p.x, p.z, p.yaw);
      const ai = new AIController(tank, world, brains[team], difficulty);
      ais.push(ai);
      world.addController(ai);
    }
  }
  // Team brains refresh shared knowledge before controllers think.
  world.preStep.push(() => brains.forEach((b) => b.update()));
  return { world, player, ais, brains, setup };
}
