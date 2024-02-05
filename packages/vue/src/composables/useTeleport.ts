import { computed } from 'vue'
import { isClient } from '../utils/isClient'
import { useId } from '../utils/useId'

const wrapperId = 'lui-teleport-wrapper'

function createWrapper() {
  const body = document.getElementsByTagName('body')
  const teleportWrapper = document.createElement('div')
  teleportWrapper.setAttribute('id', wrapperId)
  body[0].appendChild(teleportWrapper)
  return teleportWrapper
}

function createElement(name: string) {
  const id = `lui-teleport-${name}-${useId()}`
  const teleportElement = document.createElement('div')
  teleportElement.setAttribute('id', id)
  return teleportElement
}

export function useTeleport(name: string) {
  const teleportTarget = computed(() => {
    if (!isClient())
      return undefined
    const wrapper = document.getElementById('lui-teleport-wrapper') || createWrapper()
    const targetElement = createElement(name)
    wrapper.appendChild(targetElement)
    return targetElement
  })

  return { teleportTarget }
}
