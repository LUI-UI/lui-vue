import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'

export function useOverflowWatcher(overflowVariable: Ref<boolean>) {
  const overflowValue = ref<'hidden' | 'auto' | ''>('')
  onMounted(() => {
    watchEffect(() => {
      const body = document.querySelector('body')
      overflowValue.value = overflowVariable ? 'hidden' : 'auto'

      if (body !== null)
        body.style.overflow = overflowValue.value
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
