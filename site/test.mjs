// node site/test.mjs -- checks the browser brain against the full-model numbers from fly/simulate.py
import { readFileSync } from 'node:fs';
import { Brain } from './js/brain.js';
const data = JSON.parse(readFileSync(new URL('./data/brain.json', import.meta.url)));
const expected = { sugar: [480, 590], bitter: [105, 118], water: [112, 130], 'sugar+bitter': [340, 420] };
let ok = true;
for (const [name, [lo, hi]] of Object.entries(expected)) {
  const b = new Brain(data, 7);
  for (const s of name.split('+')) b.setStimulus(b.stimuli[s], 100);
  const t0 = performance.now();
  b.advance(1000);
  const active = b.spikeCount.reduce((a, c) => a + (c > 0 ? 1 : 0), 0);
  const motor = b.classSpikes[b.classes.indexOf('motor')];
  const pass = active >= lo && active <= hi;
  ok &&= pass;
  console.log(`${pass ? 'ok  ' : 'FAIL'} ${name.padEnd(13)} active=${active} (expect ${lo}-${hi}) motor spikes=${motor} sim 1s took ${(performance.now() - t0).toFixed(0)} ms`);
}
process.exit(ok ? 0 : 1);
