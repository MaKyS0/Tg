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
      // Fine speckle (pebbles, grass stems), blurred once so it does not shimmer.
      const rng = new Random(13);
      const sp = new Float32Array(size * size).map(() => rng.next());
      for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
          const i = y * size + x;
          const n = (sp[i] * 2 + sp[y * size + ((x + 1) % size)] + sp[((y + 1) % size) * size + x]) / 4;
          h[i] = h[i] * 0.55 + g[i] * 0.25 + n * 0.2;
        }
      return toTexture(grayCanvas(h, size, 0.62, 1.18), true);
    });
  },

  groundNormal(): Texture {
    return cached('groundNormal', () => {
      const size = 256;
      const h = tileableField(size, 13, 18, 4);
      return toTexture(normalFromHeight(h, size, 5), false);
    });
  },

  /** Nation camouflage — albedo. Pattern: blotch, stripe (tiger), splinter, solid, dots (ambush). */
  camo(base: string, dark: string, light: string, seed: number, pattern: 'blotch' | 'stripe' | 'splinter' | 'solid' | 'dots' = 'blotch'): Texture {
    return cached(`camo:${base}:${dark}:${light}:${seed}:${pattern}`, () => {
      const size = 256;
      const [c, ctx] = canvas(size);
      const f1 = tileableField(size, seed, 3, 4);
      const f2 = tileableField(size, seed + 1, 4, 4);
      const grain = tileableField(size, seed + 2, 60, 2);
      const tone = tileableField(size, seed + 3, 2, 3);
      const img = ctx.createImageData(size, size);
      const cb = hexRgb(base);
      const cd = hexRgb(dark);
      const cl = hexRgb(light);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const i = y * size + x;
          let col = cb;
          if (pattern === 'blotch' || pattern === 'dots') {
            if (f1[i] > 0.6) col = cd;
            else if (f2[i] > 0.63) col = cl;
          } else if (pattern === 'stripe') {
            // Diagonal, noise-warped tiger stripes (tileable: integer stripe count across the tile).
            const u = (x + y) / size;
            const w = Math.sin((u * 6 + f1[i] * 1.6) * Math.PI * 2);
            if (w > 0.55) col = cd;
            else if (w < -0.8 && f2[i] > 0.5) col = cl;
          }
          const g = (0.86 + grain[i] * 0.2) * (pattern === 'solid' ? 0.9 + tone[i] * 0.2 : 0.96 + tone[i] * 0.08);
          img.data[i * 4] = Math.min(255, col[0] * g);
          img.data[i * 4 + 1] = Math.min(255, col[1] * g);
          img.data[i * 4 + 2] = Math.min(255, col[2] * g);
          img.data[i * 4 + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      const rng = new Random(seed * 7 + pattern.length);
      const wrapDraw = (draw: (ox: number, oy: number) => void) => {
        for (const ox of [-size, 0, size]) for (const oy of [-size, 0, size]) draw(ox, oy);
      };
      if (pattern === 'splinter') {
        // Angular, overlapping polygons in the dark and light colours.
        for (let k = 0; k < 26; k++) {
          const cx = rng.next() * size;
          const cy = rng.next() * size;
          const r = 15 + rng.next() * 35;
          const n = 3 + rng.int(0, 2);
          const pts = Array.from({ length: n }, (_, j) => {
            const a = (j / n) * Math.PI * 2 + rng.range(-0.4, 0.4);
            const rr = r * rng.range(0.5, 1.3);
            return [Math.cos(a) * rr, Math.sin(a) * rr * 0.6] as const;
          });
          ctx.fillStyle = k % 3 === 0 ? light : dark;
          wrapDraw((ox, oy) => {
            ctx.beginPath();
            pts.forEach(([px, py], j) => (j ? ctx.lineTo(cx + px + ox, cy + py + oy) : ctx.moveTo(cx + px + ox, cy + py + oy)));
            ctx.closePath();
            ctx.fill();
          });
        }
      }
      if (pattern === 'dots') {
        for (let k = 0; k < 90; k++) {
          const cx = rng.next() * size;
          const cy = rng.next() * size;
          const r = 2 + rng.next() * 3;
          ctx.fillStyle = rng.chance(0.5) ? light : base;
          wrapDraw((ox, oy) => {
            ctx.beginPath();
            ctx.arc(cx + ox, cy + oy, r, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }
      // Weathering: rain streaks, dust and chipped paint.
      ctx.globalAlpha = 0.07;
      for (let k = 0; k < 260; k++) {
        ctx.fillStyle = rng.chance(0.55) ? '#2a2418' : '#c9c0a6';
        ctx.fillRect(rng.next() * size, rng.next() * size, 1 + rng.next() * 2, 6 + rng.next() * 28);
      }
      ctx.globalAlpha = 0.35;
      for (let k = 0; k < 120; k++) {
        ctx.fillStyle = rng.chance(0.6) ? '#3a3631' : '#8d877a';
        ctx.fillRect(rng.next() * size, rng.next() * size, 1 + rng.next() * 3, 1 + rng.next() * 2);
      }
      ctx.globalAlpha = 1;
      return toTexture(c, true);
    });
  },

  /** Weathered wooden planks (fences, crates). */
  planks(): Texture {
    return cached('planks', () => {
      const size = 256;
      const [c, ctx] = canvas(size);
      const grain = tileableField(size, 91, 30, 3);
      const img = ctx.createImageData(size, size);
      const rng = new Random(91);
      const boardTone = Array.from({ length: 8 }, () => 0.75 + rng.next() * 0.35);
      for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
          const i = y * size + x;
          const board = Math.floor(x / 32);
          const edge = x % 32 < 2 ? 0.45 : 1;
          const streak = 0.8 + 0.2 * Math.sin(y * 0.15 + grain[i] * 9);
          const v = boardTone[board] * edge * streak * (0.85 + grain[i] * 0.3);
          img.data[i * 4] = 118 * v;
          img.data[i * 4 + 1] = 92 * v;
          img.data[i * 4 + 2] = 64 * v;
          img.data[i * 4 + 3] = 255;
        }
      ctx.putImageData(img, 0, 0);
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

  /** Ambient occlusion: darkened panel seams and grime matching the armour normal map layout. */
  armorAO(): Texture {
    return cached('armorAO', () => {
      const size = 512;
      const grime = tileableField(size, 22, 10, 3);
      const [c, ctx] = canvas(size);
      const img = ctx.createImageData(size, size);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const dx = Math.min(x % 128, 128 - (x % 128));
          const dy = Math.min(y % 128, 128 - (y % 128));
          const seam = Math.min(1, Math.min(dx, dy) / 6);
          const v = (0.55 + 0.45 * seam) * (0.85 + grime[y * size + x] * 0.15);
          const i = (y * size + x) * 4;
          img.data[i] = img.data[i + 1] = img.data[i + 2] = v * 255;
          img.data[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      return toTexture(c, false);
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
  facade(style: 'stone' | 'concrete' | 'wood' | 'adobe' | 'hall' | 'container' | 'wall'): Texture {
    return cached(`facade:${style}`, () => {
      const size = 256;
      const [c, ctx] = canvas(size);
      const rng = new Random(style.length * 977 + style.charCodeAt(0));
      const palette: Record<string, [string, string]> = {
        stone: ['#9c8f7d', '#6f655a'],
        concrete: ['#8f8e89', '#6c6b67'],
        wood: ['#7a5a3a', '#5a4029'],
        adobe: ['#c3a57c', '#a5865f'],
        hall: ['#7f8486', '#5c6163'],
        container: ['#b0b0b0', '#8c8c8c'],
        wall: ['#8e887e', '#6a655d'],
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
        for (let y = 0; y < size; y += 32) {
          ctx.fillRect(0, y, size, 2);
          if (style === 'wall' || style === 'stone') for (let x = (y / 32) % 2 ? 0 : 32; x < size; x += 64) ctx.fillRect(x, y, 2, 32);
        }
      }
      if (style !== 'container' && style !== 'wall') {
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

  /** Leaf clusters for tree canopies: light leaves over dark gaps (multiplied with the foliage colour). */
  foliage(): Texture {
    return cached('foliage', () => {
      const size = 256;
      const [c, ctx] = canvas(size);
      ctx.fillStyle = '#5a6650';
      ctx.fillRect(0, 0, size, size);
      const rng = new Random(77);
      for (let k = 0; k < 900; k++) {
        const x = rng.next() * size;
        const y = rng.next() * size;
        const r = 3 + rng.next() * 6;
        const l = 150 + rng.next() * 105;
        ctx.fillStyle = `rgb(${l * 0.92},${l},${l * 0.82})`;
        for (const ox of [-size, 0, size]) for (const oy of [-size, 0, size]) {
          ctx.beginPath();
          ctx.ellipse(x + ox, y + oy, r, r * 0.55, rng.next() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
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
