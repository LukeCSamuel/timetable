import { Vector2 } from '@/lib/math/Vector2';

export class DirectionalPosition {
  constructor (public position: Vector2, public direction: Vector2) {
    direction = direction.unit();
  }
}
