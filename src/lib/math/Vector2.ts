import { Scale } from '@/lib/graphics/Scale';

export type PointLike = Vector2 | [number, number] | { x: number, y: number };

export class Vector2 {
  x = 0;
  y = 0;

  constructor (x: PointLike)
  constructor (x: number, y: number)
  constructor (x?: number | PointLike, y?: number) {
    if (typeof x === 'number') {
      this.x = x;
      this.y = y ?? 0;
    } else if (x) {
      return Vector2.cast(x, true);
    }
  }

  realValues (scale: Scale): [number, number] {
    return [this.x * scale.scalar, this.y * scale.scalar];
  }

  *[Symbol.iterator] () {
    yield this.x;
    yield this.y;
  }

  add (a: PointLike): Vector2 {
    a = Vector2.cast(a);
    return new Vector2(
      this.x + a.x,
      this.y + a.y,
    );
  }

  subtract (a: PointLike): Vector2 {
    a = Vector2.cast(a);
    return new Vector2(
      this.x - a.x,
      this.y - a.y,
    );
  }

  scale (n: number): Vector2 {
    return new Vector2(
      this.x * n,
      this.y * n,
    );
  }

  mid (a: PointLike): Vector2 {
    const b = Vector2.cast(a);
    return b.subtract(this).scale(0.5).add(this);
  }

  magnitude (): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  unit (): Vector2 {
    return this.scale(1 / this.magnitude());
  }

  dist (a: PointLike): number {
    const b = this.subtract(a);
    return b.magnitude();
  }

  eq (a: PointLike): boolean {
    const b = Vector2.cast(a);
    return this.x === b.x && this.y === b.y;
  }

  static cast (p: PointLike, createNewInstance = false): Vector2 {
    if (p instanceof Vector2 && !createNewInstance) {
      return p;
    } else if (Array.isArray(p)) {
      return new Vector2(...p);
    } else {
      return new Vector2(p.x, p.y);
    }
  }
}
