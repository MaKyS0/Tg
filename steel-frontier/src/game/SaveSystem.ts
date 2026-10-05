import { hashString } from '../core/Random';
import type { Difficulty, ModuleSlot } from '../data/types';

export const SAVE_VERSION = 3;
const PRIMARY_KEY = 'steel-frontier.save';
const BACKUP_KEY = 'steel-frontier.save.backup';

export type GraphicsQuality = 'low' | 'medium' | 'high' | 'ultra';
export type InputAction =
  | 'forward' | 'back' | 'left' | 'right' | 'brake' | 'fire' | 'sniper' | 'lockTurret' | 'zoomIn' | 'zoomOut'
  | 'ammo1' | 'ammo2' | 'ammo3' | 'repair' | 'medkit' | 'extinguisher' | 'radioHelp' | 'radioAttack' | 'radioRetreat'
  | 'radioTarget' | 'scoreboard' | 'pause';

export interface Settings {
  graphics: GraphicsQuality;
  renderScale: number;
  shadows: boolean;
  fov: number;
  masterVolume: number;
  sfxVolume: number;
  engineVolume: number;
  ambientVolume: number;
  voice: boolean;
  mouseSensitivity: number;
  sniperSensitivity: number;
  gamepadSensitivity: number;
  invertY: boolean;
  bindings: Record<InputAction, string[]>;
  teamSize: number;
  difficulty: Difficulty;
  showFps: boolean;
  touchControls: 'auto' | 'on' | 'off';
}

export interface CrewProgress {
  skill: number; // 50..100
  xp: number; // towards next skill %
  perkXp: number;
  perks: string[];
  perkPoints: number;
}

export interface TankProgress {
  xp: number;
  owned: boolean;
  researchedModules: string[];
  purchasedModules: string[];
  equipped: Record<ModuleSlot, string>;
  ammo: Record<string, number>;
  crew: CrewProgress;
  battles: number;
  wins: number;
  damage: number;
  kills: number;
}

export interface ProfileStats {
  battles: number;
  wins: number;
  losses: number;
  draws: number;
  damage: number;
  kills: number;
  spotted: number;
  shots: number;
  hits: number;
  bestDamage: number;
  bestKills: number;
  totalXp: number;
  creditsEarned: number;
}

export interface SaveData {
  version: number;
  createdAt: number;
  updatedAt: number;
  credits: number;
  freeXp: number;
  researched: string[];
  tanks: Record<string, TankProgress>;
  selectedTank: string;
  settings: Settings;
  stats: ProfileStats;
  lastMode: string;
  lastMap: string;
}

export const DEFAULT_BINDINGS: Record<InputAction, string[]> = {
  forward: ['KeyW', 'ArrowUp'],
  back: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  brake: ['Space'],
  fire: ['Mouse0'],
  sniper: ['ShiftLeft', 'ShiftRight'],
  lockTurret: ['Mouse2'],
  zoomIn: ['WheelUp'],
  zoomOut: ['WheelDown'],
  ammo1: ['Digit1'],
  ammo2: ['Digit2'],
  ammo3: ['Digit3'],
  repair: ['Digit4'],
  medkit: ['Digit5'],
  extinguisher: ['Digit6'],
  radioHelp: ['F2'],
  radioAttack: ['F3'],
  radioRetreat: ['F4'],
  radioTarget: ['KeyT'],
  scoreboard: ['Tab'],
  pause: ['Escape'],
};

export function defaultSettings(): Settings {
  return {
    graphics: 'high', renderScale: 1, shadows: true, fov: 70,
    masterVolume: 0.8, sfxVolume: 0.9, engineVolume: 0.7, ambientVolume: 0.5, voice: true,
    mouseSensitivity: 1, sniperSensitivity: 0.5, gamepadSensitivity: 1, invertY: false,
    bindings: structuredClone(DEFAULT_BINDINGS), teamSize: 15, difficulty: 'normal', showFps: false, touchControls: 'auto',
  };
}

export function defaultStats(): ProfileStats {
  return {
    battles: 0, wins: 0, losses: 0, draws: 0, damage: 0, kills: 0, spotted: 0, shots: 0, hits: 0,
    bestDamage: 0, bestKills: 0, totalXp: 0, creditsEarned: 0,
  };
}

/** Key/value persistence backend (localStorage in browsers, memory in tests). */
export interface StorageAdapter {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

export class MemoryStorage implements StorageAdapter {
  private map = new Map<string, string>();
  get(key: string): string | null {
    return this.map.get(key) ?? null;
  }
  set(key: string, value: string): void {
    this.map.set(key, value);
  }
  remove(key: string): void {
    this.map.delete(key);
  }
}

export class LocalStorageAdapter implements StorageAdapter {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Quota or privacy mode: the game keeps running with in-memory state.
    }
  }
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}

interface Envelope {
  v: number;
  checksum: number;
  data: SaveData;
}

/**
 * Versioned, checksummed save with an automatic backup slot. Corrupted primaries fall back to the
 * backup; unknown/missing fields are filled from defaults; older versions are migrated forward.
 */
export class SaveSystem {
  constructor(private readonly storage: StorageAdapter) {}

  load(createNew: () => SaveData): { data: SaveData; source: 'primary' | 'backup' | 'new' } {
    for (const [key, source] of [[PRIMARY_KEY, 'primary'], [BACKUP_KEY, 'backup']] as const) {
      const raw = this.storage.get(key);
      if (!raw) continue;
      const data = this.decode(raw);
      if (data) return { data: this.normalize(data, createNew), source };
    }
    return { data: createNew(), source: 'new' };
  }

  save(data: SaveData): void {
    data.updatedAt = Date.now();
    data.version = SAVE_VERSION;
    const encoded = this.encode(data);
    const previous = this.storage.get(PRIMARY_KEY);
    if (previous && this.decode(previous)) this.storage.set(BACKUP_KEY, previous);
    this.storage.set(PRIMARY_KEY, encoded);
  }

  reset(): void {
    this.storage.remove(PRIMARY_KEY);
    this.storage.remove(BACKUP_KEY);
  }

  encode(data: SaveData): string {
    const json = JSON.stringify(data);
    const env: Envelope = { v: SAVE_VERSION, checksum: hashString(json), data };
    return JSON.stringify(env);
  }

  decode(raw: string): SaveData | null {
    try {
      const env = JSON.parse(raw) as Envelope;
      if (!env || typeof env !== 'object' || !env.data || typeof env.v !== 'number') return null;
      if (hashString(JSON.stringify(env.data)) !== env.checksum) return null;
      return this.migrate(env.data, env.v);
    } catch {
      return null;
    }
  }

  exportString(data: SaveData): string {
    return btoa(unescape(encodeURIComponent(this.encode(data))));
  }

  importString(str: string): SaveData | null {
    try {
      return this.decode(decodeURIComponent(escape(atob(str.trim()))));
    } catch {
      return null;
    }
  }

  private migrate(data: SaveData, from: number): SaveData {
    const d = data as SaveData & Record<string, unknown>;
    if (from < 2) {
      // v1 stored crew skill as a bare number per tank.
      for (const t of Object.values(d.tanks ?? {})) {
        const legacy = (t as unknown as { crewSkill?: number }).crewSkill;
        if (typeof legacy === 'number') t.crew = { skill: legacy, xp: 0, perkXp: 0, perks: [], perkPoints: 0 };
      }
    }
    if (from < 3) {
      for (const t of Object.values(d.tanks ?? {})) t.purchasedModules ??= [...(t.researchedModules ?? [])];
    }
    d.version = SAVE_VERSION;
    return d;
  }

  /** Fills gaps so the rest of the game can trust the structure. */
  private normalize(data: SaveData, createNew: () => SaveData): SaveData {
    const fresh = createNew();
    const out: SaveData = {
      ...fresh,
      ...data,
      settings: { ...fresh.settings, ...(data.settings ?? {}) },
      stats: { ...fresh.stats, ...(data.stats ?? {}) },
      tanks: { ...(data.tanks ?? {}) },
      researched: Array.isArray(data.researched) ? data.researched : fresh.researched,
    };
    out.settings.bindings = { ...structuredClone(DEFAULT_BINDINGS), ...(data.settings?.bindings ?? {}) };
    if (!Number.isFinite(out.credits) || out.credits < 0) out.credits = 0;
    if (!Number.isFinite(out.freeXp) || out.freeXp < 0) out.freeXp = 0;
    for (const id of fresh.researched) if (!out.researched.includes(id)) out.researched.push(id);
    for (const [id, t] of Object.entries(fresh.tanks)) if (!out.tanks[id]) out.tanks[id] = t;
    return out;
  }
}
