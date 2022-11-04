import { GameObject } from '@/lib/game/GameObject';
import { Constructor } from '@/lib/types/Constructor';

export class Scene {
  constructor (public gameObjects: GameObject<any>[] = []) { }

  *objectsByComposition<T> (composition: Constructor<T>[]) {
    for (const object of this.gameObjects) {
      if (composition.every(c => object.hasComposable(c))) {
        yield object as GameObject<T>;
      }
    }
  }
}
