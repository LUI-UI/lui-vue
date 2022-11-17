<script lang="ts">
export default {
  name: "LuiDropdown",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { onMounted, onUnmounted, PropType, ref } from "vue";
import type { ComponentPublicInstance, Ref } from "vue";
import LuiDropdownItem from "./LuiDropdownItem.vue";
import LuiButton from "../Button/LuiButton.vue";
import {
  Variant,
  Filter,
  Rounded,
  Block,
  Icon,
  Color,
  Size,
} from "@/globals/types";
import { nextTick } from "process";

type Options = null | string[];
type Label = null | string;

const props = defineProps({
  options: {
    type: [Array, null] as PropType<Options>,
    default: null,
  },
  label: {
    type: [String, null] as PropType<Label>,
    default: null,
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
  prepend: {
    type: [String, Object] as PropType<Icon>,
    default: "none",
  },
  append: {
    type: [String, Object] as PropType<Icon>,
    default: "none",
  },
  icon: {
    type: [String, Object] as PropType<Icon>,
    default: "none",
  },
});
// const props = defineProps<{
//   options?: string[];
// }>();
console.log(props);

const emit = defineEmits(["onSelect", "onTrigger"]);
// const luiDropdownButton = ref<HTMLInputElement | null>(null);
const luiDropdownButton = ref<InstanceType<typeof LuiButton> | null>(null);
const luiDropdownWrapper = ref<HTMLInputElement | null>(null);
const LuiDropdownMenu = ref<HTMLInputElement | null>(null);
const menuActive = ref(false);

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});
onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
function closeDropdown(e: any) {
  // if (!luiDropdownButton?.value?.contains(e.target)) {
  if (!luiDropdownButton?.value?.$el.contains(e.target)) {
    menuActive.value = false;
  }
}

// function findProperMenuPosition() {
//   if (
//     luiDropdownWrapper.value !== undefined &&
//     luiDropdownWrapper?.value?.getBoundingClientRect() !== undefined
//   ) {
//     // eslint-disable-next-line no-unsafe-optional-chaining
//     const { y, bottom } = luiDropdownWrapper?.value?.getBoundingClientRect();
//     const innerHeight = window.innerHeight;
//     return innerHeight - bottom >= y ? "bottom" : "top";
//   }
//   return "bottom";
// }
function openMenu() {
  menuActive.value = !menuActive.value;
  emit("onTrigger", menuActive.value);
}
function handleButtonClick() {
  openMenu();
  // LuiDropdownMenu.value?.childNodes[0]
  nextTick(() => {
    dom(LuiDropdownMenu)?.focus({ preventScroll: true });
  });
  // console.log(
  //   "withDomFn: "e,
  //   dom(LuiDropdownMenu)?.focus({ preventScroll: true })
  // );
}

function handleButtonKeyEvents(event: KeyboardEvent) {
  console.log(event);
  switch (event.code) {
    case "ArrowDown":
    case "Enter":
    case "Space":
      // code block
      console.log("just clicked the key!");
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

// import { Ref, ComponentPublicInstance } from "vue";

function dom<T extends Element | ComponentPublicInstance>(
  ref?: Ref<T | null>
): T | null {
  if (ref == null) return null;
  if (ref.value == null) return null;

  return (ref.value as { $el?: T }).$el ?? ref.value;
}
</script>
<template>
  <div ref="luiDropdownWrapper" class="relative leading-3">
    <lui-button
      id="menubutton"
      ref="luiDropdownButton"
      type="button"
      aria-haspopup="true"
      aria-controls="menu2"
      :append="append"
      :block="block"
      @click="handleButtonClick"
      @keydown="handleButtonKeyEvents"
    >
      <span v-if="label !== null">{{ label }}</span>
      <slot v-else name="button" />
    </lui-button>
    <!-- <button
      id="menubutton"
      ref="luiDropdownButton"
      type="button"
      aria-haspopup="true"
      aria-controls="menu2"
      @click="handleButtonClick"
    >
      <span v-if="label !== null">{{ label }}</span>
      <slot v-else name="button" />
    </button> -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        id="menu2"
        role="menu"
        aria-labelledby="menubutton"
        ref="LuiDropdownMenu"
        v-show="menuActive"
        class="p-2 bg-white rounded-lg border border-secondary-200 w-max absolute top-full mt-2"
      >
        <template v-if="options !== undefined">
          <LuiDropdownItem
            v-for="(option, index) in options"
            :key="index"
            @click="emit('onSelect', option)"
          >
            {{ option }}
          </LuiDropdownItem>
        </template>
        <template v-else>
          <!-- <slot /> -->
          <LuiDropdownItem>
            Accessible Rich Internet Application Specification ?
          </LuiDropdownItem>
          <LuiDropdownItem> Lorem, ipsum. </LuiDropdownItem>
          <LuiDropdownItem> Lorem ipsum dolor sit. </LuiDropdownItem>
        </template>
      </ul>
    </transition>
  </div>
</template>
