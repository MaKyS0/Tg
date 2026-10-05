import { registry } from '../data/registry';
import { AMMO_KINDS } from '../data/ammo';
import { CLASS_ARCHETYPES } from '../data/classes';
import { CREW_PERKS, CREW_ROLE_NAMES, crewXpForLevel, PERK_XP } from '../data/crew';
import { GAME_MODES } from '../data/gameModes';
import { MAPS } from '../data/maps';
import type { ModuleData, ModuleSlot, TankData } from '../data/types';
import { formatNumber, ROMAN } from '../core/math';
import type { ProgressionSystem } from '../game/ProgressionSystem';
import { Tank } from '../sim/Tank';
import { maxRange } from '../sim/Ballistics';
import { CLASS_ICONS, el, toast } from './dom';

export interface GarageCallbacks {
  onSelectTank(id: string): void;
  onBattle(modeId: string, mapId: string): void;
  onOpenTree(nation: string): void;
  onOpenSettings(): void;
  onChanged(): void;
  sound(kind: 'click' | 'buy' | 'error'): void;
}

const SLOT_NAMES: Record<ModuleSlot, string> = { gun: 'Орудие', turret: 'Башня', engine: 'Двигатель', suspension: 'Ходовая', radio: 'Радиостанция' };

/** Hangar screen: tank list, characteristics, modules, ammo, crew, statistics and battle launch. */
export class GarageUI {
  readonly root: HTMLDivElement;
  private tab: 'modules' | 'ammo' | 'crew' | 'stats' = 'modules';

  constructor(parent: HTMLElement, private readonly prog: ProgressionSystem, private readonly cb: GarageCallbacks) {
    this.root = el('div', 'garage');
    parent.appendChild(this.root);
    this.render();
  }

  private get tankId(): string {
    return this.prog.data.selectedTank;
  }

  render(): void {
    const prog = this.prog;
    const t = registry.getTank(this.tankId);
    const data = prog.data;
    const modeOptions = GAME_MODES.map((m) => `<option value="${m.id}" ${data.lastMode === m.id ? 'selected' : ''}>${m.name}</option>`).join('');
    const mapOptions = [`<option value="random">Случайная карта</option>`, ...MAPS.map((m) => `<option value="${m.id}" ${data.lastMap === m.id ? 'selected' : ''}>${m.name}</option>`)].join('');
    this.root.innerHTML = `
      <div class="g-top">
        <div class="g-logo">СТАЛЬНОЙ РУБЕЖ</div>
        <button class="btn small" data-act="tree">Исследования</button>
        <button class="btn small" data-act="settings">Настройки</button>
        <div class="g-battle">
          <select class="sel-mode" title="Режим">${modeOptions}</select>
          <select class="sel-map" title="Карта">${mapOptions}</select>
          <button class="btn primary" data-act="battle">В БОЙ!</button>
        </div>
        <div class="g-res"><span class="cr">⛁ ${formatNumber(data.credits)}</span><span class="xp">★ ${formatNumber(data.freeXp)} своб.</span></div>
      </div>
      <div class="g-left panel">${this.renderStats(t)}</div>
      <div class="g-center"><div class="tank-title"><h2>${CLASS_ICONS[t.cls]}${t.name}</h2><div class="muted">${registry.getNation(t.nation).name} · ${CLASS_ARCHETYPES[t.cls].name} · уровень ${ROMAN[t.tier]}${t.premium ? ' · <span class="cr">премиум</span>' : ''}</div><div class="xp">Опыт машины: ${formatNumber(prog.progress(t.id).xp)}</div></div></div>
      <div class="g-right panel">
        <div class="tabs">
          <button data-tab="modules" class="${this.tab === 'modules' ? 'active' : ''}">Модули</button>
          <button data-tab="ammo" class="${this.tab === 'ammo' ? 'active' : ''}">Снаряды</button>
          <button data-tab="crew" class="${this.tab === 'crew' ? 'active' : ''}">Экипаж</button>
          <button data-tab="stats" class="${this.tab === 'stats' ? 'active' : ''}">Статистика</button>
        </div>
        <div class="tab-body">${this.renderTab(t)}</div>
      </div>
      <div class="g-bottom">${this.renderCarousel()}</div>`;
    this.bind();
  }

  private renderStats(t: TankData): string {
    const lo = this.prog.loadoutFor(t.id);
    const tank = new Tank(t, 0, '', lo);
    const s = tank.stats;
    const g = tank.gun;
    const ap = g.ammo[0];
    const massT = s.mass / 1000;
    const load = registry.loadOf(t, lo.modules);
    const row = (k: string, v: string | number) => `<div class="stat-row"><span class="muted">${k}</span><span>${v}</span></div>`;
    const h = t.hull;
    const ta = tank.turret.armor;
    return `
      <div class="section-title">Живучесть</div>
      ${row('Прочность', tank.maxHp)}
      ${row('Масса / предел ходовой', `${massT.toFixed(1)} / ${tank.suspension.maxLoad.toFixed(1)} т`)}
      ${row('Броня корпуса (лоб/борт/корма)', `${h.armor.upperFront}/${h.armor.side}/${h.armor.rear} мм`)}
      ${row('Наклон ВЛД / НЛД', `${h.angles.upperFront.toFixed(0)}° / ${h.angles.lowerFront.toFixed(0)}°`)}
      ${row(t.hasTurret ? 'Броня башни (лоб/борт/корма)' : 'Броня рубки (лоб/борт/корма)', `${ta.front}/${ta.side}/${ta.rear} мм`)}
      ${row('Маска орудия', `${ta.mantlet} мм`)}
      ${h.screens ? row('Противокумулятивные экраны', `${h.screens} мм`) : ''}
      <div class="section-title">Огневая мощь · ${g.name}</div>
      ${row('Калибр', `${g.caliber} мм`)}
      ${row('Урон (ББ)', ap.damage)}
      ${row('Пробитие ББ / спец.', `${ap.penetration} / ${g.ammo[1].penetration} мм`)}
      ${row('Скорострельность', g.magazine ? `магазин ${g.magazine.size} шт · ${g.magazine.interShot} с` : `${(60 / s.reload).toFixed(1)} выстр/мин`)}
      ${row('Перезарядка', `${s.reload.toFixed(2)} с`)}
      ${row('Урон в минуту', Math.round((60 / s.reload) * ap.damage * (g.magazine ? g.magazine.size : 1)))}
      ${row('Разброс на 100 м', `${(s.accuracy * 100).toFixed(2)} м`)}
      ${row('Время сведения', `${s.aimTime.toFixed(2)} с`)}
      ${row('Скорость снаряда (ББ)', `${ap.velocity} м/с`)}
      ${row('Углы ВН', `+${g.elevation}° / −${g.depression}°`)}
      ${t.traverseLimit < 180 ? row('Углы ГН', `±${t.traverseLimit}°`) : ''}
      ${g.artillery ? row('Дальность стрельбы', `${Math.round(maxRange(ap))} м`) : ''}
      ${row('Боезапас', `${g.ammoCapacity} шт`)}
      <div class="section-title">Подвижность</div>
      ${row('Двигатель', `${tank.engine.name} · ${tank.engine.power} л.с.`)}
      ${row('Удельная мощность', `${(tank.engine.power / massT).toFixed(1)} л.с./т`)}
      ${row('Трансмиссия', h.transmission.name)}
      ${row('Макс. скорость вперёд / назад', `${h.maxSpeed} / ${h.reverseSpeed} км/ч`)}
      ${row('Поворот корпуса', `${tank.suspension.traverseSpeed}°/с`)}
      ${row('Поворот башни', `${tank.turret.traverseSpeed}°/с`)}
      <div class="section-title">Разведка</div>
      ${row('Обзор', `${Math.round(s.viewRange)} м`)}
      ${row('Дальность связи', `${Math.round(s.radioRange)} м`)}
      ${row('Маскировка (стоя/движение)', `${Math.round(s.camoStationary * 100)}% / ${Math.round(s.camoMoving * 100)}%`)}
      ${row('Экипаж', `${t.crew.length} чел. · ${lo.crewSkill}%`)}
      ${row('Нагрузка ходовой', `${load.toFixed(1)} т`)}`;
  }

  private renderTab(t: TankData): string {
    const prog = this.prog;
    const p = prog.progress(t.id);
    if (this.tab === 'modules') {
      const slots: ModuleSlot[] = ['gun', 'turret', 'engine', 'suspension', 'radio'];
      return slots.map((slot) => {
        const list = t.modules[slot] as ModuleData[];
        const rows = list.map((m) => {
          const st = prog.moduleState(t.id, m.id);
          const desc = this.moduleDesc(m);
          let action = '';
          if (st === 'researchable') action = `<button class="btn small" data-research="${m.id}">Исследовать <span class="xp">${formatNumber(m.researchXp)}</span></button>`;
          else if (st === 'researched') action = `<button class="btn small" data-equip="${m.id}">Купить <span class="cr">${formatNumber(m.price)}</span></button>`;
          else if (st === 'purchased') action = `<button class="btn small" data-equip="${m.id}">Установить</button>`;
          else if (st === 'equipped') action = '<span class="muted">установлен</span>';
          else action = '<span class="muted">🔒</span>';
          return `<div class="module-row ${st === 'equipped' ? 'equipped' : ''}"><div><div>${m.name}</div><div class="sub">${desc}</div></div><div>${action}</div></div>`;
        }).join('');
        return `<div class="section-title">${SLOT_NAMES[slot]}</div>${rows}`;
      }).join('');
    }
    if (this.tab === 'ammo') {
      const gun = prog.equippedGun(t.id);
      const total = gun.ammo.reduce((s, a) => s + (p.ammo[a.id] ?? 0), 0);
      return `<div class="muted" style="margin-bottom:8px">Боекомплект: ${total} / ${gun.ammoCapacity}. Израсходованные снаряды докупаются автоматически после боя.</div>` +
        gun.ammo.map((a) => `
          <div class="ammo-row">
            <div><b style="color:${AMMO_KINDS[a.kind].color}">${AMMO_KINDS[a.kind].short}</b> ${a.name}<div class="muted" style="font-size:11px">Пробитие ${a.penetration} мм · урон ${a.damage} · ${a.velocity} м/с · ${a.mass} кг · <span class="cr">${a.price} кр.</span>${a.kind === 'HE' ? ` · радиус ${a.explosionRadius.toFixed(1)} м` : ''}${a.kind === 'HEAT' ? ' · без нормализации' : ''}</div></div>
            <input type="range" min="0" max="${gun.ammoCapacity}" value="${p.ammo[a.id] ?? 0}" data-ammo="${a.id}">
            <span>${p.ammo[a.id] ?? 0}</span>
          </div>`).join('');
    }
    if (this.tab === 'crew') {
      const c = p.crew;
      const need = crewXpForLevel(c.skill);
      return `
        <div class="section-title">Уровень подготовки: ${c.skill}%</div>
        <div class="muted" style="font-size:12px">${c.skill < 100 ? `Опыт до следующего процента: ${c.xp} / ${need}` : `Опыт до нового навыка: ${Math.floor(c.perkXp)} / ${PERK_XP}`}</div>
        ${t.crew.map((r, i) => `<div class="crew-member"><span>${CREW_ROLE_NAMES[r]}</span><span class="muted">${registry.getNation(t.nation).crewNames[(i * 3 + t.tier) % 10]} · ${c.skill}%</span></div>`).join('')}
        <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
          <button class="btn small" data-train="75" ${c.skill >= 75 ? 'disabled' : ''}>Обучить до 75% · <span class="cr">${formatNumber(prog.crewTrainingCost(t.id, 75))}</span></button>
          <button class="btn small" data-train="100" ${c.skill >= 100 ? 'disabled' : ''}>Обучить до 100% · <span class="cr">${formatNumber(prog.crewTrainingCost(t.id, 100))}</span></button>
        </div>
        <div class="section-title">Навыки (${c.perks.length}/3, очков: ${c.perkPoints})</div>
        ${CREW_PERKS.map((perk) => `<div class="module-row ${c.perks.includes(perk.id) ? 'equipped' : ''}"><div><div>${perk.name}</div><div class="sub">${perk.description}</div></div><div>${c.perks.includes(perk.id) ? '<span class="muted">изучен</span>' : `<button class="btn small" data-perk="${perk.id}" ${c.perkPoints > 0 ? '' : 'disabled'}>Изучить</button>`}</div></div>`).join('')}
        <div class="section-title">Опыт</div>
        <button class="btn small" data-convert ${p.xp > 0 ? '' : 'disabled'}>Перевести весь опыт машины в свободный (25 кр./ед.)</button>`;
    }
    const s = prog.data.stats;
    const row = (k: string, v: string | number) => `<div class="stat-row"><span class="muted">${k}</span><span>${v}</span></div>`;
    const wr = s.battles ? ((s.wins / s.battles) * 100).toFixed(1) : '0';
    return `
      <div class="section-title">Общая статистика</div>
      ${row('Боёв', s.battles)}${row('Побед / поражений / ничьих', `${s.wins} / ${s.losses} / ${s.draws}`)}${row('Процент побед', `${wr}%`)}
      ${row('Средний урон', s.battles ? Math.round(s.damage / s.battles) : 0)}${row('Уничтожено машин', s.kills)}${row('Обнаружено', s.spotted)}
      ${row('Точность', s.shots ? `${((s.hits / s.shots) * 100).toFixed(1)}%` : '—')}${row('Рекорд урона', s.bestDamage)}${row('Рекорд фрагов', s.bestKills)}
      ${row('Всего опыта', formatNumber(s.totalXp))}${row('Заработано кредитов', formatNumber(s.creditsEarned))}
      <div class="section-title">${t.name}</div>
      ${row('Боёв', p.battles)}${row('Побед', p.wins)}${row('Урон', formatNumber(p.damage))}${row('Фраги', p.kills)}
      <div style="margin-top:12px">${prog.isOwned(t.id) && prog.ownedTanks().length > 1 ? `<button class="btn small danger" data-sell>Продать за ${formatNumber(prog.sellPrice(t.id))} кр.</button>` : ''}</div>`;
  }

  private moduleDesc(m: ModuleData): string {
    switch (m.slot) {
      case 'gun': return `${m.caliber} мм · урон ${m.ammo[0].damage} · пробитие ${m.ammo[0].penetration} · ${m.reloadTime.toFixed(1)} с · ${m.mass} т`;
      case 'turret': return `броня ${m.armor.front}/${m.armor.side}/${m.armor.rear} · ${m.traverseSpeed}°/с · обзор ${m.viewRange} м${m.hpBonus ? ` · +${m.hpBonus} HP` : ''}`;
      case 'engine': return `${m.power} л.с. · пожар ${Math.round(m.fireChance * 100)}%`;
      case 'suspension': return `нагрузка ${m.maxLoad.toFixed(1)} т · поворот ${m.traverseSpeed}°/с`;
      case 'radio': return `дальность ${m.range} м`;
    }
  }

  private renderCarousel(): string {
    return this.prog.ownedTanks()
      .sort((a, b) => a.tier - b.tier || a.nation.localeCompare(b.nation))
      .map((t) => `<div class="tank-card ${t.id === this.tankId ? 'selected' : ''}" data-tank="${t.id}">
          <span class="tier">${ROMAN[t.tier]}</span>
          <div class="muted" style="font-size:11px">${registry.getNation(t.nation).name}</div>
          <div class="name">${CLASS_ICONS[t.cls]}${t.name}</div>
          <div class="xp" style="font-size:11px">★ ${formatNumber(this.prog.progress(t.id).xp)}</div>
        </div>`).join('');
  }

  private result(r: { ok: boolean; message: string }): void {
    if (r.message) toast(r.message, !r.ok);
    this.cb.sound(r.ok ? 'buy' : 'error');
    if (r.ok) this.cb.onChanged();
    this.render();
  }

  private bind(): void {
    const q = <T extends Element>(s: string) => [...this.root.querySelectorAll<T>(s)];
    q<HTMLElement>('[data-tank]').forEach((e) => e.addEventListener('click', () => {
      this.cb.sound('click');
      this.cb.onSelectTank(e.dataset.tank!);
      this.render();
    }));
    q<HTMLElement>('[data-tab]').forEach((e) => e.addEventListener('click', () => {
      this.tab = e.dataset.tab as GarageUI['tab'];
      this.cb.sound('click');
      this.render();
    }));
    q<HTMLElement>('[data-research]').forEach((e) => e.addEventListener('click', () => this.result(this.prog.researchModule(this.tankId, e.dataset.research!))));
    q<HTMLElement>('[data-equip]').forEach((e) => e.addEventListener('click', () => {
      this.result(this.prog.buyAndEquipModule(this.tankId, e.dataset.equip!));
      this.cb.onSelectTank(this.tankId);
    }));
    q<HTMLInputElement>('[data-ammo]').forEach((e) => e.addEventListener('input', () => {
      this.prog.setAmmo(this.tankId, e.dataset.ammo!, Number(e.value));
      const p = this.prog.progress(this.tankId);
      e.value = String(p.ammo[e.dataset.ammo!] ?? 0);
      (e.nextElementSibling as HTMLElement).textContent = e.value;
      this.cb.onChanged();
    }));
    q<HTMLElement>('[data-train]').forEach((e) => e.addEventListener('click', () => this.result(this.prog.trainCrew(this.tankId, Number(e.dataset.train) as 75 | 100))));
    q<HTMLElement>('[data-perk]').forEach((e) => e.addEventListener('click', () => this.result(this.prog.learnPerk(this.tankId, e.dataset.perk!))));
    q<HTMLElement>('[data-convert]').forEach((e) => e.addEventListener('click', () => this.result(this.prog.convertToFreeXp(this.tankId, this.prog.progress(this.tankId).xp))));
    q<HTMLElement>('[data-sell]').forEach((e) => e.addEventListener('click', () => {
      if (!confirm('Продать танк? Экипаж будет расформирован.')) return;
      const r = this.prog.sell(this.tankId);
      this.result(r);
      this.cb.onSelectTank(this.prog.data.selectedTank);
      this.render();
    }));
    q<HTMLElement>('[data-act="battle"]').forEach((e) => e.addEventListener('click', () => {
      const mode = (this.root.querySelector('.sel-mode') as HTMLSelectElement).value;
      const map = (this.root.querySelector('.sel-map') as HTMLSelectElement).value;
      this.cb.onBattle(mode, map);
    }));
    q<HTMLElement>('[data-act="tree"]').forEach((e) => e.addEventListener('click', () => this.cb.onOpenTree(registry.getTank(this.tankId).nation)));
    q<HTMLElement>('[data-act="settings"]').forEach((e) => e.addEventListener('click', () => this.cb.onOpenSettings()));
  }

  dispose(): void {
    this.root.remove();
  }
}
