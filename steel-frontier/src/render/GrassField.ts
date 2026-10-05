import {
  BufferGeometry, CanvasTexture, Color, DoubleSide, Float32BufferAttribute, InstancedMesh, Matrix4, MeshLambertMaterial,
  Quaternion, SRGBColorSpace, Vector3,
} from 'three';
import { SURFACES } from '../data/surfaces';
import type { SurfaceId } from '../data/types';
import type { Terrain } from '../sim/Terrain';

const DENSITY: Partial<Record<SurfaceId, number>> = { grass: 1, dirt: 0.22, mud: 0.15 };

function bladeTexture(): CanvasTexture {
  const w = 128;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = w;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, w, w);
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 34; i++) {
    const x = 6 + rnd() * (w - 12);
    const h = w * (0.4 + rnd() * 0.6);
    const lean = (rnd() - 0.5) * 34;
    const bw = 1.6 + rnd() * 2.2;
    const g = ctx.createLinearGradient(0, w, 0, w - h);
    const l = 200 + rnd() * 55;
    g.addColorStop(0, `rgb(${l * 0.72},${l * 0.78},${l * 0.6})`);
    g.addColorStop(1, `rgb(${l},${l},${l * 0.78})`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x - bw, w);
    ctx.quadraticCurveTo(x + lean * 0.3, w - h * 0.6, x + lean, w - h);
    ctx.quadraticCurveTo(x + lean * 0.3 + bw * 0.4, w - h * 0.6, x + bw, w);
    ctx.closePath();
    ctx.fill();
  }
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

function tuftGeometry(): BufferGeometry {
  const pos: number[] = [];
  const uv: number[] = [];
  const nor: number[] = [];
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI;
    const cx = Math.cos(a) * 0.5;
    const cz = Math.sin(a) * 0.5;
    const quad = [[-cx, 0, -cz, 0, 0], [cx, 0, cz, 1, 0], [cx, 1, cz, 1, 1], [-cx, 0, -cz, 0, 0], [cx, 1, cz, 1, 1], [-cx, 1, -cz, 0, 1]];
    for (const [x, y, z, u, v] of quad) {
      pos.push(x, y, z);
      uv.push(u, v);
      nor.push(0, 1, 0);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new Float32BufferAttribute(uv, 2));
  g.setAttribute('normal', new Float32BufferAttribute(nor, 3));
  return g;
}

const _m = new Matrix4();
const _q = new Quaternion();
const _p = new Vector3();
const _s = new Vector3();
const _up = new Vector3(0, 1, 0);
const _c = new Color();

/** Wind-swayed grass tufts scattered on grassy ground around the camera, re-seeded as it moves. */
export class GrassField {
  readonly mesh: InstancedMesh;
  private readonly material: MeshLambertMaterial;
  private readonly uniforms = { time: { value: 0 }, fadeRadius: { value: 60 } };
  private center = new Vector3(1e9, 0, 1e9);
  private readonly base = new Color();

  constructor(private readonly terrain: Terrain, private readonly radius: number, private readonly spacing: number, shadows: boolean) {
    this.uniforms.fadeRadius.value = radius;
    this.material = new MeshLambertMaterial({ map: bladeTexture(), alphaTest: 0.45, side: DoubleSide });
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.time = this.uniforms.time;
      shader.uniforms.fadeRadius = this.uniforms.fadeRadius;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float time;\nuniform float fadeRadius;')
        .replace(
          '#include <begin_vertex>',
          `vec3 transformed = vec3(position);
          vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
          float dist = length(cameraPosition.xz - ip.xz);
          transformed *= smoothstep(fadeRadius, fadeRadius * 0.65, dist);
          float sway = sin(time * 1.8 + ip.x * 0.35 + ip.z * 0.21) + 0.5 * sin(time * 3.1 + ip.z * 0.5);
          transformed.x += sway * 0.09 * uv.y * uv.y;
          transformed.z += sway * 0.05 * uv.y * uv.y;`,
        );
      // Blades are lit like the ground beneath them on both faces (no back-face normal flip).
      shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_begin>', 'float faceDirection = 1.0;\nvec3 normal = normalize( vNormal );\nvec3 nonPerturbedNormal = normal;');
    };
    const n = Math.ceil((2 * radius) / spacing) + 2;
    this.mesh = new InstancedMesh(tuftGeometry(), this.material, n * n);
    this.mesh.setColorAt(0, new Color(1, 1, 1));
    this.mesh.count = 0;
    this.mesh.frustumCulled = false;
    this.mesh.receiveShadow = shadows;
    this.mesh.castShadow = false;
    const g = SURFACES.grass.color;
    this.base.setRGB(g[0], g[1], g[2], SRGBColorSpace);
  }

  private rebuild(cx: number, cz: number): void {
    const T = this.terrain;
    const sp = this.spacing;
    const r = this.radius;
    const i0 = Math.floor((cx - r) / sp);
    const i1 = Math.ceil((cx + r) / sp);
    const j0 = Math.floor((cz - r) / sp);
    const j1 = Math.ceil((cz + r) / sp);
    let k = 0;
    const max = this.mesh.instanceMatrix.count;
    for (let j = j0; j <= j1 && k < max; j++) {
      for (let i = i0; i <= i1 && k < max; i++) {
        let h = Math.imul(i * 73856093 ^ j * 19349663, 2654435761) >>> 0;
        const rnd = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296);
        const x = (i + rnd()) * sp;
        const z = (j + rnd()) * sp;
        const dx = x - cx;
        const dz = z - cz;
        if (dx * dx + dz * dz > r * r) continue;
        if (Math.abs(x) > T.half - 2 || Math.abs(z) > T.half - 2) continue;
        const dens = DENSITY[T.surfaceAt(x, z)] ?? 0;
        if (dens <= 0 || rnd() > dens) continue;
        if (T.slopeAt(x, z) > 0.8) continue;
        const y = T.heightAt(x, z);
        if (y < T.waterLevel + 0.15) continue;
        const sxz = 0.7 + rnd() * 0.6;
        _q.setFromAxisAngle(_up, rnd() * Math.PI);
        _m.compose(_p.set(x, y - 0.05, z), _q, _s.set(sxz, 0.35 + rnd() * 0.4, sxz));
        this.mesh.setMatrixAt(k, _m);
        const v = 0.9 + rnd() * 0.35;
        _c.copy(this.base).multiplyScalar(v * 1.15);
        _c.r *= 0.95 + rnd() * 0.35;
        this.mesh.setColorAt(k, _c);
        k++;
      }
    }
    this.mesh.count = k;
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  update(time: number, camera: Vector3): void {
    this.uniforms.time.value = time;
    if (Math.hypot(camera.x - this.center.x, camera.z - this.center.z) > this.radius * 0.18) {
      this.center.set(camera.x, 0, camera.z);
      this.rebuild(camera.x, camera.z);
    }
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    this.material.map?.dispose();
    this.material.dispose();
    this.mesh.dispose();
  }
}
