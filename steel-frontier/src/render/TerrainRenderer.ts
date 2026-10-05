import {
  BufferAttribute, BufferGeometry, Color, Group, Mesh, MeshStandardMaterial, PlaneGeometry, SRGBColorSpace, Vector2,
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

  private build(step: number): void {
    const T = this.map.terrain;
    const noise = new Noise2D(this.map.data.seed + 99);
    const chunks = Math.ceil(T.size / CHUNK);
    const colors = SURFACE_IDS.map((id) => new Color().setRGB(...SURFACES[id].color, SRGBColorSpace));
    const iceColor = new Color().setRGB(0.72, 0.82, 0.9, SRGBColorSpace);
    const tmp = new Color();
    const blend = new Color();
    for (let cj = 0; cj < chunks; cj++) {
      for (let ci = 0; ci < chunks; ci++) {
        const x0 = -T.half + ci * CHUNK;
        const z0 = -T.half + cj * CHUNK;
        const n = Math.round(CHUNK / step);
        const vcount = (n + 1) * (n + 1);
        const pos = new Float32Array(vcount * 3);
        const col = new Float32Array(vcount * 3);
        const uv = new Float32Array(vcount * 2);
        let k = 0;
        for (let j = 0; j <= n; j++) {
          for (let i = 0; i <= n; i++) {
            const x = Math.min(T.half, x0 + i * step);
            const z = Math.min(T.half, z0 + j * step);
            const h = T.heightAt(x, z);
            pos[k * 3] = x;
            pos[k * 3 + 1] = h;
            pos[k * 3 + 2] = z;
            uv[k * 2] = x / 6;
            uv[k * 2 + 1] = z / 6;
            // Average surface colours of nearby cells for soft transitions.
            blend.setRGB(0, 0, 0);
            let wsum = 0;
            for (const [ox, oz, w] of SAMPLE_OFFSETS) {
              const s = T.surface[T.cellIndex(x + ox * T.cell, z + oz * T.cell)];
              tmp.copy(colors[s]).multiplyScalar(w);
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
            col[k * 3] = blend.r * shade * wet;
            col[k * 3 + 1] = blend.g * shade * wet;
            col[k * 3 + 2] = blend.b * shade * wet;
            k++;
          }
        }
        const idx: number[] = [];
        for (let j = 0; j < n; j++) {
          for (let i = 0; i < n; i++) {
            const a = j * (n + 1) + i;
            const b = a + 1;
            const c = a + (n + 1);
            const d = c + 1;
            idx.push(a, c, b, b, c, d);
          }
        }
        const geo = new BufferGeometry();
        geo.setAttribute('position', new BufferAttribute(pos, 3));
        geo.setAttribute('color', new BufferAttribute(col, 3));
        geo.setAttribute('uv', new BufferAttribute(uv, 2));
        geo.setIndex(idx);
        geo.computeVertexNormals();
        geo.computeBoundingSphere();
        const mesh = new Mesh(geo, this.material);
        mesh.receiveShadow = true;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        this.group.add(mesh);
      }
    }
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

const SAMPLE_OFFSETS: Array<[number, number, number]> = [
  [0, 0, 2], [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1.5, 1.5, 0.5], [-1.5, -1.5, 0.5], [1.5, -1.5, 0.5], [-1.5, 1.5, 0.5],
];
