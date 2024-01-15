import { computed } from 'vue'
import type { Ref } from 'vue'
import type { TwClassInterface } from '../globals/interfaces'
import type { Position, Rounded } from '../globals/types'
import { useMenuPositionStyles } from './useMenuPositionStyles'

interface IMenuStyles {
  triggerEl: Ref<any>
  menuEl: Ref<any>
  menuPosition: Ref<Position>
  teleport: Ref<boolean>
  rounded?: Ref<Rounded>
  [key: string]: any
}

export function useMenuStyles(params: IMenuStyles) {
  const { style: menuPositionStyles } = useMenuPositionStyles({
    triggerEl: params.triggerEl,
    menuEl: params.menuEl,
    menuPosition: params.menuPosition.value,
    teleport: params.teleport.value,
  })
  const classes = computed(() => {
    const optionsWrapper: TwClassInterface = {
      width: 'w-max',
      maxWidth: 'max-w-max',
      zIndex: 'z-50',
      maxHeight: 'max-h-96',
      minWidth: !params.teleport.value ? 'min-w-full' : '',
      overflow: 'overflow-y-auto',
      backgroundColor: 'bg-secondary-50 dark:bg-secondary-900',
      borderWidth: 'border',
      borderColor: 'border-secondary-200 dark:border-secondary-700',
      borderRadius: {
        'rounded-md': params.rounded && params.rounded.value === true,
        'rounded-2xl': params.rounded && params.rounded.value === 'full',
      },
      boxShadow: 'shadow-lg',
    }
    const wrapperClasses = Object.values({ ...optionsWrapper })
    return params.menuClasses.value.length > 0
      ? params.teleport.value
        ? ['fixed', params.menuClasses.value]
        : ['absolute', menuPositionStyles.value, params.menuClasses.value]
      : params.teleport.value
        ? ['fixed', wrapperClasses]
        : ['absolute', wrapperClasses, menuPositionStyles.value]
  })
  const styles = computed<{ left: string; top: string } | undefined>(() => params.teleport.value && typeof menuPositionStyles.value !== 'string' ? menuPositionStyles.value : undefined)
  return { classes, styles, menuPositionStyles }
}
