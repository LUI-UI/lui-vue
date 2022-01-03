<template>
  <div :class="computedClasses.tabMenuContainer">
    <div
      :class="computedClasses.tabContainer"
      role="tablist"
    >
      <button
        v-for="(prop, index) in tabProps"
        :key="prop.title"
        :ref="(el) => (elements[index] = el)"
        role="tab"
        :tabindex="selectedTitle === prop.title ? '0' : '-1'"
        :aria-selected="selectedTitle === prop.title ? true : false"
        :disabled="prop.disabled !== undefined ? true : false"
        :class="[
          computedClasses.tab,
          selectedTitle === prop.title ? computedClasses.activeTab : computedClasses.defaultTab,
        ]"
        @click="selectedTitle = prop.title"
        @keydown="handleKeyEvents($event, index)"
      >
        <span :class="computedClasses.tabText">{{ prop.title }}</span>
      </button>
    </div>

    <div :class="computedClasses.panel">
      <slot />
    </div>
  </div>
</template>
<script>
import { ref, provide, computed } from 'vue'
import { generateClasses } from '../../mixins/methods'
import * as prop from '../../mixins/props'
export default {
  mixins: [
    prop.string('alignTabs', 'left', ['left', 'center', 'right']),
    prop.string('alignContent', 'left', ['left', 'center', 'right']),
    prop.boolean('stretch')
  ],

  setup(props, { slots }) {

    const tabProps = ref(slots.default().map((tab) => tab.props))

    let initialActive = tabProps.value.findIndex((t) => t.active !== undefined)
    initialActive = initialActive === -1 ? false : initialActive

    let selectedTitle = ref(tabProps.value[initialActive || 0].title)

    const elements = ref([])

    provide('selectedTitle', selectedTitle)

    function handleKeyEvents(e, index) {
      let targetPosition = null
      //right
      if (e.keyCode === 39 && this.tabProps.length > index + 1) targetPosition = index + 1
      //left
      if (e.keyCode === 37 && index - 1 >= 0) targetPosition = index - 1
      //home
      if (e.keyCode === 36) targetPosition = 0
      //end
      // son elemen disabled ise sondan bir onceki elemani target yapmali miyiz ?
      if (e.keyCode === 35) targetPosition = this.tabProps.length - 1

      if (targetPosition !== null && this.tabProps[targetPosition].disabled === undefined) {
        this.selectedTitle = this.tabProps[targetPosition].title
        elements.value[targetPosition].focus()
      }
    }

    const computedClasses = computed(() => {
      const tabContainer = {
        width: 'w-full',
        display: 'flex',
        margin: 'mb-8',
        flexWrap: 'flex-wrap',
        alingItems: 'items-center',
        justifyContent:
          props.alignTabs === 'left'
            ? 'justify-start'
            : props.alignTabs === 'center'
            ? 'justify-center'
            : 'justify-end',
      }
      const tab = {
        lineHeight: 'leading-5',
        fontSize: 'text-base',
        fontWeight: 'font-semibold',
        position: 'relative',
        margin: 'mb-2',
        flexGrow: props.stretch ? 'flex-grow' : '',
        disabled: 'disabled:text-secondary-300',
        after:
          'after:w-full after:h-0.5 after:absolute after:-bottom-2 after:left-0 after:inline-block after:rounded-full after:bg-transparent',
      }
      const panel =
        props.alignContent === 'left'
          ? 'text-left'
          : props.alignContent === 'center'
          ? 'text-center'
          : 'text-right'
      const activeTab = 'text-primary after:bg-primary'
      const defaultTab = 'text-secondary-500'
      const tabMenuContainer = 'w-full'
      const tabText = 'px-4'

      return {
        tabContainer: generateClasses([{ ...tabContainer }]),
        tab: generateClasses([{ ...tab }]),
        panel,
        activeTab,
        defaultTab,
        tabMenuContainer,
        tabText,
      }
    })

    return {
      tabProps,
      selectedTitle,
      elements,
      computedClasses,
      handleKeyEvents,
    }
  },
}
</script>
