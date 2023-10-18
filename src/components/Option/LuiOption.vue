<script lang="ts">
import { computed, inject, nextTick, ref, useSlots, watch } from 'vue'
import type { PropType } from 'vue'
import { ContextKey } from '../Select/symbols'
import { useId } from '../../utils/useId'
import type { Rounded, Size } from '@/globals/types'
import type { TwClassInterface } from '@/globals/interfaces'

export default {
  name: 'LuiOption',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
  value: {
    type: [String, Number],
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
})

// const { selectedOption, updateSelectedOption, focusButton } =
//   inject(ContextKey);
const context = inject(ContextKey)
const slots = useSlots()
const optionId = `lui-option-${useId()}`
const optionRef = ref(null)
const isKeyboardHovered = computed(() => optionId === context?.currentId.value)
nextTick(() => {
  // if v-model does not used so we set the initial selectedValue
  if (context?.selectedOption.value === undefined && props.selected && !props.disabled) {
    context?.updateSelectedOption({
      value: props.value,
      text: props.text,
      selected: props.selected,
    })
  }
})

watch(
  () => props.selected,
  (value) => {
    context?.updateSelectedOption({
      value: props.value,
      text: props.text,
      selected: value,
    })
  },
)

function handleOptionClick(e: any) {
  e.preventDefault()
  const isSelectMultiple = Array.isArray(context?.selectedOption.value)
  if (isSelectMultiple)
    e.stopPropagation()
  context?.updateSelectedOption({
    value: props.value,
    text: props.text,
    selected: props.selected,
  })
  nextTick(() => context?.focusButton())
}
function anySelectedOption() {
  if (Array.isArray(context?.selectedOption.value))
    return context?.selectedOption.value.length !== 0
  return context?.selectedOption.value.text !== ''
}
function isSelectedsIncludesOption() {
  if (!Array.isArray(context?.selectedOption.value))
    return false
  return context?.selectedOption.value.includes(props.text) || context?.selectedOption.value.includes(props.value as string)
}
const isSelected = computed(() => {
  if (!anySelectedOption())
    return props.selected
  return Array.isArray(context?.selectedOption.value)
    ? isSelectedsIncludesOption()
    : context?.selectedOption.value.text === props.text
})
const optionClasses = computed(() => {
  // hover:bg-${props.color}-600/20
  const classes: TwClassInterface = {
    // backgroundColor: props.disabled
    //   ? ''
    //   : isSelected.value
    //     ? isKeyboardHovered.value
    //       ? 'bg-danger-500'
    //       : 'hover:bg-primary-500/20 focus-visible:bg-primary-500/20'
    //     : '',
    // default: '', hover
    // selected: '', hover
    // keybpardHover: selected ? '' : ''

    backgroundColor: props.disabled
      ? ''
      : {
          'hover:bg-primary-500/20': !isSelected.value,
          'bg-primary-500 hover:bg-primary-500/80 focus-visible:bg-primary-500/80': isSelected.value && !isKeyboardHovered.value,
          'bg-primary-500/20': isKeyboardHovered.value && !isSelected.value,
          'bg-primary-500/80': isKeyboardHovered.value && isSelected.value,
        },
    padding: {
      'py-1 px-1.5': props.size === 'xs',
      'py-1.5 px-2': props.size === 'sm',
      'py-2 px-2.5': props.size === 'md',
      'py-2.5 px-2.5': props.size === 'lg',
      'py-3.5 px-3': props.size === 'xl',
    },
    fontSize: {
      'text-xs': props.size === 'xs',
      'text-sm': props.size === 'sm',
      'text-base': props.size === 'md',
      'text-lg': props.size === 'lg',
      'text-xl': props.size === 'xl',
    },
    textColor: props.disabled
      ? 'text-secondary-300 dark:text-secondary-700'
      : {
          'text-secondary-600 dark:text-secondary-300 hover:text-primary-500 focus-visible:text-primary-500': !isKeyboardHovered.value && !isSelected.value, // default state
          'text-white': isSelected.value, // selected
          'text-primary-500': isKeyboardHovered.value && !isSelected.value, // keyboard-hovered && not-selected
        },
    outlineWidth: 'outline-none',
    borderRadius: {
      'rounded-md': props.rounded === true,
      'rounded-2xl': props.rounded === 'full',
    },
    display: slots.prepend || slots.append ? 'flex' : '',
    alignItems: slots.prepend || slots.append ? 'items-center' : '',
    cursor: props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    pointerEvents: props.disabled ? 'pointer-events-none' : '',
  }
  return Object.values({ ...classes })
})
defineExpose({
  el: optionRef,
})
</script>

<template>
  <li
    v-bind="$attrs"
    :id="optionId"
    ref="optionRef"
    role="option"
    tabindex="-1"
    :aria-selected="isSelected"
    class="lui-option"
    :class="optionClasses"
    @click="handleOptionClick"
  >
    <span v-if="$slots.prepend"> <slot name="prepend" /> </span>
    <span :class="$slots.prepend ? 'ml-1' : ''"> {{ text }} </span>
    <span v-if="$slots.append" class="ml-auto">
      <slot name="append" />
    </span>
  </li>
</template>
