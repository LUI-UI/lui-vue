import { onMounted, onUnmounted, ref, nextTick, watch } from 'vue'
import { useElementSize } from './useElementSize'
import type { Ref } from 'vue'

interface ProperPosition {
  triggerEl: Ref<any>
  MenuEl: Ref<any>
  targetPosition: 'bottom' | 'top'
}

export function useProperPosition(params: ProperPosition) {
  const properPosition = ref<string>('bottom')
  const { height: menuHeight } = useElementSize(params.MenuEl)

  watch(menuHeight, () => updatePosition())

  function updatePosition() {
    const elRect: DOMRect = params.triggerEl.value.getBoundingClientRect()
    if (elRect == undefined || typeof window === 'undefined') {
      properPosition.value = params.targetPosition
      return
    }
    const spaceAbove = elRect.top
    const spaceBelow = window.innerHeight - elRect.bottom
    // +30 for relax space
    if (params.targetPosition === 'bottom') {
      if (spaceBelow > menuHeight.value + 30) {
        properPosition.value = 'bottom'
      } else {
        properPosition.value = 'top'
      }
    }
    if (params.targetPosition === 'top') {
      if (spaceAbove > menuHeight.value + 30) {
        properPosition.value = 'top'
      } else {
        properPosition.value = 'bottom'
      }
    }
  }
  nextTick(() => {
    // for initial update
    updatePosition()
  })
  onMounted(() => window.addEventListener('scroll', updatePosition))
  onUnmounted(() => window.removeEventListener('scroll', updatePosition))

  return { properPosition }
}