<script lang="ts">
export default {
  name: 'LuiButton',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { toRefs, useSlots } from 'vue'
import type { PropType } from 'vue'
import { useButtonClasses } from './composables'
import type { ButtonTag } from './button-types'
import type { Block, Color, Filter, Rounded, Size, Variant } from '@/globals/types'
import type { TwClassInterface } from '@/globals/interfaces'

const props = defineProps({
  tag: {
    type: String as PropType<ButtonTag>,
    default: 'button',
  },
  variant: {
    type: String as PropType<Variant>,
    default: 'solid',
  },
  color: {
    type: String as PropType<Color>,
    default: 'primary',
  },
  filter: {
    type: String as PropType<Filter>,
    default: 'none',
  },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
  block: {
    type: Boolean as PropType<Block>,
    default: false,
  },
  // loading: {
  //   type: Boolean as PropType<Loading>,
  //   default: false,
  // },
  // loaderPosition: {
  //   type: String as PropType<loaderPosition>,
  //   default: "right",
  // },
})

const { buttonClasses, computedIconSize } = useButtonClasses(toRefs(props))
const slots = useSlots()
function dynamicSlotClasses() {
  // We move this classes from composable, because of slots reactivity issue
  // more details: https://github.com/LUI-UI/lui-vue/issues/33
  const hasAnyIcon = slots.prepend || slots.append || slots.icon
  const classes: TwClassInterface = {
    display: {
      'flex': hasAnyIcon,
      'inline-block': !hasAnyIcon && props.tag !== 'button',
      'inline-flex': hasAnyIcon,
    },
    alignItems: {
      'items-center': hasAnyIcon,
    },
    justifyContent: {
      'justify-center': hasAnyIcon,
    },
    space:
      !!slots.prepend || !!slots.append
        ? {
            'space-x-1': props.size === 'xs' || props.size === 'sm',
            'space-x-1.5': props.size === 'md',
            'space-x-2': props.size === 'lg' || props.size === 'xl',
          }
        : '',
  }
  return Object.values({ ...classes })
}
</script>

<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :class="[buttonClasses, dynamicSlotClasses()]"
    class="lui-button"
  >
    <span v-if="!!slots.icon" :class="computedIconSize" class="leading-none flex items-center">
      <slot name="icon" />
    </span>
    <template v-else>
      <span v-if="!!slots.prepend" :class="computedIconSize" class="leading-none flex items-center">
        <slot name="prepend" />
      </span>
      <span><slot /></span>
      <span v-if="!!slots.append" :class="computedIconSize" class="leading-none flex items-center">
        <slot name="append" />
      </span>
    </template>
  </component>
</template>
