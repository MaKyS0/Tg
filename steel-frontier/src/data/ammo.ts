import type { AmmoKind } from './types';

/** Physical/behavioural template of each ammo kind. Concrete shells are generated per gun. */
export interface AmmoKindData {
  kind: AmmoKind;
  name: string;
  short: string;
  penMul: number;
  damageMul: number;
  velocityMul: number;
  massMul: number;
  dragCd: number;
  normalization: number;
  ricochetAngle: number;
  /** Penetration scales with (v/v0)^exp for kinetic rounds. 0 = chemical/explosive (no loss). */
  velocityPenExponent: number;
  priceMul: number;
  premium: boolean;
  color: string;
}

export const AMMO_KINDS: Record<AmmoKind, AmmoKindData> = {
  AP: {
    kind: 'AP', name: 'Бронебойный', short: 'ББ', penMul: 1, damageMul: 1, velocityMul: 1, massMul: 1,
    dragCd: 0.3, normalization: 5, ricochetAngle: 70, velocityPenExponent: 1.43, priceMul: 1, premium: false,
    color: '#ffd27a',
  },
  APCR: {
    kind: 'APCR', name: 'Подкалиберный', short: 'БП', penMul: 1.32, damageMul: 1, velocityMul: 1.28, massMul: 0.55,
    dragCd: 0.36, normalization: 2, ricochetAngle: 70, velocityPenExponent: 1.6, priceMul: 3.2, premium: true,
    color: '#9fe8ff',
  },
  HE: {
    kind: 'HE', name: 'Осколочно-фугасный', short: 'ОФ', penMul: 0.5, damageMul: 1.32, velocityMul: 0.92, massMul: 1.05,
    dragCd: 0.38, normalization: 0, ricochetAngle: 90, velocityPenExponent: 0, priceMul: 0.85, premium: false,
    color: '#ff9a4a',
  },
  HEAT: {
    kind: 'HEAT', name: 'Кумулятивный', short: 'КС', penMul: 1.28, damageMul: 1, velocityMul: 0.8, massMul: 0.9,
    dragCd: 0.4, normalization: 0, ricochetAngle: 85, velocityPenExponent: 0, priceMul: 3.0, premium: true,
    color: '#ff7ad2',
  },
};

export const AMMO_ORDER: AmmoKind[] = ['AP', 'APCR', 'HE', 'HEAT'];

/** HEAT jet loses this fraction of penetration per metre after the first armour contact (spaced armour). */
export const HEAT_LOSS_PER_METER = 0.5;
