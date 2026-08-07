<script setup lang="ts">
import { ref } from 'vue'
import { buildings } from '../config/buildings'
import { useHorizontalScroll } from '../composables/useHorizontalScroll'
import BuildingFacade from './BuildingFacade.vue'

const streetRef = ref<HTMLElement | null>(null)
useHorizontalScroll(streetRef)
</script>

<template>
  <!-- The street: a horizontal flex row of facades.
       align-items: flex-end puts all buildings on a shared baseline.
       overflow-x handles the scroll; wheel is redirected to horizontal via useHorizontalScroll. -->
  <div ref="streetRef" class="street" role="main" aria-label="Linus' digitale Straße">
    <BuildingFacade
      v-for="building in buildings"
      :key="building.id"
      :building="building"
    />
  </div>
</template>

<style scoped>
.street {
  display: flex;
  align-items: flex-end;   /* shared baseline — all facades touch the same ground line */
  height: 100dvh;
  overflow-x: scroll;
  overflow-y: hidden;
  /* Hide scrollbar visually — scroll still works */
  scrollbar-width: none;
}

.street::-webkit-scrollbar {
  display: none;
}
</style>
