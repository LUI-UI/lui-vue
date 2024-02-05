<script lang="ts">
export default {
  name: 'LuiPopover',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { PropType } from 'vue'
import {
  autoUpdate,
  flip,
  hide,
  offset,
  shift,
  useFloating,
} from '@floating-ui/vue'
import type { Placement } from '@floating-ui/vue'
import LuiButton from '../Button/LuiButton.vue'
import LuiPortal from '../Portal/LuiButton.vue'
import { useOutsideClick, useTeleport } from '../../composables'
import { useId } from '../../utils/useId'
import type { TwClassInterface } from '../../globals/interfaces'

interface TriggerSlotType {
  id: string
  type: string
  'data-button': boolean
  'aria-expanded': boolean
  'aria-controls': string
  click: () => void
}
const props = defineProps({
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-end',
  },
  text: {
    type: String as PropType<string>,
    default: '',
  },
  block: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  teleport: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  open: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})
const emit = defineEmits(['onTrigger', 'update:open'])
const dialogActive = ref(false)
const triggerRef = ref<HTMLElement | undefined>()
const dialogWrapperRef = ref<HTMLElement>()
const dialogId = `lui-popopver-dialog-${useId()}`
const triggerId = `lui-popover-trigger-${useId()}`
useTeleport('popover')

const { floatingStyles, middlewareData } = useFloating(
  triggerRef,
  dialogWrapperRef,
  {
    placement: props.placement,
    strategy: props.teleport ? 'fixed' : 'absolute',
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip(), shift(), hide()],
    transform: false,
  },
)

useOutsideClick(triggerRef, () => closeDialog())

watch(
  () => props.open,
  (val) => {
    if (val !== dialogActive.value) {
      dialogActive.value = val
      emit('onTrigger', val)
    }
  },
  { immediate: true },
)
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
    zIndex: 'z-50',
    width: props.teleport ? 'w-max' : props.block ? 'w-full' : 'w-max',
  }
  return Object.values({ ...classes })
})

function handleTriggerClick() {
  dialogActive.value = !dialogActive.value
  emit('onTrigger', dialogActive.value)
  emit('update:open', dialogActive.value)
}
function closeDialog() {
  if (dialogActive.value) {
    dialogActive.value = false
    emit('onTrigger', false)
    emit('update:open', false)
  }
}
const isDialogActive = computed(
  () => dialogActive.value && !middlewareData.value.hide?.referenceHidden,
)
</script>

<template>
  <div class="lui-popover relative" :class="!block ? 'w-max' : ''">
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
    <LuiPortal name="popover" :is-active="teleport">
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isDialogActive"
          :id="dialogId"
          ref="dialogWrapperRef"
          :aria-labelledby="triggerId"
          role="dialog"
          tabindex="-1"
          :class="dialogWrapperClasses"
          :style="floatingStyles"
        >
          <slot />
        </div>
      </transition>
    </LuiPortal>
  </div>
</template>
