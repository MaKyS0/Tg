import * as THREE from 'three';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { Brain } from './brain.js';
import { buildFly, STAND_Y } from './fly.js';
import { makeItem, buildScenery, Swatter, STIM, LABEL } from './world.js';

const $ = (id) => document.getElementById(id);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const wrapPi = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const lerp = (a, b, k) => a + (b - a) * k;
const rnd = (a, b) => a + Math.random() * (b - a);
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const WORLD_R = 24;

// ------------------------------------------------------------------ scene
const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const SKY_DAY = new THREE.Color(0x2a3d58), SKY_NIGHT = new THREE.Color(0x03050a);
scene.background = SKY_DAY.clone();
scene.fog = new THREE.Fog(0x2a3d58, 16, 48);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120);
camera.position.set(4.2, 3.2, 5.5);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; controls.maxPolarAngle = Math.PI * 0.49; controls.minDistance = 2; controls.maxDistance = 18;
controls.target.set(0, 0.8, 0);

const hemi = new THREE.HemisphereLight(0xbfd4ff, 0x2a2018, 0.8); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0dd, 2.2);
sun.position.set(5, 9, 4); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, near: 1, far: 30 });
scene.add(sun, sun.target);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(WORLD_R + 8, 64).rotateX(-Math.PI / 2),
  new THREE.MeshStandardMaterial({ color: 0x2c3a2f, roughness: 0.95 }));
ground.receiveShadow = true; scene.add(ground);
const grid = new THREE.GridHelper(2 * (WORLD_R + 8), 2 * (WORLD_R + 8), 0x44604a, 0x33463a); grid.position.y = 0.01; grid.material.opacity = 0.25; grid.material.transparent = true; scene.add(grid);
const marker = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.32, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x7fd4ff, transparent: true, opacity: 0.9 }));
marker.position.y = 0.03; marker.visible = false; scene.add(marker);
buildScenery(scene);

function resize() {
  renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

// ------------------------------------------------------------------ fly, world state
const fly = buildFly();
scene.add(fly.root);
const F = { pos: new THREE.Vector3(0, STAND_Y, 0), heading: 0.6, speed: 0, air: 0, walk: 0, probe: 0, prob: 0, pump: 0, bank: 0, pitch: 0 };
const need = { hunger: 0.35, thirst: 0.25, tired: 0.1 }; // 0 = fine, 1 = critical
let alive = true, life = 1, age = 0, starve = 0, deadT = 0;
const stats = { eaten: 0, drunk: 0, rejected: 0, escaped: 0 };
let free = true, speed = 1, tool = 'goto';
let worldT = 0, daylight = 1, asleep = false, restUntil = 0;
let fear = 0, reflexAt = 0, reflexPos = null;

const items = [];
function addItem(type, x, z) {
  const it = makeItem(type); it.position.set(x, 0, z); scene.add(it); items.push(it);
  if (items.length > 28) removeItem(items[0]);
  return it;
}
function removeItem(it) {
  const i = items.indexOf(it); if (i >= 0) items.splice(i, 1);
  scene.remove(it); if (target === it) target = null;
}
function spot(minR, maxR, around = F.pos) {
  for (let k = 0; k < 20; k++) {
    const a = Math.random() * 6.283, r = rnd(minR, maxR);
    const x = around.x + Math.sin(a) * r, z = around.z + Math.cos(a) * r;
    if (Math.hypot(x, z) < WORLD_R - 1) return new THREE.Vector3(x, 0, z);
  }
  return new THREE.Vector3(rnd(-8, 8), 0, rnd(-8, 8));
}
for (const [t, n] of [['sugar', 3], ['water', 2], ['bitter', 2], ['mix', 1]]) for (let i = 0; i < n; i++) { const p = spot(4, 17, new THREE.Vector3()); addItem(t, p.x, p.z); }

const swatter = new Swatter(scene, {
  onWarn(pos) { reflexAt = worldT + 0.25; reflexPos = pos.clone(); say('Над полем появилась красная тень — мухобойка!', 'bad'); },
  onStrike(pos) {
    if (alive && Math.hypot(F.pos.x - pos.x, F.pos.z - pos.z) < 1.8 && F.pos.y < 1.9) die('мухобойки');
  },
});
let swatAt = rnd(45, 90);

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
    const px = x * c + z * s, pz = -x * s + z * c, persp = 1 / (1 + pz * 0.25);
    const age = brain.t - brain.lastSpike[i], k = age < 150 ? 1 - age / 150 : 0;
    const col = CLS_COLORS[brain.classes[brain.cls[i]]] || CLS_COLORS.other;
    const r = (brain.cls[i] === 0 || brain.cls[i] === 3 ? 2.3 : 1.5) * persp * (1 + k * 1.6);
    pctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.12 + 0.88 * k})`;
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

// ------------------------------------------------------------------ log / UI helpers
const logEl = $('log');
function say(msg, cls = '') {
  const p = document.createElement('p'); p.textContent = msg; if (cls) p.className = cls;
  logEl.prepend(p); while (logEl.children.length > 40) logEl.lastChild.remove();
}
function think(text) { $('think').textContent = text; }
const PHASE_TEXT = {
  perched: 'сидит', takeoff: 'взлетает', cruise: 'летит', landing: 'заходит на посадку', approach: 'идёт к цели',
  probe: 'пробует на вкус… мозг считает', feed: 'питается — моторные нейроны активны', reject: 'отвергла: нет сигнала к еде', dead: 'мертва',
};

// ------------------------------------------------------------------ behaviour
let phase = 'perched', tPhase = 0, decideT = 1.5;
let target = null;           // item the fly is going for
let userTask = false;        // a command from the user is in progress
let fleeing = false, wandering = false, drinkByRule = false;
const cruiseTarget = new THREE.Vector3();
const STIM_RATE = 100;

function setPhase(p) { phase = p; tPhase = 0; $('status').textContent = PHASE_TEXT[p] || p; }
function stimulate(on) {
  if (!brain) return;
  brain.clearStimulus();
  if (on && target) for (const s of STIM[target.userData.type]) brain.setStimulus(brain.stimuli[s] || [], STIM_RATE);
  $('stim').textContent = on && target ? `стимул: вкусовые рецепторы «${STIM[target.userData.type].join(' + ')}» · ${STIM_RATE} Гц` : 'стимул: нет';
}
function abort() { stimulate(false); target = null; fleeing = false; wandering = false; drinkByRule = false; marker.visible = false; }
function launch() { setPhase(F.air < 0.5 ? 'takeoff' : 'cruise'); }

function steer(tgt, spd, turn, dt, slow = false) {
  const dx = tgt.x - F.pos.x, dz = tgt.z - F.pos.z, dist = Math.hypot(dx, dz);
  const d = wrapPi(Math.atan2(dx, dz) - F.heading), step = clamp(d, -turn * dt, turn * dt);
  F.heading += step;
  const v = spd * Math.max(0, Math.cos(d)) * (slow ? clamp(dist / 1.5, 0.25, 1) : 1);
  F.pos.x += Math.sin(F.heading) * v * dt; F.pos.z += Math.cos(F.heading) * v * dt;
  const r = Math.hypot(F.pos.x, F.pos.z); if (r > WORLD_R) { F.pos.x *= WORLD_R / r; F.pos.z *= WORLD_R / r; }
  F.speed = lerp(F.speed, v, 0.2); F.bank = lerp(F.bank, -step / Math.max(dt, 1e-3) * 0.12, 0.1);
  return dist;
}
const motorDrive = () => (brain ? 1 - Math.exp(-brain.recentSpikes('motor', 250) / 60) : 0);

function go(item, why) {
  target = item; fleeing = false; wandering = false;
  cruiseTarget.copy(item.position); think(why);
  launch();
}
function explore() {
  const p = spot(5, 13);
  abort(); wandering = true; cruiseTarget.copy(p); think('Ничего нужного не вижу — исследую местность');
  launch();
}
function flee(from, farBy = 10) {
  const dx = F.pos.x - from.x, dz = F.pos.z - from.z, d = Math.hypot(dx, dz) || 1;
  abort(); fleeing = true;
  cruiseTarget.set(clamp(F.pos.x + dx / d * farBy, -WORLD_R, WORLD_R), 0, clamp(F.pos.z + dz / d * farBy, -WORLD_R, WORLD_R));
  launch();
}

function score(it) {
  const t = it.userData.type, d = Math.hypot(it.position.x - F.pos.x, it.position.z - F.pos.z);
  let s = t === 'sugar' ? need.hunger * 1.25 : t === 'mix' ? need.hunger * 0.95 + 0.05 : t === 'water' ? need.thirst * 1.15 : 0.1 * Math.random();
  if (t !== 'water' && need.hunger < 0.2) s *= 0.25;      // sated flies ignore food
  if (it.userData.badUntil > worldT) s *= 0.03;           // learned aversion
  return s / (1 + d * 0.06);
}
function decide() {
  if (!alive || userTask) return;
  if (!free) { think('Ждёт команд'); return; }
  if (asleep) {
    if (daylight > 0.5 || need.hunger > 0.92 || need.thirst > 0.92) { asleep = false; say('Проснулась.'); think('Проснулась'); }
    else { think('Спит — ночь'); return; }
  }
  if (daylight < 0.2 && need.hunger < 0.85 && need.thirst < 0.85) { asleep = true; say('Стемнело — муха засыпает.'); think('Спит — ночь'); return; }
  if (need.tired > 0.75) { restUntil = worldT + 25; say('Устала — отдыхает.'); }
  if (worldT < restUntil) { think('Отдыхает'); return; }
  let best = null, bs = 0;
  for (const it of items) { const s = score(it); if (s > bs) { bs = s; best = it; } }
  if (best && bs > 0.1) {
    const t = best.userData.type;
    go(best, t === 'water' ? 'Хочу пить → иду к воде' : t === 'sugar' ? 'Хочу есть → иду к сахару' : t === 'mix' ? 'Пахнет бродящим фруктом → иду проверить' : 'Любопытно → проверю это');
  } else explore();
}

function die(reason) {
  if (!alive) return;
  alive = false; abort(); userTask = false; asleep = false; setPhase('dead'); deadT = 0;
  say(`Муха погибла от ${reason}. Прожила ${Math.round(age)} с. Через несколько секунд родится новая.`, 'bad'); think('…');
}
function respawn() {
  alive = true; life++; age = 0; starve = 0;
  need.hunger = 0.35; need.thirst = 0.25; need.tired = 0.1;
  F.pos.set(rnd(-3, 3), STAND_Y, rnd(-3, 3)); F.heading = rnd(0, 6.28); F.air = 0; F.pitch = 0; F.bank = 0;
  say(`Родилась новая муха (жизнь №${life}).`, 'good'); setPhase('perched'); decideT = 1;
}

function updateNeeds(dt) {
  const flying = F.air > 0.5, walking = phase === 'approach';
  need.hunger = clamp(need.hunger + dt * (flying ? 0.014 : walking ? 0.009 : asleep ? 0.003 : 0.006), 0, 1);
  need.thirst = clamp(need.thirst + dt * (flying ? 0.010 : asleep ? 0.003 : 0.006), 0, 1);
  need.tired = clamp(need.tired + dt * (flying ? 0.012 : walking ? 0.004 : asleep ? -0.03 : -0.012), 0, 1);
  starve = (need.hunger >= 1 || need.thirst >= 1) ? starve + dt : Math.max(0, starve - dt);
  if (starve > 25) die(need.hunger >= 1 ? 'голода' : 'жажды');
}

function updateTask(dt) {
  tPhase += dt;
  const ground = STAND_Y, cruiseY = 2.2;
  let airT = F.air, walkT = 0, probeT = 0, propT = 0, pumpT = 0;
  switch (phase) {
    case 'perched':
      airT = 0; F.speed = 0; F.pos.y = lerp(F.pos.y, ground, 0.2);
      if (alive) { decideT -= dt; if (decideT <= 0) { decideT = rnd(1, 2.5); decide(); } }
      break;
    case 'takeoff':
      airT = 1; F.pos.y = lerp(F.pos.y, cruiseY, 1 - Math.exp(-2.2 * dt)); F.pitch = -0.15;
      if (tPhase > (fear > 0 ? 0.45 : 0.9)) setPhase('cruise');
      break;
    case 'cruise': {
      airT = 1; F.pos.y = lerp(F.pos.y, cruiseY + Math.sin(performance.now() / 400) * 0.1, 1 - Math.exp(-2 * dt));
      if (target) cruiseTarget.copy(target.position);
      const aimed = !!target, goPoint = !aimed;
      const dist = steer(cruiseTarget, (fear > 0 ? 6.2 : 4.2), (fear > 0 ? 7 : 4.5), dt, goPoint && !fleeing);
      F.pitch = lerp(F.pitch, 0.28, 0.1);
      if (dist < (aimed ? 1.6 : fleeing ? 0.6 : 0.3) || need.tired >= 0.99) setPhase('landing');
      break;
    }
    case 'landing': {
      airT = 1 - clamp(tPhase / 0.9, 0, 1);
      F.pos.y = lerp(F.pos.y, ground, 1 - Math.exp(-3.5 * dt)); F.pitch = lerp(F.pitch, 0, 0.1);
      if (target) steer(target.position, 1.5, 4, dt); else steer(cruiseTarget, 1.0, 4, dt, true);
      if (tPhase > 0.9 && F.pos.y < ground + 0.05) {
        if (target) setPhase('approach');
        else { marker.visible = false; wandering = fleeing = false; if (userTask) say('Села в точке.'); userTask = false; setPhase('perched'); decideT = rnd(0.5, 1.5); }
      }
      break;
    }
    case 'approach': {
      airT = 0; walkT = 1; F.pos.y = ground; F.pitch = 0;
      if (!target) { setPhase('perched'); break; }
      const dist = steer(target.position, 1.6, 5, dt, true);
      if (dist < 2.15) {
        brain.reset(); setPhase('probe'); stimulate(true);
        say(`Лапки и хоботок коснулись цели («${LABEL[target.userData.type]}»): рецепторы стреляют, мозг считает.`);
      }
      break;
    }
    case 'probe': {
      airT = 0; probeT = 1; propT = 0.05 + 0.4 * motorDrive();
      steer(target.position, 0, 5, dt);
      if (tPhase > 0.8) {
        const type = target.userData.type, spikes = brain.recentSpikes('motor', 250);
        const sated = !userTask && (type === 'water' ? need.thirst < 0.1 : need.hunger < 0.1);
        if (spikes > 10 && sated) { rejectTarget(`Моторный выход есть (${spikes} спайков), но муха сыта — отказывается.`); }
        else if (spikes > 10) { setPhase('feed'); say(`Моторные нейроны: ${spikes} спайков за 250 мс → ПИТАНИЕ.`, 'good'); think('Ест'); }
        else if (type === 'water' && need.thirst > 0.3) {
          drinkByRule = true; setPhase('feed'); think('Пьёт');
          say('Моторного ответа на воду нет — в модели нет жажды. Муха пьёт по правилу «жажда > 30%» (это вне коннектома).', 'good');
        } else rejectTarget(`Моторные нейроны: ${spikes} спайков за 250 мс → нет сигнала к еде, отказ.` + (type === 'water' ? ' (В модели нет жажды.)' : ''));
      }
      break;
    }
    case 'feed': {
      airT = 0; probeT = 0.6;
      const dr = drinkByRule ? 0.7 : motorDrive(), type = target ? target.userData.type : 'sugar';
      propT = clamp(0.35 + dr, 0, 1); pumpT = dr;
      if (target) {
        steer(target.position, 0, 5, dt);
        target.userData.amount -= dt * 0.1 * Math.max(0.3, dr);
        target.scale.setScalar(Math.max(0.12, target.userData.amount));
        if (type === 'water') need.thirst = clamp(need.thirst - dt * 0.12 * dr, 0, 1); else need.hunger = clamp(need.hunger - dt * 0.1 * dr, 0, 1);
        if (type === 'bitter') need.hunger = clamp(need.hunger + dt * 0.02, 0, 1);
      }
      const done = !target || target.userData.amount <= 0.1 || (type === 'water' ? need.thirst < 0.03 : need.hunger < 0.03) || tPhase > 18;
      if (done) {
        const t = type; if (t === 'water') stats.drunk++; else stats.eaten++;
        say(t === 'water' ? 'Напилась.' : 'Наелась.', 'good');
        if (target && target.userData.amount <= 0.1) removeItem(target);
        stimulate(false); target = null; drinkByRule = false;
        if (userTask) { say('Задача выполнена.', 'good'); userTask = false; }
        setPhase('perched'); decideT = rnd(1.5, 3);
      }
      break;
    }
    case 'reject':
      airT = 0; probeT = 0.3; propT = 0;
      if (tPhase > 0.6) stimulate(false);
      if (tPhase > 1.2) { const away = spot(7, 10); abort(); userTask = false; fleeing = true; cruiseTarget.copy(away); launch(); }
      break;
    case 'dead':
      airT = 0; deadT += dt; F.pos.y = lerp(F.pos.y, 0.38, 0.2);
      if (deadT > 5) respawn();
      break;
  }
  F.air = lerp(F.air, airT, 1 - Math.exp(-8 * dt)); F.walk = lerp(F.walk, walkT, 1 - Math.exp(-8 * dt));
  F.probe = lerp(F.probe, probeT, 1 - Math.exp(-8 * dt)); F.prob = lerp(F.prob, propT, 1 - Math.exp(-10 * dt));
  F.pump = lerp(F.pump, pumpT, 1 - Math.exp(-8 * dt));
  if (phase === 'perched' || phase === 'dead') F.pitch = lerp(F.pitch, 0, 0.1);
}
function rejectTarget(msg) {
  stats.rejected++; say(msg, 'bad');
  if (target) target.userData.badUntil = worldT + 120;   // learned aversion
  setPhase('reject');
}

// ------------------------------------------------------------------ world step
function spawnLoop(dt) {
  spawnLoop.t = (spawnLoop.t || 0) + dt;
  if (spawnLoop.t < 4) return; spawnLoop.t = 0;
  const count = (...ts) => items.filter((i) => ts.includes(i.userData.type)).length;
  const p = () => spot(6, 20, new THREE.Vector3());
  if (count('sugar', 'mix') < 3) { const q = p(); addItem(Math.random() < 0.25 ? 'mix' : 'sugar', q.x, q.z); }
  if (count('water') < 2) { const q = p(); addItem('water', q.x, q.z); }
  if (count('bitter') < 2) { const q = p(); addItem('bitter', q.x, q.z); }
}

function stepWorld(dt) {
  worldT += dt;
  const raw = Math.sin((2 * Math.PI * worldT) / 160 + 1.2);
  daylight = smooth(-0.7, -0.3, raw);
  if (alive) { age += dt; updateNeeds(dt); }
  // swatter: spontaneous strikes near the fly in free mode
  swatAt -= dt;
  if (free && alive && swatAt <= 0) { swatAt = rnd(50, 100); const p = spot(0.5, 3.5); swatter.drop(p.x, p.z); }
  swatter.update(dt);
  if (reflexAt && worldT >= reflexAt) {
    reflexAt = 0;
    const d = Math.hypot(F.pos.x - reflexPos.x, F.pos.z - reflexPos.z);
    if (alive && d < 5.5) {
      const p = asleep ? 0.4 : (phase === 'feed' || phase === 'probe') ? 0.6 : 0.92;
      if (Math.random() < p) {
        stats.escaped++; say('Муха заметила тень и рванула прочь!', 'good'); asleep = false; userTask = false;
        fear = 2.5; flee(reflexPos, 10); think('Бежит от мухобойки!');
      } else say('Муха не заметила опасность…', 'bad');
    }
  }
  fear = Math.max(0, fear - dt);
  spawnLoop(dt);
  updateTask(dt);
  if (brain) brain.advance(dt * 1000);
}

// ------------------------------------------------------------------ user commands
const TASKS = {
  sugar: { label: 'Найди сахар', type: 'sugar' },
  water: { label: 'Попей воды', type: 'water' },
  bitter: { label: 'Попробуй горькое', type: 'bitter' },
  mix: { label: 'Сахар + горькое', type: 'mix' },
};
function giveTask(kind, point) {
  if (!brain) { say('Мозг ещё загружается…'); return; }
  if (!alive) { say('Муха мертва. Подожди, родится новая.', 'bad'); return; }
  abort(); asleep = false;
  if (kind === 'goto') {
    userTask = true; cruiseTarget.copy(point); marker.position.set(point.x, 0.03, point.z); marker.visible = true;
    say('Задача: лети в отмеченную точку.'); think('Выполняет приказ: лететь в точку'); launch(); return;
  }
  const def = TASKS[kind], p = point || spot(4, 6);
  const it = addItem(def.type, p.x, p.z);
  userTask = true; target = it; cruiseTarget.copy(p);
  if (def.type === 'water') need.thirst = Math.max(need.thirst, 0.6); else need.hunger = Math.max(need.hunger, 0.6);
  say(`Задача: «${def.label}». Цель в ${p.x.toFixed(1)}, ${p.z.toFixed(1)}. (Потребность поднята до 60%, чтобы задача имела смысл.)`);
  think(`Выполняет приказ: ${def.label.toLowerCase()}`); launch();
}
function parseTask(text) {
  const t = text.toLowerCase();
  if (/(мухобойк|прихлоп|swat)/.test(t)) return 'swat';
  if (/(свобод|сам[аа]?\b|делай что|free)/.test(t)) return 'free';
  if (/(сахар|сладк|мёд|мед\b|sugar|sweet)/.test(t) && /(горьк|хинин|bitter)/.test(t)) return 'mix';
  if (/(смес|вместе|mix|фрукт)/.test(t)) return 'mix';
  if (/(сахар|сладк|мёд|мед\b|ед[ауы]|покуш|поеш|sugar|sweet|eat|food)/.test(t)) return 'sugar';
  if (/(горьк|хинин|bitter)/.test(t)) return 'bitter';
  if (/(вод|пить|попей|попит|water|drink)/.test(t)) return 'water';
  if (/(лети|точк|fly|go)/.test(t)) return 'goto';
  return null;
}
function setFree(on) {
  free = on; $('free').classList.toggle('on', on); $('free').textContent = on ? 'Свобода: ВКЛ' : 'Свобода: ВЫКЛ';
  say(on ? 'Муха сама решает, что делать.' : 'Свобода выключена: муха ждёт команд.', on ? 'good' : '');
  if (on) decideT = 0.3;
}
for (const [k, d] of Object.entries(TASKS)) {
  const b = document.createElement('button'); b.textContent = d.label; b.onclick = () => giveTask(k); $('tasks').append(b);
}
$('free').onclick = () => setFree(!free);
for (const b of document.querySelectorAll('#speed button')) b.onclick = () => {
  speed = +b.dataset.v; document.querySelectorAll('#speed button').forEach((x) => x.classList.toggle('on', x === b));
};
for (const b of document.querySelectorAll('#tools button')) b.onclick = () => {
  tool = b.dataset.tool; document.querySelectorAll('#tools button').forEach((x) => x.classList.toggle('on', x === b));
};
$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = $('cmd').value.trim(); if (!text) return;
  const k = parseTask(text);
  if (!k) { say('Не поняла. Попробуй: «найди сахар», «попей воды», «попробуй горькое», «сахар и горькое», «свобода», «мухобойка».', 'bad'); return; }
  $('cmd').value = '';
  if (k === 'goto') say('Кликни по полу (инструмент «Точка») — муха полетит туда.');
  else if (k === 'free') setFree(true);
  else if (k === 'swat') { const p = spot(0.3, 2); swatter.drop(p.x, p.z); }
  else giveTask(k);
});

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
let downAt = null;
canvas.addEventListener('pointerdown', (e) => { downAt = [e.clientX, e.clientY]; });
canvas.addEventListener('pointerup', (e) => {
  if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 5) return; // that was a drag (orbit)
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObject(ground)[0]; if (!hit) return;
  const p = hit.point;
  if (tool === 'goto') giveTask('goto', p);
  else if (tool === 'swat') swatter.drop(p.x, p.z);
  else { addItem(tool, p.x, p.z); say(`Поставлено: ${LABEL[tool]}.`); }
});
let follow = true;
$('follow').addEventListener('change', (e) => { follow = e.target.checked; });

// ------------------------------------------------------------------ main loop
const clock = new THREE.Clock();
let uiAcc = 0;
const tmpV = new THREE.Vector3();
function render(dtReal, t) {
  fly.update(dtReal, { fly: F.air, walk: F.walk, probe: F.probe, prob: F.prob, pump: F.pump }, t);
  fly.root.position.copy(F.pos); fly.root.rotation.y = F.heading;
  fly.root.rotation.x = F.pitch * (0.4 + F.air * 0.6);
  fly.root.rotation.z = phase === 'dead' ? Math.PI : clamp(F.bank, -0.5, 0.5);
  fly.body.position.y = Math.sin(t * 7) * 0.02 * F.air;
  if (follow) controls.target.lerp(tmpV.set(F.pos.x, 0.8, F.pos.z), 0.06);
  controls.update();
  sun.position.set(F.pos.x + 5, 9, F.pos.z + 4); sun.target.position.set(F.pos.x, 0, F.pos.z);
  sun.intensity = 0.2 + 2.0 * daylight; hemi.intensity = 0.22 + 0.6 * daylight;
  scene.background.copy(SKY_NIGHT).lerp(SKY_DAY, daylight); scene.fog.color.copy(scene.background);
  rot += dtReal * 0.25;
  drawBrain();
}
function updateHud() {
  const set = (id, v) => { $(id).style.width = `${Math.round(v * 100)}%`; };
  set('b-hunger', need.hunger); set('b-thirst', need.thirst); set('b-tired', need.tired);
  $('clock').textContent = daylight > 0.6 ? '☀ день' : daylight < 0.2 ? '☾ ночь' : '◐ сумерки';
  $('stats').textContent = `жизнь №${life} · ${Math.round(age)} с · съедено ${stats.eaten} · выпито ${stats.drunk} · отказов ${stats.rejected} · спаслась ${stats.escaped}`;
  if (!brain) return;
  drawRate();
  let active = 0;
  for (let i = 0; i < brain.n; i++) if (brain.t - brain.lastSpike[i] < 100) active++;
  $('active').textContent = active;
  $('rate-val').textContent = Math.round(brain.pop.slice(-100).reduce((a, b) => a + b, 0) * 10).toLocaleString('ru');
  $('motor-bar').style.width = `${Math.round(motorDrive() * 100)}%`;
}
function frame() {
  const dtReal = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
  if (brain) stepWorld(dtReal * speed);
  render(dtReal, t);
  uiAcc += dtReal; if (uiAcc > 0.1) { uiAcc = 0; updateHud(); }
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

fetch('data/brain.json').then((r) => r.json()).then((data) => {
  brain = new Brain(data);
  $('info').textContent = `${brain.n.toLocaleString('ru')} нейронов · ${data.pre.length.toLocaleString('ru')} связей · FlyWire`;
  $('loading').remove();
  say('Мир запущен. Муха свободна: сама ищет еду и воду, спит ночью, боится мухобойки. Можно давать ей задачи.', 'good');
  think('Осматривается');
  // test/debug hook: fastForward(seconds) runs the world logic without rendering
  window.__fly = {
    brain, F, need, stats, items, giveTask, setFree, swatter,
    get phase() { return phase; }, get alive() { return alive; }, get life() { return life; }, get daylight() { return daylight; }, get worldT() { return worldT; },
    fastForward(sec) { for (let i = 0; i < sec / 0.05; i++) stepWorld(0.05); },
  };
}).catch((e) => { $('loading').textContent = 'Не удалось загрузить мозг: ' + e; });
$('status').textContent = PHASE_TEXT.perched;
requestAnimationFrame(frame);
