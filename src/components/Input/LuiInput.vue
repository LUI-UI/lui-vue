<script lang="ts">
export default {
  name: "LuiInput",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { computed, ref, useAttrs, toRefs } from "vue";
import type { PropType, Ref } from "vue";
import { Rounded, Block, Icon, Size, State } from "@/types/global-types-types";
import type { Clear, ModelValue, StateIcon, Description } from "./input-types";
import { useInputClasses } from "./composables";
import LuiIcon from "../Icon/LuiIcon.vue";

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
      <lui-icon
        v-if="prepend !== 'none'"
        :icon="prepend"
        :class="prependClasses"
        class="leading-none"
      />
      <button
        v-if="clear && !attrs.disabled"
        @click="clearInput"
        :class="closeIconClasses"
      >
        <lui-icon icon="close" class="leading-none" />
      </button>
      <lui-icon
        v-if="state !== null && stateIcon"
        :icon="stateIconName"
        :class="stateIconClasses"
      />
    </div>
    <p v-if="description !== null" :class="descriptionClasses">
      {{ description }}
    </p>
  </div>
</template>
