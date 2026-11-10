<script setup lang="ts">
import { ref } from 'vue'
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
        <TodoItem :task="task" @toggle="toggleTask" @remove="removeTask" />
      </li>
    </ul>

    <TodoStats :total="tasks.length" :done="tasks.filter((t) => t.done).length" />
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
</style>
