import { GameObject } from '@/lib/game/objects/GameObject';
import { GraphNode } from '@/lib/graph/GraphNode';
import { Vector2 } from '@/lib/math/Vector2';
import { ConnectionStyle, ConnectionStyleProvider } from '@/lib/styles/ConnectionStyleProvider';

export enum TrackConstants {
  colorDark = '#111',
  colorLight = '#555',
  width = 1,
}

export class TrackNode extends GameObject<GraphNode | ConnectionStyleProvider> {
  private _node: GraphNode;

  constructor (location: Vector2) {
    super();
    this._node = new GraphNode(location);
    this.setComposable(GraphNode, this._node);

    const style = new ConnectionStyleProvider(this.getStyle.bind(this));
    this.setComposable(ConnectionStyleProvider, style);
  }

  getStyle () {
    if (this._node.isTerminus) {
      return {
        color: TrackConstants.colorLight,
        width: TrackConstants.width,
      } as ConnectionStyle;
    } else {
      return {
        color: TrackConstants.colorDark,
        width: TrackConstants.width,
      } as ConnectionStyle;
    }
  }
}
