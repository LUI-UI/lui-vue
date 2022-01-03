<template>
  <div
    ref="LuiAccordionGroup"
    class="accordionGroup"
  >
    <slot />
  </div>
</template>

<script>
import { provide,ref } from 'vue'
export default {
  setup() {
    let activeTitle = ref(null)
    provide('activeAccordion', activeTitle)
  },
}
</script>
