import { GameObject } from '@/lib/game/objects/GameObject';
import { TrackNode } from '@/lib/game/objects/TrackNode';
import { GraphNode } from '@/lib/graph/GraphNode';
import { StationStyleProvider } from '@/lib/styles/StationStyleProvider';

export class StationNode extends GameObject<GraphNode | StationStyleProvider> {
  constructor (track: TrackNode) {
    super();
    const node = track.getComposable(GraphNode);
    this.setComposable(GraphNode, node);
    this.setComposable(StationStyleProvider, new StationStyleProvider(() => ({ color: '#08f', radius: 1 })));
  }
}
