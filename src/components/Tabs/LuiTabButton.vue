<script lang="ts">
export default {
  name: "LuiTabButton",
};
</script>
<script setup lang="ts">
// import LuiMenuItem from "../Menu/LuiMenuItem.vue";
import { ContextKey } from "./symbols";
import { inject, onMounted, ref, defineExpose } from "vue";
import { useId } from "../../utils/useId";

const tabRef = ref(null);
const injection = inject(ContextKey);
console.log(injection);
onMounted(() => injection?.registerTab(tabRef));
defineExpose({ el: tabRef, $el: tabRef });
</script>
<template>
  <button
    ref="tabRef"
    :id="`lui-tab-button-${useId()}`"
    type="button"
    role="tab"
    :block="false"
  >
    <slot name="prepend" />
    <!-- <template #prepend>
    </template> -->
    <slot />
    <slot name="append" />
    <!-- <template #append>
    </template> -->
  </button>
  <!-- <LuiMenuItem
    ref="tabRef"
    :id="`lui-tab-button-${useId()}`"
    type="button"
    role="tab"
    :block="false"
  >
    <template #prepend>
      <slot name="prepend" />
    </template>
    <slot />
    <template #append>
      <slot name="append" />
    </template>
  </LuiMenuItem> -->
</template>
