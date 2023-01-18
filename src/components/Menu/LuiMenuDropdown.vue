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
import type {
  Variant,
  Filter,
  Rounded,
  Block,
  Color,
  Size,
} from "@/globals/types";
import type { TwClassInterface } from "@/globals/interfaces";
type MenuItems = {
  disabled?: boolean;
};
type MenuStateType = {
  items: MenuItems[];
  currentIndex: number;
  currentId: string;
};
type Position =
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";
// Props
// Emits
// Reactive Variables(inc composables)
// Computed
// Methods
// Watchers
// Lifescycle hooks
// Expose (define expose)
const props = defineProps({
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

const emit = defineEmits(["onTrigger"]);
const slots = useSlots();
// VARIABLES
const luiDropdownWrapper = ref<HTMLElement>();
const luiDropdownButton = ref<InstanceType<typeof LuiButton>>();
const luiDropdownMenu = ref<HTMLUListElement>();
const menuActive = ref(false);
const buttonId = `lui-dropdown-button-${useId()}`;
const menuId = `lui-dropdown-menu-${useId()}`;
const menuState: MenuStateType = reactive({
  items: [],
  currentIndex: 0,
  currentId: "",
});
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
const { properPosition } = useFindProperPosition(luiDropdownWrapper);
// COMPUTEDS
const computedMenuPosition = computed(() => {
  return positionClasses[props.menuPosition].direction === properPosition.value
    ? positionClasses[props.menuPosition].classes
    : positionClasses[props.menuPosition].oppositeClasses;
});

const dropdownMenuClasses = computed(() => {
  const optionsWrapper: TwClassInterface = {
    position: "absolute",
    width: "w-max",
    zIndex: "z-[999]",
    backgroundColor: "bg-secondary-50 dark:bg-secondary-900",
    borderWidth: "border",
    borderColor: "border-secondary-200 dark:border-secondary-700",
    borderRadius: {
      "rounded-md": props.rounded === true,
      "rounded-2xl": props.rounded === "full",
    },
    padding: {
      "p-1.5": props.size === "xs" || props.size === "sm",
      "p-2": props.size === "md",
      "p-2.5": props.size === "lg" || props.size === "xl",
    },
    boxShadow: "shadow-lg",
    bottom: properPosition.value == "top" ? "bottom-full" : "",
    top: properPosition.value == "bottom" ? "top-full" : "",
    margin: properPosition.value == "bottom" ? "mt-2" : "mb-2",
    space:
      props.size === "xs" || props.size === "sm" ? "space-y-1.5" : "space-y-2",
  };
  return Object.values({ ...optionsWrapper });
});

const defaultButtonProps = computed(() => ({
  color: props.color,
  block: props.block,
  rounded: props.rounded,
  size: props.size,
  variant: props.variant,
  filter: props.filter,
}));

// METHODS

useOutsideClick(luiDropdownWrapper, () => closeMenu());

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
  if (slotProps && slotProps.length) {
    menuState.items = slotProps;
  }
})();

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
          luiDropdownMenu.value?.children[menuState.currentIndex];
        (currentEl as HTMLElement).click();
        // updateSelectedOption(menuState.items[menuState.currentIndex]);
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
        const last = menuState.items.length - 1;
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
  el: any,
  oparation: (i: number) => number,
  initial: number | null = null
) {
  const isTargetExist = (index: number) =>
    index >= 0 && index <= menuState.items.length - 1;
  const isTargetFocusable = (targetIndex: number) =>
    menuState.items[targetIndex]?.disabled === undefined ||
    menuState.items[targetIndex]?.disabled === false;

  let targetIndex = menuState.currentIndex;
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

  menuState.currentIndex = targetIndex;
  const currentEl = el?.children[menuState.currentIndex];
  if (currentEl?.id !== undefined) {
    menuState.currentId = currentEl?.id;
    nextTick(() => currentEl?.focus({ preventScroll: true }));
  }
}

function triggerIconSize(size: string) {
  return size === "xs"
    ? "12"
    : size === "sm"
    ? "16"
    : size === "xl"
    ? "24"
    : "20";
}
</script>
<template>
  <div ref="luiDropdownWrapper" class="relative leading-3 w-fit">
    <div ref="luiDropdownButton" class="trigger-wrapper cursor-pointer">
      <slot
        name="trigger"
        :id="buttonId"
        type="button"
        aria-haspopup="true"
        :aria-expanded="menuActive"
        :aria-controls="menuId"
        @click="toogleMenu"
        @keydown="handleButtonKeyEvents"
      >
        <lui-button
          :id="buttonId"
          type="button"
          aria-haspopup="true"
          :aria-expanded="menuActive"
          :aria-controls="menuId"
          @click="toogleMenu"
          @keydown="handleButtonKeyEvents"
          v-bind="defaultButtonProps"
        >
          <!-- <template #prepend>
            <slot name="triggerPrepend" />
          </template> -->
          {{ text }}
          <template #append>
            <slot name="triggerAppend">
              <svg
                viewBox="0 0 12 12"
                :width="triggerIconSize(size)"
                :height="triggerIconSize(size)"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99999 6.58599L8.47499 4.11099L9.18199 4.81799L5.99999 7.99999L2.81799 4.81799L3.52499 4.11099L5.99999 6.58599Z"
                  fill="white"
                />
              </svg>
            </slot>
          </template>
        </lui-button>
      </slot>
    </div>

    <!-- <lui-button
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
    </lui-button> -->
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
        :aria-activedescendant="String(menuState.currentIndex)"
        tabindex="0"
        v-show="menuActive"
        :class="[computedMenuPosition, dropdownMenuClasses]"
        @keydown="handleMenuKeyEvents"
      >
        <slot />
      </ul>
    </transition>
  </div>
</template>
