export type Unshift<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never
