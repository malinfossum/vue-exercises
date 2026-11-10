<script setup lang="ts">
// Display only: props in, no emits.
defineProps<{ total: number; done: number }>()
</script>

<template>
  <p class="summary">
    <template v-if="total === 0">No tasks</template>
    <template v-else-if="total === 1">One task, {{ done }} done</template>
    <template v-else>{{ total }} tasks, {{ done }} done</template>
  </p>
</template>

<style scoped>
.summary {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.75;
}
</style>
