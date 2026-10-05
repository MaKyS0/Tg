import type { MapInstance } from '../sim/MapBuilder';
import type { Tank } from '../sim/Tank';
import type { World } from '../sim/World';
import { SURFACES, SURFACE_IDS } from '../data/surfaces';
import { BASE_RADIUS } from '../sim/GameMode';

const SIZE = 512;

/**
 * Canvas minimap. Convention (matches the 3D view when facing +Z): screen up = +Z, screen right = -X.
 * Background is pre-rendered once from terrain, water, roads and buildings.
 */
export class Minimap {
  readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private background: HTMLCanvasElement;
  private scale: number;
  private half: number;
  private lastSeen = new Map<number, { x: number; z: number; time: number }>();

  constructor(private readonly map: MapInstance) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = SIZE;
    this.ctx = this.canvas.getContext('2d')!;
    this.half = map.terrain.half;
    this.scale = SIZE / map.terrain.size;
    this.background = this.renderBackground();
  }

  toScreen(x: number, z: number): [number, number] {
    return [(this.half - x) * this.scale, (this.half - z) * this.scale];
  }

  private renderBackground(): HTMLCanvasElement {
    const T = this.map.terrain;
    const c = document.createElement('canvas');
    c.width = c.height = SIZE;
    const ctx = c.getContext('2d')!;
    const img = ctx.createImageData(SIZE, SIZE);
    const water = parseInt(this.map.data.biome.waterColor.slice(1), 16);
    const wr = (water >> 16) & 255, wg = (water >> 8) & 255, wb = water & 255;
    for (let py = 0; py < SIZE; py++) {
      for (let px = 0; px < SIZE; px++) {
        const x = this.half - px / this.scale;
        const z = this.half - py / this.scale;
        const h = T.heightAt(x, z);
        const i = (py * SIZE + px) * 4;
        if (T.waterDepthAt(x, z) > 0.15) {
          img.data[i] = wr; img.data[i + 1] = wg; img.data[i + 2] = wb;
        } else {
          const s = SURFACES[SURFACE_IDS[T.surface[T.cellIndex(x, z)]]];
          // Hill shading from the north-west.
          const shade = 0.75 + (T.heightAt(x + 3, z - 3) - h) * 0.12 + (h - 10) * 0.004;
          const k = Math.max(0.45, Math.min(1.35, shade));
          img.data[i] = Math.min(255, s.color[0] * 255 * k);
          img.data[i + 1] = Math.min(255, s.color[1] * 255 * k);
          img.data[i + 2] = Math.min(255, s.color[2] * 255 * k);
        }
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    // Buildings and other large statics.
    for (const p of this.map.props) {
      if (!['building', 'house', 'hall', 'silo', 'container', 'wall', 'wagon', 'lighthouse', 'chimney'].includes(p.kind)) continue;
      const [sx, sy] = this.toScreen(p.x, p.z);
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.kind === 'house' ? 'rgba(120,80,60,0.9)' : 'rgba(70,70,75,0.95)';
      ctx.fillRect((-p.sx / 2) * this.scale, (-p.sz / 2) * this.scale, Math.max(1.5, p.sx * this.scale), Math.max(1.5, p.sz * this.scale));
      ctx.restore();
    }
    ctx.fillStyle = 'rgba(20,60,20,0.55)';
    for (const p of this.map.props) {
      if (p.kind !== 'tree') continue;
      const [sx, sy] = this.toScreen(p.x, p.z);
      ctx.beginPath();
      ctx.arc(sx, sy, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '13px sans-serif';
    const letters = 'АБВГДЕЖЗИК';
    for (let k = 1; k < 10; k++) {
      ctx.beginPath();
      ctx.moveTo((k * SIZE) / 10, 0);
      ctx.lineTo((k * SIZE) / 10, SIZE);
      ctx.moveTo(0, (k * SIZE) / 10);
      ctx.lineTo(SIZE, (k * SIZE) / 10);
      ctx.stroke();
    }
    for (let k = 0; k < 10; k++) {
      ctx.fillText(letters[k], 3, (k * SIZE) / 10 + 14);
      ctx.fillText(String(k + 1), (k * SIZE) / 10 + 4, SIZE - 4);
    }
    return c;
  }

  draw(world: World, player: Tank | null, cameraYaw: number): void {
    const ctx = this.ctx;
    ctx.drawImage(this.background, 0, 0);
    // Bases
    for (const b of world.mode.bases) {
      const [x, y] = this.toScreen(b.x, b.z);
      const own = player ? b.owner === player.team : b.owner === 0;
      ctx.strokeStyle = b.owner === -1 ? '#ffffff' : own ? '#7be366' : '#ff5a4d';
      ctx.fillStyle = b.owner === -1 ? 'rgba(255,255,255,0.15)' : own ? 'rgba(123,227,102,0.18)' : 'rgba(255,90,77,0.18)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, BASE_RADIUS * this.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      const pts = Math.max(b.points[0], b.points[1]);
      if (pts > 0) {
        ctx.strokeStyle = '#ffd36b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(x, y, BASE_RADIUS * this.scale + 4, -Math.PI / 2, -Math.PI / 2 + (pts / 100) * Math.PI * 2);
        ctx.stroke();
      }
    }
    // View range & camera direction
    if (player && player.alive) {
      const [px, py] = this.toScreen(player.position.x, player.position.z);
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(px, py, player.stats.viewRange * this.scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath();
      ctx.arc(px, py, 445 * this.scale, 0, Math.PI * 2);
      ctx.stroke();
      // Camera view cone: world forward (sin, cos) maps to screen (-sin, -cos).
      const ang = Math.atan2(-Math.cos(cameraYaw), -Math.sin(cameraYaw));
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.arc(px, py, 70, ang - 0.45, ang + 0.45);
      ctx.closePath();
      ctx.fill();
    }
    for (const t of world.tanks) {
      const ally = player ? t.team === player.team : t.team === 0;
      const visible = !player || ally || world.detection.isVisibleTo(player, t);
      if (!visible) continue;
      if (!ally) this.lastSeen.set(t.id, { x: t.position.x, z: t.position.z, time: world.time });
      const [x, y] = this.toScreen(t.position.x, t.position.z);
      const color = t === player ? '#ffffff' : ally ? '#7be366' : '#ff5a4d';
      ctx.save();
      ctx.translate(x, y);
      // Heading: world yaw rotates from +Z (up) toward +X (screen left).
      ctx.rotate(-t.yaw);
      ctx.fillStyle = t.alive ? color : 'rgba(40,40,40,0.9)';
      ctx.strokeStyle = 'rgba(0,0,0,0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (t.data.cls === 'SPG') ctx.rect(-5, -5, 10, 10);
      else {
        ctx.moveTo(0, -9);
        ctx.lineTo(6, 6);
        ctx.lineTo(-6, 6);
        ctx.closePath();
      }
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    // Last known positions of lost enemies
    if (player) {
      ctx.fillStyle = 'rgba(255,150,140,0.5)';
      for (const t of world.tanks) {
        if (t.team === player.team || !t.alive || world.detection.isVisibleTo(player, t)) continue;
        const seen = this.lastSeen.get(t.id);
        if (!seen || world.time - seen.time > 25) continue;
        const [x, y] = this.toScreen(seen.x, seen.z);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
