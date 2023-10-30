import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import LuiSelect from '../LuiSelect.vue'
import LuiOption from '../../Option/LuiOption.vue'

describe('Default LuiSelect', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(LuiSelect as any)
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
      state: null,
      teleport: false,
      stateIcon: false,
      placeholder: '',
      size: 'md',
      description: null,
      options: [],
      searchable: false,
      showAppend: true,
      modelValue: undefined,
    }
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html).toMatchSnapshot()
    expect(wrapper.findComponent(LuiSelect).props()).toEqual(expectedDefProps)
  })

  it('displays the placeholder properly', async () => {
    const placeholderExample = 'Names'
    await wrapper.setProps({ placeholder: placeholderExample })

    const inputEl = wrapper.find(
      '[data-testid="lui-select-input"]',
    ) as DOMWrapper<HTMLInputElement>
    expect(inputEl.element.placeholder).toBe(placeholderExample)
  })

  it('renders properly with array options', async () => {
    const exampleOptions = ['Mary', 'Jane']
    await wrapper.setProps({ options: exampleOptions })
    const optionsContainer = wrapper.find(
      '[data-testid="lui-select-options-container"]',
    )

    // test if options are rendered for every options prop
    exampleOptions.forEach((option) => {
      expect(optionsContainer.text()).toContain(option)
    })
  })
  it('renders properly with object array options', async () => {
    const objectArrayOptions = [
      { text: 'Mary', value: 'mary', disabled: true },
      { text: 'Jane', value: 'jane' },
    ]
    await wrapper.setProps({ options: objectArrayOptions })
    const optionsContainer = wrapper.find(
      '[data-testid="lui-select-options-container"]',
    )

    // test if options are rendered for every options prop
    objectArrayOptions.forEach((option) => {
      expect(optionsContainer.text()).toContain(option.text)
    })
  })

  it('disables when disabled prop given', async () => {
    // it is not working with setProps.
    const wrapper = mount(LuiSelect as any, {
      props: {
        disabled: true,
      },
    })
    const inputEl = wrapper.find('[data-testid="lui-select-input"]')
    expect(inputEl.attributes('disabled')).toBeDefined()
  })
  it('works properly with v-model', async () => {
    const selectedName = ref([])
    await wrapper.setProps({
      'options': ['Mary', 'Jane'],
      'onUpdate:modelValue': (e: any) => (selectedName.value = e),
    })

    const options = wrapper.findAll('[data-testid="lui-select-option"]')
    options[0].trigger('click')
    expect(selectedName.value).toEqual('Mary')
  })
})

describe('LuiSelect Search Feature', () => {
  let wrapper: VueWrapper<any>
  let inputEl: DOMWrapper<HTMLInputElement>

  const options = ['Mary', 'Jane']
  const searchKey = 'Mar'
  const falseKey = 'asdsad'

  const testData = {
    options,
    searchKey,
    falseKey,
  }

  beforeEach(() => {
    wrapper = mount(LuiSelect, {
      props: {
        options: testData.options,
        searchable: true,
      },
    })
    inputEl = wrapper.find(
      '[data-testid="lui-select-input"]',
    ) as DOMWrapper<HTMLInputElement>
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should filter options based on search key', async () => {
    // Initial options
    let options = wrapper.findAll('[data-testid="lui-select-option"]')
    expect(wrapper.vm.searchedOptions.length).toBe(options.length)

    // Search by a key
    await inputEl.setValue(testData.searchKey)

    // Updated options after searching
    options = wrapper.findAll('[data-testid="lui-select-option"]')
    expect(options.length).toBe(1)
    expect(options[0].text()).toBe('Mary')
  })

  it('should display all options when search input is empty', async () => {
    // Clear the search input
    await inputEl.setValue('')

    // Options should be back to their original count
    const options = wrapper.findAll('[data-testid="lui-select-option"]')
    expect(options.length).toBe(testData.options.length)
  })

  it('should display a false search message when no query matches the search key', async () => {
    await inputEl.setValue(testData.falseKey)

    // No options should be displayed
    const options = wrapper.findAll('[data-testid="lui-select-option"]')
    expect(options.length).toBe(0)

    // Check if the false search message is displayed
    const searchError = wrapper.find('[data-testid="lui-select-false-search"]')
    expect(searchError.exists()).toBe(true)
  })
})

describe('LuiSelect initial values', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(LuiSelect as any)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('selects the first option from the array when selected is not specified', () => {
    // test for options prop
    const optionsWrapper = mount(LuiSelect as any, {
      props: {
        options: ['Mary', 'Jane'],
      },
    })
    expect(optionsWrapper.vm.selectedOption.value).toBe('Mary')
  })
  it('displays the first option when initial value is not given', () => {
    const slotTemplate = {
      components: { LuiSelect, LuiOption },
      template: `
        <lui-select>
        <lui-option text="Mary" value="Mary"></lui-option>
        <lui-option text="Jane"  value="Jane"></lui-option>
        </lui-select>
        `,
    }
    const slotWrappper = mount(slotTemplate)
    const slotLuiSelect = slotWrappper.findComponent(LuiSelect) as any
    expect(slotLuiSelect.vm.selectedOption.value).toBe('Mary')
  })
  it('selecets initial value properly from v-model value', async () => {
    // const optionsArray = ["Mary", "Jane"];
    // test for v-model
    const modelValue = ref('Mary')
    await wrapper.setProps({
      'modelValue': modelValue.value,
      'onUpdate:modelValue': (e: any) => (modelValue.value = e),
      'options': ['Mary', 'Jane'],
    })
    expect(wrapper.vm.selectedOption.value).toBe(modelValue.value)
  })

  it('selects initial value properly when options are object', async () => {
    const wrapper = mount(LuiSelect as any, {
      props: {
        options: [
          { text: 'Mary', value: 'Mary' },
          { text: 'Jane', value: 'Jane', selected: true },
        ],
      },
    })
    expect(wrapper.vm.selectedOption.value).toBe('Jane')
  })
  it('selects initial value properly with selected slot', async () => {
    const selectedSlotTemplate = {
      components: { LuiSelect, LuiOption },
      template: `
          <lui-select>
          <lui-option text="Mary" value="Mary"></lui-option>
          <lui-option text="Jane" selected value="Jane"></lui-option>
          </lui-select>
          `,
    }
    const selectedSlotWrappper = mount(selectedSlotTemplate)
    const selectedSlotLuiSelect = selectedSlotWrappper.findComponent(
      LuiSelect,
    ) as any
    expect(selectedSlotLuiSelect.vm.selectedOption.value).toBe('Jane')
  })
  it('selects placeholder initially', async () => {
    // test for placeholder
    const placeholder = 'my test placeholder'
    const placeholderWrapper = mount(LuiSelect as any, {
      props: {
        options: ['Mary', 'Jane'],
        placeholder,
      },
    })

    expect(placeholderWrapper.vm.selectedOption.value).toBe(placeholder)
  })
})
describe('LuiSelect with value', () => {
  const optionsWValue = [
    { text: 'Turkey', value: 'TR' },
    { text: 'Austria', value: 'AT' },
    { text: 'Azerbaijan', value: 'AZ' },
    { text: 'Bangladesh', value: 'BD' },
  ]
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiSelect)
  })
  it('accepts value', async () => {
    await wrapper.setProps({ options: optionsWValue })
    const options = wrapper.findAll('[data-testid="lui-select-option"]')
    const optionTexts = options.map(option => option.text())
    const expectedTexts = optionsWValue.map(option => option.text)
    expect(optionTexts).toEqual(expectedTexts)
  })
  it('works with the v-model', async () => {
    const modelValue = ref(optionsWValue[2])
    await wrapper.setProps({
      'options': optionsWValue,
      'modelValue': modelValue.value,
      'onUpdate:modelValue': (e: any) => (modelValue.value = e),
    })
    expect(wrapper.vm.selectedOption.text).toBe('Azerbaijan')

    const options = wrapper.findAll('[data-testid="lui-select-option"]')
    options[3].trigger('click')
    expect(modelValue.value).toBe(optionsWValue[3].value)
  })
})
