<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack(): void {
  router.push('/')
}
</script>

<template>
  <!-- Placeholder about page — content to be filled in by Linus -->
  <div class="about">
    <button class="about__back" @click="goBack" aria-label="Zurück zur Straße">
      ← Zurück
    </button>

    <main class="about__content">
      <h1>Über mich</h1>
      <p class="about__placeholder">Inhalt folgt.</p>
    </main>
  </div>
</template>

<style scoped>
.about {
  min-height: 100dvh;
  background-color: var(--street-bg, #f2f0eb);
  display: flex;
  flex-direction: column;
}

.about__back {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  background: none;
  border: 1px solid currentColor;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: inherit;
}

.about__back:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.about__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
  font-weight: normal;
  margin-bottom: 1.5rem;
  font-family: sans-serif;
}

.about__placeholder {
  color: #888;
  font-family: sans-serif;
}
</style>
