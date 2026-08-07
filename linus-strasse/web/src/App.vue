<script setup lang="ts">
import StreetView from './components/StreetView.vue'
</script>

<template>
  <StreetView />
</template>

<style>
/* Global reset — the street should fill the entire viewport with no browser margins */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Street background — change --street-bg to restyle the backdrop */
:root {
  --street-bg: #f2f0eb;
}

html, body {
  height: 100%;
  overflow: hidden; /* StreetView handles its own scroll */
  background-color: var(--street-bg);
}

#app {
  height: 100%;
}
</style>
