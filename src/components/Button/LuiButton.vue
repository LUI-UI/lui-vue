<script lang="ts">
export default {
  name: 'LuiButton',
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { toRefs, useSlots } from 'vue'
import { useButtonClasses } from './composables'
import type { PropType } from 'vue'
import type { Tag } from './button-types'
import type { Variant, Filter, Rounded, Block, Color, Size } from '@/globals/types'

const props = defineProps({
  tag: {
    type: String as PropType<Tag>,
    default: 'button'
  },
  variant: {
    type: String as PropType<Variant>,
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
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false
  },
  block: {
    type: Boolean as PropType<Block>,
    default: false
  }
  // prepend: {
  //   type: [String, Object] as PropType<Icon>,
  //   default: "none",
  // },
  // append: {
  //   type: [String, Object] as PropType<Icon>,
  //   default: "none",
  // },
  // icon: {
  //   type: [String, Object] as PropType<Icon>,
  //   default: "none",
  // },
  // loading: {
  //   type: Boolean as PropType<Loading>,
  //   default: false,
  // },
  // loaderPosition: {
  //   type: String as PropType<loaderPosition>,
  //   default: "right",
  // },
})

const { buttonClasses, computedIconSize } = useButtonClasses(toRefs(props))
const slots = useSlots()
// console.log(slots?.default().props.size = "lg");
</script>

<template>
  <component :is="tag" v-bind="$attrs" :class="buttonClasses" class="lui-button">
    <!-- <lui-icon
      v-if="icon !== 'none'"
      :icon="icon"
      :class="computedIconSize"
      class="leading-none"
    /> -->
    <span v-if="!!slots.icon" :class="computedIconSize" class="leading-none flex items-center">
      <slot name="icon" />
    </span>
    <template v-else>
      <!-- <lui-icon
        v-if="prepend !== 'none'"
        :icon="prepend"
        :class="computedIconSize"
        class="leading-none"
      /> -->
      <span v-if="!!slots.prepend" :class="computedIconSize" class="leading-none flex items-center">
        <slot name="prepend" />
      </span>
      <span><slot></slot></span>
      <span v-if="!!slots.append" :class="computedIconSize" class="leading-none flex items-center">
        <slot name="append" />
      </span>
      <!-- <lui-icon
        v-if="append !== 'none'"
        :icon="append"
        class="leading-none"
        :class="computedIconSize"
      /> -->
      <!-- <lui-icon
        v-if="prepend !== 'none' || (loading && loaderPosition === 'left')"
        :icon="loading && loaderPosition === 'left' ? 'loader-4' : prepend"
        :size="computedIconSize"
        class="leading-none"
        :class="loading ? 'animate-spin inline-block' : ''"
      />
      <span><slot></slot></span>
      <lui-icon
        v-if="append !== 'none' || (loading && loaderPosition === 'right')"
        :icon="loading && loaderPosition === 'right' ? 'loader-4' : append"
        :size="computedIconSize"
        class="leading-none"
        :class="loading ? 'animate-spin inline-block' : ''"
      /> -->
    </template>
  </component>
</template>
