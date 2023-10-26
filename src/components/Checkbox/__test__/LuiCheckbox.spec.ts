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

  // it("is being checked when click is triggered", async() => {
  //   const inputEl = wrapper.find(
  //     "[data-testid='lui-checkbox-input']"
  //   ) as DOMWrapper<HTMLInputElement>;
  //   expect(inputEl.element.checked).toBe(false);
  //   await inputEl.trigger("click");
  //   await wrapper.vm.$nextTick();
  //   expect(inputEl.element.checked).toBe(true);
  // });

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

  it('renders indeterminate checkbox when indeterminate prop is given', async () => {
    await wrapper.setProps({ indeterminate: true })
    // the classic styled svg is not rendering when indeterminate prop is true
    expect(
      wrapper.find('[data-testid="lui-checkbox-classic-svg"]').exists(),
    ).toBe(false)
    // the indeterminate styled svg is rendering when indeterminate prop is true
    expect(
      wrapper.find('[data-testid="lui-checkbox-indeterminate-svg"]').exists(),
    ).toBe(true)
    // there is only one indeterminate styled svg is rendering
    expect(
      wrapper.findAll('[data-testid="lui-checkbox-indeterminate-svg"]').length,
    ).toBe(1)
  })
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
  // it("is being checked when click is triggered", () => {
  //   const wrapper = mount(LuiCheckbox);
  //   const inputEl = wrapper.find(
  //     "[data-testid='lui-checkbox-input']"
  //   ) as DOMWrapper<HTMLInputElement>;
  //   expect(inputEl.element.checked).toBe(false);
  //   inputEl.trigger("click");
  //   expect(inputEl.element.checked).toBe(true);
  // });
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
    expect(inputEl.exists()).toBe(true)
    // initally input element is not checked

    expect(inputEl.element.checked).toBe(false)
    // check if v-model working properly when input's value changed by testing emitted values
    inputEl.setValue(true)

    await wrapper.vm.$nextTick()
    // test if customVal has changed
    expect(testVal.value).toBe(true)
    expect(wrapper.emitted('change')).toBeTruthy()
    // since the change emit gives the handleVModel(event) and event [0][0] is the way to get the value

    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(true)

    inputEl.setValue(false)

    wrapper.unmount()
  })

  it('works properly with array v-model', async () => {
    const checkedNames = ref([])
    const wrapperForJohn = mount(LuiCheckbox, {
      props: {
        'onUpdate:modelValue': (e: any) => (checkedNames.value = e),
        'modelValue': checkedNames.value,
        'value': 'John',
      },
    })
    const wrapperForJack = mount(LuiCheckbox, {
      props: {
        'onUpdate:modelValue': (e: any) => (checkedNames.value = e),
        'modelValue': checkedNames.value,
        'value': 'Jack',
      },
    })

    const checkboxInputForJohn = wrapperForJohn.find(
      '[data-testid="lui-checkbox-input"]',
    ) as any
    const checkboxInputForJack = wrapperForJack.find(
      '[data-testid="lui-checkbox-input"]',
    ) as any

    checkboxInputForJohn.setChecked(true)
    expect(checkedNames.value).toEqual(['John'])
    checkboxInputForJack.setChecked(true)

    expect(checkedNames.value).toEqual(['John', 'Jack'])
    checkboxInputForJohn.setChecked(false)
    expect(checkedNames.value).toEqual(['Jack'])

    // unmount wrappers
    wrapperForJack.unmount()
    wrapperForJohn.unmount()
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

    expect(inputEl.element.checked).toBe(true)
    expect(customValue.value).toEqual(customTrueValue)
    // tests for custom false value
    inputEl.setChecked(false)
    await wrapper.vm.$nextTick()
    expect(inputEl.element.checked).toBe(false)
    expect(customValue.value).toEqual(customFalseValue)

    wrapper.unmount()
  })
})

describe('LuiCheckbox class tests', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiCheckbox)
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('render sizes correctly', async () => {
    const sizes = [
      { size: 'xs', value: 4 },
      { size: 'sm', value: 5 },
      { size: 'md', value: 6 },
      { size: 'lg', value: 7 },
      { size: 'xl', value: 8 },
    ]
    for (const { size, value } of sizes) {
      await wrapper.setProps({ size })
      expect(
        wrapper.find('[data-testid="lui-checkbox-input"]').classes(),
      ).toEqual(expect.arrayContaining([`w-${value}`, `h-${value}`]))
    }
  })
  it('renders correctly when rounded prop is false', async () => {
    await wrapper.setProps({ rounded: false })
    expect(
      wrapper.find('[data-testid="lui-checkbox-span"]').classes(),
    ).not.contain('rounded')
    expect(
      wrapper.find('[data-testid="lui-checkbox-span"]').classes(),
    ).not.contain('rounded-lg')
    expect(
      wrapper.find('[data-testid="lui-checkbox-span"]').classes(),
    ).not.contain('rounded-full')
  })
  it('renders correctly when rounded prop is true', async () => {
    await wrapper.setProps({ rounded: true })
    expect(wrapper.find('[data-testid="lui-checkbox-span"]').classes()).contain(
      'rounded',
    )
  })
  it('renders correctly when rounded prop is full', async () => {
    await wrapper.setProps({ rounded: 'full' })
    expect(wrapper.find('[data-testid="lui-checkbox-span"]').classes()).contain(
      'rounded-full',
    )
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
    expect(wrapper.props().description).toBe(descriptionExample)
    expect(
      wrapper.find('[data-testid="lui-checkbox-description"]').exists(),
    ).toBe(true)
    expect(
      wrapper.find('[data-testid="lui-checkbox-description"]').text(),
    ).toEqual(descriptionExample)
  })
  it('renders description properly when state prop is null', async () => {
    await wrapper.setProps({ description: descriptionExample, state: null })

    expect(
      wrapper.find('[data-testid="lui-checkbox-description"]').classes(),
    ).toContain('text-secondary-600')
  })
  it('renders description properly when state prop is true', async () => {
    await wrapper.setProps({ description: descriptionExample, state: true })

    expect(
      wrapper.find('[data-testid="lui-checkbox-description"]').classes(),
    ).toContain('text-success-500')
  })
  it('renders description properly when state prop is warning', async () => {
    await wrapper.setProps({
      description: descriptionExample,
      state: 'warning',
    })

    expect(
      wrapper.find('[data-testid="lui-checkbox-description"]').classes(),
    ).toContain('text-warning-500')
  })
  it('renders description properly when state prop is false', async () => {
    await wrapper.setProps({ description: descriptionExample, state: false })

    expect(
      wrapper.find('[data-testid="lui-checkbox-description"]').classes(),
    ).toContain('text-danger-500')
  })
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
