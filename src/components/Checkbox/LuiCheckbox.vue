<script lang="ts">
export default {
  name: "LuiCheckbox",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import type { PropType } from "vue";
import { Rounded, Size, State, Description } from "@/global-types";
import { toRefs, computed } from "vue";
import { useCheckboxClasses } from "./composables/index";

export type Indeterminate = false | true;

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
  description: {
    type: [String, null] as PropType<Description>,
    default: null,
  },
  indeterminate: {
    type: Boolean as PropType<Indeterminate>,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  // indeterminate
});
const { inputClasses, spanClasses, iconClasses } = useCheckboxClasses(
  toRefs(props)
);

const iconSize = computed(() =>
  props.size === "sm"
    ? { size: "12", viewBox: "0 0 12 12" }
    : props.size === "md"
    ? { size: "16", viewBox: "0 0 16 16" }
    : { size: "20", viewBox: "0 0 20 20" }
);
</script>
<template>
  <div class="inline-block">
    <div class="relative inline-flex">
      <input
        v-bind="$attrs"
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        :class="inputClasses"
      />
      <span :class="spanClasses"> </span>
      <svg
        v-if="!indeterminate"
        :class="iconClasses"
        :width="iconSize.size"
        :height="iconSize.size"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.64286 3.42857L4.63393 8.57143L2.35714 6.23376"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-if="indeterminate"
        :class="iconClasses"
        width="10"
        height="2"
        viewBox="0 0 10 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H9"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </div>
    <p v-if="description !== null" class="bg-danger-300 leading-none mt-0">
      {{ description }}
    </p>
  </div>
</template>
