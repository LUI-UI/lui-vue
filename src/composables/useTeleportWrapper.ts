import { onUnmounted } from 'vue'
import { useId } from '../utils/useId'

const wrapperId = 'lui-teleport-wrapper'
export function useTeleportWrapper(name: string) {
  const teleportId = `lui-teleport-${name}-${useId()}`
  if (typeof window !== 'undefined') {
    const wrapper = document.getElementById(wrapperId)
    if (!wrapper)
      createWrapper()
    createElement(teleportId)
  }

  onUnmounted(() => {
    const teleportWrapper = document.getElementById(teleportId)
    if (teleportWrapper)
      teleportWrapper.remove()
  })
  return teleportId
}
function createWrapper() {
  const body = document.getElementsByTagName('body')
  const teleportWrapper = document.createElement('div')
  teleportWrapper.setAttribute('id', wrapperId)
  body[0].appendChild(teleportWrapper)
}
function createElement(id: string) {
  const wrapper = document.getElementById(wrapperId)
  const teleportElement = document.createElement('div')
  teleportElement.setAttribute('id', id)
  if (wrapper)
    wrapper.appendChild(teleportElement)
}
