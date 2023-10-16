<script setup lang="ts">
import type { PropType } from 'vue'
import {
  Fragment, Teleport as TeleportComp, computed, h, nextTick, provide, reactive, ref, toRef, toRefs, useAttrs, useSlots, watch,
} from 'vue'
import type { Block, Color, Description, Filter, NarrowedVariant, Position, Rounded, Size, State, StateIcon } from '../../globals/types'
import type {
  ListboxStateType,
  ModelValue,
  ModelValueObject,
  OptionsType,
} from '../Select/select-types'
import type { TwClassInterface } from '../../globals/interfaces'
import { ContextKey } from '../Select/symbols'

// import { useProperPosition } from '../../composables/useProperPosition'
import { useOutsideClick } from '../../composables/useOutsideClick'
import { useInputClasses } from '../Input/composables/index'
import { useTeleportWrapper } from '../../composables/useTeleportWrapper'
import { useMenuStyles } from '../../composables/useMenuStyles'
import { useId } from '../../utils/useId'
import { isElementScrollable } from '../../utils/isElementScrollable'
import { hasSlotContent } from '../../utils/hasSlotContent'

// import LuiBadge from '../Badge/LuiBadge.vue'
import LuiOption from '../Option/LuiOption.vue'
import LuiTag from '../Tag/LuiTag.vue'

type MultiModelValueType = string[] | ModelValueObject[]
interface ITagProps {
  variant?: NarrowedVariant
  color?: Color
  filter?: Filter
  size?: Size
  rounded?: Rounded
  closeIcon?: boolean

}
const props = defineProps({
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: true,
  },
  block: {
    type: Boolean as PropType<Block>,
    default: false,
  },
  state: {
    type: [String, Boolean, null] as PropType<State>,
    default: null,
  },
  tagProps: {
    type: Object as PropType<ITagProps>,
  },
  stateIcon: {
    type: [Boolean] as PropType<StateIcon>,
    default: null,
  },
  options: {
    type: Array as PropType<OptionsType[]>,
    default: () => [],
  },
  placeholder: {
    type: String as PropType<string>,
    default: '',
  },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  description: {
    type: [String, null] as PropType<Description>,
    default: null,
  },
  searchable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  tags: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  menuClasses: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  hideAppend: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  menuPosition: {
    type: String as PropType<Position>,
    default: 'bottomLeft',
  },
  teleport: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  modelValue: {
    type: [Array, undefined] as PropType<MultiModelValueType | undefined>,
    default: undefined,
  },
})
const emit = defineEmits(['update:modelValue', 'change'])
const slots = useSlots()
const attrs = useAttrs()

const errorMessages = {
  type: {
    modelValue: 'Wrong type for modelValue, typeof of modelValue should be string',
  },
  missing: {
    options: 'Options missing: should use options prop or LuiOption component as slot',
  },
}
let isFirstUpdate = true
const optionsActive = ref(false)
const selectedOptions = ref<string[]>([])
const searchQuery = ref<string>('')
const wrapperRef = ref<HTMLDivElement>()
const searchRef = ref<HTMLInputElement>()
const optionsRef = ref<HTMLUListElement>()
const isPlaceholderHolderDelete = ref<boolean>(false)
const optionsId = `lui-multiselect-wrapper-${useId()}`
const listboxState: ListboxStateType = reactive({
  items: [],
  currentIndex: 0,
  currentId: '',
})
const teleportId = useTeleportWrapper('multi-select')
nextTick(() => {
  if (isOptionsValid()) {
    setState()
    setInitialSelectedOption()
  }
  else {
    throw new Error(errorMessages.missing.options)
  }
})

provide(ContextKey, {
  selectedOption: selectedOptions,
  updateSelectedOption: updateSelectedOptions,
  focusButton: focusTrigger,
  currentId: toRef(listboxState, 'currentId'),
})

const { appendClasses, prependClasses } = useInputClasses(toRefs(props), attrs)
// type TargetPositionType = 'bottom' | 'top'
// function setTargetPosition(): TargetPositionType {
//   const positionLowerCase = props.menuPosition.toLowerCase()
//   return positionLowerCase.includes('bottom') ? 'bottom' : 'top'
// }
// const { properPosition } = useProperPosition({
//   triggerEl: wrapperRef,
//   menuEl: optionsRef,
//   targetPosition: setTargetPosition(),
// })
const { classes: menuClasses, styles: menuStyles } = useMenuStyles({ ...toRefs(props), triggerEl: wrapperRef, menuEl: optionsRef })

useOutsideClick(wrapperRef, () => {
  searchQuery.value = ''
  closeOptions()
  if (props.placeholder !== '' && !selectedOptions.value.length)
    isPlaceholderHolderDelete.value = false
})

watch(
  () => props.modelValue,
  (value) => {
    if (value && isModelValueValid())
      selectedOptions.value = parseModelValue(value)
  },
)
const isValueUsing = computed(() => listboxState.items.length > 0 && typeof listboxState.items[0] !== 'string' && listboxState.items[0]?.value !== undefined && listboxState.items[0].value.length > 0)
const selectedOptionsAsText = computed(() =>
  isValueUsing.value
    ? selectedOptions.value.map((option) => {
      const item = listboxState.items.find(item => item.value === option)
      return item.text
    })
    : selectedOptions.value)
const searchedOptions = computed(() => {
  return [...props.options].filter((option: any) => {
    const optionAsString = typeof option !== 'string' ? option.text : option
    return searchQuery.value
      .toLocaleLowerCase()
      .split(' ')
      .every(q => optionAsString.toLocaleLowerCase().includes(q))
  })
})
const targetItems = computed(() => (props.searchable ? searchedOptions.value : listboxState.items))
const iconStatus = computed(() =>
  !props.hideAppend
    ? slots.prepend
      ? 'twoIcon'
      : 'rightIcon'
    : slots.prepend
      ? 'leftIcon'
      : 'noIcon',
)
// const optionWrapperClasses = computed(() => {
//   const optionsWrapper: TwClassInterface = {
//     position: 'absolute',
//     zIndex: 'z-50',
//     maxHeight: 'max-h-96',
//     minWidth: 'min-w-full',
//     overflow: 'overflow-y-auto',
//     backgroundColor: 'bg-secondary-50 dark:bg-secondary-900',
//     borderWidth: 'border',
//     borderColor: 'border-secondary-200 dark:border-secondary-700',
//     borderRadius: {
//       'rounded-md': props.rounded === true,
//       'rounded-2xl': props.rounded === 'full',
//     },
//     boxShadow: 'shadow-lg',
//     bottom: properPosition.value === 'top' ? 'bottom-full' : '',
//     top: properPosition.value === 'bottom' ? 'top-full' : '',
//     margin: properPosition.value === 'bottom' ? 'mt-2' : 'mb-2',
//     space: props.size === 'xs' || props.size === 'sm' ? 'space-y-0.5' : 'space-y-0.5',
//   }
//   return Object.values({ ...optionsWrapper })
// })
const triggerClasses = computed(() => {
  const classes: TwClassInterface = {
    space: props.size === 'xs' || props.size === 'sm' ? 'space-y-0.5' : 'space-y-0.5',
    peer: 'peer',
    width: 'w-full',
    minHeight: {
      'min-h-[32px]': props.size === 'xs',
      'min-h-[36px]': props.size === 'sm',
      'min-h-[42px]': props.size === 'md',
      'min-h-[50px]': props.size === 'lg',
      'min-h-[58px]': props.size === 'xl',
    },
    fontSize: {
      'text-xs': props.size === 'xs',
      'text-sm': props.size === 'sm',
      'text-base': props.size === 'md',
      'text-lg': props.size === 'lg',
      'text-xl': props.size === 'xl',
    },
    textColor: !props.disabled
      ? 'text-secondary-600 dark:text-secondary-300'
      : 'dark:disabled:text-secondary-700',
    backgroundColor: !props.disabled
      ? 'bg-secondary-50 dark:bg-secondary-900'
      : 'bg-secondary-100 dark:bg-secondary-800',
    outlineStyle: 'outline-none',
    borderWidth: 'border',
    borderStyle: 'border-solid',
    borderColor: {
      'disabled:border-secondary-200': props.disabled,
      'border-secondary-200 focus:border-primary-500 focus-within:border-primary-500':
        props.state === null,
      'border-warning-500': props.state === 'warning',
      'border-danger-500': props.state === false,
      'border-success-500': props.state === true,
    },
    ringWidth:
      attrs.disabled !== undefined && attrs.disabled === true
        ? 'ring-0'
        : props.state === null
          ? 'focus:ring-4 focus-within:ring-4'
          : 'ring-4',
    ringColor: {
      'focus:ring-primary-500/40 focus-within:ring-primary-500/40': props.state === null,
      'ring-warning-500/40': props.state === 'warning',
      'ring-danger-500/40': props.state === false,
      'ring-success-500/40': props.state === true,
    },
    borderRadius: {
      'rounded-lg': props.rounded === true,
      'rounded-full': props.rounded === 'full',
    },
    pointerEvents: props.disabled ? 'pointer-events-none' : '',
    padding:
      iconStatus.value === 'noIcon'
        ? {
            'py-1 px-1.5': props.size === 'xs',
            'py-1.5 px-2': props.size === 'sm',
            'py-2 px-2.5': props.size === 'md',
            'py-2.5 px-2.5': props.size === 'lg',
            'py-3.5 px-3': props.size === 'xl',
          }
        : iconStatus.value === 'rightIcon'
          ? {
              'py-1 pl-1.5 pr-6': props.size === 'xs',
              'py-1.5 pl-2 pr-8': props.size === 'sm',
              'py-2 pl-2.5 pr-10': props.size === 'md',
              'py-2.5 pl-2.5 pr-10': props.size === 'lg',
              'py-3.5 pl-3 pr-12': props.size === 'xl',
            }
          : iconStatus.value === 'twoIcon'
            ? {
                'py-1 px-6': props.size === 'xs',
                'py-1.5 px-8': props.size === 'sm',
                'py-2 px-10': props.size === 'md',
                'py-2.5 px-10': props.size === 'lg',
                'py-3.5 px-12': props.size === 'xl',
              }
            : {
                // leftIcon
                'py-1 pr-1.5 pl-6': props.size === 'xs',
                'py-1.5 pr-2 pl-8': props.size === 'sm',
                'py-2 pr-2.5 pl-10': props.size === 'md',
                'py-2.5 pr-2.5 pl-10': props.size === 'lg',
                'py-3.5 pr-3 pl-12': props.size === 'xl',
              },
  }
  return Object.values({ ...classes })
})
const wrapperClasses = computed(() => {
  const classes: TwClassInterface = {
    maxWidth: !props.block ? 'max-w-[400px]' : '',
    cursor: props.disabled ? 'cursor-not-allowed' : '',
  }
  return Object.values({ ...classes })
  // const [block ? 'w-full' : 'max-w-[400px]', props.disabled ? 'cursor-not-allowed' : '']
})
function focusAvailableElement(
  el: HTMLElement | undefined,
  oparation: (i: number) => number,
  initial: number | null = null,
) {
  const isTargetExist = (index: number) => index >= 0 && index <= targetItems.value.length - 1
  const isTargetFocusable = (targetIndex: number) => {
    const target = targetItems.value[targetIndex]
    return target?.disabled === undefined || target?.disabled === false
  }
  let targetIndex = listboxState.currentIndex
  // set target
  if (initial !== null)
    targetIndex = initial

  else
    targetIndex = oparation(targetIndex)

  if (!isTargetExist(targetIndex))
    return
  while (!isTargetFocusable(targetIndex)) {
    targetIndex = oparation(targetIndex)
    if (!isTargetExist(targetIndex))
      return
  }
  listboxState.currentIndex = targetIndex
  const currentEl = el?.children[listboxState.currentIndex]
  listboxState.currentId = currentEl?.id as string
  nextTick(() => {
    // ;(currentEl as HTMLElement)?.focus({ preventScroll: true })
    if (isElementScrollable(optionsRef.value as HTMLElement)) {
      handleScrollVisibility(
        optionsRef.value?.children[listboxState.currentIndex] as HTMLElement,
        optionsRef.value as HTMLElement,
      )
    }
  })
}
function handleKeydownEvents(event: KeyboardEvent) {
  switch (event.code) {
    case 'ArrowDown':
      event.preventDefault()
      focusAvailableElement(optionsRef.value, i => i + 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusAvailableElement(optionsRef.value, i => i - 1)
      break
    case 'Enter':
      event.preventDefault()
      event.stopPropagation()
      updateSelectedOptions(targetItems.value[listboxState.currentIndex])
      break
    case 'Home':
      event.preventDefault()
      focusAvailableElement(optionsRef.value, i => i + 1, 0)
      break
    case 'End':
      event.preventDefault()
      {
        const last = targetItems.value.length - 1
        focusAvailableElement(optionsRef.value, i => i - 1, last)
      }

      break
    case 'Escape':
      event.preventDefault()
      closeListBox()
      nextTick(() => focusTrigger())
      break
    case 'Tab':
      event.preventDefault()
      event.stopPropagation()
      break
    default:
  }
}
function triggerKeydown(event: KeyboardEvent) {
  const isFirstPress = !optionsActive.value
  switch (event.code) {
    case 'ArrowDown':
    case 'ArrowUp':
    case 'Enter':
    case 'Space':

      event.preventDefault()
      if (!optionsActive.value)
        toggleOptions()

      if (!isFirstPress)
        handleKeydownEvents(event)
      break
    case 'Backspace': {
      const isPlaceholderUsing = props.placeholder.length > 0
      const isAnySelectedOption = selectedOptions.value.length
      const isSearhQueryEmpty = !searchQuery.value
      if (isPlaceholderUsing && isAnySelectedOption && isSearhQueryEmpty) {
        const lastIndex = selectedOptions.value.length - 1
        updateSelectedOptions(selectedOptions.value[lastIndex])
      }
      if (!isAnySelectedOption && !searchQuery.value)
        isPlaceholderHolderDelete.value = true

      break
    }
    default:
    // code block
  }
}
function optionsKeydown(event: KeyboardEvent) {
  handleKeydownEvents(event)
}
function optionProps(option: string | object) {
  const commonProps = {
    size: props.size,
    rounded: props.rounded,
  }
  return typeof option === 'string'
    ? { text: option, ...commonProps }
    : { ...option, ...commonProps }
}
function closeOptions() {
  optionsActive.value = false
}
function updateSelectedOptions(option: ModelValue) {
  console.log('option', option)
  if (option === undefined)
    return
  const optionText = typeof option !== 'string' ? option.text : option
  const optionValue = typeof option == 'string' ? option : option.value !== '' ? option.value : option.text
  const currentOption = isValueUsing.value ? optionValue : optionText

  if (!selectedOptions.value.includes(currentOption as string)) {
    selectedOptions.value.push(currentOption as string)
  }
  else {
    const index = selectedOptions.value.findIndex(option => option === currentOption)
    selectedOptions.value.splice(index, 1)
  }
  emit('update:modelValue', selectedOptions.value)
  if (!isFirstUpdate)
    emit('change', selectedOptions.value)
  if (isFirstUpdate)
    isFirstUpdate = false
  if (props.searchable) {
    searchQuery.value = ''
    searchRef.value?.focus()
    listboxState.currentIndex = targetItems.value.findIndex(i =>
      typeof i !== 'string' ? i.text === optionText : i === optionText,
    )
  }
  console.log('selectedOptions.value:', selectedOptions.value)
}
function focusTrigger() {
  if (wrapperRef.value)
    wrapperRef.value.focus()
}
function closeListBox() {
  optionsActive.value = false
}
function toggleOptions() {
  optionsActive.value = !optionsActive.value
}
function arrowIconSize(size: string) {
  return size === 'xs' ? '12' : size === 'sm' ? '16' : size === 'xl' ? '24' : '20'
}
function handleScrollVisibility(activeElement: HTMLElement, scrollParent: HTMLElement) {
  const { offsetHeight, offsetTop } = activeElement
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent

  const marginBetweenOptions = 8
  const isAbove = offsetTop < scrollTop
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight

  if (isAbove)
    scrollParent.scrollTo(0, offsetTop - marginBetweenOptions)

  else if (isBelow)
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight + marginBetweenOptions)
}
function getOptionSlotsOptions() {
  const isLuiOption = (slot: any) => slot?.type.name !== undefined && slot.type.name === 'LuiOption'
  const options
    = slots.default
    && slots
      .default()
      .map((slot: any) =>
        isLuiOption(slot)
          ? slot.props
          : slot.type === Fragment
            ? slot.children.map((child: any) => (isLuiOption(child) ? child.props : null))
            : null,
      )
      .flat()
      .filter(o => o !== null)
  return options
}
function setState() {
  const slotsOptions = getOptionSlotsOptions()
  let allOptions = [...props.options].concat(slotsOptions || [])
  if (props.placeholder !== '') {
    allOptions = [
      { text: props.placeholder, value: props.placeholder, disabled: true, selected: false },
      ...allOptions,
    ]
  }
  listboxState.items = allOptions
}
function isOptionsValid() {
  return props.options.length > 0 || hasSlotContent(slots.default)
}
function isModelValueValid() {
  return props.modelValue !== undefined && Array.isArray(props.modelValue)
}
function parseModelValue(value: any) {
  const asArray = (option: any) => (Array.isArray(option) ? option : [option])
  const asString = (option: any) => (typeof option === 'string' ? option : option.text)
  return Array.isArray(value) ? value.map(o => asString(o)) : asArray(asString(value))
}

function setInitialSelectedOption() {
  const selectedItem = listboxState.items.find(
    i => i.selected !== undefined && i.selected !== false,
  )
  let initialOption
  if (isModelValueValid())
    initialOption = props.modelValue

  else if (selectedItem)
    initialOption = selectedItem

  else
    return

  // set initial selectedOption
  // const asArray = (option: any) => (Array.isArray(option) ? option : [option])
  // const asString = (option: any) => (typeof option === 'string' ? option : option.text)
  // if (Array.isArray(initialOption))
  //   initialOption = initialOption.map(o => asString(o))

  selectedOptions.value = parseModelValue(initialOption)
  emit('update:modelValue', parseModelValue(initialOption))

  // updateSelectedOptions(initialOption, true)
}
function handleSearchState() {
  if (!optionsActive.value)
    optionsActive.value = true
  if (searchedOptions.value.length > 0) {
    const currentEl = optionsRef.value?.children[0]
    focusAvailableElement(optionsRef.value, i => i + 1, 0)
    listboxState.currentIndex = 0
    listboxState.currentId = currentEl?.id as string
  }
  else {
    listboxState.currentIndex = 0
    listboxState.currentId = ''
  }
}

function handleTagClick(event: Event, option: string) {
  event.stopPropagation()
  updateSelectedOptions(option)
  focusTrigger()
}

function dynamicSelectionAttributes(option: any) {
  return props.tags
    ? {
        ...props.tagProps,
        text: option.toString(),
        class: 'mx-px',
        onClick: props?.tagProps?.closeIcon ? ($event: Event) => handleTagClick($event, option) : undefined,
      }
    : {}
}

function LuiText(option: any, index: number) {
  return h(
    'span', // type
    { class: 'text-inherit font-inherit' }, // props
    [index !== 0 ? ', ' : undefined, option],
  )
}

function ArrowIcon() {
  return h('svg',
    {
      viewBox: '0 0 12 12',
      width: arrowIconSize(props.size),
      height: arrowIconSize(props.size),
      fill: 'currentColor',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    [
      h('path', {
        d: 'M5.99999 6.58599L8.47499 4.11099L9.18199 4.81799L5.99999 7.99999L2.81799 4.81799L3.52499 4.11099L5.99999 6.58599Z',
        fill: 'currentColor',
      }),
    ],
  )
}
</script>

<template>
  isValueUsing: {{ isValueUsing }}
  <div
    class="relative"
    :class="wrapperClasses"
  >
    <div
      ref="wrapperRef"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="optionsActive"
      :aria-controls="optionsId"
      tabindex="0"
      :class="triggerClasses"
      v-bind="$attrs"
      @click="optionsActive = !optionsActive"
      @keydown="triggerKeydown"
      @focus="searchRef?.focus()"
    >
      <span v-if="$slots.prepend" :class="prependClasses">
        <slot name="prepend" />
      </span>
      <component
        :is="LuiText(placeholder, 0)"
        v-if="placeholder !== '' && !selectedOptions.length && !searchQuery.length && !isPlaceholderHolderDelete"
      />
      <template v-for="(option, index) in selectedOptionsAsText" :key="`lui-option-${index}`">
        <component
          :is="tags ? LuiTag : LuiText(option, index)"
          v-bind="dynamicSelectionAttributes(option)"
        />
      </template>
      <input
        v-if="searchable && !disabled"
        ref="searchRef"
        v-model="searchQuery"
        type="text"
        class="outline-none bg-transparent w-24 mx-px"
        autocomplete="off"
        @input="handleSearchState"
      >
      <span v-if="!hideAppend" :class="appendClasses">
        <slot name="append">
          <ArrowIcon />
        </slot>
      </span>
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
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-show="optionsActive"
          :id="optionsId"
          ref="optionsRef"
          :class="menuClasses"
          :style="menuStyles"
        >
          <ul
            aria-orientation="vertical"
            aria-labelledby="selectId"
            role="listbox"
            tabindex="0"
            aria-activedescendant="listboxState.currentId"
            :class="size === 'xs' || size === 'sm' ? 'p-1.5' : size === 'md' ? 'p-2' : 'p-2.5'"
            class="space-y-1"
            @keydown="optionsKeydown($event)"
          >
            <LuiOption v-if="placeholder !== '' && !searchQuery.length" disabled :text="placeholder" />
            <template v-if="options.length > 0">
              <template v-if="searchedOptions.length > 0">
                <LuiOption
                  v-for="(option, index) in searchedOptions"
                  :key="index"
                  v-bind="optionProps(option)"
                  @click.stop
                />
              </template>
              <template v-else>
                <LuiOption text="Nothing found on this search" disabled />
              </template>
            </template>
            <template v-else>
              <slot />
            </template>
          </ul>
        </div>
      </transition>
    </component>
  </div>
</template>
