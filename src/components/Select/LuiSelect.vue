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
import { useId } from "./composables/index";
import { ContextKey } from "./symbols";
import LuiOption from "./LuiOption.vue";
import LuiInput from "../Input/LuiInput.vue";

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
const id = `lui-listbox-button-${useId()}`;
const wrapperId = `lui-listbox-wrapper-${useId()}`;
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
  currentIndex: 0,
  currentId: "",
});

function Focus(el: HTMLElement | null, target: string) {
  /* eslint-disable no-case-declarations */
  let targetIndex = listboxState.currentIndex;
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
      listboxState.currentIndex = targetIndex;
      break;
    case "previous":
      targetIndex--;
      if (targetIndex < 0) return;
      while (!targetElFocusable(targetIndex)) {
        targetIndex--;
        if (targetIndex < 0) return;
      }
      listboxState.currentIndex = targetIndex;
      // el?.children[listboxState.targetIndex]?.focus({ preventScroll: true });
      break;
    case "first":
      targetIndex = 0;
      while (!targetElFocusable(targetIndex)) {
        targetIndex++;
      }
      listboxState.currentIndex = targetIndex;
      // el?.children[listboxState.targetIndex]?.focus();
      break;
    case "last":
      // const lastIndex = listboxState.items.length - 1;
      // listboxState.targetIndex = lastIndex;
      targetIndex = listboxState.items.length - 1;
      while (!targetElFocusable(targetIndex)) {
        targetIndex--;
      }
      listboxState.currentIndex = targetIndex;
      // el?.children[listboxState.targetIndex]?.focus();
      break;
    case "selected":
      if (props.placeholder === selectedOption.value) {
        targetIndex = 0;
        while (!targetElFocusable(targetIndex)) {
          targetIndex++;
        }
        listboxState.currentIndex = targetIndex;
      } else if (
        selectedOption.value?.disabled !== undefined &&
        selectedOption.value?.disabled === true
      ) {
        while (!targetElFocusable(targetIndex)) {
          targetIndex++;
        }
        listboxState.currentIndex = targetIndex;
      } else {
        targetIndex = listboxState.items.findIndex((item: any) =>
          typeof item === "string"
            ? item === selectedOption.value
            : item?.label === selectedOption.value?.label
        );
        listboxState.currentIndex = targetIndex;
      }
      break;
    default:
    // code block
  }
  console.log("before focus: ", el?.children[listboxState.currentIndex].id);
  listboxState.currentId = el?.children[listboxState.currentIndex]?.id;
  el?.children[listboxState.currentIndex]?.focus({ preventScroll: true });
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
  listboxTriggerRef.value?.focus({ preventScroll: true });
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
    setPlaceholderOrValue(propsOfFirstSlot);
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
// function handleKeyUp(event: KeyboardEvent) {
//   switch (event.key) {
//     case Keys.Space:
//       // Required for firefox, event.preventDefault() in handleKeyDown for
//       // the Space key doesn't cancel the handleKeyUp, which in turn
//       // triggers a *click*.
//       event.preventDefault();
//       break;
//   }
// }

function listboxWrapperKeydown(event: KeyboardEvent) {
  switch (event.code) {
    case "ArrowDown":
      event.preventDefault();
      nextTick(() => Focus(listBoxWrapper.value, "next"));
      break;
    case "ArrowUp":
      nextTick(() => Focus(listBoxWrapper.value, "previous"));
      break;
    case "Enter":
      event.preventDefault();
      event.stopPropagation();
      updateSelectedOption(listboxState.items[listboxState.currentIndex]);
      closeListBox();
      nextTick(() => focusButton());
      break;
    case "Home":
      event.preventDefault();
      nextTick(() => Focus(listBoxWrapper.value, "first"));
      break;
    case "End":
      event.preventDefault();
      nextTick(() => Focus(listBoxWrapper.value, "last"));
      break;
    case "Escape":
      event.preventDefault();
      closeListBox();
      nextTick(() => focusButton());
      break;
    case "Tab":
      event.preventDefault();
      event.stopPropagation();
      // closeListBox();
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
      v-if="false"
      ref="listboxTriggerRef"
      :id="id"
      aria-haspopup="true"
      :aria-expanded="listboxActive"
      :aria-controls="wrapperId"
      :value="selectedOption?.label || selectedOption"
      :placeholder="placeholder"
      readonly
      v-bind="$attrs"
      @click="toggleListbox"
      @keydown="buttonKeydown($event)"
    />
    <button
      ref="listboxTriggerRef"
      :id="id"
      aria-haspopup="true"
      :aria-expanded="listboxActive"
      :aria-controls="wrapperId"
      readonly
      v-bind="$attrs"
      class="px-4 py-2 border border-secondary-400 rounded"
      @click="toggleListbox"
      @keydown="buttonKeydown($event)"
    >
      <span v-if="placeholder !== ''">{{ placeholder }}</span>
      <span v-else>{{ selectedOption?.label || selectedOption }}</span>
    </button>
    <ul
      v-show="listboxActive"
      ref="listBoxWrapper"
      :id="wrapperId"
      aria-orientation="vertical"
      :aria-labelledby="id"
      role="listbox"
      tabindex="0"
      :aria-activedescendant="listboxState.currentId"
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
