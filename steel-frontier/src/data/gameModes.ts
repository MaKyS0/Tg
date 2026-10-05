import type { GameModeData } from './types';

export const GAME_MODES: GameModeData[] = [
  {
    id: 'standard',
    name: 'Стандартный бой',
    description: 'Уничтожьте всех противников или захватите их базу.',
    bases: 'both', winByDestroy: true, winByCapture: true, timeLimit: 600, timeoutResult: 'draw',
    captureRate: 1.0, maxCapturers: 3, captureResetOnDamage: true,
  },
  {
    id: 'capture',
    name: 'Захват',
    description: 'Победа только захватом базы противника. Уничтожение врагов победы не даёт.',
    bases: 'both', winByDestroy: false, winByCapture: true, timeLimit: 720, timeoutResult: 'draw',
    captureRate: 1.4, maxCapturers: 4, captureResetOnDamage: true,
  },
  {
    id: 'encounter',
    name: 'Встречный бой',
    description: 'Одна нейтральная база в центре. Захватите её или уничтожьте врага.',
    bases: 'neutral', winByDestroy: true, winByCapture: true, timeLimit: 600, timeoutResult: 'draw',
    captureRate: 0.8, maxCapturers: 3, captureResetOnDamage: true,
  },
  {
    id: 'assault',
    name: 'Штурм',
    description: 'Команда А атакует базу команды Б. По истечении времени побеждают защитники.',
    bases: 'defender', winByDestroy: true, winByCapture: true, timeLimit: 540, timeoutResult: 'defenders',
    captureRate: 1.0, maxCapturers: 3, captureResetOnDamage: true,
  },
];

export function getGameMode(id: string): GameModeData {
  const m = GAME_MODES.find((g) => g.id === id);
  if (!m) throw new Error(`Unknown game mode: ${id}`);
  return m;
}
