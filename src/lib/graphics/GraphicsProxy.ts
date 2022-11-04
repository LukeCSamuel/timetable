import { Scale } from '@/lib/graphics/Scale';
import { Vector2 } from '@/lib/math/Vector2';
import { Unshift } from '@/lib/types/Unshift';

export interface GraphicsProxyOptions {
  scale: Scale
}

export class GraphicsProxy {
  scale: Scale

  constructor (public context: CanvasRenderingContext2D, options: GraphicsProxyOptions) {
    this.scale = options.scale;
  }

  get lineWidth (): number {
    return this.context.lineWidth / this.scale.scalar;
  }

  set lineWidth (value) {
    this.context.lineWidth = value * this.scale.scalar;
  }

  moveTo (p: Vector2) {
    this.context.moveTo(...p.realValues(this.scale));
  }

  lineTo (p: Vector2) {
    this.context.lineTo(...p.realValues(this.scale));
  }

  fillRect (p: Vector2, s: Vector2) {
    this.context.fillRect(...p.realValues(this.scale), ...s.realValues(this.scale));
  }

  quadraticCurveTo (c: Vector2, p: Vector2) {
    this.context.quadraticCurveTo(...c.realValues(this.scale), ...p.realValues(this.scale));
  }

  bezierCurveTo (c1: Vector2, c2: Vector2, p: Vector2) {
    this.context.bezierCurveTo(
      ...c1.realValues(this.scale),
      ...c2.realValues(this.scale),
      ...p.realValues(this.scale),
    );
  }

  arc (center: Vector2, radius: number, ...remainingArgs: Unshift<Unshift<Unshift<Parameters<CanvasRenderingContext2D['arc']>>>>) {
    this.context.arc(
      ...center.realValues(this.scale),
      radius * this.scale.scalar,
      ...remainingArgs,
    );
  }
}
