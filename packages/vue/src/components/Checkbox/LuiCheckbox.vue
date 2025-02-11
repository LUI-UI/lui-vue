<script lang="ts">
export default {
  name: 'LuiCheckbox',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, toRefs, useAttrs } from 'vue'
import { useGlobalDescriptionClasses } from '../../composables'
import type {
  CheckableModelValue,
  Color,
  Description,
  Rounded,
  Size,
  State,
  Value,
} from '../../globals/types'
import { useCheckboxClasses } from './composables/index'

type Indeterminate = false | true

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
  state: {
    type: [String, Boolean, null] as PropType<State>,
    default: null,
  },
  description: {
    type: [String, null] as PropType<Description>,
    default: null,
  },
  indeterminate: {
    type: Boolean as PropType<Indeterminate>,
    default: false,
  },
  modelValue: {
    type: [Array, Boolean, String] as PropType<CheckableModelValue>,
    required: false,
  },
  value: {
    type: [String, Number, Boolean, null, undefined] as PropType<Value>,
    required: false,
  },
  trueValue: {
    type: [String, Number, Boolean, null, undefined] as PropType<Value>,
    required: false,
  },
  falseValue: {
    type: [String, Number, Boolean, null, undefined] as PropType<Value>,
    required: false,
  },
  color: {
    type: String as PropType<Color>,
    default: 'primary',
  },
})
const emit = defineEmits(['update:modelValue', 'change'])
const attrs = useAttrs()
const { inputClasses, spanClasses, iconClasses } = useCheckboxClasses(
  toRefs(props),
)
const { descriptionClasses } = useGlobalDescriptionClasses(
  toRefs(props),
  attrs,
)

const iconSize = computed(() =>
  // 12 - 16 - 20 - 24 - 28
  props.size === 'xs'
    ? {
        checkbox: '12',
        indeterminate: { width: '10', stroke: '1.5', viewBox: '0 0 10 2' },
      }
    : props.size === 'sm'
      ? {
          checkbox: '16',
          indeterminate: { width: '12', stroke: '1.75', viewBox: '0 0 12 2' },
        }
      : props.size === 'md'
        ? {
            checkbox: '20',
            indeterminate: { width: '16', stroke: '2', viewBox: '0 0 16 2' },
          }
        : props.size === 'lg'
          ? {
              checkbox: '24',
              indeterminate: { width: '18', stroke: '2', viewBox: '0 0 18 2' },
            }
          : {
              checkbox: '28',
              indeterminate: { width: '22', stroke: '2', viewBox: '0 0 22 2' },
            },
)

function handleChange(event: any) {
  const target = event.target as HTMLInputElement
  const isChecked = target.checked
  if (props.modelValue && Array.isArray(props.modelValue) && props.value) {
    const newValue = [...props.modelValue]
    if (isChecked)
      newValue.push(props.value)
    else newValue.splice(newValue.indexOf(props.value), 1)

    handleEmits(newValue, event)
  }
  else if (props.trueValue && props.falseValue) {
    const currentValue = isChecked ? props.trueValue : props.falseValue
    handleEmits(currentValue, event)
  }
  else {
    handleEmits(isChecked, event)
  }
}
const isChecked = computed(() => {
  if (!props.modelValue)
    return attrs.checked as boolean
  if (Array.isArray(props.modelValue) && props.value)
    return props.modelValue.includes(props.value)
  else if (props.trueValue && props.falseValue)
    return props.modelValue === props.trueValue
  else return props.modelValue as boolean
})
function handleEmits(value: CheckableModelValue, event: any) {
  emit('change', event)
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="lui-checkbox inline-block leading-3 group">
    <div class="relative inline-flex">
      <input
        class="checkbox"
        type="checkbox"
        v-bind="$attrs"
        :class="inputClasses"
        :checked="isChecked"
        :value="value"
        @change="handleChange"
      >
      <span :class="spanClasses" />
      <svg
        v-if="!indeterminate"
        :class="iconClasses"
        :width="iconSize.checkbox"
        :height="iconSize.checkbox"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.64286 3.42857L4.63393 8.57143L2.35714 6.23376"
          class="stroke-white dark:stroke-secondary-300"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-if="indeterminate && size === 'xs'"
        width="10"
        height="2"
        viewBox="0 0 10 2"
        :class="iconClasses"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="stroke-white dark:stroke-secondary-800"
          d="M1 1H9"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      <svg
        v-if="indeterminate && size === 'sm'"
        width="12"
        height="2"
        viewBox="0 0 12 2"
        :class="iconClasses"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="stroke-white dark:stroke-secondary-800"
          d="M1 1H11"
          stroke-width="1.75"
          stroke-linecap="round"
        />
      </svg>
      <svg
        v-if="indeterminate && size === 'md'"
        width="16"
        height="2"
        viewBox="0 0 16 2"
        :class="iconClasses"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="stroke-white dark:stroke-secondary-800"
          d="M1 1H15"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      <svg
        v-if="indeterminate && size === 'lg'"
        width="18"
        height="2"
        viewBox="0 0 18 2"
        :class="iconClasses"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="stroke-white dark:stroke-secondary-800"
          d="M1 1H17"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      <svg
        v-if="indeterminate && size === 'xl'"
        width="22"
        height="2"
        viewBox="0 0 22 2"
        :class="iconClasses"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="stroke-white dark:stroke-secondary-800"
          d="M1 1H21"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>
    <p v-if="description !== null" :class="descriptionClasses">
      {{ description }}
    </p>
  </div>
</template>
