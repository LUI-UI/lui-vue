import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Rounded, Size, State, Description } from '@/globals/types'
import type { TwClassInterface } from '@/globals/interfaces'
import { useGlobalHiddenInputClasses } from '../../../composables/index'
// import classNames from "classnames";

//Define Prop Types
type PropTypes = {
  size: Ref<Size>
  rounded: Ref<Rounded>
  state: Ref<State>
  description: Ref<Description>
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
        'w-8': props.size.value === 'xl'
      },
      height: {
        'h-4': props.size.value === 'xs',
        'h-5': props.size.value === 'sm',
        'h-6': props.size.value === 'md',
        'h-7': props.size.value === 'lg',
        'h-8': props.size.value === 'xl'
      }
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
        'w-8': props.size.value === 'xl'
      },
      height: {
        'h-4': props.size.value === 'xs',
        'h-5': props.size.value === 'sm',
        'h-6': props.size.value === 'md',
        'h-7': props.size.value === 'lg',
        'h-8': props.size.value === 'xl'
      },
      borderRadius: {
        rounded: props.rounded.value === true,
        'rounded-full': props.rounded.value === 'full'
      },
      backgroundColor:
        'bg-secondary-50 dark:bg-secondary-900 peer-checked:bg-primary-500 dark:peer-disabled:bg-secondary-800 peer-disabled:bg-secondary-200',
      borderWidth: 'border peer-checked:border-0',
      borderColor: 'border-secondary-200 dark:border-secondary-700 peer-checked:border-transparent',
      ringOffsetColor: 'peer-focus-visible:ring-2',
      ringColor: {
        'peer-focus-visible:ring-primary-500/40': props.state.value === null,
        'peer-focus-visible:ring-warning-500/40': props.state.value === 'warning',
        'peer-focus-visible:ring-danger-500/40': props.state.value === false,
        'peer-focus-visible:ring-success-500/40': props.state.value === true
      },
      transitionProperty: 'transition-colors'
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
      textColor: 'text-white peer-disabled:text-secondary-300 dark:peer-disabled:text-secondary-600'
    }
    return Object.values({ ...classes })
  })

  return { inputClasses, spanClasses, iconClasses }
}
