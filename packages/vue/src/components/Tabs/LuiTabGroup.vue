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
  tabButtonsContainer: null,
  tabs: [],
  panels: [],
})
function isItemDisabled(index: any) {
  return (
    context.tabs[index]?.disabled !== undefined
    && context.tabs[index].disabled === true
  )
}
const isItemValid = (index: any) => index >= 0 && index < context.tabs.length
function isItemAvailable(index: any) {
  return !isItemDisabled(index) && isItemValid(index)
}

watch(
  () => props.selectedIndex,
  (newValue) => {
    if (isItemAvailable(newValue))
      setSelectedIndex(newValue)
  },
)
onMounted(() => {
  if (isItemAvailable(props.selectedIndex)) {
    context.selectedIndex
      = props.selectedIndex !== -1 ? props.selectedIndex : 0
  }
  else {
    context.selectedIndex = 0
  }
  const activeTab = context.tabs[context.selectedIndex]

  if (context.tabButtonsContainer && context.selectedIndex > 0)
    context.tabButtonsContainer.scrollLeft = activeTab.offsetLeft // TODO: we can center the target element
})

function registerTabButtonsContainer(tab: any) {
  const el = tab.value?.el || tab.value
  context.tabButtonsContainer = el
}
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
  scrollActiveTabOnMobile()
}
function scrollActiveTabOnMobile() {
  if (!window || !window.innerWidth)
    return
  const isMobile = window.innerWidth < 768
  if (isMobile) {
    const activeTab = context.tabs[context.selectedIndex]
    if (!activeTab)
      return
    activeTab.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'smooth',
    })
  }
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
  registerTabButtonsContainer,
})
</script>

<template>
  <slot />
</template>
