import { GraphicsProxy } from '@/lib/graphics/GraphicsProxy';
import { LayerRenderer } from '@/lib/graphics/LayerRenderer';
import { Scale } from '@/lib/graphics/Scale';

export interface GraphicsOptions {
  scale?: number
}

export function getGraphics (canvas: HTMLCanvasElement, options: GraphicsOptions = {}) {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Could not get a rendering context from canvas.');
  }

  const realDimensions = new Scale();
  realDimensions.basis = options.scale || 100;

  function handleResize () {
    const { width, height } = canvas.getBoundingClientRect();
    realDimensions.width = width;
    realDimensions.height = height;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', handleResize);
  handleResize();

  const graphics = new GraphicsProxy(context, {
    scale: realDimensions,
  });
  const renderer = new LayerRenderer(graphics);

  return {
    graphics,
    renderer,
  };
}
