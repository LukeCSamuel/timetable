export type UnionOfTuple<T extends any[]> =
  T extends [infer A, ...infer B] ?
  A | UnionOfTuple<B> :
  T extends [infer A] ?
  A : never;
