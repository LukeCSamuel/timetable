import { aStar } from '@/lib/graph/AStar';
import { End, GraphNode } from '@/lib/graph/GraphNode';
import { Vector2 } from '@/lib/math/Vector2';
import { Bezier } from 'bezier-js';

export interface RouteLength {
  total: number
  steps: {
    curve: Bezier
    length: number
  }[]
}

export class Route {
  private _allNodes: GraphNode[] = []
  private _routeLength: RouteLength = {
    total: 0,
    steps: [],
  }
  private _isValid = true;

  constructor (private _keyNodes: GraphNode[] = []) {
    this.computeRoute();
  }

  addNode (node: GraphNode) {
    this._keyNodes.push(node);
    this.computeRoute();
  }

  removeNode (node: GraphNode) {
    this._keyNodes = this._keyNodes.filter(n => n !== node);
    this.computeRoute();
  }

  private computeRoute () {
    // search the graph for the shortest possible route
    let route: GraphNode[] = [];
    let isValid = true;
    for (let i = 0; i < this._keyNodes.length - 1; i++) {
      const start = this._keyNodes[i];
      let direction: End | undefined = undefined;
      if (!this._keyNodes[i].isTerminus && route[route.length - 1]) {
        // start from previous node to preserve direction (how does that work???)
        direction = start.directionFromNode(route[route.length - 1]) ?? undefined;
      }
      const end = this._keyNodes[i + 1];

      const aStarResult = aStar(start, end, direction);
      if (!aStarResult) {
        isValid = false;
      } else {
        route = route.concat(aStarResult);
      }
    }

    this._isValid = isValid;
    this._allNodes = route;

    // compute the length of the route
    if (!this._isValid) {
      this._routeLength = {
        total: 0,
        steps: [],
      };
    } else {
      let total = 0;
      const steps: RouteLength['steps'] = [];
      for (let i = 0; i < this._allNodes.length; i++) {
        let start: Vector2, mid: Vector2, end: Vector2;
        if (i === 0) {
          start = this._allNodes[i].location;
          end = this._allNodes[i + 1].location;

          end = start.mid(end);
          mid = start.mid(end);
        } else if (i === this._allNodes.length - 1) {
          start = this._allNodes[i - 1].location;
          end = this._allNodes[i].location;

          start = start.mid(end);
          mid = start.mid(end);
        } else {
          start = this._allNodes[i - 1].location;
          mid = this._allNodes[i].location;
          end = this._allNodes[i + 1].location;

          start = start.mid(mid);
          end = end.mid(mid);
        }
        const curve = new Bezier(start, mid, end);
        const length = curve.length();
        steps.push({
          curve,
          length,
        });
        total += length;
      }
      this._routeLength = {
        total,
        steps,
      };
    }
  }

  get isValid (): boolean {
    return this._isValid;
  }

  get allNodes (): GraphNode[] {
    return this._allNodes;
  }

  get routeLength (): RouteLength {
    return this._routeLength;
  }


  /**
   * Compute the position on the route given the completion percentage
   * @param percentComplete The percent of the route that is complete
   */
  positionOnRoute (percentComplete: number): { direction: Vector2, position: Vector2 } {
    // TODO: curve.get(t) gets parametric position, we should split the curve, measure distance,
    //       then continue to split the sub-curve to get closer to real positional distance
    if (isNaN(percentComplete)) {
      percentComplete = 0;
    }

    let traveled = percentComplete * this.routeLength.total;
    for (const step of this.routeLength.steps) {
      if (traveled > step.length) {
        traveled -= step.length;
      } else {
        // position is on this curve
        const t = traveled / step.length;
        const position = new Vector2(step.curve.get(t));
        const direction = new Vector2(step.curve.derivative(t)).unit();
        return {
          position,
          direction,
        };
      }
    }

    throw new Error('this should never happen lol');
  }
}
