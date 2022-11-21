<script lang="ts">
export default {
  name: "LuiInput",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { computed, ref, useAttrs, toRefs, useSlots } from "vue";
import type { PropType, Ref } from "vue";
import { Rounded, Block, Icon, Size, State } from "@/globals/types";
import type { Clear, ModelValue, StateIcon, Description } from "./input-types";
import { useInputClasses } from "./composables";

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
    type: [Boolean] as PropType<StateIcon>,
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
const slots = useSlots();
const LuiInputRef: Ref = ref(null);

const {
  inputClasses,
  descriptionClasses,
  prependClasses,
  stateIconClasses,
  closeIconClasses,
} = useInputClasses(toRefs(props), toRefs(attrs));

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
// 12 16 20 20 24
const iconSizes = computed(() =>
  props.size === "xs"
    ? "12"
    : props.size === "sm"
    ? "16"
    : props.size === "xl"
    ? "24"
    : "20"
);
</script>
<template>
  <div
    :class="[block ? 'w-full' : 'w-48', computedAttrs.parent.attrClass]"
    :style="computedAttrs.parent.style"
  >
    <div class="relative">
      <input
        ref="LuiInputRef"
        v-bind="computedAttrs.input"
        :class="inputClasses"
        :value="modelValue"
        @input="handleInputEvents($event)"
      />
      <!-- icon should be above the input be able to use peer -->
      <span
        v-if="!!slots.prepend"
        :icon="prepend"
        :class="prependClasses"
        class="leading-none"
      >
        <slot name="prepend" />
      </span>
      <button
        v-if="clear && !attrs.disabled"
        @click="clearInput"
        :class="closeIconClasses"
      >
        <!-- <lui-icon icon="close" class="leading-none" /> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          :width="iconSizes"
          :height="iconSizes"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
          />
        </svg>
      </button>
      <span
        v-if="state !== null && stateIcon"
        :icon="stateIconName"
        :class="stateIconClasses"
      >
        <!-- feedback -->
        <svg
          v-if="state === 'warning'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          :width="iconSizes"
          :height="iconSizes"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM11 13h2v2h-2v-2zm0-6h2v5h-2V7z"
          />
        </svg>
        <!-- warning -->
        <svg
          v-if="state === false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          :width="iconSizes"
          :height="iconSizes"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"
          />
        </svg>
        <!-- success -->
        <svg
          v-if="state === true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          :width="iconSizes"
          :height="iconSizes"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"
          />
        </svg>
        <!-- disabled -->
        <svg
          v-if="attrs?.disabled === true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          :width="iconSizes"
          :height="iconSizes"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm4.891-11.477l-8.368 8.368a6.04 6.04 0 0 1-1.414-1.414l8.368-8.368a6.04 6.04 0 0 1 1.414 1.414z"
          />
        </svg>
      </span>
    </div>
    <p v-if="description !== null" :class="descriptionClasses">
      {{ description }}
    </p>
  </div>
</template>
