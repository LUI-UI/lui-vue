import { computed } from 'vue'
import type { Ref } from 'vue'
import { useGlobalHiddenInputClasses } from '../../../composables'
import type { Description, Rounded, Size, State } from '@/globals/types'
import type { TwClassInterface } from '@/globals/interfaces'

// import classNames from "classnames";

interface PropTypes {
  size: Ref<Size>
  rounded: Ref<Rounded>
  state: Ref<State>
  description: Ref<Description>
}

export function useSwitchClasses(props: PropTypes) {
  const inputClasses = computed(() => {
    const classes: TwClassInterface = {
      ...useGlobalHiddenInputClasses(),
      width: {
        'w-8': props.size.value === 'xs',
        'w-10': props.size.value === 'sm',
        'w-12': props.size.value === 'md',
        'w-14': props.size.value === 'lg',
        'w-16': props.size.value === 'xl',
      },
      height: {
        'h-4': props.size.value === 'xs',
        'h-5': props.size.value === 'sm',
        'h-6': props.size.value === 'md',
        'h-7': props.size.value === 'lg',
        'h-8': props.size.value === 'xl',
      },
      borderRadius: {
        'rounded-full': props.rounded.value === 'full',
        'rounded': props.rounded.value === true,
      },
    }
    return Object.values({ ...classes })
  })

  const spanClasses = computed(() => {
    const classes: TwClassInterface = {
      lineHeight: 'leading-none',
      width: {
        'w-8 before:w-3': props.size.value === 'xs',
        'w-10 before:w-4': props.size.value === 'sm',
        'w-12 before:w-5': props.size.value === 'md',
        'w-14 before:w-6': props.size.value === 'lg',
        'w-16 before:w-7': props.size.value === 'xl',
      },
      height: {
        'h-4 before:h-3': props.size.value === 'xs',
        'h-5 before:h-4': props.size.value === 'sm',
        'h-6 before:h-5': props.size.value === 'md',
        'h-7 before:h-6': props.size.value === 'lg',
        'h-8 before:h-7': props.size.value === 'xl',
      },
      backgroundColor:
        'bg-secondary-500 dark:bg-secondary-800 peer-disabled:bg-secondary-100 peer-checked:peer-disabled:bg-success-100 peer-checked:bg-success-500 before:bg-white',
      borderRadius: {
        'rounded-full before:rounded-full': props.rounded.value === 'full',
        'rounded before:rounded-sm': props.rounded.value === true,
      },
      display: 'inline-flex',
      position: 'relative before:absolute',
      top: 'before:top-0',
      bottom: 'before:bottom-0',
      translate: {
        'before:translate-x-0.5 peer-checked:before:translate-x-[1.125rem]':
          props.size.value === 'xs',
        'before:translate-x-0.5 peer-checked:before:translate-x-[1.375rem]':
          props.size.value === 'sm',
        'before:translate-x-0.5 peer-checked:before:translate-x-[1.625rem]':
          props.size.value === 'md',
        'before:translate-x-0.5 peer-checked:before:translate-x-[1.875rem]':
          props.size.value === 'lg',
        'before:translate-x-0.5 peer-checked:before:translate-x-[2.125rem]':
          props.size.value === 'xl',
      },
      margin: 'before:my-auto',
      transitionProperty: 'before:transition transition',
      ringWidth: 'peer-focus-visible:ring-2',
      ringColor: {
        'peer-focus-visible:ring-primary-500/40': props.state.value === null,
        'peer-focus-visible:ring-warning-500/40': props.state.value === 'warning',
        'peer-focus-visible:ring-danger-500/40': props.state.value === false,
        'peer-focus-visible:ring-success-500/40': props.state.value === true,
      },
    }
    return Object.values({ ...classes })
  })

  return { inputClasses, spanClasses }
}
