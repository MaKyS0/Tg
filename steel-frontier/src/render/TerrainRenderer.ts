import {
  BufferAttribute, BufferGeometry, Color, Group, LOD, Mesh, MeshStandardMaterial, PlaneGeometry, SRGBColorSpace, Vector2,
} from 'three';
import { SURFACES, SURFACE_IDS } from '../data/surfaces';
import type { MapInstance } from '../sim/MapBuilder';
import { Noise2D } from '../core/Noise';
import { TextureFactory } from './TextureFactory';

const CHUNK = 125;

/**
 * Chunked heightfield mesh (frustum-culled per chunk) with surface-blended vertex colours,
 * slope/cavity shading and a two-scale detail texture to hide tiling.
 */
export class TerrainRenderer {
  readonly group = new Group();
  readonly material: MeshStandardMaterial;
  readonly water: Mesh | null = null;
  private waterMat: MeshStandardMaterial | null = null;

  constructor(private readonly map: MapInstance, step: number) {
    const detail = TextureFactory.groundDetail();
    const normal = TextureFactory.groundNormal();
    this.material = new MeshStandardMaterial({
      vertexColors: true,
      map: detail,
      normalMap: normal,
      normalScale: new Vector2(0.6, 0.6),
      roughness: 0.95,
      metalness: 0,
    });
    const steep = SURFACES[map.data.biome.steep].color;
    const rockTint = new Color().setRGB(steep[0] * 1.15, steep[1] * 1.12, steep[2] * 1.1, SRGBColorSpace);
    const rockMap = TextureFactory.rock();
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.rockMap = { value: rockMap };
      shader.uniforms.rockTint = { value: rockTint };
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;\nvarying vec3 vWN;')
        .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvWN = normalize(mat3(modelMatrix) * objectNormal);');
      // Multi-scale detail (near / mid / macro) to hide tiling, warm/cool colour patches, and
      // triplanar rock blended in on steep slopes.
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;\nvarying vec3 vWN;\nuniform sampler2D rockMap;\nuniform vec3 rockTint;\nfloat steepW;')
        .replace(
          '#include <map_fragment>',
          `#ifdef USE_MAP
            float camD = length(vWPos - cameraPosition);
            vec3 nearT = texture2D(map, vWPos.xz / 2.7).rgb;
            vec3 midT = texture2D(map, vWPos.xz / 13.0 + 0.31).rgb;
            vec3 macroT = texture2D(map, vWPos.xz / 97.0 + 0.37).rgb;
            float nearW = 1.0 - smoothstep(20.0, 110.0, camD);
            vec3 detail = mix(midT * 1.05, nearT * midT * 1.12, nearW);
            vec3 tint = mix(vec3(1.08, 1.02, 0.84), vec3(0.88, 1.0, 1.0), smoothstep(0.75, 1.05, macroT.r));
            vec3 ground = detail * (0.62 + 0.42 * macroT) * tint * 1.22;
            steepW = smoothstep(0.86, 0.66, vWN.y);
            vec3 an = abs(vWN);
            vec2 ruv = an.x > an.z ? vWPos.zy : vWPos.xy;
            vec3 rock = texture2D(rockMap, ruv / 6.0).rgb * texture2D(rockMap, ruv / 23.0 + 0.5).rgb * 1.5 * rockTint;
            diffuseColor.rgb *= mix(ground, rock, steepW);
          #endif`,
        )
        .replace('#include <color_fragment>', '#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n  diffuseColor.rgb *= mix(vColor.rgb, vec3(1.0), steepW);\n#endif');
    };
    this.build(step);
    const T = map.terrain;
    const hasWater = this.hasWater();
    if (hasWater) {
      const geo = new PlaneGeometry(T.size + 800, T.size + 800, 1, 1);
      geo.rotateX(-Math.PI / 2);
      const wn = TextureFactory.waterNormal().clone();
      wn.needsUpdate = true;
      wn.repeat.set(60, 60);
      this.waterMat = new MeshStandardMaterial({
        color: new Color(map.data.biome.waterColor),
        roughness: 0.08,
        metalness: 0.2,
        normalMap: wn,
        normalScale: new Vector2(0.35, 0.35),
        transparent: true,
        opacity: 0.86,
      });
      const water = new Mesh(geo, this.waterMat);
      water.position.y = T.waterLevel;
      water.receiveShadow = true;
      water.renderOrder = 1;
      (this as { water: Mesh | null }).water = water;
      this.group.add(water);
    }
  }

  private hasWater(): boolean {
    const T = this.map.terrain;
    for (let j = 0; j < T.verts; j += 4)
      for (let i = 0; i < T.verts; i += 4) if (T.heights[j * T.verts + i] < T.waterLevel - 0.2) return true;
    return false;
  }

  /**
   * Samples heights, normals and colours once on a global grid, then cuts it into chunks with up to
   * three LOD levels (coarser vertex strides far from the camera). Skirts hide LOD cracks.
   */
  private build(step: number): void {
    const T = this.map.terrain;
    const noise = new Noise2D(this.map.data.seed + 99);
    const colors = SURFACE_IDS.map((id) => new Color().setRGB(...SURFACES[id].color, SRGBColorSpace));
    const iceColor = new Color().setRGB(0.72, 0.82, 0.9, SRGBColorSpace);
    const tmp = new Color();
    const blend = new Color();
    const N = Math.round(T.size / step) + 1;
    const gx = (i: number) => Math.min(T.half, -T.half + i * step);
    const H = new Float32Array(N * N);
    const C = new Float32Array(N * N * 3);
    const NOR = new Float32Array(N * N * 3);
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const x = gx(i);
        const z = gx(j);
        const h = T.heightAt(x, z);
        const k = j * N + i;
        H[k] = h;
        // Average surface colours of nearby cells for soft transitions.
        blend.setRGB(0, 0, 0);
        let wsum = 0;
        for (const [ox, oz, w] of SAMPLE_OFFSETS) {
          const sIdx = T.surface[T.cellIndex(x + ox * T.cell, z + oz * T.cell)];
          tmp.copy(colors[sIdx]).multiplyScalar(w);
          blend.add(tmp);
          wsum += w;
        }
        blend.multiplyScalar(1 / wsum);
        if (T.isIce(x, z)) blend.copy(iceColor);
        const slope = T.slopeAt(x, z);
        const vari = 0.9 + 0.2 * noise.fbm(x * 0.02, z * 0.02, 3);
        const cavity = (h - (T.heightAt(x + 6, z) + T.heightAt(x - 6, z) + T.heightAt(x, z + 6) + T.heightAt(x, z - 6)) / 4) * 0.04;
        const shade = Math.max(0.55, Math.min(1.2, vari * (1 - Math.min(0.35, slope * 0.25)) + cavity));
        const wet = h < T.waterLevel + 0.6 ? 0.75 : 1;
        C[k * 3] = blend.r * shade * wet;
        C[k * 3 + 1] = blend.g * shade * wet;
        C[k * 3 + 2] = blend.b * shade * wet;
      }
    }
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const hl = H[j * N + Math.max(0, i - 1)];
        const hr = H[j * N + Math.min(N - 1, i + 1)];
        const hd = H[Math.max(0, j - 1) * N + i];
        const hu = H[Math.min(N - 1, j + 1) * N + i];
        const nx = hl - hr;
        const ny = 2 * step;
        const nz = hd - hu;
        const len = Math.hypot(nx, ny, nz);
        const k = (j * N + i) * 3;
        NOR[k] = nx / len;
        NOR[k + 1] = ny / len;
        NOR[k + 2] = nz / len;
      }
    }

    const perChunk = Math.round(CHUNK / step);
    const chunks = Math.ceil((N - 1) / perChunk);
    for (let cj = 0; cj < chunks; cj++) {
      for (let ci = 0; ci < chunks; ci++) {
        const i0 = ci * perChunk;
        const j0 = cj * perChunk;
        const ni = Math.min(perChunk, N - 1 - i0);
        const nj = Math.min(perChunk, N - 1 - j0);
        const cx = (gx(i0) + gx(i0 + ni)) / 2;
        const cz = (gx(j0) + gx(j0 + nj)) / 2;
        let cy = 0;
        for (let j = j0; j <= j0 + nj; j += Math.max(1, nj >> 2)) for (let i = i0; i <= i0 + ni; i += Math.max(1, ni >> 2)) cy = Math.max(cy, H[j * N + i]);
        const lod = new LOD();
        lod.position.set(cx, cy, cz);
        const strides = lodStrides(ni, nj);
        strides.forEach((st, level) => {
          const mesh = new Mesh(this.chunkGeometry(H, C, NOR, N, gx, i0, j0, ni, nj, st, cx, cy, cz), this.material);
          mesh.receiveShadow = true;
          lod.addLevel(mesh, LOD_DISTANCES[level], 25);
        });
        lod.updateMatrix();
        lod.matrixAutoUpdate = false;
        for (const l of lod.levels) {
          l.object.updateMatrix();
          l.object.matrixAutoUpdate = false;
        }
        this.group.add(lod);
      }
    }
  }

  private chunkGeometry(H: Float32Array, C: Float32Array, NOR: Float32Array, N: number, gx: (i: number) => number,
    i0: number, j0: number, ni: number, nj: number, st: number, cx: number, cy: number, cz: number): BufferGeometry {
    const ci = ni / st;
    const cj = nj / st;
    const ring = 2 * (ci + cj);
    const vcount = (ci + 1) * (cj + 1) + ring + 4;
    const pos = new Float32Array(vcount * 3);
    const col = new Float32Array(vcount * 3);
    const nor = new Float32Array(vcount * 3);
    const uv = new Float32Array(vcount * 2);
    let k = 0;
    const put = (gi: number, gj: number, drop: number) => {
      const g = gj * N + gi;
      const x = gx(gi);
      const z = gx(gj);
      pos[k * 3] = x - cx;
      pos[k * 3 + 1] = H[g] - cy - drop;
      pos[k * 3 + 2] = z - cz;
      col[k * 3] = C[g * 3];
      col[k * 3 + 1] = C[g * 3 + 1];
      col[k * 3 + 2] = C[g * 3 + 2];
      nor[k * 3] = NOR[g * 3];
      nor[k * 3 + 1] = NOR[g * 3 + 1];
      nor[k * 3 + 2] = NOR[g * 3 + 2];
      uv[k * 2] = x / 6;
      uv[k * 2 + 1] = z / 6;
      return k++;
    };
    for (let j = 0; j <= cj; j++) for (let i = 0; i <= ci; i++) put(i0 + i * st, j0 + j * st, 0);
    const idx: number[] = [];
    const v = (i: number, j: number) => j * (ci + 1) + i;
    for (let j = 0; j < cj; j++) {
      for (let i = 0; i < ci; i++) {
        const a = v(i, j);
        const b = v(i + 1, j);
        const c = v(i, j + 1);
        const d = v(i + 1, j + 1);
        idx.push(a, c, b, b, c, d);
      }
    }
    // Skirt: walk the border and hang a strip below it (both windings, it is seen from either side).
    const border: Array<[number, number]> = [];
    for (let i = 0; i < ci; i++) border.push([i, 0]);
    for (let j = 0; j < cj; j++) border.push([ci, j]);
    for (let i = ci; i > 0; i--) border.push([i, cj]);
    for (let j = cj; j > 0; j--) border.push([0, j]);
    const drop = 1.5 + st * 0.8;
    const skirt = border.map(([i, j]) => put(i0 + i * st, j0 + j * st, drop));
    for (let e = 0; e < border.length; e++) {
      const n = (e + 1) % border.length;
      const a = v(border[e][0], border[e][1]);
      const b = v(border[n][0], border[n][1]);
      const sa = skirt[e];
      const sb = skirt[n];
      idx.push(a, sa, b, b, sa, sb, a, b, sa, b, sb, sa);
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(pos.subarray(0, k * 3), 3));
    geo.setAttribute('color', new BufferAttribute(col.subarray(0, k * 3), 3));
    geo.setAttribute('normal', new BufferAttribute(nor.subarray(0, k * 3), 3));
    geo.setAttribute('uv', new BufferAttribute(uv.subarray(0, k * 2), 2));
    geo.setIndex(idx);
    geo.computeBoundingSphere();
    return geo;
  }

  update(time: number): void {
    if (this.waterMat?.normalMap) {
      this.waterMat.normalMap.offset.set(time * 0.004, time * 0.0025);
    }
  }

  dispose(): void {
    this.group.traverse((o) => {
      if (o instanceof Mesh) o.geometry.dispose();
    });
    this.material.dispose();
    this.waterMat?.dispose();
  }
}

/** Camera distances (from chunk centre) at which coarser terrain levels take over. */
const LOD_DISTANCES = [0, 190, 420];

/** Vertex strides for a chunk's LOD levels; each must divide both chunk dimensions. */
function lodStrides(ni: number, nj: number): number[] {
  const out = [1];
  for (const s of [2, 4, 5, 7, 10]) {
    if (out.length >= 3) break;
    if (ni % s === 0 && nj % s === 0 && ni / s >= 5 && nj / s >= 5 && s >= out[out.length - 1] * 2) out.push(s);
  }
  return out;
}

const SAMPLE_OFFSETS: Array<[number, number, number]> = [
  [0, 0, 2], [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1.5, 1.5, 0.5], [-1.5, -1.5, 0.5], [1.5, -1.5, 0.5], [-1.5, 1.5, 0.5],
];
