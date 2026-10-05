import {
  BufferGeometry, Color, Float32BufferAttribute, Group, InstancedMesh, Matrix4, MeshStandardMaterial, Quaternion, Vector3, type Material,
} from 'three';
import type { MapInstance, PropInstance, PropKind } from '../sim/MapBuilder';
import { TREE_KINDS } from '../sim/MapBuilder';
import type { Collider } from '../sim/StaticWorld';
import { geo, merge, place, prep, srgb, worldUvMaterial } from './geometry';
import { TextureFactory } from './TextureFactory';

interface Archetype {
  key: string;
  geometry: BufferGeometry;
  material: Material;
  castShadow: boolean;
  chunked: boolean;
  /** Low-detail geometry used beyond the LOD distance. */
  low?: { geometry: BufferGeometry; material: Material };
}

interface InstanceRef {
  mesh: InstancedMesh;
  index: number;
}

interface ChunkGroup {
  cx: number;
  cz: number;
  high: InstancedMesh[];
  low: InstancedMesh[];
}

interface FallingTree {
  prop: PropInstance;
  refs: InstanceRef[];
  axis: Vector3;
  t: number;
}

const CHUNK = 250;
const _m = new Matrix4();
const _q = new Quaternion();
const _q2 = new Quaternion();
const _p = new Vector3();
const _s = new Vector3();
const _up = new Vector3(0, 1, 0);
const _c = new Color();

/**
 * Instanced rendering of all map props. Vegetation is chunked for frustum/distance culling and
 * switches to low-poly LOD meshes far from the camera. Destruction updates instances in place.
 */
export class PropRenderer {
  readonly group = new Group();
  private refs = new Map<number, InstanceRef[]>();
  private chunks: ChunkGroup[] = [];
  private falling: FallingTree[] = [];
  private rubble: InstancedMesh | null = null;
  private rubbleNext = 0;
  private archetypes = new Map<string, Archetype>();

  constructor(private readonly map: MapInstance, private readonly quality: { lodDistance: number; drawDistance: number; shadows: boolean }) {
    this.createArchetypes();
    this.buildInstances();
  }

  private createArchetypes(): void {
    const biome = this.map.data.biome;
    const add = (a: Archetype) => this.archetypes.set(a.key, a);
    const facade = (style: Parameters<typeof TextureFactory.facade>[0], roof: string, scale = 1 / 12.8) =>
      worldUvMaterial({ map: TextureFactory.facade(style), roughness: 0.9, metalness: 0, vertexColors: true }, scale, srgb(roof));

    const buildingGeo = () => merge([
      place(geo.box(1.03, 0.5, 1.03, '#77726b'), 0, -0.2, 0),
      place(geo.box(1, 1, 1), 0, 0.5, 0),
      place(geo.box(1.04, 0.03, 1.04, '#9a958c'), 0, 0.985, 0),
      place(geo.box(1.02, 0.02, 1.02, '#8a857c'), 0, 0.5, 0),
    ]);
    add({ key: 'building:0', geometry: buildingGeo(), material: facade('stone', '#4a4643'), castShadow: true, chunked: false });
    add({ key: 'building:3', geometry: buildingGeo(), material: facade('concrete', '#555553'), castShadow: true, chunked: false });
    const houseGeo = () => {
      // Walls up to 0.62, gable roof (ridge along Z) up to 1.0, plinth sunk into the ground.
      const eave = 0.62;
      const rise = 0.38;
      const pitch = Math.atan2(rise, 0.5);
      const panelLen = Math.hypot(0.5, rise) + 0.1;
      const nx = Math.sin(pitch);
      const ny = Math.cos(pitch);
      const parts = [
        place(geo.box(1.04, 0.5, 1.04, '#6d6862'), 0, -0.2, 0),
        place(geo.box(1, eave, 1, '#ffffff'), 0, eave / 2, 0),
        gablePrism(1, rise, 1.0, eave),
        place(geo.box(panelLen, 0.045, 1.12, '#ffffff'), 0.25 + nx * 0.02 + 0.04, eave + rise / 2 + ny * 0.02 - 0.03, 0, 0, 0, -pitch),
        place(geo.box(panelLen, 0.045, 1.12, '#ffffff'), -0.25 - nx * 0.02 - 0.04, eave + rise / 2 + ny * 0.02 - 0.03, 0, 0, 0, pitch),
        place(geo.box(0.05, 0.05, 1.14, '#ffffff'), 0, eave + rise + 0.015, 0),
        place(geo.box(0.17, 0.3, 0.03, '#3d2a1b'), 0.22, 0.15, 0.505),
        place(geo.box(0.09, 0.3, 0.09, '#8a5a48'), -0.22, eave + rise * 0.75, -0.25),
      ];
      return merge(parts);
    };
    add({ key: 'house:1', geometry: houseGeo(), material: facade('wood', '#6b2f22', 1 / 9), castShadow: true, chunked: false });
    add({
      key: 'house:2',
      geometry: merge([
        place(geo.box(1.03, 0.5, 1.03, '#9d8664'), 0, -0.2, 0),
        place(geo.box(1, 1, 1), 0, 0.5, 0),
        place(geo.box(1.03, 0.06, 0.06, '#ffffff'), 0, 1.0, 0.485),
        place(geo.box(1.03, 0.06, 0.06, '#ffffff'), 0, 1.0, -0.485),
        place(geo.box(0.06, 0.06, 1.03, '#ffffff'), 0.485, 1.0, 0),
        place(geo.box(0.06, 0.06, 1.03, '#ffffff'), -0.485, 1.0, 0),
        place(geo.box(0.17, 0.32, 0.03, '#4a3423'), 0.2, 0.16, 0.505),
      ]),
      material: facade('adobe', '#b49870', 1 / 9), castShadow: true, chunked: false,
    });
    add({ key: 'house:0', geometry: houseGeo(), material: facade('stone', '#5c3a2c', 1 / 9), castShadow: true, chunked: false });
    add({ key: 'house:3', geometry: houseGeo(), material: facade('concrete', '#444444', 1 / 9), castShadow: true, chunked: false });
    add({
      key: 'hall', geometry: merge([place(geo.box(1, 1, 1), 0, 0.5, 0), place(geo.box(1.02, 0.08, 0.6), 0, 1.0, 0.2, 0.25, 0, 0)]),
      material: facade('hall', '#3e4447', 1 / 16), castShadow: true, chunked: false,
    });
    const stone = worldUvMaterial({ map: TextureFactory.rock(), roughness: 0.95, vertexColors: true, color: srgb('#8d8478') }, 1 / 4, srgb('#6b645a'));
    add({ key: 'ruin', geometry: place(geo.box(1, 1, 1), 0, 0.5, 0), material: stone, castShadow: true, chunked: false });
    add({
      key: 'wall', geometry: merge([place(geo.box(1, 0.4, 1, '#77726b'), 0, -0.15, 0), place(geo.box(1, 1, 1), 0, 0.5, 0), place(geo.box(1.0, 0.06, 1.25, '#a39d92'), 0, 1.0, 0)]),
      material: worldUvMaterial({ map: TextureFactory.facade('wall'), roughness: 0.92, vertexColors: true }, 1 / 6, srgb('#8a857c')), castShadow: true, chunked: false,
    });
    add({
      key: 'chimney', geometry: merge([place(geo.cyl(0.38, 0.5, 1, 10, '#8a4b38'), 0, 0.5, 0), place(geo.cyl(0.42, 0.42, 0.05, 10, '#2a2420'), 0, 0.98, 0)]),
      material: new MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }), castShadow: true, chunked: false,
    });
    add({
      key: 'silo', geometry: merge([place(geo.cyl(0.5, 0.5, 0.85, 14, '#a4a7a8'), 0, 0.425, 0), place(geo.cone(0.52, 0.15, 14, '#8c8f90'), 0, 0.925, 0)]),
      material: new MeshStandardMaterial({ vertexColors: true, roughness: 0.45, metalness: 0.6 }), castShadow: true, chunked: false,
    });
    add({ key: 'container', geometry: place(geo.box(1, 1, 1), 0, 0.5, 0), material: worldUvMaterial({ map: TextureFactory.facade('container'), roughness: 0.6, metalness: 0.5, vertexColors: true }, 1 / 3, srgb('#8a8a8a')), castShadow: true, chunked: false });
    const planks = worldUvMaterial({ map: TextureFactory.planks(), roughness: 0.95, vertexColors: true }, 1 / 1.6, srgb('#5a4029'));
    add({
      key: 'fence', geometry: merge([
        place(geo.box(1, 0.82, 0.35), 0, 0.5, 0),
        place(geo.box(1, 0.07, 0.9, '#9a8a78'), 0, 0.32, 0),
        place(geo.box(1, 0.07, 0.9, '#9a8a78'), 0, 0.72, 0),
        ...[-0.48, 0, 0.48].map((x) => place(geo.box(0.04, 1.05, 1.1, '#7d6e5e'), x, 0.47, 0)),
      ]),
      material: planks, castShadow: true, chunked: false,
    });
    add({ key: 'crate', geometry: merge([place(geo.box(1, 1, 1), 0, 0.5, 0), place(geo.box(1.02, 0.08, 1.02, '#8f7a5a'), 0, 0.92, 0), place(geo.box(1.02, 0.08, 1.02, '#8f7a5a'), 0, 0.08, 0)]), material: worldUvMaterial({ map: TextureFactory.planks(), roughness: 0.95, vertexColors: true, color: srgb('#c9a979') }, 1 / 1.2, srgb('#8a6d45')), castShadow: true, chunked: false });
    const steel = new MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.7 });
    const hedgehog = merge([0, 1, 2].map((i) => place(geo.box(0.12, 1.3, 0.12, '#4b4a48'), 0, 0.5, 0, i === 0 ? 0.9 : 0, i === 1 ? 0.9 : 0, i === 2 ? 0.9 : 0)));
    add({ key: 'barricade:0', geometry: hedgehog, material: steel, castShadow: true, chunked: false });
    add({ key: 'barricade:1', geometry: merge([place(geo.box(1, 0.55, 1, '#9a9890'), 0, 0.275, 0), place(geo.box(0.7, 0.35, 0.7, '#8d8b83'), 0, 0.72, 0)]), material: new MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }), castShadow: true, chunked: false });
    const carParts = [
      place(geo.box(1, 0.45, 1, '#ffffff'), 0, 0.5, 0),
      place(geo.box(0.9, 0.35, 0.5, '#d8d8d8'), 0, 0.88, -0.05),
      ...[[0.48, 0.32], [-0.48, 0.32], [0.48, -0.32], [-0.48, -0.32]].map(([x, z]) => place(geo.cyl(0.17, 0.17, 0.1, 10, '#151515'), x, 0.17, z, 0, 0, Math.PI / 2)),
    ];
    add({ key: 'car', geometry: merge(carParts), material: new MeshStandardMaterial({ vertexColors: true, roughness: 0.35, metalness: 0.6 }), castShadow: true, chunked: false });
    add({
      key: 'wagon', geometry: merge([
        place(geo.box(1, 0.85, 1, '#7a4a32'), 0, 0.55, 0),
        place(geo.box(0.9, 0.12, 0.95, '#2a2522'), 0, 0.08, 0),
        place(geo.box(1.04, 0.05, 1.01, '#5d3826'), 0, 0.99, 0),
      ]), material: worldUvMaterial({ map: TextureFactory.facade('container'), roughness: 0.7, metalness: 0.4, vertexColors: true }, 1 / 3, srgb('#4d3324')), castShadow: true, chunked: false,
    });
    const stripes: BufferGeometry[] = [];
    for (let i = 0; i < 6; i++) stripes.push(place(geo.cyl(0.42 - i * 0.03, 0.45 - i * 0.03, 1 / 6, 14, i % 2 ? '#b8302a' : '#f0eee8'), 0, (i + 0.5) / 6 * 0.86, 0));
    stripes.push(place(geo.cyl(0.32, 0.32, 0.1, 12, '#2c2c2c'), 0, 0.9, 0), place(geo.cone(0.34, 0.08, 12, '#7a1d1a'), 0, 0.99, 0));
    add({ key: 'lighthouse', geometry: merge(stripes), material: new MeshStandardMaterial({ vertexColors: true, roughness: 0.6 }), castShadow: true, chunked: false });
    add({
      key: 'rail', geometry: merge([
        place(geo.box(0.07, 1, 1, '#55524e'), 0.36, 0.5, 0),
        place(geo.box(0.07, 1, 1, '#55524e'), -0.36, 0.5, 0),
        ...Array.from({ length: 6 }, (_, i) => place(geo.box(1, 0.6, 0.08, '#3d3125'), 0, 0.3, -0.42 + i * 0.168)),
      ]), material: new MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0.5 }), castShadow: false, chunked: false,
    });

    const rockMat = new MeshStandardMaterial({ map: TextureFactory.rock(), normalMap: TextureFactory.rockNormal(), aoMap: TextureFactory.rock(), aoMapIntensity: 0.6, color: srgb(biome.ground === 'snow' ? '#9ea4aa' : biome.ground === 'sand' ? '#b39a76' : '#8b857c'), roughness: 0.92, vertexColors: true });
    add({ key: 'rock', geometry: geo.rock(3), material: rockMat, castShadow: true, chunked: true, low: { geometry: prepLow(geo.rock(5)), material: rockMat } });

    const foliageTex = TextureFactory.foliage();
    const leaf = (hex: string) => new MeshStandardMaterial({ color: srgb(hex), map: foliageTex, roughness: 0.9, vertexColors: true });
    const barkMat = new MeshStandardMaterial({ map: TextureFactory.bark(), roughness: 0.95, vertexColors: true });
    const snowy = biome.ground === 'snow';
    const foliage = snowy ? '#5c7363' : biome.ground === 'sand' ? '#6a7a3a' : '#4a6b2a';
    for (const kind of TREE_KINDS) {
      const idx = TREE_KINDS.indexOf(kind);
      let trunk: BufferGeometry;
      let canopy: BufferGeometry | null;
      let canopyMat = leaf(foliage);
      switch (kind) {
        case 'pine':
          trunk = place(geo.cyl(0.08, 0.13, 1, 6, '#ffffff'), 0, 0.5, 0);
          canopy = merge([0, 1, 2, 3].map((i) => place(geo.cone(0.28 - i * 0.05, 0.32, 8, i % 2 ? '#e6f0e6' : '#ffffff'), 0, 0.32 + i * 0.17, 0)));
          canopyMat = leaf(snowy ? '#6f8a78' : '#35502c');
          break;
        case 'palm':
          trunk = place(geo.cyl(0.05, 0.08, 1, 6, '#c8b090'), 0, 0.5, 0, 0.08, 0, 0);
          canopy = merge(Array.from({ length: 7 }, (_, i) => place(geo.box(0.07, 0.015, 0.42, '#ffffff'), Math.sin(i) * 0.15, 0.97, Math.cos(i) * 0.15, -0.35, (i / 7) * Math.PI * 2, 0)));
          canopyMat = leaf('#5f7f2e');
          break;
        case 'birch':
          trunk = place(geo.cyl(0.05, 0.08, 1, 6, '#f2efe6'), 0, 0.5, 0);
          canopy = merge([
            place(geo.blob(0.2, 2, 11, 0.05), 0, 0.72, 0, 0, 0, 0, 1, 1.25, 1),
            place(geo.blob(0.15, 1, 12, 0.04, '#e8f0dc'), 0.08, 0.9, 0.04),
            place(geo.blob(0.13, 1, 13, 0.04, '#c8d4bc'), -0.09, 0.6, -0.05),
          ]);
          canopyMat = leaf(snowy ? '#7c8a72' : '#6a8a34');
          break;
        case 'dead':
          trunk = merge([
            place(geo.cyl(0.04, 0.08, 1, 5, '#6f6255'), 0, 0.5, 0),
            place(geo.cyl(0.015, 0.03, 0.35, 4, '#6f6255'), 0.08, 0.7, 0, 0, 0, -0.8),
            place(geo.cyl(0.015, 0.03, 0.3, 4, '#6f6255'), -0.07, 0.6, 0.03, 0.3, 0, 0.9),
          ]);
          canopy = null;
          break;
        default:
          trunk = place(geo.cyl(0.07, 0.12, 1, 6, '#ffffff'), 0, 0.5, 0);
          canopy = merge([
            place(geo.blob(0.3, 2, 21, 0.06, '#d8e0d0'), 0, 0.66, 0),
            place(geo.blob(0.22, 2, 22, 0.05), 0.17, 0.76, 0.08),
            place(geo.blob(0.21, 2, 23, 0.05), -0.14, 0.8, -0.1),
            place(geo.blob(0.17, 1, 24, 0.04, '#f0f4e6'), 0.02, 0.93, 0.03),
            place(geo.blob(0.16, 1, 25, 0.04, '#c8d4bc'), -0.05, 0.6, 0.2),
            place(geo.blob(0.15, 1, 26, 0.04, '#c8d4bc'), 0.12, 0.62, -0.17),
          ]);
      }
      add({
        key: `trunk:${idx}`, geometry: trunk, material: kind === 'birch' || kind === 'palm' || kind === 'dead' ? new MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }) : barkMat,
        castShadow: true, chunked: true,
      });
      if (canopy) {
        const low = kind === 'pine' ? place(geo.cone(0.27, 0.85, 5), 0, 0.55, 0) : place(geo.blob(0.32, 0, 30 + idx, 0.04), 0, 0.72, 0);
        add({ key: `canopy:${idx}`, geometry: canopy, material: canopyMat, castShadow: true, chunked: true, low: { geometry: prepLow(low), material: canopyMat } });
      }
    }
    const bushMat = leaf(snowy ? '#6d7f6c' : biome.ground === 'sand' ? '#7b8044' : '#4f7029');
    add({
      key: 'bush', geometry: merge([place(geo.blob(0.5, 1, 41, 0.12), 0, 0.42, 0), place(geo.blob(0.38, 1, 42, 0.1), 0.35, 0.32, 0.1), place(geo.blob(0.36, 1, 43, 0.1), -0.3, 0.3, -0.12)]),
      material: bushMat, castShadow: false, chunked: true, low: { geometry: prepLow(place(geo.blob(0.55, 0, 44, 0.08), 0, 0.4, 0)), material: bushMat },
    });
    this.rubbleMaterial = new MeshStandardMaterial({ map: TextureFactory.rock(), color: srgb('#6e6457'), roughness: 1, vertexColors: true });
    this.rubbleGeometry = merge([
      place(geo.blob(0.5, 1, 51, 0.15), 0, 0.15, 0, 0, 0, 0, 1, 0.35, 1),
      place(geo.box(0.5, 0.2, 0.1, '#5a4029'), 0.2, 0.3, 0.1, 0.4, 0.3, 0.2),
      place(geo.box(0.4, 0.15, 0.1, '#5a4029'), -0.25, 0.25, -0.2, -0.3, 0.8, 0.1),
    ]);
  }

  private rubbleMaterial!: MeshStandardMaterial;
  private rubbleGeometry!: BufferGeometry;

  private archetypeKeys(p: PropInstance): string[] {
    switch (p.kind) {
      case 'tree': return [`trunk:${p.variant}`, `canopy:${p.variant}`].filter((k) => this.archetypes.has(k));
      case 'building': return [`building:${p.variant === 3 ? 3 : 0}`];
      case 'house': return [`house:${p.variant}`];
      case 'barricade': return [`barricade:${p.variant}`];
      default: return [p.kind];
    }
  }

  private propMatrix(p: PropInstance, out: Matrix4): Matrix4 {
    _q.setFromAxisAngle(_up, p.rot);
    const scale = p.kind === 'tree' ? _s.set(p.sy * 0.9, p.sy, p.sy * 0.9) : p.kind === 'rock' ? _s.set(p.sx, p.sy, p.sz).multiplyScalar(1.1) : _s.set(p.sx, p.sy, p.sz);
    return out.compose(_p.set(p.x, p.y, p.z), _q, scale);
  }

  private buildInstances(): void {
    const groups = new Map<string, PropInstance[]>();
    for (const p of this.map.props) {
      for (const key of this.archetypeKeys(p)) {
        const a = this.archetypes.get(key);
        if (!a) continue;
        const gk = a.chunked ? `${key}|${Math.floor((p.x + 2000) / CHUNK)}|${Math.floor((p.z + 2000) / CHUNK)}` : key;
        let list = groups.get(gk);
        if (!list) {
          list = [];
          groups.set(gk, list);
        }
        list.push(p);
      }
    }
    const chunkMap = new Map<string, ChunkGroup>();
    const tint = new Color();
    for (const [gk, props] of groups) {
      const [key, cxs, czs] = gk.split('|');
      const a = this.archetypes.get(key)!;
      const make = (g: BufferGeometry, m: Material) => {
        const mesh = new InstancedMesh(g, m, props.length);
        mesh.castShadow = a.castShadow && this.quality.shadows;
        mesh.receiveShadow = true;
        props.forEach((p, i) => {
          mesh.setMatrixAt(i, this.propMatrix(p, _m));
          tint.copy(this.instanceTint(p));
          mesh.setColorAt(i, tint);
        });
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        mesh.computeBoundingSphere();
        this.group.add(mesh);
        return mesh;
      };
      const high = make(a.geometry, a.material);
      props.forEach((p, i) => this.addRef(p.id, high, i));
      if (a.chunked) {
        const ck = `${cxs}|${czs}`;
        let cg = chunkMap.get(ck);
        if (!cg) {
          cg = { cx: (Number(cxs) + 0.5) * CHUNK - 2000, cz: (Number(czs) + 0.5) * CHUNK - 2000, high: [], low: [] };
          chunkMap.set(ck, cg);
        }
        cg.high.push(high);
        if (a.low) {
          const low = make(a.low.geometry, a.low.material);
          low.castShadow = false;
          low.visible = false;
          props.forEach((p, i) => this.addRef(p.id, low, i));
          cg.low.push(low);
        } else cg.low.push(high);
      }
    }
    this.chunks = [...chunkMap.values()];
    const houses = this.map.props.filter((p) => p.colliderId >= 0 && this.map.statics.colliders[p.colliderId].destructible).length;
    if (houses > 0) {
      this.rubble = new InstancedMesh(this.rubbleGeometry, this.rubbleMaterial, houses);
      _m.makeScale(0, 0, 0);
      for (let i = 0; i < houses; i++) this.rubble.setMatrixAt(i, _m);
      this.rubble.receiveShadow = true;
      this.rubble.frustumCulled = false;
      this.group.add(this.rubble);
    }
  }

  private instanceTint(p: PropInstance): Color {
    const h = ((p.id * 2654435761) >>> 0) / 4294967296;
    switch (p.kind) {
      case 'car': return _c.setHSL(h, 0.45, 0.32 + h * 0.2);
      case 'container': return _c.setHSL([0.0, 0.08, 0.33, 0.58, 0.12][p.variant % 5], 0.55, 0.38);
      case 'house': return _c.setRGB(0.9 + h * 0.15, 0.9 + h * 0.1, 0.88 + h * 0.1);
      case 'building': return _c.setRGB(0.85 + h * 0.25, 0.82 + h * 0.22, 0.78 + h * 0.2);
      case 'tree':
      case 'bush': return _c.setRGB(0.85 + h * 0.3, 0.85 + h * 0.25, 0.8 + h * 0.2);
      case 'rock': return _c.setRGB(0.85 + h * 0.2, 0.85 + h * 0.2, 0.85 + h * 0.2);
      default: return _c.setRGB(1, 1, 1);
    }
  }

  private addRef(propId: number, mesh: InstancedMesh, index: number): void {
    let list = this.refs.get(propId);
    if (!list) {
      list = [];
      this.refs.set(propId, list);
    }
    list.push({ mesh, index });
  }

  /** Visual response to a destroyed collider (falls, collapses into rubble, gets crushed or vanishes). */
  onDestroyed(c: Collider, from: Vector3 | null): void {
    const prop = this.map.props[c.propId];
    if (!prop) return;
    const refs = this.refs.get(prop.id) ?? [];
    if (prop.kind === 'tree') {
      const dir = from ? new Vector3(prop.x - from.x, 0, prop.z - from.z).normalize() : new Vector3(1, 0, 0);
      const axis = new Vector3(dir.z, 0, -dir.x).normalize();
      this.falling.push({ prop, refs, axis, t: 0 });
      return;
    }
    if (prop.kind === 'car' || prop.kind === 'wagon') {
      for (const r of refs) {
        this.propMatrix(prop, _m);
        _m.decompose(_p, _q, _s);
        _s.y *= prop.kind === 'car' ? 0.45 : 0.7;
        _q2.setFromAxisAngle(new Vector3(0, 0, 1), prop.kind === 'wagon' ? 0.25 : 0.05);
        _q.multiply(_q2);
        _m.compose(_p, _q, _s);
        r.mesh.setMatrixAt(r.index, _m);
        r.mesh.setColorAt(r.index, _c.setRGB(0.12, 0.11, 0.1));
        r.mesh.instanceMatrix.needsUpdate = true;
        if (r.mesh.instanceColor) r.mesh.instanceColor.needsUpdate = true;
      }
      return;
    }
    _m.makeScale(0, 0, 0);
    for (const r of refs) {
      r.mesh.setMatrixAt(r.index, _m);
      r.mesh.instanceMatrix.needsUpdate = true;
    }
    if ((prop.kind === 'house' || prop.kind === 'wall' || prop.kind === 'barricade') && this.rubble && this.rubbleNext < this.rubble.count) {
      _q.setFromAxisAngle(_up, prop.rot);
      _m.compose(_p.set(prop.x, prop.y, prop.z), _q, _s.set(prop.sx * 1.1, Math.max(0.6, prop.sy * 0.35), Math.max(1, prop.sz * 1.1)));
      this.rubble.setMatrixAt(this.rubbleNext++, _m);
      this.rubble.instanceMatrix.needsUpdate = true;
    }
  }

  update(dt: number, camera: Vector3): void {
    for (const ch of this.chunks) {
      const d = Math.hypot(ch.cx - camera.x, ch.cz - camera.z) - CHUNK * 0.7;
      const visible = d < this.quality.drawDistance;
      const useLow = d > this.quality.lodDistance;
      for (let i = 0; i < ch.high.length; i++) {
        const h = ch.high[i];
        const l = ch.low[i];
        if (h === l) h.visible = visible;
        else {
          h.visible = visible && !useLow;
          l.visible = visible && useLow;
        }
      }
    }
    for (let i = this.falling.length - 1; i >= 0; i--) {
      const f = this.falling[i];
      f.t = Math.min(1, f.t + dt / 1.6);
      const angle = f.t * f.t * (Math.PI / 2 - 0.12);
      this.propMatrix(f.prop, _m);
      _m.decompose(_p, _q, _s);
      _q2.setFromAxisAngle(f.axis, angle);
      _q.premultiply(_q2);
      _m.compose(_p, _q, _s);
      for (const r of f.refs) {
        r.mesh.setMatrixAt(r.index, _m);
        r.mesh.instanceMatrix.needsUpdate = true;
      }
      if (f.t >= 1) this.falling.splice(i, 1);
    }
  }

  dispose(): void {
    this.group.traverse((o) => {
      if (o instanceof InstancedMesh) o.dispose();
    });
    for (const a of this.archetypes.values()) {
      a.geometry.dispose();
      a.low?.geometry.dispose();
    }
  }
}

/** Triangular gable prism: base width `w` at height `y0`, apex `rise` above, ridge along Z with depth `depth`. */
function gablePrism(w: number, rise: number, depth: number, y0: number): BufferGeometry {
  const hw = w / 2;
  const hd = depth / 2;
  const a = [-hw, y0], b = [hw, y0], c = [0, y0 + rise];
  const pos: number[] = [];
  const tri = (p: number[][]) => p.forEach((v) => pos.push(v[0], v[1], v[2]));
  tri([[a[0], a[1], hd], [b[0], b[1], hd], [c[0], c[1], hd]]);
  tri([[b[0], b[1], -hd], [a[0], a[1], -hd], [c[0], c[1], -hd]]);
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return prep(g, '#ffffff');
}

function prepLow(g: BufferGeometry): BufferGeometry {
  g.computeBoundingSphere();
  return g;
}

export type { PropKind };
