import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { isClient } from '../utils/isClient'

export function useOverflowWatcher(overflowVariable: Ref<boolean>) {
  const overflowValue = ref<'hidden' | 'auto' | ''>('')
  onMounted(() => {
    watchEffect(() => {
      if (isClient()) {
        const body = document.querySelector('body')
        overflowValue.value = overflowVariable.value ? 'hidden' : 'auto'
        if (body !== null)
          body.style.overflow = overflowValue.value
      }
      else {
        overflowValue.value = 'auto'
      }
    })
  })

  onBeforeUnmount(() => {
    const body = document.querySelector('body')
    if (body !== null)
      body.style.overflow = ''
  })

  return {
    overflowValue,
  }
}
