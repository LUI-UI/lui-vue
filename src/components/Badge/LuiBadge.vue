<script setup lang="ts">
import type { Filter, Color, Size, Border, Icon } from "@/globals/types";
import { PropType, ref, computed, toRefs, watchEffect } from "vue";
import { TwClassInterface } from "../../globals/interfaces";
import { useGlobalColorClasses } from "../../composables";
import { BadgeVariant } from "./badge-types";
import LuiIcon from "../Icon/LuiIcon.vue";
// @ ile import'da Storybook hata veriyor
const props = defineProps({
  variant: {
    type: String as PropType<BadgeVariant>,
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
    type: String as PropType<Size>,
    default: "md",
  },
  border: {
    type: Boolean as PropType<Border>,
    default: false,
  },
  text: {
    type: [String],
    default: "",
  },
  icon: {
    type: [String, Object] as PropType<Icon>,
    default: "none",
  },
});
const { backgroundColorClasses, textColorClasses, borderColorClasses } =
  useGlobalColorClasses(toRefs(props));
const badgeWrapper = ref<HTMLDivElement | null>(null);
const badgeContent = ref<HTMLSpanElement | null>(null);
const overflow = ref(false);
watchEffect(() => {
  const wrapperWidh = badgeWrapper.value?.scrollWidth;
  const contentWidth = badgeContent.value?.scrollWidth;
  if (wrapperWidh && contentWidth) {
    if (contentWidth > wrapperWidh) {
      overflow.value = true;
    } else {
      overflow.value = false;
    }
  }
});
const computedBadgeClasses = computed(() => {
  const badgeClasses: TwClassInterface = {
    display: overflow.value ? "inline-block" : "flex",
    borderRadius: "rounded-full",
    borderWidth: "border",
    borderStyle: "border-solid",
    justifyContent: { ["justify-center"]: !overflow.value },
    alignItems: { ["items-center"]: !overflow.value },
    padding:
      props.text.length !== 0
        ? {
            "px-1": props.size === "sm",
            "px-1.5": props.size === "md",
            "px-2": props.size === "lg",
          }
        : null,
    width:
      props.text.length === 0 || props.icon === "none"
        ? {
            "w-2": props.size === "sm",
            "w-2.5": props.size === "md",
            "w-3": props.size === "lg",
          }
        : !overflow.value
        ? {
            "w-4": props.size === "sm",
            "w-5": props.size === "md",
            "w-6": props.size === "lg",
          }
        : null,

    height:
      props.text.length === 0
        ? {
            "h-2": props.size === "sm",
            "h-2.5": props.size === "md",
            "h-3 ": props.size === "lg",
          }
        : !overflow.value
        ? {
            "h-4": props.size === "sm",
            "h-5": props.size === "md",
            "h-6 ": props.size === "lg",
          }
        : null,
    fontSize: {
      "text-xs": props.size === "sm",
      "text-sm": props.size === "md",
      "text-base": props.size === "lg",
    },
    backgroundColor: backgroundColorClasses.backgroundColor,
    textColor: textColorClasses.textColor,
    borderColor: borderColorClasses.borderColor,
  };
  return Object.values(badgeClasses);
});
</script>
<template>
  <div
    ref="badgeWrapper"
    class="lui-badge text-xs"
    :class="computedBadgeClasses"
  >
    <lui-icon v-if="icon !== 'none'" :icon="icon" />
    <span v-else ref="badgeContent">{{ text }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "LuiBadge",
};
</script>
