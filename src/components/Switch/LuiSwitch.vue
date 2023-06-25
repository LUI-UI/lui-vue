<script lang="ts">
export default {
  name: 'LuiSwitch',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { toRefs, useAttrs } from 'vue'
import type { PropType } from 'vue'
import { useGlobalCheckbox, useGlobalDescriptionClasses } from '../../composables/index'
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
  value: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [Array, Boolean, undefined] as PropType<CheckableModelValue>,
    default: undefined,
  },
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()

const { inputClasses, spanClasses } = useSwitchClasses(toRefs(props))
const { descriptionClasses } = useGlobalDescriptionClasses(toRefs(props), attrs)

const { handleVModel, isInputChecked } = useGlobalCheckbox(props, attrs)
function handleChange(e: any) {
  emit('update:modelValue', handleVModel(e))
}
</script>

<template>
  <div class="inline-block leading-3">
    <div class="relative">
      <input
        type="checkbox"
        :class="inputClasses"
        :checked="isInputChecked"
        :value="value"
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
