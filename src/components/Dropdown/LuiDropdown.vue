<script lang="ts">
export default {
  name: "LuiDropdown",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { ref, nextTick, useSlots, reactive, computed } from "vue";
import type { PropType } from "vue";
import LuiButton from "../Button/LuiButton.vue";
import { useOutsideClick } from "../../composables/useOutsideClick";
import { useFindProperPosition } from "../../composables/useFindProperPosition";
import { useId } from "../../utils/useId";
import { Variant, Filter, Rounded, Block, Color, Size } from "@/globals/types";
type Position =
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";
const props = defineProps({
  // options: {
  //   type: [Array, null] as PropType<Options>,
  //   default: null,
  // },
  text: {
    type: String as PropType<string>,
    default: "",
  },
  menuPosition: {
    type: String as PropType<Position>,
    default: "bottomLeft",
  },
  variant: {
    type: String as PropType<Variant>,
    default: "solid",
  },
  color: {
    type: String as PropType<Color>,
    default: "primary",
  },
  filter: {
    type: String as PropType<Filter>,
    default: "none",
  },
  size: {
    type: String as PropType<Size>,
    default: "md",
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
  block: {
    type: Boolean as PropType<Block>,
    default: false,
  },
});
console.log(props);
// positions: bottom-left, bottom-right, top-left, top-right, left-top, left-bottom, right-top, right-bottom
const emit = defineEmits(["onTrigger"]);
const slots = useSlots();
const luiDropdownWrapper = ref<HTMLDivElement | null>(null);
const luiDropdownButton = ref<InstanceType<typeof LuiButton> | null>(null);
const luiDropdownMenu = ref<HTMLUListElement | null>(null);
const menuActive = ref(false);
const buttonId = `lui-dropdown-button-${useId()}`;
const menuId = `lui-dropdown-menu-${useId()}`;
const menuItemsState = reactive({
  items: [],
  currentIndex: 0,
});

useOutsideClick(luiDropdownButton, () => closeMenu());

const { properPosition } = useFindProperPosition(luiDropdownWrapper);

const positionClasses = {
  bottomLeft: {
    classes: "top-full mt-1",
    oppositeClasses: "bottom-full mb-1 left-0", // bottomRight
    direction: "bottom",
  },
  topLeft: {
    classes: "bottom-full mb-1 left-0",
    oppositeClasses: "top-full mt-1", // bottomLEft
    direction: "top",
  },
  bottomRight: {
    classes: "top-full mt-1 right-0",
    oppositeClasses: "bottom-full mb-1 right-0", // topRight
    direction: "bottom",
  },
  topRight: {
    classes: "bottom-full mb-1 right-0",
    oppositeClasses: "top-full mt-1 right-0", // bottomRight
    direction: "top",
  },
  leftTop: {
    classes: "top-0 mr-1 right-full",
    oppositeClasses: "bottom-0 mr-1 right-full", // leftBottom
    direction: "bottom",
  },
  leftBottom: {
    classes: "bottom-0 mr-1 right-full",
    oppositeClasses: "top-0 mr-1 right-full", // leftTop
    direction: "top",
  },
  rightTop: {
    classes: "top-0 ml-1 left-full",
    oppositeClasses: "bottom-0 ml-1 left-full", //rightBottom
    direction: "bottom",
  },
  rightBottom: {
    classes: "bottom-0 ml-1 left-full",
    oppositeClasses: "top-0 ml-1 left-full", // rightTop
    direction: "top",
  },
};

const computedMenuPosition = computed(() => {
  return positionClasses[props.menuPosition].direction === properPosition.value
    ? positionClasses[props.menuPosition].classes
    : positionClasses[props.menuPosition].oppositeClasses;
});

function closeMenu() {
  menuActive.value = false;
  emit("onTrigger", menuActive.value);
}

function openMenu() {
  menuActive.value = true;
  emit("onTrigger", menuActive.value);
}

function toogleMenu() {
  menuActive.value = !menuActive.value;
  emit("onTrigger", menuActive.value);
}

(function setInitialState() {
  const slotProps =
    slots.default &&
    slots
      .default()
      .map((slot: any) =>
        slot.type.toString() === "Symbol(Fragment)"
          ? slot.children.map((child: any) => child.props)
          : slot.props
      )
      .flat();
  menuItemsState.items = slotProps;
})();
// setInitialState();
function handleMenuKeyEvents(event: KeyboardEvent) {
  switch (event.code) {
    case "ArrowDown":
      event.preventDefault();
      focusAvailableElement(luiDropdownMenu.value, (i) => i + 1);
      break;
    case "ArrowUp":
      event.preventDefault();
      focusAvailableElement(luiDropdownMenu.value, (i) => i - 1);
      break;
    case "Enter":
      {
        event.preventDefault();
        event.stopPropagation();
        const currentEl =
          luiDropdownMenu.value?.children[menuItemsState.currentIndex];
        currentEl.click();
        // updateSelectedOption(menuItemsState.items[menuItemsState.currentIndex]);
        // closeListBox();
        // nextTick(() => focusButton());
      }

      break;
    case "Home":
      event.preventDefault();
      focusAvailableElement(luiDropdownMenu.value, (i) => i + 1, 0);
      break;
    case "End":
      event.preventDefault();
      {
        const last = menuItemsState.items.length - 1;
        focusAvailableElement(luiDropdownMenu.value, (i) => i - 1, last);
      }

      break;
    case "Escape":
      event.preventDefault();
      closeMenu();
      // closeListBox();
      // nextTick(() => focusButton());
      break;
    case "Tab":
      event.preventDefault();
      event.stopPropagation();
      break;
    default:
  }
}

function handleButtonKeyEvents(event: KeyboardEvent) {
  switch (event.code) {
    case "ArrowDown":
    case "Enter":
    case "Space":
      event.preventDefault();
      openMenu();
      focusAvailableElement(luiDropdownMenu.value, (i) => i + 1, 0);
      break;
    case "Control":
      // code block
      break;
    default:
    // code block
  }
}

function focusAvailableElement(
  el: HTMLElement | null,
  oparation: (i: number) => number,
  initial: number | null = null
) {
  const isTargetExist = (index: number) =>
    index >= 0 && index <= menuItemsState.items.length - 1;
  const isTargetFocusable = (targetIndex: number) =>
    menuItemsState.items[targetIndex]?.disabled === undefined ||
    menuItemsState.items[targetIndex]?.disabled === false;

  let targetIndex = menuItemsState.currentIndex;
  if (initial !== null) {
    targetIndex = initial;
  } else {
    targetIndex = oparation(targetIndex);
  }
  if (!isTargetExist(targetIndex)) return;

  while (!isTargetFocusable(targetIndex)) {
    targetIndex = oparation(targetIndex);
    if (!isTargetExist(targetIndex)) return;
  }

  menuItemsState.currentIndex = targetIndex;
  const currentEl = el?.children[menuItemsState.currentIndex];
  menuItemsState.currentId = currentEl?.id;
  nextTick(() => currentEl?.focus({ preventScroll: true }));
}
</script>
<template>
  <div ref="luiDropdownWrapper" class="relative leading-3 w-fit">
    <lui-button
      :id="buttonId"
      ref="luiDropdownButton"
      type="button"
      aria-haspopup="true"
      :aria-expanded="menuActive"
      :aria-controls="menuId"
      :block="block"
      @click="toogleMenu"
      @keydown="handleButtonKeyEvents"
    >
      <span v-if="text !== null">{{ text }}</span>
      <slot v-else name="button" />
    </lui-button>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <!-- :class="computedMenuPosition" -->
      <ul
        :id="menuId"
        role="menu"
        ref="luiDropdownMenu"
        :aria-labelledby="buttonId"
        :aria-activedescendant="menuItemsState.currentIndex"
        tabindex="0"
        v-show="menuActive"
        class="p-2 bg-white rounded-lg border border-secondary-200 w-max absolute"
        :class="computedMenuPosition"
        @keydown="handleMenuKeyEvents"
      >
        <slot />
      </ul>
    </transition>
  </div>
</template>
