<script lang="ts">
export default {
  name: "LuiInput",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { computed, useAttrs } from "vue";
import type { PropType } from "vue";
import classNames from "classnames";
import { Rounded, Block, Icon, Size, State } from "../../global-types";
// import type { TwClassInterface } from "../../../global-interfaces";
import type { Clear, ModelValue, stateIcon } from "./input-types";
import { useInputClasses } from "./composables";
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
  modelValue: {
    type: [String, Number] as PropType<ModelValue>,
    default: "",
  },
});
const inputClasses = useInputClasses(props);
const computedInputClasses = computed(() => {
  return classNames(
    Object.values({
      ...inputClasses,
    })
  );
});
const attrs = useAttrs();
const emit = defineEmits(["update:modelValue", "change"]);

function handleInputEvents(val: any) {
  emit("update:modelValue", val.target.value);
  emit("change", val.target.value);
}

const computedAttrs = computed(() => {
  const { class: attrClass, style, ...rest } = attrs;
  return {
    parent: { attrClass, style },
    input: rest,
  };
});
</script>
<template>
  <div
    :class="[block ? 'w-full' : 'w-48', computedAttrs.parent.attrClass]"
    :style="computedAttrs.parent.style"
  >
    <div class="relative">
      <!-- <lui-icon
        v-if="prepend !== 'none'"
        :icon="prepend"
        :class="[iconClasses.size, iconClasses.position, iconClasses.prepend]"
      /> -->
      <input
        ref="Linput"
        v-bind="computedAttrs.input"
        :class="computedInputClasses"
        :value="modelValue"
        @input="handleInputEvents($event)"
      />
      <!-- <lui-button
        v-if="clear && !$attrs.disabled"
        type="link"
        variant="secondary"
        icon="close"
        :size="size"
        disable-styles
        :class="[iconClasses.position, iconClasses.clear]"
        @click="$refs.Linput.value = ''"
      />
      <lui-icon
        v-if="state !== null"
        :icon="iconClasses.name"
        :class="[
          iconClasses.size,
          iconClasses.color,
          iconClasses.position,
          iconClasses.state,
        ]"
      /> -->
    </div>
    <!-- <p v-if="description !== 'none'" :class="descriptionClasses">
      {{ description }}
    </p> -->
  </div>
</template>
