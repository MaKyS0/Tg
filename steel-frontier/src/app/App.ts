import { Vector3 } from 'three';
import { AudioSystem } from '../audio/AudioSystem';
import { Random } from '../core/Random';
import { registry } from '../data/registry';
import { MAPS } from '../data/maps';
import { computeRewards } from '../game/Economy';
import { ProgressionSystem } from '../game/ProgressionSystem';
import { LocalStorageAdapter, SaveSystem, type SaveData, type Settings } from '../game/SaveSystem';
import { InputManager } from '../input/InputManager';
import { TouchControls } from '../input/TouchControls';
import { BattleScene } from '../render/BattleScene';
import { GarageScene } from '../render/GarageScene';
import { RendererCore } from '../render/Renderer';
import { createBattle, type Battle } from '../sim/Battle';
import { MapBuilder } from '../sim/MapBuilder';
import { SIM_DT } from '../sim/World';
import type { BattleOutcome } from '../sim/GameMode';
import { GarageUI } from '../ui/GarageUI';
import { HUD } from '../ui/HUD';
import { showResults } from '../ui/ResultsUI';
import { SettingsUI } from '../ui/SettingsUI';
import { TechTreeUI } from '../ui/TechTreeUI';
import { el, toast } from '../ui/dom';
import { PlayerController } from './PlayerController';

type AppState = 'garage' | 'loading' | 'battle';

const TIPS = [
  'Ставьте корпус под углом 25–35° к противнику — приведённая броня растёт, а снаряды чаще рикошетят.',
  'Кусты маскируют, но после выстрела маскировка резко падает на несколько секунд.',
  'Бейте в нижнюю бронедеталь и командирскую башенку — это слабые зоны большинства машин.',
  'Кумулятивные снаряды теряют пробитие после экранов и гусениц.',
  'Фугасы не рикошетят и наносят урон даже без пробития тонкой брони.',
  'Повреждённый двигатель снижает мощность, сбитая гусеница обездвиживает танк — используйте ремкомплект (4).',
  'Лёгкие танки сохраняют маскировку в движении — идеальные разведчики.',
  'Тяжёлые танки могут таранить и сносить деревянные дома, заборы и деревья.',
  'Shift — снайперский режим. У САУ Shift включает навесной (артиллерийский) прицел.',
  'Индикатор прицела зелёный — пробитие вероятно, красный — броня скорее выдержит.',
];

/** Application state machine: garage ↔ loading ↔ battle ↔ results, game loop and persistence. */
export class App {
  private renderer: RendererCore;
  private audio = new AudioSystem();
  private input: InputManager;
  private saves = new SaveSystem(new LocalStorageAdapter());
  private prog: ProgressionSystem;
  private state: AppState = 'garage';
  private garageScene: GarageScene;
  private garageUI: GarageUI | null = null;
  private overlay: { dispose(): void } | null = null;
  private battle: Battle | null = null;
  private battleScene: BattleScene | null = null;
  private hud: HUD | null = null;
  private playerCtl: PlayerController | null = null;
  private touch: TouchControls | null = null;
  private accumulator = 0;
  private lastTime = 0;
  private saveTimer = 0;
  private paused = false;
  private pauseMenu: HTMLDivElement | null = null;
  private battleUnsubs: Array<() => void> = [];
  private endTimer = -1;
  private fastForward = false;
  private dragging = false;
  private lastLockError = -1e9;
  private lastMouse = { x: 0, y: 0 };

  constructor(private readonly canvas: HTMLCanvasElement, private readonly ui: HTMLElement) {
    const loaded = this.saves.load(ProgressionSystem.newProfile);
    this.prog = new ProgressionSystem(loaded.data);
    if (loaded.source === 'backup') setTimeout(() => toast('Основное сохранение повреждено — восстановлено из резервной копии', true), 500);
    const s = this.settings;
    this.renderer = new RendererCore(canvas, s.graphics);
    this.renderer.apply(s.graphics, s.renderScale, s.shadows);
    this.input = new InputManager(canvas, s.bindings);
    this.audio.setVolumes(s.masterVolume, s.sfxVolume, s.engineVolume, s.ambientVolume, s.voice);
    this.garageScene = new GarageScene(this.renderer.renderer);
    window.addEventListener('resize', () => this.renderer.resize());
    const unlock = () => this.audio.unlock();
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    document.addEventListener('pointerlockerror', () => {
      this.lastLockError = performance.now();
      if (this.playerCtl) this.playerCtl.allowMouseFire = true;
    });
    document.addEventListener('pointerlockchange', () => {
      if (this.state === 'battle' && !this.input.pointerLocked && !this.paused && !this.isTouchMode && this.endTimer < 0 && this.battle?.player?.alive) this.openPauseMenu();
    });
    canvas.addEventListener('mousedown', (e) => {
      if (this.state === 'battle' && !this.paused && !this.isTouchMode) {
        if (!this.input.pointerLocked) {
          // The first click only captures the mouse, unless capture keeps failing here (iframes etc.).
          if (this.playerCtl && performance.now() - this.lastLockError > 4000) this.playerCtl.allowMouseFire = false;
          this.input.requestPointerLock();
        }
      } else if (this.state === 'garage') {
        this.dragging = true;
        this.lastMouse = { x: e.clientX, y: e.clientY };
      }
    });
    window.addEventListener('mouseup', () => {
      this.dragging = false;
      if (this.playerCtl) this.playerCtl.allowMouseFire = true;
    });
    window.addEventListener('mousemove', (e) => {
      if (this.state === 'garage' && this.dragging) {
        this.garageScene.drag(e.clientX - this.lastMouse.x, e.clientY - this.lastMouse.y);
        this.lastMouse = { x: e.clientX, y: e.clientY };
      }
    });
    canvas.addEventListener('wheel', (e) => {
      if (this.state === 'garage') this.garageScene.wheel(e.deltaY);
    }, { passive: true });
    canvas.addEventListener('touchmove', (e) => {
      if (this.state !== 'garage' || e.touches.length !== 1) return;
      const t = e.touches[0];
      this.garageScene.drag(t.clientX - this.lastMouse.x, t.clientY - this.lastMouse.y);
      this.lastMouse = { x: t.clientX, y: t.clientY };
    }, { passive: true });
    canvas.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      this.lastMouse = { x: t.clientX, y: t.clientY };
    }, { passive: true });
    window.addEventListener('beforeunload', () => this.save());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.save();
    });
  }

  get settings(): Settings {
    return this.prog.data.settings;
  }

  private get isTouchMode(): boolean {
    const t = this.settings.touchControls;
    return t === 'on' || (t === 'auto' && ('ontouchstart' in window || navigator.maxTouchPoints > 0) && !matchMedia('(pointer: fine)').matches);
  }

  start(): void {
    this.enterGarage();
    this.lastTime = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.1, (t - this.lastTime) / 1000);
      this.lastTime = t;
      this.frame(dt);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private save(): void {
    this.saves.save(this.prog.data);
  }

  private markDirty(): void {
    this.saveTimer = 1.5;
  }

  // ------------------------------------------------------------------ Garage
  private enterGarage(): void {
    this.state = 'garage';
    this.input.exitPointerLock();
    this.garageUI?.dispose();
    this.garageUI = new GarageUI(this.ui, this.prog, {
      onSelectTank: (id) => {
        if (!this.prog.isOwned(id)) return;
        this.prog.data.selectedTank = id;
        this.garageScene.showTank(id, this.prog.loadoutFor(id));
        this.markDirty();
      },
      onBattle: (mode, map) => this.startBattle(mode, map),
      onOpenTree: (nation) => this.openTree(nation),
      onOpenSettings: () => this.openSettings(),
      onChanged: () => {
        this.markDirty();
        this.garageScene.showTank(this.prog.data.selectedTank, this.prog.loadoutFor(this.prog.data.selectedTank));
      },
      sound: (k) => this.audio.ui(k),
    });
    this.garageScene.showTank(this.prog.data.selectedTank, this.prog.loadoutFor(this.prog.data.selectedTank));
  }

  private openTree(nation: string): void {
    this.overlay?.dispose();
    const tree = new TechTreeUI(this.ui, this.prog, nation, {
      onClose: () => {
        tree.dispose();
        this.overlay = null;
        this.garageUI?.render();
        this.garageScene.showTank(this.prog.data.selectedTank, this.prog.loadoutFor(this.prog.data.selectedTank));
      },
      onChanged: () => this.markDirty(),
      onSelect: (id) => {
        this.prog.data.selectedTank = id;
        this.markDirty();
      },
      sound: (k) => this.audio.ui(k),
    });
    this.overlay = tree;
  }

  private openSettings(onClose?: () => void): void {
    new SettingsUI(this.ui, this.settings, this.input, {
      onApply: (s) => this.applySettings(s),
      onClose: () => onClose?.(),
      onExport: () => this.saves.exportString(this.prog.data),
      onImport: (str) => {
        const data = this.saves.importString(str);
        if (!data) return false;
        this.replaceProfile(data);
        return true;
      },
      onReset: () => {
        this.saves.reset();
        this.replaceProfile(ProgressionSystem.newProfile());
      },
    });
  }

  private replaceProfile(data: SaveData): void {
    // Round-trip through storage so imported data is validated and normalised like a normal load.
    this.saves.save(data);
    this.prog.data = this.saves.load(ProgressionSystem.newProfile).data;
    this.applySettings(this.prog.data.settings);
    if (this.state === 'garage') this.enterGarage();
  }

  private applySettings(s: Settings): void {
    this.prog.data.settings = s;
    this.renderer.apply(s.graphics, s.renderScale, s.shadows);
    this.input.bindings = s.bindings;
    this.audio.setVolumes(s.masterVolume, s.sfxVolume, s.engineVolume, s.ambientVolume, s.voice);
    this.playerCtl?.setSettings(s);
    if (this.hud) this.hud.showFps = s.showFps;
    if (this.battleScene) {
      this.battleScene.camera.fov = s.fov;
      this.battleScene.cameraCtl.baseFov = s.fov;
    }
    this.save();
  }

  // ------------------------------------------------------------------ Battle
  private async startBattle(modeId: string, mapChoice: string): Promise<void> {
    if (this.state !== 'garage') return;
    const tankId = this.prog.data.selectedTank;
    const ammoTotal = Object.values(this.prog.progress(tankId).ammo).reduce((a, b) => a + b, 0);
    if (ammoTotal <= 0) {
      toast('Загрузите боекомплект перед боем', true);
      return;
    }
    this.prog.data.lastMode = modeId;
    this.prog.data.lastMap = mapChoice;
    this.save();
    this.state = 'loading';
    this.garageUI?.dispose();
    this.garageUI = null;
    this.overlay?.dispose();
    this.overlay = null;
    const seed = (Date.now() & 0x7fffffff) >>> 0;
    const rng = new Random(seed);
    const mapData = mapChoice === 'random' ? rng.pick(MAPS) : registry.getMap(mapChoice);
    const mode = registry.getMode(modeId);
    const loading = el('div', 'loading');
    loading.innerHTML = `<h1>${mapData.name}</h1><div class="muted">${mode.name} · ${mapData.description}</div><div class="bar"><div></div></div><div class="stage muted"></div><div class="tip">${rng.pick(TIPS)}</div>`;
    this.ui.appendChild(loading);
    const bar = loading.querySelector('.bar > div') as HTMLElement;
    const stage = loading.querySelector('.stage') as HTMLElement;
    const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r, 0)));
    // Asynchronous, staged map generation keeps the UI responsive.
    const builder = new MapBuilder(mapData);
    let k = 0;
    for (const s of builder.steps()) {
      stage.textContent = s;
      bar.style.width = `${(++k / 9) * 100}%`;
      await nextFrame();
    }
    const map = builder.result();
    stage.textContent = 'Подготовка экипажей';
    const battle = createBattle({
      mapId: mapData.id, modeId, teamSize: this.settings.teamSize, difficulty: this.settings.difficulty, seed,
      player: { tankId, loadout: this.prog.loadoutFor(tankId), callsign: 'Вы' },
    }, map);
    bar.style.width = '70%';
    await nextFrame();
    stage.textContent = 'Построение сцены';
    await nextFrame();
    const scene = new BattleScene(this.renderer.renderer, battle.world, battle.player, this.renderer.quality, this.settings.fov);
    scene.setAspect(this.renderer.aspect);
    bar.style.width = '90%';
    await nextFrame();
    // Warm-up render compiles shaders before the countdown starts.
    scene.update(0.016, 1, this.renderer.height);
    this.renderer.renderer.compile(scene.scene, scene.camera);
    bar.style.width = '100%';
    await nextFrame();
    loading.remove();

    this.battle = battle;
    this.battleScene = scene;
    const player = battle.player!;
    this.playerCtl = new PlayerController(player, battle.world, this.input, scene.cameraCtl, this.settings);
    battle.world.controllers.unshift(this.playerCtl);
    this.hud = new HUD(this.ui, battle.world, player, scene.cameraCtl);
    this.hud.showFps = this.settings.showFps;
    if (this.isTouchMode) {
      this.touch = new TouchControls(this.ui, this.input);
      const slots = [...this.hud.root.querySelectorAll<HTMLElement>('.ammo-slot, .cons-slot')];
      this.touch.bindSlots(slots, ['ammo1', 'ammo2', 'ammo3', 'repair', 'medkit', 'extinguisher']);
    }
    this.bindBattleAudio();
    this.audio.setAmbience(mapData.biome.ambience);
    this.accumulator = 0;
    this.endTimer = -1;
    this.paused = false;
    this.fastForward = false;
    this.state = 'battle';
    if (!this.isTouchMode) this.hud.notice('Кликните по экрану, чтобы управлять мышью · Esc — меню', 6000);
  }

  private bindBattleAudio(): void {
    const w = this.battle!.world;
    const player = this.battle!.player!;
    const ear = () => this.battleScene!.camera.position;
    const dist = (p: Vector3) => p.distanceTo(ear());
    this.battleUnsubs.push(
      w.events.on('shot', (e) => this.audio.shot(e.pos, e.ammo.caliber, dist(e.pos), e.tank === player)),
      w.events.on('hit', (e) => {
        if (e.result.kind === 'miss') return;
        this.audio.hit(e.result.point, e.result.kind, dist(e.result.point), e.target === player || e.attacker === player);
        if (e.attacker === player && e.result.kind === 'penetration') this.audio.ui('click');
      }),
      w.events.on('impact', (e) => {
        if (e.ammo.kind === 'HE' || e.ammo.gravityScale > 3) this.audio.explosion(e.pos, e.ammo.explosionRadius, dist(e.pos));
        else this.audio.hit(e.pos, 'ground', dist(e.pos), false);
      }),
      w.events.on('tankDestroyed', (e) => {
        this.audio.explosion(e.tank.position, e.ammoRack ? 3 : 1.5, dist(e.tank.position));
      }),
      w.events.on('moduleChanged', (e) => {
        if (e.tank === player && !e.repaired) this.audio.moduleDamage();
      }),
      w.events.on('destructible', (e) => this.audio.destructible(e.pos, dist(e.pos), e.collider.destructible?.kind ?? '')),
      w.events.on('radio', (e) => {
        if (e.team === player.team) this.audio.radio(e.text);
      }),
      w.events.on('spotted', (e) => {
        if (e.byTeam === player.team && e.first) this.audio.ui('spotted');
      }),
      w.events.on('battleEnd', () => {
        this.endTimer = this.fastForward ? 0.01 : 3.5;
      }),
    );
  }

  private battleFrame(dt: number): void {
    const battle = this.battle!;
    const w = battle.world;
    const scene = this.battleScene!;
    const hud = this.hud!;
    const player = battle.player!;
    if (this.fastForward) {
      // Player left: finish the battle quickly without rendering.
      for (let i = 0; i < 900 && !w.mode.outcome; i++) w.step(SIM_DT);
      if (!w.mode.outcome) return;
    }
    if (!this.paused) {
      this.playerCtl!.frame(dt);
      if (this.input.pressed('pause')) this.openPauseMenu();
      hud.setScoreboard(this.input.isDown('scoreboard'));
      this.accumulator += dt;
      let steps = 0;
      while (this.accumulator >= SIM_DT && steps < 6) {
        w.step(SIM_DT);
        this.accumulator -= SIM_DT;
        steps++;
      }
      if (steps === 6) this.accumulator = 0;
      // Reload-complete click
      if (player.reloadTimer === 0 && this.lastReload > 0) this.audio.reload();
      this.lastReload = player.reloadTimer;
    }
    const alpha = this.accumulator / SIM_DT;
    scene.update(dt, alpha, this.renderer.height);
    const cam = scene.camera;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    hud.update(dt, cam, width, height);
    if (w.frozen) hud.setCenter(String(Math.ceil(w.countdown - w.time)), `${w.mode.data.name}: ${w.mode.data.description}`);
    else if (w.battleTime < 1.5) hud.setCenter('В БОЙ!');
    else if (!w.mode.outcome) hud.setCenter('');
    const fwd = cam.getWorldDirection(new Vector3());
    this.audio.updateListener(cam.position, fwd, cam.up);
    let nearest = null;
    let nd = 90;
    for (const t of w.tanks) {
      if (t === player || !t.alive || Math.abs(t.speedLong) < 0.5) continue;
      const d = t.position.distanceTo(cam.position);
      if (d < nd) {
        nd = d;
        nearest = t;
      }
    }
    this.audio.updateEngines(player, nearest, dt);
    this.audio.updateAmbience(dt);
    this.renderer.render(scene.scene, cam);

    if (w.mode.outcome) {
      const o = w.mode.outcome;
      const title = o.winner === -1 ? 'НИЧЬЯ' : o.winner === player.team ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ';
      hud.setCenter(title, o.reason === 'capture' ? 'База захвачена' : o.reason === 'timeout' ? 'Время вышло' : 'Все противники уничтожены');
      if (this.endTimer > 0) {
        this.endTimer -= dt;
        if (this.endTimer <= 0) this.finishBattle(o);
      }
    }
  }

  private lastReload = 0;

  private finishBattle(outcome: BattleOutcome): void {
    const battle = this.battle!;
    const player = battle.player!;
    const tankId = player.data.id;
    const ammoCost = this.prog.restockCost(tankId, player.battle.shellsUsed);
    const rewards = computeRewards(player, outcome, ammoCost);
    this.prog.applyBattleRewards(tankId, rewards, {
      damage: player.battle.damageDealt, kills: player.battle.kills, spotted: player.battle.spotted, shots: player.battle.shots, hits: player.battle.hits,
    });
    this.save();
    this.input.exitPointerLock();
    this.closePauseMenu();
    showResults(this.ui, battle.world, player, outcome, rewards, () => {
      this.leaveBattle();
      this.enterGarage();
    });
    this.state = 'loading';
  }

  private leaveBattle(): void {
    for (const u of this.battleUnsubs) u();
    this.battleUnsubs = [];
    this.audio.stopBattle();
    this.hud?.dispose();
    this.hud = null;
    this.touch?.dispose();
    this.touch = null;
    this.battleScene?.dispose();
    this.battleScene = null;
    for (const b of this.battle?.brains ?? []) b.dispose();
    this.battle = null;
    this.playerCtl = null;
    this.closePauseMenu();
  }

  private openPauseMenu(): void {
    if (this.pauseMenu || this.state !== 'battle') return;
    this.paused = true;
    this.input.exitPointerLock();
    const wrap = el('div', 'modal-wrap');
    wrap.innerHTML = `<div class="pause-menu panel"><h2 style="margin:0 0 8px">Пауза</h2>
      <button class="btn primary" data-resume>Продолжить бой</button>
      <button class="btn" data-settings>Настройки</button>
      <button class="btn danger" data-leave>Покинуть бой</button>
      <div class="muted" style="font-size:12px">WASD — движение, мышь — обзор, ЛКМ — огонь, Shift — прицел, 1-3 — снаряды, 4-6 — расходники, F2-F4/T — радио, Tab — счёт</div></div>`;
    this.ui.appendChild(wrap);
    this.pauseMenu = wrap;
    wrap.querySelector('[data-resume]')!.addEventListener('click', () => this.resume());
    wrap.querySelector('[data-settings]')!.addEventListener('click', () => this.openSettings());
    wrap.querySelector('[data-leave]')!.addEventListener('click', () => {
      this.closePauseMenu();
      const w = this.battle!.world;
      if (w.mode.outcome) {
        this.finishBattle(w.mode.outcome);
        return;
      }
      // Battle goes on without the player (AI takes over is not allowed — the tank stays idle).
      const p = this.battle!.player!;
      p.input.throttle = 0;
      p.input.fire = false;
      w.controllers.splice(w.controllers.indexOf(this.playerCtl!), 1);
      this.fastForward = true;
      this.paused = false;
      toast('Бой завершается без вас…');
    });
  }

  private resume(): void {
    this.closePauseMenu();
    this.paused = false;
    if (!this.isTouchMode) this.input.requestPointerLock();
  }

  private closePauseMenu(): void {
    this.pauseMenu?.remove();
    this.pauseMenu = null;
  }

  private frame(dt: number): void {
    this.input.poll();
    if (this.saveTimer > 0) {
      this.saveTimer -= dt;
      if (this.saveTimer <= 0) this.save();
    }
    if (this.state === 'garage') {
      this.garageScene.update(dt, this.renderer.aspect);
      this.renderer.render(this.garageScene.scene, this.garageScene.camera);
    } else if (this.state === 'battle' && this.battle) {
      this.battleScene!.setAspect(this.renderer.aspect);
      this.battleFrame(dt);
    } else if (this.state === 'loading' && this.battleScene) {
      // Results screen over the last battle frame.
      this.renderer.render(this.battleScene.scene, this.battleScene.camera);
    }
    this.input.endFrame();
  }
}
