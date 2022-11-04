export class VirtualClock {
  private _ticks = 0;
  private _interval: number | undefined = undefined;
  private _tickRate = 4;

  secondsPerTick = this._tickRate / 240;

  private _onTick: ((tick: number) => void)[] = [];

  /**
   * The current time, in seconds
   */
  get timestamp () {
    return this._ticks / this.secondsPerTick;
  }

  /**
   * String representing the current time
   */
  get formattedTime () {
    const days = Math.floor(1 + this.timestamp / 60 / 60 / 24);
    const hours = Math.floor((this.timestamp / 60 / 60) % 24);
    const minutes = Math.floor((this.timestamp / 60) % 60);
    return `Day ${days}   ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  /**
   * Tick rate controls the simulation speed, representing the number of ticks to process each second
   */
  get tickRate () {
    return this._tickRate;
  }
  set tickRate (value) {
    this._tickRate = value;
    this.pause();
    this.start();
  }

  /**
   * Start the virtual clock
   */
  start () {
    if (!this._interval) {
      this._interval = setInterval(() => {
        this._ticks++;
        for (const listener of this._onTick) {
          listener(this._ticks);
        }
      }, 1000 / this.tickRate);
    }
  }

  /**
   * Pause the virtual clock
   */
  pause () {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = undefined;
    }
  }

  /**
   * Reset the virtual clock
   */
  reset () {
    this.pause();
    this._ticks = 0;
  }

  addTickListener (f: (tick: number) => void) {
    this._onTick.push(f);
  }

  removeTickListener (f: (tick: number) => void) {
    this._onTick = this._onTick.filter(o => o !== f);
  }
}
