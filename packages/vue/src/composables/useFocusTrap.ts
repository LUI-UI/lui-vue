import { customRef } from 'vue'
import { createFocusTrap } from 'focus-trap'
import type { Options } from 'focus-trap'

export function useFocusTrap(focusTrapArgs?: Options) {
  let trap: any = null
  function initFocusTrap(el: any, focusTrapArgs: Options = {}) {
    if (!el)
      return
    trap = createFocusTrap(el, focusTrapArgs)
    trap.activate()
  }
  function clearFocusTrap() {
    trap?.deactivate()
    trap = null
  }

  const trapRef = customRef((track, trigger) => {
    let $trapEl: any = null
    return {
      get() {
        track()
        return $trapEl
      },
      set(value) {
        $trapEl = value
        value ? initFocusTrap(value, focusTrapArgs) : clearFocusTrap()
        trigger()
      },
    }
  })

  return {
    trapRef,
    initFocusTrap,
    clearFocusTrap,
  }
}
