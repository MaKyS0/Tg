import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { heightAtRange, solveElevation, integrateShell, maxRange } from '../src/sim/Ballistics';
import { aimElevation } from '../src/sim/TankCombat';
import { registry } from '../src/data/registry';

const gun = registry.getTank('germany_main8').modules.gun[1];
const ap = gun.ammo[0];
const arty = registry.getTank('ussr_spg6').modules.gun[1].ammo[0];

describe('ballistics', () => {
  it('shells drop under gravity and slow down from drag', () => {
    const pos = new Vector3();
    const vel = new Vector3(0, 0, ap.velocity);
    for (let i = 0; i < 60; i++) integrateShell(pos, vel, ap, 1 / 60);
    expect(pos.y).toBeLessThan(-2);
    expect(vel.length()).toBeLessThan(ap.velocity);
    expect(pos.z).toBeGreaterThan(ap.velocity * 0.9);
  });

  it('elevation solver hits the requested point', () => {
    for (const range of [100, 300, 600]) {
      const e = solveElevation(ap, range, 5)!;
      const r = heightAtRange(ap, e, range)!;
      expect(Math.abs(r.y - 5)).toBeLessThan(0.15);
    }
    const quick = aimElevation(ap, new Vector3(0, 0, 0), new Vector3(0, 3, 500));
    expect(Math.abs(heightAtRange(ap, quick!, 500)!.y - 3)).toBeLessThan(0.3);
  });

  it('artillery uses a high, slow arc with limited range', () => {
    const range = 400;
    const low = solveElevation(arty, range, 0, false)!;
    const high = solveElevation(arty, range, 0, true)!;
    expect(high).toBeGreaterThan(low);
    expect(heightAtRange(arty, low, range)!.t).toBeGreaterThan(1.5);
    expect(solveElevation(arty, 5000, 0)).toBeNull();
    const mr = maxRange(arty);
    expect(mr).toBeGreaterThan(450);
    expect(mr).toBeLessThan(2500);
  });
});
