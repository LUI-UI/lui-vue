<script lang="ts">
export default {
  name: "LuiSelect",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import {
  ref,
  nextTick,
  provide,
  useSlots,
  watch,
  reactive,
  computed,
} from "vue";
import type { PropType, Ref } from "vue";
import type {
  OptionsType,
  ModelValue,
  ModelValueObject,
  ListboxStateType,
} from "./select-types";
import { ContextKey } from "./symbols";
import { useId } from "./hooks/index";
import { useOutsideClick, useFindProperPosition } from "./composables/index";
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
// const selectRef: Ref<InstanceType<typeof LuiInput> | null> = ref(null);
const selectRef = ref<InstanceType<typeof LuiInput> | null>(null);
const optionsRef: Ref<HTMLUListElement | null> = ref(null);
const selectWrapperRef: Ref<HTMLDivElement | null> = ref(null);
const optionsActive: Ref<boolean> = ref(false);
const selectedOption: Ref<ModelValueObject | string | undefined> =
  ref(undefined);
const listboxState: ListboxStateType = reactive({
  items: [],
  currentIndex: 0,
  currentId: "",
});

const selectId = `lui-listbox-button-${useId()}`;
const optionsId = `lui-listbox-wrapper-${useId()}`;
const validSlotTypes = ["LuiOption"];
const errorMessages = {
  missing: {
    modelValue:
      "Missing field for modelValue, label and value fields are required when modelValue is object",
    options: `Options missing: should use options prop or LuiOption component as slot`,
  },
};

const emit = defineEmits(["update:modelValue", "change"]);

const { properPosition } = useFindProperPosition(selectWrapperRef);

// useOutsideClick(selectRef, () => {
//   closeListBox();
// });

const vClickOutSide = {
  mounted: function (el: any, binding: any, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: function (el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

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
  (value) => updateSelectedOption(value)
);

function focusAvailableElement(
  el: HTMLElement | null,
  oparation: (i: number) => number,
  initial: number | null = null
) {
  const isTargetExist = (index: number) =>
    index >= 0 && index <= listboxState.items.length - 1;
  const isTargetFocusable = (targetIndex: number) =>
    listboxState.items[targetIndex]?.disabled === undefined ||
    listboxState.items[targetIndex]?.disabled === false;

  let targetIndex = listboxState.currentIndex;
  if (initial !== null) {
    targetIndex = initial;
  } else {
    targetIndex = oparation(targetIndex);
  }
  if (!isTargetExist(targetIndex)) return;

  while (!isTargetFocusable(targetIndex)) {
    targetIndex = oparation(targetIndex);
    if (!isTargetExist(targetIndex)) return;
  }

  listboxState.currentIndex = targetIndex;
  const currentEl = el?.children[listboxState.currentIndex];
  listboxState.currentId = currentEl?.id;
  nextTick(() => currentEl?.focus({ preventScroll: true }));
}

function updateSelectedOption(option: ModelValue) {
  selectedOption.value = option;
  emit("update:modelValue", option);
  emit("change", option);
}

function focusButton() {
  // selectRef.value?.focus({ preventScroll: true });
  selectRef.value?.focus({ preventScroll: true });
}

function closeListBox() {
  optionsActive.value = false;
}

function toggleOptions() {
  optionsActive.value = !optionsActive.value;
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

  // const validSlotTypes = ["LuiOption"];

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
    throw new Error(errorMessages.missing.modelValue);
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
      {
        event.preventDefault();
        if (!optionsActive.value) {
          toggleOptions();
        }
        // nextTick(() => Focus(optionsRef.value, "selected"));
        // if selected item exist
        // check is selected item disabled (it is possible for some case)
        // if not disabled focus the selected item
        // if disabled focus next element
        // if not exist
        // focus first item
        let selectedIndex = listboxState.items.findIndex((item: any) =>
          typeof item === "string"
            ? item === selectedOption.value
            : item?.label === selectedOption.value?.label
        );
        if (selectedIndex === -1) {
          focusAvailableElement(optionsRef.value, (i) => i + 1, 0);
        } else {
          focusAvailableElement(optionsRef.value, (i) => i + 1, selectedIndex);
        }
      }

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

function optionsKeydown(event: KeyboardEvent) {
  switch (event.code) {
    case "ArrowDown":
      event.preventDefault();
      focusAvailableElement(optionsRef.value, (i) => i + 1);
      break;
    case "ArrowUp":
      event.preventDefault();
      focusAvailableElement(optionsRef.value, (i) => i - 1);
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
      focusAvailableElement(optionsRef.value, (i) => i + 1, 0);
      break;
    case "End":
      event.preventDefault();
      {
        const last = listboxState.items.length - 1;
        focusAvailableElement(optionsRef.value, (i) => i - 1, last);
      }

      break;
    case "Escape":
      event.preventDefault();
      closeListBox();
      nextTick(() => focusButton());
      break;
    case "Tab":
      event.preventDefault();
      event.stopPropagation();
      break;
    default:
  }
}
function handleClickOutside() {
  optionsActive.value = false;
}

// const isObject = (variable: any) =>
//   typeof variable === "object" && variable !== null && !Array.isArray(variable);
</script>
<template>
  <div
    class="relative"
    role="combobox"
    ref="selectWrapperRef"
    aria-haspopup="listbox"
    :aria-expanded="optionsActive"
    :aria-controls="optionsId"
    tabindex="-1"
    v-click-out-side="handleClickOutside"
    @click="toggleOptions"
  >
    <LuiInput
      ref="selectRef"
      :id="selectId"
      :value="selectedOption?.label || selectedOption"
      :placeholder="placeholder"
      readonly
      v-bind="$attrs"
      @keydown="buttonKeydown($event)"
    />
    <ul
      v-show="optionsActive"
      ref="optionsRef"
      :id="optionsId"
      aria-orientation="vertical"
      :aria-labelledby="selectId"
      role="listbox"
      tabindex="0"
      class="absolute"
      :class="
        properPosition === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'
      "
      :aria-activedescendant="listboxState.currentId"
      @keydown="optionsKeydown($event)"
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
