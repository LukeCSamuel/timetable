<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { GameObject } from '@/lib/game/objects/GameObject';
import { StationNode } from '@/lib/game/objects/StationNode';
import { TrackNode } from '@/lib/game/objects/TrackNode';
import { Train } from '@/lib/game/objects/Train';
import { Scene } from '@/lib/game/Scene';
import { End, GraphNode } from '@/lib/graph/GraphNode';
import { getGraphics } from '@/lib/graphics';
import { ConnectionArtist } from '@/lib/graphics/artists/ConnectionArtist';
import { NodeArtist } from '@/lib/graphics/artists/StationArtist';
import { TimeArtist } from '@/lib/graphics/artists/TimeArtist';
import { TrainArtist } from '@/lib/graphics/artists/TrainArtist';
import { Vector2 } from '@/lib/math/Vector2';
import { VirtualClock } from '@/lib/math/VirtualClock';
import { useGameState } from '@/stores/GameState';
import { onMounted, ref } from 'vue';

const scene = new Scene();

const gameStateStore = useGameState();
const clockGameObject = GameObject.create([gameStateStore.clock]);
scene.gameObjects.push(clockGameObject);

const timeArtist = new TimeArtist(scene);


const nodeList: GraphNode[] = [];

function createTrack (location: Vector2, connectLeft?: GraphNode | undefined, station = false) {
  const track = new TrackNode(location);
  const node = track.getComposable(GraphNode);
  nodeList.push(node);
  scene.gameObjects.push(track);

  if (station) {
    scene.gameObjects.push(new StationNode(track));
  }

  if (connectLeft) {
    GraphNode.addConnection([
      {
        node: connectLeft,
        end: End.right,
      },
      {
        node,
        end: End.left,
      },
    ]);
  }
  return node;
}

const a = createTrack(new Vector2(10, 10), undefined, true);
const b = createTrack(new Vector2(10, 20), a);
const c = createTrack(new Vector2(20, 30), b);
const d = createTrack(new Vector2(15, 40), c, true);
const e = createTrack(new Vector2(35, 30), c);
const f = createTrack(new Vector2(40, 35), e, true);
const g = createTrack(new Vector2(50, 45), f);
const h = createTrack(new Vector2(60, 55), g);
const i = createTrack(new Vector2(70, 45), h);
const j = createTrack(new Vector2(75, 40), i, true);
const k = createTrack(new Vector2(70, 65), h, true);

const nodeArtist = new NodeArtist(scene);
const connectionArtist = new ConnectionArtist(scene);

const train = new Train([a, f, j, f, a], gameStateStore.clock as VirtualClock);
scene.gameObjects.push(train);
const trainArtist = new TrainArtist(scene);

const canvas = ref(null as unknown as HTMLCanvasElement);

onMounted(() => {
  const { renderer } = getGraphics(canvas.value);

  renderer.addLayer('connections', graphics => {
    connectionArtist.drawAll(graphics);
  });

  renderer.addLayer('nodes', graphics => {
    nodeArtist.drawAll(graphics);
  });

  renderer.addLayer('trains', graphics => {
    trainArtist.drawAll(graphics);
  });

  renderer.addLayer('ui', graphics => {
    timeArtist.drawAll(graphics);
  });

  gameStateStore.clock.start();
  renderer.start();
  train.start();
});
</script>

<style lang="scss" scoped>
canvas {
  outline: 1px solid #f0f;
}
</style>
