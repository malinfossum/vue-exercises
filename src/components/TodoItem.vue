<script setup lang="ts">
import type { Task } from '../types'

// Props down: the task is read-only here. Emits up: the parent decides what
// a toggle or a delete means. The <li> stays in TodoList, which owns the list.
defineProps<{ task: Task }>()
const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <label class="task">
    <input type="checkbox" :checked="task.done" @change="emit('toggle', task.id)" />
    <span :class="{ done: task.done }">{{ task.text }}</span>
  </label>
  <button type="button" :aria-label="`Delete ${task.text}`" @click="emit('remove', task.id)">
    Delete
  </button>
</template>

<style scoped>
.task {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 0.75rem;
  min-height: 44px;
  cursor: pointer;
}

.task input {
  width: 1.25rem;
  height: 1.25rem;
  margin: 0;
}

.done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
