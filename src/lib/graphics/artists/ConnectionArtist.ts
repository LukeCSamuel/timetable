import { GraphNode } from '@/lib/graph/GraphNode';
import { Artist } from '@/lib/graphics/artists/Artist';
import { GraphicsProxy } from '@/lib/graphics/GraphicsProxy';
import { ConnectionStyleProvider } from '@/lib/styles/ConnectionStyleProvider';

export class ConnectionArtist extends Artist<[GraphNode, ConnectionStyleProvider]> {
  composition = [GraphNode, ConnectionStyleProvider] as const;

  draw ([node, { getStyle }]: [GraphNode, ConnectionStyleProvider], graphics: GraphicsProxy) {
    const { color, width } = getStyle();

    graphics.lineWidth = width;
    graphics.context.strokeStyle = color;

    if (node.isTerminus) {
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
