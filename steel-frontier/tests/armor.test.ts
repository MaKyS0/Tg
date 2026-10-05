import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { registry } from '../src/data/registry';
import { Tank, stockLoadout } from '../src/sim/Tank';
import { resolveShellHit, plateInteraction, penetrationAtVelocity, previewShot } from '../src/sim/ArmorSystem';
import { Random } from '../src/core/Random';
import type { AmmoData } from '../src/data/types';

function makeTank(id: string): Tank {
  const data = registry.getTank(id);
  const t = new Tank(data, 1, 'target', stockLoadout(data, 100, true));
  t.position.set(0, 0, 0);
  t.yaw = 0;
  t.updateQuaternion();
  return t;
}

function shell(kind: AmmoData['kind'], pen: number, caliber = 100, damage = 300): AmmoData {
  return {
    id: 'test_' + kind, kind, name: kind, caliber, penetration: pen, damage, velocity: 900, mass: 10, dragK: 1e-4,
    gravityScale: 1, normalization: kind === 'AP' ? 5 : kind === 'APCR' ? 2 : 0,
    ricochetAngle: kind === 'HE' ? 90 : kind === 'HEAT' ? 85 : 70, explosionRadius: kind === 'HE' ? 1.5 : 0, price: 1, premium: false,
  };
}

describe('armour model & penetration', () => {
  const heavy = makeTank('ussr_heavy10');
  const d = heavy.data.hull.dims;
  const frontY = d.clearance + d.height * 0.75;

  it('hits the upper front plate at its slope angle', () => {
    const res = resolveShellHit(heavy, new Vector3(0, frontY, 60), new Vector3(0, 0, -1), 100, shell('AP', 50), 900, new Random(1));
    expect(res.plate).toBe('upperFront');
    expect(res.angle).toBeGreaterThan(heavy.data.hull.angles.upperFront - 2);
    expect(res.angle).toBeLessThan(heavy.data.hull.angles.upperFront + 2);
    expect(res.effective).toBeGreaterThan(heavy.data.hull.armor.upperFront * 1.4);
  });

  it('weak shells do not penetrate the heavy front, strong ones do', () => {
    const weak = resolveShellHit(heavy, new Vector3(0, frontY, 60), new Vector3(0, 0, -1), 100, shell('AP', 80), 900, new Random(2));
    expect(['noPenetration', 'ricochet']).toContain(weak.kind);
    expect(weak.damage).toBe(0);
    const strong = resolveShellHit(heavy, new Vector3(0, frontY, 60), new Vector3(0, 0, -1), 100, shell('AP', 900), 900, new Random(3));
    expect(strong.kind).toBe('penetration');
    expect(strong.damage).toBeGreaterThan(200);
  });

  it('ricochets at grazing angles unless overmatched', () => {
    const p = plateInteraction(shell('AP', 200, 100), 50, 75);
    expect(p.ricochet).toBe(true);
    const over = plateInteraction(shell('AP', 200, 160), 50, 75);
    expect(over.ricochet).toBe(false);
    const he = plateInteraction(shell('HE', 50), 50, 80);
    expect(he.ricochet).toBe(false);
    expect(plateInteraction(shell('AP', 100), 100, 60).effective).toBeGreaterThan(170);
  });

  it('side shots through tracks/screens and rear shots penetrate more easily', () => {
    const side = resolveShellHit(heavy, new Vector3(60, d.clearance + d.height * 0.8, 0), new Vector3(-1, 0, 0), 100, shell('AP', heavy.data.hull.armor.side + 40), 900, new Random(4));
    expect(side.kind).toBe('penetration');
    const rear = resolveShellHit(heavy, new Vector3(0, d.clearance + d.height * 0.5, -60), new Vector3(0, 0, 1), 100, shell('AP', heavy.data.hull.armor.rear + 30), 900, new Random(5));
    expect(rear.plate).toBe('rear');
    expect(rear.kind).toBe('penetration');
    expect(rear.modules.some((m) => m.id === 'engine')).toBe(true);
  });

  it('HE splash vs thick armour deals little damage, vs thin armour deals a lot', () => {
    const vsHeavy = resolveShellHit(heavy, new Vector3(0, frontY, 60), new Vector3(0, 0, -1), 100, shell('HE', 50, 100, 300), 900, new Random(6));
    expect(vsHeavy.kind).toBe('heSplash');
    expect(vsHeavy.damage).toBeLessThan(50);
    const light = makeTank('ussr_main1');
    const ld = light.data.hull.dims;
    const vsLight = resolveShellHit(light, new Vector3(30, ld.clearance + ld.height * 0.8, 0), new Vector3(-1, 0, 0), 100, shell('HE', 60, 100, 300), 900, new Random(7));
    expect(vsLight.kind).toBe('penetration');
    expect(vsLight.damage).toBeGreaterThan(200);
  });

  it('kinetic penetration drops with velocity, HEAT does not', () => {
    const ap = shell('AP', 200);
    expect(penetrationAtVelocity(ap, 900)).toBeCloseTo(200);
    expect(penetrationAtVelocity(ap, 600)).toBeLessThan(150);
    expect(penetrationAtVelocity(shell('HEAT', 250), 300)).toBe(250);
  });

  it('preview agrees with the penetration rules', () => {
    const p = previewShot(heavy, new Vector3(0, frontY, 60), new Vector3(0, 0, -1), 100, shell('AP', 80), 900);
    expect(p.hit).toBe(true);
    expect(p.effective).toBeGreaterThan(p.penetration);
  });
});
