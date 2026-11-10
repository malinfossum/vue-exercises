<!-- The box owns the frame. Whatever the parent writes between <AppBox> and
     </AppBox> lands in <slot />. No script needed: no props, no emits, no state. -->
<template>
  <div class="box"><slot /></div>
</template>

<style scoped>
.box {
  padding: 1rem;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 0.5rem;
}
</style>
