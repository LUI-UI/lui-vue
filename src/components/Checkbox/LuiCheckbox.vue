<script lang="ts">
export default {
  name: 'LuiCheckbox',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, toRef, toRefs, useAttrs } from 'vue'
import { useGlobalDescriptionClasses } from '../../composables/index'
import { useCheckboxClasses } from './composables/index'
import type { CheckableModelValue, Description, Rounded, Size, State } from '@/globals/types'

type Indeterminate = false | true

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
    validator(value: Rounded) {
      return [true, false, 'full'].includes(value)
    },
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
    type: [Array, Boolean, String, undefined] as PropType<CheckableModelValue>,
    default: undefined,
  },
})
const emit = defineEmits(['update:modelValue', 'change'])
const attrs = useAttrs()
const { inputClasses, spanClasses, iconClasses } = useCheckboxClasses(toRefs(props))
const { descriptionClasses } = useGlobalDescriptionClasses(toRefs(props), attrs)
const modelValueAsArray = toRef(props, 'modelValue')
function handleChange(event: any) {
  emit('update:modelValue', handleVModel(event))
  emit('change', event)
}

const usageMethod = computed(() => {
  if (attrs['true-value'] !== undefined || attrs['false-value'] !== undefined)
    return 'customValue'
  if (Array.isArray(modelValueAsArray.value))
    return 'array'
  return 'boolean'
})

function handleVModel(event: Event) {
  const target = event.target as HTMLInputElement
  if (usageMethod.value === 'customValue')
    return target.checked ? attrs['true-value'] : attrs['false-value']

  if (usageMethod.value === 'boolean')
    return target.checked
  if (usageMethod.value === 'array' && Array.isArray(modelValueAsArray.value)) {
    if (target.checked) {
      modelValueAsArray.value.push(target.value)
    }
    else {
      const index = modelValueAsArray.value.indexOf(target.value)
      modelValueAsArray.value.splice(index, 1)
    }
  }
  return modelValueAsArray.value
}
function isInputChecked(): boolean {
  if (usageMethod.value === 'customValue')
    return props.modelValue === attrs['true-value']

  if (usageMethod.value === 'array' && Array.isArray(modelValueAsArray.value))
    return attrs && attrs.value ? modelValueAsArray.value.includes(attrs.value as string) : false

  if (usageMethod.value === 'boolean')
    return props.modelValue as boolean
  return attrs && attrs.checked ? (attrs.checked as boolean) : false
}

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
</script>

<template>
  <div class="inline-block leading-3">
    <div class="relative inline-flex">
      <input
        data-testid="lui-checkbox-input"
        type="checkbox"
        :checked="isInputChecked()"
        :class="inputClasses"
        v-bind="$attrs"
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
          class="stroke-white dark:stroke-secondary-800"
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
