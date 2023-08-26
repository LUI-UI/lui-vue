<script lang="ts">
export default {
  name: 'LuiInput',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, h, ref, toRefs, useAttrs, useSlots } from 'vue'
import type { PropType } from 'vue'
import { useGlobalDescriptionClasses } from '../../composables'
import { hasSlotContent } from '../../utils/hasSlotContent'
import type { Clear, ModelValue } from './input-types'
import { useInputClasses } from './composables'
import type { Block, Description, Rounded, Size, State, StateIcon } from '@/globals/types'

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
  stateIcon: {
    type: [Boolean] as PropType<StateIcon>,
    default: false,
  },
  block: {
    type: Boolean as PropType<Block>,
    default: false,
  },
  clear: {
    type: Boolean as PropType<Clear>,
    default: false,
  },
  description: {
    type: [String, null] as PropType<Description>,
    default: null,
  },
  modelValue: {
    type: [String, Number] as PropType<ModelValue>,
    default: undefined,
  },
})

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'input'])
const attrs = useAttrs()
const slots = useSlots()
// const LuiInputRef: Ref = ref(null);
const LuiInputRef = ref<HTMLInputElement>()

const {
  inputClasses,
  prependClasses,
  stateIconClasses,
  closeIconClasses,
  wrapperClasses,
  appendClasses,
} = useInputClasses(toRefs(props), attrs)
const { descriptionClasses } = useGlobalDescriptionClasses(toRefs(props), attrs)

function clearInput() {
  if (LuiInputRef.value?.value !== undefined)
    LuiInputRef.value.value = ''

  LuiInputRef.value?.focus()
}

const focus = () => LuiInputRef.value?.focus()

defineExpose({
  focus,
})

function handleInputEvents(event: any) {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
  emit('input', event)
}
const iconSizes = computed(() =>
  props.size === 'xs' ? '12' : props.size === 'sm' ? '16' : props.size === 'xl' ? '24' : '20',
)
// const isDisabled = computed(
//   () => attrs.disabled !== undefined && attrs.disabled === true
// );
interface StateIconPathType {
  warning: string
  feedback: string
  success: string
  disabled: string
}
const stateIconPaths: StateIconPathType = {
  // warning
  warning:
    'M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM11 13h2v2h-2v-2zm0-6h2v5h-2V7z',
  // feedback
  feedback:
    'M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM11 13h2v2h-2v-2zm0-6h2v5h-2V7z',
  // success
  success:
    'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z',
  disabled:
    'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm4.891-11.477l-8.368 8.368a6.04 6.04 0 0 1-1.414-1.414l8.368-8.368a6.04 6.04 0 0 1 1.414 1.414z',
}

function clearIconTemplate() {
  return h(
    'svg',
    {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      width: iconSizes.value,
      height: iconSizes.value,
    },
    [
      h('path', { fill: 'none', d: 'M0 0h24v24H0z' }),
      h('path', {
        d: 'M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z',
      }),
    ],
  )
}

function stateIconTemplate(params: any) {
  return h(
    'svg',
    {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      width: iconSizes.value,
      height: iconSizes.value,
    },
    [h('path', { fill: 'none', d: 'M0 0h24v24H0z' }), h('path', { d: params.path })],
  )
}
const computedAttrs = computed(() => {
  // if v-model using we have to control the value,that is why we remove value prop in attrs
  if (props.modelValue !== undefined && attrs.value) {
    const attributes = { ...attrs }
    delete attributes.value
    return attributes
  }
  return attrs
})
</script>

<template>
  <div class="lui-input" :class="wrapperClasses">
    <div class="relative" :class="block ? 'w-full' : ''">
      <input
        ref="LuiInputRef"
        :class="inputClasses"
        :value="modelValue === undefined ? '' : modelValue"
        v-bind="computedAttrs"
        @input="handleInputEvents($event)"
        @change="emit('change', $event)"
        @blur="emit('blur', $event)"
      >
      <span v-if="hasSlotContent(slots.prepend)" :class="prependClasses" class="leading-none">
        <slot name="prepend" />
      </span>
      <button v-if="clear && !attrs.disabled" :class="closeIconClasses" @click="clearInput">
        <clearIconTemplate />
      </button>
      <span v-else-if="!!slots.append" :class="appendClasses">
        <slot name="append" />
      </span>
      <span v-else-if="stateIcon && state !== null" :class="stateIconClasses">
        <stateIconTemplate
          :path="
            attrs?.disabled === true
              ? stateIconPaths.disabled
              : state === true
                ? stateIconPaths.success
                : state === false
                  ? stateIconPaths.warning
                  : stateIconPaths.feedback
          "
        />
      </span>
    </div>
    <p v-if="description !== null" :class="descriptionClasses">
      {{ description }}
    </p>
  </div>
</template>
