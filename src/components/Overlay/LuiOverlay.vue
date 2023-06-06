<script lang="ts">
export default {
  name: 'LuiOverlay',
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  show: {
    type: Boolean as PropType<Boolean>,
    default: false
  },
  blur: {
    type: Boolean as PropType<Boolean>,
    default: false
  }
})
const emit = defineEmits(['close'])

function triggerClose() {
  emit('close')
}
</script>
<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-hidden" @click="triggerClose">
    <div
      class="fixed inset-0 overflow-auto flex flex-col"
      :class="blur ? 'backdrop-blur-sm' : 'bg-secondary-900/40'"
    >
      <div class="slot-wrapper w-max" @click.stop>
        <slot />
      </div>
    </div>
  </div>
</template>
