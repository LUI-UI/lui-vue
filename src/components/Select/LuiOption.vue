<script lang="ts">
import { inject, computed, watch, nextTick } from "vue";
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

const { selectedOption, updateSelectedOption, focusButton } =
  inject("selectedOption");

nextTick(() => {
  // if v-model does not used so we set the initial selectedValue
  if (selectedOption.value === undefined && props.selected) {
    updateSelectedOption({
      value: props.value,
      label: props.label,
      selected: props.selected,
    });
  }
});

watch(
  () => props.selected,
  (value) => {
    updateSelectedOption({
      value: props.value,
      label: props.label,
      selected: value,
    });
  }
);

function handleOptionClick() {
  updateSelectedOption({
    value: props.value,
    label: props.label,
    selected: props.selected,
  });
  nextTick(() => focusButton());
}

const isSelected = computed(() => {
  if (selectedOption.value === undefined) return props.selected;
  return typeof selectedOption.value === "string"
    ? props.label === selectedOption.value
    : props.label === selectedOption.value.label;
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
    tabindex="0"
    v-bind="$attrs"
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
