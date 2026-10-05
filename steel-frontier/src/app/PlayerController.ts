import { clamp } from '../core/math';
import type { Settings } from '../game/SaveSystem';
import type { InputManager } from '../input/InputManager';
import type { CameraController } from '../render/CameraController';
import { gridSquare } from '../sim/ai/TeamBrain';
import type { Tank } from '../sim/Tank';
import type { TankController, World } from '../sim/World';

const RADIO_TEXT: Record<string, string> = {
  help: 'Нужна помощь в квадрате {sq}!',
  attack: 'В атаку! За мной!',
  retreat: 'Отходим! Перегруппировка!',
  target: 'Атакую цель в квадрате {sq}!',
};

/** Maps device input + camera aim onto the player's TankInput (same interface as AI). */
export class PlayerController implements TankController {
  private radioCooldown = 0;

  /** Mouse-fire is ignored until the pointer is captured (the first click only grabs the mouse). */
  allowMouseFire = true;

  constructor(readonly tank: Tank, private readonly world: World, private readonly input: InputManager, private readonly camera: CameraController, private settings: Settings) {}

  setSettings(s: Settings): void {
    this.settings = s;
  }

  /** Called once per rendered frame (before simulation steps) to process look/zoom and edge actions. */
  frame(dt: number): void {
    const inp = this.input;
    const cam = this.camera;
    const look = inp.consumeLook();
    const sens = cam.mode === 'sniper' ? this.settings.sniperSensitivity * 2 : this.settings.mouseSensitivity;
    const padSens = this.settings.gamepadSensitivity * 900 * dt;
    cam.look(look.dx * sens + inp.axes.lookX * padSens, look.dy * sens + inp.axes.lookY * padSens * 0.7, this.settings.invertY);
    let wheel = inp.consumeWheel();
    if (inp.pressed('zoomIn') && !inp.bindings.zoomIn.includes('WheelUp')) wheel += 1;
    if (inp.pressed('zoomOut') && !inp.bindings.zoomOut.includes('WheelDown')) wheel -= 1;
    cam.zoom(wheel, this.tank);
    if (inp.pressed('sniper')) cam.toggleSniper(this.tank);
    // Without pointer lock the right button drags the view, so it must not freeze the turret.
    cam.setFreeLook(inp.isDown('lockTurret') && (inp.pointerLocked || !inp.bindings.lockTurret.includes('Mouse2')));

    const t = this.tank.input;
    if (inp.pressed('ammo1')) t.ammoSlot = 0;
    if (inp.pressed('ammo2')) t.ammoSlot = 1;
    if (inp.pressed('ammo3')) t.ammoSlot = 2;
    if (inp.pressed('repair')) t.consumable = 0;
    if (inp.pressed('medkit')) t.consumable = 1;
    if (inp.pressed('extinguisher')) t.consumable = 2;
    this.radioCooldown -= dt;
    for (const [action, kind] of [['radioHelp', 'help'], ['radioAttack', 'attack'], ['radioRetreat', 'retreat'], ['radioTarget', 'target']] as const) {
      if (inp.pressed(action) && this.radioCooldown <= 0) {
        this.radioCooldown = 3;
        const sq = gridSquare(this.world, kind === 'target' ? cam.aimPoint : this.tank.position);
        const text = `${this.tank.callsign}: ${RADIO_TEXT[kind].replace('{sq}', sq)}`;
        this.world.events.emit('radio', { team: this.tank.team, from: this.tank, text, kind });
      }
    }
  }

  update(): void {
    const inp = this.input;
    const t = this.tank.input;
    let throttle = (inp.isDown('forward') ? 1 : 0) - (inp.isDown('back') ? 1 : 0);
    let steer = (inp.isDown('right') ? 1 : 0) - (inp.isDown('left') ? 1 : 0);
    if (Math.abs(inp.axes.moveY) > 0.05) throttle = inp.axes.moveY;
    if (Math.abs(inp.axes.moveX) > 0.05) steer = inp.axes.moveX;
    t.throttle = clamp(throttle, -1, 1);
    t.steer = clamp(steer, -1, 1);
    t.brake = inp.isDown('brake');
    t.fire = inp.isDown('fire') && (this.allowMouseFire || !inp.isRawDown('Mouse0'));
    t.lockTurret = this.camera.isFreeLook;
    t.aimPoint = this.camera.aimPoint.clone();
  }
}
