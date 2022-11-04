import { VirtualClock } from '@/lib/math/VirtualClock';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameState = defineStore('GameState', () => {
  const clock = ref(new VirtualClock());

  return {
    clock,
  };
});
