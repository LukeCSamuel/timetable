import { End, GraphNode } from '@/lib/graph/GraphNode';

interface AStarSearchIntermediate {
  node: GraphNode
  f: number
  g: number
  parent?: AStarSearchIntermediate
}

export function aStar (start: GraphNode, end: GraphNode, initialDirection?: End) {
  // A*
  let openList: AStarSearchIntermediate[] = [{
    node: start,
    f: 0,
    g: 0,
    parent: undefined,
  }];
  const closedList: AStarSearchIntermediate[] = [];

  while (openList.length > 0) {
    let q: AStarSearchIntermediate = openList[0];
    for (const inter of openList) {
      if (inter.f < q.f) {
        q = inter;
      }
    }
    // remove q from open list
    openList = openList.filter(p => p !== q);

    let successors: GraphNode[] = [];
    if (!q.parent && !initialDirection) {
      // can go both directions, add all connected nodes
      successors = q.node.allConnectedNodes;
    } else {
      // can only go in the direction of the connection
      const direction = initialDirection || q.node.directionFromNode((q.parent as AStarSearchIntermediate).node);
      if (direction) {
        successors = [...q.node[direction]];
      }
    }

    for (const successor of successors) {
      if (successor === end) {
        // we've reached the end of our search
        return [...(function* () {
          yield successor;
          let n: AStarSearchIntermediate | undefined = q;
          while (n?.node) {
            yield n?.node;
            n = n.parent;
          }
        })()].reverse();
      }

      const g = q.g + q.node.location.dist(successor.location);
      const h = q.node.location.dist(end.location);
      const f = g + h;
      const shorter = openList.find(n => n.node == successor && n.f < f) || closedList.find(n => n.node === successor && n.f < f);
      if (!shorter) {
        // no shorter paths to here exist
        openList.push({
          node: successor,
          parent: q,
          f,
          g,
        });
      }
    }

    closedList.push(q);
  }

  // the search failed to find the node, must not be connected
  return undefined;
}
