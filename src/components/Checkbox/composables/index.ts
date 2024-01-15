import { computed } from 'vue'
import type { Ref } from 'vue'
import { useGlobalHiddenInputClasses } from '../../../composables'
import type { Color, Description, Rounded, Size, State } from '../../../globals/types'
import type { TwClassInterface } from '../../../globals/interfaces'

// import classNames from "classnames";

// Define Prop Types
interface PropTypes {
  size: Ref<Size>
  rounded: Ref<Rounded>
  state: Ref<State>
  description: Ref<Description>
  color: Ref<Color>
}

export function useCheckboxClasses(props: PropTypes) {
  const inputClasses = computed(() => {
    const classes: TwClassInterface = {
      // position: "absolute",
      // overflow: "overflow-hidden",
      // outlineStyle: "outline-none",
      // cursor: "disabled:cursor-not-allowed",
      // borderWidth: "border-0",
      // opacity: "opacity-0",
      // zIndex: "z-10",
      // peer: "peer",
      ...useGlobalHiddenInputClasses(),
      width: {
        'w-4': props.size.value === 'xs',
        'w-5': props.size.value === 'sm',
        'w-6': props.size.value === 'md',
        'w-7': props.size.value === 'lg',
        'w-8': props.size.value === 'xl',
      },
      height: {
        'h-4': props.size.value === 'xs',
        'h-5': props.size.value === 'sm',
        'h-6': props.size.value === 'md',
        'h-7': props.size.value === 'lg',
        'h-8': props.size.value === 'xl',
      },
    }
    return Object.values({ ...classes })
  })

  const spanClasses = computed(() => {
    const classes: TwClassInterface = {
      display: 'inline-flex',
      alignItems: 'items-center',
      justifyContent: 'justify-center',
      width: {
        'w-4': props.size.value === 'xs',
        'w-5': props.size.value === 'sm',
        'w-6': props.size.value === 'md',
        'w-7': props.size.value === 'lg',
        'w-8': props.size.value === 'xl',
      },
      height: {
        'h-4': props.size.value === 'xs',
        'h-5': props.size.value === 'sm',
        'h-6': props.size.value === 'md',
        'h-7': props.size.value === 'lg',
        'h-8': props.size.value === 'xl',
      },
      borderRadius: {
        'rounded': props.rounded.value === true,
        'rounded-full': props.rounded.value === 'full',
      },
      backgroundColor:
        'bg-secondary-50 dark:bg-secondary-900 peer-checked:bg-primary-500 peer-checked:peer-disabled:bg-primary-100',
      borderWidth: 'border peer-checked:border-0',
      borderColor: 'border-secondary-200 dark:border-secondary-700 peer-checked:border-transparent',
      ringOffsetWidth: props.state.value !== null ? 'ring-2' : 'peer-focus:ring-2',
      ringColor: {
        'ring-primary-500/40': props.state.value === null,
        'ring-warning-500/40': props.state.value === 'warning',
        'ring-danger-500/40': props.state.value === false,
        'ring-success-500/40': props.state.value === true,
      },
      transitionProperty: 'transition-colors',
    }
    return Object.values({ ...classes })
  })

  const iconClasses = computed(() => {
    const classes: TwClassInterface = {
      position: 'absolute',
      left: 'left-0',
      right: 'right-0',
      top: 'top-0',
      bottom: 'bottom-0',
      margin: 'm-auto',
      display: 'hidden peer-checked:block',
    }
    return Object.values({ ...classes })
  })

  return { inputClasses, spanClasses, iconClasses }
}
