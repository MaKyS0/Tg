// Data-driven definitions. Game systems consume these structures and never hardcode content.

export type NationId = string;
export type TankClass = 'LT' | 'MT' | 'HT' | 'TD' | 'SPG';
export type AmmoKind = 'AP' | 'APCR' | 'HE' | 'HEAT';
export type ModuleSlot = 'gun' | 'turret' | 'engine' | 'suspension' | 'radio';
export type CrewRole = 'commander' | 'gunner' | 'driver' | 'loader' | 'radioman';
export type SurfaceId = 'asphalt' | 'dirt' | 'sand' | 'mud' | 'snow' | 'stone' | 'grass' | 'water';
export type Difficulty = 'easy' | 'normal' | 'hard' | 'expert';

export interface NationFlavor {
  hullArmor: number;
  turretArmor: number;
  slope: number; // additive degrees to hull plate slope
  hp: number;
  alpha: number;
  penetration: number;
  reload: number;
  accuracy: number; // multiplier on dispersion (lower = better)
  aimTime: number;
  mobility: number;
  view: number;
  depression: number;
  shellVelocity: number;
  magazine?: { fromTier: number; classes: TankClass[]; size: number; interShot: number };
}

export interface NationData {
  id: NationId;
  name: string;
  short: string;
  colors: { base: string; dark: string; light: string; accent: string };
  flag: [string, string, string];
  flavor: NationFlavor;
  /** Unique names for the generated tech tree, indexed by line key then tier. */
  names: Record<string, string[]>;
  modulePrefix: { gun: string; turret: string; engine: string; suspension: string; radio: string };
  crewNames: string[];
}

export interface AmmoData {
  id: string;
  kind: AmmoKind;
  name: string;
  caliber: number; // mm
  penetration: number; // mm at muzzle velocity
  damage: number;
  velocity: number; // m/s
  mass: number; // kg
  dragK: number; // quadratic drag coefficient (1/m)
  gravityScale: number;
  normalization: number; // deg
  ricochetAngle: number; // deg, 90 = never
  explosionRadius: number; // m (HE splash)
  price: number;
  premium: boolean;
}

export interface GunModule {
  id: string;
  slot: 'gun';
  name: string;
  tier: number;
  caliber: number;
  ammo: AmmoData[];
  reloadTime: number; // seconds per shell (or per magazine if magazine)
  magazine: { size: number; interShot: number } | null;
  accuracy: number; // dispersion radius (m) at 100 m
  aimTime: number; // seconds for dispersion to settle
  elevation: number; // deg up
  depression: number; // deg down (positive)
  ammoCapacity: number;
  barrelLength: number; // m
  artillery: boolean;
  mass: number; // t
  price: number;
  researchXp: number;
}

export interface TurretArmor {
  front: number;
  side: number;
  rear: number;
  roof: number;
  mantlet: number;
}

export interface TurretShape {
  length: number;
  width: number;
  height: number;
  frontAngle: number; // deg, plan-view angling of cheeks
  slope: number; // 0..0.4 inward taper of walls
  offsetZ: number; // turret pivot relative to hull center
}

export interface TurretModule {
  id: string;
  slot: 'turret';
  name: string;
  tier: number;
  armor: TurretArmor;
  shape: TurretShape;
  traverseSpeed: number; // deg/s
  viewRange: number; // m
  hpBonus: number;
  guns: string[]; // compatible gun ids
  mass: number;
  price: number;
  researchXp: number;
}

export interface EngineModule {
  id: string;
  slot: 'engine';
  name: string;
  tier: number;
  power: number; // hp
  fireChance: number; // 0..1
  mass: number;
  price: number;
  researchXp: number;
}

export interface SuspensionModule {
  id: string;
  slot: 'suspension';
  name: string;
  tier: number;
  maxLoad: number; // t
  traverseSpeed: number; // deg/s
  resistance: { hard: number; medium: number; soft: number };
  dispersionMove: number;
  dispersionTraverse: number;
  mass: number;
  price: number;
  researchXp: number;
}

export interface RadioModule {
  id: string;
  slot: 'radio';
  name: string;
  tier: number;
  range: number; // m
  mass: number;
  price: number;
  researchXp: number;
}

export type ModuleData = GunModule | TurretModule | EngineModule | SuspensionModule | RadioModule;

export interface ModuleSet {
  gun: GunModule[];
  turret: TurretModule[];
  engine: EngineModule[];
  suspension: SuspensionModule[];
  radio: RadioModule[];
}

export interface HullArmor {
  upperFront: number;
  lowerFront: number;
  side: number;
  rear: number;
  roof: number;
  bottom: number;
}

export interface HullData {
  mass: number; // t, without modules
  hp: number;
  armor: HullArmor;
  angles: { upperFront: number; lowerFront: number }; // deg from vertical
  dims: { length: number; width: number; height: number; clearance: number; noseHeight: number };
  trackWidth: number;
  trackArmor: number;
  screens: number; // mm of spaced side skirts, 0 = none
  transmission: { name: string; gears: number; efficiency: number };
  maxSpeed: number; // km/h
  reverseSpeed: number; // km/h
}

export interface CamoData {
  stationary: number;
  moving: number;
  firingPenalty: number; // fraction of camo lost when firing
}

export interface TankData {
  id: string;
  name: string;
  nation: NationId;
  cls: TankClass;
  tier: number;
  premium: boolean;
  description: string;
  hull: HullData;
  hasTurret: boolean;
  /** Horizontal gun traverse limit for casemate vehicles (deg each side). 180 = full rotation. */
  traverseLimit: number;
  modules: ModuleSet;
  crew: CrewRole[];
  camo: CamoData;
  price: number;
  researchXp: number;
  parents: string[];
  /** Grid coordinates for the tech tree UI. */
  treeRow: number;
}

export interface SurfaceData {
  id: SurfaceId;
  name: string;
  grip: number; // lateral/longitudinal friction coefficient
  resistanceClass: 'hard' | 'medium' | 'soft';
  speedFactor: number;
  color: [number, number, number];
  dust: [number, number, number] | null;
  trackMarks: boolean;
}

export interface CrewPerk {
  id: string;
  name: string;
  description: string;
  role: CrewRole | 'any';
}

export type GameModeId = 'standard' | 'capture' | 'encounter' | 'assault' | string;

export interface GameModeData {
  id: GameModeId;
  name: string;
  description: string;
  bases: 'both' | 'neutral' | 'defender';
  winByDestroy: boolean;
  winByCapture: boolean;
  timeLimit: number;
  timeoutResult: 'draw' | 'defenders';
  captureRate: number; // points per tank per second
  maxCapturers: number;
  captureResetOnDamage: boolean;
}

// --- Maps -----------------------------------------------------------------

export type Vec2 = [number, number];

export type MapFeature =
  | { type: 'hill'; at: Vec2; radius: number; height: number }
  | { type: 'ridge'; points: Vec2[]; width: number; height: number; rough?: number }
  | { type: 'mountains'; at: Vec2; radius: number; height: number }
  | { type: 'plateau'; at: Vec2; radius: number; height: number }
  | { type: 'valley'; points: Vec2[]; width: number; depth: number }
  | { type: 'dunes'; at: Vec2; radius: number; height: number; direction: number }
  | { type: 'river'; points: Vec2[]; width: number; depth: number }
  | { type: 'lake'; at: Vec2; radius: number; depth: number; frozen?: boolean }
  | { type: 'sea'; side: 'north' | 'south' | 'east' | 'west'; distance: number }
  | { type: 'road'; points: Vec2[]; width: number; surface: 'asphalt' | 'dirt' }
  | { type: 'rail'; points: Vec2[] }
  | { type: 'town'; at: Vec2; size: Vec2; block: number; style: BuildingStyle; ruined?: number }
  | { type: 'industrial'; at: Vec2; size: Vec2 }
  | { type: 'village'; at: Vec2; radius: number; houses: number; style: BuildingStyle }
  | { type: 'forest'; at: Vec2; radius: number; density: number; kind: TreeKind }
  | { type: 'bushes'; at: Vec2; radius: number; count: number }
  | { type: 'rocks'; at: Vec2; radius: number; count: number; size: number }
  | { type: 'field'; at: Vec2; size: Vec2; surface: SurfaceId; rotation?: number }
  | { type: 'ruins'; at: Vec2; radius: number; count: number }
  | { type: 'barricades'; at: Vec2; radius: number; count: number }
  | { type: 'cars'; at: Vec2; radius: number; count: number }
  | { type: 'crates'; at: Vec2; radius: number; count: number }
  | { type: 'lighthouse'; at: Vec2 };

export type BuildingStyle = 'stone' | 'wood' | 'adobe' | 'concrete';
export type TreeKind = 'pine' | 'broadleaf' | 'palm' | 'birch' | 'dead';

export interface BiomeData {
  ground: SurfaceId;
  secondary: SurfaceId;
  steep: SurfaceId;
  noiseAmp: number;
  noiseScale: number;
  sky: { top: string; horizon: string; fog: string; fogDensity: number };
  sun: { elevation: number; azimuth: number; color: string; intensity: number };
  ambient: { sky: string; ground: string; intensity: number };
  treeKinds: TreeKind[];
  ambience: 'birds' | 'wind' | 'waves' | 'industry' | 'city';
  waterColor: string;
}

export interface MapData {
  id: string;
  name: string;
  description: string;
  size: number; // meters (square)
  seed: number;
  biome: BiomeData;
  waterLevel: number;
  features: MapFeature[];
  spawns: { a: Vec2; b: Vec2 };
  bases: { a: Vec2; b: Vec2; neutral: Vec2 };
  /** Tactical lanes from team A's side to team B's side; reversed for team B. */
  lanes: { heavy: Vec2[]; light: Vec2[]; center: Vec2[] };
  sniperSpots: { a: Vec2[]; b: Vec2[] };
  scoutSpots: { a: Vec2[]; b: Vec2[] };
}
