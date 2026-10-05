import type { Tank } from '../sim/Tank';
import type { BattleOutcome } from '../sim/GameMode';

export interface RewardLine {
  label: string;
  xp: number;
  credits: number;
}

export interface RewardBreakdown {
  outcome: 'win' | 'loss' | 'draw';
  lines: RewardLine[];
  xp: number;
  freeXp: number;
  crewXp: number;
  creditsGross: number;
  repairCost: number;
  ammoCost: number;
  creditsNet: number;
}

/** Battle result → experience and credits. Tier scales income and costs; premium tanks earn more credits. */
export function computeRewards(tank: Tank, outcome: BattleOutcome, ammoCost: number): RewardBreakdown {
  const T = tank.data.tier;
  const b = tank.battle;
  const result: RewardBreakdown['outcome'] = outcome.winner === -1 ? 'draw' : outcome.winner === tank.team ? 'win' : 'loss';
  const lines: RewardLine[] = [];
  const add = (label: string, xp: number, credits: number) => {
    if (xp > 0 || credits > 0) lines.push({ label, xp: Math.round(xp), credits: Math.round(credits) });
  };
  add('Участие в бою', 80 + 20 * T, 2000 + 900 * T);
  add(`Нанесённый урон (${b.damageDealt})`, b.damageDealt * 0.35, b.damageDealt * (6 + 0.6 * T));
  add(`Уничтожено (${b.kills})`, b.kills * 60 * T, b.kills * 1500 * Math.pow(T, 0.6));
  add(`Обнаружено (${b.spotted})`, b.spotted * 25, b.spotted * 300);
  add(`Урон по разведданным (${b.assistDamage})`, b.assistDamage * 0.2, b.assistDamage * 3);
  add(`Заблокировано бронёй (${b.damageBlocked})`, b.damageBlocked * 0.05, b.damageBlocked * 0.8);
  add(`Захват базы (${Math.round(b.capturePoints)})`, b.capturePoints * 3, b.capturePoints * 40);
  add(`Защита базы (${Math.round(b.defensePoints)})`, b.defensePoints * 4, b.defensePoints * 50);
  if (tank.alive) add('Выживание', 30 * T, 0);
  let xp = lines.reduce((s, l) => s + l.xp, 0);
  let credits = lines.reduce((s, l) => s + l.credits, 0);
  if (result === 'win') {
    const bonusXp = xp * 0.5;
    const bonusCr = credits * 0.3;
    lines.push({ label: 'Победа', xp: Math.round(bonusXp), credits: Math.round(bonusCr) });
    xp += bonusXp;
    credits += bonusCr;
  }
  if (tank.data.premium) {
    const bonus = credits * 0.5;
    lines.push({ label: 'Премиум-танк', xp: 0, credits: Math.round(bonus) });
    credits += bonus;
  }
  const damageFraction = 1 - tank.hp / tank.maxHp;
  const repairCost = Math.round(damageFraction * Math.pow(T, 1.8) * 180);
  xp = Math.round(xp);
  credits = Math.round(credits);
  return {
    outcome: result,
    lines,
    xp,
    freeXp: Math.round(xp * 0.05),
    crewXp: xp,
    creditsGross: credits,
    repairCost,
    ammoCost: Math.round(ammoCost),
    creditsNet: credits - repairCost - Math.round(ammoCost),
  };
}
