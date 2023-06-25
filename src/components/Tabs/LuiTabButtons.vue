<script lang="ts">
export default {
  name: 'LuiTabButtons',
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { AlignmentTypes } from './types'
import type { TwClassInterface } from '@/globals/interfaces'

const props = defineProps({
  alignTabs: {
    type: String as PropType<AlignmentTypes>,
    default: 'left',
  },
})
const tabListClasses = computed(() => {
  const classes: TwClassInterface = {
    display: 'flex',
    justifyItems: {
      'justify-start': props.alignTabs === 'left',
      'justify-center': props.alignTabs === 'center',
      'justify-end': props.alignTabs === 'right',
    },
    overflow: 'overflow-y-auto',
    position: 'relative ',
  }
  return Object.values(classes)
})
</script>

<template>
  <div
    role="tablist"
    aria-orientation="horizontal"
    :class="tabListClasses"
    class="after:bg-secondary-300 after:w-full after:h-0.5 after:absolute after:z-10 after:left-0 after:bottom-0 after:inline-block after:rounded-full"
  >
    <slot />
  </div>
</template>
