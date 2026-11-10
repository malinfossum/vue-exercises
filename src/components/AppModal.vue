<script setup lang="ts">
import { onBeforeUnmount, onMounted, useId, useTemplateRef } from 'vue'

// No props and no open/closed state. The parent decides with v-if whether the
// modal exists at all; the modal shows its slots and says "close" when asked.
const emit = defineEmits<{ close: [] }>()

const dialog = useTemplateRef('dialog')
// A unique id per modal, so the dialog can point at its own heading.
const titleId = useId()
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
       own: the parent owns the state, so the parent closes it via v-if.
       @click.self: a click on the backdrop lands on the <dialog> itself;
       a click on the content lands on something inside it. -->
  <dialog
    ref="dialog"
    class="modal"
    :aria-labelledby="$slots.title ? titleId : undefined"
    @cancel.prevent="emit('close')"
    @click.self="emit('close')"
  >
    <div class="content">
      <!-- The modal owns the heading element and its id; the parent only
           fills in the words. -->
      <h2 v-if="$slots.title" :id="titleId" class="title"><slot name="title" /></h2>
      <slot />
      <div class="actions">
        <!-- Fallback content: shown only when the parent sends no #actions. -->
        <slot name="actions">
          <button type="button" autofocus @click="emit('close')">OK</button>
        </slot>
      </div>
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

/* The padding sits here, not on <dialog>, so a click on the padding counts
   as "inside" and does not close the modal. */
.content {
  display: grid;
  gap: 0.75rem;
  padding: 1.5rem;
}

/* The modal styles the title area; the parent styles the body it sends in. */
.title {
  margin: 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid color-mix(in srgb, currentColor 20%, transparent);
  font-size: 1.25rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
