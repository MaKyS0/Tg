import type { Difficulty } from '../../data/types';

export interface DifficultyProfile {
  id: Difficulty;
  name: string;
  /** Seconds between acquiring a target and the first shot. */
  reaction: number;
  /** Aim error cone (degrees) applied to the aim point. */
  aimErrorDeg: number;
  /** 0 = no lead, 1 = perfect target-velocity prediction. */
  lead: number;
  /** Fire once dispersion ≤ patience × gun accuracy. */
  patience: number;
  /** Fire anyway after this long aiming at a target. */
  maxAimWait: number;
  weakspots: boolean;
  coverChance: number;
  angleArmor: boolean;
  thinkInterval: number;
  retreatHp: number;
  smartAmmo: boolean;
  /** How well the bot avoids shooting into allies and terrain (LOS checks). */
  carefulFire: boolean;
}

export const DIFFICULTIES: Record<Difficulty, DifficultyProfile> = {
  easy: {
    id: 'easy', name: 'Лёгкий', reaction: 1.6, aimErrorDeg: 0.9, lead: 0, patience: 3.4, maxAimWait: 1.4,
    weakspots: false, coverChance: 0, angleArmor: false, thinkInterval: 1.3, retreatHp: 0.12, smartAmmo: false, carefulFire: false,
  },
  normal: {
    id: 'normal', name: 'Нормальный', reaction: 1.0, aimErrorDeg: 0.45, lead: 0.5, patience: 2.3, maxAimWait: 2.4,
    weakspots: false, coverChance: 0.35, angleArmor: false, thinkInterval: 0.9, retreatHp: 0.22, smartAmmo: true, carefulFire: true,
  },
  hard: {
    id: 'hard', name: 'Сложный', reaction: 0.6, aimErrorDeg: 0.22, lead: 0.85, patience: 1.6, maxAimWait: 3.5,
    weakspots: true, coverChance: 0.75, angleArmor: true, thinkInterval: 0.6, retreatHp: 0.3, smartAmmo: true, carefulFire: true,
  },
  expert: {
    id: 'expert', name: 'Эксперт', reaction: 0.35, aimErrorDeg: 0.1, lead: 1, patience: 1.3, maxAimWait: 5,
    weakspots: true, coverChance: 1, angleArmor: true, thinkInterval: 0.45, retreatHp: 0.35, smartAmmo: true, carefulFire: true,
  },
};
