import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import LuiCheckbox from '../LuiCheckbox.vue'

describe('Default LuiCheckbox', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiCheckbox)
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('renders with default props', async () => {
    const defaultProps = {
      rounded: false,
      state: null,
      indeterminate: false,
      size: 'md',
      description: null,
      modelValue: undefined,
    }
    await wrapper.vm.$nextTick
    expect(wrapper.props()).toEqual(defaultProps)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html).toMatchSnapshot()
  })

  // it('renders indeterminate checkbox when indeterminate prop is given', async () => {
  //   await wrapper.setProps({ indeterminate: true })
  //   // the classic styled svg is not rendering when indeterminate prop is true
  //   expect(
  //     wrapper.find('[data-testid="lui-checkbox-classic-svg"]').exists(),
  //   ).toBe(false)
  //   // the indeterminate styled svg is rendering when indeterminate prop is true
  //   expect(
  //     wrapper.find('[data-testid="lui-checkbox-indeterminate-svg"]').exists(),
  //   ).toBe(true)
  //   // there is only one indeterminate styled svg is rendering
  //   expect(
  //     wrapper.findAll('[data-testid="lui-checkbox-indeterminate-svg"]').length,
  //   ).toBe(1)
  // })
  it('renders as checked when checked prop is given', async () => {
    await wrapper.setProps({ checked: true })
    const inputEl = wrapper.find(
      '[data-testid=\'lui-checkbox-input\']',
    ) as DOMWrapper<HTMLInputElement>
    // input rendered as checked beforehand the users interaction
    expect(inputEl.element.checked).toBe(true)
  })
  it('emits change event whenever an inputs value changed', () => {
    const inputEl = wrapper.find('[data-testid=\'lui-checkbox-input\']') as any
    expect(wrapper.emitted('change')).toBeFalsy()
    inputEl.setChecked(true)
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('defines disabled attribute when disabled prop is given', async () => {
    await wrapper.setProps({ disabled: true })

    const inputEl = wrapper.find('[data-testid="lui-checkbox-input"]') as any
    // check if attributes has come to inputEl
    expect(inputEl.attributes('disabled')).toBeDefined()
  })

  it('should properly inherit attributes', () => {
    const id = 'myId'

    const wrapper = mount(LuiCheckbox, {
      attrs: {
        id,
      },
    })
    // Check if the custom attribute exists on the input element
    expect(
      wrapper.find('[data-testid="lui-checkbox-input"]').attributes('id'),
    ).toBe(id)
  })
})

describe('LuiCheckbox with v-model', () => {
  it('works properly with boolean v-model', async () => {
    const testVal = ref(false)
    const wrapper = mount(LuiCheckbox, {
      props: { 'onUpdate:modelValue': (e: any) => (testVal.value = e) },
    })

    const inputEl = wrapper.find(
      '[data-testid=\'lui-checkbox-input\']',
    ) as DOMWrapper<HTMLInputElement>

    // initally input element is not checked
    expect(inputEl.element.checked).toBe(false)
    // check if v-model working properly when input's value changed by testing emitted values
    inputEl.setValue(true)

    await wrapper.vm.$nextTick()
    expect(testVal.value).toBe(true)
    wrapper.unmount()
  })

  it('works properly with array v-model', async () => {
    const checkedNames = ref([])
    const firstCheckbox = mount(LuiCheckbox, {
      props: {
        'onUpdate:modelValue': (e: any) => (checkedNames.value = e),
        'modelValue': checkedNames.value,
        'value': 'John',
      },
    })
    const secondCheckbox = mount(LuiCheckbox, {
      props: {
        'onUpdate:modelValue': (e: any) => (checkedNames.value = e),
        'modelValue': checkedNames.value,
        'value': 'Jack',
      },
    })

    const firstInput = firstCheckbox.find(
      '[data-testid="lui-checkbox-input"]',
    ) as any
    const secondInput = secondCheckbox.find(
      '[data-testid="lui-checkbox-input"]',
    ) as any

    firstInput.setChecked(true)
    expect(checkedNames.value).toEqual(['John'])
    secondInput.setChecked(true)
    expect(checkedNames.value).toEqual(['John', 'Jack'])
    firstInput.setChecked(false)
    expect(checkedNames.value).toEqual(['Jack'])

    // unmount wrappers
    secondCheckbox.unmount()
    firstCheckbox.unmount()
  })
  it('works properly with custom values', async () => {
    const customTrueValue = 'yes'
    const customFalseValue = 'no'
    const customValue = ref('') // Start with the false value

    const wrapper = mount(LuiCheckbox, {
      props: {
        'modelValue': customValue.value,
        'onUpdate:modelValue': (e: any) => (customValue.value = e),
      },
      attrs: {
        'true-value': customTrueValue,
        'false-value': customFalseValue,
      },
    })
    const inputEl = wrapper.find('[data-testid="lui-checkbox-input"]') as any
    // tests for custom true value
    inputEl.setChecked(true)
    // Wait for Vue to update
    await wrapper.vm.$nextTick()
    expect(customValue.value).toEqual(customTrueValue)
    // tests for custom false value
    inputEl.setChecked(false)
    await wrapper.vm.$nextTick()
    expect(inputEl.element.checked).toBe(false)
    expect(customValue.value).toEqual(customFalseValue)
    wrapper.unmount()
  })
})

describe('LuiCheckbox description', () => {
  const descriptionExample = 'A description'
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiCheckbox)
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('renders description properly from description prop', async () => {
    await wrapper.setProps({ description: descriptionExample })
    expect(
      wrapper.find('[data-testid="lui-checkbox-description"]').exists(),
    ).toBe(true)
    expect(
      wrapper.find('[data-testid="lui-checkbox-description"]').text(),
    ).toEqual(descriptionExample)
  })
  // it('renders description properly when state prop is null', async () => {
  //   await wrapper.setProps({ description: descriptionExample, state: null })

  //   expect(
  //     wrapper.find('[data-testid="lui-checkbox-description"]').classes(),
  //   ).toContain('text-secondary-600')
  // })
  // it('renders description properly when state prop is true', async () => {
  //   await wrapper.setProps({ description: descriptionExample, state: true })

  //   expect(
  //     wrapper.find('[data-testid="lui-checkbox-description"]').classes(),
  //   ).toContain('text-success-500')
  // })
  // it('renders description properly when state prop is warning', async () => {
  //   await wrapper.setProps({
  //     description: descriptionExample,
  //     state: 'warning',
  //   })
  //   expect(
  //     wrapper.find('[data-testid="lui-checkbox-description"]').classes(),
  //   ).toContain('text-warning-500')
  // })
  // it('renders description properly when state prop is false', async () => {
  //   await wrapper.setProps({ description: descriptionExample, state: false })

  //   expect(
  //     wrapper.find('[data-testid="lui-checkbox-description"]').classes(),
  //   ).toContain('text-danger-500')
  // })
})
