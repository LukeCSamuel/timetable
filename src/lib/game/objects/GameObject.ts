import { Constructor } from '@/lib/types/Constructor';
import { UnionOfTuple } from '@/lib/types/UnionOfTuple';

export class GameObject<T> {
  private _composition: WeakMap<Constructor<T>, T> = new WeakMap();

  hasComposable<U extends T> (Type: Constructor<U>): boolean {
    return this._composition.has(Type);
  }

  removeComposable<U extends T> (Type: Constructor<U>): void {
    if (this.hasComposable(Type)) {
      this._composition.delete(Type);
    }
  }

  setComposable<U extends T> (Type: Constructor<U>, value: U) {
    this._composition.set(Type, value);
  }

  getComposable<U extends T> (Type: Constructor<U>): U {
    if (this.hasComposable(Type)) {
      return this._composition.get(Type) as U;
    } else {
      throw new Error(`Composable [${(Type as any)?.name}] is not present on this GameObject`);
    }
  }

  static create<T extends any[]> (composables: T): GameObject<UnionOfTuple<T>> {
    const object = new GameObject();
    for (let i = 0; i < composables.length; i++) {
      object.setComposable(composables[i].constructor, composables[i]);
    }
    return object as any;
  }
}
