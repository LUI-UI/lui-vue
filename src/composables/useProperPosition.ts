import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useElementSize } from './useElementSize'

interface ProperPosition {
  triggerEl: Ref<any>
  menuEl: Ref<any>
  targetPosition: 'bottom' | 'top'
}

export function useProperPosition(params: ProperPosition) {
  const properPosition = ref<string>('bottom')
  const targetTop = ref<number>(0)
  const targetLeft = ref<number>(0)
  // const menuHeight = ref(0)
  const { height: menuHeight, observeElement, unobserveElement } = useElementSize(params.menuEl)

  watch(menuHeight, () => updatePosition())
  watch(params.menuEl, (val) => {
    if (val)
      observeElement()

    else
      unobserveElement()
  })
  function updatePosition() {
    const elRect: DOMRect = params.triggerEl.value.getBoundingClientRect()
    if (elRect === undefined || typeof window === 'undefined') {
      properPosition.value = params.targetPosition
      return
    }
    const space = 20
    const spaceAbove = elRect.top
    const spaceBelow = window.innerHeight - elRect.bottom
    targetLeft.value = elRect.left
    targetTop.value = elRect.top

    if (params.targetPosition === 'bottom') {
      if (spaceBelow < menuHeight.value + space && spaceAbove > menuHeight.value + space)
        properPosition.value = 'top'

      else properPosition.value = 'bottom'
    }
    if (params.targetPosition === 'top') {
      if (spaceAbove < menuHeight.value + space && spaceBelow > menuHeight.value + space)
        properPosition.value = 'bottom'
      else properPosition.value = 'top'
    }
  }

  nextTick(() => updatePosition()) // for initial update
  onMounted(() => window.addEventListener('scroll', updatePosition))
  onUnmounted(() => window.removeEventListener('scroll', updatePosition))

  return { properPosition, targetTop, targetLeft }
}
