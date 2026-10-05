import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Color, DynamicDrawUsage, InstancedMesh, Matrix4, Mesh,
  MeshBasicMaterial, NormalBlending, Object3D, PlaneGeometry, PointLight, Points, Quaternion, Scene, ShaderMaterial,
  Vector3, CylinderGeometry, type Blending,
} from 'three';
import { TextureFactory } from './TextureFactory';

interface ParticleSpec {
  pos: Vector3;
  vel: Vector3;
  life: number;
  size: number;
  grow: number;
  color: Color;
  endColor?: Color;
  alpha: number;
  drag: number;
  gravity: number;
}

const VERT = /* glsl */ `
  attribute float size;
  attribute vec4 rgba;
  varying vec4 vColor;
  uniform float scale;
  #include <fog_pars_vertex>
  void main() {
    vColor = rgba;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * scale / max(0.1, -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;
const FRAG = /* glsl */ `
  uniform sampler2D map;
  varying vec4 vColor;
  #include <common>
  #include <fog_pars_fragment>
  void main() {
    vec4 t = texture2D(map, gl_PointCoord);
    gl_FragColor = vec4(vColor.rgb * t.rgb, vColor.a * t.a);
    if (gl_FragColor.a < 0.004) discard;
    #include <fog_fragment>
  }
`;

/** Fixed-capacity CPU particle pool rendered as a single Points draw call. */
class ParticlePool {
  readonly points: Points;
  private pos: Float32Array;
  private rgba: Float32Array;
  private size: Float32Array;
  private vel: Float32Array;
  private life: Float32Array;
  private maxLife: Float32Array;
  private grow: Float32Array;
  private baseSize: Float32Array;
  private startCol: Float32Array;
  private endCol: Float32Array;
  private alpha: Float32Array;
  private drag: Float32Array;
  private gravity: Float32Array;
  private count = 0;
  private geo: BufferGeometry;
  readonly material: ShaderMaterial;

  constructor(readonly capacity: number, blending: Blending, fog: boolean) {
    this.pos = new Float32Array(capacity * 3);
    this.rgba = new Float32Array(capacity * 4);
    this.size = new Float32Array(capacity);
    this.vel = new Float32Array(capacity * 3);
    this.life = new Float32Array(capacity);
    this.maxLife = new Float32Array(capacity);
    this.grow = new Float32Array(capacity);
    this.baseSize = new Float32Array(capacity);
    this.startCol = new Float32Array(capacity * 3);
    this.endCol = new Float32Array(capacity * 3);
    this.alpha = new Float32Array(capacity);
    this.drag = new Float32Array(capacity);
    this.gravity = new Float32Array(capacity);
    this.geo = new BufferGeometry();
    this.geo.setAttribute('position', new BufferAttribute(this.pos, 3).setUsage(DynamicDrawUsage));
    this.geo.setAttribute('rgba', new BufferAttribute(this.rgba, 4).setUsage(DynamicDrawUsage));
    this.geo.setAttribute('size', new BufferAttribute(this.size, 1).setUsage(DynamicDrawUsage));
    this.geo.setDrawRange(0, 0);
    this.material = new ShaderMaterial({
      uniforms: { map: { value: TextureFactory.softParticle() }, scale: { value: 600 }, fogColor: { value: new Color() }, fogDensity: { value: 0 }, fogNear: { value: 1 }, fogFar: { value: 1000 } },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending,
      fog,
    });
    this.points = new Points(this.geo, this.material);
    this.points.frustumCulled = false;
  }

  spawn(p: ParticleSpec): void {
    if (this.count >= this.capacity) return;
    const i = this.count++;
    this.pos.set([p.pos.x, p.pos.y, p.pos.z], i * 3);
    this.vel.set([p.vel.x, p.vel.y, p.vel.z], i * 3);
    this.life[i] = 0;
    this.maxLife[i] = p.life;
    this.baseSize[i] = p.size;
    this.grow[i] = p.grow;
    this.startCol.set([p.color.r, p.color.g, p.color.b], i * 3);
    const e = p.endColor ?? p.color;
    this.endCol.set([e.r, e.g, e.b], i * 3);
    this.alpha[i] = p.alpha;
    this.drag[i] = p.drag;
    this.gravity[i] = p.gravity;
  }

  private kill(i: number): void {
    const last = --this.count;
    if (i === last) return;
    const copy = (arr: Float32Array, n: number) => arr.copyWithin(i * n, last * n, last * n + n);
    copy(this.pos, 3); copy(this.vel, 3); copy(this.startCol, 3); copy(this.endCol, 3);
    copy(this.life, 1); copy(this.maxLife, 1); copy(this.baseSize, 1); copy(this.grow, 1);
    copy(this.alpha, 1); copy(this.drag, 1); copy(this.gravity, 1);
  }

  update(dt: number): void {
    for (let i = this.count - 1; i >= 0; i--) {
      this.life[i] += dt;
      if (this.life[i] >= this.maxLife[i]) this.kill(i);
    }
    for (let i = 0; i < this.count; i++) {
      const t = this.life[i] / this.maxLife[i];
      const k = Math.max(0, 1 - this.drag[i] * dt);
      this.vel[i * 3] *= k;
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * k - this.gravity[i] * dt;
      this.vel[i * 3 + 2] *= k;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      this.size[i] = this.baseSize[i] * (1 + this.grow[i] * t);
      for (let c = 0; c < 3; c++) this.rgba[i * 4 + c] = this.startCol[i * 3 + c] * (1 - t) + this.endCol[i * 3 + c] * t;
      const fadeIn = Math.min(1, t * 8);
      this.rgba[i * 4 + 3] = this.alpha[i] * fadeIn * (1 - t) * (1 - t * 0.3);
    }
    this.geo.setDrawRange(0, this.count);
    (this.geo.getAttribute('position') as BufferAttribute).needsUpdate = true;
    (this.geo.getAttribute('rgba') as BufferAttribute).needsUpdate = true;
    (this.geo.getAttribute('size') as BufferAttribute).needsUpdate = true;
  }

  get active(): number {
    return this.count;
  }

  dispose(): void {
    this.geo.dispose();
    this.material.dispose();
  }
}

interface Decal {
  mesh: Mesh;
  age: number;
}

const _v = new Vector3();
const _v2 = new Vector3();
const _q = new Quaternion();
const _m = new Matrix4();
const _z = new Vector3(0, 0, 1);

/**
 * Visual effects: pooled smoke/dust/fire/spark particles, instanced tracers, pooled hit decals,
 * ring-buffer track marks and a fixed pool of flash lights (constant light count avoids shader recompiles).
 */
export class EffectsSystem {
  readonly group = new Object3D();
  private smoke: ParticlePool;
  private glow: ParticlePool;
  private tracers: InstancedMesh;
  private decals: Decal[] = [];
  private decalGeo = new PlaneGeometry(1, 1);
  private decalMat = new MeshBasicMaterial({ map: TextureFactory.scorch(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 });
  private lights: Array<{ light: PointLight; t: number; dur: number; peak: number }> = [];
  private marks: TrackMarks;
  private quality: number;

  constructor(scene: Scene, quality: 'low' | 'medium' | 'high' | 'ultra') {
    this.quality = { low: 0.4, medium: 0.7, high: 1, ultra: 1.3 }[quality];
    const cap = Math.round(3500 * this.quality);
    this.smoke = new ParticlePool(cap, NormalBlending, true);
    this.glow = new ParticlePool(Math.round(cap * 0.5), AdditiveBlending, false);
    this.group.add(this.smoke.points, this.glow.points);
    const tracerGeo = new CylinderGeometry(0.06, 0.06, 1, 5, 1, true);
    tracerGeo.rotateX(Math.PI / 2);
    tracerGeo.translate(0, 0, -0.5);
    const tracerMat = new MeshBasicMaterial({ color: 0xffffff, blending: AdditiveBlending, transparent: true, depthWrite: false });
    this.tracers = new InstancedMesh(tracerGeo, tracerMat, 160);
    this.tracers.frustumCulled = false;
    this.tracers.instanceMatrix.setUsage(DynamicDrawUsage);
    this.tracers.count = 0;
    this.group.add(this.tracers);
    for (let i = 0; i < 3; i++) {
      const light = new PointLight(0xffb070, 0, 40, 2);
      this.group.add(light);
      this.lights.push({ light, t: 1, dur: 1, peak: 0 });
    }
    this.marks = new TrackMarks(Math.round(2400 * this.quality));
    this.group.add(this.marks.mesh);
    scene.add(this.group);
  }

  setPixelScale(heightPx: number, fovDeg: number): void {
    const scale = heightPx / (2 * Math.tan((fovDeg * Math.PI) / 360));
    this.smoke.material.uniforms.scale.value = scale;
    this.glow.material.uniforms.scale.value = scale;
  }

  private flash(pos: Vector3, intensity: number, dur: number, color = 0xffb070): void {
    const slot = this.lights.reduce((a, b) => (a.t / a.dur > b.t / b.dur ? a : b));
    slot.light.position.copy(pos);
    slot.light.color.setHex(color);
    slot.t = 0;
    slot.dur = dur;
    slot.peak = intensity;
  }

  private n(count: number): number {
    return Math.max(1, Math.round(count * this.quality));
  }

  muzzleFlash(pos: Vector3, dir: Vector3, caliber: number): void {
    const k = caliber / 100;
    for (let i = 0; i < this.n(6); i++) {
      this.glow.spawn({
        pos: _v.copy(pos).addScaledVector(dir, Math.random() * 1.2 * k), vel: _v2.copy(dir).multiplyScalar(8 + Math.random() * 12),
        life: 0.08 + Math.random() * 0.06, size: (1.6 + Math.random() * 1.2) * k + 0.6, grow: 1, color: new Color(1, 0.75, 0.35), alpha: 1, drag: 4, gravity: 0,
      });
    }
    for (let i = 0; i < this.n(10); i++) {
      const spread = new Vector3((Math.random() - 0.5), (Math.random() - 0.2) * 0.6, (Math.random() - 0.5));
      this.smoke.spawn({
        pos: _v.copy(pos), vel: _v2.copy(dir).multiplyScalar(4 + Math.random() * 6).add(spread.multiplyScalar(4)),
        life: 1.6 + Math.random() * 1.6, size: (1.8 + Math.random()) * k + 1, grow: 3, color: new Color(0.62, 0.6, 0.56), endColor: new Color(0.75, 0.74, 0.7), alpha: 0.45, drag: 1.6, gravity: -0.3,
      });
    }
    this.flash(pos, 30 * k + 10, 0.12);
  }

  explosion(pos: Vector3, scale: number, dirt: Color | null): void {
    for (let i = 0; i < this.n(14 * scale); i++) {
      const v = new Vector3(Math.random() - 0.5, Math.random() * 0.8, Math.random() - 0.5).normalize().multiplyScalar(4 + Math.random() * 8 * scale);
      this.glow.spawn({ pos: _v.copy(pos), vel: v, life: 0.2 + Math.random() * 0.25, size: 2.2 * scale + Math.random(), grow: 1.5, color: new Color(1, 0.6, 0.2), endColor: new Color(0.6, 0.2, 0.05), alpha: 1, drag: 3, gravity: 0 });
    }
    for (let i = 0; i < this.n(16 * scale); i++) {
      const v = new Vector3(Math.random() - 0.5, 0.4 + Math.random(), Math.random() - 0.5).multiplyScalar(3 + Math.random() * 5 * scale);
      const c = dirt ?? new Color(0.25, 0.24, 0.22);
      this.smoke.spawn({ pos: _v.copy(pos), vel: v, life: 1.5 + Math.random() * 2.5, size: 2.5 * scale + Math.random() * 2, grow: 2.5, color: c, endColor: new Color(0.45, 0.44, 0.42), alpha: 0.7, drag: 1.4, gravity: dirt ? 1.5 : -0.4 });
    }
    for (let i = 0; i < this.n(10 * scale); i++) {
      const v = new Vector3(Math.random() - 0.5, Math.random(), Math.random() - 0.5).normalize().multiplyScalar(10 + Math.random() * 15);
      this.glow.spawn({ pos: _v.copy(pos), vel: v, life: 0.4 + Math.random() * 0.5, size: 0.25, grow: 0, color: new Color(1, 0.8, 0.4), alpha: 1, drag: 0.5, gravity: 9 });
    }
    this.flash(pos, 60 * scale, 0.35);
  }

  sparks(pos: Vector3, normal: Vector3, count = 14): void {
    for (let i = 0; i < this.n(count); i++) {
      const v = new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(0.9).add(normal).normalize().multiplyScalar(6 + Math.random() * 14);
      this.glow.spawn({ pos: _v.copy(pos), vel: v, life: 0.25 + Math.random() * 0.35, size: 0.18 + Math.random() * 0.12, grow: 0, color: new Color(1, 0.85, 0.5), alpha: 1, drag: 1, gravity: 9.8 });
    }
    this.flash(pos, 12, 0.08, 0xfff0c0);
  }

  dust(pos: Vector3, color: Color, amount: number, size = 1.5): void {
    for (let i = 0; i < this.n(amount); i++) {
      const v = new Vector3((Math.random() - 0.5) * 2, Math.random() * 1.5, (Math.random() - 0.5) * 2);
      this.smoke.spawn({ pos: _v.copy(pos).add(new Vector3((Math.random() - 0.5) * 1.5, 0, (Math.random() - 0.5) * 1.5)), vel: v, life: 1.2 + Math.random() * 1.5, size: size + Math.random(), grow: 2.2, color, alpha: 0.35, drag: 1.2, gravity: -0.1 });
    }
  }

  splash(pos: Vector3, scale: number): void {
    for (let i = 0; i < this.n(18 * scale); i++) {
      const v = new Vector3((Math.random() - 0.5) * 3, 6 + Math.random() * 8 * scale, (Math.random() - 0.5) * 3);
      this.smoke.spawn({ pos: _v.copy(pos), vel: v, life: 0.9 + Math.random() * 0.6, size: 1 + Math.random() * scale, grow: 1.5, color: new Color(0.85, 0.9, 0.95), alpha: 0.65, drag: 0.6, gravity: 12 });
    }
  }

  debris(pos: Vector3, color: Color, amount: number): void {
    for (let i = 0; i < this.n(amount); i++) {
      const v = new Vector3(Math.random() - 0.5, Math.random() * 1.2, Math.random() - 0.5).multiplyScalar(6 + Math.random() * 6);
      this.smoke.spawn({ pos: _v.copy(pos), vel: v, life: 0.8 + Math.random() * 0.8, size: 0.35 + Math.random() * 0.3, grow: 0, color, alpha: 1, drag: 0.3, gravity: 12 });
    }
    this.dust(pos, color.clone().lerp(new Color(0.6, 0.58, 0.55), 0.5), amount * 0.6, 2.5);
  }

  /** Continuous emitters (called every frame by burning/destroyed tanks). */
  fire(pos: Vector3, dt: number, intensity: number): void {
    if (Math.random() < dt * 40 * intensity * this.quality) {
      this.glow.spawn({ pos: _v.copy(pos).add(new Vector3((Math.random() - 0.5) * 1.2, 0, (Math.random() - 0.5) * 1.2)), vel: new Vector3(0, 2 + Math.random() * 2, 0), life: 0.4 + Math.random() * 0.4, size: 1.4 + Math.random(), grow: -0.3, color: new Color(1, 0.55, 0.15), endColor: new Color(0.7, 0.15, 0.05), alpha: 0.9, drag: 0.5, gravity: -1 });
    }
    this.smokeColumn(pos, dt, intensity);
  }

  smokeColumn(pos: Vector3, dt: number, intensity: number): void {
    if (Math.random() < dt * 14 * intensity * this.quality) {
      this.smoke.spawn({ pos: _v.copy(pos).add(new Vector3((Math.random() - 0.5), 0, (Math.random() - 0.5))), vel: new Vector3((Math.random() - 0.5) * 0.6 + 0.6, 2.5 + Math.random(), (Math.random() - 0.5) * 0.6), life: 4 + Math.random() * 3, size: 2 + Math.random(), grow: 4, color: new Color(0.12, 0.11, 0.1), endColor: new Color(0.35, 0.34, 0.33), alpha: 0.55, drag: 0.15, gravity: -0.15 });
    }
  }

  artyTrail(pos: Vector3): void {
    this.smoke.spawn({ pos: _v.copy(pos), vel: new Vector3(0, 0.3, 0), life: 1.2, size: 0.9, grow: 2, color: new Color(0.7, 0.7, 0.68), alpha: 0.35, drag: 0.5, gravity: 0 });
  }

  /** Pooled scorch/penetration decal attached to a tank part. */
  decal(parent: Object3D, localPos: Vector3, localNormal: Vector3, size: number): void {
    let d: Decal;
    if (this.decals.length < 80) {
      d = { mesh: new Mesh(this.decalGeo, this.decalMat), age: 0 };
      this.decals.push(d);
    } else {
      d = this.decals.reduce((a, b) => (a.age > b.age ? a : b));
    }
    d.age = 0;
    d.mesh.removeFromParent();
    parent.add(d.mesh);
    d.mesh.position.copy(localPos).addScaledVector(localNormal, 0.02);
    d.mesh.quaternion.setFromUnitVectors(_z, localNormal);
    d.mesh.scale.setScalar(size);
  }

  trackMark(x: number, z: number, yaw: number, width: number, heightAt: (x: number, z: number) => number): void {
    this.marks.add(x, z, yaw, width, heightAt);
  }

  /** Writes tracer instances for active shells (interpolated position + velocity direction). */
  setTracers(shells: Array<{ pos: Vector3; vel: Vector3; color: Color; length: number }>): void {
    const n = Math.min(shells.length, 160);
    for (let i = 0; i < n; i++) {
      const s = shells[i];
      _v.copy(s.vel).normalize();
      _q.setFromUnitVectors(_z, _v);
      _m.compose(s.pos, _q, _v2.set(1.4, 1.4, s.length));
      this.tracers.setMatrixAt(i, _m);
      this.tracers.setColorAt(i, s.color);
    }
    this.tracers.count = n;
    this.tracers.instanceMatrix.needsUpdate = true;
    if (this.tracers.instanceColor) this.tracers.instanceColor.needsUpdate = true;
  }

  update(dt: number): void {
    this.smoke.update(dt);
    this.glow.update(dt);
    for (const d of this.decals) d.age += dt;
    for (const l of this.lights) {
      l.t += dt;
      const k = Math.max(0, 1 - l.t / l.dur);
      l.light.intensity = l.peak * k * k;
    }
  }

  get particleCount(): number {
    return this.smoke.active + this.glow.active;
  }

  dispose(): void {
    this.smoke.dispose();
    this.glow.dispose();
    this.tracers.dispose();
    this.decalGeo.dispose();
    this.decalMat.dispose();
    this.marks.dispose();
    this.group.removeFromParent();
  }
}

/** Ring buffer of terrain track print quads in a single mesh. */
class TrackMarks {
  readonly mesh: Mesh;
  private pos: Float32Array;
  private uv: Float32Array;
  private next = 0;
  private geo: BufferGeometry;

  constructor(private readonly capacity: number) {
    this.geo = new BufferGeometry();
    this.pos = new Float32Array(capacity * 6 * 3);
    this.uv = new Float32Array(capacity * 6 * 2);
    this.geo.setAttribute('position', new BufferAttribute(this.pos, 3).setUsage(DynamicDrawUsage));
    this.geo.setAttribute('uv', new BufferAttribute(this.uv, 2));
    const mat = new MeshBasicMaterial({ map: TextureFactory.trackMark(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, opacity: 0.8 });
    this.mesh = new Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 2;
  }

  add(x: number, z: number, yaw: number, width: number, heightAt: (x: number, z: number) => number): void {
    const fx = Math.sin(yaw) * 0.45;
    const fz = Math.cos(yaw) * 0.45;
    const rx = -Math.cos(yaw) * width * 0.5;
    const rz = Math.sin(yaw) * width * 0.5;
    const corners = [
      [x - fx - rx, z - fz - rz], [x - fx + rx, z - fz + rz], [x + fx + rx, z + fz + rz], [x + fx - rx, z + fz - rz],
    ].map(([cx, cz]) => [cx, heightAt(cx, cz) + 0.05, cz]);
    const order = [0, 1, 2, 0, 2, 3];
    const uvs = [[0, 0], [1, 0], [1, 1], [0, 1]];
    const base = this.next * 18;
    order.forEach((ci, k) => {
      this.pos[base + k * 3] = corners[ci][0];
      this.pos[base + k * 3 + 1] = corners[ci][1];
      this.pos[base + k * 3 + 2] = corners[ci][2];
      this.uv[this.next * 12 + k * 2] = uvs[ci][0];
      this.uv[this.next * 12 + k * 2 + 1] = uvs[ci][1];
    });
    this.next = (this.next + 1) % this.capacity;
    (this.geo.getAttribute('position') as BufferAttribute).needsUpdate = true;
    (this.geo.getAttribute('uv') as BufferAttribute).needsUpdate = true;
  }

  dispose(): void {
    this.geo.dispose();
    (this.mesh.material as MeshBasicMaterial).dispose();
  }
}
