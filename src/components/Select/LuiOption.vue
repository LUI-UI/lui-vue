<script lang="ts">
import { inject, computed, watch } from "vue";
import { nextTick } from "process";
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
console.log(props);
// const slots = useSlots();
const { selectedOption, updateSelectedOption } = inject("selectedOption");

nextTick(() => {
  // if v-model does not used set the initial selected with selected prop
  if (selectedOption.value === undefined && props.selected) {
    updateSelectedOption({ value: props.value, label: props.label });
  }
});

watch(
  () => props.selected,
  (value) => {
    console.log("Watch props.modelValue function called with args:", value);
    updateSelectedOption({ value: props.value, label: props.label });
  }
);

function handleOptionClick() {
  updateSelectedOption({ value: props.value, label: props.label });
}

const isSelected = computed(() => {
  if (selectedOption.value === undefined) return props.selected;
  return typeof selectedOption.value === "string"
    ? props.label === selectedOption.value
    : props.label === selectedOption.value.label;
});

</script>
<template>
  <li
    role="option"
    tabindex="0"
    v-bind="$attrs"
    :aria-selected="isSelected"
    class="focus:border border-danger-500"
    :class="isSelected ? 'text-primary-500' : 'text-secondary-600'"
    @click="handleOptionClick"
  >
    <span> {{ label }} </span>
    <!-- <span><slot /></span> -->
  </li>
</template>
