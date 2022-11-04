import { GraphNode } from '@/lib/graph/GraphNode';
import { Artist } from '@/lib/graphics/artists/Artist';
import { GraphicsProxy } from '@/lib/graphics/GraphicsProxy';

export class ConnectionArtist extends Artist<[GraphNode]> {
  composition = [GraphNode] as const;

  draw ([node]: [GraphNode], graphics: GraphicsProxy) {
    graphics.lineWidth = 1;

    if (node.isTerminus) {
      graphics.context.strokeStyle = '#555';
      const connections = node.terminalConnections;
      if (connections.length > 0) {
        for (const a of connections) {
          const midA = a.location.mid(node.location);

          graphics.context.beginPath();
          graphics.moveTo(midA);
          graphics.lineTo(node.location);
          graphics.context.stroke();
        }
      }
    } else {
      graphics.context.strokeStyle = '#000';
      const connections = node.connections;
      if (connections.length > 0) {
        for (const [a, b] of connections) {
          const midA = a.location.mid(node.location);
          const midB = b.location.mid(node.location);

          graphics.context.beginPath();
          graphics.moveTo(midA);
          graphics.quadraticCurveTo(node.location, midB);
          graphics.context.stroke();
        }
      }
    }
  }
}
