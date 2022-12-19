<script setup lang="ts">
import {
  FlexGridInterface,
  LayoutInterface,
  TwClassInterface,
} from "@/globals/interfaces";
import { Color, Rounded, Size } from "@/globals/types";
import { PropType, computed, useSlots } from "vue";
import type { MenuItemTag } from "./menu-item-types";
import { useId } from "../../utils/useId";
const props = defineProps({
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  tag: {
    type: String as PropType<MenuItemTag>,
    default: "button",
  },
  color: {
    type: String as PropType<Color>,
    default: "secondary",
  },
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
const menuItemId = `lui-menu-item-${useId()}`;
const computedMenuItemClasses = computed(() => {
  const menuItemClasses: TwClassInterface = {
    width: "w-full",
    display: "flex",
    justifyContent: "justify-between",
    alignItems: "items-center",
    textColor: `text-${props.color}-600 dark:text-${props.color}-400 disabled:text-secondary-300 disabled:dark:text-secondary-700`,
    backgroundColor: `hover:bg-${props.color}-600/20 dark:hover:bg-${props.color}-400/20 disabled:bg-transparent disabled:dark:bg-transparent`,
    fontSize: {
      "text-xs": props.size === "xs",
      "text-sm": props.size === "sm",
      "text-base": props.size === "md",
      "text-lg": props.size === "lg",
      "text-xl": props.size === "xl",
    },
    padding: {
      "py-1 px-1.5": props.size === "xs",
      "py-1.5 px-2": props.size === "sm",
      "py-2 px-2.5": props.size === "md",
      "py-2.5 px-2.5": props.size === "lg",
      "py-3.5 px-3": props.size === "xl",
    },
    borderRadius: {
      "rounded-md": props.rounded === true,
      "rounded-full": props.rounded === "full",
    },
    space:
      !!slots.prepend || !!slots.append
        ? {
            "space-x-1.5": props.size === "xs",
            "space-x-2": props.size === "sm",
            "space-x-2.5": props.size === "md" || props.size === "lg",
            "space-x-3": props.size === "xl",
          }
        : "",

    cursor: {
      ["cursor-pointer disabled:cursor-not-allowed"]: props.tag === "button",
    },
  };
  return Object.values(menuItemClasses);
});
const computedAppendAndPrependClasses = computed(() => {
  const appendAndPrependClasses: FlexGridInterface | LayoutInterface = {
    display: "flex",
    alignItems: "items-center",
    justifyContent: "justify-center",
  };
  return Object.values(appendAndPrependClasses);
});
const computedDefaultSlotClasses = computed(() => {
  const defaultSlotClasses: FlexGridInterface | LayoutInterface = {
    display: "flex flex-1",
    alignItems: "items-center",
  };
  return Object.values(defaultSlotClasses);
});
</script>
<template>
  <component
    role="menuitem"
    class="lui-menu-item"
    :is="tag"
    :id="menuItemId"
    v-bind="$attrs"
    :class="computedMenuItemClasses"
  >
    <span v-if="$slots.prepend" :class="computedAppendAndPrependClasses">
      <slot name="prepend" />
    </span>
    <div :class="computedDefaultSlotClasses">
      <slot></slot>
    </div>
    <span v-if="$slots.append" :class="computedAppendAndPrependClasses">
      <slot name="append" />
    </span>
  </component>
</template>

<script lang="ts">
export default {
  name: "LuiMenuItem",
};
</script>
