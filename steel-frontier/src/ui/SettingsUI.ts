import { DEFAULT_BINDINGS, type InputAction, type Settings } from '../game/SaveSystem';
import { codeLabel, type InputManager } from '../input/InputManager';
import { DIFFICULTIES } from '../sim/ai/AIDifficulty';
import { el, toast } from './dom';

const ACTION_NAMES: Record<InputAction, string> = {
  forward: 'Вперёд', back: 'Назад', left: 'Влево', right: 'Вправо', brake: 'Тормоз', fire: 'Выстрел', sniper: 'Снайперский режим',
  lockTurret: 'Свободный обзор (стоп башни)', zoomIn: 'Приблизить', zoomOut: 'Отдалить', ammo1: 'Снаряд 1', ammo2: 'Снаряд 2', ammo3: 'Снаряд 3',
  repair: 'Ремкомплект', medkit: 'Аптечка', extinguisher: 'Огнетушитель', radioHelp: 'Радио: помогите', radioAttack: 'Радио: в атаку',
  radioRetreat: 'Радио: отходим', radioTarget: 'Радио: атакую цель', scoreboard: 'Таблица команд', pause: 'Меню',
};

export interface SettingsCallbacks {
  onApply(s: Settings): void;
  onClose(): void;
  onExport(): string;
  onImport(data: string): boolean;
  onReset(): void;
}

/** Settings modal: graphics, sound, controls (with key rebinding), battle options, save management. */
export class SettingsUI {
  readonly root: HTMLDivElement;
  private s: Settings;
  private waiting: InputAction | null = null;

  constructor(parent: HTMLElement, settings: Settings, private readonly input: InputManager, private readonly cb: SettingsCallbacks) {
    this.s = structuredClone(settings);
    this.root = el('div', 'modal-wrap');
    parent.appendChild(this.root);
    this.render();
  }

  private render(): void {
    const s = this.s;
    const sel = (key: keyof Settings, opts: Array<[string, string]>) => `<select data-key="${key}">${opts.map(([v, l]) => `<option value="${v}" ${String(s[key]) === v ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
    const range = (key: keyof Settings, min: number, max: number, step: number) => `<input type="range" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${s[key]}">`;
    const check = (key: keyof Settings) => `<input type="checkbox" data-key="${key}" ${s[key] ? 'checked' : ''}>`;
    const row = (label: string, ctrl: string) => `<div class="setting"><span>${label}</span>${ctrl}</div>`;
    const binds = (Object.keys(ACTION_NAMES) as InputAction[]).map((a) => row(ACTION_NAMES[a], `<button class="btn small bind-btn" data-bind="${a}">${this.waiting === a ? '…нажмите клавишу' : (s.bindings[a] ?? []).map(codeLabel).join(' / ') || '—'}</button>`)).join('');
    this.root.innerHTML = `
      <div class="modal panel">
        <h2>Настройки</h2>
        <div class="settings-grid">
          <div>
            <div class="section-title">Графика</div>
            ${row('Качество', sel('graphics', [['low', 'Низкое'], ['medium', 'Среднее'], ['high', 'Высокое'], ['ultra', 'Ультра']]))}
            ${row('Масштаб рендера', range('renderScale', 0.5, 1.25, 0.05))}
            ${row('Тени', check('shadows'))}
            ${row('Поле зрения (FOV)', range('fov', 55, 95, 1))}
            ${row('Показывать FPS', check('showFps'))}
            <div class="section-title">Звук</div>
            ${row('Общая громкость', range('masterVolume', 0, 1, 0.05))}
            ${row('Эффекты', range('sfxVolume', 0, 1, 0.05))}
            ${row('Двигатель', range('engineVolume', 0, 1, 0.05))}
            ${row('Окружение', range('ambientVolume', 0, 1, 0.05))}
            ${row('Голосовые радиофразы', check('voice'))}
            <div class="section-title">Бой</div>
            ${row('Размер команд', sel('teamSize', [['5', '5 × 5'], ['7', '7 × 7'], ['10', '10 × 10'], ['15', '15 × 15']]))}
            ${row('Сложность ботов', sel('difficulty', Object.values(DIFFICULTIES).map((d) => [d.id, d.name])))}
            ${row('Сенсорное управление', sel('touchControls', [['auto', 'Авто'], ['on', 'Вкл'], ['off', 'Выкл']]))}
            <div class="section-title">Мышь и геймпад</div>
            ${row('Чувствительность мыши', range('mouseSensitivity', 0.2, 3, 0.05))}
            ${row('Чувствительность в прицеле', range('sniperSensitivity', 0.1, 2, 0.05))}
            ${row('Чувствительность геймпада', range('gamepadSensitivity', 0.2, 3, 0.05))}
            ${row('Инверсия оси Y', check('invertY'))}
            <div class="section-title">Сохранение</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button class="btn small" data-export>Экспорт</button>
              <button class="btn small" data-import>Импорт</button>
              <button class="btn small danger" data-reset>Сбросить прогресс</button>
            </div>
            <textarea class="save-text" style="width:100%;height:60px;margin-top:6px;background:#111;color:#ccc;border:1px solid #333" placeholder="Строка сохранения"></textarea>
          </div>
          <div>
            <div class="section-title">Клавиши <button class="btn small" data-defaults>По умолчанию</button></div>
            ${binds}
            <div class="muted" style="font-size:12px;margin-top:6px">Геймпад: левый стик — движение, правый — обзор, RT — огонь, LT — прицел, крестовина — снаряды/огнетушитель.</div>
          </div>
        </div>
        <div style="text-align:right;margin-top:14px;display:flex;gap:8px;justify-content:flex-end">
          <button class="btn" data-cancel>Отмена</button>
          <button class="btn primary" data-apply>Применить</button>
        </div>
      </div>`;
    const q = <T extends Element>(sel: string) => [...this.root.querySelectorAll<T>(sel)];
    q<HTMLInputElement | HTMLSelectElement>('[data-key]').forEach((e) => e.addEventListener('change', () => {
      const key = e.dataset.key as keyof Settings;
      const cur = this.s[key];
      let v: unknown;
      if (e instanceof HTMLInputElement && e.type === 'checkbox') v = e.checked;
      else if (typeof cur === 'number') v = Number(e.value);
      else v = e.value;
      (this.s as unknown as Record<string, unknown>)[key] = v;
    }));
    q<HTMLElement>('[data-bind]').forEach((b) => b.addEventListener('click', () => {
      const action = b.dataset.bind as InputAction;
      this.waiting = action;
      this.render();
      this.input.onRawKey = (code) => {
        this.input.onRawKey = null;
        this.waiting = null;
        if (code !== 'Escape') {
          // Remove the code from other actions to avoid conflicts.
          for (const a of Object.keys(this.s.bindings) as InputAction[]) this.s.bindings[a] = this.s.bindings[a].filter((c) => c !== code);
          this.s.bindings[action] = [code, ...(this.s.bindings[action] ?? []).slice(0, 1)];
        }
        this.render();
      };
    }));
    q<HTMLElement>('[data-defaults]').forEach((b) => b.addEventListener('click', () => {
      this.s.bindings = structuredClone(DEFAULT_BINDINGS);
      this.render();
    }));
    const text = this.root.querySelector('.save-text') as HTMLTextAreaElement;
    q<HTMLElement>('[data-export]').forEach((b) => b.addEventListener('click', () => {
      text.value = this.cb.onExport();
      text.select();
      toast('Сохранение экспортировано — скопируйте строку');
    }));
    q<HTMLElement>('[data-import]').forEach((b) => b.addEventListener('click', () => {
      if (this.cb.onImport(text.value)) toast('Сохранение загружено');
      else toast('Строка сохранения повреждена', true);
    }));
    q<HTMLElement>('[data-reset]').forEach((b) => b.addEventListener('click', () => {
      if (confirm('Сбросить весь прогресс?')) this.cb.onReset();
    }));
    q<HTMLElement>('[data-cancel]').forEach((b) => b.addEventListener('click', () => this.close()));
    q<HTMLElement>('[data-apply]').forEach((b) => b.addEventListener('click', () => {
      this.cb.onApply(this.s);
      this.close();
    }));
  }

  private close(): void {
    this.input.onRawKey = null;
    this.root.remove();
    this.cb.onClose();
  }
}
