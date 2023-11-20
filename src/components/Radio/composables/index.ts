import type { Ref } from 'vue'
import { computed } from 'vue'
import { useGlobalHiddenInputClasses } from '../../../composables'
import type { Description, Size, State } from '@/globals/types'
import type { TwClassInterface } from '@/globals/interfaces'

// import classNames from "classnames";

interface PropTypes {
  size: Ref<Size>
  state: Ref<State>
  description: Ref<Description>
}

export function useRadioClasses(props: PropTypes) {
  const inputClasses = computed(() => {
    const classes: TwClassInterface = {
      // position: 'absolute',
      // opacity: 'opacity-0',
      // zIndex: 'z-10',
      // peer: 'peer',
      // cursor: 'disabled:cursor-not-allowed',
      // lineHeight: 'leading-none',
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
      borderRadius: 'rounded-full',
    }
    return Object.values({ ...classes })
  })

  const spanClasses = computed(() => {
    const classes: TwClassInterface = {
      lineHeight: 'leading-none',
      width: {
        'w-4 before:w-2': props.size.value === 'xs',
        'w-5 before:w-2.5': props.size.value === 'sm',
        'w-6 before:w-3': props.size.value === 'md',
        'w-7 before:w-3.5': props.size.value === 'lg',
        'w-8 before:w-4': props.size.value === 'xl',
      },
      // 16/8 - 20/10 - 24/12 - 28-14 - 32/16
      height: {
        'h-4 before:h-2': props.size.value === 'xs',
        'h-5 before:h-2.5': props.size.value === 'sm',
        'h-6 before:h-3': props.size.value === 'md',
        'h-7 before:h-3.5': props.size.value === 'lg',
        'h-8 before:h-4': props.size.value === 'xl',
      },
      borderWidth: 'border peer-checked:border-0',
      borderColor: 'border-secondary-200 dark:border-secondary-700',
      borderRadius: 'rounded-full before:rounded-full',
      backgroundColor:
        'bg-secondary-50 dark:bg-secondary-900 peer-checked:bg-primary-500 before:bg-transparent peer-checked:before:bg-white dark:peer-checked:before:bg-secondary-300 peer-disabled:bg-primary-100',
      ringWidth: 'peer-focus-visible:ring-2',
      ringColor: {
        'peer-focus-visible:ring-primary-500/40': props.state.value === null,
        'peer-focus-visible:ring-warning-500/40': props.state.value === 'warning',
        'peer-focus-visible:ring-danger-500/40': props.state.value === false,
        'peer-focus-visible:ring-success-500/40': props.state.value === true,
      },
      display: 'inline-flex',
      alignItems: 'items-center',
      justifyContent: 'justify-center',
      flexShrink: 'shrink-0',
      transitionProperty: 'transition-colors before:transition-colors',
      // position: 'relative before:absolute',
      // top: 'before:top-0',
      // bottom: 'before:bottom-0',
      // translate: classNames({
      //   'before:translate-x-0.5 peer-checked:before:translate-x-4': props.size.value === 'sm',
      //   'before:translate-x-0.5 peer-checked:before:translate-x-5': props.size.value === 'md',
      //   'before:translate-x-0.5 peer-checked:before:translate-x-6': props.size.value === 'lg',
      // }),
      // margin: 'before:my-auto',
      // transitionProperty: 'before:transition transition',
    }
    return Object.values({ ...classes })
  })
  return { inputClasses, spanClasses }
}
