<script lang="ts">
import { inject, computed, watch, nextTick, useSlots } from "vue";
import type { PropType } from "vue";
import { ContextKey } from "./symbols";
import { useId } from "./hooks/index";
import { Rounded, Size } from "@/globals/types";
import type { TwClassInterface } from "@/globals/interfaces";

export default {
  name: "LuiOption",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<Size>,
    default: "md",
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
  value: {
    type: [String, Number],
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
});

// const { selectedOption, updateSelectedOption, focusButton } =
//   inject(ContextKey);
const context = inject(ContextKey);
const slots = useSlots();
const optionId = `lui-option-${useId()}`;

nextTick(() => {
  // if v-model does not used so we set the initial selectedValue
  if (context?.selectedOption.value === undefined && props.selected) {
    context?.updateSelectedOption({
      value: props.value,
      text: props.text,
      selected: props.selected,
    });
  }
});

watch(
  () => props.selected,
  (value) => {
    context?.updateSelectedOption({
      value: props.value,
      text: props.text,
      selected: value,
    });
  }
);

function handleOptionClick(e) {
  e.preventDefault();
  context?.updateSelectedOption({
    value: props.value,
    text: props.text,
    selected: props.selected,
  });
  nextTick(() => context?.focusButton());
}

const isSelected = computed(() => {
  if (context?.selectedOption.value === undefined) return props.selected;
  return typeof context?.selectedOption.value === "string"
    ? props.text === context?.selectedOption.value
    : props.text === context?.selectedOption.value.text;
});

const optionClasses = computed(() => {
  const classes: TwClassInterface = {
    backgroundColor: props.disabled
      ? ""
      : isSelected.value === true
      ? "bg-primary-500 hover:bg-secondary-500/20 focus:bg-secondary-500/20"
      : "hover:bg-secondary-500/20 focus:bg-secondary-500/20",
    padding: {
      "px-1.5 py-1": props.size === "xs",
      "px-2 py-1.5": props.size === "sm",
      "px-2 py-2.5": props.size === "md",
      "p-2.5": props.size === "lg",
      "px-3 py-3.5": props.size === "xl",
    },
    textColor: props.disabled
      ? "text-secondary-300 dark:text-secondary-700"
      : isSelected.value === true
      ? "text-white"
      : "text-secondary-600 dark:text-secondary-300 hover:text-primary-500 focus:text-primary-500",
    outline: "outline-none",
    margin: props.size === "xs" || props.size === "sm" ? "mb-1.5" : "mb-2",
    borderRadius: {
      "rounded-md": props.rounded === true,
      "rounded-2xl": props.rounded === "full",
    },
    display: slots.prepend || slots.append ? "flex" : "",
    alingItems: slots.prepend || slots.append ? "items-center" : "",
    cursor: props.disabled ? "cursor-not-allowed" : "",
  };
  return Object.values({ ...classes });
});
</script>
<template>
  <li
    role="option"
    tabindex="-1"
    v-bind="$attrs"
    :id="optionId"
    :aria-selected="isSelected"
    :class="optionClasses"
    @click="handleOptionClick"
  >
    <span v-if="$slots.prepend"> <slot name="prepend" /> </span>
    <span :class="$slots.prepend ? 'ml-1' : ''"> {{ text }} </span>
    <span v-if="$slots.append" class="ml-auto">
      <slot name="append" />
    </span>
    <!-- <span><slot /></span> -->
  </li>
</template>
