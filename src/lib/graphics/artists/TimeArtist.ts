import { Artist } from '@/lib/graphics/artists/Artist';
import { GraphicsProxy } from '@/lib/graphics/GraphicsProxy';
import { VirtualClock } from '@/lib/math/VirtualClock';

export class TimeArtist extends Artist<[VirtualClock]> {
  composition = [VirtualClock] as const;

  draw ([clock]: [VirtualClock], graphics: GraphicsProxy) {
    const left = 0;
    const bottom = graphics.scale.height - 10;

    graphics.context.font = '48px sans-serif';
    graphics.context.fillStyle = '#000';

    // draw the current time of the clock on the frame
    graphics.context.fillText(clock.formattedTime, left, bottom);
  }
}
