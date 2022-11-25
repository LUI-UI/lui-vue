<script setup lang="ts">
import {
  FlexGridInterface,
  LayoutInterface,
  TwClassInterface,
} from "@/globals/interfaces";
import { Color, Rounded, Size } from "@/globals/types";
import { PropType, computed, useSlots } from "vue";
import type { MenuItemTag } from "./menu-item-types";
const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: "md",
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
});
const slots = useSlots();
const computedMenuClasses = computed(() => {
  const menuItemClasses: TwClassInterface = {
    width: "w-max",
    position: "absolute",
    // display: "flex",
    // justifyContent: "justify-between",
    // alignItems: "items-center",
    // textColor: `text-${props.color}-600 dark:text-${props.color}-400 disabled:text-secondary-300 disabled:dark:text-secondary-700`,
    backgroundColor: `bg-secondary-50 dark:bg-secondary-900`,
    // fontSize: {
    //   "text-xs": props.size === "xs",
    //   "text-sm": props.size === "sm",
    //   "text-base": props.size === "md",
    //   "text-lg": props.size === "lg",
    //   "text-xl": props.size === "xl",
    // },
    padding: {
      "p-0.5": props.rounded === "full",
    },
    borderRadius: {
      "rounded-md": props.rounded === true,
      "rounded-2xl": props.rounded === "full", // full rounded ayarlanmalı
    },
    // space:
    //   !!slots.prepend || !!slots.append
    //     ? {
    //         "space-x-1.5": props.size === "xs",
    //         "space-x-2": props.size === "sm",
    //         "space-x-2.5": props.size === "md" || props.size === "lg",
    //         "space-x-3": props.size === "xl",
    //       }
    //     : "",
    // cursor: {
    //   ["cursor-pointer disabled:cursor-not-allowed"]: props.tag === "button",
    // },
  };
  return Object.values(menuItemClasses);
});
// const computedAppendAndPrependClasses = computed(() => {
//   const appendAndPrependClasses: FlexGridInterface | LayoutInterface = {
//     display: "flex",
//     alignItems: "items-center",
//     justifyContent: "justify-center",
//   };
//   return Object.values(appendAndPrependClasses);
// });
// const computedDefaultSlotClasses = computed(() => {
//   const defaultSlotClasses: FlexGridInterface | LayoutInterface = {
//     display: "flex flex-1",
//     alignItems: "items-center",
//   };
//   return Object.values(defaultSlotClasses);
// });
</script>
<template>
  <div
    role="menu"
    tabindex="-1"
    aria-labelledby="lui-menu-button"
    class="lui-menu-item"
    v-bind="$attrs"
    :class="computedMenuClasses"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "LuiMenuDropdown",
};
</script>
