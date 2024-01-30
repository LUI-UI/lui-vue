<script lang="ts">
export default {
  name: 'LuiTabGroup',
}
</script>

<script setup lang="ts">
import { onMounted, provide, reactive, watch } from 'vue'
import { ContextKey } from './symbols'
import type { TabContext } from './types'

const props = defineProps({
  selectedIndex: {
    type: Number,
    default: -1,
  },
})

const emit = defineEmits(['change'])

const context: TabContext = reactive({
  selectedIndex: 0,
  tabs: [],
  panels: [],
})
const isItemDisabled = (index: any) => context.tabs[index]?.disabled !== undefined && context.tabs[index].disabled === true
const isItemValid = (index: any) => index >= 0 && index < context.tabs.length
const isItemAvailable = (index: any) => !isItemDisabled(index) && isItemValid(index)

watch(
  () => props.selectedIndex,
  (newValue) => {
    if (isItemAvailable(newValue))
      setSelectedIndex(newValue)
  },
)
onMounted(() => {
  if (isItemAvailable(props.selectedIndex))
    context.selectedIndex = props.selectedIndex !== -1 ? props.selectedIndex : 0
  else
    context.selectedIndex = 0
})

function registerTab(tab: any) {
  const el = tab.value?.el || tab.value
  context.tabs.push(el)
}
function unRegisterTab(tab: any) {
  const tabIndex = context.tabs.findIndex(t => t.id === tab.id)
  context.tabs.splice(tabIndex, 1)
}
function registerPanel(panel: any) {
  context.panels.push(panel.value)
}

function unRegisterPanel(panel: any) {
  const panelIndex = context.panels.findIndex(p => p.id === panel.id)
  context.panels.splice(panelIndex, 1)
}
function setSelectedIndex(index: number) {
  context.selectedIndex = index
  emit('change', context.selectedIndex)
}

// onMounted(() => {
//   // need the throw an error if one of the required component not provided:
//   context.selectedIndex = props.selectedIndex !== -1 ? props.selectedIndex : 0
// })
provide(ContextKey, {
  context,
  registerTab,
  unRegisterTab,
  registerPanel,
  unRegisterPanel,
  setSelectedIndex,
})
</script>

<template>
  <slot />
</template>
