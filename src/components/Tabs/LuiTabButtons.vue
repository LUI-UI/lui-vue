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
  customStyle: {
    type: Boolean as PropType<Boolean>,
    default: false,
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
function tabListAfterClasses() {
  const classes: TwClassInterface = {
    backgroundColor: 'after:bg-secondary-300',
    width: 'after:w-full',
    height: 'after:h-0.5',
    position: 'after:absolute',
    zIndex: 'after:z-10',
    left: 'after:left-0',
    bottom: 'after:bottom-0',
    display: 'after:inline-block',
    borderRadius: 'after:rounded-full',
  }
  return Object.values(classes)
}
</script>

<template>
  <div
    role="tablist"
    aria-orientation="horizontal"
    class="lui-tab-buttons"
    :class="[tabListClasses, !customStyle ? tabListAfterClasses() : '']"
  >
    <slot />
  </div>
</template>
