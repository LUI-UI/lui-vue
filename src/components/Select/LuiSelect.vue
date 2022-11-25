<script lang="ts">
export default {
  name: "LuiSelect",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { PropType } from "vue";
import LuiInput from "../Input/LuiInput.vue";
import LuiOption from "./LuiOption.vue";
type ModelValueObject = {
  label: string;
  value: string | number;
  disabled?: boolean;
  selected?: boolean;
};
type ModelValue = string | ModelValueObject;

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [Object, String] as PropType<ModelValue>,
    default: "",
  },
});
console.log(props);
const listboxTriggerRef = ref<InstanceType<typeof LuiInput> | null>(null);
const listBoxWrapper = ref<HTMLInputElement | null>(null);
const listboxActive = ref(false);
const selectedOption = ref(null);

onMounted(() => {
  document.addEventListener("click", closeListBox);
});
onUnmounted(() => {
  document.removeEventListener("click", closeListBox);
});
function closeListBox(e: any) {
  if (!listboxTriggerRef?.value?.$el.contains(e.target)) {
    listboxActive.value = false;
  }
}
function handleButtonClick() {
  listboxActive.value = !listboxActive.value;
}
</script>
<template>
  <div>
    <LuiInput
      ref="listboxTriggerRef"
      type="button"
      aria-haspopup="true"
      aria-expanded="true"
      :value="selectedOption"
      readonly
      v-bind="$attrs"
      @click="handleButtonClick"
    />
    <ul
      v-show="listboxActive"
      ref="listBoxWrapper"
      aria-orientation="vertical"
      role="listbox"
      tabindex="-1"
    >
      <template v-if="options.length > 0">
        <LuiOption v-for="(option, index) in options" :key="index">
          {{ option.label || option }}
        </LuiOption>
      </template>
      <slot v-else />
    </ul>
  </div>
</template>
