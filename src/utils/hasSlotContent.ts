import { Comment } from 'vue'

function asArray(arg: any) {
  return Array.isArray(arg) ? arg : arg != null ? [arg] : []
}
function isVNodeEmpty(vnode: any) {
  return !vnode || asArray(vnode).every((vnode) => vnode.type === Comment)
}
function isSlotEmpty(slot: any, props = {}) {
  return isVNodeEmpty(slot?.(props))
}
export function hasSlotContent(slot: any, props = {}) {
  return !isSlotEmpty(slot, props)
}
