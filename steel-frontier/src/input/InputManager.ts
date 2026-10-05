import type { InputAction } from '../game/SaveSystem';

/** Standard gamepad mapping → our input codes. */
const PAD_BUTTONS = ['PadA', 'PadB', 'PadX', 'PadY', 'PadLB', 'PadRB', 'PadLT', 'PadRT', 'PadBack', 'PadStart', 'PadLS', 'PadRS', 'PadUp', 'PadDown', 'PadLeft', 'PadRight'];

export const DEFAULT_PAD_BINDINGS: Partial<Record<InputAction, string[]>> = {
  fire: ['PadRT'],
  sniper: ['PadLT'],
  brake: ['PadB'],
  lockTurret: ['PadRS'],
  ammo1: ['PadLeft'],
  ammo2: ['PadUp'],
  ammo3: ['PadRight'],
  repair: ['PadX'],
  medkit: ['PadY'],
  extinguisher: ['PadDown'],
  radioHelp: ['PadLB'],
  radioAttack: ['PadRB'],
  scoreboard: ['PadBack'],
  pause: ['PadStart'],
};

/**
 * Unified input: keyboard, mouse (pointer lock), gamepad and touch feed the same action map and
 * analog axes. Gameplay code only asks for actions and axes, never for devices.
 */
export class InputManager {
  private down = new Set<string>();
  private pressedThisFrame = new Set<string>();
  private wheel = 0;
  private lookDX = 0;
  private lookDY = 0;
  /** Analog axes from gamepad/touch, merged with keys by the player controller. */
  readonly axes = { moveX: 0, moveY: 0, lookX: 0, lookY: 0 };
  readonly touchAxes = { moveX: 0, moveY: 0 };
  private touchLookX = 0;
  private touchLookY = 0;
  private padPrev = new Set<string>();
  bindings: Record<InputAction, string[]>;
  gamepadConnected = false;
  enabled = true;
  /** Fired on raw key code (used by the rebinding UI). */
  onRawKey: ((code: string) => void) | null = null;
  private listeners: Array<[EventTarget, string, EventListener]> = [];

  constructor(private readonly element: HTMLElement, bindings: Record<InputAction, string[]>) {
    this.bindings = bindings;
    this.listen(window, 'keydown', (e) => {
      const ke = e as KeyboardEvent;
      if (this.onRawKey) {
        ke.preventDefault();
        this.onRawKey(ke.code);
        return;
      }
      if (!this.enabled) return;
      if (['Tab', 'Space', 'F2', 'F3', 'F4', 'ArrowUp', 'ArrowDown'].includes(ke.code)) ke.preventDefault();
      if (!this.down.has(ke.code)) this.pressedThisFrame.add(ke.code);
      this.down.add(ke.code);
    });
    this.listen(window, 'keyup', (e) => this.down.delete((e as KeyboardEvent).code));
    this.listen(window, 'blur', () => this.down.clear());
    this.listen(element, 'mousedown', (e) => {
      const me = e as MouseEvent;
      if (this.onRawKey) {
        this.onRawKey(`Mouse${me.button}`);
        return;
      }
      const code = `Mouse${me.button}`;
      if (!this.down.has(code)) this.pressedThisFrame.add(code);
      this.down.add(code);
    });
    this.listen(window, 'mouseup', (e) => this.down.delete(`Mouse${(e as MouseEvent).button}`));
    this.listen(element, 'contextmenu', (e) => e.preventDefault());
    this.listen(window, 'mousemove', (e) => {
      const me = e as MouseEvent;
      // Without pointer lock (iframes, denied permission) the view is dragged with the right button.
      if (document.pointerLockElement === element || this.down.has('Mouse2')) {
        this.lookDX += me.movementX;
        this.lookDY += me.movementY;
      }
    });
    this.listen(element, 'wheel', (e) => {
      const we = e as WheelEvent;
      we.preventDefault();
      this.wheel += we.deltaY < 0 ? 1 : -1;
      this.pressedThisFrame.add(we.deltaY < 0 ? 'WheelUp' : 'WheelDown');
    });
    this.listen(window, 'gamepadconnected', () => (this.gamepadConnected = true));
    this.listen(window, 'gamepaddisconnected', () => (this.gamepadConnected = false));
  }

  private listen(target: EventTarget, type: string, fn: EventListener): void {
    const opts = type === 'wheel' ? { passive: false } : undefined;
    target.addEventListener(type, fn, opts);
    this.listeners.push([target, type, fn]);
  }

  requestPointerLock(): void {
    if (document.pointerLockElement !== this.element && 'requestPointerLock' in this.element) {
      try {
        const r = this.element.requestPointerLock() as unknown;
        if (r instanceof Promise) r.catch(() => {});
      } catch {
        // not allowed (e.g. iframe sandbox) — mouse look degrades to drag.
      }
    }
  }

  exitPointerLock(): void {
    if (document.pointerLockElement) document.exitPointerLock();
  }

  get pointerLocked(): boolean {
    return document.pointerLockElement === this.element;
  }

  isDown(action: InputAction): boolean {
    if (!this.enabled) return false;
    const codes = this.bindings[action] ?? [];
    for (const c of codes) if (this.down.has(c)) return true;
    for (const c of DEFAULT_PAD_BINDINGS[action] ?? []) if (this.down.has(c)) return true;
    return this.down.has(`Touch:${action}`);
  }

  pressed(action: InputAction): boolean {
    if (!this.enabled) return false;
    for (const c of this.bindings[action] ?? []) if (this.pressedThisFrame.has(c)) return true;
    for (const c of DEFAULT_PAD_BINDINGS[action] ?? []) if (this.pressedThisFrame.has(c)) return true;
    return this.pressedThisFrame.has(`Touch:${action}`);
  }

  isRawDown(code: string): boolean {
    return this.down.has(code);
  }

  /** Touch UI uses virtual codes ("Touch:fire" etc.). */
  setVirtual(code: string, isDown: boolean): void {
    if (isDown && !this.down.has(code)) this.pressedThisFrame.add(code);
    if (isDown) this.down.add(code);
    else this.down.delete(code);
  }

  addTouchLook(dx: number, dy: number): void {
    this.touchLookX += dx;
    this.touchLookY += dy;
  }

  addWheel(steps: number): void {
    this.wheel += steps;
  }

  /** Polls the gamepad; call once per frame before reading input. */
  poll(): void {
    const pads = typeof navigator !== 'undefined' && navigator.getGamepads ? navigator.getGamepads() : [];
    const pad = [...pads].find((p) => p && p.connected) ?? null;
    this.axes.moveX = this.touchAxes.moveX;
    this.axes.moveY = this.touchAxes.moveY;
    this.axes.lookX = 0;
    this.axes.lookY = 0;
    const now = new Set<string>();
    if (pad) {
      this.gamepadConnected = true;
      const dz = (v: number) => (Math.abs(v) < 0.15 ? 0 : (v - Math.sign(v) * 0.15) / 0.85);
      if (Math.abs(this.touchAxes.moveX) < 0.01 && Math.abs(this.touchAxes.moveY) < 0.01) {
        this.axes.moveX = dz(pad.axes[0] ?? 0);
        this.axes.moveY = -dz(pad.axes[1] ?? 0);
      }
      this.axes.lookX = dz(pad.axes[2] ?? 0);
      this.axes.lookY = dz(pad.axes[3] ?? 0);
      pad.buttons.forEach((b, i) => {
        if (i < PAD_BUTTONS.length && (b.pressed || b.value > 0.4)) now.add(PAD_BUTTONS[i]);
      });
    }
    for (const c of now) if (!this.padPrev.has(c)) {
      this.pressedThisFrame.add(c);
      this.down.add(c);
    }
    for (const c of this.padPrev) if (!now.has(c)) this.down.delete(c);
    this.padPrev = now;
  }

  consumeLook(): { dx: number; dy: number } {
    const r = { dx: this.lookDX + this.touchLookX, dy: this.lookDY + this.touchLookY };
    this.lookDX = this.lookDY = this.touchLookX = this.touchLookY = 0;
    return r;
  }

  consumeWheel(): number {
    const w = this.wheel;
    this.wheel = 0;
    return w;
  }

  /** Clears edge-triggered state; call at the end of each frame. */
  endFrame(): void {
    this.pressedThisFrame.clear();
  }

  dispose(): void {
    for (const [t, type, fn] of this.listeners) t.removeEventListener(type, fn);
    this.listeners = [];
  }
}

export function codeLabel(code: string): string {
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  const map: Record<string, string> = {
    Mouse0: 'ЛКМ', Mouse1: 'СКМ', Mouse2: 'ПКМ', WheelUp: 'Колесо ↑', WheelDown: 'Колесо ↓', Space: 'Пробел',
    ShiftLeft: 'L-Shift', ShiftRight: 'R-Shift', ControlLeft: 'L-Ctrl', ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→',
    Escape: 'Esc', Tab: 'Tab', Enter: 'Enter', AltLeft: 'L-Alt',
  };
  return map[code] ?? code;
}
