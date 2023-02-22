<!-- <script lang="ts">
export default {
  name: "LuiTab",
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import type { PropType } from "vue";
import { inject, watch } from "vue";
import { ContextKey } from "./symbols";
import type { TabTypes } from "./types";
const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: "",
  },
  active: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});
const injection = inject(ContextKey);
watch(
  () => [props.title, props.active, props.disabled],
  (_, oldValues) => {
    injection?.changeTabProps(props as TabTypes, oldValues[0] as string);
  }
);
</script>
<template>
  <div
    v-if="title == injection?.selectedTab?.value?.title"
    :id="injection?.selectedTab?.value?.panelId"
    role="tabpanel"
    tabindex="0"
    :aria-labelledby="injection?.selectedTab?.value?.tabId"
    class="computedClasses.panel"
  >
    <slot />
  </div>
</template> -->
