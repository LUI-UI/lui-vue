import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import LuiButton from '../LuiButton.vue'

describe('Default LuiButton', () => {
  const expectedDefaultProps = {
    tag: 'button',
    variant: 'solid',
    color: 'primary',
    filter: 'none',
    size: 'md',
    rounded: false,
    block: false,
  }
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiButton as any)
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('renders properly based on default props', () => {
    // Check if the component exists
    expect(wrapper.exists()).toBe(true)

    // Check if the rendered HTML matches the expected HTML
    expect(wrapper.html()).toMatchSnapshot()

    // Check if the default props given correctly
    expect(wrapper.props()).toEqual(expectedDefaultProps)
  })
})
describe('Disabled property', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiButton as any)
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('disables when disabled prop given', async () => {
    await wrapper.setProps({ disabled: true })
    expect(
      wrapper.find('[data-testid=\'lui-button\']').attributes(),
    ).toHaveProperty('disabled')
  })
  it('does not have disabled property when disabled prop is false', async () => {
    await wrapper.setProps({ disabled: false })
    expect(
      wrapper.find('[data-testid=\'lui-button\']').attributes(),
    ).not.toHaveProperty('disabled')
  })
})

describe('LuiButton renders html correctly', () => {
  const testClass = 'ri-home-line'
  const testText = 'Prepend'
  let wrapper: VueWrapper<any>
  beforeEach(() => {})
  afterEach(() => {
    wrapper.unmount()
  })
  it('renders icon slot properly', () => {
    wrapper = mount(LuiButton as any, {
      slots: {
        icon: `<i class=${testClass}></i>`,
      },
    })
    expect(
      wrapper.find('[data-testid=\'lui-button-icon\']').find('i').exists(),
    ).toBe(true)
    expect(
      wrapper.find('[data-testid=\'lui-button-icon\']').find('i').classes(),
    ).toContain(testClass)
  })
  it('renders prepend slot properly', () => {
    wrapper = mount(LuiButton as any, {
      slots: {
        prepend: `<i class=${testClass}></i>`,
      },
    })
    const prependIcon = wrapper.find(
      '[data-testid=\'lui-button-icon-prepend\'] i',
    )

    expect(prependIcon.exists()).toBe(true)
    expect(prependIcon.classes()).toContain(testClass)
  })
  it('renders append slot properly', () => {
    wrapper = mount(LuiButton as any, {
      slots: {
        append: `<i class=${testClass}></i>`,
        default: testText,
      },
    })
    const appendIcon = wrapper.find('[data-testid=\'lui-button-icon-append\'] i')

    expect(appendIcon.exists()).toBe(true)
    expect(appendIcon.classes()).toContain(testClass)
  })
  it('renders default slot properly', async () => {
    wrapper = mount(LuiButton as any, {
      slots: {
        default: testText,
      },
    })
    const textElement = wrapper.find('[data-testid=\'lui-button-icon-text\']')
    expect(textElement.exists()).toBe(true)
    expect(textElement.text()).toBe(testText)
  })

  it('changes the tag according to the tag prop', async () => {
    const wrapper = mount(LuiButton as any, {
      props: {
        tag: 'div',
      },
    })
    expect(wrapper.find('[data-testid=\'lui-button\']').element.tagName).toEqual(
      'div'.toLocaleUpperCase(),
    )
  })
  it('changes the tag, also inherits it\'s attributes', () => {
    const url = 'https://www.google.com/'

    const wrapper = mount(LuiButton as any, {
      props: {
        tag: 'a',
      },
      attrs: {
        href: url,
      },
    })
    expect(wrapper.find('[data-testid=\'lui-button\']').element.tagName).toEqual(
      'a'.toLocaleUpperCase(),
    )
    expect(wrapper.attributes().href).toEqual(url)
  })
  it('inherits icon sizes properly', () => {
    const sizesAndIconSizes = {
      xs: 'xs',
      sm: 'base',
      md: 'xl',
      lg: 'xl',
      xl: '2xl',
    }
    Object.entries(sizesAndIconSizes).forEach(([size, iconSize]) => {
      const wrapper = mount(LuiButton as any, {
        props: {
          size,
        },
        slots: {
          icon: '<i class=\'ri-home-line\'></i>',
        },
      })
      expect(
        wrapper.find('[data-testid=\'lui-button-icon\']').classes(),
      ).toContain(`text-${iconSize}`)
    })
  })
})
