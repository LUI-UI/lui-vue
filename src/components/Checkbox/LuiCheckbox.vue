<script lang="ts">
export default {
  name: "LuiCheckbox",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import type { PropType } from "vue";
import { Rounded, Size, State, Description } from "@/globals/types";
import { toRefs, computed, useAttrs } from "vue";
import { useCheckboxClasses } from "./composables/index";
import { useGlobalDescriptionClasses } from "../../composables/index";
import { useGlobalCheckbox } from "../../composables/index";

export type Indeterminate = false | true;
// export type StringArray = string[];
export type ModelValue = string[] | false | true;
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
  value: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [Array, Boolean] as PropType<ModelValue>,
    default: false,
  },
  // indeterminate
});

const attrs = useAttrs();
const { inputClasses, spanClasses, iconClasses } = useCheckboxClasses(
  toRefs(props)
);
const { descriptionClasses } = useGlobalDescriptionClasses(
  toRefs(props),
  toRefs(attrs)
);
const { handleVModel, isInputChecked } = useGlobalCheckbox(props);
const emit = defineEmits(["update:modelValue"]);
// let modelValueAsArray: Ref<ModelValue> = toRef(props, "modelValue");
function handleChange(e: any) {
  emit("update:modelValue", handleVModel(e));
}
// function handleVModel(e: any) {
//   if (typeof props.modelValue === "boolean") {
//     emit("update:modelValue", e.target.checked);
//   } else {
//     if (e.target.checked) {
//       modelValueAsArray.value.push(e.target.value);
//     } else {
//       const index = modelValueAsArray.value.indexOf(e.target.value);
//       modelValueAsArray.value.splice(index, 1);
//     }
//     emit("update:modelValue", ...[modelValueAsArray.value]);
//   }
// }

// const isInputChecked = computed(() => {
//   return typeof props.modelValue === "boolean"
//     ? props.modelValue
//     : modelValueAsArray.value.includes(props.value);
// });

const iconSize = computed(() =>
  props.size === "sm"
    ? {
        checkbox: "12",
        indeterminate: { width: "10", stroke: "1.5", viewBox: "0 0 10 2" },
      }
    : props.size === "md"
    ? {
        checkbox: "16",
        indeterminate: { width: "12", stroke: "1.75", viewBox: "0 0 12 2" },
      }
    : {
        checkbox: "20",
        indeterminate: { width: "16", stroke: "2", viewBox: "0 0 16 2" },
      }
);
</script>
<template>
  <div class="inline-block leading-3">
    <div class="relative inline-flex">
      <input
        v-bind="$attrs"
        type="checkbox"
        :checked="isInputChecked"
        :value="value"
        @change="handleChange"
        :class="inputClasses"
      />
      <span :class="spanClasses"> </span>
      <svg
        v-if="!indeterminate"
        :class="iconClasses"
        :width="iconSize.checkbox"
        :height="iconSize.checkbox"
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
        :width="iconSize.indeterminate.width"
        height="2"
        :viewBox="iconSize.indeterminate.viewBox"
        :class="iconClasses"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.999977 1H15"
          stroke="white"
          :stroke-width="iconSize.indeterminate.stroke"
          stroke-linecap="round"
        />
      </svg>
    </div>
    <p v-if="description !== null" :class="descriptionClasses">
      {{ description }}
    </p>
  </div>
</template>
