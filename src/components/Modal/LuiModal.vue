<script lang="ts">
export default {
  name: 'LuiModal',
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { computed, watch } from 'vue'
import type { PropType } from 'vue'
import { useId } from '../../utils/useId'
import useFocusTrap from '../../composables/useFocusTrap'
import type { TwClassInterface } from '@/globals/interfaces'
import type { Size } from '@/globals/types'
import LuiButton from '../Button/LuiButton.vue'
const props = defineProps({
  show: {
    type: Boolean as PropType<Boolean>,
    default: false
  },
  showIcon: {
    type: Boolean as PropType<Boolean>,
    default: true
  },
  padding: {
    type: Boolean as PropType<Boolean>,
    default: true
  },
  size: {
    type: String as PropType<Size>,
    default: 'sm'
  }
})
const emit = defineEmits(['close'])
const teleportId = `lui-modal-teleport-${useId()}`
const modalId = `lui-modal-${useId()}`
const { trapRef } = useFocusTrap()

function createTeleportElement() {
  const body = document.getElementsByTagName('body')
  const teleportWrapper = document.createElement('div')
  teleportWrapper.setAttribute('id', teleportId)
  body[0].appendChild(teleportWrapper)
}
if (typeof window !== 'undefined') {
  createTeleportElement()
}
watch(
  () => props.show,
  (val) => {
    if (typeof window !== 'undefined') {
      const body = document.querySelector('body')
      const overflowValue = val ? 'hidden' : 'auto'
      if (body !== null) {
        body.style.overflow = overflowValue
      }
    }
  }
)
const computedModalClasses = computed(() => {
  const classes: TwClassInterface = {
    boxShadow: 'shadow-lg',
    borderRadius: 'md:rounded-xl',
    padding: props.padding ? 'p-6' : '',
    width: 'w-full',
    maxWidth: {
      'md:max-w-xs': props.size === 'xs',
      'md:max-w-sm': props.size === 'sm',
      'md:max-w-md': props.size === 'md',
      'md:max-w-lg': props.size === 'lg',
      'md:max-w-xl': props.size === 'xl'
    },
    backgroundColor: 'bg-secondary-50 dark:bg-secondary-900',
    margin: 'mt-auto md:my-auto md:mx-auto'
  }
  return Object.values(classes)
})
// const computedOverlayClasses = computed(() => {
//   const classes: TwClassInterface = {
//     position: 'relative',
//     inset: 'inset-0',
//     // width: 'w-full',
//     // height: 'min-h-screen',
//     // display: 'flex',
//     // justifyContent: "justify-center",
//     // backgroundColor: 'bg-primary-200',
//     // backgroundColor: 'bg-secondary-900/40',
//     zIndex: 'z-50'
//     // overflow: 'overflow-hidden'
//     // padding: 'p-8'
//   }
//   return Object.values(classes)
// })
// const computedDialogWrapper = computed(() => {
//   const classes: TwClassInterface = {
//     // width: 'w-full',
//     // height: 'min-h-screen',
//     position: 'fixed',
//     inset: 'inset-0',
//     backgroundColor: 'bg-secondary-900/40',
//     display: 'flex',
//     justifyContent: 'justify-center',
//     padding: 'p-8'
//     // overflow: 'overflow-y-auto'
//   }
//   return Object.values(classes)
// })
</script>
<template>
  <Teleport :to="`#${teleportId}`">
    <div v-if="show" ref="trapRef" class="fixed inset-0 z-50 overflow-hidden">
      <div
        class="dialog-wrapper fixed inset-0 bg-secondary-900/40 flex justify-center pt-56 md:p-4 overflow-auto"
      >
        <div
          role="dialog"
          :id="modalId"
          aria-labelledby="lui-modal"
          aria-modal="true"
          :class="computedModalClasses"
          v-bind="$attrs"
        >
          <div v-if="showIcon" class="float-right leading-3 ml-2">
            <LuiButton variant="link" color="secondary" rounded @click="emit('close')">
              <span class="sr-only">close modal</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z"
                  fill="currentColor"
                />
              </svg>
            </LuiButton>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
