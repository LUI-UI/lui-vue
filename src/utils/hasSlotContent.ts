import { Comment, Fragment } from 'vue'

function asArray(arg: any) {
  return Array.isArray(arg) ? arg : arg != null ? [arg] : []
}
function isVNodeEmpty(vnode: any) {
  return !vnode || asArray(vnode).every((vnode) => vnode.type === Comment)
}
function isSlotEmpty(slot: any, props = {}) {
  return isVNodeEmpty(slot?.(props))
}
function isVnodeIncludes(vnode: any, requiredComponentName: string) {
  return (
    vnode !== undefined &&
    asArray(vnode).some((vnode) =>
      vnode.type === Fragment
        ? vnode.children.some(
            (childNode: any) =>
              childNode.type.name !== undefined && childNode.type.name === requiredComponentName
          )
        : vnode.type.name === requiredComponentName
    )
  )
}
export function hasSlotContent(slot: any, props = {}) {
  return !isSlotEmpty(slot, props)
}
export function isSlotIncludesComponent(slot: any, requiredComponentName: string) {
  return isVnodeIncludes(slot?.(), requiredComponentName)
}
