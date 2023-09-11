<script lang="ts">
export default {
  name: 'LuiPopover',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import LuiButton from '../Button/LuiButton.vue'
import { useOutsideClick } from '../../composables/useOutsideClick'
import { useProperPosition } from '../../composables/useProperPosition'
import { useId } from '../../utils/useId'
import type { TwClassInterface } from '@/globals/interfaces'
import type { Position } from '@/globals/types'

type TargetPositionType = 'bottom' | 'top'
interface TriggerSlotType {
  id: string
  type: string
  'data-button': boolean
  'aria-expanded': boolean
  'aria-controls': string
  click: () => void
}
const props = defineProps({
  dialogPosition: {
    type: String as PropType<Position>,
    default: 'bottomLeft',
  },
  text: {
    type: String as PropType<String>,
    default: '',
  },
  block: {
    type: Boolean as PropType<Boolean>,
    default: false,
  },
})
const positionClasses = {
  bottomLeft: {
    classes: 'top-full mt-1',
    oppositeClasses: 'bottom-full mb-1 left-0',
    direction: 'bottom',
  },
  topLeft: {
    classes: 'bottom-full mb-1 left-0',
    oppositeClasses: 'top-full mt-1',
    direction: 'top',
  },
  bottomRight: {
    classes: 'top-full mt-1 right-0',
    oppositeClasses: 'bottom-full mb-1 right-0',
    direction: 'bottom',
  },
  topRight: {
    classes: 'bottom-full mb-1 right-0',
    oppositeClasses: 'top-full mt-1 right-0',
    direction: 'top',
  },
  leftTop: {
    classes: 'top-0 mr-1 right-full',
    oppositeClasses: 'bottom-0 mr-1 right-full',
    direction: 'bottom',
  },
  rightTop: {
    classes: 'top-0 ml-1 left-full',
    oppositeClasses: 'bottom-0 ml-1 left-full',
    direction: 'bottom',
  },
  leftBottom: {
    classes: 'bottom-0 mr-1 right-full',
    oppositeClasses: 'top-0 mr-1 right-full',
    direction: 'top',
  },
  rightBottom: {
    classes: 'bottom-0 ml-1 left-full',
    oppositeClasses: 'top-0 ml-1 left-full',
    direction: 'top',
  },
  bottom: {
    classes: 'top-full mt-1 left-1/2 -translate-x-1/2',
    oppositeClasses: 'bottom-full mb-1 left-1/2 -translate-x-1/2',
    direction: 'bottom',
  },
  top: {
    classes: 'bottom-full mb-1 left-1/2 -translate-x-1/2',
    oppositeClasses: 'top-full mt-1 left-1/2 -translate-x-1/2',
    direction: 'bottom',
  },
  left: {
    classes: 'mr-1 right-full top-1/2 -translate-y-1/2',
    oppositeClasses: 'mr-1 right-full top-1/2 -translate-y-1/2',
    direction: 'bottom',
  },
  right: {
    classes: 'ml-1 left-full top-1/2 -translate-y-1/2',
    oppositeClasses: 'ml-1 left-full top-1/2 -translate-y-1/2',
    direction: 'bottom',
  },
}
const triggerId = `lui-popover-trigger-${useId()}`
const dialogId = `lui-popopver-dialog-${useId()}`
const triggerRef = ref<HTMLDivElement>()
const dialogWrapperRef = ref<HTMLDivElement>()
const dialogActive = ref(false)

useOutsideClick(triggerRef, () => closeDialog())
const { properPosition } = useProperPosition({
  triggerEl: triggerRef,
  MenuEl: dialogWrapperRef,
  targetPosition: setTargetPosition(),
})

const triggerSlotProps = computed<TriggerSlotType>(() => ({
  'id': triggerId,
  'type': 'button',
  'data-button': true,
  'aria-expanded': dialogActive.value,
  'aria-controls': dialogId,
  'block': props.block,
  'click': handleTriggerClick,
}))

const dialogWrapperClasses = computed(() => {
  const classes: TwClassInterface = {
    position: 'absolute',
    zIndex: 'z-50',
    width: props.block ? 'w-full' : 'w-max',
  }
  return Object.values({ ...classes })
})
const computedDialogPosition = computed(() => {
  return positionClasses[props.dialogPosition].direction === properPosition.value
    ? positionClasses[props.dialogPosition].classes
    : positionClasses[props.dialogPosition].oppositeClasses
})

function setTargetPosition(): TargetPositionType {
  const positionLowerCase = props.dialogPosition.toLowerCase()
  return positionLowerCase.includes('bottom') ? 'bottom' : 'top'
}

function handleTriggerClick() {
  // emin open event!
  dialogActive.value = !dialogActive.value
}
function closeDialog() {
  dialogActive.value = false
}
</script>

<template>
  <div class="relative" :class="!block ? 'w-max' : ''">
    <div ref="triggerRef">
      <slot name="trigger" v-bind="{ ...triggerSlotProps }">
        <LuiButton
          v-bind="{ ...triggerSlotProps }"
          @click="triggerSlotProps.click"
        >
          {{ text }}
        </LuiButton>
      </slot>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="dialogActive" :id="dialogId"
        ref="dialogWrapperRef"
        :aria-labelledby="triggerId"
        role="dialog"
        tabindex="-1"
        :class="[computedDialogPosition, dialogWrapperClasses]"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>
