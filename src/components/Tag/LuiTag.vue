<script lang="ts">
export default {
  name: 'LuiTag',
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { toRefs, useSlots } from 'vue'
import type { PropType } from 'vue'
import { useGlobalColorClasses } from '../../composables'
import { useTagClasses } from './composables'
import type { Color, Filter, NarrowedVariant, Rounded, Size } from '@/globals/types'

const props = defineProps({
  variant: {
    type: String as PropType<NarrowedVariant>,
    default: 'solid'
  },
  color: {
    type: String as PropType<Color>,
    default: 'primary'
  },
  filter: {
    type: String as PropType<Filter>,
    default: 'none'
  },
  size: {
    type: String as PropType<Size>,
    default: 'md'
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: true
  },
  closeIcon: {
    type: Boolean,
    default: true
  }
})
const { computedTagClasses, computedIconSize, computedPrependSize } = useTagClasses(toRefs(props))
const { backgroundColorClasses, textColorClasses } = useGlobalColorClasses(toRefs(props))

const slots = useSlots()
</script>

<template>
  <button
    v-bind="$attrs"
    class="lui-tag"
    :class="[computedTagClasses, backgroundColorClasses, textColorClasses]"
  >
    <span
      v-if="!!slots.prepend"
      :class="computedPrependSize"
      class="leading-none flex items-center"
    >
      <slot name="prepend" />
    </span>
    <span><slot /></span>
    <span v-if="closeIcon" class="leading-none flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        :height="computedIconSize"
        :width="computedIconSize"
      >
        <path
          d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
        />
      </svg>
    </span>
  </button>
</template>
