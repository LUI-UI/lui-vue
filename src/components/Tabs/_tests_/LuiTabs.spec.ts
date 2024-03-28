import { describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import LuiTabButton from '../LuiTabButton.vue'
import LuiTabButtons from '../LuiTabButtons.vue'
import LuiTabGroup from '../LuiTabGroup.vue'
import LuiTabPanel from '../LuiTabPanel.vue'
import LuiTabPanels from '../LuiTabPanels.vue'

const components = {
  LuiTabGroup,
  LuiTabButton,
  LuiTabButtons,
  LuiTabPanel,
  LuiTabPanels,
}
describe('LuiTab', () => {
  it('should respond to clicks', () => {
    const myTemplate = {
      template: `
            <lui-tab-group>
              <lui-tab-buttons>
                <lui-tab-button>Tab-1</lui-tab-button>
                <lui-tab-button>Tab-2</lui-tab-button>
                <lui-tab-button>Tab-3</lui-tab-button>
              </lui-tab-buttons>
              <lui-tab-panels>
                <lui-tab-panel>Panel-1</lui-tab-panel>
                <lui-tab-panel>Panel-2</lui-tab-panel>
                <lui-tab-panel>Panel-3</lui-tab-panel>
              </lui-tab-panels>
            </lui-tab-group>`,
      components,
    }
    const wrapper = mount(myTemplate)
    const tabGroup: VueWrapper<any> = wrapper.findComponent(LuiTabGroup)
    expect(tabGroup.vm.context.selectedIndex).toBe(0)
    const tabButtons = wrapper.findAllComponents(LuiTabButton)
    tabButtons[1].trigger('mouseup')
    expect(tabGroup.vm.context.selectedIndex).toBe(1)
  })
  it('selects as initial the desired index tab from selected-index prop', () => {
    const desiredIndex = 1
    const myTemplate = {
      template: `
              <lui-tab-group :selected-index="${desiredIndex}">
                <lui-tab-buttons>
                  <lui-tab-button>Tab-1</lui-tab-button>
                  <lui-tab-button>Tab-2</lui-tab-button>
                  <lui-tab-button>Tab-3</lui-tab-button>
                </lui-tab-buttons>
                <lui-tab-panels>
                  <lui-tab-panel>Panel-1</lui-tab-panel>
                  <lui-tab-panel>Panel-2</lui-tab-panel>
                  <lui-tab-panel>Panel-3</lui-tab-panel>
                </lui-tab-panels>
              </lui-tab-group>`,
      components,
    }
    const wrapper = mount(myTemplate)
    const tabGroup: VueWrapper<any> = wrapper.findComponent(LuiTabGroup)
    expect(tabGroup.vm.context.selectedIndex).toBe(desiredIndex)
  })
  it('disables the tab when prop is given', () => {
    const myTemplate = {
      template: `
              <lui-tab-group>
                <lui-tab-buttons>
                  <lui-tab-button>Tab-1</lui-tab-button>
                  <lui-tab-button disabled>Tab-2</lui-tab-button>
                  <lui-tab-button>Tab-3</lui-tab-button>
                </lui-tab-buttons>
                <lui-tab-panels>
                  <lui-tab-panel>Panel-1</lui-tab-panel>
                  <lui-tab-panel>Panel-2</lui-tab-panel>
                  <lui-tab-panel>Panel-3</lui-tab-panel>
                </lui-tab-panels>
              </lui-tab-group>`,
      components,
    }
    const wrapper = mount(myTemplate)
    const tabGroup: VueWrapper<any> = wrapper.findComponent(LuiTabGroup)
    expect(tabGroup.vm.context.selectedIndex).toBe(0)
    const buttons = wrapper.findAllComponents(LuiTabButton)
    // click to index 1 since the disabled element's index is 1
    buttons[1].trigger('mouseup')
    expect(tabGroup.vm.context.selectedIndex).toBe(0)
  })
  it('applies the desired classes to LuiTabButtons when custom-style prop is given', () => {
    const desiredClasses = 'bg-secondary-200 w-max rounded'
    const myTemplate = {
      template: `
              <lui-tab-group>
                <lui-tab-buttons custom-style class="${desiredClasses}">
                  <lui-tab-button>Tab-1</lui-tab-button>
                  <lui-tab-button>Tab-2</lui-tab-button>
                  <lui-tab-button>Tab-3</lui-tab-button>
                </lui-tab-buttons>
                <lui-tab-panels>
                  <lui-tab-panel>Panel-1</lui-tab-panel>
                  <lui-tab-panel>Panel-2</lui-tab-panel>
                  <lui-tab-panel>Panel-3</lui-tab-panel>
                </lui-tab-panels>
              </lui-tab-group>`,
      components,
    }
    const wrapper = mount(myTemplate)
    expect(wrapper.findComponent(LuiTabButtons).classes()).toEqual(
      expect.arrayContaining(desiredClasses.split(' ')),
    )
  })

  it('works properly with custom slot', () => {
    const desiredClasses = 'bg-secondary-200 w-max rounded'
    const myTemplate = {
      template: `
              <lui-tab-group>
                <lui-tab-buttons custom-style class="${desiredClasses}">
                <lui-tab-button>
                <template #custom="{ isSelected, ...props }">
                  <div class="custom-slot-content" v-bind="props">
                    Custom Tab Content
                  </div>
                </template>
              </lui-tab-button>
                </lui-tab-buttons>
                <lui-tab-panels>
                  <lui-tab-panel>Panel-1</lui-tab-panel>
                  <lui-tab-panel>Panel-2</lui-tab-panel>
                  <lui-tab-panel>Panel-3</lui-tab-panel>
                </lui-tab-panels>
              </lui-tab-group>`,
      components,
    }
    const wrapper = mount(myTemplate)
    // Find the custom slot content in the tab button
    const customSlotContent = wrapper.find('.custom-slot-content')

    // Assert on the presence and text content of the custom slot
    expect(customSlotContent.exists()).toBe(true)
    expect(customSlotContent.text()).toBe('Custom Tab Content')
  })

  it('triggers an event with change event', () => {
    let testData = 0

    const myTemplate = {
      template: `
        <lui-tab-group @change="myFunction">
          <lui-tab-buttons custom-style>
            <lui-tab-button>Tab-1</lui-tab-button>
            <lui-tab-button>Tab-2</lui-tab-button>
            <lui-tab-button>Tab-3</lui-tab-button>
          </lui-tab-buttons>
          <lui-tab-panels>
            <lui-tab-panel>Panel-1</lui-tab-panel>
            <lui-tab-panel>Panel-2</lui-tab-panel>
            <lui-tab-panel>Panel-3</lui-tab-panel>
          </lui-tab-panels>
        </lui-tab-group>`,
      components,
      methods: {
        myFunction() {
          testData++
        },
      },
    }

    const wrapper = mount(myTemplate)
    const buttons = wrapper.findAllComponents(LuiTabButton)
    buttons[1].trigger('mouseup')

    expect(testData).toBe(1)
  })
})
// it is not working properly with arrow keys.
