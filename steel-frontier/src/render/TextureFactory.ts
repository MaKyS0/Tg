import {
  CanvasTexture, ClampToEdgeWrapping, LinearMipmapLinearFilter, RepeatWrapping, SRGBColorSpace, type Texture,
} from 'three';
import { Noise2D } from '../core/Noise';
import { Random } from '../core/Random';

/**
 * Procedural texture generation (no external assets): tileable albedo, normal, roughness and
 * sprite textures built on canvases once and cached.
 */
const cache = new Map<string, Texture>();

function canvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  return [c, c.getContext('2d', { willReadFrequently: true })!];
}

function toTexture(c: HTMLCanvasElement, srgb: boolean, repeat = true): CanvasTexture {
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = repeat ? RepeatWrapping : ClampToEdgeWrapping;
  t.minFilter = LinearMipmapLinearFilter;
  t.anisotropy = 4;
  if (srgb) t.colorSpace = SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

function cached(key: string, make: () => Texture): Texture {
  let t = cache.get(key);
  if (!t) {
    t = make();
    cache.set(key, t);
  }
  return t;
}

/** Tileable fbm field in [0,1] (periodic by wrapping noise coordinates on a torus-like sampling). */
function tileableField(size: number, seed: number, scale: number, octaves: number): Float32Array {
  const n = new Noise2D(seed);
  const out = new Float32Array(size * size);
  const R = scale / (Math.PI * 2);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const a = (x / size) * Math.PI * 2;
      const b = (y / size) * Math.PI * 2;
      // Map onto two circles so edges wrap seamlessly.
      const nx = Math.cos(a) * R;
      const ny = Math.sin(a) * R;
      const nz = Math.cos(b) * R;
      const nw = Math.sin(b) * R;
      const v = n.fbm(nx + nz * 0.7 + 13.1, ny + nw * 0.7 + 7.7, octaves) * 0.6 + n.fbm(nz - ny * 0.3 + 3.3, nw + nx * 0.3 - 9.1, octaves) * 0.4;
      out[y * size + x] = v * 0.5 + 0.5;
    }
  }
  return out;
}

/** Converts a height field to a tangent-space normal map. */
function normalFromHeight(h: Float32Array, size: number, strength: number): HTMLCanvasElement {
  const [c, ctx] = canvas(size);
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const l = h[y * size + ((x - 1 + size) % size)];
      const r = h[y * size + ((x + 1) % size)];
      const u = h[((y - 1 + size) % size) * size + x];
      const d = h[((y + 1) % size) * size + x];
      let nx = (l - r) * strength;
      let ny = (u - d) * strength;
      let nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len;
      ny /= len;
      nz /= len;
      const i = (y * size + x) * 4;
      img.data[i] = (nx * 0.5 + 0.5) * 255;
      img.data[i + 1] = (ny * 0.5 + 0.5) * 255;
      img.data[i + 2] = (nz * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

function grayCanvas(h: Float32Array, size: number, lo: number, hi: number): HTMLCanvasElement {
  const [c, ctx] = canvas(size);
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const v = (lo + (hi - lo) * h[i]) * 255;
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export const TextureFactory = {
  /** Grayscale ground detail (multiplied onto vertex colours). */
  groundDetail(): Texture {
    return cached('groundDetail', () => {
      const size = 256;
      const h = tileableField(size, 11, 6, 5);
      const g = tileableField(size, 12, 24, 3);
      for (let i = 0; i < h.length; i++) h[i] = h[i] * 0.7 + g[i] * 0.3;
      return toTexture(grayCanvas(h, size, 0.72, 1.12), true);
    });
  },

  groundNormal(): Texture {
    return cached('groundNormal', () => {
      const size = 256;
      const h = tileableField(size, 13, 18, 4);
      return toTexture(normalFromHeight(h, size, 5), false);
    });
  },

  /** Nation camouflage pattern (blotches) — albedo. */
  camo(base: string, dark: string, light: string, seed: number): Texture {
    return cached(`camo:${base}:${dark}:${light}:${seed}`, () => {
      const size = 256;
      const [c, ctx] = canvas(size);
      const f1 = tileableField(size, seed, 3, 4);
      const f2 = tileableField(size, seed + 1, 4, 4);
      const grain = tileableField(size, seed + 2, 60, 2);
      const img = ctx.createImageData(size, size);
      const cb = hexRgb(base);
      const cd = hexRgb(dark);
      const cl = hexRgb(light);
      for (let i = 0; i < size * size; i++) {
        let col = cb;
        if (f1[i] > 0.6) col = cd;
        else if (f2[i] > 0.63) col = cl;
        const g = 0.88 + grain[i] * 0.2;
        img.data[i * 4] = Math.min(255, col[0] * g);
        img.data[i * 4 + 1] = Math.min(255, col[1] * g);
        img.data[i * 4 + 2] = Math.min(255, col[2] * g);
        img.data[i * 4 + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      // Dirt toward the bottom edge of every tile and subtle wear streaks
      const rng = new Random(seed);
      ctx.globalAlpha = 0.08;
      for (let k = 0; k < 120; k++) {
        ctx.fillStyle = rng.chance(0.5) ? '#2a2418' : '#c9c0a6';
        ctx.fillRect(rng.next() * size, rng.next() * size, 1 + rng.next() * 2, 6 + rng.next() * 30);
      }
      ctx.globalAlpha = 1;
      return toTexture(c, true);
    });
  },

  /** Armour plate normal map: panel seams, weld lines and rivets. */
  armorNormal(): Texture {
    return cached('armorNormal', () => {
      const size = 512;
      const h = tileableField(size, 21, 40, 3);
      for (let i = 0; i < h.length; i++) h[i] *= 0.15;
      const line = (x0: number, y0: number, x1: number, y1: number, depth: number) => {
        const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
        for (let s = 0; s <= steps; s++) {
          const x = Math.round(x0 + ((x1 - x0) * s) / steps);
          const y = Math.round(y0 + ((y1 - y0) * s) / steps);
          for (let o = -1; o <= 1; o++) {
            const xx = (x + (y0 === y1 ? 0 : o) + size) % size;
            const yy = (y + (y0 === y1 ? o : 0) + size) % size;
            h[yy * size + xx] -= depth * (o === 0 ? 1 : 0.5);
          }
        }
      };
      for (let k = 0; k < size; k += 128) {
        line(k, 0, k, size - 1, 0.6);
        line(0, k, size - 1, k, 0.6);
      }
      for (let y = 16; y < size; y += 128) {
        for (let x = 8; x < size; x += 24) {
          for (let dy = -2; dy <= 2; dy++)
            for (let dx = -2; dx <= 2; dx++)
              if (dx * dx + dy * dy <= 4) h[((y + dy + size) % size) * size + ((x + dx + size) % size)] += 0.5;
        }
      }
      return toTexture(normalFromHeight(h, size, 3), false);
    });
  },

  /** Roughness map with worn, smoother edges. */
  armorRoughness(): Texture {
    return cached('armorRough', () => {
      const size = 256;
      const h = tileableField(size, 31, 12, 4);
      return toTexture(grayCanvas(h, size, 0.55, 0.95), false);
    });
  },

  /** Track links, scrolled along U to animate. */
  track(): Texture {
    return cached('track', () => {
      const w = 128;
      const [c, ctx] = canvas(w);
      ctx.fillStyle = '#2b2a28';
      ctx.fillRect(0, 0, w, w);
      for (let x = 0; x < w; x += 16) {
        ctx.fillStyle = '#4a4744';
        ctx.fillRect(x, 0, 11, w);
        ctx.fillStyle = '#5d5953';
        ctx.fillRect(x + 2, 8, 7, w - 16);
        ctx.fillStyle = '#1a1918';
        ctx.fillRect(x + 11, 0, 5, w);
      }
      return toTexture(c, true);
    });
  },

  /** Building facade with windows (world-UV mapped). */
  facade(style: 'stone' | 'concrete' | 'wood' | 'adobe' | 'hall' | 'container'): Texture {
    return cached(`facade:${style}`, () => {
      const size = 256;
      const [c, ctx] = canvas(size);
      const rng = new Random(style.length * 977);
      const palette: Record<string, [string, string]> = {
        stone: ['#9c8f7d', '#6f655a'],
        concrete: ['#8f8e89', '#6c6b67'],
        wood: ['#7a5a3a', '#5a4029'],
        adobe: ['#c3a57c', '#a5865f'],
        hall: ['#7f8486', '#5c6163'],
        container: ['#b0b0b0', '#8c8c8c'],
      };
      const [base, dark] = palette[style];
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, size, size);
      const noise = tileableField(size, style.length * 31, 20, 3);
      const img = ctx.getImageData(0, 0, size, size);
      for (let i = 0; i < size * size; i++) {
        const k = 0.85 + noise[i] * 0.3;
        img.data[i * 4] *= k;
        img.data[i * 4 + 1] *= k;
        img.data[i * 4 + 2] *= k;
      }
      ctx.putImageData(img, 0, 0);
      if (style === 'wood') {
        ctx.strokeStyle = dark;
        ctx.lineWidth = 2;
        for (let y = 0; y < size; y += 16) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(size, y);
          ctx.stroke();
        }
      } else if (style === 'container' || style === 'hall') {
        ctx.fillStyle = dark;
        for (let x = 0; x < size; x += 12) ctx.fillRect(x, 0, 4, size);
      } else {
        ctx.fillStyle = dark;
        for (let y = 0; y < size; y += 32) ctx.fillRect(0, y, size, 2);
      }
      if (style !== 'container') {
        // Windows: one floor = 64 px = 3.2 m
        for (let fy = 0; fy < 4; fy++) {
          for (let fx = 0; fx < 4; fx++) {
            if (style === 'hall' && fy !== 1) continue;
            const x = fx * 64 + 18;
            const y = fy * 64 + 16;
            const lit = rng.chance(0.15);
            ctx.fillStyle = '#3b3a36';
            ctx.fillRect(x - 3, y - 3, 34, 38);
            ctx.fillStyle = lit ? '#c9b77a' : rng.chance(0.3) ? '#1b2228' : '#33434d';
            ctx.fillRect(x, y, 28, 32);
            ctx.fillStyle = '#2a2a28';
            ctx.fillRect(x + 13, y, 2, 32);
            ctx.fillRect(x, y + 15, 28, 2);
          }
        }
      }
      return toTexture(c, true);
    });
  },

  bark(): Texture {
    return cached('bark', () => {
      const size = 128;
      const [c, ctx] = canvas(size);
      const h = tileableField(size, 41, 30, 3);
      const img = ctx.createImageData(size, size);
      for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
          const i = y * size + x;
          const stripe = 0.5 + 0.5 * Math.sin((x / size) * Math.PI * 16 + h[i] * 4);
          const v = 0.6 + stripe * 0.3 + h[i] * 0.2;
          img.data[i * 4] = 92 * v;
          img.data[i * 4 + 1] = 72 * v;
          img.data[i * 4 + 2] = 52 * v;
          img.data[i * 4 + 3] = 255;
        }
      ctx.putImageData(img, 0, 0);
      return toTexture(c, true);
    });
  },

  rock(): Texture {
    return cached('rock', () => {
      const size = 256;
      const h = tileableField(size, 51, 10, 5);
      return toTexture(grayCanvas(h, size, 0.55, 1.0), true);
    });
  },

  rockNormal(): Texture {
    return cached('rockNormal', () => {
      const size = 256;
      const h = tileableField(size, 52, 14, 5);
      return toTexture(normalFromHeight(h, size, 6), false);
    });
  },

  waterNormal(): Texture {
    return cached('waterNormal', () => {
      const size = 256;
      const h = tileableField(size, 61, 8, 4);
      return toTexture(normalFromHeight(h, size, 3), false);
    });
  },

  /** Soft round sprite for smoke/dust particles. */
  softParticle(): Texture {
    return cached('softParticle', () => {
      const size = 128;
      const [c, ctx] = canvas(size);
      const noise = tileableField(size, 71, 6, 4);
      const img = ctx.createImageData(size, size);
      for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
          const dx = (x - size / 2) / (size / 2);
          const dy = (y - size / 2) / (size / 2);
          const d = Math.sqrt(dx * dx + dy * dy);
          const a = Math.max(0, 1 - d) ** 1.5 * (0.6 + 0.6 * noise[y * size + x]);
          const i = (y * size + x) * 4;
          img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
          img.data[i + 3] = Math.min(255, a * 255);
        }
      ctx.putImageData(img, 0, 0);
      return toTexture(c, false, false);
    });
  },

  /** Scorch / penetration hole decal. */
  scorch(): Texture {
    return cached('scorch', () => {
      const size = 128;
      const [c, ctx] = canvas(size);
      const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
      g.addColorStop(0, 'rgba(5,5,5,1)');
      g.addColorStop(0.15, 'rgba(20,18,16,0.95)');
      g.addColorStop(0.5, 'rgba(40,34,28,0.55)');
      g.addColorStop(1, 'rgba(40,34,28,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      return toTexture(c, true, false);
    });
  },

  /** Single track print for terrain marks. */
  trackMark(): Texture {
    return cached('trackMark', () => {
      const w = 64;
      const [c, ctx] = canvas(w);
      ctx.clearRect(0, 0, w, w);
      for (let y = 0; y < w; y += 8) {
        ctx.fillStyle = 'rgba(30,24,16,0.55)';
        ctx.fillRect(6, y, w - 12, 5);
      }
      return toTexture(c, true);
    });
  },

  /** Interior hangar floor. */
  hangarFloor(): Texture {
    return cached('hangarFloor', () => {
      const size = 512;
      const [c, ctx] = canvas(size);
      const h = tileableField(size, 81, 8, 4);
      const img = ctx.createImageData(size, size);
      for (let i = 0; i < size * size; i++) {
        const v = 70 + h[i] * 40;
        img.data[i * 4] = v;
        img.data[i * 4 + 1] = v * 0.98;
        img.data[i * 4 + 2] = v * 0.94;
        img.data[i * 4 + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      ctx.strokeStyle = 'rgba(20,20,20,0.6)';
      ctx.lineWidth = 3;
      for (let k = 0; k <= size; k += 128) {
        ctx.beginPath();
        ctx.moveTo(k, 0);
        ctx.lineTo(k, size);
        ctx.moveTo(0, k);
        ctx.lineTo(size, k);
        ctx.stroke();
      }
      return toTexture(c, true);
    });
  },
};

export function hexRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}
