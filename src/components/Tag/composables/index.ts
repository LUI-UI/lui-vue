import { computed } from 'vue'

// Types
import type { Ref } from 'vue'
import type { TwClassInterface } from '@/globals/interfaces'
import type { Color, Filter, Rounded, Size, Variant } from '@/globals/types'

// Define Prop Types
interface PropTypes {
  variant: Ref<Variant>
  color: Ref<Color>
  filter: Ref<Filter>
  size: Ref<Size>
  rounded: Ref<Rounded>
}
export function useTagClasses(props: PropTypes) {
  const computedTagClasses = computed(() => {
    const tagClasses: TwClassInterface = {
      display: 'inline-flex',
      borderWidth: 'border',
      borderStyle: 'border-solid',
      borderRadius:
        props.rounded.value === 'full'
          ? 'rounded-full'
          : props.rounded.value === true
            ? {
                'rounded-sm': props.size.value === 'xs' || props.size.value === 'sm',
                'rounded': props.size.value === 'md',
                'rounded-md': props.size.value === 'lg' || props.size.value === 'xl',
              }
            : '',
      padding: {
        'px-0.5': props.size.value === 'xs',
        'px-1': props.size.value === 'sm',
        'px-1.5': props.size.value === 'md',
        'px-2': props.size.value === 'lg',
        'px-2.5': props.size.value === 'xl',
      },
      alignItems: 'items-center',
      fontSize: {
        'text-xs': props.size.value === 'xs' || props.size.value === 'sm',
        'text-sm': props.size.value === 'md',
        'text-base': props.size.value === 'lg' || props.size.value === 'xl',
      },
      // lineHeight: "leading-normal",
      outlineStyle: 'outline-none',
      ringWidth: 'focus-visible:ring-4',
      // transitionProperty: 'transition-colors transition-transform',
      // translate: 'active:translate-y-0.5 disabled:translate-y-0',
      // pointerEvents : { 'pointer-events-none': props.loading }),
      cursor: 'cursor-pointer disabled:cursor-not-allowed',
      backgroundColor:
        props.variant.value === 'solid'
          ? {
              [`bg-${props.color.value}-500 hover:bg-${props.color.value}-400 disabled:bg-secondary-500`]:
                props.filter.value === 'none', // filter none
              [`bg-${props.color.value}-100 hover:bg-${props.color.value}-50 disabled:bg-secondary-100`]:
                props.filter.value === 'lighten', // filter lighten
              [`bg-${props.color.value}-800 hover:bg-${props.color.value}-700  disabled:bg-secondary-800`]:
                props.filter.value === 'darken', // filter darken
            }
          : null,
      textColor:
        props.variant.value === 'solid'
          ? {
              'text-white disabled:text-secondary-300': props.filter.value === 'none', // filter none
              [`text-${props.color.value}-500 disabled:text-secondary-300`]:
                props.filter.value === 'lighten', // filter lighten
              [`text-${props.color.value}-100 disabled:text-secondary-300`]:
                props.filter.value === 'darken', // filter darken
            }
          : {
              [`text-${props.color.value}-500 hover:text-${props.color.value}-400 disabled:text-secondary-500`]:
                props.filter.value === 'none', // filter none
              [`text-${props.color.value}-100 hover:text-${props.color.value}-50 disabled:text-secondary-100`]:
                props.filter.value === 'lighten', // filter lighten
              [`text-${props.color.value}-800 hover:text-${props.color.value}-700 disabled:text-secondary-800`]:
                props.filter.value === 'darken', // filter darken
            },
      borderColor: {
        [`border-${props.color.value}-500 hover:border-${props.color.value}-400 disabled:border-secondary-500`]:
          props.filter.value === 'none', // filter none
        [`border-${props.color.value}-100 hover:border-${props.color.value}-50 disabled:border-secondary-100`]:
          props.filter.value === 'lighten', // filter lighten
        [`border-${props.color.value}-800 hover:border-${props.color.value}-700 disabled:border-secondary-800`]:
          props.filter.value === 'darken', // filter darken
      },
      ringColor: `focus-visible:ring-${props.color.value}-500/40`,
      space: {
        'space-x-1': props.size.value === 'xs' || props.size.value === 'sm',
        'space-x-1.5': props.size.value === 'md',
        'space-x-2': props.size.value === 'lg' || props.size.value === 'xl',
      },
    }
    return Object.values({ ...tagClasses })
  })
  // const iconClasses: TwClassInterface = {
  //   lineHeight: 'leading-3'
  // }
  const computedIconSize = computed(() =>
    props.size.value === 'xs'
      ? '12'
      : props.size.value === 'sm'
        ? '12'
        : props.size.value === 'md'
          ? '16'
          : props.size.value === 'lg'
            ? '20'
            : '20',
  )
  const computedPrependSize = computed(
    () =>
      props.size.value === 'xs' || props.size.value === 'sm'
        ? 'text-xs'
        : props.size.value === 'md'
          ? 'text-base'
          : props.size.value === 'lg'
            ? 'text-xl'
            : 'text-xl',
    // props.size.value === "sm" ? "md" : props.size.value === "md" ? "xl" : "2xl"
  )
  return {
    computedTagClasses,
    computedIconSize,
    computedPrependSize,
    // iconClasses
  }
}
