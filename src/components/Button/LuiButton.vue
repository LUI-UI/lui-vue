<script lang="ts">
export default {
  name: "LuiButton",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import classNames from "classnames";
import { useButtonClasses } from "./useButtonClasses";
import type { PropType } from "vue";
import type { ButtonTag, ButtonSize } from "./button-types";
import type {
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
    default: true,
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
});
const buttonClasses = useButtonClasses(props);
const iconClasses = computed(() => "icon");
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
    :class="[computedClasses]"
    v-bind="$attrs"
  >
    <lui-icon v-if="prepend !== 'none'" :icon="prepend" :class="iconClasses" />
    <span
      v-if="prepend !== 'none' && icon !== 'none'"
      :class="size === 'sm' ? 'mx-1.5' : 'mx-2.5'"
    >
      <slot />
    </span>
    <slot v-else />
    <lui-icon v-if="icon !== 'none'" :icon="icon" :class="iconClasses" />
  </component>
</template>
