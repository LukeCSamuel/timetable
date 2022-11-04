import { GraphicsProxy } from '@/lib/graphics/GraphicsProxy';

export type DrawFunction = (context: GraphicsProxy) => void

export type Layer = {
  name: string,
  draw: DrawFunction,
}

// TODO: this class should take advantage of compositing with 2d context to improve performance
// TODO: this class should allow for layers to have an initializer
export class LayerRenderer {
  private isDrawing = false;

  layers: Layer[] = [];

  constructor (private context: GraphicsProxy) { }

  addLayer (name: string, draw: DrawFunction) {
    this.layers.push({
      name,
      draw,
    });
  }

  removeLayer (name: string) {
     this.layers = this.layers.filter(layer => layer.name !== name);
  }

  start () {
    this.isDrawing = true;
    this.draw();
  }

  stop () {
    this.isDrawing = false;
  }

  private draw () {
    if (!this.isDrawing) {
      // quit drawing
      return;
    }

    // clear the screen
    this.context.context.clearRect(
      0, 0,
      this.context.scale.width,
      this.context.scale.height,
    );

    for (const layer of this.layers) {
      layer.draw(this.context);
    }

    requestAnimationFrame(this.boundDraw);
  }

  private boundDraw = this.draw.bind(this);
}
