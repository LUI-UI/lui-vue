import { computed, useSlots } from 'vue'
// import classNames from "classnames";
//Types
import type { Ref } from 'vue'
import type { TwClassInterface } from '@/globals/interfaces'
import type { Clear } from '../input-types'
import type { State, Rounded, Block, Size, Description, StateIcon } from '@/globals/types'
//Define Prop Types
type PropTypes = {
  size: Ref<Size>
  rounded: Ref<Rounded>
  state: Ref<State>
  stateIcon: Ref<StateIcon>
  block: Ref<Block>
  clear: Ref<Clear>
  description: Ref<Description>
  prependIcon: Ref<boolean>
}

export function useInputClasses(props: PropTypes, attrs: any) {
  const slots = useSlots()
  const iconStatus = computed(() => {
    return (props.stateIcon.value === true && props.state.value !== null) ||
      props.clear.value === true ||
      slots.append
      ? props.prependIcon.value || slots.prepend
        ? 'twoIcon'
        : 'rightIcon' // stateIcon-active
      : props.prependIcon.value || slots.prepend
      ? 'leftIcon'
      : 'noIcon' // stateIcn-deactive
  })
  const iconClasses: TwClassInterface = {
    position: 'absolute',
    translate: '-translate-y-1/2',
    lineHeight: 'leading-none',
    top: 'top-2/4',
    fontSize: {
      'text-xs': props.size.value === 'xs',
      'text-base': props.size.value === 'sm',
      'text-xl': props.size.value === 'md' || props.size.value === 'lg',
      'text-2xl': props.size.value === 'xl'
    },
    textColor:
      attrs.disabled !== undefined && attrs.disabled.value
        ? 'text-secondary-300 dark:text-secondary-700'
        : 'text-secondary-400 peer-focus:text-secondary-600 dark:text-secondary-600 dark:peer-focus:text-secondary-300'
  }
  const wrapperClasses = computed(() => {
    const classes: TwClassInterface = {
      // class="inline-block leading-3" :class="block ? 'w-full' : 'w-48'"
      display: 'inline-block',
      lineHeight: 'leading-3',
      width: props.block.value === true ? 'w-full' : 'w-48'
    }
    return Object.values({ ...classes })
  })
  const inputClasses = computed(() => {
    const classes: TwClassInterface = {
      peer: 'peer',
      width: 'w-full',
      appearance: attrs.type !== undefined && attrs.type === 'search' ? 'remove-search-icon' : '',
      // 12 14 16 18 20
      fontSize: {
        'text-xs': props.size.value === 'xs',
        'text-sm': props.size.value === 'sm',
        'text-base': props.size.value === 'md',
        'text-lg': props.size.value === 'lg',
        'text-xl': props.size.value === 'xl'
      },
      textColor:
        'text-secondary-600 placeholder:text-secondary-400 disabled:placeholder:text-secondary-300 dark:text-secondary-300 dark:placeholder:text-secondary-600 dark:disabled:text-secondary-700',
      backgroundColor:
        'bg-secondary-50 disabled:bg-secondary-100 dark:bg-secondary-900 dark:disabled:secondary-800',
      outlineStyle: 'outline-none',
      borderWidth: 'border',
      borderStyle: 'border-solid',
      borderColor: {
        ['border-secondary-200 focus:border-primary-500 disabled:border-secondary-200']:
          props.state.value === null,
        ['disabled:border-secondary-200 border-warning-500']: props.state.value === 'warning',
        ['disabled:border-secondary-200 border-danger-500']: props.state.value === false,
        ['disabled:border-secondary-200 border-success-500']: props.state.value === true
      },
      ringWidth:
        attrs.disabled !== undefined && attrs.disabled === true
          ? 'ring-0'
          : props.state.value === null
          ? 'focus:ring-4'
          : 'ring-4',
      ringColor: {
        'focus:ring-primary-500/40': props.state.value === null,
        'ring-warning-500/40': props.state.value === 'warning',
        'ring-danger-500/40': props.state.value === false,
        'ring-success-500/40': props.state.value === true
      },
      borderRadius: {
        'rounded-lg': props.rounded.value === true,
        'rounded-full': props.rounded.value === 'full'
      },
      cursor: 'disabled:cursor-not-allowed',
      padding:
        iconStatus.value === 'noIcon'
          ? // 6 - 8 - 10 - 10 - 12
            // 24 - 32 - 40 - 40 - 48
            {
              'py-1 px-1.5': props.size.value === 'xs',
              'py-1.5 px-2': props.size.value === 'sm',
              'py-2 px-2.5': props.size.value === 'md',
              'py-2.5 px-2.5': props.size.value === 'lg',
              'py-3.5 px-3': props.size.value === 'xl'
            }
          : iconStatus.value === 'rightIcon'
          ? // 26 - 32 - 40 - 40 - 48
            {
              'py-1 pl-1.5 pr-6': props.size.value === 'xs',
              'py-1.5 pl-2 pr-8': props.size.value === 'sm',
              'py-2 pl-2.5 pr-10': props.size.value === 'md',
              'py-2.5 pl-2.5 pr-10': props.size.value === 'lg',
              'py-3.5 pl-3 pr-12': props.size.value === 'xl'
            }
          : iconStatus.value === 'twoIcon'
          ? {
              'py-1 px-6': props.size.value === 'xs',
              'py-1.5 px-8': props.size.value === 'sm',
              'py-2 px-10': props.size.value === 'md',
              'py-2.5 px-10': props.size.value === 'lg',
              'py-3.5 px-12': props.size.value === 'xl'
            }
          : {
              //leftIcon
              'py-1 pr-1.5 pl-6': props.size.value === 'xs',
              'py-1.5 pr-2 pl-8': props.size.value === 'sm',
              'py-2 pr-2.5 pl-10': props.size.value === 'md',
              'py-2.5 pr-2.5 pl-10': props.size.value === 'lg',
              'py-3.5 pr-3 pl-12': props.size.value === 'xl'
            }
    }
    return Object.values({ ...classes })
  })

  const prependClasses = computed(() => {
    const classes: TwClassInterface = {
      ...iconClasses,
      // 8 10 12 12 16
      left: {
        'left-2': props.size.value === 'xs',
        'left-2.5': props.size.value === 'sm',
        'left-3': props.size.value === 'md' || props.size.value === 'lg',
        'left-4': props.size.value === 'xl'
      }
    }
    return Object.values({ ...classes })
  })
  const appendClasses = computed(() => {
    const classes: TwClassInterface = {
      ...iconClasses,
      right: {
        'right-2': props.size.value === 'xs',
        'right-2.5': props.size.value === 'sm',
        'right-3': props.size.value === 'md' || props.size.value === 'lg',
        'right-4': props.size.value === 'xl'
      }
    }
    return Object.values({ ...classes })
  })

  const stateIconClasses = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { textColor, ...rest } = iconClasses
    const classes: TwClassInterface = {
      ...rest,
      right: {
        'right-2': props.size.value === 'xs',
        'right-2.5': props.size.value === 'sm',
        'right-3': props.size.value === 'md' || props.size.value === 'lg',
        'right-4': props.size.value === 'xl'
      },
      textColor:
        attrs.disabled !== undefined && attrs.disabled === true
          ? 'text-secondary-300 dark:text-secondary-700'
          : props.state.value === null
          ? 'text-secondary-400 peer-focus:text-secondary-600 dark:text-secondary-600 dark:peer-focus:text-secondary-300'
          : {
              'text-warning-500': props.state.value === 'warning',
              'text-danger-500': props.state.value === false,
              'text-success-500': props.state.value === true
            }
    }
    return Object.values({ ...classes })
  })

  const closeIconClasses = computed(() => {
    const classes: TwClassInterface = {
      ...iconClasses,
      right: {
        'right-2': props.size.value === 'xs',
        'right-2.5': props.size.value === 'sm',
        'right-3': props.size.value === 'md' || props.size.value === 'lg',
        'right-4': props.size.value === 'xl'
      },
      display: 'flex',
      outlineStyle: 'outline-none',
      // textColor:
      //   "text-secondary-400 peer-focus:text-secondary-600 dark:text-secondary-600 dark:peer-focus:text-secondary-300",
      ringWidth: 'focus-visible:ring-2',
      ringColor: 'focus-visible:ring-secondary-200'
    }
    return Object.values({ ...classes })
  })

  return {
    wrapperClasses,
    inputClasses,
    prependClasses,
    appendClasses,
    stateIconClasses,
    closeIconClasses,
    iconStatus
  }
}
