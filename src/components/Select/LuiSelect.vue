<script lang="ts">
export default {
  name: "LuiSelect",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import type { PropType } from "vue";
import LuiOption from "./LuiOption.vue";
import LuiInput from "../Input/LuiInput.vue";
type ModelValueObject = {
  label: string;
  value: string | number;
  disabled?: boolean;
  selected?: boolean;
};
type ModelValue = string | ModelValueObject;

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [Object, String] as PropType<ModelValue>,
    default: "",
  },
});
console.log(props);
const listboxTriggerRef = ref<InstanceType<typeof LuiInput> | null>(null);
const listBoxWrapper = ref<HTMLInputElement | null>(null);
const listboxActive = ref(false);
const selectedOption = ref(null);

const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  document.addEventListener("click", closeListBox);
});
onUnmounted(() => {
  document.removeEventListener("click", closeListBox);
});

nextTick(() => {
  setInitialSelectedOption();
});

function closeListBox(e: any) {
  if (!listboxTriggerRef?.value?.$el.contains(e.target)) {
    listboxActive.value = false;
  }
}

function handleTriggerClick() {
  listboxActive.value = !listboxActive.value;
}

function handleOptionClick(option: any) {
  selectedOption.value = option.label || option;
  emit("update:modelValue", option.value || option);
}

function setInitialSelectedOption() {
  if (
    isObject(props.modelValue) &&
    (props.modelValue.label === undefined ||
      props.modelValue.value === undefined)
  ) {
    throw new Error(
      "Missing field for modelValue, label and value fields are required when modelValue is object"
    );
  }
  selectedOption.value = props.modelValue?.label || props.modelValue;
}

const isObject = (variable: any) =>
  typeof variable === "object" && variable !== null && !Array.isArray(variable);
</script>
<template>
  <div>
    <LuiInput
      ref="listboxTriggerRef"
      type="button"
      aria-haspopup="true"
      aria-expanded="true"
      :value="selectedOption"
      readonly
      v-bind="$attrs"
      @click="handleTriggerClick"
    />
    <ul
      v-show="listboxActive"
      ref="listBoxWrapper"
      aria-orientation="vertical"
      role="listbox"
      tabindex="-1"
    >
      <template v-if="options.length > 0">
        <LuiOption
          v-for="(option, index) in options"
          :key="index"
          @click="handleOptionClick(option)"
        >
          {{ option.label || option }}
        </LuiOption>
      </template>
      <slot v-else />
    </ul>
  </div>
</template>
