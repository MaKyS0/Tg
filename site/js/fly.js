// Procedural 3D fly (three.js): body, compound eyes, translucent flapping wings, six articulated legs, proboscis.
// The model faces +Z locally. Heading h: forward = (sin h, 0, cos h).
import * as THREE from 'three';

const STAND_Y = 0.72; // body-centre height when standing on the ground

function canvasTex(w, h, draw, repeat) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  return t;
}

function textures() {
  const abdomen = canvasTex(128, 256, (g, w, h) => {
    g.fillStyle = '#34383d'; g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 1) {
      const band = Math.floor(y / 24) % 2;
      g.fillStyle = band ? 'rgba(10,12,14,.85)' : 'rgba(70,76,82,.55)';
      g.fillRect(0, y, w, 1);
    }
    for (let i = 0; i < 700; i++) { g.fillStyle = `rgba(160,170,180,${Math.random() * .25})`; g.fillRect(Math.random() * w, Math.random() * h, 1, 2); }
  });
  const thorax = canvasTex(256, 128, (g, w, h) => {
    g.fillStyle = '#4a5057'; g.fillRect(0, 0, w, h);
    for (let k = 0; k < 8; k++) { // dark longitudinal stripes (meridians)
      if (k % 2 === 0) { g.fillStyle = 'rgba(12,14,16,.8)'; g.fillRect((k * w) / 8, 0, w / 16, h); }
    }
    for (let i = 0; i < 900; i++) { g.fillStyle = `rgba(190,196,204,${Math.random() * .2})`; g.fillRect(Math.random() * w, Math.random() * h, 1, 2); }
  });
  const eye = canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = '#9d1b1b'; g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 8) for (let x = 0; x < w; x += 8) {
      const ox = (y / 8) % 2 ? 4 : 0;
      const grd = g.createRadialGradient(x + ox, y, 0, x + ox, y, 5);
      grd.addColorStop(0, 'rgba(255,120,100,.95)'); grd.addColorStop(1, 'rgba(90,5,10,.0)');
      g.fillStyle = grd; g.beginPath(); g.arc(x + ox, y, 5, 0, 7); g.fill();
    }
  });
  const wing = canvasTex(256, 128, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.fillStyle = 'rgba(205,225,240,.28)'; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(70,60,50,.85)'; g.lineWidth = 2.4;
    const veins = [[0.5, 0.18, 1.0, 0.1], [0.5, 0.35, 1.0, 0.33], [0.5, 0.5, 1.0, 0.58], [0.5, 0.6, 0.95, 0.85], [0.5, 0.7, 0.8, 0.95]];
    g.beginPath(); g.moveTo(0, 0.5 * h); g.lineTo(0.5 * w, 0.5 * h); g.stroke();
    for (const [x0, y0, x1, y1] of veins) { g.beginPath(); g.moveTo(x0 * w, 0.5 * h); g.quadraticCurveTo(0.75 * w, y0 * h, x1 * w, y1 * h); g.stroke(); }
    g.beginPath(); g.moveTo(0.62 * w, 0.2 * h); g.lineTo(0.66 * w, 0.62 * h); g.stroke();
  });
  return { abdomen, thorax, eye, wing };
}

function cylinderBetween(mesh, a, b) {
  const d = new THREE.Vector3().subVectors(b, a);
  const len = d.length();
  mesh.position.copy(a).addScaledVector(d, 0.5);
  mesh.scale.set(1, len, 1);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
}

export function buildFly() {
  const tx = textures();
  const root = new THREE.Group();
  root.rotation.order = 'YXZ';
  const body = new THREE.Group(); // inner group so we can bob/tilt without touching world transform
  root.add(body);

  const mat = (opts) => new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.15, ...opts });
  const sph = (r, sx, sy, sz, material, x, y, z, rotX = false) => {
    const geo = new THREE.SphereGeometry(r, 32, 24);
    if (rotX) geo.rotateX(Math.PI / 2);
    const m = new THREE.Mesh(geo, material);
    m.scale.set(sx, sy, sz); m.position.set(x, y, z);
    m.castShadow = true;
    body.add(m);
    return m;
  };

  sph(0.55, 0.9, 0.85, 1.1, mat({ map: tx.thorax }), 0, 0, 0, true);
  sph(0.62, 0.95, 0.9, 1.45, mat({ map: tx.abdomen }), 0, -0.04, -1.0, true);
  const head = new THREE.Group(); head.position.set(0, 0, 0.88); body.add(head);
  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 18), mat({ color: 0x5b4a3a }));
  headMesh.scale.set(1, 0.9, 0.85); headMesh.castShadow = true; head.add(headMesh);
  for (const s of [-1, 1]) {
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.34, 28, 20), mat({ map: tx.eye, bumpMap: tx.eye, bumpScale: 1.5, roughness: 0.25, metalness: 0.0, emissive: 0x330000 }));
    e.scale.set(0.82, 1.02, 0.9); e.position.set(s * 0.3, 0.1, 0.08); e.castShadow = true; head.add(e);
  }
  // proboscis (extendable), pivoting at the base under the head
  const prob = new THREE.Group(); prob.position.set(0, -0.22, 0.28); head.add(prob);
  const pgeo = new THREE.CylinderGeometry(0.05, 0.075, 1, 8); pgeo.rotateX(Math.PI / 2); pgeo.translate(0, 0, 0.5);
  const pm = new THREE.Mesh(pgeo, mat({ color: 0x8a6a5a })); pm.castShadow = true; prob.add(pm);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), mat({ color: 0xd69a9a, roughness: 0.6 }));
  tip.scale.set(1.3, 0.7, 1); prob.add(tip);

  // wings: base at the pivot, tip sweeping outward and backward
  const wings = [];
  for (const s of [-1, 1]) {
    const geo = new THREE.CircleGeometry(1, 32);
    geo.rotateX(-Math.PI / 2); geo.scale(0.95, 1, 0.34); geo.translate(s * 0.95, 0, 0); geo.rotateY(s * 0.6);
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tx.wing, transparent: true, side: THREE.DoubleSide, roughness: 0.2, metalness: 0, depthWrite: false }));
    const pivot = new THREE.Group(); pivot.position.set(s * 0.3, 0.42, -0.05); pivot.add(m);
    body.add(pivot); wings.push({ pivot, s });
  }

  // legs
  const legMat = mat({ color: 0x1d1f22, roughness: 0.6 });
  const legGeo = new THREE.CylinderGeometry(0.045, 0.06, 1, 6);
  const legs = [];
  const hips = [[0.42, 0.18], [0.0, 0.0], [-0.42, -0.35]]; // z, yaw offset (front, mid, hind)
  for (const s of [-1, 1]) hips.forEach(([z, yaw0], idx) => {
    const femur = new THREE.Mesh(legGeo, legMat), tibia = new THREE.Mesh(legGeo, legMat);
    femur.castShadow = tibia.castShadow = true;
    body.add(femur, tibia);
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 6), legMat); body.add(foot);
    legs.push({ s, idx, hip: new THREE.Vector3(s * 0.28, -0.3, z), yaw0: [0.75, 0.05, -0.65][idx], femur, tibia, foot, group: (idx + (s > 0 ? 0 : 1)) % 2 });
  });

  const v1 = new THREE.Vector3(), v2 = new THREE.Vector3();
  const api = {
    root, body, head, legs, wings, prob,
    wingPhase: 0, gait: 0,
    /** st: {fly:0..1 airborne blend, walk:0..1, probe:0..1 front legs reaching, prob:0..1 proboscis extension, pump:0..1} */
    update(dt, st, t) {
      // wings
      const fly = st.fly;
      this.wingPhase += dt * Math.PI * 2 * (fly > 0.2 ? 26 : 0);
      const amp = 0.05 + 0.8 * fly;
      for (const { pivot, s } of wings) {
        const rest = 0.12 + 0.2 * fly;
        pivot.rotation.z = s * (rest + amp * Math.sin(this.wingPhase));
        pivot.rotation.y = s * (0.75 * (1 - fly)); // folded back over the abdomen when landed
      }
      // proboscis
      const pe = st.prob;
      prob.rotation.x = 1.35 - 0.75 * pe;
      const len = 0.28 + 0.65 * pe + 0.04 * st.pump * Math.sin(t * 38);
      pm.scale.set(1, 1, len); tip.position.set(0, 0, len);
      // legs
      this.gait += dt * 9 * st.walk;
      for (const L of legs) {
        const ph = this.gait + L.group * Math.PI;
        const sw = Math.sin(ph), lift = Math.max(0, Math.cos(ph));
        let yaw = L.yaw0 + 0.4 * sw * st.walk, p1 = 0.55 + 0.3 * lift * st.walk, p2 = -1.2 + 0.45 * lift * st.walk, yaw2 = yaw * 0.6;
        if (L.idx === 0) { // front legs reach toward whatever is being tasted
          yaw += 0.55 * st.probe; yaw2 += 0.8 * st.probe; p1 += 0.25 * st.probe; p2 += 0.45 * st.probe + 0.1 * Math.sin(t * 12 + L.s) * st.probe;
        }
        // airborne: tuck legs up and back, dangling slightly
        yaw = yaw * (1 - fly) + (-0.5 + 0.1 * Math.sin(t * 5 + L.idx)) * fly;
        yaw2 = yaw2 * (1 - fly) + -0.9 * fly;
        p1 = p1 * (1 - fly) + 0.95 * fly;
        p2 = p2 * (1 - fly) + -0.35 * fly;
        const d1 = v1.set(L.s * Math.cos(p1) * Math.cos(yaw), Math.sin(p1), Math.cos(p1) * Math.sin(yaw)).multiplyScalar(0.55);
        const knee = L.hip.clone().add(d1);
        const d2 = v2.set(L.s * Math.cos(p2) * Math.cos(yaw2), Math.sin(p2), Math.cos(p2) * Math.sin(yaw2)).multiplyScalar(0.78);
        const foot = knee.clone().add(d2);
        cylinderBetween(L.femur, L.hip, knee); cylinderBetween(L.tibia, knee, foot);
        L.foot.position.copy(foot);
      }
    },
  };
  return api;
}

export { STAND_Y };
