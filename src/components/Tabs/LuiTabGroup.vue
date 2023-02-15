<script lang="ts">
export default {
  name: "LuiTabGroup",
};
</script>
<script setup lang="ts">
import { ref, defineProps, onMounted, provide } from "vue";
import { ContextKey } from "./symbols";
const props = defineProps({
  selectedIndex: {
    type: Number,
    default: -1, // left,center,right
  },
});
// const slots = useSlots();
const selectedIndex = ref<number>(0);
const tabs = ref<any[]>([]);
function registerTab(tab: any) {
  console.log("tab from register", tab);
  tabs.value.push(tab.value);
}
// const tabs = slots?.default?.()[0]?.children?.default();
// console.log("slots from group buttons:", slots.default()[0].children.default());
// console.log("slots from group panels:", slots.default()[1].children.default());
onMounted(() => {
  selectedIndex.value = props.selectedIndex !== -1 ? props.selectedIndex : 0;
  console.log("TABS::", tabs.value);
});
provide(ContextKey, { selectedIndex, registerTab });
</script>
<template>
  <slot />
</template>
