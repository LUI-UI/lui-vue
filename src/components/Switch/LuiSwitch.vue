<script lang="ts">
export default {
  name: 'LuiSwitch',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, toRef, toRefs, useAttrs } from 'vue'
import type { PropType } from 'vue'
import { useGlobalDescriptionClasses } from '../../composables'
import { useSwitchClasses } from './composables/index'
import type { CheckableModelValue, Description, Rounded, Size, State } from '@/globals/types'

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: 'full',
  },
  state: {
    type: [String, Boolean, null] as PropType<State>,
    default: null,
  },
  description: {
    type: [String, null] as PropType<Description>,
    default: null,
  },
  modelValue: {
    type: [Array, Boolean, String, undefined] as PropType<CheckableModelValue>,
    default: undefined,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const attrs = useAttrs()
// const modelValueAsArray = toRef(props, 'modelValue')

const { inputClasses, spanClasses } = useSwitchClasses(toRefs(props))
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
</script>

<template>
  <div class="lui-switch inline-block leading-3">
    <div class="relative">
      <input
        type="checkbox"
        :checked="isInputChecked()"
        :class="inputClasses"
        v-bind="$attrs"
        @change="handleChange"
      >
      <span :class="spanClasses" />
    </div>
    <p v-if="description" :class="descriptionClasses">
      {{ description }}
    </p>
  </div>
</template>
