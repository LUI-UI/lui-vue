<script lang="ts">
export default {
  name: "LuiTabs",
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { onMounted, provide, ref, useSlots } from "vue";
import { ContextKey } from "./symbols";
import { useId } from "../../utils/useId";
import type { Ref, PropType } from "vue";
import type { AlignmentTypes, TabTypes } from "./types";
import LuiMenuItem from "../Menu/LuiMenuItem.vue";
import { nextTick } from "process";
const props = defineProps({
  alignTabs: {
    type: String as PropType<AlignmentTypes>,
    default: "left", // left,center,right
  },
  alignContent: {
    type: String as PropType<AlignmentTypes>,
    default: "left", // left,center,right
  },
  stretch: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

console.log(props);
const slots = useSlots();
const tabs: Ref<TabTypes[]> = ref([]);
const selectedTab: Ref<TabTypes | null> = ref(null);
// const modal = ref<InstanceType<typeof MyModal> | null>(null)
// type TabRefTypes = Ref<InstanceType<typeof LuiMenuItem>>;
const tabRefs = ref<Array<InstanceType<typeof LuiMenuItem>>>([]);
const emit = defineEmits(["onTabChange"]);

onMounted(() => {
  // check if slot exist and valid
  const defaultSlot = slots.default && slots.default();
  if (!slots.default) throw new Error("need slot");
  const doesSlotsHasTitle = defaultSlot?.every(
    (slot: any) => slot?.props !== undefined && slot.props?.title !== undefined
  );
  if (!doesSlotsHasTitle) throw new Error("every slot needs title prop");
  // set tabs from slot(lui-tab) props
  slots.default?.().map((slot: any) => {
    tabs.value.push({
      ...slot.props,
      tabId: `lui-tab-${useId()}`,
      panelId: `lui-tabpanel-${useId()}`,
    });
  });
  console.log("Tabs: ", tabs.value);
  // set initial selectedTab
  let initialActiveIndex = tabs.value.findIndex(
    (tab) => tab?.active !== undefined && tab.active !== false
  );
  initialActiveIndex = initialActiveIndex === -1 ? 0 : initialActiveIndex;
  selectedTab.value = tabs.value[initialActiveIndex];
});

function handleClick(tab: TabTypes) {
  console.log("click:", tab);
  selectedTab.value = { ...tab };
  emit("onTabChange", tab);
}
function changeTabProps(tab: TabTypes, oldTitle: string) {
  // we got tabs from slots so they are not reactive, be able to react tab props changes this function triggers from luitab
  const index = tabs.value.findIndex((item) => item?.title == oldTitle);
  tabs.value[index] = { ...tab };
}
provide(ContextKey, { selectedTab, changeTabProps });

function focusAvailableElement(
  currentIndex: number = 0,
  oparation: (i: number) => number
) {
  const focusableElementsLength = tabs.value.filter(
    (tab) => tab?.disabled === undefined || tab.disabled === false
  ).length;
  if (focusableElementsLength <= 1) return;
  //helpers
  const isTargetExist = (target: number) =>
    target >= 0 && target <= tabs.value.length - 1;
  const nextExistIndex = (target: number) =>
    target < 0 ? tabs.value.length - 1 : 0;

  const isTargetFocusable = (target: number) =>
    tabs.value[target]?.disabled === undefined ||
    tabs.value[target]?.disabled === false;
  //helpers
  let focusableTarget: null | number = null;
  let targetIndex = oparation(currentIndex);
  while (focusableTarget === null) {
    if (!isTargetExist(targetIndex)) targetIndex = nextExistIndex(targetIndex);
    if (isTargetFocusable(targetIndex)) focusableTarget = targetIndex;
    else targetIndex = oparation(targetIndex);
    // after set new value could be undefined that targetIndex
  }
  selectedTab.value = { ...tabs.value[focusableTarget] };
  // const targetTab = tabRefs.value[focusableTarget as number];
  nextTick(() => tabRefs.value[focusableTarget as number]?.focus());
  // nextTick(() => tabRefs.value[focusableTarget as number]?.focus());
  // tabRefs.value[focusableTarget]?.focus();
}
function handleKeyEvents(event: KeyboardEvent, index: number) {
  switch (event?.code) {
    case "ArrowRight": {
      focusAvailableElement(index, (i) => i + 1);
      break;
    }
    case "ArrowLeft": {
      focusAvailableElement(index, (i) => i - 1);
      break;
    }
    case "Home": {
      focusAvailableElement(-1, (i) => i + 1);
      break;
    }
    case "End": {
      focusAvailableElement(tabs.value.length, (i) => i - 1);
      break;
    }
    default:
  }
}
</script>
<template>
  <div class="computedClasses.tabMenuContainer">
    <div role="tablist" class="overflow-y-auto flex">
      <LuiMenuItem
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :id="tab.tabId"
        :ref="(el) => (tabRefs[index] = el)"
        type="button"
        role="tab"
        :tabindex="selectedTab.title === tab.title ? '0' : '-1'"
        :aria-selected="selectedTab.title === tab.title ? true : false"
        :aria-controls="tab.panelId"
        :disabled="tab.disabled !== undefined && tab.disabled !== false"
        @click="handleClick(tab)"
        @keydown="handleKeyEvents($event, index)"
        :color="selectedTab.title === tab.title ? 'primary' : 'secondary'"
        class="relative after:w-full after:h-0.5 after:absolute after:z-10 after:left-0 after:bottom-0 after:inline-block after:rounded-full"
        :class="
          selectedTab.title === tab.title
            ? 'after:bg-primary-500'
            : 'after:bg-transparent'
        "
      >
        {{ tab.title }}
      </LuiMenuItem>
    </div>
    <div class="tabpanel-wrapper mt-4">
      <slot />
    </div>
  </div>
  <!-- <div class="tabs-wrapper">
    <div role="tablist">
      <button
        id="tab-1"
        type="button"
        role="tab"
        aria-selected="true"
        aria-controls="tabpanel-1"
        tabindex="0"
      >
        <span class="focus"> Maria Ahlefeldt </span>
      </button>
      <button
        id="tab-2"
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="tabpanel-2"
        tabindex="-1"
      >
        <span class="focus"> Carl Andersen </span>
      </button>
    </div>
    <div id="tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
      <p>
        Maria Theresia Ahlefeldt (16 January 1755 – 20 December 1810) was a
        Danish, (originally German), composer. She is known as the first female
        composer in Denmark. Maria Theresia composed music for several ballets,
        operas, and plays of the royal theatre. She was given good critic as a
        composer and described as a “
        <span lang="da"> virkelig Tonekunstnerinde </span>
        ” ('a True Artist of Music').
      </p>
    </div>
  </div> -->
</template>
