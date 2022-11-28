/* eslint-disable no-extra-boolean-cast */
<script lang="ts">
export default {
  name: "LuiSelect",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  nextTick,
  provide,
  useSlots,
  watch,
} from "vue";
import type { PropType, Ref } from "vue";
import LuiOption from "./LuiOption.vue";
import LuiInput from "../Input/LuiInput.vue";
type ModelValueObject = {
  label: string;
  value: string | number;
  disabled?: boolean;
  selected?: boolean;
};
type ModelValue = string | ModelValueObject | undefined;

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [Object, String, undefined] as PropType<ModelValue>,
    default: undefined,
  },
});
const slots = useSlots();
const listboxTriggerRef = ref<InstanceType<typeof LuiInput> | null>(null);
const listBoxWrapper = ref<HTMLInputElement | null>(null);
const listboxActive = ref(false);
const selectedOption: Ref<ModelValue> = ref(undefined);

// const errorMessages = {
//   "modelValue/missing-field":
//     "Missing field for modelValue, label and value fields are required when modelValue is object",
//   "options/missing":
//     "Options missing: should use options prop or lui-option as prop",
// };

const emit = defineEmits(["update:modelValue", "change"]);

nextTick(() => {
  setInitialSelectedOption();
});

provide("selectedOption", {
  selectedOption,
  updateSelectedOption,
});
watch(
  () => props.modelValue,
  (value) => {
    updateSelectedOption(value);
  }
);

function updateSelectedOption(option: ModelValue) {
  selectedOption.value = option;
  emit("update:modelValue", option);
  emit("change", option);
}

onMounted(() => {
  document.addEventListener("click", closeListBox);
});
onUnmounted(() => {
  document.removeEventListener("click", closeListBox);
});

function closeListBox(e: any) {
  if (!listboxTriggerRef?.value?.$el.contains(e.target)) {
    listboxActive.value = false;
  }
}

function handleTriggerClick() {
  listboxActive.value = !listboxActive.value;
}
// function handleOptionClick(option: ModelValueObject) {
//   selectedOption.value = option;
//   emit("update:modelValue", option.value || option);
// }
function setInitialSelectedOption() {
  const isModelValueInvalid =
    props.modelValue !== undefined &&
    typeof props.modelValue !== "string" &&
    (props.modelValue?.label === undefined ||
      props.modelValue?.value === undefined);

  const optionsExist = props.options.length > 0;

  const anyOptionSelected = () =>
    props.options.some((o: any) => o.selected !== undefined && o.selected);

  const validSlotTypes = ["LuiOption"];

  function setPlaceholderOrValue(value: any) {
    if (props.placeholder === "") {
      updateSelectedOption(value);
    } else {
      updateSelectedOption(props.placeholder);
    }
  }
  const anySlotSelected = () =>
    slots.default &&
    slots
      .default()
      .some((slot: any) =>
        slot.type.toString() == "Symbol(Fragment)"
          ? slot.children.some(
              (child: any) =>
                child.props.selected !== undefined &&
                child.props.selected === true
            )
          : slot.props.selected !== undefined && slot.props.selected === true
      );

  const isDefaultSlotValid = () =>
    slots.default &&
    slots
      .default()
      .some((slot: any) =>
        slot.type.toString() == "Symbol(Fragment)"
          ? slot.children.some(
              (child: any) =>
                child.type.name !== undefined &&
                validSlotTypes.includes(child.type.name)
            )
          : slot.type.name !== undefined &&
            validSlotTypes.includes(slot.type.name)
      );

  if (isModelValueInvalid) {
    throw new Error(
      "Missing field for modelValue, label and value fields are required when modelValue is object"
    );
  }
  if (props.modelValue !== undefined) {
    // should we handle the case if modelValue does not match any option then if placeholder exist set placeholder than throw error?
    updateSelectedOption(props.modelValue);
    return;
  }
  // after this line modelValue is undefined
  if (optionsExist && !anyOptionSelected()) {
    setPlaceholderOrValue(props.options[0]);
    return;
  }

  if (!optionsExist && !isDefaultSlotValid()) {
    throw new Error(
      `Options missing: should use options prop or one of the valid slots: ${validSlotTypes}`
    );
  }
  if (!optionsExist && !anySlotSelected()) {
    const firstSlot: any = slots.default && slots.default()[0];
    let propsOfFirstSlot;
    if (slots.default && firstSlot?.type.toString() === "Symbol(Fragment)") {
      propsOfFirstSlot = firstSlot?.children[0]?.props;
    } else {
      propsOfFirstSlot = firstSlot?.props;
    }
    setPlaceholderOrValue({
      label: propsOfFirstSlot.label,
      value: propsOfFirstSlot.value,
    });
  }
}

function handleListboxTriggerKeyEvents(event: KeyboardEvent) {
  console.log(event);
  switch (event.code) {
    case "ArrowDown":
      // code block
      break;
    case "ArrowUp":
      // code block
      break;
    default:
    // code block
  }
}

// const isObject = (variable: any) =>
//   typeof variable === "object" && variable !== null && !Array.isArray(variable);
</script>
<template>
  <div>
    <LuiInput
      ref="listboxTriggerRef"
      aria-haspopup="true"
      aria-expanded="true"
      :value="selectedOption?.label || selectedOption"
      :placeholder="placeholder"
      readonly
      v-bind="$attrs"
      @click="handleTriggerClick"
      @keydown="handleListboxTriggerKeyEvents($event)"
    />
    <ul
      v-show="listboxActive"
      ref="listBoxWrapper"
      aria-orientation="vertical"
      role="listbox"
      tabindex="-1"
    >
      <LuiOption v-if="placeholder !== ''" disabled :label="placeholder" />
      <template v-if="options.length > 0">
        <LuiOption
          v-for="(option, index) in options"
          :key="index"
          :label="option?.label || option"
          :value="option.value"
          :selected="option.selected !== undefined && option.selected"
          :disabled="option.disabled !== undefined && option.disabled"
        >
        </LuiOption>
      </template>
      <slot v-else />
    </ul>
  </div>
</template>
