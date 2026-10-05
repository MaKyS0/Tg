import type { Vector3 } from 'three';
import { clamp } from '../core/math';
import type { BiomeData } from '../data/types';
import type { Tank } from '../sim/Tank';

type Ambience = BiomeData['ambience'];

interface EngineVoice {
  pulse: AudioBufferSourceNode;
  shaper: WaveShaperNode;
  sub: OscillatorNode;
  subGain: GainNode;
  filter: BiquadFilterNode;
  gain: GainNode;
  rumble: AudioBufferSourceNode;
  rumbleGain: GainNode;
  track: AudioBufferSourceNode;
  trackFilter: BiquadFilterNode;
  trackGain: GainNode;
  panner: PannerNode | null;
  gear: number;
  rpm: number;
  shiftDip: number;
}

/** Firing rate (Hz) baked into the engine pulse buffer; playbackRate scales it with RPM. */
const ENGINE_BASE_RPM = 1000;
const ENGINE_BASE_HZ = (ENGINE_BASE_RPM / 60) * 6;

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
  private enginePulse!: AudioBuffer;
  private trackClatter!: AudioBuffer;
  private reverb!: ConvolverNode;
  private reverbSend!: GainNode;
  private nextDistantRumble = 20;
  private engine: EngineVoice | null = null;
  private otherEngine: EngineVoice | null = null;
  private ambience: { nodes: AudioNode[]; kind: Ambience; timer: number; gust: GainNode | null; gustTimer: number } | null = null;
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
      this.enginePulse = this.makeEnginePulse();
      this.trackClatter = this.makeTrackClatter();
      // Shared reverb: open-field slap-back echoes off terrain plus a long diffuse tail.
      this.reverb = c.createConvolver();
      this.reverb.buffer = this.makeImpulse(3.2);
      this.reverbSend = c.createGain();
      this.reverbSend.gain.value = 0.55;
      this.reverbSend.connect(this.reverb).connect(comp);
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

  /** Stereo impulse response: sparse early reflections then exponentially decaying noise. */
  private makeImpulse(seconds: number): AudioBuffer {
    const c = this.ctx!;
    const len = Math.floor(c.sampleRate * seconds);
    const buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        const t = i / c.sampleRate;
        d[i] = (Math.random() * 2 - 1) * Math.exp(-t * 2.1) * 0.35 * Math.min(1, t * 30);
      }
      for (const [at, a] of [[0.045, 0.5], [0.11, 0.35], [0.19, 0.28], [0.31, 0.2], [0.52, 0.14]]) {
        const i = Math.floor((at + (ch ? 0.013 : 0)) * c.sampleRate);
        for (let k = 0; k < 220; k++) d[i + k] += (Math.random() * 2 - 1) * a * Math.exp(-k / 60);
      }
    }
    return buf;
  }

  /**
   * One second of a V12 diesel at ENGINE_BASE_RPM: individual combustion pulses with per-cylinder
   * irregularity. Looped and pitched by playbackRate, it sounds far more mechanical than oscillators.
   */
  private makeEnginePulse(): AudioBuffer {
    const c = this.ctx!;
    const sr = c.sampleRate;
    const len = sr;
    const buf = c.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    const pulses = Math.round(ENGINE_BASE_HZ);
    const cylAmp = Array.from({ length: 12 }, () => 0.65 + Math.random() * 0.35);
    let lp = 0;
    for (let k = 0; k < pulses; k++) {
      const start = Math.floor(((k + (Math.random() - 0.5) * 0.08) / pulses) * len);
      const a = cylAmp[k % 12];
      const n = Math.floor(sr * 0.012);
      for (let i = 0; i < n; i++) {
        const t = i / sr;
        const env = Math.exp(-t / 0.0032);
        lp += ((Math.random() * 2 - 1) - lp) * 0.25;
        const v = a * env * (Math.sin(2 * Math.PI * 140 * t) * 0.8 + lp * 0.9);
        d[(start + i) % len] += v;
      }
    }
    let peak = 0;
    for (let i = 0; i < len; i++) peak = Math.max(peak, Math.abs(d[i]));
    for (let i = 0; i < len; i++) d[i] /= peak || 1;
    return buf;
  }

  /** Two seconds of track links slapping onto road wheels (metallic clicks + rattle). */
  private makeTrackClatter(): AudioBuffer {
    const c = this.ctx!;
    const sr = c.sampleRate;
    const len = sr * 2;
    const buf = c.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    const links = 22;
    for (let k = 0; k < links; k++) {
      const start = Math.floor(((k + (Math.random() - 0.5) * 0.3) / links) * len);
      const a = 0.5 + Math.random() * 0.5;
      const f1 = 900 + Math.random() * 500;
      const f2 = 2100 + Math.random() * 900;
      const n = Math.floor(sr * 0.05);
      for (let i = 0; i < n; i++) {
        const t = i / sr;
        const v = a * (Math.exp(-t / 0.004) * (Math.random() * 2 - 1) * 0.8
          + Math.exp(-t / 0.018) * (Math.sin(2 * Math.PI * f1 * t) * 0.35 + Math.sin(2 * Math.PI * f2 * t) * 0.2));
        d[(start + i) % len] += v;
      }
    }
    for (let i = 0; i < len; i++) d[i] += (Math.random() * 2 - 1) * 0.04;
    return buf;
  }

  private saturator(amount: number): WaveShaperNode {
    const c = this.ctx!;
    const ws = c.createWaveShaper();
    const curve = new Float32Array(1024);
    for (let i = 0; i < curve.length; i++) {
      const x = (i / (curve.length - 1)) * 2 - 1;
      curve[i] = Math.tanh(x * amount) / Math.tanh(amount);
    }
    ws.curve = curve;
    return ws;
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
  private distanceChain(pos: Vector3 | null, listenerDist: number, wet = 0.35): { dest: AudioNode; delay: number } {
    const c = this.ctx!;
    const p = this.panner(pos);
    const input = c.createGain();
    const send = c.createGain();
    // Distant sounds are mostly heard as their echo.
    send.gain.value = clamp(wet + listenerDist / 900, 0, 0.9);
    input.connect(send).connect(this.reverbSend);
    if (!pos || listenerDist < 60) {
      input.connect(p);
      return { dest: input, delay: 0 };
    }
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = clamp(9000 - listenerDist * 14, 450, 9000);
    input.connect(lp).connect(p);
    return { dest: input, delay: Math.min(1.5, listenerDist / 343) };
  }

  shot(pos: Vector3 | null, caliber: number, listenerDist: number, own: boolean): void {
    if (!this.ready) return;
    const c = this.ctx!;
    const { dest, delay } = this.distanceChain(own ? null : pos, listenerDist, own ? 0.45 : 0.4);
    const t = c.currentTime + delay;
    const k = clamp(caliber / 100, 0.4, 1.8);
    const loud = own ? 1 : 0.8;
    // Punch: saturated low boom.
    const body = c.createGain();
    body.gain.value = 1;
    const sat = this.saturator(2.5);
    body.connect(sat).connect(dest);
    // Muzzle crack: very short, bright transient.
    this.noiseBurst(dest, t, 0.06, 'highpass', 2500, 1200, loud * 0.9, false, 0.7);
    this.noiseBurst(dest, t, 0.18 + k * 0.12, 'bandpass', 1800, 500, loud * 0.7, false, 0.6);
    // Blast body and pressure thump.
    this.noiseBurst(body, t, 0.9 + k * 0.7, 'lowpass', 1400, 70, loud * 0.85, true, 0.9);
    this.tone(body, t, 'sine', 95 / Math.sqrt(k) + 25, 30, 0.35 + k * 0.25, loud * 0.95);
    this.tone(body, t, 'triangle', 55, 26, 0.6 + k * 0.3, loud * 0.5);
    if (own) {
      // Recoil and breech: heavy metal clunk, then the spent case hitting the floor.
      const r = t + 0.18;
      for (const [f, a] of [[180, 0.25], [420, 0.12], [1150, 0.06]]) this.tone(this.sfx, r, 'triangle', f, f * 0.85, 0.22, a);
      this.noiseBurst(this.sfx, r, 0.12, 'bandpass', 900, 500, 0.25, false, 2);
      const cs = t + 0.75 + Math.random() * 0.2;
      for (let i = 0; i < 3; i++) {
        for (const f of [2300, 3600, 5100]) this.tone(this.sfx, cs + i * 0.11, 'sine', f * (1 - i * 0.03), f * 0.98, 0.18 - i * 0.04, 0.03 / (i + 1));
      }
    }
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
    const { dest, delay } = this.distanceChain(pos, listenerDist, 0.55);
    const t = c.currentTime + delay;
    this.noiseBurst(dest, t, 1.4 + scale * 0.8, 'lowpass', 1800, 50, 0.9, true);
    this.noiseBurst(dest, t + 0.05, 0.9 + scale * 0.4, 'bandpass', 600, 120, 0.4, false, 0.7);
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
    // Radio key-up: click, short static burst, squelch tail.
    this.noiseBurst(this.uiBus, t, 0.015, 'highpass', 3000, 3000, 0.25, false, 0.7);
    this.noiseBurst(this.uiBus, t + 0.01, 0.22, 'bandpass', 2400, 1600, 0.12, false, 1.5);
    this.noiseBurst(this.uiBus, t + 0.32, 0.09, 'bandpass', 3200, 2600, 0.1, false, 2);
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
    const pulse = c.createBufferSource();
    pulse.buffer = this.enginePulse;
    pulse.loop = true;
    pulse.loopStart = 0;
    pulse.loopEnd = this.enginePulse.duration;
    const shaper = this.saturator(1.8);
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 1.2;
    const gain = c.createGain();
    gain.gain.value = 0;
    pulse.connect(shaper).connect(filter).connect(gain);
    const sub = c.createOscillator();
    sub.type = 'sine';
    const subGain = c.createGain();
    subGain.gain.value = 0;
    sub.connect(subGain);
    const rumble = c.createBufferSource();
    rumble.buffer = this.brown;
    rumble.loop = true;
    const rumbleGain = c.createGain();
    rumbleGain.gain.value = 0;
    const rumbleFilter = c.createBiquadFilter();
    rumbleFilter.type = 'lowpass';
    rumbleFilter.frequency.value = 260;
    rumble.connect(rumbleFilter).connect(rumbleGain);
    const track = c.createBufferSource();
    track.buffer = this.trackClatter;
    track.loop = true;
    const trackFilter = c.createBiquadFilter();
    trackFilter.type = 'highpass';
    trackFilter.frequency.value = 250;
    const trackGain = c.createGain();
    trackGain.gain.value = 0;
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
    subGain.connect(out);
    rumbleGain.connect(out);
    trackGain.connect(out);
    pulse.start(0, Math.random() * 0.9);
    sub.start();
    rumble.start();
    track.start(0, Math.random() * 1.5);
    return { pulse, shaper, sub, subGain, filter, gain, rumble, rumbleGain, track, trackFilter, trackGain, panner, gear: 1, rpm: 700, shiftDip: 0 };
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
    let target = 650 + clamp(inGear, 0, 1) * 1500 + throttle * 300;
    if (v.shiftDip > 0) target *= 0.8;
    if (!tank.alive || !tank.stats.canMove) target = tank.alive ? 620 : 0;
    v.rpm += (target - v.rpm) * Math.min(1, dt * 5);
    const now = c.currentTime;
    const rate = Math.max(0.3, v.rpm / ENGINE_BASE_RPM);
    v.pulse.playbackRate.setTargetAtTime(rate, now, 0.04);
    v.sub.frequency.setTargetAtTime((v.rpm / 60) * 1.5, now, 0.04);
    v.filter.frequency.setTargetAtTime(380 + throttle * 1400 + v.rpm * 0.35, now, 0.06);
    const alive = tank.alive ? 1 : 0;
    v.gain.gain.setTargetAtTime((0.32 + throttle * 0.3) * volume * alive, now, 0.08);
    v.subGain.gain.setTargetAtTime((0.1 + throttle * 0.08) * volume * alive, now, 0.08);
    v.rumbleGain.gain.setTargetAtTime((0.2 + throttle * 0.25) * volume * alive, now, 0.08);
    const trackSpeed = (Math.abs(tank.trackSpeedL) + Math.abs(tank.trackSpeedR)) / 2;
    const tg = clamp(trackSpeed / 8, 0, 1) * 0.5 * volume;
    v.trackGain.gain.setTargetAtTime(tg, now, 0.1);
    v.track.playbackRate.setTargetAtTime(clamp(0.35 + trackSpeed / 7, 0.35, 2.4), now, 0.1);
    v.trackFilter.frequency.setTargetAtTime(200 + trackSpeed * 30, now, 0.1);
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
        for (const g of [this.otherEngine.gain, this.otherEngine.subGain, this.otherEngine.rumbleGain, this.otherEngine.trackGain]) g.gain.setTargetAtTime(0, now, 0.2);
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
    // Low wind bed plus a band-passed gust layer whose level wanders randomly.
    const wind = c.createBufferSource();
    wind.buffer = this.brown;
    wind.loop = true;
    const wf = c.createBiquadFilter();
    wf.type = 'lowpass';
    wf.frequency.value = kind === 'waves' ? 600 : 320;
    const wg = c.createGain();
    wg.gain.value = kind === 'wind' ? 0.35 : 0.16;
    wind.connect(wf).connect(wg).connect(this.ambientBus);
    wind.start(0, Math.random() * 2);
    const gustSrc = c.createBufferSource();
    gustSrc.buffer = this.noise;
    gustSrc.loop = true;
    const gf = c.createBiquadFilter();
    gf.type = 'bandpass';
    gf.frequency.value = kind === 'wind' ? 700 : 500;
    gf.Q.value = 0.6;
    const gust = c.createGain();
    gust.gain.value = 0;
    gustSrc.connect(gf).connect(gust).connect(this.ambientBus);
    gustSrc.start();
    nodes.push(wind, wf, wg, gustSrc, gf, gust);
    if (kind === 'waves') {
      const surf = c.createBufferSource();
      surf.buffer = this.noise;
      surf.loop = true;
      const sf = c.createBiquadFilter();
      sf.type = 'lowpass';
      sf.frequency.value = 900;
      const sg = c.createGain();
      sg.gain.value = 0.05;
      const lfo = c.createOscillator();
      lfo.frequency.value = 0.09;
      const lg = c.createGain();
      lg.gain.value = 0.045;
      lfo.connect(lg).connect(sg.gain);
      surf.connect(sf).connect(sg).connect(this.ambientBus);
      surf.start();
      lfo.start();
      nodes.push(surf, sf, sg, lfo, lg);
    }
    this.ambience = { nodes, kind, timer: 2, gust, gustTimer: 0 };
    this.nextDistantRumble = 15 + Math.random() * 20;
  }

  /** A single bird syllable: fast frequency sweep with a soft envelope. */
  private chirp(dest: AudioNode, t0: number, f: number, dur: number, gain: number, up: boolean): void {
    const c = this.ctx!;
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(f, t0);
    o.frequency.linearRampToValueAtTime(up ? f * 1.45 : f * 0.7, t0 + dur * 0.6);
    o.frequency.exponentialRampToValueAtTime(up ? f * 1.1 : f * 0.9, t0 + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + dur * 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(dest);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }

  /** Random ambient one-shots (birdsong, gulls, distant battle, clanks) and wind gusts. */
  updateAmbience(dt: number): void {
    if (!this.ready || !this.ambience) return;
    const a = this.ambience;
    const c = this.ctx!;
    const t = c.currentTime;
    a.gustTimer -= dt;
    if (a.gust && a.gustTimer <= 0) {
      a.gustTimer = 2 + Math.random() * 4;
      const level = Math.random() < 0.35 ? (a.kind === 'wind' ? 0.25 : 0.08) * Math.random() : 0.005;
      a.gust.gain.setTargetAtTime(level, t, 1.2);
    }
    this.nextDistantRumble -= dt;
    if (this.nextDistantRumble <= 0) {
      // Far-off artillery somewhere beyond the map: mostly reverb tail.
      this.nextDistantRumble = 18 + Math.random() * 30;
      const pan = c.createStereoPanner();
      pan.pan.value = Math.random() * 1.6 - 0.8;
      const g = c.createGain();
      g.gain.value = 0.35;
      pan.connect(g).connect(this.reverbSend);
      g.connect(this.ambientBus);
      const n = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) this.noiseBurst(pan, t + i * (0.5 + Math.random()), 1.6, 'lowpass', 320, 40, 0.25, true);
    }
    a.timer -= dt;
    if (a.timer > 0) return;
    a.timer = 3 + Math.random() * 7;
    const pan = c.createStereoPanner();
    pan.pan.value = Math.random() * 1.8 - 0.9;
    pan.connect(this.ambientBus);
    if (a.kind === 'birds') {
      const base = 2600 + Math.random() * 2200;
      if (Math.random() < 0.4) {
        // Trill.
        const n = 8 + Math.floor(Math.random() * 10);
        for (let i = 0; i < n; i++) this.chirp(pan, t + i * 0.055, base * (1 + 0.04 * Math.sin(i)), 0.045, 0.035, i % 2 === 0);
      } else {
        // Short phrase of varied syllables.
        const n = 2 + Math.floor(Math.random() * 5);
        let at = t;
        for (let i = 0; i < n; i++) {
          const dur = 0.06 + Math.random() * 0.12;
          this.chirp(pan, at, base * (0.8 + Math.random() * 0.5), dur, 0.04, Math.random() < 0.6);
          at += dur + 0.03 + Math.random() * 0.08;
        }
      }
    } else if (a.kind === 'waves') {
      // Gull calls: descending, slightly rough cries.
      const n = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const st = t + i * 0.35;
        this.chirp(pan, st, 1500 + Math.random() * 300, 0.3, 0.03, false);
        this.chirp(pan, st, 3000 + Math.random() * 500, 0.3, 0.008, false);
      }
    } else if (a.kind === 'industry' || a.kind === 'city') {
      // Distant metal clank echoing between buildings.
      const send = c.createGain();
      send.gain.value = 0.8;
      pan.connect(send).connect(this.reverbSend);
      for (const f of [340 + Math.random() * 200, 910 + Math.random() * 300]) this.tone(pan, t, 'triangle', f, f * 0.95, 0.35, 0.025);
      this.noiseBurst(pan, t, 0.12, 'bandpass', 1200, 700, 0.04, false, 3);
    }
  }

  stopBattle(): void {
    if (!this.ctx) return;
    for (const v of [this.engine, this.otherEngine]) {
      if (!v) continue;
      for (const s of [v.pulse, v.sub, v.rumble, v.track]) {
        try {
          s.stop();
        } catch {
          // already stopped
        }
      }
      v.gain.disconnect();
      v.subGain.disconnect();
      v.rumbleGain.disconnect();
      v.trackGain.disconnect();
      v.panner?.disconnect();
    }
    this.engine = null;
    this.otherEngine = null;
    this.setAmbience(null);
  }
}
