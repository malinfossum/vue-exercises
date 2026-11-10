<script setup lang="ts">
// defineModel = a `modelValue` prop + an `update:modelValue` emit in one line,
// so the parent can write <TodoForm v-model="newTask" />.
const model = defineModel<string>({ default: '' })
const emit = defineEmits<{ add: [] }>()
</script>

<template>
  <form class="add" @submit.prevent="emit('add')">
    <label class="visually-hidden" for="new-task">New task</label>
    <input id="new-task" v-model.trim="model" placeholder="Write a task..." />
    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
.add {
  display: flex;
  gap: 0.5rem;
}

.add input {
  flex: 1;
  min-width: 0;
}
</style>
