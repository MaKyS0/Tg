import {
  AmbientLight, BoxGeometry, Color, CylinderGeometry, DirectionalLight, Fog, Group, HemisphereLight, Mesh,
  MeshStandardMaterial, PMREMGenerator, PerspectiveCamera, PlaneGeometry, Scene, SpotLight, Vector3, type WebGLRenderer,
} from 'three';
import { registry } from '../data/registry';
import { Tank, type TankLoadout } from '../sim/Tank';
import { createTankParts, type TankParts } from './TankMeshFactory';
import { TextureFactory } from './TextureFactory';
import { Sky } from './Sky';
import { clamp, damp } from '../core/math';

/** Hangar showroom: the selected tank on a turntable with studio lighting and an orbit camera. */
export class GarageScene {
  readonly scene = new Scene();
  readonly camera = new PerspectiveCamera(45, 16 / 9, 0.1, 500);
  private platform: Group;
  private parts: TankParts | null = null;
  private displayTank: Tank | null = null;
  private yaw = 0.7;
  private pitch = 0.22;
  private dist = 13;
  private targetDist = 13;
  private autoRotate = true;
  private time = 0;

  constructor(renderer: WebGLRenderer) {
    this.scene.background = new Color('#1b1f22');
    this.scene.fog = new Fog('#1b1f22', 30, 90);
    const floorTex = TextureFactory.hangarFloor().clone();
    floorTex.needsUpdate = true;
    floorTex.repeat.set(8, 8);
    const floor = new Mesh(new PlaneGeometry(120, 120), new MeshStandardMaterial({ map: floorTex, roughness: 0.75, metalness: 0.1 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);
    const wallMat = new MeshStandardMaterial({ map: TextureFactory.facade('hall'), color: new Color('#5d6468'), roughness: 0.9 });
    for (const [x, z, ry] of [[0, -28, 0], [-30, 0, Math.PI / 2], [30, 0, -Math.PI / 2]] as const) {
      const wall = new Mesh(new BoxGeometry(60, 20, 0.5), wallMat);
      wall.position.set(x, 10, z);
      wall.rotation.y = ry;
      wall.receiveShadow = true;
      this.scene.add(wall);
    }
    // Roof trusses
    const steel = new MeshStandardMaterial({ color: '#3b3f42', metalness: 0.8, roughness: 0.45 });
    for (let i = -3; i <= 3; i++) {
      const beam = new Mesh(new BoxGeometry(60, 0.6, 0.6), steel);
      beam.position.set(0, 16, i * 8);
      this.scene.add(beam);
    }
    this.platform = new Group();
    const disc = new Mesh(new CylinderGeometry(6.2, 6.4, 0.3, 48), new MeshStandardMaterial({ color: '#2d3236', metalness: 0.7, roughness: 0.35 }));
    disc.position.y = 0.15;
    disc.receiveShadow = true;
    const ring = new Mesh(new CylinderGeometry(6.5, 6.5, 0.12, 48), new MeshStandardMaterial({ color: '#c8a64a', metalness: 0.9, roughness: 0.3, emissive: new Color('#3a2a05') }));
    ring.position.y = 0.06;
    this.platform.add(ring, disc);
    this.scene.add(this.platform);

    this.scene.add(new HemisphereLight('#bcd0e0', '#3a352c', 0.8));
    this.scene.add(new AmbientLight('#ffffff', 0.1));
    const key = new DirectionalLight('#fff1dc', 2.2);
    key.position.set(10, 20, 12);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 60 });
    key.shadow.bias = -0.0005;
    this.scene.add(key);
    for (const [x, z, c] of [[-12, 8, '#8fb4ff'], [12, -6, '#ffc58a']] as const) {
      const spot = new SpotLight(c, 300, 60, 0.5, 0.6, 1.6);
      spot.position.set(x, 14, z);
      spot.target.position.set(0, 1, 0);
      this.scene.add(spot, spot.target);
    }
    const pmrem = new PMREMGenerator(renderer);
    const envScene = new Scene();
    const sky = new Sky('#4a5e72', '#a9b6c2', new Vector3(0.5, 0.6, 0.3), '#fff0d8', 0.2);
    envScene.add(sky.mesh);
    this.scene.environment = pmrem.fromScene(envScene, 0.04).texture;
    this.scene.environmentIntensity = 0.6;
    sky.dispose();
    pmrem.dispose();
  }

  showTank(tankId: string, loadout: TankLoadout): void {
    if (this.parts) {
      this.platform.remove(this.parts.root);
      (this.parts.trackL.material as MeshStandardMaterial).dispose();
      (this.parts.trackR.material as MeshStandardMaterial).dispose();
    }
    const data = registry.getTank(tankId);
    const tank = new Tank(data, 0, '', loadout);
    tank.turretYaw = 0.35;
    tank.gunPitch = 0.03;
    this.displayTank = tank;
    this.parts = createTankParts(tank, registry.getNation(data.nation), true);
    this.parts.root.position.y = 0.3;
    this.parts.turret.rotation.y = data.hasTurret ? tank.turretYaw : 0;
    this.parts.gun.rotation.set(-tank.gunPitch, data.hasTurret ? 0 : 0.1, 0);
    this.platform.add(this.parts.root);
    this.targetDist = 6 + data.hull.dims.length * 1.15;
  }

  drag(dx: number, dy: number): void {
    this.autoRotate = false;
    this.yaw -= dx * 0.006;
    this.pitch = clamp(this.pitch + dy * 0.004, 0.02, 0.9);
  }

  wheel(delta: number): void {
    this.targetDist = clamp(this.targetDist * (delta > 0 ? 1.1 : 0.9), 6, 30);
  }

  update(dt: number, aspect: number): void {
    this.time += dt;
    if (this.autoRotate) this.platform.rotation.y += dt * 0.15;
    if (this.displayTank && this.parts) {
      // Gentle idle turret sweep.
      if (this.displayTank.data.hasTurret) this.parts.turret.rotation.y = 0.35 + Math.sin(this.time * 0.3) * 0.25;
    }
    this.dist += (this.targetDist - this.dist) * damp(6, dt);
    const target = new Vector3(0, 1.4, 0);
    this.camera.position.set(Math.sin(this.yaw) * Math.cos(this.pitch) * this.dist, 1.4 + Math.sin(this.pitch) * this.dist, Math.cos(this.yaw) * Math.cos(this.pitch) * this.dist);
    this.camera.lookAt(target);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }
}
