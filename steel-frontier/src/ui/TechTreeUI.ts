import { registry } from '../data/registry';
import { CLASS_ARCHETYPES } from '../data/classes';
import { formatNumber, ROMAN } from '../core/math';
import type { ProgressionSystem } from '../game/ProgressionSystem';
import { CLASS_ICONS, el, toast } from './dom';

const COL_W = 196;
const ROW_H = 118;
const NODE_W = 170;
const NODE_H = 92;

/** Research tree per nation: research with XP, purchase with credits, select owned tanks. */
export class TechTreeUI {
  readonly root: HTMLDivElement;

  constructor(parent: HTMLElement, private readonly prog: ProgressionSystem, private nation: string, private readonly cb: {
    onClose(): void; onChanged(): void; onSelect(id: string): void; sound(k: 'click' | 'buy' | 'error'): void;
  }) {
    this.root = el('div', 'overlay');
    parent.appendChild(this.root);
    this.render();
  }

  render(): void {
    const prog = this.prog;
    const tanks = registry.tanksOfNation(this.nation);
    const nations = [...registry.nations.values()];
    const rows = Math.max(...tanks.map((t) => t.treeRow)) + 1;
    const width = COL_W * 10;
    const height = rows * ROW_H;
    const pos = (id: string) => {
      const t = registry.getTank(id);
      return { x: (t.tier - 1) * COL_W, y: t.treeRow * ROW_H };
    };
    let lines = '';
    for (const t of tanks) {
      for (const pid of t.parents) {
        const a = pos(pid);
        const b = pos(t.id);
        const x1 = a.x + NODE_W;
        const y1 = a.y + NODE_H / 2;
        const x2 = b.x;
        const y2 = b.y + NODE_H / 2;
        const done = prog.isResearched(t.id);
        lines += `<path d="M${x1} ${y1} C ${x1 + 16} ${y1}, ${x2 - 16} ${y2}, ${x2} ${y2}" stroke="${done ? '#8fa3b0' : '#4a555d'}" stroke-width="2" fill="none"/>`;
      }
    }
    const nodes = tanks.map((t) => {
      const st = prog.tankState(t.id);
      const p = pos(t.id);
      const xp = prog.availableXpFor(t.id);
      let action = '';
      if (st === 'researchable') action = `<button class="btn small" data-research="${t.id}" ${xp.total >= t.researchXp ? '' : 'disabled'}>Исследовать <span class="xp">★${formatNumber(t.researchXp)}</span></button>`;
      else if (st === 'researched') action = `<button class="btn small" data-buy="${t.id}" ${prog.data.credits >= t.price ? '' : 'disabled'}>Купить <span class="cr">${formatNumber(t.price)}</span></button>`;
      else if (st === 'owned') action = `<button class="btn small" data-select="${t.id}">В ангар</button>`;
      else action = `<span class="muted">🔒 ★${formatNumber(t.researchXp)}</span>`;
      const xpLine = prog.isResearched(t.id) ? `<span class="xp">★ ${formatNumber(prog.progress(t.id).xp)}</span>` : '';
      return `<div class="tree-node ${st}" style="left:${p.x}px;top:${p.y + 30}px" title="${CLASS_ARCHETYPES[t.cls].role}">
          <div><div class="tn-name">${CLASS_ICONS[t.cls]}${t.name}</div><div class="muted">${CLASS_ARCHETYPES[t.cls].name}${t.premium ? ' · премиум' : ''} ${xpLine}</div></div>
          <div class="tn-actions">${action}</div>
        </div>`;
    }).join('');
    this.root.innerHTML = `
      <div class="overlay-head">
        <h2>Исследования</h2>
        <div class="nation-tabs">${nations.map((n) => `<button data-nation="${n.id}" class="${n.id === this.nation ? 'active' : ''}">${n.name}</button>`).join('')}</div>
        <span style="margin-left:auto" class="cr">⛁ ${formatNumber(prog.data.credits)}</span>
        <span class="xp">★ ${formatNumber(prog.data.freeXp)} свободного</span>
        <button class="btn" data-close>Закрыть</button>
      </div>
      <div class="overlay-body">
        <div class="tree" style="width:${width}px;height:${height + 40}px">
          <div class="tree-tiers">${ROMAN.slice(1).map((r) => `<div>${r}</div>`).join('')}</div>
          <svg width="${width}" height="${height + 40}" style="top:30px">${lines}</svg>
          ${nodes}
        </div>
      </div>`;
    const q = <T extends Element>(s: string) => [...this.root.querySelectorAll<T>(s)];
    q<HTMLElement>('[data-nation]').forEach((b) => b.addEventListener('click', () => {
      this.nation = b.dataset.nation!;
      this.cb.sound('click');
      this.render();
    }));
    q<HTMLElement>('[data-close]').forEach((b) => b.addEventListener('click', () => this.cb.onClose()));
    q<HTMLElement>('[data-research]').forEach((b) => b.addEventListener('click', () => this.act(this.prog.research(b.dataset.research!))));
    q<HTMLElement>('[data-buy]').forEach((b) => b.addEventListener('click', () => {
      const r = this.prog.buy(b.dataset.buy!);
      if (r.ok) this.prog.data.selectedTank = b.dataset.buy!;
      this.act(r);
    }));
    q<HTMLElement>('[data-select]').forEach((b) => b.addEventListener('click', () => {
      this.cb.onSelect(b.dataset.select!);
      this.cb.onClose();
    }));
  }

  private act(r: { ok: boolean; message: string }): void {
    toast(r.message, !r.ok);
    this.cb.sound(r.ok ? 'buy' : 'error');
    if (r.ok) this.cb.onChanged();
    this.render();
  }

  dispose(): void {
    this.root.remove();
  }
}
