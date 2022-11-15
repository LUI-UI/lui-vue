<script lang="ts">
export default {
  name: "LuiSwitch",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { toRefs, useAttrs } from "vue";
import type { PropType } from "vue";
import { Rounded, Size, State, Description } from "@/globals/types";

import { useSwitchClasses } from "./composables/index";
import { useGlobalCheckbox } from "../../composables/index";
import { useGlobalDescriptionClasses } from "../../composables/index";

export type ModelValue = Boolean | string[];

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: "md",
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: "full",
  },
  state: {
    type: [String, Boolean, null] as PropType<State>,
    default: null,
  },
  description: {
    type: [String, null] as PropType<Description>,
    default: null,
  },
  value: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [Array, Boolean] as PropType<ModelValue>,
    default: false,
  },
});

const attrs = useAttrs();

const { inputClasses, spanClasses } = useSwitchClasses(
  toRefs(props),
  toRefs(attrs)
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
</script>

<template>
  <div class="inline-block leading-3">
    <div class="relative">
      <input
        v-bind="$attrs"
        type="checkbox"
        :class="inputClasses"
        :checked="isInputChecked"
        :value="value"
        @change="handleChange"
      />
      <span :class="spanClasses" />
    </div>
    <p v-if="description" :class="descriptionClasses">{{ description }}</p>
  </div>
</template>
