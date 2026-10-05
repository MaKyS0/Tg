import type { TankClass } from './types';

/** Class archetypes: baseline values that the tank factory scales by tier and nation flavor. */
export interface ClassArchetype {
  cls: TankClass;
  name: string;
  role: string;
  hpMul: number;
  massBase: number;
  massPerTier: number;
  specificPower: number; // hp per tonne
  maxSpeed: number; // km/h
  reverseSpeed: number;
  hullTraverse: number; // deg/s
  turretTraverse: number;
  armorFrontBase: number;
  armorFrontPerTier: number;
  sideRatio: number;
  upperAngle: number;
  lowerAngle: number;
  penMul: number;
  alphaMul: number;
  dpmMul: number;
  accuracy: number; // m at 100 m
  aimTime: number;
  elevation: number;
  depression: number;
  ammoCapacity: number;
  viewRange: number;
  camo: { stationary: number; moving: number };
  dims: { length: number; width: number; height: number };
  dispersionMove: number;
  hasTurret: boolean;
  traverseLimit: number;
}

export const CLASS_ARCHETYPES: Record<TankClass, ClassArchetype> = {
  LT: {
    cls: 'LT', name: 'Лёгкий танк', role: 'Разведка, обход флангов, засвет',
    hpMul: 0.82, massBase: 7, massPerTier: 2.2, specificPower: 24, maxSpeed: 64, reverseSpeed: 22,
    hullTraverse: 52, turretTraverse: 46, armorFrontBase: 13, armorFrontPerTier: 3.6, sideRatio: 0.75,
    upperAngle: 50, lowerAngle: 40, penMul: 0.88, alphaMul: 0.8, dpmMul: 0.92, accuracy: 0.42, aimTime: 1.9,
    elevation: 20, depression: 8, ammoCapacity: 70, viewRange: 410, camo: { stationary: 0.4, moving: 0.38 },
    dims: { length: 4.6, width: 2.5, height: 0.95 }, dispersionMove: 0.14, hasTurret: true, traverseLimit: 180,
  },
  MT: {
    cls: 'MT', name: 'Средний танк', role: 'Универсальный боец, поддержка и манёвр',
    hpMul: 1.0, massBase: 9, massPerTier: 4.2, specificPower: 18, maxSpeed: 54, reverseSpeed: 20,
    hullTraverse: 44, turretTraverse: 40, armorFrontBase: 16, armorFrontPerTier: 9.5, sideRatio: 0.6,
    upperAngle: 56, lowerAngle: 48, penMul: 1.0, alphaMul: 1.0, dpmMul: 1.0, accuracy: 0.38, aimTime: 2.1,
    elevation: 20, depression: 8, ammoCapacity: 60, viewRange: 385, camo: { stationary: 0.26, moving: 0.19 },
    dims: { length: 5.4, width: 2.8, height: 1.05 }, dispersionMove: 0.17, hasTurret: true, traverseLimit: 180,
  },
  HT: {
    cls: 'HT', name: 'Тяжёлый танк', role: 'Прорыв, удержание направления, танкование',
    hpMul: 1.32, massBase: 18, massPerTier: 6.3, specificPower: 12.5, maxSpeed: 38, reverseSpeed: 14,
    hullTraverse: 27, turretTraverse: 27, armorFrontBase: 28, armorFrontPerTier: 16.5, sideRatio: 0.55,
    upperAngle: 48, lowerAngle: 50, penMul: 1.1, alphaMul: 1.3, dpmMul: 1.05, accuracy: 0.4, aimTime: 2.5,
    elevation: 18, depression: 7, ammoCapacity: 45, viewRange: 370, camo: { stationary: 0.12, moving: 0.06 },
    dims: { length: 6.4, width: 3.3, height: 1.2 }, dispersionMove: 0.2, hasTurret: true, traverseLimit: 180,
  },
  TD: {
    cls: 'TD', name: 'ПТ-САУ', role: 'Огневая поддержка из засады, высокий урон',
    hpMul: 0.95, massBase: 10, massPerTier: 4.6, specificPower: 15, maxSpeed: 44, reverseSpeed: 16,
    hullTraverse: 33, turretTraverse: 30, armorFrontBase: 18, armorFrontPerTier: 13, sideRatio: 0.45,
    upperAngle: 55, lowerAngle: 45, penMul: 1.22, alphaMul: 1.38, dpmMul: 1.18, accuracy: 0.33, aimTime: 1.9,
    elevation: 16, depression: 7, ammoCapacity: 40, viewRange: 365, camo: { stationary: 0.46, moving: 0.27 },
    dims: { length: 6.0, width: 3.0, height: 1.0 }, dispersionMove: 0.2, hasTurret: false, traverseLimit: 12,
  },
  SPG: {
    cls: 'SPG', name: 'САУ', role: 'Навесной огонь с дальних дистанций',
    hpMul: 0.68, massBase: 9, massPerTier: 3.4, specificPower: 15, maxSpeed: 46, reverseSpeed: 16,
    hullTraverse: 34, turretTraverse: 16, armorFrontBase: 10, armorFrontPerTier: 2.5, sideRatio: 0.8,
    upperAngle: 30, lowerAngle: 30, penMul: 0.6, alphaMul: 2.6, dpmMul: 0.62, accuracy: 0.72, aimTime: 4.6,
    elevation: 50, depression: 2, ammoCapacity: 30, viewRange: 320, camo: { stationary: 0.34, moving: 0.17 },
    dims: { length: 5.6, width: 2.9, height: 1.1 }, dispersionMove: 0.3, hasTurret: false, traverseLimit: 18,
  },
};

export const CLASS_ORDER: TankClass[] = ['LT', 'MT', 'HT', 'TD', 'SPG'];
