// The fly's world: food/water/bitter items, scenery, and the swatter (the main danger).
import * as THREE from 'three';

export const STIM = { sugar: ['sugar'], water: ['water'], bitter: ['bitter'], mix: ['sugar', 'bitter'] };
export const LABEL = { sugar: 'сахар', water: 'вода', bitter: 'горькое', mix: 'гнилой фрукт' };

export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** An item is a Group with userData { type, amount (1 = full), badUntil (world seconds) }. */
export function makeItem(type) {
  const g = new THREE.Group();
  if (type === 'sugar') {
    const m = new THREE.MeshStandardMaterial({ color: 0xf4f1ea, roughness: 0.55 });
    for (let i = 0; i < 6; i++) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.34), m);
      c.position.set((Math.random() - .5) * .35, 0.17 + (i > 3 ? .3 : 0), (Math.random() - .5) * .35);
      c.rotation.y = Math.random() * 3; c.castShadow = true; g.add(c);
    }
  } else if (type === 'water') {
    const m = new THREE.MeshPhysicalMaterial({ color: 0x66b6ff, transmission: 0.7, roughness: 0.05, transparent: true, opacity: 0.8, thickness: 0.4 });
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), m); d.scale.y = 0.55; g.add(d);
  } else if (type === 'bitter') {
    const m = new THREE.MeshStandardMaterial({ color: 0x4d5a22, roughness: 0.7 });
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 1), m);
      s.position.set((Math.random() - .5) * .6, 0.14, (Math.random() - .5) * .6); s.castShadow = true; g.add(s);
    }
  } else { // mix: overripe fruit, sweet and bitter at once
    const m = new THREE.MeshStandardMaterial({ color: 0xa8321e, roughness: 0.5 });
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.4, 20, 14), m); f.scale.y = 0.85; f.position.y = 0.34; f.castShadow = true; g.add(f);
    const spot = new THREE.MeshStandardMaterial({ color: 0x4a3a1a, roughness: 0.9 });
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), spot);
      const a = Math.random() * 6.28, h = 0.15 + Math.random() * 0.35;
      s.position.set(Math.cos(a) * 0.37, h, Math.sin(a) * 0.37); g.add(s);
    }
  }
  g.userData = { type, amount: 1, badUntil: 0 };
  return g;
}

export function buildScenery(scene, seed = 7) {
  const rng = mulberry32(seed), grp = new THREE.Group();
  const rockM = new THREE.MeshStandardMaterial({ color: 0x59606a, roughness: 0.95, flatShading: true });
  const leafM = new THREE.MeshStandardMaterial({ color: 0x3f7a42, roughness: 0.8, side: THREE.DoubleSide });
  const stemM = new THREE.MeshStandardMaterial({ color: 0x2f5a30, roughness: 0.9 });
  for (let i = 0; i < 26; i++) {
    const a = rng() * 6.283, r = 5 + rng() * 22, s = 0.3 + rng() * 0.9;
    const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(s, 0), rockM);
    rock.position.set(Math.cos(a) * r, s * 0.45, Math.sin(a) * r); rock.rotation.set(rng() * 3, rng() * 3, rng() * 3); rock.scale.y = 0.65;
    rock.castShadow = rock.receiveShadow = true; grp.add(rock);
  }
  for (let i = 0; i < 70; i++) { // grass tufts
    const a = rng() * 6.283, r = 2 + rng() * 26, tuft = new THREE.Group();
    for (let k = 0; k < 4; k++) {
      const h = 0.6 + rng() * 0.9, blade = new THREE.Mesh(new THREE.ConeGeometry(0.06, h, 4), leafM);
      blade.position.set((rng() - .5) * .25, h / 2, (rng() - .5) * .25); blade.rotation.set((rng() - .5) * .5, 0, (rng() - .5) * .5); tuft.add(blade);
    }
    tuft.position.set(Math.cos(a) * r, 0, Math.sin(a) * r); grp.add(tuft);
  }
  for (let i = 0; i < 9; i++) { // taller plants
    const a = rng() * 6.283, r = 8 + rng() * 17, h = 2.2 + rng() * 2.5, plant = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, h, 6), stemM); stem.position.y = h / 2; stem.castShadow = true; plant.add(stem);
    for (let k = 0; k < 4; k++) {
      const leaf = new THREE.Mesh(new THREE.CircleGeometry(0.7, 10), leafM); leaf.scale.set(1, 0.4, 1);
      leaf.position.set(Math.cos(k * 1.7) * 0.6, h * (0.35 + k * 0.17), Math.sin(k * 1.7) * 0.6); leaf.rotation.set(-1.2, k * 1.7, 0); leaf.castShadow = true; plant.add(leaf);
    }
    plant.position.set(Math.cos(a) * r, 0, Math.sin(a) * r); grp.add(plant);
  }
  scene.add(grp);
  return grp;
}

/** The swatter: a red shadow warns for `warn` seconds, then the paddle slams down. */
export class Swatter {
  constructor(scene, hooks) {
    this.hooks = hooks; this.state = 'idle'; this.t = 0; this.pos = new THREE.Vector3(); this.hit = false;
    this.group = new THREE.Group(); this.group.visible = false;
    const plastic = new THREE.MeshStandardMaterial({ color: 0xd33a2c, roughness: 0.5 });
    const paddle = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 2.8), plastic); paddle.position.y = 0.08; paddle.castShadow = true;
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 7, 8), new THREE.MeshStandardMaterial({ color: 0x222, roughness: 0.6 }));
    handle.position.set(0, 3.6, -1.6); handle.rotation.x = 0.35;
    this.group.add(paddle, handle);
    this.shadow = new THREE.Mesh(new THREE.CircleGeometry(1.7, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xff2a1a, transparent: true, opacity: 0, depthWrite: false }));
    this.shadow.position.y = 0.04; this.shadow.visible = false;
    scene.add(this.group, this.shadow);
  }
  drop(x, z) {
    if (this.state !== 'idle') return false;
    this.pos.set(x, 0, z); this.state = 'warn'; this.t = 0; this.hit = false;
    this.group.position.set(x, 8, z); this.group.visible = true;
    this.shadow.position.set(x, 0.04, z); this.shadow.visible = true;
    this.hooks.onWarn(this.pos);
    return true;
  }
  update(dt) {
    if (this.state === 'idle') return;
    this.t += dt;
    if (this.state === 'warn') {
      this.shadow.material.opacity = 0.15 + 0.35 * Math.min(1, this.t / 1.4) + 0.1 * Math.sin(this.t * 18);
      this.group.position.y = 8 - 2.2 * (this.t / 1.4);
      if (this.t >= 1.4) { this.state = 'strike'; this.t = 0; }
    } else if (this.state === 'strike') {
      const k = Math.min(1, this.t / 0.12);
      this.group.position.y = 5.8 * (1 - k) + 0.02;
      if (k >= 1 && !this.hit) { this.hit = true; this.hooks.onStrike(this.pos); }
      if (this.t >= 0.65) { this.state = 'lift'; this.t = 0; }
    } else if (this.state === 'lift') {
      this.group.position.y = Math.min(9, 0.02 + this.t * 12); this.shadow.material.opacity *= 0.85;
      if (this.t >= 0.7) { this.state = 'idle'; this.group.visible = false; this.shadow.visible = false; }
    }
  }
}
