import {
  AmbientLight, Color, DirectionalLight, FogExp2, HemisphereLight, PMREMGenerator, PerspectiveCamera, Scene, Vector3,
  type WebGLRenderer, type Texture,
} from 'three';
import { DEG } from '../core/math';
import { AMMO_KINDS } from '../data/ammo';
import { registry } from '../data/registry';
import { SURFACES } from '../data/surfaces';
import type { SurfaceId } from '../data/types';
import type { Tank } from '../sim/Tank';
import type { World } from '../sim/World';
import { CameraController } from './CameraController';
import { EffectsSystem } from './EffectsSystem';
import { GrassField } from './GrassField';
import { PropRenderer } from './PropRenderer';
import { Sky } from './Sky';
import { TankView } from './TankView';
import { TerrainRenderer } from './TerrainRenderer';
import type { QualityProfile } from './Renderer';

const _v = new Vector3();
const _v2 = new Vector3();

/** Builds and updates every visual of a battle from the simulation state + world events. */
export class BattleScene {
  readonly scene = new Scene();
  readonly camera: PerspectiveCamera;
  readonly cameraCtl: CameraController;
  readonly effects: EffectsSystem;
  readonly views = new Map<number, TankView>();
  private terrain: TerrainRenderer;
  private props: PropRenderer;
  private grass: GrassField | null = null;
  private sky: Sky;
  private sun: DirectionalLight;
  private envMap: Texture | null = null;
  private unsubs: Array<() => void> = [];
  private time = 0;
  private tracerData: Array<{ pos: Vector3; vel: Vector3; color: Color; length: number }> = [];
  private tracerColors = new Map<string, Color>();

  private frameNo = 0;

  constructor(private readonly renderer: WebGLRenderer, private readonly world: World, private readonly player: Tank | null, private readonly quality: QualityProfile, fov: number) {
    const biome = world.map.data.biome;
    this.camera = new PerspectiveCamera(fov, 16 / 9, 0.3, 4200);
    this.cameraCtl = new CameraController(this.camera, fov);
    this.scene.fog = new FogExp2(new Color(biome.sky.fog), biome.sky.fogDensity * quality.fogScale);
    this.scene.background = new Color(biome.sky.fog);

    const sunDir = new Vector3(
      Math.cos(biome.sun.elevation * DEG) * Math.sin(biome.sun.azimuth * DEG),
      Math.sin(biome.sun.elevation * DEG),
      Math.cos(biome.sun.elevation * DEG) * Math.cos(biome.sun.azimuth * DEG),
    );
    this.sky = new Sky(biome.sky.top, biome.sky.horizon, sunDir, biome.sun.color, biome.ambience === 'industry' ? 0.6 : 0.42);
    this.scene.add(this.sky.mesh);

    this.sun = new DirectionalLight(new Color(biome.sun.color), biome.sun.intensity);
    this.sun.position.copy(sunDir).multiplyScalar(300);
    this.sun.castShadow = quality.shadowMapSize > 0;
    if (this.sun.castShadow) {
      this.sun.shadow.mapSize.set(quality.shadowMapSize, quality.shadowMapSize);
      const s = quality.shadowRange;
      Object.assign(this.sun.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: 10, far: 900 });
      this.sun.shadow.bias = -0.0004;
      this.sun.shadow.normalBias = 0.04;
    }
    this.scene.add(this.sun, this.sun.target);
    this.scene.add(new HemisphereLight(new Color(biome.ambient.sky), new Color(biome.ambient.ground), biome.ambient.intensity));
    this.scene.add(new AmbientLight(0xffffff, 0.08));

    // Image-based lighting from the sky for PBR reflections.
    if (quality.environment) {
      const pmrem = new PMREMGenerator(renderer);
      const envScene = new Scene();
      const envSky = new Sky(biome.sky.top, biome.sky.horizon, sunDir, biome.sun.color, 0.3);
      envScene.add(envSky.mesh);
      this.envMap = pmrem.fromScene(envScene, 0.02).texture;
      this.scene.environment = this.envMap;
      this.scene.environmentIntensity = 0.45;
      envSky.dispose();
      pmrem.dispose();
    }

    this.terrain = new TerrainRenderer(world.map, quality.terrainStep);
    this.scene.add(this.terrain.group);
    this.props = new PropRenderer(world.map, { lodDistance: quality.lodDistance, drawDistance: quality.drawDistance, shadows: quality.shadowMapSize > 0 });
    this.scene.add(this.props.group);
    if (quality.grass) {
      this.grass = new GrassField(world.terrain, quality.grass.radius, quality.grass.spacing, quality.shadowMapSize > 0);
      this.scene.add(this.grass.mesh);
    }
    this.effects = new EffectsSystem(this.scene, quality.id);
    // Shadow map refreshed every N frames; the sun (and thus the shadow frustum) moves only then.
    renderer.shadowMap.autoUpdate = quality.shadowInterval <= 1;

    for (const t of world.tanks) this.addTankView(t);
    if (player) this.cameraCtl.reset(player);
    this.bindEvents();
  }

  private addTankView(t: Tank): void {
    const v = new TankView(t, registry.getNation(t.data.nation), this.quality.shadowMapSize > 0, this.quality.tankLod);
    this.scene.add(v.parts.root, v.parts.lod.root);
    this.views.set(t.id, v);
  }

  private bindEvents(): void {
    const ev = this.world.events;
    const fx = this.effects;
    this.unsubs.push(
      ev.on('shot', (e) => {
        fx.muzzleFlash(e.pos, e.dir, e.ammo.caliber);
        this.views.get(e.tank.id)?.onShot();
        if (e.tank === this.player) this.cameraCtl.addShake(0.35 + e.ammo.caliber / 400);
        // Ground blast under the muzzle
        _v.copy(e.pos);
        _v.y = this.world.terrain.heightAt(_v.x, _v.z) + 0.2;
        const surface = SURFACES[this.world.terrain.surfaceAt(_v.x, _v.z)];
        if (surface.dust) fx.dust(_v, new Color(...surface.dust), 6, 2);
      }),
      ev.on('impact', (e) => {
        const he = e.ammo.kind === 'HE';
        const scale = he ? 0.7 + e.ammo.explosionRadius * 0.35 : 0.45;
        if (e.kind === 'water') fx.splash(e.pos, scale + 0.5);
        else {
          const surf = SURFACES[e.surface as SurfaceId];
          fx.explosion(e.pos, scale, e.kind === 'ground' && surf?.dust ? new Color(...surf.dust) : null);
        }
        if (this.player && e.pos.distanceTo(this.player.position) < 25) this.cameraCtl.addShake(0.4);
      }),
      ev.on('hit', (e) => {
        const r = e.result;
        if (r.kind === 'miss') return;
        const view = this.views.get(e.target.id);
        if (r.kind === 'ricochet' || r.kind === 'noPenetration') fx.sparks(r.point, r.normal, r.kind === 'ricochet' ? 18 : 10);
        else fx.explosion(r.point, e.ammo.kind === 'HE' ? 0.9 : 0.5, null);
        if (view && (r.kind === 'penetration' || r.kind === 'heSplash')) {
          const part = r.plate && r.plate.startsWith('turret') ? view.parts.turret : view.parts.hull;
          part.updateMatrixWorld(true);
          const local = part.worldToLocal(r.point.clone());
          const ln = r.normal.clone().transformDirection(part.matrixWorld.clone().invert());
          fx.decal(part, local, ln, 0.35 + e.ammo.caliber / 250);
        }
        if (e.target === this.player) this.cameraCtl.addShake(r.kind === 'penetration' ? 0.8 : 0.4);
      }),
      ev.on('tankDestroyed', (e) => {
        const view = this.views.get(e.tank.id);
        _v.set(0, e.tank.layout.hullTop, 0).applyQuaternion(e.tank.quaternion).add(e.tank.position);
        fx.explosion(_v, e.ammoRack ? 2.4 : 1.4, null);
        if (e.ammoRack) view?.blowTurret();
      }),
      ev.on('destructible', (e) => {
        const kind = e.collider.destructible?.kind;
        const color = kind === 'tree' ? new Color(0.3, 0.42, 0.18) : kind === 'car' ? new Color(0.2, 0.2, 0.2) : new Color(0.45, 0.36, 0.25);
        fx.debris(e.pos, color, kind === 'house' ? 30 : kind === 'tree' ? 8 : 12);
        this.props.onDestroyed(e.collider, e.by ? e.by.position : null);
      }),
      ev.on('ricochet', (e) => fx.sparks(e.pos, e.dir, 8)),
      ev.on('ram', (e) => fx.sparks(e.pos, new Vector3(0, 1, 0), 20)),
    );
  }

  /** Per-frame visual update. `alpha` interpolates between the last two simulation steps. */
  update(dt: number, alpha: number, viewportHeight: number): void {
    this.time += dt;
    const w = this.world;
    const player = this.player;
    const ctl = this.cameraCtl;
    if (player) {
      _v2.lerpVectors(player.prevPosition, player.position, alpha);
      ctl.update(dt, player, _v2, w);
    } else {
      // Spectator: orbit above the map centre.
      this.camera.position.set(Math.sin(this.time * 0.05) * 300, 160, Math.cos(this.time * 0.05) * 300);
      this.camera.lookAt(0, 0, 0);
    }
    const camPos = this.camera.position;
    for (const view of this.views.values()) {
      const t = view.tank;
      const visible = !player || t.team === player.team || w.detection.isVisibleTo(player, t) || (!t.alive && w.detection.wasEverSpotted(player.team, t));
      const hideOwn = t === player && ctl.mode === 'sniper';
      view.update(alpha, dt, camPos, visible, this.effects, w.terrain, hideOwn);
    }
    // Tracers from live projectiles.
    this.tracerData.length = 0;
    for (const s of w.projectiles.active) {
      let color = this.tracerColors.get(s.ammo.kind);
      if (!color) {
        color = new Color(AMMO_KINDS[s.ammo.kind].color).multiplyScalar(2.2);
        this.tracerColors.set(s.ammo.kind, color);
      }
      const speed = s.vel.length();
      this.tracerData.push({ pos: _lerp(s.prev, s.pos, alpha), vel: s.vel, color, length: Math.min(22, speed * 0.025) });
      if (s.ammo.gravityScale > 3 && Math.random() < 0.6) this.effects.artyTrail(s.pos);
    }
    this.effects.setTracers(this.tracerData);
    this.effects.setPixelScale(viewportHeight, this.camera.fov);
    this.effects.update(dt);
    this.terrain.update(this.time);
    this.props.update(dt, camPos);
    this.grass?.update(this.time, camPos);
    this.sky.update(this.time, camPos);
    // Shadow frustum follows the camera focus.
    const interval = this.quality.shadowInterval;
    if (interval <= 1 || this.frameNo++ % interval === 0) {
      const focus = player ? (ctl.mode === 'arty' ? ctl.artyTarget : _v2) : _v.set(0, 0, 0);
      this.sun.target.position.copy(focus);
      this.sun.position.copy(focus).addScaledVector(this.sunDirection(), 400);
      if (interval > 1) this.renderer.shadowMap.needsUpdate = true;
    }
  }

  private sunDirection(): Vector3 {
    const b = this.world.map.data.biome.sun;
    return _sunDir.set(
      Math.cos(b.elevation * DEG) * Math.sin(b.azimuth * DEG),
      Math.sin(b.elevation * DEG),
      Math.cos(b.elevation * DEG) * Math.cos(b.azimuth * DEG),
    );
  }

  setAspect(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  get stats(): { particles: number } {
    return { particles: this.effects.particleCount };
  }

  dispose(): void {
    this.renderer.shadowMap.autoUpdate = true;
    for (const u of this.unsubs) u();
    for (const v of this.views.values()) v.dispose();
    this.terrain.dispose();
    this.props.dispose();
    this.grass?.dispose();
    this.effects.dispose();
    this.sky.dispose();
    this.envMap?.dispose();
    this.scene.clear();
  }
}

const _sunDir = new Vector3();
const _lerpPool: Vector3[] = [];
let _lerpIdx = 0;
function _lerp(a: Vector3, b: Vector3, t: number): Vector3 {
  if (_lerpIdx >= 200) _lerpIdx = 0;
  const v = _lerpPool[_lerpIdx] ?? (_lerpPool[_lerpIdx] = new Vector3());
  _lerpIdx++;
  return v.lerpVectors(a, b, t);
}
