<script lang="ts">
export default {
  name: 'LuiTabGroup'
}
</script>

<script setup lang="ts">
import { onMounted, provide, reactive, watch } from 'vue'
import { ContextKey } from './symbols'
import type { TabContext } from './types'

const props = defineProps({
  selectedIndex: {
    type: Number,
    default: -1 // left,center,right
  }
})

const emit = defineEmits(['change'])

const context: TabContext = reactive({
  selectedIndex: 0,
  tabs: [],
  panels: []
})
watch(
  () => props.selectedIndex,
  (newValue) => {
    // check item available
    if (newValue < 0 || newValue > context.tabs.length - 1) {
      // console.log("the provided selectedIndex is not available");
      return
    }
    // check item disable
    if (
      context.tabs[newValue]?.disabled !== undefined &&
      context.tabs[newValue].disabled === true
    ) {
      // console.log("the provided selectedIndex is disabled");
      return
    }
    setSelectedIndex(newValue)
  }
)

function registerTab(tab: any) {
  context.tabs.push(tab.value?.el)
}
function unRegisterTab(tab: any) {
  const tabIndex = context.tabs.findIndex((t) => t.id === tab.id)
  context.tabs.splice(tabIndex, 1)
}
function registerPanel(panel: any) {
  context.panels.push(panel.value)
}

function unRegisterPanel(panel: any) {
  const panelIndex = context.panels.findIndex((p) => p.id === panel.id)
  context.panels.splice(panelIndex, 1)
}
function setSelectedIndex(index: number) {
  context.selectedIndex = index
  emit('change', context.selectedIndex)
}

onMounted(() => {
  // need the throw an error if one of the required component not provided:
  context.selectedIndex = props.selectedIndex !== -1 ? props.selectedIndex : 0
})
provide(ContextKey, {
  context,
  registerTab,
  unRegisterTab,
  registerPanel,
  unRegisterPanel,
  setSelectedIndex
})
</script>

<template>
  <slot />
</template>
