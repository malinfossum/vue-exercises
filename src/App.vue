<script setup lang="ts">
import AppCounter from './components/AppCounter.vue'
</script>

<template>
  <main>
    <h1>Vue exercises</h1>
    <AppCounter />
  </main>
</template>

<style>
/* Global: not scoped, so it reaches the whole page. */
:root {
  color-scheme: dark light;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}
</style>

<style scoped>
main {
  max-width: 60rem;
  margin-inline: auto;
  padding: 1rem;
}
</style>
