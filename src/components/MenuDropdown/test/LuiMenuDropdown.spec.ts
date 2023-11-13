import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import LuiMenuDropdown from '../LuiMenuDropdown.vue'
import LuiMenuItem from '../../MenuItem/LuiMenuItem.vue'
import LuiBadge from '../../Badge/LuiBadge.vue'

describe('Default LuiMenuDropdown', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(LuiMenuDropdown)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders properly', () => {
    const expectedDefProps = {
      rounded: false,
      block: false,
      menuClasses: '',
      menuPosition: 'bottomLeft',
      filter: 'none',
      teleport: false,
      color: 'primary',
      variant: 'solid',
      text: '',
      size: 'md',
    }

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html).toMatchSnapshot()
    expect(wrapper.findComponent(LuiMenuDropdown).props()).toEqual(
      expectedDefProps,
    )
  })
  it('displays the text properly', async () => {
    const testText = 'lorem ipsum dolar'

    await wrapper.setProps({
      text: testText,
    })
    const menuDropDownButton = wrapper.find(
      '[data-testid="lui-menu-dropdown-button"]',
    )
    expect(menuDropDownButton.text()).toBe(testText)
  })
  it('should not attach event handlers to the activator container if disabled', async () => {
    const button = wrapper.find('button')
    const dropdown: VueWrapper<any> = wrapper.findComponent(LuiMenuDropdown)
    button.trigger('click')

    expect(dropdown.vm.menuActive).toBe(false)
  })
})
describe('LuiMenuDropdown slots', () => {
  let wrapper: VueWrapper<any>
  afterEach(() => {
    wrapper.unmount()
  })
  it('displays the trigger slot properly', async () => {
    const triggerSlotTemplate = {
      components: { LuiMenuDropdown, LuiBadge },
      template: `
      <lui-menu-dropdown>
      <template #trigger="{...attrs}">
        <lui-badge v-bind="attrs" text="Badge Menu" />
      </template>  
      <lui-menu-item>Menu Item</lui-menu-item>
      <lui-menu-item>Menu Item</lui-menu-item>
    </lui-menu-dropdown>
            `,
    }
    wrapper = mount(triggerSlotTemplate)
    const options = wrapper.findComponent(LuiBadge)
    expect(options.exists()).toBe(true)
    expect(options.text()).toBe('Badge Menu')
  })
  it('displays the default slot properly', async () => {
    const defaultSlotTemplate = {
      components: { LuiMenuDropdown, LuiMenuItem },
      template: `
        <lui-menu-dropdown>
            <lui-menu-item>Menu Item</lui-menu-item>
        </lui-menu-dropdown>
            `,
    }
    wrapper = mount(defaultSlotTemplate)
    const options = wrapper.findComponent(LuiMenuItem)
    expect(options.exists()).toBe(true)
    expect(options.text()).toBe('Menu Item')
  })
})

describe('LuiMenuDropdown key events', () => {
  let wrapper: VueWrapper<any>
  let dropdown: VueWrapper<any>
  let defaultSlotTemplate, dropdownButton: any

  beforeEach(() => {
    defaultSlotTemplate = {
      components: { LuiMenuDropdown, LuiMenuItem },
      template: `
              <lui-menu-dropdown>
                  <lui-menu-item>Menu Item</lui-menu-item>
                  <lui-menu-item>Menu Item</lui-menu-item>
                  <lui-menu-item>Menu Item</lui-menu-item>
                  <lui-menu-item>Menu Item</lui-menu-item>
              </lui-menu-dropdown>
                  `,
    }
    wrapper = mount(defaultSlotTemplate)
    dropdown = wrapper.findComponent(LuiMenuDropdown)
    dropdownButton = dropdown.find('[data-testid="lui-menu-dropdown-button"]')
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('should select first element when opening menu with down key', async () => {
    dropdownButton.trigger('keydown', { code: 'ArrowDown' })
    expect(dropdown.vm.menuActive).toBe(true)

    await wrapper.vm.$nextTick()
    expect(dropdown.vm.menuState.currentIndex).toBe(0)
  })
  it('should select last element when opening menu with up key', async () => {
    dropdownButton.trigger('keydown', { code: 'ArrowUp' })
    expect(dropdown.vm.menuActive).toBe(true)

    await wrapper.vm.$nextTick()
    expect(dropdown.vm.menuState.currentIndex).toBe(2)
  })
})
