<script lang="ts">
export default {
  name: 'LuiOverlay',
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { PropType } from 'vue'
import type { Color, Size } from '@/globals/types'
import { computed } from 'vue'
import { TwClassInterface } from '@/globals/interfaces'
type OverlayStyleType = 'blur' | 'opacity'
const props = defineProps({
  show: {
    type: Boolean as PropType<Boolean>,
    default: false
  },
  wrapPage: {
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
  overlayStyle: {
    type: String as PropType<OverlayStyleType>,
    default: 'blur'
  }
})
const emit = defineEmits(['close'])

function triggerClose() {
  emit('close')
}
const computedOverlayClasses = computed(() => {
  const classes: TwClassInterface = {
    position: props.wrapPage ? 'fixed' : 'absolute',
    backgroundColor: {
      [`bg-${props.color}-900/30`]: props.opacity === 'xs',
      [`bg-${props.color}-900/40`]: props.opacity === 'sm',
      [`bg-${props.color}-900/50`]: props.opacity === 'md',
      [`bg-${props.color}-900/60`]: props.opacity === 'lg',
      [`bg-${props.color}-900/70`]: props.opacity === 'xl'
    },
    backdropBlur: {
      'backdrop-blur-sm': props.blur === 'xs',
      'backdrop-blur': props.blur === 'sm',
      'backdrop-blur-md': props.blur === 'md',
      'backdrop-blur-lg': props.blur === 'lg',
      'backdrop-blur-xl': props.blur === 'xl'
    }
  }
  return props.overlayStyle === 'blur'
    ? [classes.position, classes.backdropBlur]
    : [classes.position, classes.backgroundColor]
})
</script>
<template>
  <div
    class="overlay-wrapper"
    :class="wrapPage ? 'fixed z-50' : 'w-max relative'"
    @click="triggerClose"
    @keydown.esc="triggerClose"
  >
    <div v-if="show" class="overlay inset-0 w-full h-full" :class="computedOverlayClasses"></div>
    <div @click.stop class="slot-wrapper w-max"><slot /></div>
    <div
      v-if="show && !wrapPage"
      @click.stop
      class="slot-wrapper absolute m-auto w-max h-max inset-0 z-10"
    >
      <slot name="overlay" />
    </div>
  </div>
</template>
