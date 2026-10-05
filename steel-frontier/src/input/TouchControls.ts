import type { InputManager } from './InputManager';

/**
 * On-screen touch controls: virtual joystick (left), camera drag zone (right), action buttons.
 * Buttons emit virtual codes ("Touch:fire") that are bound to actions in PlayerController.
 */
export class TouchControls {
  readonly root: HTMLDivElement;
  private stick: HTMLDivElement;
  private knob: HTMLDivElement;
  private stickId: number | null = null;
  private lookId: number | null = null;
  private lookLast = { x: 0, y: 0 };
  private stickCenter = { x: 0, y: 0 };

  constructor(parent: HTMLElement, private readonly input: InputManager) {
    this.root = document.createElement('div');
    this.root.className = 'touch-layer';
    this.root.innerHTML = `
      <div class="touch-look"></div>
      <div class="touch-stick"><div class="touch-knob"></div></div>
      <div class="touch-buttons">
        <button data-code="Touch:fire" class="tb tb-fire">ОГОНЬ</button>
        <button data-code="Touch:sniper" class="tb tb-sniper">ПРИЦЕЛ</button>
        <button data-code="Touch:zoomIn" class="tb tb-zin">+</button>
        <button data-code="Touch:zoomOut" class="tb tb-zout">−</button>
        <button data-code="Touch:ammo1" class="tb tb-a1">1</button>
        <button data-code="Touch:ammo2" class="tb tb-a2">2</button>
        <button data-code="Touch:ammo3" class="tb tb-a3">3</button>
        <button data-code="Touch:repair" class="tb tb-rep">🔧</button>
        <button data-code="Touch:brake" class="tb tb-brake">СТОП</button>
      </div>`;
    parent.appendChild(this.root);
    this.stick = this.root.querySelector('.touch-stick')!;
    this.knob = this.root.querySelector('.touch-knob')!;
    const look = this.root.querySelector('.touch-look') as HTMLDivElement;

    this.stick.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      this.stickId = t.identifier;
      const r = this.stick.getBoundingClientRect();
      this.stickCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      this.moveStick(t.clientX, t.clientY);
    }, { passive: false });
    look.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      this.lookId = t.identifier;
      this.lookLast = { x: t.clientX, y: t.clientY };
    }, { passive: false });
    window.addEventListener('touchmove', this.onMove, { passive: false });
    window.addEventListener('touchend', this.onEnd);
    window.addEventListener('touchcancel', this.onEnd);
    for (const b of this.root.querySelectorAll<HTMLButtonElement>('button[data-code]')) {
      const code = b.dataset.code!;
      const press = (down: boolean) => (e: Event) => {
        e.preventDefault();
        if (code === 'Touch:zoomIn' && down) this.input.addWheel(1);
        else if (code === 'Touch:zoomOut' && down) this.input.addWheel(-1);
        else this.input.setVirtual(code, down);
        b.classList.toggle('active', down);
      };
      b.addEventListener('touchstart', press(true), { passive: false });
      b.addEventListener('touchend', press(false), { passive: false });
      b.addEventListener('touchcancel', press(false), { passive: false });
    }
  }

  private onMove = (e: TouchEvent): void => {
    for (const t of Array.from(e.changedTouches)) {
      if (t.identifier === this.stickId) {
        e.preventDefault();
        this.moveStick(t.clientX, t.clientY);
      } else if (t.identifier === this.lookId) {
        e.preventDefault();
        this.input.addTouchLook((t.clientX - this.lookLast.x) * 1.6, (t.clientY - this.lookLast.y) * 1.6);
        this.lookLast = { x: t.clientX, y: t.clientY };
      }
    }
  };

  private onEnd = (e: TouchEvent): void => {
    for (const t of Array.from(e.changedTouches)) {
      if (t.identifier === this.stickId) {
        this.stickId = null;
        this.input.touchAxes.moveX = 0;
        this.input.touchAxes.moveY = 0;
        this.knob.style.transform = 'translate(-50%, -50%)';
      } else if (t.identifier === this.lookId) this.lookId = null;
    }
  };

  private moveStick(x: number, y: number): void {
    const R = 55;
    let dx = x - this.stickCenter.x;
    let dy = y - this.stickCenter.y;
    const len = Math.hypot(dx, dy);
    if (len > R) {
      dx = (dx / len) * R;
      dy = (dy / len) * R;
    }
    this.knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    this.input.touchAxes.moveX = dx / R;
    this.input.touchAxes.moveY = -dy / R;
  }

  setVisible(v: boolean): void {
    this.root.style.display = v ? 'block' : 'none';
  }

  dispose(): void {
    window.removeEventListener('touchmove', this.onMove);
    window.removeEventListener('touchend', this.onEnd);
    window.removeEventListener('touchcancel', this.onEnd);
    this.root.remove();
  }
}
