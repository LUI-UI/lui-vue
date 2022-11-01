<script lang="ts">
export default {
  name: "LuiButton",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import classNames from "classnames";
import { useButtonClasses } from "./composables";
import type { PropType } from "vue";
import type {
  ButtonTag,
  ButtonSize,
  disableStyles,
  loaderPosition,
} from "./button-types";
import {
  Variant,
  Filter,
  Rounded,
  Block,
  Icon,
  Color,
} from "../../global-types";
import LuiIcon from "../Icon/LuiIcon.vue";
const props = defineProps({
  tag: {
    type: String as PropType<ButtonTag>,
    default: "button",
  },
  variant: {
    type: String as PropType<Variant>,
    default: "solid",
  },
  color: {
    type: String as PropType<Color>,
    default: "primary",
  },
  filter: {
    type: String as PropType<Filter>,
    default: "none",
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: "md",
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
  block: {
    type: Boolean as PropType<Block>,
    default: false,
  },
  prepend: {
    type: [String, Object] as PropType<Icon>,
    default: "none",
  },
  append: {
    type: [String, Object] as PropType<Icon>,
    default: "none",
  },
  icon: {
    type: [String, Object] as PropType<Icon>,
    default: "none",
  },
  disableStyles: {
    type: [Boolean, Array] as PropType<disableStyles>,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loaderPosition: {
    type: String as PropType<loaderPosition>,
    default: "right",
  },
});
const buttonClasses = useButtonClasses(props);

// const computedIconNames = computed(() => {
//   return props.loading === false
//     ? { prepend: props.prepend, append: props.append }
//     : props.loaderPosition === "right"
//     ? { prepend: props.prepend, append: "loader-4" }
//     : { prepend: "loader-4", append: props.append };
// });
const computedIconSize = computed(() =>
  props.size === "sm" ? "md" : props.size === "md" ? "xl" : "2xl"
);
const computedClasses = computed(() => {
  return classNames(
    Object.values({
      ...buttonClasses,
    })
  );
});
</script>

<template>
  <component
    :is="tag"
    class="lui-button"
    :class="computedClasses"
    v-bind="$attrs"
  >
    <lui-icon
      v-if="icon !== 'none'"
      :icon="icon"
      :size="computedIconSize"
      class="leading-none"
    />
    <template v-else>
      <lui-icon
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
      />
    </template>
  </component>
</template>
