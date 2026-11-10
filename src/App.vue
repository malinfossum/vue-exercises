<script setup lang="ts">
import AppBox from './components/AppBox.vue'
import AppCounter from './components/AppCounter.vue'
import TodoList from './components/TodoList.vue'
</script>

<template>
  <main>
    <h1>Vue exercises</h1>
    <div class="exercises">
      <!-- One frame, two different contents: the card style lives in AppBox only. -->
      <AppBox><AppCounter /></AppBox>
      <AppBox><TodoList /></AppBox>
    </div>
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

/* Base controls live here, not in each component: scoped CSS stops at a
   child component's root, so TodoForm and TodoItem would never see it. */
input:not([type='checkbox']),
button {
  min-width: 44px;
  min-height: 44px;
  padding: 0 0.75rem;
  border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
  border-radius: 0.375rem;
  font: inherit;
}

button {
  cursor: pointer;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>

<style scoped>
main {
  max-width: 90rem;
  margin-inline: auto;
  padding: 1rem;
}

/* One column on phones; a new column whenever there is room for 20rem more.
   auto-fill keeps empty tracks, so each exercise card stays card-sized. */
.exercises {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(20rem, 100%), 1fr));
  gap: 1rem;
  align-items: start;
}
</style>
