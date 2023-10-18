<script lang="ts">
export default {
  name: 'LuiModal',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { PropType } from 'vue'
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { useId } from '../../utils/useId'
import { useTeleportWrapper } from '../../composables'
import LuiButton from '../Button/LuiButton.vue'
import type { TwClassInterface } from '@/globals/interfaces'
import type { Size } from '@/globals/types'

const props = defineProps({
  show: {
    type: Boolean as PropType<Boolean>,
    default: false,
  },
  showIcon: {
    type: Boolean as PropType<Boolean>,
    default: true,
  },
  padding: {
    type: Boolean as PropType<Boolean>,
    default: true,
  },
  rounded: {
    type: Boolean as PropType<Boolean>,
    default: true,
  },
  fullScreen: {
    type: Boolean as PropType<Boolean>,
    default: false,
  },
  size: {
    type: String as PropType<Size>,
    default: 'sm',
  },
})
const emit = defineEmits(['close'])
const teleportId = useTeleportWrapper('modal')
const modalId = `lui-modal-${useId()}`
watch(
  () => props.show,
  (val) => {
    if (typeof window !== 'undefined') {
      const body = document.querySelector('body')
      const overflowValue = val ? 'hidden' : 'auto'
      if (body !== null)
        body.style.overflow = overflowValue
    }
  },
)
const computedDialogWrapperClasses = computed(() => {
  const classes: TwClassInterface = {
    position: 'fixed',
    inset: 'inset-0',
    backgroundColor: 'bg-secondary-900/40',
    display: 'flex',
    justifyItems: 'justify-center',
    padding: props.fullScreen ? '' : 'pt-56 md:p-4',
    overflow: 'overflow-auto',
  }
  return Object.values(classes)
})
const computedModalClasses = computed(() => {
  const classes: TwClassInterface = {
    position: 'relative',
    boxShadow: 'shadow-lg',
    borderRadius: props.rounded && !props.fullScreen ? 'md:rounded-xl' : '',
    padding: props.padding ? 'p-6' : '',
    width: 'w-full',
    maxWidth: props.fullScreen
      ? 'max-w-full'
      : {
          'md:max-w-sm': props.size === 'xs',
          'md:max-w-xl': props.size === 'sm',
          'md:max-w-2xl': props.size === 'md',
          'md:max-w-4xl': props.size === 'lg',
          'md:max-w-6xl': props.size === 'xl',
        },
    backgroundColor: 'bg-secondary-50 dark:bg-secondary-900',
    margin: 'mt-auto md:my-auto md:mx-auto',
  }
  return Object.values(classes)
})
</script>

<template>
  <Teleport :to="`#${teleportId}`">
    <UseFocusTrap v-if="show" :options="{ immediate: true }">
      <div class="lui-modal fixed inset-0 z-50 overflow-hidden">
        <div class="dialog-wrapper" :class="computedDialogWrapperClasses">
          <div
            :id="modalId"
            role="dialog"
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
    </UseFocusTrap>
  </Teleport>
</template>
