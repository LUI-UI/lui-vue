<script lang="ts">
export default {
  name: 'LuiRadio',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, toRefs, useAttrs } from 'vue'
import type { PropType } from 'vue'
import { useGlobalDescriptionClasses } from '../../composables'
import type { Description, Size, State } from '../../globals/types'
import { useRadioClasses } from './composables/index'

// import { useGlobalCheckbox } from "../../composables/index";

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: 'md',
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
    type: [String, Number, Boolean, null, undefined] as PropType<any>,
    required: false,
  },
  modelValue: {
    type: [String, Number, Array, null] as PropType<any>,
    required: false,
  },
})

// const { handleVModel, isInputChecked } = useGlobalCheckbox(props, attrs);

const emit = defineEmits(['update:modelValue', 'change'])

const attrs = useAttrs()

const { inputClasses, spanClasses } = useRadioClasses(toRefs(props))
const { descriptionClasses } = useGlobalDescriptionClasses(toRefs(props), attrs)
function handleChange(event: any) {
  emit('update:modelValue', props.value)
  emit('change', event)
}
const dynamicAttrs = computed(() => props.modelValue !== '' ? { checked: props.value === props.modelValue, ...attrs } : { ...attrs })
</script>

<template>
  <div class="lui-radio inline-block leading-3">
    <div class="relative">
      <input
        type="radio"
        :class="inputClasses"
        :value="value"
        v-bind="dynamicAttrs"
        @change="handleChange($event)"
      >
      <span :class="spanClasses" />
    </div>
    <p v-if="description" :class="descriptionClasses">
      {{ description }}
    </p>
  </div>
</template>
