import { Vector3, type PerspectiveCamera } from 'three';
import { AMMO_KINDS } from '../data/ammo';
import { CREW_ROLE_NAMES } from '../data/crew';
import { formatNumber, RAD, ROMAN } from '../core/math';
import { previewShot } from '../sim/ArmorSystem';
import { maxRange, traceTrajectory } from '../sim/Ballistics';
import { rayHitsTank } from '../sim/ArmorSystem';
import { MODULE_NAMES, type ModuleId, type Tank } from '../sim/Tank';
import type { World } from '../sim/World';
import type { CameraController } from '../render/CameraController';
import { Minimap } from './Minimap';
import { el } from './dom';

const MODULE_ORDER: ModuleId[] = ['engine', 'transmission', 'tracks', 'gun', 'turretRing', 'radio', 'ammoRack', 'fuelTank'];
const MODULE_SHORT: Record<ModuleId, string> = {
  engine: 'Двиг.', transmission: 'Трансм.', tracks: 'Гусен.', gun: 'Орудие', turretRing: 'Башня', radio: 'Рация', ammoRack: 'БК', fuelTank: 'Бак',
};
const CLASS_SHORT: Record<string, string> = { LT: 'ЛТ', MT: 'СТ', HT: 'ТТ', TD: 'ПТ', SPG: 'САУ' };

const _v = new Vector3();
const _v2 = new Vector3();
const _gunPoint = new Vector3();
const _seg = new Vector3();

/** In-battle heads-up display (DOM). Cheap parts update every frame; lists update ~8×/s. */
export class HUD {
  readonly root: HTMLDivElement;
  private minimap: Minimap;
  private els: Record<string, HTMLElement> = {};
  private markers = new Map<number, HTMLDivElement>();
  private markerLayer: HTMLDivElement;
  private slowTimer = 0;
  private teamRows = new Map<number, HTMLDivElement>();
  private unsubs: Array<() => void> = [];
  private fpsFrames = 0;
  private fpsTime = 0;
  showFps = false;
  private scoreboardVisible = false;
  private artyReach: number | null = null;

  constructor(parent: HTMLElement, private readonly world: World, private readonly player: Tank, private readonly cam: CameraController) {
    this.minimap = new Minimap(world.map);
    this.root = el('div', 'hud');
    this.root.innerHTML = `
      <div class="scope hidden"></div>
      <div class="zoom-label hidden"></div>
      <div class="markers"></div>
      <div class="score"><span class="num ally">0</span><span class="timer">10:00</span><span class="num enemy">0</span></div>
      <div class="capture"></div>
      <div class="teams left"></div><div class="teams right"></div>
      <div class="kill-feed"></div>
      <div class="radio-log"></div>
      <div class="hit-log"></div>
      <div class="crosshair"><div class="dot"></div></div>
      <div class="gun-marker"><div class="rl"></div></div>
      <div class="aim-info"></div>
      <div class="spotted-lamp">💡</div>
      <div class="notice"></div>
      <div class="center-msg"></div>
      <div class="damage-panel panel">
        <div><b class="dp-name"></b> <span class="muted dp-tier"></span></div>
        <div class="hp-big"><div></div><span></span></div>
        <div class="modules-grid"></div>
        <div class="crew-row"></div>
        <svg class="dir-widget" viewBox="-30 -30 60 60"><circle r="27" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.2)"/>
          <g class="dw-hull"><rect x="-8" y="-14" width="16" height="28" rx="2" fill="#7be366" opacity=".8"/></g>
          <g class="dw-turret"><circle r="5" fill="#fff"/><rect x="-1.2" y="-22" width="2.4" height="18" fill="#fff"/></g>
          <path class="dw-cam" d="M0 0 L-9 -26 A27 27 0 0 1 9 -26 Z" fill="rgba(255,255,255,.18)"/></svg>
      </div>
      <div class="speed"></div>
      <div class="ammo-bar"></div>
      <div class="minimap"></div>
      <div class="scoreboard panel hidden"></div>
      <div class="fps hidden"></div>`;
    parent.appendChild(this.root);
    for (const key of ['score', 'capture', 'kill-feed', 'radio-log', 'hit-log', 'gun-marker', 'aim-info', 'spotted-lamp', 'notice', 'center-msg', 'speed', 'ammo-bar', 'minimap', 'scoreboard', 'fps', 'scope', 'zoom-label', 'markers']) {
      this.els[key] = this.root.querySelector(`.${key}`) as HTMLElement;
    }
    this.markerLayer = this.els.markers as HTMLDivElement;
    this.els.minimap.appendChild(this.minimap.canvas);
    this.buildStatic();
    this.bindEvents();
  }

  private buildStatic(): void {
    const p = this.player;
    (this.root.querySelector('.dp-name') as HTMLElement).textContent = p.data.name;
    (this.root.querySelector('.dp-tier') as HTMLElement).textContent = `${CLASS_SHORT[p.data.cls]} ${ROMAN[p.data.tier]}`;
    const grid = this.root.querySelector('.modules-grid')!;
    for (const id of MODULE_ORDER) grid.appendChild(el('div', `mod mod-${id}`, MODULE_SHORT[id]));
    const crew = this.root.querySelector('.crew-row')!;
    for (const c of p.crew) crew.appendChild(el('span', `c c-${c.role}`, CREW_ROLE_NAMES[c.role].split('-')[0]));
    const ammo = this.els['ammo-bar'];
    p.ammoTypes.forEach((a, i) => {
      const slot = el('div', 'ammo-slot');
      slot.innerHTML = `<span class="k">${i + 1}</span><div class="t" style="color:${AMMO_KINDS[a.kind].color}">${AMMO_KINDS[a.kind].short}</div><div class="n"></div><div class="reload"></div>`;
      slot.title = `${a.name}: пробитие ${a.penetration} мм, урон ${a.damage}`;
      ammo.appendChild(slot);
    });
    ['🔧', '✚', '🧯'].forEach((icon, i) => {
      const c = el('div', 'cons-slot');
      c.innerHTML = `<span class="k">${i + 4}</span>${icon}`;
      ammo.appendChild(c);
    });
    for (const side of ['left', 'right'] as const) {
      const box = this.root.querySelector(`.teams.${side}`)!;
      const team = side === 'left' ? p.team : 1 - p.team;
      for (const t of this.world.tanks.filter((x) => x.team === team)) {
        const row = el('div', `team-row${t === p ? ' me' : ''}`);
        row.innerHTML = `<span>${CLASS_SHORT[t.data.cls]}</span><span>${t.callsign} <span class="muted">${ROMAN[t.data.tier]}</span></span><div class="hpb"><div></div></div>`;
        box.appendChild(row);
        this.teamRows.set(t.id, row);
      }
    }
  }

  private log(container: string, text: string, cls: string, life = 4000, max = 6): void {
    const box = this.els[container];
    const e = el('div', `e ${cls}`, text);
    box.prepend(e);
    while (box.children.length > max) box.lastChild?.remove();
    setTimeout(() => e.remove(), life);
  }

  notice(text: string, ms = 2500): void {
    const n = this.els.notice;
    n.textContent = text;
    clearTimeout((n as unknown as { _t?: number })._t);
    (n as unknown as { _t?: number })._t = window.setTimeout(() => (n.textContent = ''), ms);
  }

  private bindEvents(): void {
    const ev = this.world.events;
    const p = this.player;
    this.unsubs.push(
      ev.on('hit', (e) => {
        const r = e.result;
        if (e.attacker === p && e.target !== p) {
          const map: Record<string, [string, string]> = {
            penetration: [`Пробитие! −${r.damage}`, 'good'],
            heSplash: [r.damage > 0 ? `Фугас: −${r.damage}` : 'Фугас не нанёс урона', r.damage > 0 ? 'good' : 'neutral'],
            ricochet: ['Рикошет', 'neutral'],
            noPenetration: ['Не пробил', 'neutral'],
            critical: ['Критическое попадание', 'good'],
          };
          const m = map[r.kind];
          if (m) this.log('hit-log', m[0], m[1]);
        } else if (e.target === p) {
          const txt = r.kind === 'penetration' || (r.kind === 'heSplash' && r.damage > 0) ? `Получено −${r.damage} от ${e.attacker?.callsign ?? '?'}`
            : r.kind === 'ricochet' ? 'Броня: рикошет' : r.kind === 'noPenetration' ? 'Броня выдержала' : 'Попадание в модуль';
          this.log('hit-log', txt, r.damage > 0 ? 'bad' : 'neutral');
        }
      }),
      ev.on('moduleChanged', (e) => {
        if (e.tank !== p) return;
        if (!e.repaired) this.log('hit-log', `${MODULE_NAMES[e.module]}: ${e.status === 'destroyed' ? 'уничтожен' : 'повреждён'}`, 'bad');
      }),
      ev.on('crewWounded', (e) => {
        if (e.tank === p) this.log('hit-log', `${CREW_ROLE_NAMES[e.role]} ранен`, 'bad');
      }),
      ev.on('fire', (e) => {
        if (e.tank === p && e.burning) this.notice('🔥 ПОЖАР! Нажмите 6 — огнетушитель', 3500);
      }),
      ev.on('tankDestroyed', (e) => {
        const k = e.killer;
        const color = (t: Tank | null) => (t ? (t.team === p.team ? '#9ef08a' : '#ff8b80') : '#ccc');
        const kill = el('div', 'e');
        kill.innerHTML = `<span style="color:${color(k)}">${k?.callsign ?? '—'}</span> ${e.ammoRack ? '💥' : '✖'} <span style="color:${color(e.tank)}">${e.tank.callsign} (${e.tank.data.name})</span>`;
        this.els['kill-feed'].prepend(kill);
        while (this.els['kill-feed'].children.length > 6) this.els['kill-feed'].lastChild?.remove();
        setTimeout(() => kill.remove(), 9000);
        if (k === p) this.notice(`Уничтожен ${e.tank.data.name}!`);
        if (e.tank === p) this.notice('Ваш танк уничтожен', 6000);
      }),
      ev.on('radio', (e) => {
        if (e.team === p.team) this.log('radio-log', `📻 ${e.text}`, '', 6000, 5);
      }),
      ev.on('spotted', (e) => {
        if (e.byTeam === p.team && e.first) this.log('radio-log', `👁 Обнаружен: ${e.tank.data.name}`, '', 4000, 5);
      }),
      ev.on('consumable', (e) => {
        if (e.tank === p) this.notice(['Ремкомплект использован', 'Аптечка использована', 'Огнетушитель использован'][e.index], 1500);
      }),
    );
  }

  setScoreboard(v: boolean): void {
    if (v === this.scoreboardVisible) return;
    this.scoreboardVisible = v;
    this.els.scoreboard.classList.toggle('hidden', !v);
    if (v) this.renderScoreboard();
  }

  private renderScoreboard(): void {
    const p = this.player;
    const table = (team: number) => {
      const rows = this.world.tanks.filter((t) => t.team === team).sort((a, b) => b.battle.damageDealt - a.battle.damageDealt);
      return `<table><tr><th>Игрок</th><th>Танк</th><th>Урон</th><th>Фраги</th><th>HP</th></tr>${rows.map((t) => `<tr style="opacity:${t.alive ? 1 : 0.45}"><td>${t === p ? '<b>' + t.callsign + '</b>' : t.callsign}</td><td>${CLASS_SHORT[t.data.cls]} ${ROMAN[t.data.tier]} ${t.data.name}</td><td>${team === p.team || !t.alive ? t.battle.damageDealt : '?'}</td><td>${team === p.team || !t.alive ? t.battle.kills : '?'}</td><td>${t.alive ? (team === p.team || this.world.detection.isVisibleTo(p, t) ? t.hp : '?') : '—'}</td></tr>`).join('')}</table>`;
    };
    this.els.scoreboard.innerHTML = `<div><h3 style="color:#7be366;margin:0 0 6px">Союзники</h3>${table(p.team)}</div><div><h3 style="color:#ff5a4d;margin:0 0 6px">Противники</h3>${table(1 - p.team)}</div>`;
  }

  setCenter(text: string, sub = ''): void {
    this.els['center-msg'].innerHTML = text ? `${text}${sub ? `<small>${sub}</small>` : ''}` : '';
  }

  update(dt: number, camera: PerspectiveCamera, width: number, height: number): void {
    const w = this.world;
    const p = this.player;
    // FPS counter
    this.fpsFrames++;
    this.fpsTime += dt;
    if (this.fpsTime > 0.5) {
      this.els.fps.textContent = `${Math.round(this.fpsFrames / this.fpsTime)} FPS`;
      this.fpsFrames = 0;
      this.fpsTime = 0;
    }
    this.els.fps.classList.toggle('hidden', !this.showFps);
    const sniper = this.cam.mode === 'sniper';
    this.els.scope.classList.toggle('hidden', !sniper);
    this.els['zoom-label'].classList.toggle('hidden', !sniper);
    if (sniper) this.els['zoom-label'].textContent = `×${[2, 4, 8, 16][this.cam.sniperZoom]}`;

    this.updateGunMarker(camera, width, height);
    this.updateMarkers(camera, width, height);
    this.els['spotted-lamp'].classList.toggle('on', p.alive && w.detection.isSpotted(p));

    // Speed & direction widget
    this.els.speed.innerHTML = `${Math.round(Math.abs(p.speedLong) * 3.6)}<small> км/ч</small>`;
    const hullRel = (p.yaw - this.cam.yaw) * RAD;
    this.root.querySelector('.dw-hull')!.setAttribute('transform', `rotate(${-hullRel})`);
    this.root.querySelector('.dw-turret')!.setAttribute('transform', `rotate(${-(hullRel + p.turretYaw * RAD)})`);

    // Ammo slots & reload
    const slots = this.els['ammo-bar'].children;
    const reloadFrac = p.stats.reload > 0 ? 1 - p.reloadTimer / (p.gun.magazine && p.magazineLeft !== p.gun.magazine.size ? p.gun.magazine.interShot : p.stats.reload) : 1;
    p.ammoTypes.forEach((_, i) => {
      const s = slots[i] as HTMLElement;
      s.classList.toggle('sel', i === p.selectedAmmo);
      (s.querySelector('.n') as HTMLElement).textContent = String(p.ammoCounts[i]);
      (s.querySelector('.reload') as HTMLElement).style.width = i === p.selectedAmmo ? `${Math.max(0, Math.min(1, reloadFrac)) * 100}%` : '0';
    });
    for (let i = 0; i < 3; i++) (slots[p.ammoTypes.length + i] as HTMLElement).classList.toggle('used', p.consumableUsed[i]);

    // HP
    const hpBar = this.root.querySelector('.hp-big > div') as HTMLElement;
    hpBar.style.width = `${(p.hp / p.maxHp) * 100}%`;
    (this.root.querySelector('.hp-big span') as HTMLElement).textContent = `${p.hp} / ${p.maxHp}`;

    this.slowTimer -= dt;
    if (this.slowTimer > 0) return;
    this.slowTimer = 0.12;
    for (const id of MODULE_ORDER) {
      const m = p.modules[id];
      const node = this.root.querySelector(`.mod-${id}`)!;
      node.classList.toggle('damaged', m.status === 'damaged');
      node.classList.toggle('destroyed', m.status === 'destroyed');
    }
    for (const c of p.crew) this.root.querySelector(`.c-${c.role}`)?.classList.toggle('wounded', c.wounded);
    const alive = [0, 0];
    for (const t of w.tanks) if (t.alive) alive[t.team]++;
    const killedEnemies = w.tanks.filter((t) => t.team !== p.team && !t.alive).length;
    const killedAllies = w.tanks.filter((t) => t.team === p.team && !t.alive).length;
    const sc = this.els.score.children;
    sc[0].textContent = String(killedEnemies);
    sc[2].textContent = String(killedAllies);
    const left = w.frozen ? w.mode.data.timeLimit : w.mode.timeLeft;
    sc[1].textContent = `${Math.floor(left / 60)}:${String(Math.floor(left % 60)).padStart(2, '0')}`;
    // Capture bars
    const capHtml = w.mode.bases
      .filter((b) => b.points[0] > 0.5 || b.points[1] > 0.5)
      .map((b) => {
        const team = b.points[0] >= b.points[1] ? 0 : 1;
        const mine = team === p.team;
        return `<div class="cap-label">${mine ? 'Захват базы противника' : 'Захват нашей базы!'} ${Math.floor(b.points[team])}%${b.contested ? ' (заблокирован)' : ''}</div><div class="cap-bar"><div style="width:${b.points[team]}%;background:${mine ? '#7be366' : '#ff5a4d'}"></div></div>`;
      })
      .join('');
    if (this.els.capture.innerHTML !== capHtml) this.els.capture.innerHTML = capHtml;
    for (const t of w.tanks) {
      const row = this.teamRows.get(t.id);
      if (!row) continue;
      row.classList.toggle('dead', !t.alive);
      const known = t.team === p.team || w.detection.isVisibleTo(p, t);
      const bar = row.querySelector('.hpb > div') as HTMLElement;
      bar.style.width = `${known || !t.alive ? (t.hp / t.maxHp) * 100 : 0}%`;
      bar.style.background = t.team === p.team ? '#7be366' : '#ff5a4d';
    }
    this.minimap.draw(w, p, this.cam.yaw);
    if (this.scoreboardVisible) this.renderScoreboard();
  }

  /** Projects the gun's predicted impact point and dispersion circle; colours it by penetration chance. */
  private updateGunMarker(camera: PerspectiveCamera, width: number, height: number): void {
    const p = this.player;
    const w = this.world;
    const marker = this.els['gun-marker'];
    if (!p.alive) {
      marker.style.display = 'none';
      return;
    }
    marker.style.display = 'block';
    const origin = p.muzzlePosition(_v);
    const dir = p.gunDirection(_v2);
    const ammo = p.ammo;
    let hitTank: Tank | null = null;
    let hitDir = new Vector3();
    let hitOrigin = new Vector3();
    let found = false;
    let travelled = 0;
    const seg = _seg;
    traceTrajectory(origin, dir, ammo, ammo.gravityScale > 3 ? 25 : 4, ammo.gravityScale > 3 ? 1 / 15 : 1 / 30, (a, b) => {
      seg.subVectors(b, a);
      const len = seg.length();
      seg.divideScalar(len);
      let best = len;
      const tg = w.terrain.raycast(a, seg, len);
      if (tg >= 0) best = tg;
      const sh = w.statics.raycast(a, seg, best, (c) => c.blocksShell);
      if (sh) best = sh.t;
      for (const t of w.tanks) {
        if (t === p || (t.team !== p.team && t.alive && !w.detection.isVisibleTo(p, t))) continue;
        if (t.position.distanceToSquared(a) > (len + 15) ** 2) continue;
        const th = rayHitsTank(t, a, seg, best);
        if (th >= 0 && th < best) {
          best = th;
          hitTank = t;
          hitDir = seg.clone();
          hitOrigin = a.clone();
        }
      }
      travelled += best;
      if (best < len || hitTank) {
        _gunPoint.copy(a).addScaledVector(seg, best);
        found = true;
        return true;
      }
      return false;
    });
    if (!found) _gunPoint.copy(origin).addScaledVector(dir, 600);
    const proj = _gunPoint.clone().project(camera);
    if (proj.z > 1) {
      marker.style.display = 'none';
      return;
    }
    const sx = ((proj.x + 1) / 2) * width;
    const sy = ((1 - proj.y) / 2) * height;
    const dist = Math.max(5, _gunPoint.distanceTo(camera.position));
    const worldRadius = p.dispersion * Math.max(5, travelled || _gunPoint.distanceTo(origin));
    const pxPerUnit = height / (2 * Math.tan((camera.fov * Math.PI) / 360) * dist);
    const r = Math.max(10, Math.min(height * 0.45, worldRadius * pxPerUnit));
    marker.style.left = `${sx}px`;
    marker.style.top = `${sy}px`;
    marker.style.width = marker.style.height = `${r * 2}px`;
    let cls = '';
    const target = hitTank as Tank | null;
    if (target && target.team !== p.team && target.alive) {
      const v = ammo.velocity * Math.exp(-ammo.dragK * travelled);
      const prev = previewShot(target, hitOrigin, hitDir, 30, ammo, v);
      if (prev.hit) {
        if (prev.ricochet) cls = 'pen-grey';
        else if (ammo.kind === 'HE') cls = prev.penetration >= prev.effective ? 'pen-green' : 'pen-yellow';
        else {
          const ratio = prev.penetration / Math.max(1, prev.effective);
          cls = ratio > 1.12 ? 'pen-green' : ratio > 0.9 ? 'pen-yellow' : 'pen-red';
        }
      }
    }
    marker.className = `gun-marker ${cls}`;
    const rl = marker.querySelector('.rl') as HTMLElement;
    if (p.reloadTimer > 0) rl.textContent = `${p.reloadTimer.toFixed(1)} с`;
    else rl.textContent = p.gun.magazine ? `${p.magazineLeft}/${p.gun.magazine.size}` : '';
    const info = this.els['aim-info'];
    const aimTank = this.cam.aimTank;
    info.textContent = aimTank && aimTank.team !== p.team ? `${aimTank.data.name} · ${Math.round(this.cam.aimDistance)} м` : `${Math.round(this.cam.aimDistance)} м`;
    if (this.cam.mode === 'arty') {
      const reach = this.artyReach ??= maxRange(ammo);
      const horiz = Math.hypot(this.cam.aimPoint.x - p.position.x, this.cam.aimPoint.z - p.position.z);
      info.textContent += horiz > reach ? ' · ВНЕ ДОСЯГАЕМОСТИ' : ` · полёт ≈${(horiz / Math.max(1, ammo.velocity * 0.75)).toFixed(1)} с`;
    }
  }

  private updateMarkers(camera: PerspectiveCamera, width: number, height: number): void {
    const w = this.world;
    const p = this.player;
    const seen = new Set<number>();
    for (const t of w.tanks) {
      if (t === p || !t.alive) continue;
      const ally = t.team === p.team;
      if (!ally && !w.detection.isVisibleTo(p, t)) continue;
      _v.set(t.position.x, t.position.y + t.layout.turretTop + 1.8, t.position.z);
      const d = _v.distanceTo(camera.position);
      if (d > 800) continue;
      const pr = _v.project(camera);
      if (pr.z > 1 || pr.x < -1.1 || pr.x > 1.1 || pr.y < -1.1 || pr.y > 1.1) continue;
      seen.add(t.id);
      let m = this.markers.get(t.id);
      if (!m) {
        m = el('div', `marker ${ally ? 'ally' : 'enemy'}`) as HTMLDivElement;
        m.innerHTML = `<div class="nm">${t.data.name}</div><div class="bar"><div></div></div><div class="tri"></div>`;
        this.markerLayer.appendChild(m);
        this.markers.set(t.id, m);
      }
      m.style.display = 'block';
      m.style.left = `${((pr.x + 1) / 2) * width}px`;
      m.style.top = `${((1 - pr.y) / 2) * height}px`;
      m.style.opacity = d > 400 ? '0.7' : '1';
      const bar = m.firstElementChild!.nextElementSibling!.firstElementChild as HTMLElement;
      bar.style.width = `${(t.hp / t.maxHp) * 100}%`;
      bar.style.background = ally ? '#7be366' : '#ff5a4d';
      (m.firstElementChild as HTMLElement).style.display = d < 250 ? 'block' : 'none';
    }
    for (const [id, m] of this.markers) if (!seen.has(id)) m.style.display = 'none';
  }

  dispose(): void {
    for (const u of this.unsubs) u();
    this.root.remove();
  }

  static formatCredits(n: number): string {
    return formatNumber(n);
  }
}
