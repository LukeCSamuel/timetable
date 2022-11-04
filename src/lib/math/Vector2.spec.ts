import { Vector2 } from './Vector2';

describe('Vector2', () => {
  let a: Vector2,
    b: Vector2,
    c: Vector2,
    d: Vector2,
    zero: Vector2;

  beforeEach(() => {
    a = new Vector2(3, 4);
    b = new Vector2(1, 0);
    c = new Vector2(0, 1);
    d = new Vector2(1, 1);
    zero = new Vector2(0, 0);
  });

  test('add()', () => {
    expect([...a.add(b)]).toEqual([4, 4]);
    expect([...a.add(c)]).toEqual([3, 5]);
    expect([...a.add(zero)]).toEqual([...a]);
  });

  test('subtract()', () => {
    expect([...a.subtract(b)]).toEqual([2, 4]);
    expect([...a.subtract(c)]).toEqual([3, 3]);
    expect([...a.subtract(zero)]).toEqual([...a]);
  });

  test('scale()', () => {
    expect([...a.scale(0)]).toEqual([...zero]);
    expect([...a.scale(0.5)]).toEqual([1.5, 2]);
    expect([...a.scale(1)]).toEqual([...a]);
    expect([...a.scale(2)]).toEqual([6, 8]);
    expect([...a.scale(-1)]).toEqual([-3, -4]);
  });

  test('mid()', () => {
    expect([...a.mid(a)]).toEqual([...a]);
    expect([...a.mid(b)]).toEqual([2, 2]);
    expect([...a.mid(c)]).toEqual([1.5, 2.5]);
    expect([...a.mid(zero)]).toEqual([1.5, 2]);
  });

  test('magnitude()', () => {
    expect(a.magnitude()).toBe(5);
    expect(b.magnitude()).toBe(1);
    expect(c.magnitude()).toBe(1);
    expect(d.magnitude()).toBe(Math.sqrt(2));
    expect(zero.magnitude()).toBe(0);
  });

  test('dist()', () => {
    expect(a.dist(zero)).toBe(a.magnitude());
    expect(b.dist(c)).toBe(Math.sqrt(2));
    expect(b.dist(d)).toBe(1);
    expect(c.dist(d)).toBe(1);
  });
});
