<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Building } from '../config/buildings'

const props = defineProps<{ building: Building }>()
const router = useRouter()

function handleClick(): void {
  const { action } = props.building
  if (action.type === 'external') {
    window.open(action.target, '_blank', 'noopener,noreferrer')
  } else if (action.type === 'internal') {
    router.push(action.target)
  }
  // 'overlay' has no click action yet
}
</script>

<template>
  <!-- Each building is a focusable, keyboard-accessible link wrapper.
       The image is the entire interactive surface — no overlays, no labels injected. -->
  <a
    class="building"
    :href="building.action.target"
    :target="building.action.type === 'external' ? '_blank' : undefined"
    :rel="building.action.type === 'external' ? 'noopener noreferrer' : undefined"
    :aria-label="building.alt"
    @click.prevent="handleClick"
  >
    <img
      :src="building.image"
      :alt="building.alt"
      :width="building.naturalWidth"
      :height="building.naturalHeight"
      :loading="'lazy'"
      draggable="false"
    />
  </a>
</template>

<style scoped>
.building {
  /* Shrink to image's natural aspect ratio, full container height */
  display: block;
  flex-shrink: 0;
  height: 100%;
  width: auto;
  cursor: pointer;
  /* Subtle focus ring — visible but not jarring */
  outline-offset: 2px;
}

.building:focus-visible {
  outline: 2px solid currentColor;
}

.building img {
  display: block;
  height: 100%;
  width: auto;
  /* Do not alter the artwork in any way */
  object-fit: fill;
  user-select: none;
  /* Subtle hover feedback — brightness + tiny scale */
  transition: filter 120ms ease, transform 120ms ease;
}

.building:hover img,
.building:focus-visible img {
  filter: brightness(0.92);
  transform: scale(1.01);
}
</style>
