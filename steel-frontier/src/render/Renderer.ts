import { ACESFilmicToneMapping, PCFShadowMap, PCFSoftShadowMap, SRGBColorSpace, Vector2, WebGLRenderer, type Camera, type Scene } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import type { GraphicsQuality } from '../game/SaveSystem';

export interface QualityProfile {
  id: GraphicsQuality;
  pixelRatio: number;
  shadowMapSize: number;
  shadowRange: number;
  terrainStep: number;
  lodDistance: number;
  drawDistance: number;
  environment: boolean;
  antialias: boolean;
  fogScale: number;
  bloom: boolean;
  /** Grass tufts around the camera; null disables them. */
  grass: { radius: number; spacing: number } | null;
}

export const QUALITY_PROFILES: Record<GraphicsQuality, QualityProfile> = {
  low: { id: 'low', pixelRatio: 0.75, shadowMapSize: 0, shadowRange: 0, terrainStep: 5, lodDistance: 140, drawDistance: 420, environment: false, antialias: false, fogScale: 1.5, bloom: false, grass: null },
  medium: { id: 'medium', pixelRatio: 1, shadowMapSize: 1024, shadowRange: 90, terrainStep: 2.5, lodDistance: 220, drawDistance: 600, environment: true, antialias: false, fogScale: 1.15, bloom: false, grass: { radius: 45, spacing: 2.2 } },
  high: { id: 'high', pixelRatio: 1.25, shadowMapSize: 2048, shadowRange: 130, terrainStep: 2.5, lodDistance: 300, drawDistance: 800, environment: true, antialias: true, fogScale: 1, bloom: true, grass: { radius: 65, spacing: 1.6 } },
  ultra: { id: 'ultra', pixelRatio: 2, shadowMapSize: 4096, shadowRange: 170, terrainStep: 2.5, lodDistance: 420, drawDistance: 1100, environment: true, antialias: true, fogScale: 0.9, bloom: true, grass: { radius: 85, spacing: 1.25 } },
};

/** Owns the WebGL context; applies quality settings and handles resizing. */
export class RendererCore {
  readonly renderer: WebGLRenderer;
  quality: QualityProfile;
  private renderScale = 1;
  private shadowsEnabled = true;
  private composer: EffectComposer | null = null;
  private renderPass: RenderPass | null = null;
  private bloomPass: UnrealBloomPass | null = null;

  constructor(readonly canvas: HTMLCanvasElement, quality: GraphicsQuality) {
    this.quality = QUALITY_PROFILES[quality];
    this.renderer = new WebGLRenderer({ canvas, antialias: this.quality.antialias, powerPreference: 'high-performance', stencil: false });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.type = PCFShadowMap;
    this.apply(quality, 1, true);
  }

  apply(quality: GraphicsQuality, renderScale: number, shadows: boolean): void {
    this.quality = { ...QUALITY_PROFILES[quality] };
    if (!shadows) this.quality.shadowMapSize = 0;
    this.renderScale = renderScale;
    this.shadowsEnabled = shadows && this.quality.shadowMapSize > 0;
    this.renderer.shadowMap.enabled = this.shadowsEnabled;
    const shadowType = quality === 'high' || quality === 'ultra' ? PCFSoftShadowMap : PCFShadowMap;
    if (this.renderer.shadowMap.type !== shadowType) {
      this.renderer.shadowMap.type = shadowType;
      this.renderer.shadowMap.needsUpdate = true;
    }
    if (this.quality.bloom && !this.composer) {
      // Post-processing: HDR scene → bloom (muzzle flashes, fire, sun) → tone mapping/colour output.
      this.composer = new EffectComposer(this.renderer);
      this.renderPass = new RenderPass(null as unknown as Scene, null as unknown as Camera);
      this.bloomPass = new UnrealBloomPass(new Vector2(256, 256), 0.32, 0.45, 0.92);
      this.composer.addPass(this.renderPass);
      this.composer.addPass(this.bloomPass);
      this.composer.addPass(new OutputPass());
    } else if (!this.quality.bloom && this.composer) {
      this.composer.dispose();
      this.composer = null;
      this.renderPass = null;
      this.bloomPass = null;
    }
    this.resize();
  }

  resize(): void {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    const pr = Math.min(window.devicePixelRatio || 1, 2) * this.quality.pixelRatio * this.renderScale;
    this.renderer.setPixelRatio(Math.max(0.4, Math.min(pr, 2.5)));
    this.renderer.setSize(w, h, false);
    if (this.composer) {
      this.composer.setPixelRatio(this.renderer.getPixelRatio());
      this.composer.setSize(w, h);
      this.bloomPass?.resolution.set(w / 2, h / 2);
    }
  }

  get aspect(): number {
    return (this.canvas.clientWidth || window.innerWidth) / (this.canvas.clientHeight || window.innerHeight);
  }

  get height(): number {
    return this.renderer.domElement.height;
  }

  /** Renders through the post-processing chain when enabled (battle), directly otherwise. */
  render(scene: Scene, camera: Camera, postFx = true): void {
    if (this.composer && this.renderPass && postFx) {
      this.renderPass.scene = scene;
      this.renderPass.camera = camera;
      this.composer.render();
    } else this.renderer.render(scene, camera);
  }

  get info(): { calls: number; triangles: number; geometries: number; textures: number } {
    const i = this.renderer.info;
    return { calls: i.render.calls, triangles: i.render.triangles, geometries: i.memory.geometries, textures: i.memory.textures };
  }
}
