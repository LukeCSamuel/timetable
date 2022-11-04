import { Constructor } from '@/lib/types/Constructor';

/**
 * Given a tuple type, return a corresponding tuple of constructors for each type in the tuple
 */
export type TupleConstructors<T extends any[]> = T extends [infer A, ...infer B] ?
  readonly [Constructor<A>, ...TupleConstructors<B>] :
  T extends [infer A] ?
  [Constructor<A>] :
  [];
