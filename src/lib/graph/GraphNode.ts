import { Vector2 } from '@/lib/math/Vector2';
import { Pair } from '@/lib/types/Pair';

export enum End {
  left = 'left',
  right = 'right',
}

export interface ConnectionDescription {
  node: GraphNode
  end: End
}

export class GraphNode {
  private static count = 0;
  private id = GraphNode.count++;

  constructor (public location: Vector2) { }

  private [End.left]: GraphNode[] = [];
  private [End.right]: GraphNode[] = [];

  private connectionsCache: Pair<GraphNode>[] | null = null;

  /**
   * Indicates if this node is a terminal node (i.e. has a side without connections)
   */
  get isTerminus () {
    return this[End.left].length === 0 || this[End.right].length === 0;
  }

  /**
   * Returns a list of pairs of nodes connected to each other via this node
   */
  get connections () {
    if (!this.connectionsCache) {
      // generate combination of right and left nodes
      this.connectionsCache = [];
      for (const left of this[End.left]) {
        for (const right of this[End.right]) {
          this.connectionsCache.push([left, right]);
        }
      }
    }

    return this.connectionsCache;
  }

  /**
   * Returns the list of nodes connected to this node on one side
   */
  get terminalConnections () {
    if (this.isTerminus) {
      if (this[End.left].length > 0) {
        return [...this[End.left]];
      } else {
        return [...this[End.right]];
      }
    } else {
      return [];
    }
  }

  /**
   * Gets a list of all nodes connected to this node
   */
  get allConnectedNodes () {
    return this[End.left].concat(this[End.right]);
  }

  /**
   * Determines the direction of travel from the given node to this node
   * (i.e. what direction can be accessed if the given node was last visited)
   * @param node The connected node to search for
   */
  directionFromNode (node: GraphNode): End | null {
    if (this[End.left].find(n => n === node)) {
      return End.right;
    } else if (this[End.right].find(n => n === node)) {
      return End.left;
    } else {
      return null;
    }
  }

  /**
   * Adds a connection between two nodes at the given endpoint for each node.
   */
  static addConnection ([a, b]: Pair<ConnectionDescription>) {
    a.node[a.end].push(b.node);
    b.node[b.end].push(a.node);

    // clear cache of connections
    a.node.connectionsCache = null;
    b.node.connectionsCache = null;
  }

  /**
   * Removes a connection between two nodes at the given endpoint for each node.
   */
  static removeConnection ([a, b]: Pair<ConnectionDescription>) {
    a.node[a.end] = a.node[a.end].filter(node => node.id !== b.node.id);
    b.node[b.end] = b.node[b.end].filter(node => node.id !== a.node.id);

    // clear cache of connections
    a.node.connectionsCache = null;
    b.node.connectionsCache = null;
  }
}
