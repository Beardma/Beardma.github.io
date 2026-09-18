<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Not found — Marshall Beard'
})
</script>

<template>
  <section>
    <h1>404</h1>
    <p>That page doesn't exist.</p>
    <RouterLink to="/">Back to the blog</RouterLink>
  </section>
</template>
