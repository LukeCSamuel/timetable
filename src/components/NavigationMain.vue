<template>
  <nav>
    <button class="speed" @click="toggleSpeed">{{ speed }}</button>
    <div class="spacer"></div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>
</template>

<script setup lang="ts">
import { useGameState } from '@/stores/GameState';
import { computed } from 'vue';

const gameStateStore = useGameState();

const speedMap = {
  [4]: '⯈',
  [16]: '⯈⯈',
  [64]: '⯈⯈⯈',
  [256]: '⯈⯈⯈⯈',
};

const speed = computed(() => {
  return speedMap[gameStateStore.clock.tickRate as keyof typeof speedMap];
});

function toggleSpeed () {
  switch (gameStateStore.clock.tickRate) {
    case 4:
      gameStateStore.clock.tickRate = 16;
      break;
    case 16:
      gameStateStore.clock.tickRate = 64;
      break;
    case 64:
      gameStateStore.clock.tickRate = 256;
      break;
    case 256:
    default:
      gameStateStore.clock.tickRate = 4;
      break;
  }
}
</script>

<style lang="scss">
nav {
  display: flex;
  width: 100%;

  .speed {
    font-family: monospace;
    width: 75px;
    text-align: center;
  }

  .spacer {
    flex-grow: 1;
  }

  a {
    display: block;
    padding: 8px 12px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
