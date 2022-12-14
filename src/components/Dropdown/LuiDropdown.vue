<script lang="ts">
export default {
  name: "LuiDropdown",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { PropType, ref } from "vue";
// import type { ComponentPublicInstance, Ref } from "vue";
// import LuiDropdownItem from "./LuiDropdownItem.vue";
import LuiButton from "../Button/LuiButton.vue";
import { useOutsideClick } from "../../composables/useOutsideClick";
import { useFindProperPosition } from "../../composables/useFindProperPosition";
import { useId } from "../../utils/useId";
import { Variant, Filter, Rounded, Block, Color, Size } from "@/globals/types";

// type Options = null | string[];
// type Label = null | string;

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
// const props = defineProps<{
//   options?: string[];
// }>();
console.log(props);

const emit = defineEmits(["onTrigger"]);
const luiDropdownWrapper = ref<HTMLDivElement | null>(null);
const luiDropdownButton = ref<InstanceType<typeof LuiButton> | null>(null);
const LuiDropdownMenu = ref<HTMLUListElement | null>(null);
const menuActive = ref(false);
const buttonId = `lui-dropdown-button-${useId()}`;
const menuId = `lui-dropdown-menu-${useId()}`;

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
// function openMenu() {
//   menuActive.value = !menuActive.value;
//   emit("onTrigger", menuActive.value);
// }
// function toggleMenu() {
//   toogleMenu();
// }
function handleMenuKeyEvents(event: KeyboardEvent) {}
function handleButtonKeyEvents(event: KeyboardEvent) {
  console.log(event);
  switch (event.code) {
    case "ArrowDown":
    case "Enter":
    case "Space":
      // code block
      event.preventDefault();
      openMenu();
      break;
    case "Control":
      // code block
      break;
    default:
    // code block
  }
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
        ref="LuiDropdownMenu"
        :aria-labelledby="buttonId"
        aria-activedescendant="current-active-item"
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
