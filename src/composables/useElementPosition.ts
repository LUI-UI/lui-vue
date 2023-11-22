import { nextTick, ref, unref } from 'vue'
import type { ComponentPublicInstance, Ref } from 'vue'

type TEl = HTMLElement | ComponentPublicInstance | null | undefined | Ref<HTMLElement | undefined | null> | Ref<ComponentPublicInstance | null | undefined>

export function useElementPosition(el: TEl) {
  const top = ref<number>(0)
  const left = ref<number>(0)

  function setPosition() {
    const unwrapped = unref(el)
    if (unwrapped instanceof HTMLElement) {
      const elRect: DOMRect = unwrapped.getBoundingClientRect()
      left.value = elRect.left
      top.value = elRect.top
    }
    else if (unwrapped?.$el instanceof HTMLElement) {
      // If el is a Vue component, you can access its DOM element using $el
      const elRect: DOMRect = unwrapped.$el.getBoundingClientRect()
      left.value = elRect.left
      top.value = elRect.top
    }
  }

  function observe() {
    if (window) {
      nextTick(() => setPosition())
      window.addEventListener('scroll', setPosition)
      window.addEventListener('resize', setPosition)
    }
  }
  function unobserve() {
    window.removeEventListener('scroll', setPosition)
    window.removeEventListener('resize', setPosition)
  }
  return { top, left, setPosition, observe, unobserve }
}
