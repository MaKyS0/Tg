import { Color, Mesh, MeshStandardMaterial, Vector3, type Material } from 'three';
import { lerp, wrapAngle } from '../core/math';
import { SURFACES } from '../data/surfaces';
import type { SurfaceId, NationData } from '../data/types';
import type { Tank } from '../sim/Tank';
import type { Terrain } from '../sim/Terrain';
import type { EffectsSystem } from './EffectsSystem';
import { burntMaterialFor, createTankParts, type TankParts } from './TankMeshFactory';

const _v = new Vector3();
const _v2 = new Vector3();

/** Visual representation of one simulated tank. */
export class TankView {
  readonly parts: TankParts;
  private recoil = 0;
  private burnt = false;
  private turretFlight: { vel: Vector3; spin: Vector3; landed: boolean } | null = null;
  private lastMarkOdo = 0;
  private dustTimer = 0;
  private exhaustTimer = 0;
  private wreckSmoke = 25;
  private originalMaterials = new Map<Mesh, Material>();
  readonly renderPos = new Vector3();
  hidden = false;

  constructor(readonly tank: Tank, nation: NationData, shadows: boolean, private readonly lodDistance = 170) {
    this.parts = createTankParts(tank, nation, shadows);
    for (const m of this.parts.bodyMeshes) this.originalMaterials.set(m, m.material as Material);
  }

  onShot(): void {
    this.recoil = 1;
  }

  /** Detaches the turret and throws it (ammo rack explosion). */
  blowTurret(): void {
    if (this.turretFlight || !this.tank.data.hasTurret) return;
    const t = this.parts.turret;
    t.getWorldPosition(_v);
    t.removeFromParent();
    this.parts.root.parent?.add(t);
    t.position.copy(_v);
    t.quaternion.copy(this.tank.quaternion);
    this.turretFlight = {
      vel: new Vector3((Math.random() - 0.5) * 6, 9 + Math.random() * 5, (Math.random() - 0.5) * 6),
      spin: new Vector3(Math.random() * 3, Math.random() * 4, Math.random() * 3),
      landed: false,
    };
  }

  private applyBurnt(): void {
    if (this.burnt) return;
    this.burnt = true;
    const burnt = burntMaterialFor();
    for (const m of this.parts.bodyMeshes) m.material = burnt;
    for (const m of [this.parts.trackL, this.parts.trackR]) (m.material as MeshStandardMaterial).color = new Color(0.25, 0.23, 0.22);
    for (const c of this.parts.lod.root.children) c.traverse((o) => {
      if (o instanceof Mesh) o.material = burnt;
    });
  }

  update(alpha: number, dt: number, camPos: Vector3, visible: boolean, fx: EffectsSystem, terrain: Terrain, hideOwnInSniper: boolean): void {
    const t = this.tank;
    const p = this.parts;
    this.renderPos.lerpVectors(t.prevPosition, t.position, alpha);
    const show = visible && !hideOwnInSniper;
    this.hidden = !show;
    const dist = this.renderPos.distanceTo(camPos);
    const useLod = dist > this.lodDistance && !this.turretFlight;
    p.root.visible = show && !useLod;
    p.lod.root.visible = show && useLod;
    const turretYaw = lerp(t.prevTurretYaw, t.prevTurretYaw + wrapAngle(t.turretYaw - t.prevTurretYaw), alpha);
    const turretFrame = t.data.hasTurret ? turretYaw : 0;
    const gunFrame = t.data.hasTurret ? 0 : turretYaw;
    for (const r of [p.root, p.lod.root]) {
      r.position.copy(this.renderPos);
      r.quaternion.copy(t.quaternion);
    }
    if (!this.turretFlight) p.turret.rotation.y = turretFrame;
    p.lod.turret.rotation.y = turretFrame;
    p.gun.rotation.set(-t.gunPitch, gunFrame, 0);
    p.lod.gun.rotation.set(-t.gunPitch, gunFrame, 0);
    this.recoil = Math.max(0, this.recoil - dt * 2.2);
    p.barrel.position.z = -Math.sin(Math.min(1, this.recoil) * Math.PI * 0.5) * 0.45 * (this.recoil > 0.7 ? 1 : this.recoil / 0.7);

    // Track animation (texture scroll) at the side speeds.
    const ml = p.trackL.material as MeshStandardMaterial;
    const mr = p.trackR.material as MeshStandardMaterial;
    if (ml.map) ml.map.offset.x -= (t.trackSpeedL * dt) / 0.6;
    if (mr.map) mr.map.offset.x -= (t.trackSpeedR * dt) / 0.6;

    if (!t.alive) this.applyBurnt();

    if (this.turretFlight) {
      const f = this.turretFlight;
      if (!f.landed) {
        f.vel.y -= 9.81 * dt;
        p.turret.position.addScaledVector(f.vel, dt);
        p.turret.rotation.x += f.spin.x * dt;
        p.turret.rotation.y += f.spin.y * dt;
        p.turret.rotation.z += f.spin.z * dt;
        const g = terrain.heightAt(p.turret.position.x, p.turret.position.z);
        if (p.turret.position.y < g + 0.2 && f.vel.y < 0) {
          p.turret.position.y = g + 0.2;
          f.landed = true;
          fx.dust(p.turret.position, new Color(0.4, 0.37, 0.33), 10, 2);
        }
      }
      p.turret.visible = show || dist < 600;
    }

    if (!show || dist > 650) return;
    const surface = SURFACES[t.surface as SurfaceId];
    const speed = Math.abs(t.speedLong);
    // Track marks on soft surfaces.
    if (t.alive && surface?.trackMarks && t.odometer - this.lastMarkOdo > 0.9) {
      this.lastMarkOdo = t.odometer;
      const hw = t.data.hull.dims.width / 2 - t.data.hull.trackWidth / 2;
      const rx = -Math.cos(t.yaw) * hw;
      const rz = Math.sin(t.yaw) * hw;
      const hz = (x: number, z: number) => terrain.heightAt(x, z);
      fx.trackMark(t.position.x + rx, t.position.z + rz, t.yaw, t.data.hull.trackWidth, hz);
      fx.trackMark(t.position.x - rx, t.position.z - rz, t.yaw, t.data.hull.trackWidth, hz);
    }
    // Dust behind moving tanks.
    if (t.alive && surface?.dust && speed > 3) {
      this.dustTimer -= dt * (speed / 6);
      if (this.dustTimer <= 0) {
        this.dustTimer = 0.12;
        const back = t.data.hull.dims.length * 0.5;
        _v.set(t.position.x - Math.sin(t.yaw) * back, t.position.y + 0.3, t.position.z - Math.cos(t.yaw) * back);
        fx.dust(_v, new Color(...surface.dust), 2, 1.2 + speed * 0.06);
      }
    }
    // Exhaust smoke at high RPM.
    if (t.alive && Math.abs(t.input.throttle) > 0.5) {
      this.exhaustTimer -= dt;
      if (this.exhaustTimer <= 0) {
        this.exhaustTimer = 0.25;
        const d = t.data.hull.dims;
        _v2.set(0, d.clearance + d.height, -d.length / 2).applyQuaternion(t.quaternion).add(t.position);
        fx.dust(_v2, new Color(0.2, 0.2, 0.2), 1, 0.7);
      }
    }
    if (t.burning) {
      _v.set(0, t.layout.hullTop + 0.2, -t.data.hull.dims.length * 0.3).applyQuaternion(t.quaternion).add(t.position);
      fx.fire(_v, dt, 1);
    } else if (!t.alive && this.wreckSmoke > 0) {
      this.wreckSmoke -= dt;
      _v.set(0, t.layout.hullTop, 0).applyQuaternion(t.quaternion).add(t.position);
      if (this.wreckSmoke > 18) fx.fire(_v, dt, 0.6);
      else fx.smokeColumn(_v, dt, this.wreckSmoke / 25);
    }
  }

  dispose(): void {
    this.parts.root.removeFromParent();
    this.parts.lod.root.removeFromParent();
    this.parts.turret.removeFromParent();
    (this.parts.trackL.material as MeshStandardMaterial).map?.dispose();
    (this.parts.trackR.material as MeshStandardMaterial).map?.dispose();
    (this.parts.trackL.material as MeshStandardMaterial).dispose();
    (this.parts.trackR.material as MeshStandardMaterial).dispose();
  }
}
