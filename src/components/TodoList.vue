<script setup lang="ts">
import { ref } from 'vue'

type Task = {
  id: number
  text: string
  done: boolean
}

const tasks = ref<Task[]>([
  { id: 1, text: 'Buy coffee', done: false },
  { id: 2, text: "Write Tuesday's code", done: true },
])
const newTask = ref('')
let nextId = 3

function addTask() {
  const text = newTask.value.trim()
  if (!text) return

  tasks.value.push({ id: nextId++, text, done: false })
  newTask.value = ''
}

function toggleTask(task: Task) {
  task.done = !task.done
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <section class="todo" aria-labelledby="todo-title">
    <h2 id="todo-title">Tasks</h2>

    <form class="add" @submit.prevent="addTask">
      <label class="visually-hidden" for="new-task">New task</label>
      <input id="new-task" v-model.trim="newTask" placeholder="Write a task..." />
      <button type="submit">Add</button>
    </form>

    <p v-if="tasks.length === 0" class="empty">No tasks yet.</p>
    <ul v-else class="list">
      <li v-for="task in tasks" :key="task.id" :class="{ done: task.done }">
        <label class="task">
          <input type="checkbox" :checked="task.done" @change="toggleTask(task)" />
          <span>{{ task.text }}</span>
        </label>
        <button type="button" :aria-label="`Delete ${task.text}`" @click="removeTask(task.id)">
          Delete
        </button>
      </li>
    </ul>

    <p class="summary">
      {{ tasks.length }} tasks, {{ tasks.filter((t) => t.done).length }} done
    </p>
  </section>
</template>

<style scoped>
.todo {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 0.5rem;
}

h2 {
  margin: 0;
  font-size: 1.25rem;
}

.add {
  display: flex;
  gap: 0.5rem;
}

.add input {
  flex: 1;
  min-width: 0;
}

input:not([type='checkbox']),
button {
  min-height: 44px;
  padding: 0 0.75rem;
  border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
  border-radius: 0.375rem;
  font: inherit;
}

button {
  cursor: pointer;
}

.list {
  display: grid;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

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

.done span {
  text-decoration: line-through;
  opacity: 0.6;
}

.empty,
.summary {
  margin: 0;
}

.summary {
  font-size: 0.875rem;
  opacity: 0.75;
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
