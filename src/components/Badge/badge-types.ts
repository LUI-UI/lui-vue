import type { PropType } from 'vue'
import type { Border, Color, Filter, NarrowedVariant, Size, Text } from '../../globals/types'

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export const badgeTypes = {
  variant: {
    type: String as PropType<NarrowedVariant>,
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
  border: {
    type: Boolean as PropType<Border>,
    default: false,
  },
  text: {
    type: String as PropType<Text>,
    default: '',
  },
  position: {
    type: String as PropType<Position>,
    default: 'bottom-right',
  },
}
