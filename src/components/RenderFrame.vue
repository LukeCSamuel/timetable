<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { GameObject } from '@/lib/game/GameObject';
import { Scene } from '@/lib/game/Scene';
import { End, GraphNode } from '@/lib/graph/GraphNode';
import { getGraphics } from '@/lib/graphics';
import { ConnectionArtist } from '@/lib/graphics/artists/ConnectionArtist';
import { NodeArtist } from '@/lib/graphics/artists/NodeArtist';
import { TimeArtist } from '@/lib/graphics/artists/TimeArtist';
import { Vector2 } from '@/lib/math/Vector2';
import { useGameState } from '@/stores/GameState';
import { onMounted, ref } from 'vue';

const scene = new Scene();

const gameStateStore = useGameState();
const clockGameObject = GameObject.create([gameStateStore.clock]);
scene.gameObjects.push(clockGameObject);

const timeArtist = new TimeArtist(scene);


const nodeList: GraphNode[] = [];

function createNode (location: Vector2, connectLeft?: GraphNode) {
  const node = new GraphNode(location);
  nodeList.push(node);

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

const a = createNode(new Vector2(10, 10));
const b = createNode(new Vector2(10, 20), a);
const c = createNode(new Vector2(20, 30), b);
const d = createNode(new Vector2(15, 40), c);
const e = createNode(new Vector2(35, 30), c);
const f = createNode(new Vector2(40, 35), e);
const g = createNode(new Vector2(50, 45), f);
const h = createNode(new Vector2(60, 55), g);
const i = createNode(new Vector2(70, 45), h);
const j = createNode(new Vector2(75, 40), i);
const k = createNode(new Vector2(70, 65), h);

const nodeObjects = nodeList.map(node => GameObject.create([node]));
scene.gameObjects = scene.gameObjects.concat(nodeObjects);

const nodeArtist = new NodeArtist(scene);
const connectionArtist = new ConnectionArtist(scene);


const canvas = ref(null as unknown as HTMLCanvasElement);

onMounted(() => {
  const { renderer } = getGraphics(canvas.value);

  renderer.addLayer('connections', graphics => {
    connectionArtist.drawAll(graphics);
  });

  renderer.addLayer('nodes', graphics => {
    nodeArtist.drawAll(graphics);
  });

  renderer.addLayer('ui', graphics => {
    timeArtist.drawAll(graphics);
  });

  gameStateStore.clock.start();
  renderer.start();
});
</script>

<style lang="scss" scoped>
canvas {
  outline: 1px solid #f0f;
}
</style>
