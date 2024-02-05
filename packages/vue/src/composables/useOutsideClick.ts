import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { isClient } from '../utils/isClient'

export function useOutsideClick(ref: Ref<HTMLElement | undefined>, callback: any) {
  function handleClick(event: Event) {
    if (event.target instanceof Node && !ref.value?.contains(event?.target))
      callback()
  }

  onMounted(() => {
    if (isClient())
      document.addEventListener('click', handleClick)
  })
  onUnmounted(() => document.removeEventListener('click', handleClick))
}
