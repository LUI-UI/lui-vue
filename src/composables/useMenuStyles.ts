import { computed } from 'vue'
import type { Ref } from 'vue'
import type { TwClassInterface } from '@/globals/interfaces'
import type { MenuClasses, Rounded } from '@/globals/types'

interface IMenuStyles {
  teleport: Ref<boolean>
  rounded?: Ref<Rounded>
  menuClasses: Ref<MenuClasses>
  [key: string]: any
}

export function useMenuStyles(params: IMenuStyles) {
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
    return Object.values({ ...optionsWrapper })
  })
  return { classes: params.menuClasses.value.length > 0 ? params.menuClasses : classes }
}
