<script lang="ts">
export default {
  name: 'LuiPopover',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import type { PropType } from 'vue'
import { Teleport as TeleportComp, computed, ref, toRef, toRefs } from 'vue'
import LuiButton from '../Button/LuiButton.vue'
import { useMenuStyles, useOutsideClick, useTeleportWrapper } from '../../composables'
import { useId } from '../../utils/useId'
import type { TwClassInterface } from '@/globals/interfaces'
import type { Position } from '@/globals/types'

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
  teleport: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})
const emit = defineEmits(['onTrigger'])

const dialogActive = ref(false)
const triggerRef = ref<HTMLElement>()
const dialogWrapperRef = ref<HTMLElement>()
const dialogId = `lui-popopver-dialog-${useId()}`
const triggerId = `lui-popover-trigger-${useId()}`
const teleportId = useTeleportWrapper('popover')

useOutsideClick(triggerRef, () => closeDialog())
const { styles: menuStyles, menuPositionStyles } = useMenuStyles(
  {
    ...toRefs(props),
    menuPosition: toRef(props, 'dialogPosition'),
    triggerEl: triggerRef,
    menuEl: dialogWrapperRef,
  },
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
    position: props.teleport ? 'fixed' : 'absolute',
    zIndex: 'z-50',
    width: props.teleport ? 'w-max' : props.block ? 'w-full' : 'w-max',
  }
  return Object.values({ ...classes })
})

function handleTriggerClick() {
  // emin open event!
  dialogActive.value = !dialogActive.value
  emit('onTrigger', dialogActive.value)
}
function closeDialog() {
  if (dialogActive.value) {
    dialogActive.value = false
    emit('onTrigger', false)
  }
}
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
    <component
      :is="teleport ? TeleportComp : 'div'"
      v-bind="teleport ? { to: `#${teleportId}` } : undefined"
    >
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
          :class="[dialogWrapperClasses, !teleport ? menuPositionStyles : '']"
          :style="menuStyles"
        >
          <slot />
        </div>
      </transition>
    </component>
  </div>
</template>
