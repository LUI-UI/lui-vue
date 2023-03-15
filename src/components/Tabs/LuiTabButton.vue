<script lang="ts">
export default {
  name: "LuiTabButton",
};
</script>
<script setup lang="ts">
import LuiMenuItem from "../Menu/LuiMenuItem.vue";
import type { Size } from "@/globals/types";
import type { PropType } from "vue";
import { ContextKey } from "./symbols";
import { computed, inject, onMounted, onUnmounted, ref } from "vue";
import { useId } from "../../utils/useId";

const props = defineProps({
  size: {
    type: String as PropType<Size>,
    default: "md",
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  active: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  stretch: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  id: {
    type: String as PropType<string>,
    default: () => `lui-tab-button-${useId()}`,
  },
});
// const tabButtonId = `lui-tab-button-${useId()}`;
// const modal = ref<InstanceType<typeof LuiMenuItem> | null>(null)
const tabRef = ref(null);
const injection = inject(ContextKey);

onMounted(() => injection?.registerTab(tabRef));
onUnmounted(() => injection?.unRegisterTab(tabRef));
const isSelected = computed(() => {
  // const tabIndex = injection?.context.tabs.findIndex((t) => t.id === props.id);
  // return tabIndex == injection?.context.selectedIndex;
  const selectedTab = injection?.context.tabs[injection?.context.selectedIndex];
  return selectedTab?.id === props.id;
});
// const activePanelId = computed(
//   () => injection?.context.panels[injection.context.selectedIndex]?.id
// );
function handleMouseUp() {
  // we do not use click because click event comes after focus,
  // we want to focus tab when click event finish
  const myIndex = injection?.context.tabs.findIndex((t) => t.id === props.id);
  injection?.setSelectedIndex(myIndex as number);
}

function handleKeyEvents(event: KeyboardEvent) {
  const focusableTabs: HTMLButtonElement[] | undefined =
    injection?.context.tabs.filter(
      (t) => t.disabled === undefined || t?.disabled === false
    );
  let targetIndex: number = focusableTabs?.findIndex(
    (f) => f.id === injection?.context.tabs[injection?.context.selectedIndex].id
  ) as number;
  const setTargetIndex = (i: number) => {
    const length = focusableTabs?.length as number;
    if (i === -1) {
      targetIndex = length - 1;
    } else if (i > length - 1) {
      targetIndex = 0;
    } else {
      targetIndex = i;
    }
  };
  switch (event?.code) {
    case "ArrowRight": {
      setTargetIndex(targetIndex + 1);
      break;
    }
    case "ArrowLeft": {
      setTargetIndex(targetIndex - 1);
      break;
    }
    case "Home": {
      setTargetIndex(0);
      break;
    }
    case "End": {
      setTargetIndex((focusableTabs?.length as number) - 1);
      break;
    }
    default:
  }

  if (focusableTabs !== undefined) {
    focusableTabs[targetIndex].focus();
    const targetIndexInTabs = injection?.context.tabs.findIndex(
      (t) => t.id === focusableTabs[targetIndex].id
    );
    injection?.setSelectedIndex(targetIndexInTabs as number);
  }
}
</script>
<template>
  <LuiMenuItem
    ref="tabRef"
    :id="id"
    role="tab"
    type="button"
    :block="stretch"
    :color="isSelected ? 'primary' : 'secondary'"
    :size="size"
    :tabindex="isSelected ? '0' : '-1'"
    :aria-selected="isSelected"
    :aria-controls="
      injection?.context.panels[injection.context.selectedIndex]?.id
    "
    :disabled="disabled"
    class="relative whitespace-nowrap cursor-pointer after:w-full after:h-0.5 after:absolute after:z-20 after:left-0 after:bottom-0 after:inline-block after:rounded-full"
    :class="isSelected ? 'after:bg-primary-500' : 'after:bg-transparent'"
    @mouseup="handleMouseUp"
    @keydown="handleKeyEvents($event)"
  >
    <template #prepend>
      <slot name="prepend" />
    </template>
    <slot />
    <template #append>
      <slot name="append" />
    </template>
  </LuiMenuItem>
</template>
