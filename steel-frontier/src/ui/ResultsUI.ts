import { formatNumber, ROMAN } from '../core/math';
import type { RewardBreakdown } from '../game/Economy';
import type { BattleOutcome } from '../sim/GameMode';
import type { Tank } from '../sim/Tank';
import type { World } from '../sim/World';
import { el } from './dom';

const REASONS: Record<BattleOutcome['reason'], string> = {
  destroyed: 'Все машины противника уничтожены',
  capture: 'База захвачена',
  timeout: 'Время боя истекло',
  surrender: 'Бой покинут',
};

/** Post-battle summary: outcome, personal results, reward breakdown and team tables. */
export function showResults(parent: HTMLElement, world: World, player: Tank, outcome: BattleOutcome, rewards: RewardBreakdown, onClose: () => void): void {
  const wrap = el('div', 'modal-wrap');
  const title = rewards.outcome === 'win' ? 'ПОБЕДА' : rewards.outcome === 'loss' ? 'ПОРАЖЕНИЕ' : 'НИЧЬЯ';
  const reason = outcome.reason === 'destroyed' && outcome.winner !== player.team && outcome.winner !== -1 ? 'Все союзные машины уничтожены'
    : outcome.reason === 'capture' && outcome.winner !== player.team ? 'Противник захватил базу' : REASONS[outcome.reason];
  const b = player.battle;
  const team = (t: number) => world.tanks.filter((x) => x.team === t).sort((a, c) => c.battle.damageDealt - a.battle.damageDealt)
    .map((x) => `<tr style="opacity:${x.alive ? 1 : 0.55}${x === player ? ';color:#f0c860' : ''}"><td>${x.callsign}</td><td>${x.data.name} ${ROMAN[x.data.tier]}</td><td>${x.battle.damageDealt}</td><td>${x.battle.kills}</td></tr>`).join('');
  wrap.innerHTML = `
    <div class="modal panel">
      <div class="outcome ${rewards.outcome}">${title}</div>
      <div class="muted" style="margin-bottom:14px">${reason} · ${world.map.data.name} · ${world.mode.data.name}</div>
      <div class="results-grid">
        <div>
          <h3>Личные результаты — ${player.data.name}</h3>
          <table class="reward-table">
            <tr><td>Нанесено урона</td><td>${b.damageDealt}</td></tr>
            <tr><td>Урон по вашей разведке</td><td>${b.assistDamage}</td></tr>
            <tr><td>Заблокировано бронёй</td><td>${b.damageBlocked}</td></tr>
            <tr><td>Уничтожено</td><td>${b.kills}</td></tr>
            <tr><td>Обнаружено</td><td>${b.spotted}</td></tr>
            <tr><td>Выстрелов / попаданий / пробитий</td><td>${b.shots} / ${b.hits} / ${b.penetrations}</td></tr>
            <tr><td>Очки захвата / защиты</td><td>${Math.round(b.capturePoints)} / ${Math.round(b.defensePoints)}</td></tr>
            <tr><td>Получено урона</td><td>${b.damageReceived}</td></tr>
          </table>
          <h3>Награда</h3>
          <table class="reward-table">
            <tr><td></td><td class="xp">Опыт</td><td class="cr">Кредиты</td></tr>
            ${rewards.lines.map((l) => `<tr><td>${l.label}</td><td>${l.xp ? '+' + formatNumber(l.xp) : ''}</td><td>${l.credits ? '+' + formatNumber(l.credits) : ''}</td></tr>`).join('')}
            <tr><td>Ремонт</td><td></td><td style="color:#ff8b80">−${formatNumber(rewards.repairCost)}</td></tr>
            <tr><td>Пополнение боекомплекта</td><td></td><td style="color:#ff8b80">−${formatNumber(rewards.ammoCost)}</td></tr>
            <tr><td><b>Итого</b></td><td class="xp"><b>${formatNumber(rewards.xp)}</b></td><td class="cr"><b>${rewards.creditsNet >= 0 ? '+' : ''}${formatNumber(rewards.creditsNet)}</b></td></tr>
            <tr><td>Свободный опыт / опыт экипажа</td><td class="xp" colspan="2">+${formatNumber(rewards.freeXp)} / +${formatNumber(rewards.crewXp)}</td></tr>
          </table>
        </div>
        <div>
          <h3 style="color:#7be366">Ваша команда</h3>
          <table class="reward-table"><tr class="muted"><td>Игрок</td><td>Танк</td><td>Урон</td><td>Фраги</td></tr>${team(player.team)}</table>
          <h3 style="color:#ff5a4d">Противник</h3>
          <table class="reward-table"><tr class="muted"><td>Игрок</td><td>Танк</td><td>Урон</td><td>Фраги</td></tr>${team(1 - player.team)}</table>
        </div>
      </div>
      <div style="text-align:right;margin-top:14px"><button class="btn primary" data-close>В ангар</button></div>
    </div>`;
  parent.appendChild(wrap);
  wrap.querySelector('[data-close]')!.addEventListener('click', () => {
    wrap.remove();
    onClose();
  });
}
