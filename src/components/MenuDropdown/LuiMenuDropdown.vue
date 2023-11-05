<script lang="ts">
export default {
  name: 'LuiDropdown',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { Teleport as TeleportComp, computed, h, nextTick, reactive, ref, toRefs, useSlots } from 'vue'
import type { PropType } from 'vue'
import LuiButton from '../Button/LuiButton.vue'
import { useMenuStyles, useOutsideClick, useTeleportWrapper } from '../../composables'

// import { useMenuPositionStyles } from '../../composables/useMenuPositionStyles'
import { useId } from '../../utils/useId'
import type { Block, Color, Filter, Position, Rounded, Size, Variant } from '@/globals/types'
import type { TwClassInterface } from '@/globals/interfaces'

interface MenuItems {
  disabled?: boolean
}
interface MenuStateType {
  items: MenuItems[]
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
  menuPosition: {
    type: String as PropType<Position>,
    default: 'bottomLeft',
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
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  teleport: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})

const emit = defineEmits(['onTrigger'])
const slots = useSlots()
// VARIABLES
const luiDropdownWrapper = ref<HTMLElement>()
const luiDropdownTrigger = ref<HTMLDivElement>()
const luiDropdownMenu = ref<HTMLElement | null>(null)
const menuActive = ref(false)
const buttonId = `lui-dropdown-button-${useId()}`
const menuId = `lui-dropdown-menu-${useId()}`

const menuState: MenuStateType = reactive({
  items: [],
  currentIndex: 0,
  currentId: '',
})
const teleportId = useTeleportWrapper('dropdown')

const { classes: menuClasses, styles: menuStyles } = useMenuStyles({ ...toRefs(props), triggerEl: luiDropdownWrapper, menuEl: luiDropdownMenu })

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
}

function openMenu() {
  menuActive.value = true
  emit('onTrigger', menuActive.value)
}

function toogleMenu() {
  menuActive.value = !menuActive.value
  emit('onTrigger', menuActive.value)
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
      h('path',
        {
          fill: 'white',
          d: 'M5.99999 6.58599L8.47499 4.11099L9.18199 4.81799L5.99999 7.99999L2.81799 4.81799L3.52499 4.11099L5.99999 6.58599Z',
        }),
    ],
  )
}
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
              <!-- <svg
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
              </svg> -->
            </slot>
          </template>
        </LuiButton>
      </slot>
    </div>
    <component
      :is="teleport ? TeleportComp : 'div'"
      v-bind="teleport ? { to: `#${teleportId}` } : undefined"
    >
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0 "
      >
        <div
          v-show="menuActive"
          :id="menuId"
          ref="luiDropdownMenu"
          :class="menuClasses"
          :style="menuStyles"
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
    </component>
  </div>
</template>
