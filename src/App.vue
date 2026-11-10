<script setup lang="ts">
import { ref } from 'vue'
import AppBox from './components/AppBox.vue'
import AppCounter from './components/AppCounter.vue'
import AppModal from './components/AppModal.vue'
import TodoList from './components/TodoList.vue'

// Same AppModal as the delete dialog, different content, its own state.
const isAboutOpen = ref(false)
</script>

<template>
  <main>
    <header class="top">
      <h1>Vue exercises</h1>
      <button type="button" @click="isAboutOpen = true">About</button>
    </header>
    <div class="exercises">
      <!-- One frame, two different contents: the card style lives in AppBox only. -->
      <AppBox><AppCounter /></AppBox>
      <AppBox><TodoList /></AppBox>
    </div>

    <AppModal v-if="isAboutOpen" aria-labelledby="about-title" @close="isAboutOpen = false">
      <h2 id="about-title">About this app</h2>
      <p>My drills for the Vue module of the GET Academy frontend course, one exercise per day.</p>
      <p>Built with Vue 3, TypeScript and Vite.</p>
    </AppModal>
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

.top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

h2 {
  margin: 0;
  font-size: 1.25rem;
}

p {
  margin: 0;
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
