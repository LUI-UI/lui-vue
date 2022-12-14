<script lang="ts">
import { inject, computed, watch, nextTick } from "vue";
import { ContextKey } from "./symbols";
import { useId } from "./hooks/index";
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
  value: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});

// const { selectedOption, updateSelectedOption, focusButton } =
//   inject(ContextKey);
const context = inject(ContextKey);
const optionId = `lui-option-${useId()}`;

nextTick(() => {
  // if v-model does not used so we set the initial selectedValue
  if (context?.selectedOption.value === undefined && props.selected) {
    context?.updateSelectedOption({
      value: props.value,
      label: props.label,
      selected: props.selected,
    });
  }
});

watch(
  () => props.selected,
  (value) => {
    context?.updateSelectedOption({
      value: props.value,
      label: props.label,
      selected: value,
    });
  }
);

function handleOptionClick(e) {
  e.preventDefault();
  context?.updateSelectedOption({
    value: props.value,
    label: props.label,
    selected: props.selected,
  });
  nextTick(() => context?.focusButton());
}

const isSelected = computed(() => {
  if (context?.selectedOption.value === undefined) return props.selected;
  return typeof context?.selectedOption.value === "string"
    ? props.label === context?.selectedOption.value
    : props.label === context?.selectedOption.value.label;
});

// function handleKeydown(event: KeyboardEvent) {
//   switch (event.code) {
//     case "Enter":
//       updateSelectedOption({ value: props.value, label: props.label });
//       // closeListBox
//       break;
//     default:
//     // code block
//   }
// }
</script>
<template>
  <li
    role="option"
    tabindex="-1"
    v-bind="$attrs"
    :id="optionId"
    :aria-selected="isSelected"
    class="focus:border border-danger-500"
    :class="[
      disabled
        ? 'text-secondary-300 pointer-events-none'
        : isSelected
        ? 'text-primary-600'
        : 'text-secondary-600',
    ]"
    @click="handleOptionClick"
  >
    <span> {{ label }} </span>
    <!-- <span><slot /></span> -->
  </li>
</template>
