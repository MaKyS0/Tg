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
  /** Upper bound on rendered pixels (megapixels) regardless of screen density. */
  maxMegapixels: number;
  /** Render the shadow map every N frames (sun follows the camera only on those frames). */
  shadowInterval: number;
  /** Distance at which tanks switch to their low-detail mesh. */
  tankLod: number;
}

export const QUALITY_PROFILES: Record<GraphicsQuality, QualityProfile> = {
  low: { id: 'low', pixelRatio: 0.75, shadowMapSize: 0, shadowRange: 0, terrainStep: 5, lodDistance: 140, drawDistance: 420, environment: false, antialias: false, fogScale: 1.5, bloom: false, grass: null, maxMegapixels: 1.0, shadowInterval: 1, tankLod: 60 },
  medium: { id: 'medium', pixelRatio: 1, shadowMapSize: 1024, shadowRange: 90, terrainStep: 2.5, lodDistance: 220, drawDistance: 600, environment: true, antialias: false, fogScale: 1.15, bloom: false, grass: { radius: 45, spacing: 2.2 }, maxMegapixels: 1.7, shadowInterval: 2, tankLod: 75 },
  high: { id: 'high', pixelRatio: 1.25, shadowMapSize: 2048, shadowRange: 130, terrainStep: 2.5, lodDistance: 300, drawDistance: 800, environment: true, antialias: true, fogScale: 1, bloom: true, grass: { radius: 65, spacing: 1.6 }, maxMegapixels: 2.6, shadowInterval: 2, tankLod: 100 },
  ultra: { id: 'ultra', pixelRatio: 2, shadowMapSize: 4096, shadowRange: 170, terrainStep: 2.5, lodDistance: 420, drawDistance: 1100, environment: true, antialias: true, fogScale: 0.9, bloom: true, grass: { radius: 85, spacing: 1.25 }, maxMegapixels: 4.2, shadowInterval: 1, tankLod: 150 },
};

/** Owns the WebGL context; applies quality settings and handles resizing. */
export class RendererCore {
  readonly renderer: WebGLRenderer;
  quality: QualityProfile;
  private renderScale = 1;
  /** Automatic resolution factor driven by measured frame time (1 = full). */
  dynamicScale = 1;
  dynamicEnabled = true;
  private frameAcc = 0;
  private frameCount = 0;
  private warmup = 0;
  private shadowsEnabled = true;
  private composer: EffectComposer | null = null;
  private renderPass: RenderPass | null = null;
  private bloomPass: UnrealBloomPass | null = null;

  constructor(readonly canvas: HTMLCanvasElement, quality: GraphicsQuality) {
    this.quality = QUALITY_PROFILES[quality];
    // MSAA is wasted on dense (phone/tablet) screens and when post-processing renders off-screen anyway.
    const dense = (window.devicePixelRatio || 1) >= 1.5;
    this.renderer = new WebGLRenderer({ canvas, antialias: this.quality.antialias && !dense, powerPreference: 'high-performance', stencil: false });
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
    const wanted = Math.min(window.devicePixelRatio || 1, 2) * this.quality.pixelRatio * this.renderScale;
    const budget = Math.sqrt((this.quality.maxMegapixels * 1e6) / Math.max(1, w * h));
    const pr = Math.max(0.4, Math.min(wanted, budget, 2.5) * this.dynamicScale);
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h, false);
    if (this.composer) {
      this.composer.setPixelRatio(pr);
      this.composer.setSize(w, h);
      // Bloom is low-frequency: starting its blur chain at a lower resolution looks the same and costs far less.
      this.bloomPass?.setSize(Math.max(64, Math.round((w * pr) / 2)), Math.max(64, Math.round((h * pr) / 2)));
    }
  }

  /**
   * Dynamic resolution: lowers the render scale when frames are slow, raises it back when there is
   * headroom. Evaluated over ~0.75 s windows with hysteresis so it does not oscillate.
   */
  adapt(dt: number): void {
    if (!this.dynamicEnabled) {
      if (this.dynamicScale !== 1) {
        this.dynamicScale = 1;
        this.resize();
      }
      return;
    }
    if (dt <= 0 || dt >= 0.1) return;
    if (this.warmup > 0) {
      // Ignore the first moments of a battle (shader/texture uploads cause hitches).
      this.warmup -= dt;
      return;
    }
    this.frameAcc += dt;
    this.frameCount++;
    if (this.frameAcc < 0.75) return;
    const avgMs = (this.frameAcc / this.frameCount) * 1000;
    this.frameAcc = 0;
    this.frameCount = 0;
    let next = this.dynamicScale;
    if (avgMs > 19.5) next = Math.max(0.55, this.dynamicScale * (avgMs > 28 ? 0.8 : 0.9));
    else if (avgMs < 16.2) next = Math.min(1, this.dynamicScale * 1.06);
    if (Math.abs(next - this.dynamicScale) > 0.01) {
      this.dynamicScale = next;
      this.resize();
    }
  }

  /** Starts a fresh measurement after a scene change. */
  resetAdapt(): void {
    this.frameAcc = 0;
    this.frameCount = 0;
    this.warmup = 2;
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
