import {
  BoxGeometry, BufferAttribute, BufferGeometry, Color, ConeGeometry, CylinderGeometry, DodecahedronGeometry, Euler,
  IcosahedronGeometry, Matrix4, MeshStandardMaterial, Quaternion, SRGBColorSpace, Vector3, type MeshStandardMaterialParameters,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Random } from '../core/Random';

/** Normalises a geometry for merging: non-indexed, with position/normal/uv/color attributes. */
export function prep(geo: BufferGeometry, color: Color | string = '#ffffff'): BufferGeometry {
  const g = geo.index ? geo.toNonIndexed() : geo;
  if (!g.getAttribute('normal')) g.computeVertexNormals();
  const count = g.getAttribute('position').count;
  if (!g.getAttribute('uv')) g.setAttribute('uv', new BufferAttribute(new Float32Array(count * 2), 2));
  const c = typeof color === 'string' ? new Color().set(color) : color;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = c.r;
    arr[i * 3 + 1] = c.g;
    arr[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new BufferAttribute(arr, 3));
  for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(name)) g.deleteAttribute(name);
  return g;
}

const _m = new Matrix4();
const _q = new Quaternion();
const _e = new Euler();

export function place(geo: BufferGeometry, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1): BufferGeometry {
  _q.setFromEuler(_e.set(rx, ry, rz));
  _m.compose(new Vector3(x, y, z), _q, new Vector3(sx, sy, sz));
  geo.applyMatrix4(_m);
  return geo;
}

export function merge(parts: BufferGeometry[]): BufferGeometry {
  const g = mergeGeometries(parts, false);
  if (!g) throw new Error('mergeGeometries failed (attribute mismatch)');
  g.computeBoundingSphere();
  g.computeBoundingBox();
  return g;
}

export const geo = {
  box(w: number, h: number, d: number, color: string | Color = '#ffffff'): BufferGeometry {
    return prep(new BoxGeometry(w, h, d), color);
  },
  cyl(rTop: number, rBottom: number, h: number, seg = 10, color: string | Color = '#ffffff'): BufferGeometry {
    return prep(new CylinderGeometry(rTop, rBottom, h, seg), color);
  },
  cone(r: number, h: number, seg = 8, color: string | Color = '#ffffff'): BufferGeometry {
    return prep(new ConeGeometry(r, h, seg), color);
  },
  blob(r: number, detail: number, seed: number, jitter: number, color: string | Color = '#ffffff'): BufferGeometry {
    const g = new IcosahedronGeometry(r, detail);
    jitterVertices(g, seed, jitter);
    g.computeVertexNormals();
    return prep(g, color);
  },
  rock(seed: number): BufferGeometry {
    const g = new DodecahedronGeometry(0.5, 1);
    jitterVertices(g, seed, 0.16);
    g.computeVertexNormals();
    return prep(g, '#ffffff');
  },
};

/** Moves shared vertex positions consistently (keeps the mesh closed). */
function jitterVertices(g: BufferGeometry, seed: number, amount: number): void {
  const pos = g.getAttribute('position');
  const rng = new Random(seed);
  const offsets = new Map<string, Vector3>();
  const v = new Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const key = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
    let o = offsets.get(key);
    if (!o) {
      o = new Vector3(rng.range(-1, 1), rng.range(-1, 1), rng.range(-1, 1)).multiplyScalar(amount);
      offsets.set(key, o);
    }
    v.add(o);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
}

export function srgb(hex: string): Color {
  return new Color().setStyle(hex, SRGBColorSpace);
}

/**
 * Standard material whose diffuse map is sampled in world space (box projection), so instanced
 * props of any size get correctly scaled textures. Upward faces use `roofColor`.
 */
export function worldUvMaterial(params: MeshStandardMaterialParameters, texScale: number, roofColor?: Color): MeshStandardMaterial {
  const mat = new MeshStandardMaterial(params);
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.texScale = { value: texScale };
    shader.uniforms.roofColor = { value: roofColor ?? new Color(0.3, 0.28, 0.26) };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;\nvarying vec3 vWNormal;')
      .replace(
        '#include <project_vertex>',
        `#include <project_vertex>
        vec4 wpos = vec4(transformed, 1.0);
        vec3 wn = objectNormal;
        #ifdef USE_INSTANCING
          wpos = instanceMatrix * wpos;
          wn = mat3(instanceMatrix) * wn;
        #endif
        wpos = modelMatrix * wpos;
        vWPos = wpos.xyz;
        vWNormal = normalize(mat3(modelMatrix) * wn);`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;\nvarying vec3 vWNormal;\nuniform float texScale;\nuniform vec3 roofColor;')
      .replace(
        '#include <map_fragment>',
        `#ifdef USE_MAP
          vec3 an = abs(vWNormal);
          vec2 wuv = an.x > an.z ? vWPos.zy : vWPos.xy;
          vec4 texel = texture2D(map, wuv * texScale);
          if (an.y > 0.45) {
            vec4 rt = texture2D(map, vWPos.xz * texScale * 2.0);
            texel = vec4(roofColor * (0.75 + 0.35 * rt.r), 1.0);
          }
          diffuseColor *= texel;
        #endif`,
      );
  };
  return mat;
}
