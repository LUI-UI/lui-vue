import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import LuiOption from '../../Option/LuiOption.vue'
import LuiMultiSelect from '../LuiMultiSelect.vue'

const names = [
  {
    value: 1,
    text: 'Wade Cooper',
  },
  {
    value: 2,
    text: 'Arlene Mccoy',
  },
  {
    value: 3,
    text: 'Devon Webb',
  },
  {
    value: 4,
    text: 'Tom Cook',
  },
  {
    value: 5,
    text: 'Tanya Fox',
  },
  {
    value: 6,
    text: 'Hellen Schmidt',
  },
]

describe('Default LuiMultiSelect', () => {
  let wrapper: VueWrapper<any>
  const defaultProps = {
    rounded: true,

    block: false,

    state: null,

    stateIcon: null,

    options: names,

    placeholder: '',

    size: 'md',

    description: null,

    searchable: false,

    tags: true,

    disabled: false,
    tagProps: undefined,

    hideAppend: false,

    menuPosition: 'bottomLeft',

    modelValue: undefined,
  }
  beforeEach(() => {
    wrapper = mount(LuiMultiSelect, {
      props: {
        options: names,
      },
    })
  })

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })
  it('renders with default props properly', async () => {
    await wrapper.vm.$nextTick
    expect(wrapper.props()).toEqual(defaultProps)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html).toMatchSnapshot()
  })
  it('renders LuiTag component as default', async () => {
    const options = wrapper.findAll('[data-testid="lui-multi-select-option"]')
    await options[0].trigger('click')

    const selecteds = wrapper.findAll(
      '[data-testid="lui-multi-select-selected"]',
    )
    expect(selecteds[0].element.tagName).toBe('BUTTON')
    expect(selecteds[0].classes()).contain('lui-tag')
  })
  it('renders LuiText when tags prop is false', async () => {
    wrapper.setProps({ tags: false })
    const options = wrapper.findAll('[data-testid="lui-multi-select-option"]')
    await options[0].trigger('click')

    const selecteds = wrapper.findAll(
      '[data-testid="lui-multi-select-selected"]',
    )
    expect(selecteds[0].element.tagName).toBe('SPAN')
  })

  it('closes options when user click outside', async () => {
    let optionsContainer = wrapper.find(
      '[data-testid="lui-multi-select-options-container"]',
    )
    const mainContainer = wrapper.find(
      '[data-testid="lui-multi-select-container"]',
    )
    expect(optionsContainer.attributes().style).toBe('display: none;')

    await mainContainer.trigger('click')

    optionsContainer = wrapper.find(
      '[data-testid="lui-multi-select-options-container"]',
    )
    expect(optionsContainer.attributes().style).not.toBe('display: none;')
    // simulate the outside click
    await document.body.click()
    optionsContainer = wrapper.find(
      '[data-testid="lui-multi-select-options-container"]',
    )
    expect(optionsContainer.attributes().style).toBe('display: none;')
  })
})

describe('LuiMultiSelect with v-model', () => {
  let wrapper: VueWrapper<any>
  const myRef = ref([names[2], names[3]])

  beforeEach(() => {
    wrapper = mount(LuiMultiSelect, {
      props: {
        'options': names,
        'onUpdate:modelValue': (e: any) => (myRef.value = e),
      },
    })
  })

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })

  it('should add selected options to v-model', async () => {
    const options = wrapper.findAll('[data-testid="lui-multi-select-option"]')
    await options[0].trigger('click')
    expect(myRef.value).toEqual(['Wade Cooper'])
  })

  it('should remove selected options from v-model', async () => {
    const options = wrapper.findAll('[data-testid="lui-multi-select-option"]')
    await options[0].trigger('click')
    expect(myRef.value).toEqual(['Wade Cooper'])

    // Click again to remove the selection
    await options[0].trigger('click')
    expect(myRef.value).toEqual([])
  })

  it('should update selected options in the UI', async () => {
    const options = wrapper.findAll('[data-testid="lui-multi-select-option"]')
    await options[0].trigger('click')
    let selecteds = wrapper.findAll(
      '[data-testid="lui-multi-select-selected"]',
    )
    expect(selecteds.length).toBe(1)
    expect(selecteds[0].text()).toBe(names[0].text)

    // Click again to remove the selection
    await options[0].trigger('click')
    selecteds = wrapper.findAll('[data-testid="lui-multi-select-selected"]')
    expect(selecteds.length).toBe(0)
  })
})
describe('LuiMultiSelect with slots', () => {
  let wrapper: VueWrapper<any>
  const names = [
    { value: 1, text: 'Wade Cooper' },
    { value: 2, text: 'Arlene Mccoy' },
    { value: 3, text: 'Devon Webb' },
    { value: 4, text: 'Tom Cook' },
    { value: 5, text: 'Tanya Fox' },
    { value: 6, text: 'Hellen Schmidt' },
  ]

  const testTemplate = {
    components: { LuiMultiSelect, LuiOption },
    template: `
      <lui-multi-select>
        <lui-option v-for="item in options" :key="item.value" :text="item.text" data-testid="lui-multi-select-option" />
      </lui-multi-select>
    `,
    data() {
      return {
        options: names,
      }
    },
  }

  beforeEach(() => {})

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })

  it('should render options correctly', () => {
    wrapper = mount(testTemplate)
    const options = wrapper.findAll('[data-testid="lui-multi-select-option"]')
    expect(options.length).toBe(names.length)
  })

  it('should render prepend slot correctly', () => {
    wrapper = mount(LuiMultiSelect, {
      props: { options: names },
      slots: {
        prepend: `
        <i class="ri-home-line"></i>
     `,
      },
    })
    expect(
      wrapper.find('[data-testid="lui-multi-select-slot-prepend"]').exists(),
    ).toBe(true)
  })
  it('should render append slot correctly', () => {
    wrapper = mount(LuiMultiSelect, {
      props: { options: names },
      slots: {
        append: `
        <i class="ri-home-line"></i>
     `,
      },
    })
    expect(
      wrapper.find('[data-testid="lui-multi-select-slot-append"]').exists(),
    )
  })
})

describe('LuiMultiSelect keyboard events', () => {
  let wrapper: VueWrapper<any>
  let mainContainer: DOMWrapper<Element>
  let simulateKeyPress: (arg0: string) => void

  beforeEach(async () => {
    wrapper = await mount(LuiMultiSelect, {
      props: {
        options: names,
        searchable: true,
      },
    })
    mainContainer = wrapper.find('[data-testid="lui-multi-select-container"]')

    simulateKeyPress = async (key: string) =>
      await wrapper
        .find('[data-testid="lui-multi-select-options-container"]')
        .trigger('keydown', { code: key })
  })

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })

  it('slides on the dropdown menu by arrow keys', () => {
    // Simulate arrow down key press

    simulateKeyPress('ArrowDown')
    expect(wrapper.vm.listboxState.currentIndex).toBe(1)
    simulateKeyPress('ArrowDown')
    expect(wrapper.vm.listboxState.currentIndex).toBe(2)
    simulateKeyPress('ArrowUp')
    expect(wrapper.vm.listboxState.currentIndex).toBe(1)
  })
  it('selects the option by enter key', async () => {
    // check if selecteds count increasing when enter key is pressed
    let selecteds = wrapper.findAll(
      '[data-testid="lui-multi-select-selected"]',
    )
    expect(selecteds.length).toBe(0)
    await simulateKeyPress('Enter')
    console.log(wrapper.vm.selectedOptions)
    selecteds = wrapper.findAll('[data-testid="lui-multi-select-selected"]')
    expect(selecteds.length).toBe(1)
  })
  it('updates the focused index to 0 with home key', () => {
    // give a random value other than 0
    wrapper.vm.listboxState.currentIndex = 2

    simulateKeyPress('Home')
    expect(wrapper.vm.listboxState.currentIndex).toBe(0)
  })
  it('updates the focused index to last index with end key', () => {
    simulateKeyPress('End')
    expect(wrapper.vm.listboxState.currentIndex).toBe(
      wrapper.props().options.length - 1,
    )
  })
  it('closes the listbox with the escape key', () => {
    wrapper.vm.optionsActive = true
    expect(wrapper.vm.optionsActive).toBe(true)
    simulateKeyPress('Escape')
    expect(wrapper.vm.optionsActive).toBe(false)
  })
})
describe('LuiMultiSelect Search Feature', () => {
  let wrapper: VueWrapper<any>
  let inputEl: DOMWrapper<Element>
  let optionsContainer: DOMWrapper<Element>

  beforeEach(async () => {
    wrapper = await mount(LuiMultiSelect, {
      props: {
        options: names,
        searchable: true,
      },
    })
    inputEl = wrapper.find('[data-testid="lui-multi-select-input"]')
    optionsContainer = wrapper.find(
      '[data-testid="lui-multi-select-options-container"]',
    )
  })

  it('should filter options based on the search query, and select from the query', async () => {
    await inputEl.setValue('tanya')
    const options = wrapper.findAll('[data-testid="lui-multi-select-option"]')
    expect(options.length).toBe(1)

    // selection from the query

    await optionsContainer.trigger('keydown', { code: 'ArrowDown' })
    await optionsContainer.trigger('keydown', { code: 'Enter' })
    const selecteds = wrapper.findAll(
      '[data-testid="lui-multi-select-selected"]',
    )
    expect(selecteds.length).toBe(1)
  })

  it('should display all options when search query is cleared', async () => {
    await inputEl.setValue('')
    const options = wrapper.findAll('[data-testid="lui-multi-select-option"]')
    expect(options.length).toBe(names.length)
  })

  it('should handle search with selected items', async () => {
    await optionsContainer.trigger('keydown', { code: 'ArrowDown' })
    await optionsContainer.trigger('keydown', { code: 'Enter' })
    await inputEl.setValue('devon')
    const options = wrapper.findAll('[data-testid="lui-multi-select-option"]')
    expect(options.length).toBe(1)
  })
  it('should keep text field focused while selecting items from open menu', async () => {
    const wrapper = await mount(LuiMultiSelect, {
      props: {
        options: names,
        searchable: true,
      },
      attachTo: document.body,
    })
    expect(optionsContainer.attributes().style).toBe('display: none;')

    const mainContainer = wrapper.find(
      '[data-testid="lui-multi-select-container"]',
    )
    await mainContainer.trigger('click')

    optionsContainer = wrapper.find(
      '[data-testid="lui-multi-select-options-container"]',
    )
    expect(optionsContainer.attributes().style).not.toBe('display: none;')

    // Simulate ArrowDown key press
    await optionsContainer.trigger('keydown', { code: 'ArrowDown' })

    // Simulate Enter key press
    await optionsContainer.trigger('keydown', { code: 'Enter' })

    // Update inputEl
    inputEl = wrapper.find('[data-testid="lui-multi-select-input"]')
    expect(document.activeElement).toBe(inputEl.element)
  })
  afterEach(() => {
    // Clean up, reset, or destroy the wrapper as needed
    wrapper.unmount()
  })
})
// tests for placeholder
describe('Default LuiMultiSelect', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiMultiSelect, {
      props: {
        options: names,
        placeholder: 'names',
      },
    })
  })

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })
  it('displays the placeholder when there is no selected', () => {
    const container = wrapper.find(
      '[data-testid="lui-multi-select-container"]',
    )
    expect(container.text()).toBe(wrapper.props().placeholder)
  })
  it('does not display the placeholder when there are some selecteds', async () => {
    // click the first option
    const options = wrapper.findAll('[data-testid="lui-multi-select-option"]')
    await options[0].trigger('click')
    const container = wrapper.find(
      '[data-testid="lui-multi-select-container"]',
    )

    expect(container.text()).not.toBe(wrapper.props().placeholder)
  })
  it('renders the placeholder as the first element in dropdown menu', async () => {
    const placeholder = wrapper.find(
      '[data-testid="lui-multi-select-placeholder"]',
    )
    expect(placeholder.exists()).toBe(true)
    expect(placeholder.text()).toBe(wrapper.props().placeholder)
  })
})
