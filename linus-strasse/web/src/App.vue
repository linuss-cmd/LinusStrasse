<script setup lang="ts">
import { ref, onMounted } from 'vue'

const message = ref('')
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('/api/hello')
    const data = await res.json()
    message.value = data.message
  } catch {
    error.value = 'Failed to reach API'
  }
})
</script>

<template>
  <div class="container">
    <h1 v-if="message">{{ message }}</h1>
    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: sans-serif;
}
.error {
  color: red;
}
</style>
