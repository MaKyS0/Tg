import * as THREE from 'three';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { Brain } from './brain.js';
import { buildFly, STAND_Y } from './fly.js';

const $ = (id) => document.getElementById(id);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const wrapPi = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const lerp = (a, b, k) => a + (b - a) * k;

// ------------------------------------------------------------------ scene
const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x10141c);
scene.fog = new THREE.Fog(0x10141c, 18, 45);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
camera.position.set(4.2, 3.2, 5.5);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; controls.maxPolarAngle = Math.PI * 0.49; controls.minDistance = 2; controls.maxDistance = 16;
controls.target.set(0, 0.8, 0);

scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x2a2018, 0.8));
const sun = new THREE.DirectionalLight(0xfff0dd, 2.2);
sun.position.set(5, 9, 4); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 30 });
scene.add(sun);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(30, 64).rotateX(-Math.PI / 2),
  new THREE.MeshStandardMaterial({ color: 0x2c3a2f, roughness: 0.95 }));
ground.receiveShadow = true; scene.add(ground);
const grid = new THREE.GridHelper(40, 40, 0x44604a, 0x33463a); grid.position.y = 0.01; grid.material.opacity = 0.35; grid.material.transparent = true; scene.add(grid);
const marker = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.32, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x7fd4ff, transparent: true, opacity: 0.9 }));
marker.position.y = 0.03; marker.visible = false; scene.add(marker);

function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

// ------------------------------------------------------------------ fly + items
const fly = buildFly();
scene.add(fly.root);
const F = { // kinematic state
  pos: new THREE.Vector3(0, STAND_Y, 0), heading: 0.6, speed: 0, air: 0, walk: 0, probe: 0, prob: 0, pump: 0, bank: 0, pitch: 0,
};

function makeItem(type) {
  const g = new THREE.Group();
  let radius = 0.4;
  if (type === 'sugar') {
    const m = new THREE.MeshStandardMaterial({ color: 0xf4f1ea, roughness: 0.55 });
    for (let i = 0; i < 6; i++) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.34), m);
      c.position.set((Math.random() - .5) * .35, 0.17 + (i > 3 ? .3 : 0), (Math.random() - .5) * .35);
      c.rotation.y = Math.random() * 3; c.castShadow = true; g.add(c);
    }
  } else if (type === 'water') {
    const m = new THREE.MeshPhysicalMaterial({ color: 0x66b6ff, transmission: 0.7, roughness: 0.05, transparent: true, opacity: 0.8, thickness: 0.4 });
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), m); d.scale.y = 0.6; g.add(d);
  } else { // bitter: dark green quinine pellets
    const m = new THREE.MeshStandardMaterial({ color: 0x4d5a22, roughness: 0.7 });
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 1), m);
      s.position.set((Math.random() - .5) * .6, 0.14, (Math.random() - .5) * .6); s.castShadow = true; g.add(s);
    }
  }
  g.userData = { type, radius, amount: 1 };
  return g;
}
let item = null;
function placeItem(type, x, z) {
  if (item) scene.remove(item);
  item = makeItem(type); item.position.set(x, 0, z); scene.add(item);
}
function removeItem() { if (item) { scene.remove(item); item = null; } }

// ------------------------------------------------------------------ brain + panel
let brain = null;
const panel = $('brain'), pctx = panel.getContext('2d');
const chart = $('rate'), cctx = chart.getContext('2d');
const CLS_COLORS = { sensory: [255, 190, 60], central: [110, 160, 255], descending: [90, 255, 150], motor: [255, 80, 120], ascending: [90, 230, 255], endocrine: [220, 140, 255], other: [180, 180, 180] };
let rot = 0;
function drawBrain() {
  const W = panel.width, H = panel.height;
  pctx.fillStyle = 'rgba(8,10,16,0.55)'; pctx.fillRect(0, 0, W, H);
  if (!brain) return;
  pctx.globalCompositeOperation = 'lighter';
  const c = Math.cos(rot), s = Math.sin(rot), n = brain.n, xyz = brain.xyz, sc = W * 0.36;
  for (let i = 0; i < n; i++) {
    const [x, y, z] = xyz[i];
    const px = x * c + z * s, pz = -x * s + z * c;
    const persp = 1 / (1 + pz * 0.25);
    const age = brain.t - brain.lastSpike[i];
    const k = age < 150 ? 1 - age / 150 : 0;
    const col = CLS_COLORS[brain.classes[brain.cls[i]]] || CLS_COLORS.other;
    const a = 0.12 + 0.88 * k;
    const r = (brain.cls[i] === 0 || brain.cls[i] === 3 ? 2.3 : 1.5) * persp * (1 + k * 1.6);
    pctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${a})`;
    pctx.fillRect(W / 2 + px * sc * persp - r / 2, H / 2 - y * sc * persp - r / 2, r, r);
  }
  pctx.globalCompositeOperation = 'source-over';
}
function drawRate() {
  const W = chart.width, H = chart.height;
  cctx.clearRect(0, 0, W, H);
  if (!brain) return;
  const p = brain.pop, len = Math.min(p.length, 1500), start = p.length - len;
  const mx = Math.max(10, ...p.slice(start));
  cctx.strokeStyle = '#7fd4ff'; cctx.lineWidth = 1.2; cctx.beginPath();
  for (let i = 0; i < len; i++) {
    const x = (i / 1500) * W, y = H - (p[start + i] / mx) * (H - 3) - 1;
    i ? cctx.lineTo(x, y) : cctx.moveTo(x, y);
  }
  cctx.stroke();
}

// ------------------------------------------------------------------ task logic
let task = null;      // {kind, stimuli:[names], target:Vector3}
let phase = 'perched';
let tPhase = 0;       // seconds in the current phase
let cruiseTarget = new THREE.Vector3();
let fleeing = false;
const logEl = $('log');
function say(msg, cls = '') {
  const p = document.createElement('p'); p.textContent = msg; if (cls) p.className = cls;
  logEl.prepend(p); while (logEl.children.length > 40) logEl.lastChild.remove();
}
function setPhase(p) { phase = p; tPhase = 0; $('status').textContent = PHASE_TEXT[p] || p; }
const PHASE_TEXT = {
  perched: 'сидит и ждёт задачу', takeoff: 'взлетает', cruise: 'летит к цели', landing: 'заходит на посадку',
  approach: 'идёт к цели', probe: 'пробует цель на вкус… мозг считает', feed: 'ест — моторные нейроны активны', reject: 'отвергла: нет сигнала к еде',
};
const STIM_RATE = 100;
const TASKS = {
  sugar: { label: 'Найди сахар', stimuli: ['sugar'], item: 'sugar' },
  water: { label: 'Попей воды', stimuli: ['water'], item: 'water' },
  bitter: { label: 'Попробуй горькое', stimuli: ['bitter'], item: 'bitter' },
  mix: { label: 'Сахар + горькое', stimuli: ['sugar', 'bitter'], item: 'sugar' },
};

function randomSpot(minR = 4, maxR = 6) {
  const a = Math.random() * Math.PI * 2, r = lerp(minR, maxR, Math.random());
  return new THREE.Vector3(F.pos.x + Math.sin(a) * r, 0, F.pos.z + Math.cos(a) * r);
}

function giveTask(kind, point) {
  if (!brain) { say('Мозг ещё загружается…'); return; }
  brain.clearStimulus(); fleeing = false;
  if (kind === 'goto') {
    task = { kind: 'goto' };
    removeItem(); cruiseTarget.copy(point); marker.position.set(point.x, 0.03, point.z); marker.visible = true;
    say('Задача: лети в отмеченную точку.');
    if (F.air < 0.5) setPhase('takeoff'); else setPhase('cruise');
    return;
  }
  const def = TASKS[kind];
  const spot = point || randomSpot();
  placeItem(def.item, spot.x, spot.z);
  if (kind === 'mix') { const b = makeItem('bitter'); b.position.set(0.5, 0, 0.35); item.add(b); }
  task = { kind, ...def };
  marker.visible = false;
  cruiseTarget.copy(spot);
  say(`Задача: «${def.label}». Цель в ${spot.x.toFixed(1)}, ${spot.z.toFixed(1)}.`);
  brain.reset();
  if (F.air < 0.5) setPhase('takeoff'); else setPhase('cruise');
}

function stimulate(on) {
  if (!brain || !task || !task.stimuli) return;
  for (const s of task.stimuli) brain.setStimulus(brain.stimuli[s] || [], on ? STIM_RATE : 0);
  $('stim').textContent = on ? `стимул: вкусовые рецепторы «${task.stimuli.join(' + ')}» · ${STIM_RATE} Гц` : 'стимул: нет';
}

function steer(target, speed, turn, dt, slow = false) {
  const dx = target.x - F.pos.x, dz = target.z - F.pos.z;
  const dist = Math.hypot(dx, dz);
  const d = wrapPi(Math.atan2(dx, dz) - F.heading);
  const step = clamp(d, -turn * dt, turn * dt);
  F.heading += step;
  const v = speed * Math.max(0, Math.cos(d)) * (slow ? clamp(dist / 1.5, 0.25, 1) : 1);
  F.pos.x += Math.sin(F.heading) * v * dt; F.pos.z += Math.cos(F.heading) * v * dt;
  F.speed = lerp(F.speed, v, 0.2); F.bank = lerp(F.bank, -step / Math.max(dt, 1e-3) * 0.12, 0.1);
  return dist;
}

function motorDrive() { return brain ? 1 - Math.exp(-brain.recentSpikes('motor', 250) / 60) : 0; }

function updateTask(dt) {
  tPhase += dt;
  const ground = STAND_Y, cruiseY = 2.2;
  let airT = F.air, walkT = 0, probeT = 0, propT = 0, pumpT = 0;
  switch (phase) {
    case 'perched': F.speed = 0; airT = 0; break;
    case 'takeoff':
      airT = 1; F.pos.y = lerp(F.pos.y, cruiseY, 1 - Math.exp(-2.2 * dt));
      F.pitch = -0.15;
      if (tPhase > 0.9) setPhase('cruise');
      break;
    case 'cruise': {
      airT = 1; F.pos.y = lerp(F.pos.y, cruiseY + Math.sin(performance.now() / 400) * 0.1, 1 - Math.exp(-2 * dt));
      const isGoto = task && task.kind === 'goto';
      const dist = steer(cruiseTarget, 4.2, 4.5, dt, isGoto);
      F.pitch = lerp(F.pitch, 0.28, 0.1);
      if (dist < (fleeing ? 0.5 : isGoto ? 0.3 : 1.6)) setPhase('landing');
      break;
    }
    case 'landing': {
      airT = 1 - clamp(tPhase / 0.9, 0, 1);
      F.pos.y = lerp(F.pos.y, ground, 1 - Math.exp(-3.5 * dt));
      F.pitch = lerp(F.pitch, 0, 0.1);
      const hasItem = task && task.kind !== 'goto' && item;
      if (hasItem) steer(item.position, 1.5, 4, dt);
      else if (task && task.kind === 'goto') steer(cruiseTarget, 1.0, 4, dt, true);
      if (tPhase > 0.9 && F.pos.y < ground + 0.05) {
        if (hasItem) setPhase('approach');
        else { marker.visible = false; if (task) say('Села в точке.'); task = null; fleeing = false; setPhase('perched'); }
      }
      break;
    }
    case 'approach': {
      airT = 0; walkT = 1; F.pos.y = ground; F.pitch = 0;
      const dist = steer(item.position, 1.6, 5, dt, true);
      if (dist < 2.15) { setPhase('probe'); stimulate(true); say('Лапки и хоботок коснулись цели: рецепторы стреляют, мозг считает.'); }
      break;
    }
    case 'probe': {
      airT = 0; walkT = 0; probeT = 1; propT = 0.05 + 0.4 * motorDrive();
      const d = steer(item.position, 0.0, 5, dt);
      if (tPhase > 0.8) {
        const spikes = brain.recentSpikes('motor', 250), drive = motorDrive();
        if (spikes > 10) { setPhase('feed'); say(`Моторные нейроны: ${spikes} спайков за 250 мс → ПИТАНИЕ.`, 'good'); }
        else {
          setPhase('reject'); say(`Моторные нейроны: ${spikes} спайков за 250 мс → нет сигнала к еде, отказ.`, 'bad');
          if (task.kind === 'water') say('В этой модели вода сама по себе не запускает хоботок (нужна жажда, её здесь нет).');
        }
      }
      break;
    }
    case 'feed': {
      airT = 0; probeT = 0.6; const dr = motorDrive();
      propT = clamp(0.35 + dr, 0, 1); pumpT = dr;
      steer(item.position, 0, 5, dt);
      item.scale.setScalar(Math.max(0.15, 1 - tPhase / 8));
      if (tPhase > 6) { stimulate(false); say('Наелась. Задача выполнена.', 'good'); removeItem(); task = null; setPhase('perched'); }
      break;
    }
    case 'reject': {
      airT = 0; probeT = 0.3; propT = 0;
      if (tPhase > 0.6) stimulate(false);
      if (tPhase > 1.2) { cruiseTarget.copy(randomSpot(7, 9)); fleeing = true; task = null; setPhase('takeoff'); }
      break;
    }
  }
  F.air = lerp(F.air, airT, 1 - Math.exp(-8 * dt));
  F.walk = lerp(F.walk, walkT, 1 - Math.exp(-8 * dt));
  F.probe = lerp(F.probe, probeT, 1 - Math.exp(-8 * dt));
  F.prob = lerp(F.prob, propT, 1 - Math.exp(-10 * dt));
  F.pump = lerp(F.pump, pumpT, 1 - Math.exp(-8 * dt));
  if (phase === 'perched') F.pitch = lerp(F.pitch, 0, 0.1);
}

// ------------------------------------------------------------------ UI
function parseTask(text) {
  const t = text.toLowerCase();
  if (/(сахар|сладк|мёд|мед\b|sugar|sweet)/.test(t) && /(горьк|хинин|bitter)/.test(t)) return 'mix';
  if (/(смес|вместе|mix)/.test(t)) return 'mix';
  if (/(сахар|сладк|мёд|мед\b|ед[ауы]|покуш|поеш|sugar|sweet|eat|food)/.test(t)) return 'sugar';
  if (/(горьк|хинин|bitter)/.test(t)) return 'bitter';
  if (/(вод|пить|попей|попит|water|drink)/.test(t)) return 'water';
  if (/(лети|точк|fly|go)/.test(t)) return 'goto';
  return null;
}
for (const [k, d] of Object.entries(TASKS)) {
  const b = document.createElement('button'); b.textContent = d.label; b.onclick = () => giveTask(k); $('tasks').append(b);
}
$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = $('cmd').value.trim(); if (!text) return;
  const k = parseTask(text);
  if (!k) { say('Не поняла задачу. Попробуй: «найди сахар», «попей воды», «попробуй горькое», «сахар и горькое».', 'bad'); return; }
  if (k === 'goto') { say('Кликни по полу — муха полетит туда.'); return; }
  giveTask(k); $('cmd').value = '';
});

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
let downAt = null;
canvas.addEventListener('pointerdown', (e) => { downAt = [e.clientX, e.clientY]; });
canvas.addEventListener('pointerup', (e) => {
  if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 5) return; // it was a drag (orbit)
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObject(ground)[0];
  if (hit) giveTask('goto', hit.point);
});
let follow = true;
$('follow').addEventListener('change', (e) => { follow = e.target.checked; });

// ------------------------------------------------------------------ main loop
const clock = new THREE.Clock();
let fpsAcc = 0, uiAcc = 0;
function frame() {
  const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
  updateTask(dt);
  if (brain) {
    const t0 = performance.now();
    brain.advance(dt * 1000);
    brain.cost = lerp(brain.cost || 0, performance.now() - t0, 0.1);
  }
  fly.update(dt, { fly: F.air, walk: F.walk, probe: F.probe, prob: F.prob, pump: F.pump }, t);
  fly.root.position.copy(F.pos);
  fly.root.rotation.y = F.heading;
  fly.root.rotation.x = F.pitch * (0.4 + F.air * 0.6);
  fly.root.rotation.z = clamp(F.bank, -0.5, 0.5);
  fly.body.position.y = Math.sin(t * 7) * 0.02 * F.air;
  if (follow) controls.target.lerp(new THREE.Vector3(F.pos.x, 0.8, F.pos.z), 0.06);
  controls.update();
  rot += dt * 0.25;
  drawBrain();
  uiAcc += dt;
  if (uiAcc > 0.1 && brain) {
    uiAcc = 0; drawRate();
    let active = 0;
    for (let i = 0; i < brain.n; i++) if (brain.t - brain.lastSpike[i] < 100) active++;
    $('active').textContent = active;
    const pop = brain.pop, last = pop.slice(-100);
    $('rate-val').textContent = Math.round(last.reduce((a, b) => a + b, 0) * 10).toLocaleString('ru');
    $('motor-bar').style.width = `${Math.round(motorDrive() * 100)}%`;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

fetch('data/brain.json').then((r) => r.json()).then((data) => {
  brain = new Brain(data);
  $('info').textContent = `${brain.n.toLocaleString('ru')} нейронов · ${data.pre.length.toLocaleString('ru')} связей · FlyWire`;
  $('loading').remove();
  say('Мозг загружен. Дай мухе задачу кнопкой или текстом.', 'good');
  window.__fly = { brain, F, giveTask, get phase() { return phase; } }; // handy for debugging / tests
}).catch((e) => { $('loading').textContent = 'Не удалось загрузить мозг: ' + e; });
$('status').textContent = PHASE_TEXT.perched;
requestAnimationFrame(frame);
