<script lang="ts">
export default {
  name: 'LuiTag',
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { useTagClasses } from './composables'
import type { Filter, Color, Size, Rounded, Text, NarrowedVariant } from '@/globals/types'
import { computed, toRefs, useSlots } from 'vue'
import type { PropType } from 'vue'
import type { TwClassInterface } from '@/globals/interfaces'
import { useGlobalColorClasses } from '../../composables'

const props = defineProps({
  variant: {
    type: String as PropType<NarrowedVariant>,
    default: 'solid'
  },
  color: {
    type: String as PropType<Color>,
    default: 'primary'
  },
  filter: {
    type: String as PropType<Filter>,
    default: 'none'
  },
  size: {
    type: String as PropType<Size>,
    default: 'md'
  },
  text: {
    type: String as PropType<Text>,
    default: ''
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: true
  },
  showAppend: {
    type: Boolean,
    default: true
  }
})
const { tagClasses, computedIconSize } = useTagClasses(toRefs(props))
const { backgroundColorClasses, textColorClasses } = useGlobalColorClasses(toRefs(props))
const computedIconClasses = computed(() => {
  const iconClasses: TwClassInterface = {
    // display: 'flex',
    // justifyContent: 'justify-center',
    // alignItems: 'items-center',
    lineHeight: 'leading-3'
    // fontSize: {
    //   'text-xs': props.size === 'xs',
    //   'text-sm': props.size === 'sm',
    //   'text-base': props.size === 'md',
    //   'text-xl': props.size === 'lg',
    //   'text-2xl': props.size === 'xl'
    // }
  }
  return Object.values(iconClasses)
})
const computedTagClasses = computed(() => {
  const tagClasses: TwClassInterface = {
    display: 'flex',
    borderWidth: 'border',
    borderStyle: 'border-solid',
    borderRadius:
      props.rounded === 'full'
        ? 'rounded-full'
        : props.rounded === true
        ? {
            'rounded-sm': props.size === 'xs' || props.size === 'sm',
            rounded: props.size === 'md',
            'rounded-md': props.size === 'lg' || props.size === 'xl'
          }
        : '',
    alignItems: 'items-center',
    padding:
      props.text.length > 0
        ? {
            'px-0.5': props.size === 'xs',
            'px-1': props.size === 'sm',
            'px-1.5': props.size === 'md',
            'px-2': props.size === 'lg',
            'px-2.5': props.size === 'xl'
          }
        : null,
    fontSize: {
      'text-xs': props.size === 'xs' || props.size === 'sm',
      'text-sm': props.size === 'md',
      'text-base': props.size === 'lg' || props.size === 'xl'
    },
    backgroundColor: backgroundColorClasses.value,
    textColor: textColorClasses.value
    // borderColor: borderColorClasses.value
  }
  return Object.values(tagClasses)
})
const slots = useSlots()
const computedPaddingClasses = computed(() =>
  !slots.prepend && props.showAppend
    ? props.size === 'xs'
      ? 'pr-0.5'
      : props.size === 'sm'
      ? 'pr-1'
      : props.size === 'md'
      ? 'pr-1.5'
      : props.size === 'xl'
      ? 'pr-2'
      : 'pr-2.5'
    : !!slots.prepend && !props.showAppend
    ? props.size === 'xs'
      ? 'pl-0.5'
      : props.size === 'sm'
      ? 'pl-1'
      : props.size === 'md'
      ? 'pl-1.5'
      : props.size === 'xl'
      ? 'pl-2'
      : 'pl-2.5'
    : !!slots.prepend && props.showAppend
    ? props.size === 'xs'
      ? 'px-0.5'
      : props.size === 'sm'
      ? 'px-1'
      : props.size === 'md'
      ? 'px-1.5'
      : props.size === 'xl'
      ? 'px-2'
      : 'px-2.5'
    : null
)
const iconSize = computed(() =>
  props.size === 'xs'
    ? {
        tag: '12',
        indeterminate: { width: '10', stroke: '1.5', viewBox: '0 0 10 2' }
      }
    : props.size === 'sm'
    ? {
        tag: '12',
        indeterminate: { width: '12', stroke: '1.75', viewBox: '0 0 12 2' }
      }
    : props.size === 'md'
    ? {
        tag: '14',
        indeterminate: { width: '16', stroke: '2', viewBox: '0 0 16 2' }
      }
    : props.size === 'lg'
    ? {
        tag: '16',
        indeterminate: { width: '18', stroke: '2', viewBox: '0 0 18 2' }
      }
    : {
        tag: '16',
        indeterminate: { width: '22', stroke: '2', viewBox: '0 0 22 2' }
      }
)
console.log(tagClasses)
</script>

<template>
  <button v-bind="$attrs" class="lui-tag" :class="[...computedTagClasses, tagClasses]">
    <span v-if="!!slots.prepend" :class="computedIconSize" class="leading-none flex items-center">
      <slot name="prepend" />
    </span>
    <span :class="computedPaddingClasses" v-if="text.length > 0">{{ text }}</span>
    <div v-if="showAppend" :class="computedIconClasses">
      <slot name="append">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          :height="iconSize.tag"
          :width="iconSize.tag"
        >
          <path
            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
          ></path>
        </svg>
      </slot>
    </div>
  </button>
</template>
