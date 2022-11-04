import { Scene } from '@/lib/game/Scene';
import { GraphicsProxy } from '@/lib/graphics/GraphicsProxy';
import { TupleConstructors } from '@/lib/types/TupleConstructors';

export abstract class Artist<T extends any[]> {
  abstract composition: TupleConstructors<T>

  constructor (private _scene: Scene) { }

  // TODO: caching entities would be good for perf
  drawAll (graphics: GraphicsProxy): void {
    const objects = this._scene.objectsByComposition(this.composition);
    const entities: T[] = [];

    for (const object of objects) {
      entities.push(this.composition.map(Type => object.getComposable(Type)) as any);
    }

    for (const entity of entities) {
      this.draw(entity, graphics);
    }
  }

  abstract draw (entities: T, graphics: GraphicsProxy): void
}
