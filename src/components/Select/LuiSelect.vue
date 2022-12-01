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
  reactive,
} from "vue";
import type { PropType, Ref } from "vue";
import type {
  OptionsType,
  ModelValue,
  ModelValueObject,
  ListboxStateType,
} from "./select-types";
import { ContextKey } from "./symbols";
import LuiOption from "./LuiOption.vue";
import LuiInput from "../Input/LuiInput.vue";

// interface ModelValueObject {
//   label: string;
//   value: string | number;
//   disabled?: boolean;
//   selected?: boolean;
// }
// type ModelValue = string | ModelValueObject | undefined;
// type ListboxStateType = {
//   items: ModelValueObject[];
//   activeIndex: number;
// };
// type OptionsType = string[] | ModelValueObject[];

const props = defineProps({
  options: {
    type: Array as PropType<OptionsType>,
    default: () => [],
  },
  placeholder: {
    type: String as PropType<string>,
    default: "",
  },
  modelValue: {
    type: [Object, String, undefined] as PropType<ModelValue>,
    default: undefined,
  },
});
const slots = useSlots();
// const listboxTriggerRef: Ref<InstanceType<typeof LuiInput> | null> = ref(null);
const listboxTriggerRef = ref<InstanceType<typeof LuiInput> | null>(null);

const listBoxWrapper: Ref<HTMLUListElement | null> = ref(null);
const listboxActive: Ref<boolean> = ref(false);
const selectedOption: Ref<ModelValueObject | string | undefined> =
  ref(undefined);
// const errorMessages = {
//   "modelValue/missing-field":
//     "Missing field for modelValue, label and value fields are required when modelValue is object",
//   "options/missing":
//     "Options missing: should use options prop or lui-option as prop",
// };
const listboxState: ListboxStateType = reactive({
  items: [],
  activeIndex: 0,
});

function Focus(el: HTMLElement | null, target: string) {
  /* eslint-disable no-case-declarations */
  let targetIndex = listboxState.activeIndex;
  const targetElFocusable = (targetIndex: number) =>
    listboxState.items[targetIndex]?.disabled === undefined ||
    listboxState.items[targetIndex]?.disabled === false;
  switch (target) {
    case "next":
      targetIndex++;
      if (targetIndex >= listboxState.items.length) return;
      while (!targetElFocusable(targetIndex)) {
        targetIndex++;
        if (targetIndex >= listboxState.items.length) return;
      }
      listboxState.activeIndex = targetIndex;
      break;
    case "previous":
      targetIndex--;
      if (targetIndex < 0) return;
      while (!targetElFocusable(targetIndex)) {
        targetIndex--;
        if (targetIndex < 0) return;
      }
      listboxState.activeIndex = targetIndex;
      // el?.children[listboxState.targetIndex]?.focus({ preventScroll: true });
      break;
    case "first":
      targetIndex = 0;
      while (!targetElFocusable(targetIndex)) {
        targetIndex++;
      }
      listboxState.activeIndex = targetIndex;
      // el?.children[listboxState.targetIndex]?.focus();
      break;
    case "last":
      // const lastIndex = listboxState.items.length - 1;
      // listboxState.targetIndex = lastIndex;
      targetIndex = listboxState.items.length - 1;
      while (!targetElFocusable(targetIndex)) {
        targetIndex--;
      }
      listboxState.activeIndex = targetIndex;
      // el?.children[listboxState.targetIndex]?.focus();
      break;
    case "selected":
      if (props.placeholder === selectedOption.value) {
        targetIndex = 0;
        while (!targetElFocusable(targetIndex)) {
          targetIndex++;
        }
        listboxState.activeIndex = targetIndex;
      } else if (
        selectedOption.value?.disabled !== undefined &&
        selectedOption.value?.disabled === true
      ) {
        while (!targetElFocusable(targetIndex)) {
          targetIndex++;
        }
        listboxState.activeIndex = targetIndex;
      } else {
        targetIndex = listboxState.items.findIndex((item: any) =>
          typeof item === "string"
            ? item === selectedOption.value
            : item?.label === selectedOption.value?.label
        );
        listboxState.activeIndex = targetIndex;
      }
      break;
    default:
    // code block
  }
  // listboxState.activeIndex = targetIndex;
  el?.children[listboxState.activeIndex]?.focus({ preventScroll: true });
}

const emit = defineEmits(["update:modelValue", "change"]);

nextTick(() => {
  setInitialSelectedOption();
  setState();
});

provide(ContextKey, {
  selectedOption,
  updateSelectedOption,
  focusButton,
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

function focusButton() {
  listboxTriggerRef.value?.$el.focus({ preventScroll: true });
}

function closeListBox(e: any = null) {
  if (e === null || !listboxTriggerRef.value?.$el.contains(e.target)) {
    listboxActive.value = false;
  }
}

function toggleListbox() {
  listboxActive.value = !listboxActive.value;
}

function setState() {
  const slotsOptions =
    slots.default &&
    slots
      .default()
      .map((slot: any) =>
        slot.type.toString() === "Symbol(Fragment)"
          ? slot.children.map((child: any) => child.props)
          : slot.props
      )
      .flat();
  // validSlotTypes.includes(child.type.name)
  const allOptions = [...props.options].concat(slotsOptions || []);
  listboxState.items = allOptions;
}

function setInitialSelectedOption() {
  const isModelValueInvalid =
    props.modelValue !== undefined &&
    typeof props.modelValue !== "string" &&
    (props.modelValue?.label === undefined ||
      props.modelValue?.value === undefined);

  const optionsExist = props.options.length > 0;

  const anyOptionSelected = () =>
    props.options.some(
      (o: ModelValueObject | string) => typeof o !== "string" && o.selected
    );

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

function buttonKeydown(event: KeyboardEvent) {
  switch (event.code) {
    case "ArrowDown":
    case "ArrowUp":
    case "Enter":
    case "Space":
      event.preventDefault();
      if (!listboxActive.value) {
        toggleListbox();
      }
      nextTick(() => Focus(listBoxWrapper.value, "selected"));
      break;
    default:
    // code block
  }
}

function listboxWrapperKeydown(event: KeyboardEvent) {
  switch (event.code) {
    case "ArrowDown":
      // event.preventDefault();
      nextTick(() => Focus(listBoxWrapper.value, "next"));
      break;
    case "ArrowUp":
      nextTick(() => Focus(listBoxWrapper.value, "previous"));
      break;
    case "Enter":
      // listBoxWrapper.value?.click();
      updateSelectedOption(listboxState.items[listboxState.activeIndex]);
      closeListBox();
      nextTick(() => focusButton());
      break;
    case "Home":
      nextTick(() => Focus(listBoxWrapper.value, "first"));
      break;
    case "End":
      nextTick(() => Focus(listBoxWrapper.value, "last"));
      break;
    case "Escape":
      closeListBox();
      nextTick(() => focusButton());
      break;
    default:
    // code block
  }
}
const isObject = (variable: any) =>
  typeof variable === "object" && variable !== null && !Array.isArray(variable);
</script>
<template>
  <div>
    <LuiInput
      ref="listboxTriggerRef"
      id="lui-listbox-button-1"
      aria-haspopup="true"
      :aria-expanded="listboxActive"
      :value="selectedOption?.label || selectedOption"
      :placeholder="placeholder"
      readonly
      v-bind="$attrs"
      @click="toggleListbox"
      @keydown="buttonKeydown($event)"
    />
    <ul
      v-show="listboxActive"
      ref="listBoxWrapper"
      aria-orientation="vertical"
      aria-labelledby="lui-listbox-button-1"
      role="listbox"
      tabindex="0"
      aria-activedescendant="this-should-match-the-item-id-which-hovered-or-focusud"
      @keydown="listboxWrapperKeydown($event)"
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
      <slot v-if="$slots.default" />
    </ul>
  </div>
</template>
