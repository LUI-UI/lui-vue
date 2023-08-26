import type { Ref } from 'vue'
import { computed } from 'vue'
import type { Border, Color, Filter, Variant } from '@/globals/types'
import type {
  BackgroundsInterface,
  BordersInterface,
  TypographyInterface,
} from '@/globals/interfaces'

interface PropTypes {
  color: Ref<Color>
  filter: Ref<Filter>
  variant: Ref<Variant>
  border?: Ref<Border>
}
export function useGlobalColorClasses(props: PropTypes) {
  const computedBackgroundColorClasses = computed(() => {
    const classes: BackgroundsInterface = {
      backgroundColor:
          props.variant.value === 'solid'
            ? {
                [`bg-${props.color.value}-500`]: props.filter.value === 'none', // filter none
                [`bg-${props.color.value}-100`]: props.filter.value === 'lighten', // filter lighten
                [`bg-${props.color.value}-800`]: props.filter.value === 'darken', // filter darken
              }
            : null,
    }
    return Object.values({ ...classes })
  })
  const computedTextColorClasses = computed(() => {
    const classes: TypographyInterface = {
      textColor:
          props.variant.value === 'solid'
            ? {
                'text-white': props.filter.value === 'none', // filter none
                [`text-${props.color.value}-500`]: props.filter.value === 'lighten', // filter lighten
                [`text-${props.color.value}-100`]: props.filter.value === 'darken', // filter darken
              }
            : {
                [`text-${props.color.value}-500`]: props.filter.value === 'none', // filter none
                [`text-${props.color.value}-100`]: props.filter.value === 'lighten', // filter lighten
                [`text-${props.color.value}-800`]: props.filter.value === 'darken', // filter darken
              },
    }
    return Object.values({ ...classes })
  })
  const computedBorderColorClasses = computed(() => {
    const classes: BordersInterface = {
      borderColor:
          props.variant.value === 'outline'
            ? {
                [`border-${props.color.value}-500`]: props.filter.value === 'none', // filter none
                [`border-${props.color.value}-100`]: props.filter.value === 'lighten', // filter lighten
                [`border-${props.color.value}-800`]: props.filter.value === 'darken', // filter darken
              }
            : props.border !== undefined && props.border.value
              ? {
                  'border-white': props.filter.value === 'none', // filter none
                  [`border-${props.color.value}-500`]: props.filter.value === 'lighten', // filter lighten
                  [`border-${props.color.value}-100`]: props.filter.value === 'darken', // filter darken
                }
              : 'border-transparent',
    }
    return Object.values({ ...classes })
  })
  return {
    backgroundColorClasses: computedBackgroundColorClasses,
    textColorClasses: computedTextColorClasses,
    borderColorClasses: computedBorderColorClasses,
  }
}
