import type { SurfaceData, SurfaceId } from './types';

export const SURFACES: Record<SurfaceId, SurfaceData> = {
  asphalt: { id: 'asphalt', name: 'Асфальт', grip: 0.95, resistanceClass: 'hard', speedFactor: 1.0, color: [0.23, 0.23, 0.24], dust: null, trackMarks: false },
  stone: { id: 'stone', name: 'Камень', grip: 0.8, resistanceClass: 'hard', speedFactor: 0.92, color: [0.44, 0.42, 0.4], dust: [0.55, 0.53, 0.5], trackMarks: false },
  dirt: { id: 'dirt', name: 'Грунт', grip: 0.85, resistanceClass: 'medium', speedFactor: 0.96, color: [0.42, 0.33, 0.22], dust: [0.55, 0.45, 0.32], trackMarks: true },
  grass: { id: 'grass', name: 'Трава', grip: 0.8, resistanceClass: 'medium', speedFactor: 0.95, color: [0.3, 0.42, 0.18], dust: [0.45, 0.42, 0.3], trackMarks: true },
  sand: { id: 'sand', name: 'Песок', grip: 0.62, resistanceClass: 'soft', speedFactor: 0.85, color: [0.78, 0.68, 0.46], dust: [0.85, 0.75, 0.55], trackMarks: true },
  mud: { id: 'mud', name: 'Грязь', grip: 0.5, resistanceClass: 'soft', speedFactor: 0.75, color: [0.28, 0.22, 0.15], dust: [0.3, 0.24, 0.16], trackMarks: true },
  snow: { id: 'snow', name: 'Снег', grip: 0.45, resistanceClass: 'soft', speedFactor: 0.85, color: [0.9, 0.92, 0.95], dust: [0.95, 0.96, 1.0], trackMarks: true },
  water: { id: 'water', name: 'Вода', grip: 0.5, resistanceClass: 'soft', speedFactor: 0.55, color: [0.2, 0.3, 0.35], dust: null, trackMarks: false },
};

export const SURFACE_IDS = Object.keys(SURFACES) as SurfaceId[];
export const SURFACE_INDEX: Record<SurfaceId, number> = Object.fromEntries(
  SURFACE_IDS.map((id, i) => [id, i]),
) as Record<SurfaceId, number>;
