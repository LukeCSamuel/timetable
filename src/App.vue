<template>
  <div class="app-container">
    <RenderFrame class="app-canvas" />
    <div class="app-controls">
      <div class="app-outlet">
        <router-view/>
      </div>
      <NavigationMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import RenderFrame from '@/components/RenderFrame.vue';
import NavigationMain from '@/components/NavigationMain.vue';
</script>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
}

:root, body, #app {
 width: 100vw;
 height: 100vh;
 margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  .app-canvas {
    width: 100vw;
    height: 100vw;
  }

  .app-controls {
    display: flex;
    flex-direction: column;
    width: 100vw;
    flex-grow: 1;
    max-height: calc(100vh - 100vw);

    .app-outlet {
      overflow-y: auto;
      flex-grow: 1;
    }
  }

  @media (max-aspect-ratio: 2/3) {
    .app-canvas {
      height: 125vw;
    }

    .app-controls {
      max-height: calc(100vh - 125vw);
    }
  }

  // change flex direction based on aspect ratio
  @media (min-aspect-ratio: 3/2) {
    flex-direction: row;
    height: 100vh;

    .app-canvas {
      min-width: 100vh;
      height: 100vh;
      flex-grow: 1;
    }

    .app-controls {
      min-width: 25vw;
      width: unset;
      max-height: 100vh;
    }
  }
}
</style>
