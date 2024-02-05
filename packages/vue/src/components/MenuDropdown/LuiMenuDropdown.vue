<script lang="ts">
export default {
  name: 'LuiDropdown',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, h, nextTick, reactive, ref, toRefs, useSlots, watch } from 'vue'
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/vue'
import type { PropType } from 'vue'
import type { Placement } from '@floating-ui/vue'

import LuiButton from '../Button/LuiButton.vue'
import { useMenuStyles, useOutsideClick } from '../../composables'

import { useId } from '../../utils/useId'
import type { Block, Color, Filter, MenuClasses, Rounded, Size, Variant } from '../../globals/types'
import type { TwClassInterface } from '../../globals/interfaces'
import LuiPortal from '../Portal/LuiPortal.vue'

interface IMenuItems {
  disabled?: boolean
}
interface IMenuState {
  items: IMenuItems[]
  currentIndex: number
  currentId: string
}
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
    default: '',
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-end',
  },
  variant: {
    type: String as PropType<Variant>,
    default: 'solid',
  },
  color: {
    type: String as PropType<Color>,
    default: 'primary',
  },
  filter: {
    type: String as PropType<Filter>,
    default: 'none',
  },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
  block: {
    type: Boolean as PropType<Block>,
    default: false,
  },
  menuClasses: {
    type: [String, Array] as PropType<MenuClasses>,
    default: '',
  },
  teleport: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  open: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})

const emit = defineEmits(['onTrigger', 'update:open'])
const slots = useSlots()
// VARIABLES
const luiDropdownWrapper = ref<HTMLElement>()
const luiDropdownTrigger = ref<HTMLDivElement | undefined>()
const luiDropdownMenu = ref<HTMLElement>()
const menuActive = ref(false)
const buttonId = `lui-dropdown-button-${useId()}`
const menuId = `lui-dropdown-menu-${useId()}`

const menuState = reactive<IMenuState>({
  items: [],
  currentIndex: 0,
  currentId: '',
})

const { classes: defaultMenuClasses } = useMenuStyles({ ...toRefs(props) })
const { floatingStyles, middlewareData } = useFloating(luiDropdownTrigger, luiDropdownMenu, {
  placement: props.placement,
  middleware: [offset(6), flip(), shift()],
  whileElementsMounted: autoUpdate,
  transform: false,
})

watch(
  () => props.open,
  (val) => {
    if (val !== menuActive.value) {
      menuActive.value = val
      emit('onTrigger', val)
    }
  },
  { immediate: true },
)
const dropdownWrapperClasses = computed(() => {
  const classes: TwClassInterface = {
    position: 'relative',
    letterSpacing: 'leading-3',
    width: props.block ? 'w-full' : 'w-fit',
  }
  return Object.values({ ...classes })
})

const defaultButtonProps = computed(() => ({
  color: props.color,
  block: props.block,
  rounded: props.rounded,
  size: props.size,
  variant: props.variant,
  filter: props.filter,
}))

// METHODS
useOutsideClick(luiDropdownTrigger, () => closeMenu())
function closeMenu() {
  menuActive.value = false
  emit('onTrigger', menuActive.value)
  emit('update:open', menuActive.value)
}

function openMenu() {
  menuActive.value = true
  emit('onTrigger', menuActive.value)
  emit('update:open', menuActive.value)
}

function toogleMenu() {
  menuActive.value = !menuActive.value
  emit('onTrigger', menuActive.value)
  emit('update:open', menuActive.value)
}

(function setInitialState() {
  const slotProps
    = slots.default
    && slots
      .default()
      .map((slot: any) =>
        slot.type.toString() === 'Symbol(Fragment)'
          ? slot.children.map((child: any) => child.props)
          : slot.props,
      )
      .flat()
  if (slotProps && slotProps.length)
    menuState.items = slotProps
})()

function handleMenuKeyEvents(event: KeyboardEvent) {
  switch (event.code) {
    case 'ArrowDown':
      event.preventDefault()
      focusAvailableElement(luiDropdownMenu.value, i => i + 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusAvailableElement(luiDropdownMenu.value, i => i - 1)
      break
    case 'Enter':
      {
        event.preventDefault()
        event.stopPropagation()
        const currentEl = luiDropdownMenu.value?.children[menuState.currentIndex]
        ;(currentEl as HTMLElement).click()
        // updateSelectedOption(menuState.items[menuState.currentIndex]);
        // closeListBox();
        // nextTick(() => focusButton());
      }

      break
    case 'Home':
      event.preventDefault()
      focusAvailableElement(luiDropdownMenu.value, i => i + 1, 0)
      break
    case 'End':
      event.preventDefault()
      {
        const last = menuState.items.length - 1
        focusAvailableElement(luiDropdownMenu.value, i => i - 1, last)
      }

      break
    case 'Escape':
      event.preventDefault()
      closeMenu()
      // closeListBox();
      // nextTick(() => focusButton());
      break
    case 'Tab':
      event.preventDefault()
      event.stopPropagation()
      break
    default:
  }
}

function handleButtonKeyEvents(event: KeyboardEvent) {
  switch (event.code) {
    case 'ArrowDown':
    case 'Enter':
    case 'Space':
      event.preventDefault()
      openMenu()
      focusAvailableElement(luiDropdownMenu.value, i => i + 1, 0)
      break
    case 'Control':
      // code block
      break
    default:
    // code block
  }
}

function focusAvailableElement(
  el: any,
  oparation: (i: number) => number,
  initial: number | null = null,
) {
  const isTargetExist = (index: number) => index >= 0 && index <= menuState.items.length - 1
  const isTargetFocusable = (targetIndex: number) =>
    menuState.items[targetIndex]?.disabled === undefined
    || menuState.items[targetIndex]?.disabled === false

  let targetIndex = menuState.currentIndex
  if (initial !== null)
    targetIndex = initial
  else targetIndex = oparation(targetIndex)

  if (!isTargetExist(targetIndex))
    return

  while (!isTargetFocusable(targetIndex)) {
    targetIndex = oparation(targetIndex)
    if (!isTargetExist(targetIndex))
      return
  }
  menuState.currentIndex = targetIndex
  const currentEl = el?.children[menuState.currentIndex]
  if (currentEl?.id !== undefined) {
    menuState.currentId = currentEl?.id
    nextTick(() => currentEl?.focus({ preventScroll: true }))
  }
}

function triggerIconSize(size: Size) {
  return size === 'xs' ? '12' : size === 'sm' ? '16' : size === 'xl' ? '24' : '20'
}
function ArrowDownIcon() {
  return h(
    'svg',
    {
      viewBox: '0 0 12 12',
      fill: 'currentColor',
      width: triggerIconSize(props.size),
      height: triggerIconSize(props.size),
    },
    [
      h('path', {
        fill: 'white',
        d: 'M5.99999 6.58599L8.47499 4.11099L9.18199 4.81799L5.99999 7.99999L2.81799 4.81799L3.52499 4.11099L5.99999 6.58599Z',
      }),
    ],
  )
}

const isMenuActive = computed(() => menuActive.value && !middlewareData.value.hide?.referenceHidden)

</script>

<template>
  <div ref="luiDropdownWrapper" class="lui-menu-dropdown" :class="dropdownWrapperClasses">
    <div ref="luiDropdownTrigger" class="trigger-wrapper cursor-pointer">
      <slot
        :id="buttonId"
        name="trigger"
        type="button"
        aria-haspopup="true"
        :aria-expanded="menuActive"
        :aria-controls="menuId"
        tabindex="0"
        @click="toogleMenu"
        @keydown="handleButtonKeyEvents"
      >
        <LuiButton
          :id="buttonId"
          type="button"
          aria-haspopup="true"
          :aria-expanded="menuActive"
          :aria-controls="menuId"
          v-bind="defaultButtonProps"
          @click="toogleMenu"
          @keydown="handleButtonKeyEvents"
        >
          <template #prepend>
            <slot name="prepend" />
          </template>
          {{ text }}
          <template #append>
            <slot name="append">
              <ArrowDownIcon />
            </slot>
          </template>
        </LuiButton>
      </slot>
    </div>
    <LuiPortal
      name="dropdown"
      :is-active="teleport"
    >
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isMenuActive"
          :id="menuId"
          ref="luiDropdownMenu"
          :class="menuClasses.length ? menuClasses : defaultMenuClasses"
          :style="floatingStyles"
        >
          <ul
            role="menu"
            :aria-labelledby="buttonId"
            :aria-activedescendant="String(menuState.currentIndex)"
            tabindex="0"
            :class="size === 'xs' || size === 'sm' ? 'p-1.5' : size === 'md' ? 'p-2' : 'p-2.5'"
            @keydown="handleMenuKeyEvents"
          >
            <slot />
          </ul>
        </div>
      </transition>
    </LuiPortal>
  </div>
</template>
