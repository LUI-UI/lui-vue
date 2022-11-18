<script setup lang="ts">
import type { Filter, Color, Size, Border, Icon } from "@/globals/types";
import { PropType, ref, computed, toRefs, watchEffect, useSlots } from "vue";
import { TwClassInterface } from "@/globals/interfaces";
import { useGlobalColorClasses } from "../../composables";
import { BadgeVariant } from "./badge-types";
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
const slots = useSlots();
const badgeWrapper = ref<HTMLDivElement | null>(null);
const badgeContent = ref<HTMLSpanElement | null>(null);
const overflow = ref(false);
console.log(!!slots.icon);
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
      props.text.length > 0 || !!slots.icon
        ? {
            "px-0.5": props.size === "xs",
            "px-1": props.size === "sm",
            "px-1.5": props.size === "md",
            "px-2": props.size === "lg",
            "px-2.5": props.size === "xl",
          }
        : null,
    width:
      props.text.length > 0 || !!slots.icon
        ? !overflow.value
          ? {
              "w-3": props.size === "xs",
              "w-4": props.size === "sm",
              "w-5": props.size === "md",
              "w-6": props.size === "lg",
              "w-7": props.size === "xl",
            }
          : null
        : {
            "w-1.5": props.size === "xs",
            "w-2": props.size === "sm",
            "w-2.5": props.size === "md",
            "w-3": props.size === "lg",
            "w-3.5": props.size === "xl",
          },

    height:
      props.text.length > 0 || !!slots.icon
        ? !overflow.value
          ? {
              "h-3": props.size === "xs",
              "h-4": props.size === "sm",
              "h-5": props.size === "md",
              "h-6": props.size === "lg",
              "h-7": props.size === "xl",
            }
          : null
        : {
            "h-1.5": props.size === "xs",
            "h-2": props.size === "sm",
            "h-2.5": props.size === "md",
            "h-3": props.size === "lg",
            "h-3.5": props.size === "xl",
          },
    fontSize: {
      "text-xs": props.size === "xs" || props.size === "sm",
      "text-sm": props.size === "md",
      "text-base": props.size === "lg" || props.size === "xl",
    },
    backgroundColor: backgroundColorClasses.backgroundColor,
    textColor: textColorClasses.textColor,
    borderColor: borderColorClasses.borderColor,
  };
  return Object.values(badgeClasses);
});
</script>
<template>
  <div class="lui-badge">
    <div ref="badgeWrapper" class="" :class="computedBadgeClasses">
      <span v-if="$slots.icon"><slot name="icon"></slot></span>
      <span v-else ref="badgeContent">{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LuiBadge",
};
</script>
