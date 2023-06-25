<script lang="ts">
export default {
  name: 'LuiOverlay',
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { Color, Size } from '@/globals/types'
import type { TwClassInterface } from '@/globals/interfaces'

const props = defineProps({
  show: {
    type: Boolean as PropType<Boolean>,
    default: false
  },
  fixed: {
    type: Boolean as PropType<Boolean>,
    default: false
  },
  color: {
    type: String as PropType<Color>,
    default: 'secondary'
  },
  opacity: {
    type: String as PropType<Size>,
    default: 'md'
  },
  blur: {
    type: String as PropType<Size>,
    default: 'xs'
  },
  rounded: {
    type: String as PropType<Size | 'none'>,
    default: 'none'
  },
  disableBlur: {
    type: Boolean as PropType<Boolean>,
    default: false
  },
  noCenter: {
    type: Boolean as PropType<Boolean>,
    default: false
  }
})
const emit = defineEmits(['close'])

function triggerClose() {
  emit('close')
}
const computedWrapperClasses = computed(() => {
  const classes: TwClassInterface = {
    position: props.fixed ? 'fixed' : 'relative',
    inset: props.fixed ? 'inset-0' : '',
    zIndex: props.fixed ? 'z-50' : '',
    overflow: props.fixed ? 'overflow-hidden' : '',
    width: props.fixed ? 'w-full' : 'w-max',
    height: props.fixed ? 'h-full' : 'h-max'
  }
  return Object.values({ ...classes })
})
const computedOverlayClasses = computed(() => {
  const classes: TwClassInterface = {
    position: props.fixed ? 'fixed' : 'absolute',
    inset: props.fixed ? 'inset-0' : '',
    overflow: props.fixed ? 'overflow-auto' : '',
    width: 'w-full',
    height: 'h-full',
    zIndex: 'z-50',
    display: 'flex',
    alignItems: 'items-center',
    justifyContent: 'justify-center',
    borderRadius: {
      'rounded-md': props.rounded === 'xs',
      'rounded-lg': props.rounded === 'sm',
      'rounded-xl': props.rounded === 'md',
      'rounded-2xl': props.rounded === 'lg',
      'rounded-3xl': props.rounded === 'xl',
      '': props.rounded === 'none'
    },
    backgroundColor: props.disableBlur
      ? {
          [`bg-${props.color}-900/30`]: props.opacity === 'xs',
          [`bg-${props.color}-900/40`]: props.opacity === 'sm',
          [`bg-${props.color}-900/50`]: props.opacity === 'md',
          [`bg-${props.color}-900/60`]: props.opacity === 'lg',
          [`bg-${props.color}-900/70`]: props.opacity === 'xl'
        }
      : '',
    backdropBlur: !props.disableBlur
      ? {
          'backdrop-blur-sm': props.blur === 'xs',
          'backdrop-blur': props.blur === 'sm',
          'backdrop-blur-md': props.blur === 'md',
          'backdrop-blur-lg': props.blur === 'lg',
          'backdrop-blur-xl': props.blur === 'xl'
        }
      : ''
  }
  return Object.values({ ...classes })
})
</script>

<template>
  <div
    v-if="fixed ? show : true"
    :class="computedWrapperClasses"
    @click="triggerClose"
    @keydown.esc="triggerClose"
  >
    <div v-if="!fixed && show" :class="computedOverlayClasses">
      <slot name="overlay" />
    </div>
    <div :class="fixed ? computedOverlayClasses : ''">
      <div @click.stop>
        <slot />
      </div>
    </div>
  </div>
</template>
