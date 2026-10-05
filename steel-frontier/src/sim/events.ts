import type { Vector3 } from 'three';
import type { AmmoData, CrewRole } from '../data/types';
import type { HitResult } from './ArmorSystem';
import type { Collider } from './StaticWorld';
import type { ModuleId, ModuleStatus, Tank } from './Tank';

export interface WorldEvents {
  shot: { tank: Tank; ammo: AmmoData; pos: Vector3; dir: Vector3 };
  hit: { target: Tank; attacker: Tank | null; result: HitResult; ammo: AmmoData };
  impact: { pos: Vector3; normal: Vector3; kind: 'ground' | 'static' | 'water'; ammo: AmmoData; surface: string };
  ricochet: { pos: Vector3; dir: Vector3 };
  moduleChanged: { tank: Tank; module: ModuleId; status: ModuleStatus; repaired: boolean };
  crewWounded: { tank: Tank; role: CrewRole };
  tankDestroyed: { tank: Tank; killer: Tank | null; ammoRack: boolean };
  fire: { tank: Tank; burning: boolean };
  destructible: { collider: Collider; by: Tank | null; pos: Vector3 };
  spotted: { tank: Tank; byTeam: number; first: boolean };
  radio: { team: number; from: Tank | null; text: string; kind: RadioKind };
  ram: { a: Tank; b: Tank; damage: number; pos: Vector3 };
  consumable: { tank: Tank; index: number };
  battleEnd: { winner: number; reason: string };
}

export type RadioKind = 'help' | 'attack' | 'retreat' | 'target' | 'spotted' | 'capture' | 'defend' | 'info';
