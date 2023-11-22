<script lang="ts">
export default {
  name: 'LuiSidebar',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { PropType } from 'vue'
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { useTeleportWrapper } from '../../composables'

// import useFocusTrap from '../../composables/useFocusTrap'
import LuiButton from '../Button/LuiButton.vue'
import type { TwClassInterface } from '@/globals/interfaces'
import type { Size } from '@/globals/types'

type IPosition = 'left' | 'right' | 'bottom' | 'top'
const props = defineProps({
  show: {
    type: Boolean as PropType<Boolean>,
    default: false,
  },
  showIcon: {
    type: Boolean as PropType<Boolean>,
    default: true,
  },
  size: {
    type: String as PropType<Size>,
    default: 'sm',
  },
  position: {
    type: String as PropType<IPosition>,
    default: 'right',
  },
  padding: {
    type: Boolean as PropType<Boolean>,
    default: true,
  },
})
const emit = defineEmits(['close'])
const teleportId = useTeleportWrapper('sidebar')
// const teleportId = `lui-sidebar-teleport-${useId()}`
// const { trapRef } = useFocusTrap()

// function createTeleportElement() {
//   const body = document.getElementsByTagName('body')
//   const teleportWrapper = document.createElement('div')
//   teleportWrapper.setAttribute('id', teleportId)
//   body[0].appendChild(teleportWrapper)
// }
// if (typeof window !== 'undefined')
//   createTeleportElement()

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
const positionClassesContainer = computed(() => {
  const classes: TwClassInterface = {
    alignItems: {
      'items-end': props.position === 'right' || props.position === 'bottom',
      'items-start': props.position === 'left' || props.position === 'top',
    },
    justifyContent: {
      'justify-end': props.position === 'right',
      'justify-start': props.position === 'left',
      'justify-center': props.position === 'bottom' || props.position === 'top',
    },
  }
  return Object.values(classes)
})
const positionClassesSidebar = computed(() => {
  const classes: TwClassInterface = {
    width: {
      'w-full': props.position === 'top' || props.position === 'bottom',
      'w-full md:w-[667px]': props.position === 'left' || props.position === 'right',
    },
    height: {
      'h-full': props.position === 'left' || props.position === 'right',
      'h-[667px]': props.position === 'top' || props.position === 'bottom',
    },
  }
  return Object.values(classes)
})
const animationClasses = computed(() =>
  props.position === 'right'
    ? {
        'enter-from-class': 'translate-x-full opacity-0',
        'leave-to-class': 'translate-x-full opacity-0',
        'enter-to-class': 'translate-x-0 opacity-100',
        'leave-from-class': 'translate-x-0 opacity-100',
      }
    : props.position === 'left'
      ? {
          'enter-from-class': '-translate-x-full opacity-0',
          'leave-to-class': '-translate-x-full opacity-0',
          'enter-to-class': 'translate-x-0 opacity-100',
          'leave-from-class': 'translate-x-0 opacity-100',
        }
      : props.position === 'top'
        ? {
            'enter-from-class': '-translate-y-full opacity-0',
            'leave-to-class': '-translate-y-full opacity-0',
            'enter-to-class': 'translate-y-0 opacity-100',
            'leave-from-class': 'translate-y-0 opacity-100',
          }
        : {
            'enter-from-class': 'translate-y-full opacity-0',
            'leave-to-class': 'translate-y-full opacity-0',
            'enter-to-class': 'translate-y-0 opacity-100',
            'leave-from-class': 'translate-y-0 opacity-100',
          },
)
</script>

<template>
  <Teleport :to="`#${teleportId}`">
    <transition
      enter-active-class="transition-all duration-200 ease-in"
      leave-active-class="transition-all duration-200 ease-out"
      v-bind="animationClasses"
    >
      <div
        v-if="show"
        class="lui-sidebar fixed inset-0 z-40 overflow-hidden bg-secondary-900/40"
        @click="emit('close')"
        @keydown.esc="emit('close')"
      >
        <UseFocusTrap v-if="show" :options="{ immediate: true }">
          <div class="fixed w-full top-0 bottom-0 max-h-full z-50 flex p-1.5" :class="positionClassesContainer">
            <section
              role="dialog"
              aria-modal="true"
              tabindex="-1"
              v-bind="$attrs"
              class="bg-white max-w-full max-h-full overflow-y-auto"
              :class="[positionClassesSidebar, padding ? 'p-6' : '']"
              @click.stop
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
            </section>
          </div>
        </UseFocusTrap>
      </div>
    </transition>
  </Teleport>
</template>
