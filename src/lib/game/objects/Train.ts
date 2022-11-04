import { GameObject } from '@/lib/game/objects/GameObject';
import { DirectionalPosition } from '@/lib/graph/DirectionalPosition';
import { GraphNode } from '@/lib/graph/GraphNode';
import { Route } from '@/lib/graph/Route';
import { Vector2 } from '@/lib/math/Vector2';
import { VirtualClock } from '@/lib/math/VirtualClock';
import { TrainStyleProvider } from '@/lib/styles/TrainStyleProvider';

export class Train extends GameObject<TrainStyleProvider | Route | DirectionalPosition> {
  // Distance traveled per tick
  speed = 0.5;
  private _distanceTraveled = 0;

  constructor (keyNodes: GraphNode[], private _clock: VirtualClock) {
    super();
    const position = new Vector2(keyNodes[0].location);
    this.setComposable(DirectionalPosition, new DirectionalPosition(position, new Vector2(0, 1)));

    const route = new Route(keyNodes);
    this.setComposable(Route, route);

    this.setComposable(TrainStyleProvider, new TrainStyleProvider(() => ({
      width: 1.1,
      length: 2,
      color: '#c00',
    })));
  }

  private _boundUpdatePosition = this._updatePosition.bind(this);
  private _updatePosition () {
    this._distanceTraveled += this.speed;
    const route = this.getComposable(Route);
    if (this._distanceTraveled > route.routeLength.total) {
      // reset train
      this._distanceTraveled = 0;
    }

    const nextPosition = route.positionOnRoute(this._distanceTraveled / route.routeLength.total);
    this.setComposable(DirectionalPosition, new DirectionalPosition(nextPosition.position, nextPosition.direction));
  }

  start () {
    this._clock.addTickListener(this._boundUpdatePosition);
  }

  stop () {
    this._clock.removeTickListener(this._boundUpdatePosition);
  }
}
