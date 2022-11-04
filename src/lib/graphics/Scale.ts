export class Scale {
  private _width = 0;
  private _height = 0;
  private _basis = 100;
  private _scalar = 0;

  get scalar (): number {
    return this._scalar;
  }

  get width () {
    return this._width;
  }
  set width (value) {
    this._width = value;
    this.computeScalar();
  }

  get height () {
    return this._height;
  }
  set height (value) {
    this._height = value;
    this.computeScalar();
  }

  get basis () {
    return this._basis;
  }
  set basis (value) {
    if (value < 1) {
      throw new Error('basis value cannot be less than 1');
    }

    this._basis = value;
    this.computeScalar();
  }

  private computeScalar () {
    this._scalar = Math.min(this._width, this._height) / this._basis;
  }
}
