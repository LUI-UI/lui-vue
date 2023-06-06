<script lang="ts">
export default {
  name: 'LuiSelect',
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { ref, nextTick, provide, useSlots, useAttrs, watch, reactive, computed, toRef } from 'vue'
import type { PropType, Ref } from 'vue'
import type { OptionsType, ModelValue, ModelValueObject, ListboxStateType } from './select-types'
import { ContextKey } from './symbols'
import { useId } from '../../utils/useId'
// import { useOutsideClick, useFindProperPosition } from "./composables/index";
import { useOutsideClick } from '../../composables/useOutsideClick'
import { useProperPosition } from '../../composables/useProperPosition'
import type { TwClassInterface } from '@/globals/interfaces'
import type { Rounded, Block, Size, State, StateIcon, Description } from '@/globals/types'
import { hasSlotContent } from '../../utils/hasSlotContent'
import LuiOption from './LuiOption.vue'
import LuiInput from '../Input/LuiInput.vue'
const props = defineProps({
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false
  },
  block: {
    type: Boolean as PropType<Block>,
    default: false
  },
  state: {
    type: [String, Boolean, null] as PropType<State>,
    default: null
  },
  stateIcon: {
    type: [Boolean] as PropType<StateIcon>,
    default: null
  },
  options: {
    type: Array as PropType<OptionsType>,
    default: () => []
  },
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  size: {
    type: String as PropType<Size>,
    default: 'md'
  },
  description: {
    type: [String, null] as PropType<Description>,
    default: null
  },
  searchable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showAppend: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  modelValue: {
    type: [Object, String, undefined] as PropType<ModelValue>,
    default: undefined
  }
})
const slots = useSlots()
const attrs = useAttrs()
// const selectRef: Ref<InstanceType<typeof LuiInput> | null> = ref(null);
const selectRef = ref<InstanceType<typeof LuiInput>>()
const optionsRef = ref<HTMLUListElement>()
// const optionRef = ref<CustomType[]>([])

const selectWrapperRef = ref<HTMLDivElement>()
const optionsActive: Ref<boolean> = ref(false)
const selectedOption: Ref<any> = ref(undefined)
const selectedOptionBackup: Ref<string> = ref('')
const searchQuery = ref<string>('')
// const selectedOption: Ref<string | ModelValueObject | undefined> =
//   ref(undefined);
const listboxState: ListboxStateType = reactive({
  items: [],
  currentIndex: 0,
  currentId: ''
})

const selectId = `lui-listbox-button-${useId()}`
const optionsId = `lui-listbox-wrapper-${useId()}`
const validSlotTypes = ['LuiOption']
const errorMessages = {
  type: {
    modelValue: 'Wrong type for modelValue, typeof of modelValue should be string'
  },
  missing: {
    options: `Options missing: should use options prop or LuiOption component as slot`
  }
}

const emit = defineEmits(['update:modelValue', 'change'])

const { properPosition } = useProperPosition({
  triggerEl: selectWrapperRef,
  MenuEl: optionsRef,
  targetPosition: 'bottom'
})
useOutsideClick(selectWrapperRef, () => closeListBox())

nextTick(() => {
  setInitialSelectedOption()
  setState()
})

provide(ContextKey, {
  selectedOption,
  updateSelectedOption,
  focusButton,
  currentId: toRef(listboxState, 'currentId')
})

watch(
  () => props.modelValue,
  (value) => {
    const rawValue = typeof value !== 'string' ? value?.text : value
    if (rawValue !== selectedOption.value?.text) {
      updateSelectedOption(value)
    }
    // updateSelectedOption(value);
  }
)
const targetItems = computed(() => (props.searchable ? searchedOptions.value : listboxState.items))
// const computedOptions = computed(() => props.options.length > 0)
function isScrollable(element: HTMLElement) {
  return element && element.clientHeight < element.scrollHeight
}
// // maintainScrollVisibility(options[index], this.listboxEl);
function handleScrollVisibility(activeElement: HTMLElement, scrollParent: HTMLElement) {
  const { offsetHeight, offsetTop } = activeElement
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent

  const marginBetweenOptions = 8
  const isAbove = offsetTop < scrollTop
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop - marginBetweenOptions)
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight + marginBetweenOptions)
  }
}
function focusAvailableElement(
  el: HTMLElement | undefined,
  oparation: (i: number) => number,
  initial: number | null = null
) {
  const isTargetExist = (index: number) => index >= 0 && index <= targetItems.value.length - 1
  const isTargetFocusable = (targetIndex: number) => {
    const target = targetItems.value[targetIndex]
    return target?.disabled === undefined || target?.disabled === false
  }
  let targetIndex = listboxState.currentIndex
  // set target
  if (initial !== null) {
    targetIndex = initial
  } else {
    targetIndex = oparation(targetIndex)
  }
  if (!isTargetExist(targetIndex)) return
  while (!isTargetFocusable(targetIndex)) {
    targetIndex = oparation(targetIndex)
    if (!isTargetExist(targetIndex)) return
  }
  listboxState.currentIndex = targetIndex
  const currentEl = el?.children[listboxState.currentIndex]
  listboxState.currentId = currentEl?.id
  if (!props.searchable) {
    nextTick(() => (currentEl as HTMLElement)?.focus({ preventScroll: true }))
  }
  nextTick(() => {
    if (isScrollable(optionsRef.value as HTMLElement)) {
      handleScrollVisibility(
        optionsRef.value?.children[listboxState.currentIndex] as HTMLElement,
        optionsRef.value as HTMLElement
      )
    }
  })
}
function updateSelectedOption(option: ModelValue) {
  const optionAsString = option && typeof option !== 'string' ? option.text : option
  selectedOption.value = optionAsString
  if (props.searchable) {
    selectedOptionBackup.value = optionAsString as string
    searchQuery.value = ''
    listboxState.currentIndex = targetItems.value.findIndex((i) =>
      typeof i !== 'string' ? i.text === optionAsString : i === optionAsString
    )
  }
  emit('update:modelValue', optionAsString)
  emit('change', optionAsString)
}

function focusButton() {
  // selectRef.value?.focus({ preventScroll: true });
  const select = selectRef.value as any
  select?.focus()
}

function closeListBox() {
  optionsActive.value = false
}

function toggleOptions() {
  if (attrs.disabled !== undefined || attrs.disabled === true) return
  // event.preventDefault();
  optionsActive.value = !optionsActive.value
  // if (attrs.disabled !== undefined && attrs.disabled === true) return;
}

function setState() {
  const slotsOptions =
    slots.default &&
    slots
      .default()
      .map((slot: any) =>
        slot.type.toString() === 'Symbol(Fragment)'
          ? slot.children.map((child: any) => child.props)
          : slot.props
      )
      .flat()
  // validSlotTypes.includes(child.type.name)
  let allOptions = [...props.options].concat(slotsOptions || [])
  if (props.placeholder !== '') {
    allOptions = [
      { text: props.placeholder, value: props.placeholder, disabled: true, selected: false },
      ...allOptions
    ]
  }

  listboxState.items = allOptions
}

function setInitialSelectedOption() {
  // when options not provided also there is no slot we need the throw an error like you should use options prop or option component as slot.
  // const isModelValueInvalid =
  //   props.modelValue !== undefined &&
  //   typeof props.modelValue !== "string" &&
  //   (props.modelValue?.text === undefined ||
  //     props.modelValue?.value === undefined);
  const isModelValueInvalid =
    props.modelValue !== undefined &&
    typeof props.modelValue !== 'string' &&
    typeof props.modelValue !== 'number'

  const optionsExist = props.options.length > 0

  const anyOptionSelected = () =>
    props.options.some((o: ModelValueObject | string) => typeof o !== 'string' && o.selected)

  function setPlaceholderOrValue(value: any) {
    if (props.placeholder === '') {
      updateSelectedOption(value)
    } else {
      // updateSelectedOption(props.placeholder);
    }
  }
  const anySlotSelected = () =>
    slots.default &&
    slots
      .default()
      .some((slot: any) =>
        slot.type.toString() == 'Symbol(Fragment)'
          ? slot.children.some(
              (child: any) => child.props.selected !== undefined && child.props.selected === true
            )
          : slot.props && slot.props.selected && slot.props.selected === true
      )

  const isDefaultSlotValid = () =>
    slots.default &&
    slots
      .default()
      .some((slot: any) =>
        slot.type.toString() == 'Symbol(Fragment)'
          ? slot.children.some(
              (child: any) =>
                child.type.name !== undefined && validSlotTypes.includes(child.type.name)
            )
          : slot.type.name !== undefined && validSlotTypes.includes(slot.type.name)
      )

  if (isModelValueInvalid) {
    throw new Error(errorMessages.type.modelValue)
  }
  if (props.modelValue !== undefined) {
    // should we handle the case if modelValue does not match any option then if placeholder exist set placeholder than throw error?
    updateSelectedOption(props.modelValue)
    return
  }
  // after this line modelValue is undefined
  if (optionsExist && !anyOptionSelected()) {
    setPlaceholderOrValue(props.options[0])
    return
  }

  if (!optionsExist && !isDefaultSlotValid()) {
    throw new Error(
      `Options missing: should use options prop or one of the valid slots: ${validSlotTypes}`
    )
  }
  if (!optionsExist && !anySlotSelected()) {
    const firstSlot: any = slots.default && slots.default()[0]
    let propsOfFirstSlot
    if (slots.default && firstSlot?.type.toString() === 'Symbol(Fragment)') {
      propsOfFirstSlot = firstSlot?.children[0]?.props
    } else {
      propsOfFirstSlot = firstSlot?.props
    }
    setPlaceholderOrValue(propsOfFirstSlot)
  }
}
function handleKeydownEvents(event: KeyboardEvent) {
  switch (event.code) {
    case 'ArrowDown':
      event.preventDefault()
      focusAvailableElement(optionsRef.value, (i) => i + 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusAvailableElement(optionsRef.value, (i) => i - 1)
      break
    case 'Enter':
      event.preventDefault()
      event.stopPropagation()
      updateSelectedOption(targetItems.value[listboxState.currentIndex])
      closeListBox()
      nextTick(() => focusButton())
      break
    case 'Home':
      event.preventDefault()
      focusAvailableElement(optionsRef.value, (i) => i + 1, 0)
      break
    case 'End':
      event.preventDefault()
      {
        const last = targetItems.value.length - 1
        focusAvailableElement(optionsRef.value, (i) => i - 1, last)
      }

      break
    case 'Escape':
      event.preventDefault()
      closeListBox()
      nextTick(() => focusButton())
      break
    case 'Tab':
      event.preventDefault()
      event.stopPropagation()
      break
    default:
  }
}
function buttonKeydown(event: KeyboardEvent) {
  const isFirstPress = !optionsActive.value
  switch (event.code) {
    case 'ArrowDown':
    case 'ArrowUp':
    case 'Enter':
    case 'Space':
      {
        event.preventDefault()
        if (!optionsActive.value) {
          toggleOptions()
        }
        if (props.searchable && !isFirstPress) {
          handleKeydownEvents(event)
        } else {
          const selectedIndex = listboxState.items.findIndex((item: any) =>
            typeof item === 'string'
              ? item === selectedOption.value
              : item?.text === selectedOption.value?.text
          )
          if (selectedIndex === -1) {
            focusAvailableElement(optionsRef.value, (i) => i + 1, 0)
          } else {
            focusAvailableElement(optionsRef.value, (i) => i + 1, selectedIndex)
          }
        }
      }
      break
    default:
    // code block
  }
}
// function handleKeyUp(event: KeyboardEvent) {
//   switch (event.key) {
//     case Keys.Space:
//       // Required for firefox, event.preventDefault() in handleKeyDown for
//       // the Space key doesn't cancel the handleKeyUp, which in turn
//       // triggers a *click*.
//       event.preventDefault();
//       break;
//   }
// }

function optionsKeydown(event: KeyboardEvent) {
  handleKeydownEvents(event)
}
const optionsClasses = computed(() => {
  const optionsWrapper: TwClassInterface = {
    position: 'absolute',
    zIndex: 'z-50',
    maxHeight: 'max-h-96',
    minWidth: 'min-w-full',
    overflow: 'overflow-y-auto',
    backgroundColor: 'bg-secondary-50 dark:bg-secondary-900',
    borderWidth: 'border',
    borderColor: 'border-secondary-200 dark:border-secondary-700',
    borderRadius: {
      'rounded-md': props.rounded === true,
      'rounded-2xl': props.rounded === 'full'
    },
    padding: {
      'p-1.5': props.size === 'xs' || props.size === 'sm',
      'p-2': props.size === 'md',
      'p-2.5': props.size === 'lg' || props.size === 'xl'
    },
    boxShadow: 'shadow-lg',
    bottom: properPosition.value == 'top' ? 'bottom-full' : '',
    top: properPosition.value == 'bottom' ? 'top-full' : '',
    margin: properPosition.value == 'bottom' ? 'mt-2' : 'mb-2',
    space: props.size === 'xs' || props.size === 'sm' ? 'space-y-1.5' : 'space-y-2'
  }
  return Object.values({ ...optionsWrapper })
})

const selectWrapperClasses = computed(() => {
  const classes: TwClassInterface = {
    position: 'relative',
    width: props.block ? 'w-full' : 'max-w-max'
    // pointerEvents:
    //   attrs?.disabled !== undefined && attrs.disabled === true
    //     ? "pointer-events-none"
    //     : "",
    // cursor: "cursor-wait",
    // cursor:
    //   attrs?.disabled !== undefined && attrs.disabled === true
    //     ? "cursor-not-allowed"
    //     : "cursor-pointer",
  }
  return Object.values({ ...classes })
})

const inputProps = computed(() => ({
  rounded: props.rounded,
  block: props.block,
  state: props.state,
  stateIcon: props.stateIcon,
  placeholder: props.placeholder,
  size: props.size,
  description: props.description,
  ...attrs
}))

const optionProps = (option: string | object) => {
  const commonProps = {
    size: props.size,
    rounded: props.rounded
  }
  return typeof option === 'string'
    ? { text: option, ...commonProps }
    : { ...option, ...commonProps }
}
// function setInputValue() {
//   return typeof selectedOption.value === 'string'
//     ? selectedOption.value
//     : selectedOption.value?.text
// }
// const setInputValue = computed(() =>
//   typeof selectedOption.value === 'string' ? selectedOption.value : selectedOption.value?.text
// )

function arrowIconSize(size: string) {
  return size === 'xs' ? '12' : size === 'sm' ? '16' : size === 'xl' ? '24' : '20'
}

const searchedOptions = computed(() => {
  return [...props.options].filter((option: any) => {
    const optionAsString = typeof option !== 'string' ? option.text : option
    return searchQuery.value
      .toLocaleLowerCase()
      .split(' ')
      .every((q) => optionAsString.toLocaleLowerCase().includes(q))
  })
})

function setSearchQuery(event: Event) {
  if (!optionsActive.value) {
    optionsActive.value = true
  }
  const inputValue = (event.target as HTMLInputElement).value
  searchQuery.value = inputValue
  if (searchedOptions.value.length > 0) {
    const currentEl = optionsRef.value?.children[0]
    focusAvailableElement(optionsRef.value, (i) => i + 1, 0)
    listboxState.currentIndex = 0
    listboxState.currentId = currentEl?.id
  } else {
    listboxState.currentIndex = 0
    listboxState.currentId = ''
  }
}
function resetSelectedOption() {
  if (props.searchable && searchedOptions.value.length === 0) {
    updateSelectedOption(selectedOptionBackup.value)
    if (optionsActive.value) {
      toggleOptions()
    }
  }
}
</script>
<template>
  <div
    role="combobox"
    ref="selectWrapperRef"
    aria-haspopup="listbox"
    :class="selectWrapperClasses"
    :aria-expanded="optionsActive"
    :aria-controls="optionsId"
    tabindex="-1"
    @click="toggleOptions"
  >
    <LuiInput
      ref="selectRef"
      :id="selectId"
      v-bind="inputProps"
      :readonly="!searchable"
      autocomplete="off"
      @keydown="buttonKeydown"
      v-model="selectedOption"
      @input="setSearchQuery"
      @blur="resetSelectedOption"
    >
      <template v-if="hasSlotContent(slots.prepend)" #prepend>
        <slot name="prepend" />
      </template>
      <template #append>
        <slot v-if="showAppend" name="append">
          <svg
            viewBox="0 0 12 12"
            :width="arrowIconSize(size)"
            :height="arrowIconSize(size)"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99999 6.58599L8.47499 4.11099L9.18199 4.81799L5.99999 7.99999L2.81799 4.81799L3.52499 4.11099L5.99999 6.58599Z"
              fill="currentColor"
            />
          </svg>
        </slot>
      </template>
    </LuiInput>
    <ul
      v-show="optionsActive"
      ref="optionsRef"
      :id="optionsId"
      aria-orientation="vertical"
      :aria-labelledby="selectId"
      role="listbox"
      tabindex="0"
      :class="optionsClasses"
      :aria-activedescendant="listboxState.currentId"
      @keydown="optionsKeydown($event)"
    >
      <LuiOption v-if="placeholder !== ''" disabled :text="placeholder" />
      <template v-if="options.length > 0">
        <template v-if="searchedOptions.length > 0">
          <LuiOption
            v-for="(option, index) in searchedOptions"
            :key="index"
            v-bind="optionProps(option)"
          >
          </LuiOption>
        </template>
        <template v-else>
          <LuiOption text="Nothing found on this search" disabled />
        </template>
      </template>
      <slot v-else />
    </ul>
  </div>
</template>
