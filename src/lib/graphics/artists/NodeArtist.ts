import { GraphNode } from '@/lib/graph/GraphNode';
import { Artist } from '@/lib/graphics/artists/Artist';
import { GraphicsProxy } from '@/lib/graphics/GraphicsProxy';

export class NodeArtist extends Artist<[GraphNode]> {
  composition = [GraphNode] as const;

  draw ([node]: [GraphNode], graphics: GraphicsProxy) {
    const { color, radius } = node.style;

    graphics.context.fillStyle = color;
    graphics.context.beginPath();
    graphics.arc(node.location, radius, 0, 2 * Math.PI);
    graphics.context.fill();
  }
}
