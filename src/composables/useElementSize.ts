// import { onMounted, onUnmounted, nextTick } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

export function useElementSize(element: Ref<HTMLElement | null>) {
  const width = ref(0)
  const height = ref(0)
  let observer: any = null

  function handleResize(entries: any) {
    width.value = entries[0].contentRect.width
    height.value = entries[0].contentRect.height
    // console.log('entries:', entries)
    // for (const entry of entries) {
    //   width.value = entry.contentRect.width
    //   height.value = entry.contentRect.height
    // }
  }

  function observeElement() {
    observer = new ResizeObserver(handleResize)
    observer.observe(element.value)
  }

  function unobserveElement() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => observeElement())

  onUnmounted(() => unobserveElement())

  return {
    width,
    height
  }
}
