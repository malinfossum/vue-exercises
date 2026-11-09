<script setup lang="ts">
import AppCounter from './components/AppCounter.vue'
import TodoList from './components/TodoList.vue'
</script>

<template>
  <main>
    <h1>Vue exercises</h1>
    <div class="exercises">
      <AppCounter />
      <TodoList />
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
