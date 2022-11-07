<script lang="ts">
export default {
  name: "LuiInput",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import type { PropType } from "vue";
import classNames from "classnames";
import { Rounded, Block, Icon, Size, State } from "@/global-types";
import type { Clear, ModelValue, stateIcon, Description } from "./input-types";
import type { TwClassInterface } from "@/global-interfaces";
import { useInputClasses } from "./composables";
// import LuiIcon from "@/components/Icon/LuiIcon.vue";
import LuiIcon from "../Icon/LuiIcon.vue";
// colors.border[`${props.color}-100`]
// hover:border-${props.color}-100
// colors.hover.border[`${props.color}-`]
// const colors = {
//   hover:{
//     border:{
//     "primary-100": "hover:border-primary-100",
//     "danger-100": "hover:border-primary-100"
//     }
//   },
//   border: {
//     "primary-100": "border-primary-100",
//     "danger-100": "border-primary-100"
//   },
const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: "md",
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
  state: {
    type: [String, Boolean, null] as PropType<State>,
    default: null,
  },
  stateIcon: {
    type: [Boolean] as PropType<stateIcon>,
    default: null,
  },
  block: {
    type: Boolean as PropType<Block>,
    default: false,
  },
  clear: {
    type: Boolean as PropType<Clear>,
    default: false,
  },
  prepend: {
    type: [String, Object] as PropType<Icon>,
    default: "none",
  },
  description: {
    type: [String, null] as PropType<Description>,
    default: null,
  },
  modelValue: {
    type: [String, Number] as PropType<ModelValue>,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);
const attrs = useAttrs();
// let isInputFocused: Ref<boolean> = ref(false);
const LuiInputRef: any = ref(null);

const {
  inputClasses,
  descriptionClasses,
  preprendClasses,
  stateIconClasses,
  closeClasses,
} = useInputClasses(props, attrs);

function extractCssClasses(obj: TwClassInterface) {
  return classNames(
    Object.values({
      ...obj,
    })
  );
}

const stateIconName = computed(() => {
  return attrs.disabled
    ? "forbid-2"
    : props.state === true
    ? "checkbox-circle"
    : props.state === "warning"
    ? "feedback"
    : props.state === false
    ? "error-warning"
    : "";
});

const computedAttrs = computed(() => {
  const { class: attrClass, style, ...rest } = attrs;
  return {
    parent: { attrClass, style },
    input: rest,
  };
});

function clearInput() {
  LuiInputRef.value.value = "";
  LuiInputRef.value.focus();
}

function handleInputEvents(val: any) {
  emit("update:modelValue", val.target.value);
  emit("change", val.target.value);
}

// function handleFocus() {
//   console.log("input just focused");
//   isInputFocused.value = true;
// }
// function handleBlur() {
//   console.log("input just blured!");
//   isInputFocused.value = false;
// }
</script>
<template>
  <div
    :class="[block ? 'w-full' : 'w-48', computedAttrs.parent.attrClass]"
    :style="computedAttrs.parent.style"
  >
    <div class="p-3">{{ stateIconName }}</div>
    <!-- {{ testetCls }} -->
    <div class="relative">
      <input
        ref="LuiInputRef"
        v-bind="computedAttrs.input"
        :class="Object.values({ ...inputClasses })"
        :value="modelValue"
        @input="handleInputEvents($event)"
      />
      <!-- icon should be above the input be able to use peer -->
      <lui-icon
        v-if="prepend !== 'none'"
        :icon="prepend"
        :class="extractCssClasses(preprendClasses)"
        class="leading-none"
      />
      <button
        v-if="clear && !attrs.disabled"
        @click="clearInput"
        :class="extractCssClasses(closeClasses)"
      >
        <lui-icon icon="close" class="leading-none" />
      </button>
      <lui-icon
        v-if="state !== null && stateIcon"
        :icon="stateIconName"
        :class="extractCssClasses(stateIconClasses)"
      />
    </div>
    <p
      v-if="description !== null"
      :class="extractCssClasses(descriptionClasses)"
    >
      {{ description }}
    </p>
  </div>
</template>
