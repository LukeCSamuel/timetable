import { GraphNode } from '@/lib/graph/GraphNode';
import { Artist } from '@/lib/graphics/artists/Artist';
import { GraphicsProxy } from '@/lib/graphics/GraphicsProxy';
import { StationStyleProvider } from '@/lib/styles/StationStyleProvider';

export class NodeArtist extends Artist<[GraphNode, StationStyleProvider]> {
  composition = [GraphNode, StationStyleProvider] as const;

  draw ([node, { getStyle }]: [GraphNode, StationStyleProvider], graphics: GraphicsProxy) {
    const { color, radius } = getStyle();

    graphics.context.fillStyle = color;
    graphics.context.beginPath();
    graphics.arc(node.location, radius, 0, 2 * Math.PI);
    graphics.context.fill();
  }
}
