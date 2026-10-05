import { PerspectiveCamera, Vector3 } from 'three';
import { clamp, damp, wrapAngle } from '../core/math';
import { rayHitsTank } from '../sim/ArmorSystem';
import type { Tank } from '../sim/Tank';
import type { World } from '../sim/World';

export type CameraMode = 'orbit' | 'sniper' | 'arty';

const SNIPER_ZOOMS = [2, 4, 8, 16];
const _dir = new Vector3();
const _v = new Vector3();
const _target = new Vector3();

/**
 * Third-person orbit camera with zoom, sniper (gun-sight) mode with magnification steps and a
 * top-down artillery mode. Also performs the crosshair raycast that defines the aim point.
 */
export class CameraController {
  mode: CameraMode = 'orbit';
  yaw = 0;
  pitch = -0.12;
  distance = 13;
  private smoothDistance = 13;
  sniperZoom = 0;
  artyHeight = 180;
  readonly artyTarget = new Vector3();
  readonly aimPoint = new Vector3();
  aimTank: Tank | null = null;
  aimDistance = 0;
  private shake = 0;
  private freeLook = false;
  readonly position = new Vector3();

  constructor(readonly camera: PerspectiveCamera, public baseFov = 70) {}

  reset(tank: Tank): void {
    this.yaw = tank.yaw;
    this.pitch = -0.12;
    this.mode = 'orbit';
    this.distance = 10 + tank.data.hull.dims.length * 0.6;
    this.smoothDistance = this.distance;
    this.artyTarget.copy(tank.position).add(new Vector3(Math.sin(tank.yaw) * 200, 0, Math.cos(tank.yaw) * 200));
  }

  addShake(amount: number): void {
    this.shake = Math.min(1.5, this.shake + amount);
  }

  setFreeLook(on: boolean): void {
    this.freeLook = on;
  }

  get isFreeLook(): boolean {
    return this.freeLook;
  }

  /** Mouse/stick look input in radians-ish units, wheel in steps (+ = zoom in). */
  look(dx: number, dy: number, invertY: boolean): void {
    const k = this.mode === 'sniper' ? 1 / SNIPER_ZOOMS[this.sniperZoom] : 1;
    if (this.mode === 'arty') {
      const s = this.artyHeight * 0.0022;
      const fx = Math.sin(this.yaw);
      const fz = Math.cos(this.yaw);
      // Screen right = world (-cos yaw, sin yaw) given our yaw convention.
      this.artyTarget.x += (-fx * dy * (invertY ? -1 : 1) - Math.cos(this.yaw) * dx) * s;
      this.artyTarget.z += (-fz * dy * (invertY ? -1 : 1) + Math.sin(this.yaw) * dx) * s;
      return;
    }
    this.yaw = wrapAngle(this.yaw - dx * 0.0025 * k);
    this.pitch = clamp(this.pitch - dy * 0.0025 * k * (invertY ? -1 : 1), this.mode === 'sniper' ? -0.5 : -0.75, this.mode === 'sniper' ? 0.45 : 0.4);
  }

  zoom(steps: number, tank: Tank): void {
    if (steps === 0) return;
    if (this.mode === 'orbit') {
      this.distance = clamp(this.distance * Math.pow(0.85, steps), 4.5, 34);
      if (steps > 0 && this.distance <= 4.5 && !tank.isArtillery) this.enterSniper(tank);
    } else if (this.mode === 'sniper') {
      this.sniperZoom = clamp(this.sniperZoom + Math.sign(steps), -1, SNIPER_ZOOMS.length - 1);
      if (this.sniperZoom < 0) {
        this.sniperZoom = 0;
        this.mode = 'orbit';
        this.distance = 7;
      }
    } else {
      this.artyHeight = clamp(this.artyHeight * Math.pow(0.85, steps), 60, 420);
    }
  }

  enterSniper(tank: Tank): void {
    if (tank.isArtillery) {
      this.mode = 'arty';
      this.artyTarget.copy(this.aimPoint);
      return;
    }
    this.mode = 'sniper';
    this.sniperZoom = 0;
  }

  toggleSniper(tank: Tank): void {
    if (this.mode === 'orbit') this.enterSniper(tank);
    else {
      if (this.mode === 'arty') {
        // Look toward where the arty view was aiming.
        _v.subVectors(this.artyTarget, tank.position);
        this.yaw = Math.atan2(_v.x, _v.z);
      }
      this.mode = 'orbit';
    }
  }

  update(dt: number, tank: Tank, renderPos: Vector3, world: World): void {
    const cam = this.camera;
    this.shake = Math.max(0, this.shake - dt * 2.5);
    const sh = this.shake * this.shake;
    if (this.mode === 'orbit') {
      _target.set(renderPos.x, renderPos.y + tank.layout.turretTop + 1.4, renderPos.z);
      this.smoothDistance += (this.distance - this.smoothDistance) * damp(10, dt);
      _dir.set(Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), Math.cos(this.yaw) * Math.cos(this.pitch));
      let d = this.smoothDistance;
      // Keep the camera out of hills: march back from the target.
      const T = world.terrain;
      for (let s = 1; s <= 12; s++) {
        const dd = (d * s) / 12;
        _v.copy(_target).addScaledVector(_dir, -dd);
        if (_v.y < T.heightAt(_v.x, _v.z) + 0.8) {
          d = Math.max(2.5, dd - 1);
          break;
        }
      }
      this.position.copy(_target).addScaledVector(_dir, -d);
      const ground = T.heightAt(this.position.x, this.position.z) + 1;
      if (this.position.y < ground) this.position.y = ground;
      cam.position.copy(this.position);
      cam.lookAt(_v.copy(_target).addScaledVector(_dir, 50));
      cam.fov = this.baseFov;
    } else if (this.mode === 'sniper') {
      tank.gunWorldPosition(this.position);
      this.position.y += 0.35;
      _dir.set(Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), Math.cos(this.yaw) * Math.cos(this.pitch));
      this.position.addScaledVector(_dir, 0.8);
      cam.position.copy(this.position);
      cam.lookAt(_v.copy(this.position).add(_dir));
      cam.fov = this.baseFov / SNIPER_ZOOMS[this.sniperZoom];
    } else {
      const T = world.terrain;
      const lim = T.half - 20;
      this.artyTarget.x = clamp(this.artyTarget.x, -lim, lim);
      this.artyTarget.z = clamp(this.artyTarget.z, -lim, lim);
      this.artyTarget.y = T.heightAt(this.artyTarget.x, this.artyTarget.z);
      const back = this.artyHeight * 0.32;
      this.position.set(this.artyTarget.x - Math.sin(this.yaw) * back, this.artyTarget.y + this.artyHeight, this.artyTarget.z - Math.cos(this.yaw) * back);
      cam.position.copy(this.position);
      cam.lookAt(this.artyTarget);
      cam.fov = 55;
    }
    if (sh > 0) {
      cam.position.x += (Math.random() - 0.5) * sh * 0.4;
      cam.position.y += (Math.random() - 0.5) * sh * 0.4;
      cam.rotation.z += (Math.random() - 0.5) * sh * 0.01;
    }
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld();
    this.computeAim(world, tank);
  }

  /** Crosshair raycast against tanks, statics and terrain. */
  private computeAim(world: World, own: Tank): void {
    if (this.mode === 'arty') {
      this.aimPoint.copy(this.artyTarget);
      this.aimTank = null;
      for (const t of world.tanks) {
        if (t === own || !t.alive) continue;
        if (t.position.distanceTo(this.artyTarget) < 4 && world.detection.isVisibleTo(own, t)) this.aimTank = t;
      }
      this.aimDistance = this.aimPoint.distanceTo(own.position);
      return;
    }
    const origin = this.camera.position;
    this.camera.getWorldDirection(_dir);
    let best = 1500;
    const tg = world.terrain.raycast(origin, _dir, best, 2);
    if (tg >= 0) best = tg;
    const sh = world.statics.raycast(origin, _dir, best, (c) => c.blocksShell);
    if (sh) best = sh.t;
    this.aimTank = null;
    for (const t of world.tanks) {
      if (t === own) continue;
      if (t.team !== own.team && t.alive && !world.detection.isVisibleTo(own, t)) continue;
      const th = rayHitsTank(t, origin, _dir, best);
      if (th >= 0 && th < best) {
        best = th;
        this.aimTank = t;
      }
    }
    this.aimPoint.copy(origin).addScaledVector(_dir, best);
    this.aimDistance = this.aimPoint.distanceTo(own.position);
  }
}
