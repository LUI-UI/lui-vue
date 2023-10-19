import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import LuiButton from '../LuiButton.vue'

// function getFilteredColor(filter: string): string {
//   const filterMap: Record<string, string> = {
//     none: '500',
//     lighten: '100',
//     darken: '800',
//   }

//   // Return the corresponding color suffix, defaulting to "500" for unknown filters
//   return filterMap[filter] || '500'
// }

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

// it('renders properly based on the variant prop', () => {
//   const solidWrapper = mount(LuiButton as any, {
//     attrs: {
//       variant: 'solid',
//     },
//   })
//   const outlineWrapper = mount(LuiButton as any, {
//     attrs: {
//       variant: 'outline',
//     },
//   })
//   const textWrapper = mount(LuiButton as any, {
//     attrs: {
//       variant: 'text',
//     },
//   })
//   const linkWrapper = mount(LuiButton as any, {
//     attrs: {
//       variant: 'link',
//     },
//   })
//   const variants = {
//     solid: {
//       expectedClasses: {
//         contains: [
//           `bg-${solidWrapper.props().color}-${getFilteredColor(
//             solidWrapper.props().filter,
//           )}`,
//           `border-${outlineWrapper.props().color}-${getFilteredColor(
//             outlineWrapper.props().filter,
//           )}`,
//           'text-white',
//         ],
//         notContains: [],
//       },
//     },
//     outline: {
//       expectedClasses: {
//         contains: [
//           `text-${outlineWrapper.props().color}-${getFilteredColor(
//             outlineWrapper.props().filter,
//           )}`,
//           `border-${outlineWrapper.props().color}-${getFilteredColor(
//             outlineWrapper.props().filter,
//           )}`,
//         ],
//         notContains: ['bg'],
//       },
//     },
//     link: {
//       expectedClasses: {
//         contains: [
//           `text-${outlineWrapper.props().color}-${getFilteredColor(
//             outlineWrapper.props().filter,
//           )}`,
//         ],
//         notContains: ['border', 'bg'],
//       },
//     },
//     text: {
//       expectedClasses: {
//         contains: [
//           `text-${outlineWrapper.props().color}-${getFilteredColor(
//             outlineWrapper.props().filter,
//           )}`,
//         ],
//         notContains: ['bg'],
//       },
//     },
//   }
//   // tests for solid variant
//   variants.solid.expectedClasses.contains.forEach((expectedClass) => {
//     expect(solidWrapper.classes()).contain(expectedClass)
//   })
//   variants.solid.expectedClasses.notContains.forEach((expectedClass) => {
//     expect(solidWrapper.classes()).not.contain(expectedClass)
//   })

//   // tests for outline variant
//   variants.outline.expectedClasses.contains.forEach((expectedClass) => {
//     expect(outlineWrapper.classes()).contain(expectedClass)
//   })
//   variants.outline.expectedClasses.notContains.forEach((expectedClass) => {
//     expect(outlineWrapper.classes()).not.contain(expectedClass)
//   })

//   // tests for link variant
//   variants.link.expectedClasses.contains.forEach((expectedClass) => {
//     expect(linkWrapper.classes()).contain(expectedClass)
//   })
//   variants.link.expectedClasses.notContains.forEach((expectedClass) => {
//     expect(linkWrapper.classes()).not.contain(expectedClass)
//   })
//   // tests for text variant
//   variants.text.expectedClasses.contains.forEach((expectedClass) => {
//     expect(textWrapper.classes()).contain(expectedClass)
//   })
//   variants.text.expectedClasses.notContains.forEach((expectedClass) => {
//     expect(textWrapper.classes()).not.contain(expectedClass)
//   })

//   //   expect(solidWrapper.classes()).toContain("outline-none","transition-colors",'test');
// })

// it('renders properly based on the color attribute', () => {
//   const colors: Color[] = [
//     'primary',
//     'secondary',
//     'info',
//     'success',
//     'warning',
//     'danger',
//   ]
//   // Check all of the color Options if rendered correctly.
//   colors.forEach((colorOption) => {
//     const wrapper = mount(LuiButton as any, {
//       props: {
//         color: colorOption,
//       },
//     })
//     expect(wrapper.classes()).contain(`bg-${colorOption}-500`)
//   })

//   // expect(getComputedStyle(wrapper.find("div").element).backgroundColor).toEqual("primary-500");
// })

// it('applies filters properly', () => {
//   const filteredButtons = [
//     {
//       color: 'primary',
//       filter: 'darken',
//       expectedClasses: {
//         bg: 'bg-primary-800',
//         text: 'text-primary-100',
//         border: 'border-primary-100',
//       },
//     },
//     {
//       color: 'secondary',
//       filter: 'darken',
//       expectedClasses: {
//         bg: 'bg-secondary-800',
//         text: 'text-secondary-100',
//         border: 'border-secondary-100',
//       },
//     },
//     {
//       color: 'info',
//       filter: 'darken',
//       expectedClasses: {
//         bg: 'bg-info-800',
//         text: 'text-info-100',
//         border: 'border-info-100',
//       },
//     },
//     {
//       color: 'success',
//       filter: 'darken',
//       expectedClasses: {
//         bg: 'bg-success-800',
//         text: 'text-success-100',
//         border: 'border-success-100',
//       },
//     },
//     {
//       color: 'warning',
//       filter: 'darken',
//       expectedClasses: {
//         bg: 'bg-warning-800',
//         text: 'text-warning-100',
//         border: 'border-warning-100',
//       },
//     },
//     {
//       color: 'danger',
//       filter: 'darken',
//       expectedClasses: {
//         bg: 'bg-danger-800',
//         text: 'text-danger-100',
//         border: 'border-danger-100',
//       },
//     },
//     {
//       color: 'primary',
//       filter: 'lighten',
//       expectedClasses: {
//         bg: 'bg-primary-100',
//         text: 'text-primary-500',
//         border: 'border-primary-500',
//       },
//     },
//     {
//       color: 'secondary',
//       filter: 'lighten',
//       expectedClasses: {
//         bg: 'bg-secondary-100',
//         text: 'text-secondary-500',
//         border: 'border-secondary-500',
//       },
//     },
//     {
//       color: 'info',
//       filter: 'lighten',
//       expectedClasses: {
//         bg: 'bg-info-100',
//         text: 'text-info-500',
//         border: 'border-info-500',
//       },
//     },
//     {
//       color: 'success',
//       filter: 'lighten',
//       expectedClasses: {
//         bg: 'bg-success-100',
//         text: 'text-success-500',
//         border: 'border-success-500',
//       },
//     },
//     {
//       color: 'warning',
//       filter: 'lighten',
//       expectedClasses: {
//         bg: 'bg-warning-100',
//         text: 'text-warning-500',
//         border: 'border-warning-500',
//       },
//     },
//     {
//       color: 'danger',
//       filter: 'lighten',
//       expectedClasses: {
//         bg: 'bg-danger-100',
//         text: 'text-danger-500',
//         border: 'border-danger-500',
//       },
//     },
//   ]
//   filteredButtons.forEach((button) => {
//     const wrapper = mount(LuiButton as any, {
//       props: {
//         color: button.color,
//         filter: button.filter,
//       },
//     })
//     expect(wrapper.classes()).contain(button.expectedClasses.bg)
//     expect(wrapper.classes()).contain(button.expectedClasses.text)
//   })
// })

describe('LuiButton class tests', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiButton as any)
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('renders sizes properly', async () => {
    const sizesAndClasses = {
      xs: {
        text: 'xs',
        px: 3,
        py: 1,
      },
      sm: {
        text: 'sm',
        px: 4,
        py: 1.5,
      },
      md: {
        text: 'base',
        px: 5,
        py: 2,
      },
      lg: {
        text: 'lg',
        px: 6,
        py: 2.5,
      },
      xl: {
        text: 'xl',
        px: 7,
        py: 3.5,
      },
    }
    for (const [key, value] of Object.entries(sizesAndClasses)) {
      await wrapper.setProps({ size: key })
      const classes = wrapper.classes()
      expect(classes).toContain(`px-${value.px}`)
      expect(classes).toContain(`py-${value.py}`)
      expect(classes).toContain(`text-${value.text}`)
    }
  })

  it('renders correctly when rounded prop is false', async () => {
    await wrapper.setProps({ rounded: false })
    expect(wrapper.classes()).not.contain('rounded')
    expect(wrapper.classes()).not.contain('rounded-lg')
    expect(wrapper.classes()).not.contain('rounded-full')
  })

  it('renders correctly when rounded prop is true', async () => {
    await wrapper.setProps({ rounded: true })
    expect(wrapper.classes()).contain('rounded-lg')
  })
  it('renders correctly when rounded prop is full', async () => {
    await wrapper.setProps({ rounded: 'full' })
    expect(wrapper.classes()).contain('rounded-full')
  })

  it('provides full width when block prop is given', async () => {
    await wrapper.setProps({ block: true })
    expect(wrapper.classes()).toContain('w-full')
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
    // Tests for icon template
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
        default: testText,
      },
    })
    const prependIcon = wrapper.find(
      '[data-testid=\'lui-button-icon-prepend\'] i',
    )
    const textElement = wrapper.find('[data-testid=\'lui-button-icon-text\']')

    expect(prependIcon.exists()).toBe(true)
    expect(prependIcon.classes()).toContain(testClass)
    expect(textElement.text()).toEqual(testText)
  })
  it('renders append slot properly', () => {
    wrapper = mount(LuiButton as any, {
      slots: {
        append: `<i class=${testClass}></i>`,
        default: testText,
      },
    })
    const appendIcon = wrapper.find('[data-testid=\'lui-button-icon-append\'] i')
    const textElement = wrapper.find('[data-testid=\'lui-button-icon-text\']')

    expect(appendIcon.exists()).toBe(true)
    expect(appendIcon.classes()).toContain(testClass)
    expect(textElement.text()).toEqual(testText)
  })

  it('changes the tag when div tag is given', async () => {
    const wrapper = mount(LuiButton as any, {
      props: {
        tag: 'div',
      },
    })
    expect(wrapper.find('[data-testid=\'lui-button\']').element.tagName).toEqual(
      'div'.toLocaleUpperCase(),
    )
  })
  it('changes the tag when a tag is given', () => {
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
