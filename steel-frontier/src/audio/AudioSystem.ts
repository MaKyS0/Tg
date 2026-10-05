import type { Vector3 } from 'three';
import { clamp } from '../core/math';
import type { BiomeData } from '../data/types';
import type { Tank } from '../sim/Tank';

type Ambience = BiomeData['ambience'];

interface EngineVoice {
  osc1: OscillatorNode;
  osc2: OscillatorNode;
  sub: OscillatorNode;
  filter: BiquadFilterNode;
  gain: GainNode;
  rumble: AudioBufferSourceNode;
  rumbleGain: GainNode;
  track: AudioBufferSourceNode;
  trackFilter: BiquadFilterNode;
  trackGain: GainNode;
  trackLfo: OscillatorNode;
  trackLfoGain: GainNode;
  panner: PannerNode | null;
  gear: number;
  rpm: number;
  shiftDip: number;
}

/**
 * Fully procedural sound (no sample files): engine with gear shifts, tracks, gunfire, impacts,
 * ricochets, explosions, module damage, reload, ambience loops and radio chatter. Positional
 * sounds use Web Audio panners relative to the camera listener.
 */
export class AudioSystem {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private sfx!: GainNode;
  private engineBus!: GainNode;
  private ambientBus!: GainNode;
  private uiBus!: GainNode;
  private noise!: AudioBuffer;
  private brown!: AudioBuffer;
  private engine: EngineVoice | null = null;
  private otherEngine: EngineVoice | null = null;
  private ambience: { nodes: AudioNode[]; kind: Ambience; timer: number } | null = null;
  private volumes = { master: 0.8, sfx: 0.9, engine: 0.7, ambient: 0.5 };
  voiceEnabled = true;
  private lastVoice = 0;

  /** Must be called from a user gesture (browser autoplay policy). */
  unlock(): void {
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      const c = this.ctx;
      this.master = c.createGain();
      this.master.connect(c.destination);
      const comp = c.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.ratio.value = 4;
      comp.connect(this.master);
      this.sfx = c.createGain();
      this.engineBus = c.createGain();
      this.ambientBus = c.createGain();
      this.uiBus = c.createGain();
      for (const g of [this.sfx, this.engineBus, this.ambientBus, this.uiBus]) g.connect(comp);
      this.noise = this.makeNoise(2, false);
      this.brown = this.makeNoise(3, true);
      this.applyVolumes();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
  }

  get ready(): boolean {
    return !!this.ctx && this.ctx.state === 'running';
  }

  setVolumes(master: number, sfx: number, engine: number, ambient: number, voice: boolean): void {
    this.volumes = { master, sfx, engine, ambient };
    this.voiceEnabled = voice;
    this.applyVolumes();
  }

  private applyVolumes(): void {
    if (!this.ctx) return;
    this.master.gain.value = this.volumes.master;
    this.sfx.gain.value = this.volumes.sfx;
    this.engineBus.gain.value = this.volumes.engine * 0.6;
    this.ambientBus.gain.value = this.volumes.ambient * 0.5;
    this.uiBus.gain.value = 0.5;
  }

  private makeNoise(seconds: number, brown: boolean): AudioBuffer {
    const c = this.ctx!;
    const len = Math.floor(c.sampleRate * seconds);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (brown) {
        last = (last + 0.02 * w) / 1.02;
        d[i] = last * 3.5;
      } else d[i] = w;
    }
    return buf;
  }

  updateListener(pos: Vector3, forward: Vector3, up: Vector3): void {
    if (!this.ctx) return;
    const l = this.ctx.listener;
    if (l.positionX) {
      l.positionX.value = pos.x;
      l.positionY.value = pos.y;
      l.positionZ.value = pos.z;
      l.forwardX.value = forward.x;
      l.forwardY.value = forward.y;
      l.forwardZ.value = forward.z;
      l.upX.value = up.x;
      l.upY.value = up.y;
      l.upZ.value = up.z;
    } else {
      l.setPosition(pos.x, pos.y, pos.z);
      l.setOrientation(forward.x, forward.y, forward.z, up.x, up.y, up.z);
    }
  }

  private panner(pos: Vector3 | null, ref = 12): AudioNode {
    const c = this.ctx!;
    if (!pos) return this.sfx;
    const p = c.createPanner();
    p.panningModel = 'equalpower';
    p.distanceModel = 'inverse';
    p.refDistance = ref;
    p.rolloffFactor = 1.1;
    p.maxDistance = 2000;
    if (p.positionX) {
      p.positionX.value = pos.x;
      p.positionY.value = pos.y;
      p.positionZ.value = pos.z;
    } else p.setPosition(pos.x, pos.y, pos.z);
    p.connect(this.sfx);
    return p;
  }

  private noiseBurst(dest: AudioNode, t0: number, dur: number, filterType: BiquadFilterType, f0: number, f1: number, gain: number, brown = false, q = 0.8): void {
    const c = this.ctx!;
    const src = c.createBufferSource();
    src.buffer = brown ? this.brown : this.noise;
    src.playbackRate.value = 0.8 + Math.random() * 0.4;
    const f = c.createBiquadFilter();
    f.type = filterType;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t0);
    f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f).connect(g).connect(dest);
    src.start(t0, Math.random() * 1.0);
    src.stop(t0 + dur + 0.05);
  }

  private tone(dest: AudioNode, t0: number, type: OscillatorType, f0: number, f1: number, dur: number, gain: number): void {
    const c = this.ctx!;
    const o = c.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t0);
    o.frequency.exponentialRampToValueAtTime(Math.max(10, f1), t0 + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(dest);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  }

  /** Muffles and delays sounds by distance (speed of sound), returns a filtered destination. */
  private distanceChain(pos: Vector3 | null, listenerDist: number): { dest: AudioNode; delay: number } {
    const c = this.ctx!;
    const p = this.panner(pos);
    if (!pos || listenerDist < 60) return { dest: p, delay: 0 };
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = clamp(9000 - listenerDist * 14, 500, 9000);
    lp.connect(p);
    return { dest: lp, delay: Math.min(1.5, listenerDist / 343) };
  }

  shot(pos: Vector3 | null, caliber: number, listenerDist: number, own: boolean): void {
    if (!this.ready) return;
    const c = this.ctx!;
    const { dest, delay } = this.distanceChain(own ? null : pos, listenerDist);
    const t = c.currentTime + delay;
    const k = clamp(caliber / 100, 0.4, 1.8);
    const loud = own ? 0.9 : 0.75;
    this.noiseBurst(dest, t, 0.35 + k * 0.5, 'lowpass', 5000, 180, loud);
    this.noiseBurst(dest, t, 1.2 + k * 0.8, 'lowpass', 900, 60, loud * 0.6, true);
    this.tone(dest, t, 'sine', 110 / k + 40, 32, 0.45 + k * 0.3, loud * 0.9);
  }

  reload(): void {
    if (!this.ready) return;
    const t = this.ctx!.currentTime;
    this.noiseBurst(this.uiBus, t, 0.05, 'bandpass', 3200, 2400, 0.5, false, 3);
    this.noiseBurst(this.uiBus, t + 0.11, 0.07, 'bandpass', 2000, 1600, 0.6, false, 4);
    this.tone(this.uiBus, t + 0.11, 'triangle', 1800, 1500, 0.12, 0.12);
  }

  hit(pos: Vector3, kind: string, listenerDist: number, ownTank: boolean): void {
    if (!this.ready) return;
    const c = this.ctx!;
    const { dest, delay } = this.distanceChain(ownTank ? null : pos, listenerDist);
    const t = c.currentTime + delay;
    const g = ownTank ? 1 : 0.7;
    switch (kind) {
      case 'ricochet': {
        const o = c.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(2600 + Math.random() * 600, t);
        o.frequency.exponentialRampToValueAtTime(700, t + 0.45);
        const vib = c.createOscillator();
        vib.frequency.value = 38;
        const vg = c.createGain();
        vg.gain.value = 60;
        vib.connect(vg).connect(o.frequency);
        const og = c.createGain();
        og.gain.setValueAtTime(0.0001, t);
        og.gain.exponentialRampToValueAtTime(0.28 * g, t + 0.01);
        og.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
        o.connect(og).connect(dest);
        o.start(t);
        vib.start(t);
        o.stop(t + 0.55);
        vib.stop(t + 0.55);
        this.noiseBurst(dest, t, 0.08, 'highpass', 3000, 5000, 0.4 * g);
        break;
      }
      case 'noPenetration':
        for (const [f, a] of [[310, 0.3], [472, 0.22], [829, 0.16], [1291, 0.1]]) this.tone(dest, t, 'sine', f, f * 0.97, 0.9, a * g);
        this.noiseBurst(dest, t, 0.15, 'bandpass', 1800, 900, 0.5 * g, false, 2);
        break;
      case 'penetration':
      case 'heSplash':
        this.noiseBurst(dest, t, 0.5, 'lowpass', 2500, 200, 0.85 * g);
        for (const [f, a] of [[523, 0.18], [739, 0.14], [1187, 0.1]]) this.tone(dest, t, 'square', f, f * 0.8, 0.25, a * g * 0.5);
        this.tone(dest, t, 'sine', 90, 40, 0.4, 0.6 * g);
        break;
      case 'critical':
        this.noiseBurst(dest, t, 0.3, 'bandpass', 900, 400, 0.6 * g, false, 1.5);
        this.tone(dest, t, 'sawtooth', 180, 60, 0.3, 0.2 * g);
        break;
      default:
        this.noiseBurst(dest, t, 0.4, 'lowpass', 1500, 150, 0.6 * g, true);
    }
  }

  explosion(pos: Vector3, scale: number, listenerDist: number): void {
    if (!this.ready) return;
    const c = this.ctx!;
    const { dest, delay } = this.distanceChain(pos, listenerDist);
    const t = c.currentTime + delay;
    this.noiseBurst(dest, t, 1.4 + scale * 0.8, 'lowpass', 1800, 50, 0.9, true);
    this.noiseBurst(dest, t, 0.6, 'lowpass', 6000, 300, 0.6);
    this.tone(dest, t, 'sine', 70, 25, 1.2, 0.9);
  }

  moduleDamage(): void {
    if (!this.ready) return;
    const t = this.ctx!.currentTime;
    this.noiseBurst(this.uiBus, t, 0.25, 'bandpass', 700, 300, 0.7, false, 2);
    this.tone(this.uiBus, t, 'square', 220, 110, 0.2, 0.12);
  }

  destructible(pos: Vector3, listenerDist: number, kind: string): void {
    if (!this.ready) return;
    const { dest, delay } = this.distanceChain(pos, listenerDist);
    const t = this.ctx!.currentTime + delay;
    if (kind === 'tree' || kind === 'fence' || kind === 'crate' || kind === 'house') {
      this.noiseBurst(dest, t, 0.6, 'bandpass', 900, 250, 0.6, false, 1.2);
      for (let i = 0; i < 4; i++) this.noiseBurst(dest, t + 0.08 * i + Math.random() * 0.05, 0.08, 'bandpass', 1400, 800, 0.4, false, 4);
    } else {
      this.noiseBurst(dest, t, 0.5, 'lowpass', 2500, 300, 0.6);
      this.tone(dest, t, 'triangle', 400, 120, 0.4, 0.2);
    }
  }

  ui(kind: 'click' | 'buy' | 'error' | 'spotted' | 'alert'): void {
    if (!this.ready) return;
    const t = this.ctx!.currentTime;
    const b = this.uiBus;
    if (kind === 'click') this.tone(b, t, 'triangle', 900, 700, 0.06, 0.2);
    else if (kind === 'buy') {
      this.tone(b, t, 'triangle', 660, 660, 0.12, 0.25);
      this.tone(b, t + 0.1, 'triangle', 990, 990, 0.18, 0.25);
    } else if (kind === 'error') this.tone(b, t, 'square', 220, 160, 0.2, 0.15);
    else if (kind === 'spotted') {
      this.tone(b, t, 'sine', 1200, 1200, 0.08, 0.3);
      this.tone(b, t + 0.12, 'sine', 1200, 1200, 0.08, 0.3);
    } else {
      this.tone(b, t, 'sawtooth', 600, 400, 0.3, 0.12);
    }
  }

  radio(text: string): void {
    if (!this.ready) return;
    const t = this.ctx!.currentTime;
    this.noiseBurst(this.uiBus, t, 0.18, 'bandpass', 2200, 1800, 0.25, false, 2);
    this.tone(this.uiBus, t + 0.05, 'sine', 1050, 1050, 0.07, 0.15);
    if (this.voiceEnabled && typeof speechSynthesis !== 'undefined' && performance.now() - this.lastVoice > 2500) {
      this.lastVoice = performance.now();
      try {
        const u = new SpeechSynthesisUtterance(text.replace(/^[^:]+:\s*/, ''));
        u.lang = 'ru-RU';
        u.rate = 1.15;
        u.pitch = 0.8;
        u.volume = 0.6 * this.volumes.master;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      } catch {
        // speech synthesis unavailable
      }
    }
  }

  private createEngine(positional: boolean): EngineVoice | null {
    if (!this.ctx) return null;
    const c = this.ctx;
    const osc1 = c.createOscillator();
    osc1.type = 'sawtooth';
    const osc2 = c.createOscillator();
    osc2.type = 'sawtooth';
    osc2.detune.value = 18;
    const sub = c.createOscillator();
    sub.type = 'square';
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 2;
    const gain = c.createGain();
    gain.gain.value = 0;
    const subGain = c.createGain();
    subGain.gain.value = 0.4;
    osc1.connect(filter);
    osc2.connect(filter);
    sub.connect(subGain).connect(filter);
    filter.connect(gain);
    const rumble = c.createBufferSource();
    rumble.buffer = this.brown;
    rumble.loop = true;
    const rumbleGain = c.createGain();
    rumbleGain.gain.value = 0;
    rumble.connect(rumbleGain);
    const track = c.createBufferSource();
    track.buffer = this.noise;
    track.loop = true;
    const trackFilter = c.createBiquadFilter();
    trackFilter.type = 'bandpass';
    trackFilter.frequency.value = 700;
    trackFilter.Q.value = 0.9;
    const trackGain = c.createGain();
    trackGain.gain.value = 0;
    const trackLfo = c.createOscillator();
    trackLfo.type = 'square';
    const trackLfoGain = c.createGain();
    trackLfoGain.gain.value = 0;
    trackLfo.connect(trackLfoGain).connect(trackGain.gain);
    track.connect(trackFilter).connect(trackGain);
    let panner: PannerNode | null = null;
    const out: AudioNode = positional ? (panner = c.createPanner()) : this.engineBus;
    if (panner) {
      panner.panningModel = 'equalpower';
      panner.refDistance = 8;
      panner.rolloffFactor = 1.3;
      panner.connect(this.engineBus);
    }
    gain.connect(out);
    rumbleGain.connect(out);
    trackGain.connect(out);
    for (const s of [osc1, osc2, sub, trackLfo]) s.start();
    rumble.start();
    track.start();
    return { osc1, osc2, sub, filter, gain, rumble, rumbleGain, track, trackFilter, trackGain, trackLfo, trackLfoGain, panner, gear: 1, rpm: 700, shiftDip: 0 };
  }

  private driveEngine(v: EngineVoice, tank: Tank, dt: number, volume: number): boolean {
    const c = this.ctx!;
    const gears = tank.data.hull.transmission.gears;
    const maxV = Math.max(1, tank.stats.maxSpeed);
    const s = clamp(Math.abs(tank.speedLong) / maxV, 0, 1);
    const gear = clamp(Math.floor(s * gears * 0.999) + 1, 1, gears);
    let shifted = false;
    if (gear !== v.gear) {
      shifted = true;
      v.shiftDip = 0.35;
      v.gear = gear;
    }
    v.shiftDip = Math.max(0, v.shiftDip - dt);
    const inGear = s * gears - (gear - 1);
    const throttle = Math.abs(tank.input.throttle);
    let target = 700 + clamp(inGear, 0, 1) * 1900 + throttle * 350;
    if (v.shiftDip > 0) target *= 0.78;
    if (!tank.alive || !tank.stats.canMove) target = tank.alive ? 650 : 0;
    v.rpm += (target - v.rpm) * Math.min(1, dt * 6);
    const cyl = 12;
    const f = (v.rpm / 60) * (cyl / 4);
    const now = c.currentTime;
    v.osc1.frequency.setTargetAtTime(f, now, 0.03);
    v.osc2.frequency.setTargetAtTime(f * 0.5, now, 0.03);
    v.sub.frequency.setTargetAtTime(f * 0.25, now, 0.03);
    v.filter.frequency.setTargetAtTime(250 + throttle * 900 + v.rpm * 0.25, now, 0.05);
    const alive = tank.alive ? 1 : 0;
    v.gain.gain.setTargetAtTime((0.12 + throttle * 0.13) * volume * alive, now, 0.08);
    v.rumbleGain.gain.setTargetAtTime((0.25 + throttle * 0.35) * volume * alive, now, 0.08);
    const trackSpeed = (Math.abs(tank.trackSpeedL) + Math.abs(tank.trackSpeedR)) / 2;
    const tg = clamp(trackSpeed / 10, 0, 1) * 0.35 * volume;
    v.trackGain.gain.setTargetAtTime(tg * 0.6, now, 0.1);
    v.trackLfoGain.gain.setTargetAtTime(tg * 0.4, now, 0.1);
    v.trackLfo.frequency.setTargetAtTime(2 + trackSpeed * 2.4, now, 0.1);
    v.trackFilter.frequency.setTargetAtTime(500 + trackSpeed * 40, now, 0.1);
    return shifted;
  }

  /** Player engine (non-positional) + the nearest other tank's engine (positional). */
  updateEngines(player: Tank | null, nearest: Tank | null, dt: number): void {
    if (!this.ready) return;
    if (player) {
      this.engine ??= this.createEngine(false);
      if (this.engine && this.driveEngine(this.engine, player, dt, 1)) {
        const t = this.ctx!.currentTime;
        this.noiseBurst(this.engineBus, t, 0.12, 'bandpass', 400, 250, 0.35, false, 1.5);
      }
    }
    this.otherEngine ??= this.createEngine(true);
    if (this.otherEngine) {
      if (nearest) {
        const p = this.otherEngine.panner!;
        if (p.positionX) {
          p.positionX.value = nearest.position.x;
          p.positionY.value = nearest.position.y + 1;
          p.positionZ.value = nearest.position.z;
        } else p.setPosition(nearest.position.x, nearest.position.y + 1, nearest.position.z);
        this.driveEngine(this.otherEngine, nearest, dt, 0.8);
      } else {
        const now = this.ctx!.currentTime;
        for (const g of [this.otherEngine.gain, this.otherEngine.rumbleGain, this.otherEngine.trackGain]) g.gain.setTargetAtTime(0, now, 0.2);
      }
    }
  }

  setAmbience(kind: Ambience | null): void {
    if (!this.ctx) return;
    if (this.ambience) {
      for (const n of this.ambience.nodes) {
        if (n instanceof AudioScheduledSourceNode) n.stop();
        n.disconnect();
      }
      this.ambience = null;
    }
    if (!kind) return;
    const c = this.ctx;
    const nodes: AudioNode[] = [];
    const wind = c.createBufferSource();
    wind.buffer = this.brown;
    wind.loop = true;
    const wf = c.createBiquadFilter();
    wf.type = 'lowpass';
    wf.frequency.value = kind === 'waves' ? 700 : 380;
    const wg = c.createGain();
    wg.gain.value = kind === 'wind' ? 0.5 : 0.25;
    const lfo = c.createOscillator();
    lfo.frequency.value = kind === 'waves' ? 0.12 : 0.07;
    const lg = c.createGain();
    lg.gain.value = kind === 'waves' ? 0.25 : 0.12;
    lfo.connect(lg).connect(wg.gain);
    wind.connect(wf).connect(wg).connect(this.ambientBus);
    wind.start();
    lfo.start();
    nodes.push(wind, wf, wg, lfo, lg);
    if (kind === 'industry') {
      const hum = c.createOscillator();
      hum.frequency.value = 50;
      const hg = c.createGain();
      hg.gain.value = 0.05;
      hum.connect(hg).connect(this.ambientBus);
      hum.start();
      nodes.push(hum, hg);
    }
    this.ambience = { nodes, kind, timer: 2 };
  }

  /** Random ambient one-shots (birds, gulls, distant clanks). */
  updateAmbience(dt: number): void {
    if (!this.ready || !this.ambience) return;
    const a = this.ambience;
    a.timer -= dt;
    if (a.timer > 0) return;
    a.timer = 2 + Math.random() * 6;
    const t = this.ctx!.currentTime;
    if (a.kind === 'birds' || a.kind === 'waves') {
      const n = 2 + Math.floor(Math.random() * 4);
      const base = a.kind === 'waves' ? 1400 : 2800 + Math.random() * 1500;
      for (let i = 0; i < n; i++) this.tone(this.ambientBus, t + i * 0.13, 'sine', base, base * (a.kind === 'waves' ? 0.7 : 1.3), 0.09, 0.05);
    } else if (a.kind === 'industry' || a.kind === 'city') {
      this.noiseBurst(this.ambientBus, t, 0.4, 'bandpass', 600 + Math.random() * 800, 300, 0.08, false, 3);
    }
  }

  stopBattle(): void {
    if (!this.ctx) return;
    for (const v of [this.engine, this.otherEngine]) {
      if (!v) continue;
      for (const s of [v.osc1, v.osc2, v.sub, v.trackLfo, v.rumble, v.track]) {
        try {
          s.stop();
        } catch {
          // already stopped
        }
      }
      v.gain.disconnect();
      v.rumbleGain.disconnect();
      v.trackGain.disconnect();
      v.panner?.disconnect();
    }
    this.engine = null;
    this.otherEngine = null;
    this.setAmbience(null);
  }
}
