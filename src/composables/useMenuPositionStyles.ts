import type { Ref } from 'vue'
import { computed, watch } from 'vue'
import { useProperPosition } from './useProperPosition'
import { useElementPosition } from './useElementPosition'
import { useElementSize } from './useElementSize'

import type { Position } from '@/globals/types'

interface IMenuClasses {
  triggerEl: Ref<any>
  menuEl: Ref<any>
  teleport: boolean
  menuPosition: Position
}
interface IPositionSchemeObj {
  direction: 'bottom' | 'top'
  oppositePosition: Position
}
type IPositionClasses = { [P in Position]: string }
type IPositionScheme = { [P in Position]: IPositionSchemeObj }
const positionScheme: IPositionScheme = {
  bottomLeft: {
    direction: 'bottom',
    oppositePosition: 'topLeft',
  },
  topLeft: {
    direction: 'top',
    oppositePosition: 'bottomLeft',
  },
  bottomRight: {
    direction: 'bottom',
    oppositePosition: 'topRight',
  },
  topRight: {
    direction: 'top',
    oppositePosition: 'bottomRight',
  },
  leftTop: {
    direction: 'bottom',
    oppositePosition: 'leftBottom',
  },
  leftBottom: {
    direction: 'top',
    oppositePosition: 'leftTop',
  },
  rightTop: {
    direction: 'bottom',
    oppositePosition: 'rightBottom',
  },
  rightBottom: {
    direction: 'top',
    oppositePosition: 'rightTop',
  },
  bottom: {
    direction: 'bottom',
    oppositePosition: 'top',
  },
  top: {
    direction: 'top',
    oppositePosition: 'bottom',
  },
  left: {
    direction: 'bottom',
    oppositePosition: 'left',
  },
  right: {
    direction: 'bottom',
    oppositePosition: 'right',
  },
}

const positionClasses: IPositionClasses = {
  bottomLeft: 'top-full mt-1',
  topLeft: 'bottom-full mb-1 left-0',
  bottomRight: 'top-full mt-1 right-0',
  topRight: 'bottom-full mb-1 right-0',
  leftTop: 'top-0 mr-1 right-full',
  rightTop: 'top-0 ml-1 left-full',
  leftBottom: 'bottom-0 mr-1 right-full',
  rightBottom: 'bottom-0 ml-1 left-full',
  bottom: 'top-full mt-1 left-1/2 -translate-x-1/2',
  top: 'bottom-full mb-1 left-1/2 -translate-x-1/2',
  left: 'mr-1 right-full top-1/2 -translate-y-1/2',
  right: 'ml-1 left-full top-1/2 -translate-y-1/2',
}
export function useMenuPositionStyles(params: IMenuClasses) {
  const getTargetPosition = (): 'bottom' | 'top' => params.menuPosition.toLowerCase().includes('bottom') ? 'bottom' : 'top'
  const { properPosition } = useProperPosition({
    triggerEl: params.triggerEl,
    menuEl: params.menuEl,
    targetPosition: getTargetPosition(),
  })
  const { top, left } = useElementPosition(params.triggerEl)
  const { width: menuElWidth, height: menuElHeight, observeElement, unobserveElement } = useElementSize(params.menuEl)
  watch(params.menuEl, (val) => {
    if (val)
      observeElement()

    else
      unobserveElement()
  })
  function positionStyles(position: Position): { top: string; left: string } {
    if (!params.triggerEl.value || !params.menuEl.value)
      return { left: '0px', top: '0px' }
    const space = 6 // space between menu and trigger
    const px = (value: number): string => `${value}px`
    const triggerRect = params.triggerEl.value.getBoundingClientRect()
    // positions
    const YBottom = triggerRect.height + top.value + space
    const YTop = top.value - (space + menuElHeight.value)
    const YBottomFromTop = top.value
    const YTopFromBottom = top.value - (menuElHeight.value - triggerRect.height)
    const YCenter = YTop + space + ((menuElHeight.value + triggerRect.height) / 2)
    const XLeft = left.value
    const XRight = left.value - (menuElWidth.value - triggerRect.width)
    const XCenter = left.value - ((menuElWidth.value - triggerRect.width) / 2)
    const XLeftFull = left.value - (menuElWidth.value + space)
    const XRightFull = left.value + triggerRect.width + space
    switch (position) {
      case 'bottomLeft':
        return { top: px(YBottom), left: px(XLeft) }
      case 'topLeft':
        return { top: px(YTop), left: px(XLeft) }
      case 'bottomRight':
        return { top: px(YBottom), left: px(XRight) }
      case 'topRight':
        return { top: px(YTop), left: px(XRight) }
      case 'leftTop':
        return { top: px(YBottomFromTop), left: px(XLeftFull) }
      case 'rightTop':
        return { top: px(YBottomFromTop), left: px(XRightFull) }
      case 'rightBottom':
        return { top: px(YTopFromBottom), left: px(XRightFull) }
      case 'leftBottom':
        return { top: px(YTopFromBottom), left: px(XLeftFull) }
      case 'bottom':
        return { top: px(YBottom), left: px(XCenter) }
      case 'top':
        return { top: px(YTop), left: px(XCenter) }
      case 'left':
        return { top: px(YCenter), left: px(XLeftFull) }
      case 'right':
        return { top: px(YCenter), left: px(XRightFull) }
    }
  }
  const computedMenuClasses = computed(() => {
    return positionScheme[params.menuPosition].direction === properPosition.value
      ? positionClasses[params.menuPosition]
      : positionClasses[positionScheme[params.menuPosition].oppositePosition]
  })
  const computedMenuPositions = computed(() => {
    return positionScheme[params.menuPosition].direction === properPosition.value
      ? positionStyles(params.menuPosition)
      : positionStyles(positionScheme[params.menuPosition].oppositePosition)
  })
  return params.teleport ? { style: computedMenuPositions } : { style: computedMenuClasses }
}
