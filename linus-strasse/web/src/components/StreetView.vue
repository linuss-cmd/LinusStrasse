<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { buildings } from '../config/buildings'
import { useHorizontalScroll } from '../composables/useHorizontalScroll'
import BuildingFacade from './BuildingFacade.vue'

const streetRef = ref<HTMLElement | null>(null)
useHorizontalScroll(streetRef)

// Scroll so that the 'contact' building (and the adjacent 'about' barber)
// are centered in the viewport on initial load.
const CENTER_BUILDING_ID = 'contact'

onMounted(async () => {
  // Wait for the DOM to settle so offsetLeft values are accurate.
  await nextTick()
  const container = streetRef.value
  if (!container) return

  const target = container.querySelector<HTMLElement>(`[data-building-id="${CENTER_BUILDING_ID}"]`)
  if (!target) return

  // Center the target building horizontally in the viewport.
  const targetCenter = target.offsetLeft + target.offsetWidth / 2
  const viewportCenter = container.clientWidth / 2
  container.scrollLeft = targetCenter - viewportCenter
})
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
      :data-building-id="building.id"
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
