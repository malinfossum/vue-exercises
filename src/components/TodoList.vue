<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import AppModal from './AppModal.vue'
import TodoForm from './TodoForm.vue'
import TodoItem from './TodoItem.vue'
import TodoStats from './TodoStats.vue'
import type { Task } from '../types'

// The parent owns the state. Children get props and send emits back.
const tasks = ref<Task[]>([
  { id: 1, text: 'Buy coffee', done: false },
  { id: 2, text: "Write Tuesday's code", done: true },
])
const newTask = ref('')
const filter = ref('')
let nextId = 3

function matches(task: Task) {
  return task.text.toLowerCase().includes(filter.value.toLowerCase())
}

function addTask() {
  const text = newTask.value.trim()
  if (!text) return

  tasks.value.push({ id: nextId++, text, done: false })
  newTask.value = ''
}

// Takes an id now, because that is what TodoItem emits.
function toggleTask(id: number) {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.done = !task.done
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

// One piece of state for the delete dialog: which task is waiting for a yes.
// null = closed. The open flag is derived from it, so the two can never disagree.
const deleteId = ref<number | null>(null)
const taskToDelete = computed(() => tasks.value.find((t) => t.id === deleteId.value))

function askDelete(id: number) {
  deleteId.value = id
}

function cancelDelete() {
  deleteId.value = null
}

async function confirmDelete() {
  if (deleteId.value !== null) removeTask(deleteId.value)
  deleteId.value = null
  // The Delete button that opened the modal is gone with its task, so focus
  // would fall back to <body>. Wait for Vue to update the DOM, then pick a spot.
  await nextTick()
  document.getElementById('new-task')?.focus()
}
</script>

<template>
  <section class="todo" aria-labelledby="todo-title">
    <h2 id="todo-title">Tasks</h2>

    <TodoForm v-model="newTask" @add="addTask" />

    <label class="visually-hidden" for="filter">Filter tasks</label>
    <input id="filter" v-model.trim="filter" type="search" placeholder="Filter..." />

    <p v-if="tasks.length === 0" class="empty">No tasks yet.</p>
    <p v-else-if="!tasks.some(matches)" class="empty">No tasks match "{{ filter }}".</p>
    <ul v-else class="list">
      <li v-for="task in tasks.filter(matches)" :key="task.id">
        <TodoItem :task="task" @toggle="toggleTask" @remove="askDelete" />
      </li>
    </ul>

    <TodoStats :total="tasks.length" :done="tasks.filter((t) => t.done).length" />

    <!-- v-if on the component: closed = not in the DOM at all.
         Loose nodes go to the default slot; <template #name> fills a named one. -->
    <AppModal v-if="taskToDelete" @close="cancelDelete">
      <template #title>Delete this task?</template>
      <p>"{{ taskToDelete.text }}" will be deleted for good.</p>
      <template #actions>
        <button type="button" autofocus @click="cancelDelete">Cancel</button>
        <button type="button" class="danger" @click="confirmDelete">Yes, delete</button>
      </template>
    </AppModal>
  </section>
</template>

<style scoped>
.todo {
  display: grid;
  gap: 0.75rem;
}

h2 {
  margin: 0;
  font-size: 1.25rem;
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

.empty {
  margin: 0;
}

/* Slot content is compiled here, so TodoList's scoped styles reach it,
   even though it renders inside AppModal. */
p {
  margin: 0;
}

.danger {
  border-color: #e5484d;
  background-color: #e5484d;
  color: white;
}
</style>
