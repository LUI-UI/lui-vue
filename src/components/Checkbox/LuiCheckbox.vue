<script lang="ts">
export default {
  name: 'LuiCheckbox',
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Rounded, Size, State, Description, CheckableModelValue } from '@/globals/types'
import { toRefs, computed, useAttrs } from 'vue'
import { useCheckboxClasses } from './composables/index'
import { useGlobalDescriptionClasses } from '../../composables/index'
import { useGlobalCheckbox } from '../../composables/index'

type Indeterminate = false | true

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: 'md'
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
    validator(value: Rounded) {
      return [true, false, 'full'].includes(value)
    }
  },
  state: {
    type: [String, Boolean, null] as PropType<State>,
    default: null
  },
  description: {
    type: [String, null] as PropType<Description>,
    default: null
  },
  indeterminate: {
    type: Boolean as PropType<Indeterminate>,
    default: false
  },
  value: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: [Array, Boolean, undefined] as PropType<CheckableModelValue>,
    default: undefined
  }
  // indeterminate
})
const attrs = useAttrs()
const { inputClasses, spanClasses, iconClasses } = useCheckboxClasses(toRefs(props))
const { descriptionClasses } = useGlobalDescriptionClasses(toRefs(props), attrs)
const { handleVModel, isInputChecked } = useGlobalCheckbox(props, attrs)
const emit = defineEmits(['update:modelValue'])

function handleChange(e: any) {
  emit('update:modelValue', handleVModel(e))
}

const iconSize = computed(() =>
  // 12 - 16 - 20 - 24 - 28
  props.size === 'xs'
    ? {
        checkbox: '12',
        indeterminate: { width: '10', stroke: '1.5', viewBox: '0 0 10 2' }
      }
    : props.size === 'sm'
    ? {
        checkbox: '16',
        indeterminate: { width: '12', stroke: '1.75', viewBox: '0 0 12 2' }
      }
    : props.size === 'md'
    ? {
        checkbox: '20',
        indeterminate: { width: '16', stroke: '2', viewBox: '0 0 16 2' }
      }
    : props.size === 'lg'
    ? {
        checkbox: '24',
        indeterminate: { width: '18', stroke: '2', viewBox: '0 0 18 2' }
      }
    : {
        checkbox: '28',
        indeterminate: { width: '22', stroke: '2', viewBox: '0 0 22 2' }
      }
)
</script>
<template>
  <div class="inline-block leading-3">
    <div class="relative inline-flex">
      <input
        type="checkbox"
        :checked="isInputChecked"
        :value="value"
        @change="handleChange"
        :class="inputClasses"
        v-bind="$attrs"
      />
      <span :class="spanClasses"> </span>
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
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- <svg
        v-if="indeterminate"
        :width="iconSize.indeterminate.width"
        height="2"
        viewBox="0 0 16 2"
        :class="iconClasses"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.999977 1H15"
          stroke="white"
          :stroke-width="iconSize.indeterminate.stroke"
          stroke-linecap="round"
        />
      </svg> -->
      <svg
        v-if="indeterminate && size === 'xs'"
        width="10"
        height="2"
        viewBox="0 0 10 2"
        :class="iconClasses"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1H9" stroke="white" stroke-width="1.5" stroke-linecap="round" />
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
        <path d="M1 1H11" stroke="white" stroke-width="1.75" stroke-linecap="round" />
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
        <path d="M1 1H15" stroke="white" stroke-width="2" stroke-linecap="round" />
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
        <path d="M1 1H17" stroke="white" stroke-width="2" stroke-linecap="round" />
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
        <path d="M1 1H21" stroke="white" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>
    <p v-if="description !== null" :class="descriptionClasses">
      {{ description }}
    </p>
  </div>
</template>
