<!-- <script lang="ts">
export default {
  name: "LuiTabs",
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import {
  onMounted,
  provide,
  ref,
  useSlots,
  nextTick,
  computed,
  watch,
  h,
} from "vue";
import { ContextKey } from "./symbols";
import { useId } from "../../utils/useId";
import type { Ref, PropType } from "vue";
import type { AlignmentTypes, TabTypes } from "./types";
import type { TwClassInterface } from "@/globals/interfaces";
import LuiMenuItem from "../Menu/LuiMenuItem.vue";

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
  modelValue: {
    type: [String, null] as PropType<string | null>,
    default: null,
  },
});

const slots = useSlots();
// console.log("SLOTS:", slots);
const tabs: Ref<TabTypes[]> = ref([]);
const selectedTab: Ref<TabTypes | null> = ref(null);
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
  // console.log("default-Slots:", slots.default()[0]?.children.prepend());
  slots.default?.().map((slot: any) => {
    tabs.value.push({
      ...slot.props,
      tabId: `lui-tab-${useId()}`,
      panelId: `lui-tabpanel-${useId()}`,
      prepend: slot?.children?.prepend && slot?.children?.prepend,
      append: slot?.children?.append && slot?.children?.append,
    });
  });
  console.log("TABS:", tabs.value);
  // set initial selectedTab
  let initialActiveIndex;
  if (props.modelValue !== null) {
    initialActiveIndex = tabs.value.findIndex(
      (tab) => tab.title === props.modelValue
    );
  } else {
    initialActiveIndex = tabs.value.findIndex(
      (tab) => tab?.active !== undefined && tab.active !== false
    );
  }
  initialActiveIndex = initialActiveIndex === -1 ? 0 : initialActiveIndex;
  selectedTab.value = tabs.value[initialActiveIndex];
});

watch(
  () => props.modelValue,
  (newValue) => {
    const newActiveTab = tabs.value.find((tab) => tab.title === newValue);
    if (newActiveTab?.disabled !== undefined && newActiveTab.disabled !== false)
      return;

    setSelectedTab(newActiveTab as TabTypes);
  }
);

function setSelectedTab(tab: TabTypes) {
  selectedTab.value = { ...tab };
  emit("onTabChange", tab);
}
function handleClick(tab: TabTypes) {
  // selectedTab.value = { ...tab };
  // emit("onTabChange", tab);
  setSelectedTab(tab);
}
function changeTabProps(tab: TabTypes, oldTitle: string) {
  // we got tabs from slots with useSlots, so they are not reactive, be able to react tab props changes this function triggers from luitab
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
  setSelectedTab(tabs.value[focusableTarget]);
  nextTick(() => tabRefs.value[focusableTarget as number]?.focus());
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
const renderTest = ({ index }) => {
  console.log("index:", index);
  return h("div", {}, [slots?.default()[index]?.children?.prepend()]);
};
const renderTestAppend = ({ index }) => {
  console.log("append:", slots?.default()[index]);
  return h("div", {}, [slots?.default()[index]?.children?.append()]);
};

const menuContainerClasses = computed(() => {
  const classes: TwClassInterface = {
    display: "flex",
    justifyItems: {
      "justify-start": props.alignTabs === "left",
      "justify-center": props.alignTabs === "center",
      "justify-end": props.alignTabs === "right",
    },
    overflow: "overflow-y-auto",
  };
  return Object.values(classes);
});
</script>
<template>
  <div>
    <div
      role="tablist"
      :class="menuContainerClasses"
      class="relative after:bg-secondary-300 after:w-full after:h-0.5 after:absolute after:z-10 after:left-0 after:bottom-0 after:inline-block after:rounded-full"
      aria-orientation="horizontal"
    >
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
        :block="stretch"
        @click="handleClick(tab)"
        @keydown="handleKeyEvents($event, index)"
        :color="selectedTab.title === tab.title ? 'primary' : 'secondary'"
        class="relative after:w-full after:h-0.5 after:absolute after:z-20 after:left-0 after:bottom-0 after:inline-block after:rounded-full"
        :class="
          selectedTab.title === tab.title
            ? 'after:bg-primary-500'
            : 'after:bg-transparent'
        "
      >
        <template #prepend>
          <renderTest v-if="tab.prepend !== undefined" :index="index" />
        </template>
        {{ tab.title }}
        <template #append>
          <renderTestAppend v-if="tab.append !== undefined" :index="index" />
        </template>
      </LuiMenuItem>
    </div>
    <div class="flex justify-start pt-4 text-secondary-600">
      <slot />
    </div>
  </div>
</template> -->
