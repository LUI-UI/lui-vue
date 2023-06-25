<script lang="ts">
export default {
  name: 'LuiTabPanel'
}
</script>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import type { PropType } from 'vue'
import { useId } from '../../utils/useId'
import { ContextKey } from './symbols'
import type { AlignmentTypes } from './types'
import type { TwClassInterface } from '@/globals/interfaces'

const props = defineProps({
  alignContent: {
    type: String as PropType<AlignmentTypes>,
    default: 'left'
  },
  id: {
    type: String as PropType<string>,
    default: () => `lui-tab-panel-${useId()}`
  }
})
// const panelId = `lui-tab-panel-${useId()}`;
const panelRef = ref(null)
const injection = inject(ContextKey)

onMounted(() => injection?.registerPanel(panelRef))
onUnmounted(() => injection?.unRegisterPanel(panelRef))

const selectedTabId = computed(() => injection?.context.tabs[injection.context.selectedIndex]?.id)
const isSelected = computed(() => {
  const selectedPanel = injection?.context.panels[injection?.context.selectedIndex]
  return selectedPanel?.id === props.id
  // const panelIndex = injection?.context.panels.findIndex(
  //   (p) => p?.id === props.id
  // );
  // return panelIndex === injection?.context.selectedIndex;
})
const tabPanelClasses = computed(() => {
  const classes: TwClassInterface = {
    display: 'flex',
    padding: 'p-4',
    justifyItems: {
      'justify-start': props.alignContent === 'left',
      'justify-center': props.alignContent === 'center',
      'justify-end': props.alignContent === 'right'
    }
  }
  return Object.values(classes)
})
</script>

<template>
  <div
    v-show="isSelected"
    :id="id"
    ref="panelRef"
    role="tabpanel"
    tabindex="0"
    :aria-labelledby="selectedTabId"
    :class="tabPanelClasses"
  >
    <slot />
  </div>
  <!-- <div
    v-if="title == injection?.selectedTab?.value?.title"
    :id="injection?.selectedTab?.value?.panelId"
    role="tabpanel"
    tabindex="0"
    :aria-labelledby="injection?.selectedTab?.value?.tabId"
    class="computedClasses.panel"
  >
    <slot />
  </div> -->
</template>
