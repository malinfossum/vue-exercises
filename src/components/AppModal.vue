<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

// No props and no open/closed state. The parent decides with v-if whether the
// modal exists at all; the modal shows its slot and says "close" when asked.
const emit = defineEmits<{ close: [] }>()

const dialog = useTemplateRef('dialog')
let opener: HTMLElement | null = null

onMounted(() => {
  // Remember the button that opened us, so focus can go back to it.
  opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
  // showModal() puts the dialog in the browser's top layer, makes the page
  // behind it inert (no clicks, no Tab), moves focus to the [autofocus]
  // element inside, and turns Esc into a `cancel` event.
  dialog.value?.showModal()
})

onBeforeUnmount(() => {
  dialog.value?.close()
  // The opener may be gone (a deleted task's button). Then the parent moves focus.
  if (opener?.isConnected) opener.focus()
})
</script>

<template>
  <!-- Esc fires `cancel`. .prevent stops the browser closing the dialog on its
       own: the parent owns the state, so the parent closes it via v-if. -->
  <dialog ref="dialog" class="modal" @cancel.prevent="emit('close')">
    <div class="content">
      <slot />
      <!-- autofocus: the safe button gets focus first, never "Yes, delete". -->
      <button type="button" autofocus @click="emit('close')">OK</button>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  width: min(32rem, 100% - 2rem);
  padding: 0;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.4);
}

/* The dark layer behind the dialog. The browser draws it; no overlay div. */
.modal::backdrop {
  background-color: rgb(0 0 0 / 0.6);
}

.content {
  display: grid;
  gap: 0.75rem;
  padding: 1.5rem;
}

.content > button {
  justify-self: start;
}
</style>
