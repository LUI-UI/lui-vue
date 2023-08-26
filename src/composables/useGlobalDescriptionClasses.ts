import { computed } from 'vue'
import type { Ref } from 'vue'
import type {
  SpacingInterface,
  TypographyInterface,
} from '@/globals/interfaces'
import type { State } from '@/globals/types'

interface DescriptionPropTypes {
  state: Ref<State>
}

export function useGlobalDescriptionClasses(
  props: DescriptionPropTypes,
  attrs: any,
) {
  const descriptionClasses = computed(() => {
    const classes: TypographyInterface | SpacingInterface = {
      fontSize: 'text-sm',
      lineHeight: 'leading-normal',
      margin: 'mt-1',
      textColor:
        attrs.disabled !== undefined && attrs.disabled === true
          ? 'text-secondary-200 dark:text-secondary-700'
          : {
              'text-secondary-600 dark:text-secondary-400':
                props.state.value === null,
              'text-warning-500': props.state.value === 'warning',
              'text-danger-500': props.state.value === false,
              'text-success-500': props.state.value === true,
            },
    }
    return Object.values({ ...classes })
  })
  return { descriptionClasses }
}
