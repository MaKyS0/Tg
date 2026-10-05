import { ACESFilmicToneMapping, PCFShadowMap, SRGBColorSpace, WebGLRenderer, type Camera, type Scene } from 'three';
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
}

export const QUALITY_PROFILES: Record<GraphicsQuality, QualityProfile> = {
  low: { id: 'low', pixelRatio: 0.75, shadowMapSize: 0, shadowRange: 0, terrainStep: 5, lodDistance: 140, drawDistance: 420, environment: false, antialias: false, fogScale: 1.5 },
  medium: { id: 'medium', pixelRatio: 1, shadowMapSize: 1024, shadowRange: 90, terrainStep: 2.5, lodDistance: 220, drawDistance: 600, environment: true, antialias: false, fogScale: 1.15 },
  high: { id: 'high', pixelRatio: 1.25, shadowMapSize: 2048, shadowRange: 130, terrainStep: 2.5, lodDistance: 300, drawDistance: 800, environment: true, antialias: true, fogScale: 1 },
  ultra: { id: 'ultra', pixelRatio: 2, shadowMapSize: 4096, shadowRange: 170, terrainStep: 2.5, lodDistance: 420, drawDistance: 1100, environment: true, antialias: true, fogScale: 0.9 },
};

/** Owns the WebGL context; applies quality settings and handles resizing. */
export class RendererCore {
  readonly renderer: WebGLRenderer;
  quality: QualityProfile;
  private renderScale = 1;
  private shadowsEnabled = true;

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
    this.resize();
  }

  resize(): void {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    const pr = Math.min(window.devicePixelRatio || 1, 2) * this.quality.pixelRatio * this.renderScale;
    this.renderer.setPixelRatio(Math.max(0.4, Math.min(pr, 2.5)));
    this.renderer.setSize(w, h, false);
  }

  get aspect(): number {
    return (this.canvas.clientWidth || window.innerWidth) / (this.canvas.clientHeight || window.innerHeight);
  }

  get height(): number {
    return this.renderer.domElement.height;
  }

  render(scene: Scene, camera: Camera): void {
    this.renderer.render(scene, camera);
  }

  get info(): { calls: number; triangles: number; geometries: number; textures: number } {
    const i = this.renderer.info;
    return { calls: i.render.calls, triangles: i.render.triangles, geometries: i.memory.geometries, textures: i.memory.textures };
  }
}
