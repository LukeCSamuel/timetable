export abstract class StyleProvider<T> {
  constructor (public getStyle: () => T) { }
}
