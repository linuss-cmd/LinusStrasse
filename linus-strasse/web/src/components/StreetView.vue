<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { buildings } from '../config/buildings'
import { useHorizontalScroll } from '../composables/useHorizontalScroll'
import BuildingFacade from './BuildingFacade.vue'

const streetRef = ref<HTMLElement | null>(null)
useHorizontalScroll(streetRef)

function scrollBy(px: number): void {
  streetRef.value?.scrollBy({ left: px, behavior: 'smooth' })
}

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
  <div class="street-wrapper">
    <!-- Left scroll arrow -->
    <button
      class="nav-arrow nav-arrow--left"
      aria-label="Nach links scrollen"
      @click="scrollBy(-400)"
    >&#8592;</button>

    <!-- The street: a horizontal flex row of facades -->
    <div ref="streetRef" class="street" role="main" aria-label="Linus' digitale Straße">
      <BuildingFacade
        v-for="building in buildings"
        :key="building.id"
        :building="building"
        :data-building-id="building.id"
      />
    </div>

    <!-- Right scroll arrow -->
    <button
      class="nav-arrow nav-arrow--right"
      aria-label="Nach rechts scrollen"
      @click="scrollBy(400)"
    >&#8594;</button>
  </div>
</template>

<style scoped>
.street-wrapper {
  position: relative;
  height: 100dvh;
  overflow: hidden;
}

.street {
  display: flex;
  align-items: flex-end;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
}

.street::-webkit-scrollbar {
  display: none;
}

/* Navigation arrows — transparent overlay, appear on hover */
.nav-arrow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 64px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0);
  transition: color 200ms ease, background 200ms ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-arrow--left { left: 0; }
.nav-arrow--right { right: 0; }

.nav-arrow:hover {
  color: rgba(255, 255, 255, 0.7);
  background: linear-gradient(to right, rgba(0,0,0,0.15), transparent);
}

.nav-arrow--right:hover {
  background: linear-gradient(to left, rgba(0,0,0,0.15), transparent);
}

.nav-arrow:focus-visible {
  outline: 2px solid white;
  outline-offset: -4px;
}
</style>
