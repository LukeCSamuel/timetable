import { DirectionalPosition } from '@/lib/graph/DirectionalPosition';
import { Route } from '@/lib/graph/Route';
import { Artist } from '@/lib/graphics/artists/Artist';
import { GraphicsProxy } from '@/lib/graphics/GraphicsProxy';
import { Vector2 } from '@/lib/math/Vector2';
import { TrainStyleProvider } from '@/lib/styles/TrainStyleProvider';

export class TrainArtist extends Artist<[TrainStyleProvider, DirectionalPosition, Route]> {
  composition = [TrainStyleProvider, DirectionalPosition, Route] as const;
  draw ([{ getStyle }, { position /* direction */ }, { routeLength }]: [TrainStyleProvider, DirectionalPosition, Route], graphics: GraphicsProxy): void {
    const { width, length, color } = getStyle();

    // compute the corners of the train
    const topLeft = position.add([- length / 2, - width / 2]);
    // const topRight = position.add([length / 2, - width / 2]);
    // const bottomLeft = position.add([- length / 2, width / 2]);
    // const bottomRight = position.add([length / 2, width / 2]);

    // TODO rotate corners
    graphics.context.fillStyle = color;
    graphics.fillRect(topLeft, new Vector2(length, width));

    for (const { curve } of routeLength.steps) {
      const [a, b, c] = curve.points;

      graphics.context.strokeStyle = '#f0f';
      graphics.lineWidth = 0.2;
      graphics.context.beginPath();
      graphics.moveTo(Vector2.cast(a));
      graphics.quadraticCurveTo(Vector2.cast(b), Vector2.cast(c));
      graphics.context.stroke();
    }
  }

}
