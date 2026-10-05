import { Random } from '../core/Random';
import type { NationId, TankClass, TankStyle } from './types';

type Weighted<T> = Array<[T, number]>;

interface NationDesign {
  turret: Weighted<TankStyle['turret']>;
  wheels: Weighted<TankStyle['wheels']>;
  muzzle: Weighted<TankStyle['muzzle']>;
  camo: Weighted<TankStyle['camo']>;
  bustle: number;
  skirts: number;
  sloped: number;
  sprocketFront: number;
  drums: number;
  jerrycans: number;
}

const DESIGNS: Record<NationId, NationDesign> = {
  ussr: {
    turret: [['cast', 5], ['wedge', 3], ['welded', 2]], wheels: [['large', 6], ['small', 2], ['bogie', 1]],
    muzzle: [['double', 4], ['single', 2], ['none', 2]], camo: [['solid', 4], ['blotch', 3], ['stripe', 1]],
    bustle: 0.15, skirts: 0.15, sloped: 0.65, sprocketFront: 0.1, drums: 0.7, jerrycans: 0.05,
  },
  germany: {
    turret: [['box', 6], ['welded', 3], ['wedge', 1]], wheels: [['interleaved', 5], ['small', 3], ['bogie', 1]],
    muzzle: [['double', 6], ['single', 2], ['none', 1]], camo: [['splinter', 3], ['dots', 3], ['blotch', 2], ['stripe', 1]],
    bustle: 0.6, skirts: 0.55, sloped: 0.25, sprocketFront: 0.85, drums: 0.05, jerrycans: 0.7,
  },
  usa: {
    turret: [['cast', 6], ['welded', 3], ['box', 1]], wheels: [['bogie', 5], ['small', 4], ['large', 1]],
    muzzle: [['single', 3], ['none', 3], ['double', 2]], camo: [['solid', 4], ['blotch', 3], ['stripe', 1]],
    bustle: 0.75, skirts: 0.2, sloped: 0.3, sprocketFront: 0.75, drums: 0.05, jerrycans: 0.5,
  },
  uk: {
    turret: [['box', 5], ['welded', 3], ['cast', 2]], wheels: [['large', 4], ['small', 4], ['bogie', 2]],
    muzzle: [['none', 4], ['single', 3], ['double', 1]], camo: [['stripe', 3], ['splinter', 2], ['solid', 2]],
    bustle: 0.7, skirts: 0.7, sloped: 0.2, sprocketFront: 0.2, drums: 0.15, jerrycans: 0.3,
  },
  france: {
    turret: [['cast', 4], ['wedge', 3], ['box', 2]], wheels: [['small', 5], ['bogie', 3], ['large', 1]],
    muzzle: [['double', 3], ['single', 3], ['none', 2]], camo: [['blotch', 4], ['splinter', 2], ['dots', 1]],
    bustle: 0.55, skirts: 0.5, sloped: 0.4, sprocketFront: 0.4, drums: 0.15, jerrycans: 0.35,
  },
  japan: {
    turret: [['welded', 5], ['cast', 2], ['box', 2]], wheels: [['bogie', 6], ['small', 3]],
    muzzle: [['none', 4], ['single', 3], ['double', 1]], camo: [['stripe', 3], ['blotch', 3], ['dots', 1]],
    bustle: 0.35, skirts: 0.15, sloped: 0.35, sprocketFront: 0.8, drums: 0.1, jerrycans: 0.15,
  },
};

function pick<T>(rng: Random, items: Weighted<T>): T {
  const total = items.reduce((s, [, w]) => s + w, 0);
  let r = rng.next() * total;
  for (const [v, w] of items) {
    r -= w;
    if (r <= 0) return v;
  }
  return items[items.length - 1][0];
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Deterministic per-vehicle design: nation design school + class + era, varied by the tank id. */
export function styleFor(id: string, nation: NationId, cls: TankClass, tier: number, length: number): TankStyle {
  const d = DESIGNS[nation] ?? DESIGNS.ussr;
  const rng = new Random(hash(id));
  const turreted = cls !== 'TD' && cls !== 'SPG';
  let wheels = pick(rng, d.wheels);
  // Early vehicles use leaf-spring bogies; interleaved road wheels are a heavy/medium late-war feature.
  if (tier <= 2 && rng.chance(0.6)) wheels = 'bogie';
  if (wheels === 'interleaved' && (cls === 'LT' || tier < 4)) wheels = 'small';
  const wheelCount = wheels === 'large' ? Math.max(4, Math.min(6, Math.round(length / 1.25)))
    : wheels === 'interleaved' ? Math.max(5, Math.round(length / 0.85))
      : wheels === 'bogie' ? Math.max(2, Math.min(4, Math.round(length / 1.9))) * 2
        : Math.max(5, Math.min(9, Math.round(length / 0.8)));
  const modern = tier >= 8;
  return {
    turret: pick(rng, d.turret),
    bustle: turreted && tier >= 3 && rng.chance(d.bustle),
    hullRear: rng.chance(d.sloped) ? 'sloped' : 'flat',
    wheels,
    wheelCount,
    returnRollers: wheels !== 'large' && wheels !== 'interleaved',
    sprocketFront: rng.chance(d.sprocketFront),
    skirts: tier >= 4 && rng.chance(d.skirts),
    muzzle: cls === 'SPG' && rng.chance(0.5) ? 'none' : tier <= 2 && rng.chance(0.7) ? 'none' : pick(rng, d.muzzle),
    evacuator: modern ? rng.chance(0.85) : tier >= 6 && rng.chance(0.3),
    thermalSleeve: tier >= 9 && rng.chance(0.6),
    camo: pick(rng, d.camo),
    fuelDrums: rng.chance(d.drums),
    spareTracks: rng.chance(0.55),
    jerrycans: rng.chance(d.jerrycans),
    smokeLaunchers: turreted && tier >= 7 && rng.chance(0.7),
    basket: turreted && tier >= 5 && rng.chance(0.5),
    engineDeck: rng.chance(0.8),
    hullMg: tier <= 7 && cls !== 'SPG' && rng.chance(0.6),
    seed: hash(id) % 100000,
  };
}
