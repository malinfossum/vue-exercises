<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}
</script>

<template>
  <div class="counter">
    <p class="readout" aria-live="polite">
      <span class="label">Count</span>
      <span class="value">{{ count }}</span>
    </p>
    <div class="actions">
      <button type="button" @click="increment">+1</button>
      <button type="button" @click="decrement">-1</button>
      <button type="button" @click="reset">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.counter {
  display: grid;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 0.5rem;
}

.readout {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin: 0;
}

.label {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.75;
}

.value {
  font-size: 2rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  min-width: 44px;
  min-height: 44px;
  padding: 0 1rem;
  border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
  border-radius: 0.375rem;
  font: inherit;
  cursor: pointer;
}
</style>
