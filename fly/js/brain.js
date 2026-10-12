// Live leaky-integrate-and-fire model of the FlyWire connectome sub-network (same equations and
// parameters as fly/simulate.py, after Shiu et al. 2024). Pure ES module: no DOM, runs in Node too.

const V_REST = -52, V_RESET = -52, V_TH = -45;
const T_MBR = 20, TAU = 5, W_SYN = 0.275, T_RFC = 2.2, T_DLY = 1.8, DT = 0.1; // mV / ms

export class Brain {
  constructor(data, seed = 1) {
    const n = (this.n = data.n);
    this.cls = Uint8Array.from(data.cls);
    this.classes = data.classes;
    this.type = data.type;
    this.xyz = data.xyz;
    this.stimuli = data.stimuli;
    // CSR of outgoing synapses: pre -> (post, signed weight)
    const m = data.pre.length;
    this.start = new Uint32Array(n + 1);
    for (let i = 0; i < m; i++) this.start[data.pre[i] + 1]++;
    for (let i = 0; i < n; i++) this.start[i + 1] += this.start[i];
    const fill = this.start.slice(0, n);
    this.to = new Uint32Array(m);
    this.w = new Float32Array(m);
    for (let i = 0; i < m; i++) {
      const k = fill[data.pre[i]]++;
      this.to[k] = data.post[i];
      this.w[k] = data.w[i];
    }
    this.v = new Float32Array(n).fill(V_REST);
    this.g = new Float32Array(n);
    this.refr = new Int16Array(n);
    this.dly = Math.round(T_DLY / DT);
    this.rfc = Math.round(T_RFC / DT);
    this.queue = Array.from({ length: this.dly }, () => []);
    this.qi = 0;
    this.dvDecay = Math.exp(-DT / T_MBR);
    this.dgDecay = Math.exp(-DT / TAU);
    this.rng = mulberry32(seed);
    this.stim = new Map(); // neuron index -> per-step spike probability
    this.t = 0;            // ms
    this.lastSpike = new Float32Array(n).fill(-1e9); // ms, for rendering
    this.spikeCount = new Uint32Array(n);
    this.pop = [];         // spikes per 1 ms bin (rolling), for plotting
    this._bin = 0; this._binSpikes = 0;
    this.classSpikes = new Float64Array(this.classes.length);
    this.recent = [];      // [t, class] of recent spikes (for windowed output readout)
  }

  /** Drive a group of neurons as Poisson spike trains at `rate` Hz. rate <= 0 stops them. */
  setStimulus(indices, rate) {
    for (const i of indices) {
      if (rate > 0) this.stim.set(i, (rate * DT) / 1000);
      else this.stim.delete(i);
    }
  }
  clearStimulus() { this.stim.clear(); }

  /** Advance by `ms` of simulated time. */
  advance(ms) {
    const steps = Math.round(ms / DT);
    for (let s = 0; s < steps; s++) this._step();
  }

  _step() {
    const { n, v, g, refr, to, w, start } = this;
    const arrived = this.queue[this.qi];
    for (let a = 0; a < arrived.length; a++) {
      const i = arrived[a];
      for (let k = start[i], e = start[i + 1]; k < e; k++) g[to[k]] += W_SYN * w[k];
    }
    const spikes = [];
    const dv = this.dvDecay, dg = this.dgDecay;
    for (let i = 0; i < n; i++) {
      if (refr[i] <= 0) {
        const vi = V_REST + (v[i] - V_REST) * dv + g[i] * (1 - dv);
        v[i] = vi;
        if (vi >= V_TH) spikes.push(i);
      } else v[i] = V_RESET;
      g[i] *= dg;
      refr[i]--;
    }
    for (const [i, p] of this.stim) {
      // stimulated sensory neurons fire as Poisson processes regardless of refractoriness (as in simulate.py)
      if (this.rng() < p && !spikes.includes(i)) spikes.push(i);
    }
    this.t += DT;
    for (let a = 0; a < spikes.length; a++) {
      const i = spikes[a];
      v[i] = V_RESET; refr[i] = this.rfc;
      this.spikeCount[i]++;
      this.lastSpike[i] = this.t;
      this.classSpikes[this.cls[i]]++;
      this.recent.push(this.t, this.cls[i]);
    }
    this._binSpikes += spikes.length;
    this._bin += DT;
    if (this._bin >= 1 - 1e-9) {
      this.pop.push(this._binSpikes);
      if (this.pop.length > 3000) this.pop.shift();
      this._bin = 0; this._binSpikes = 0;
    }
    this.queue[this.qi] = spikes;
    this.qi = (this.qi + 1) % this.dly;
    if (this.recent.length > 40000) this.recent.splice(0, this.recent.length - 20000);
  }

  /** Spikes of class `cls` (index or name) in the last `windowMs` of simulated time. */
  recentSpikes(cls, windowMs = 250) {
    const c = typeof cls === 'string' ? this.classes.indexOf(cls) : cls;
    const t0 = this.t - windowMs;
    let count = 0;
    for (let i = this.recent.length - 2; i >= 0; i -= 2) {
      if (this.recent[i] < t0) break;
      if (this.recent[i + 1] === c) count++;
    }
    return count;
  }

  reset() {
    this.v.fill(V_REST); this.g.fill(0); this.refr.fill(0);
    this.queue.forEach((q, i) => (this.queue[i] = []));
    this.stim.clear(); this.spikeCount.fill(0); this.lastSpike.fill(-1e9);
    this.classSpikes.fill(0); this.recent.length = 0; this.pop.length = 0;
  }
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
