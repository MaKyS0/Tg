import type { CrewPerk, CrewRole } from './types';

export const CREW_ROLE_NAMES: Record<CrewRole, string> = {
  commander: 'Командир',
  gunner: 'Наводчик',
  driver: 'Механик-водитель',
  loader: 'Заряжающий',
  radioman: 'Радист',
};

export const CREW_PERKS: CrewPerk[] = [
  { id: 'repair', name: 'Ремонт', description: '+25% к скорости ремонта модулей', role: 'any' },
  { id: 'camo', name: 'Маскировка', description: '+15% к маскировке танка', role: 'any' },
  { id: 'firefight', name: 'Пожаротушение', description: 'Пожар гаснет вдвое быстрее', role: 'any' },
  { id: 'snapshot', name: 'Плавный поворот', description: '-15% к разбросу при повороте башни', role: 'gunner' },
  { id: 'smooth', name: 'Плавный ход', description: '-15% к разбросу при движении', role: 'driver' },
  { id: 'eagle', name: 'Орлиный глаз', description: '+8% к обзору', role: 'commander' },
];

/** Experience required to raise a crew member's skill by one percent at a given level. */
export function crewXpForLevel(level: number): number {
  return Math.round(40 + Math.pow(Math.max(0, level - 50), 1.6) * 3);
}

/** Crew skill points for perks unlock when level passes 100: each perk needs this XP pool. */
export const PERK_XP = 30000;
export const MAX_PERKS = 3;
