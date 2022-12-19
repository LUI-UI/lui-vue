<script lang="ts">
export default {
  name: "LuiDropdown",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { ref, nextTick, useSlots, reactive } from "vue";
import type { PropType } from "vue";
import LuiButton from "../Button/LuiButton.vue";
import { useOutsideClick } from "../../composables/useOutsideClick";
import { useFindProperPosition } from "../../composables/useFindProperPosition";
import { useId } from "../../utils/useId";
import { Variant, Filter, Rounded, Block, Color, Size } from "@/globals/types";

const props = defineProps({
  // options: {
  //   type: [Array, null] as PropType<Options>,
  //   default: null,
  // },
  text: {
    type: String as PropType<string>,
    default: "",
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
  console.log(event);
  console.log("aa:", menuItemsState);
  switch (event.code) {
    case "ArrowDown":
    case "Enter":
    case "Space":
      // code block
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
  <div ref="luiDropdownWrapper" class="relative leading-3">
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
      <ul
        :id="menuId"
        role="menu"
        ref="luiDropdownMenu"
        :aria-labelledby="buttonId"
        :aria-activedescendant="menuItemsState.currentIndex"
        tabindex="0"
        v-show="menuActive"
        class="p-2 bg-white rounded-lg border border-secondary-200 w-max absolute"
        :class="
          properPosition === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'
        "
        @keydown="handleMenuKeyEvents"
      >
        <slot />
      </ul>
    </transition>
  </div>
</template>
