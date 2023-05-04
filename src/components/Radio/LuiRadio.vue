<script lang="ts">
export default {
  name: 'LuiRadio',
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { toRefs, useAttrs } from 'vue'
import type { PropType } from 'vue'
import type { Size, State, Description } from '@/globals/types'

import { useRadioClasses } from './composables/index'
// import { useGlobalCheckbox } from "../../composables/index";
import { useGlobalDescriptionClasses } from '../../composables/index'

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: 'md'
  },
  // rounded: {
  //   type: [Boolean, String] as PropType<Rounded>,
  //   default: "full",
  // },
  state: {
    type: [String, Boolean, null] as PropType<State>,
    default: null
  },
  description: {
    type: [String, null] as PropType<Description>,
    default: null
  },
  value: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String as PropType<String>,
    default: ''
  }
})

const attrs = useAttrs()

const { inputClasses, spanClasses } = useRadioClasses(toRefs(props))
const { descriptionClasses } = useGlobalDescriptionClasses(toRefs(props), attrs)
// const { handleVModel, isInputChecked } = useGlobalCheckbox(props, attrs);

const emit = defineEmits(['update:modelValue'])
function handleChange(e: any) {
  emit('update:modelValue', props.value)
}
</script>

<template>
  <div class="inline-block leading-3">
    <div class="relative">
      <input
        type="radio"
        :class="inputClasses"
        :value="value"
        @change="handleChange"
        v-bind="$attrs"
      />
      <span :class="spanClasses" />
    </div>
    <p v-if="description" :class="descriptionClasses">{{ description }}</p>
  </div>
</template>
