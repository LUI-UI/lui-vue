import { Comment } from 'vue'

function isSlotExist(slots: any, name: string) {
  return slots !== undefined && slots[name] !== undefined
}

export function hasSlotContent(slots: any, name: string) {
  const slot = slots[name]?.()[0]
  return (
    isSlotExist(slots, name) &&
    slot.type !== Comment &&
    slot.children.length > 0 &&
    slot.children.every((vnode: any) => vnode.type !== Comment)
  )
}
