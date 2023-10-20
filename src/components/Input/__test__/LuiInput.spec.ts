import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import LuiInput from '../LuiInput.vue'

const testValue = 'an example value...'

describe('Default LuiInput', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiInput)
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('renders properly with default values', () => {
    const expectedDefaultProps = {
      size: 'md',

      rounded: false,

      state: null,

      stateIcon: false,

      block: false,

      clear: false,

      description: null,

      modelValue: undefined,
    }

    const wrapper = mount(LuiInput)

    // Check if the component exists
    expect(wrapper.exists()).toBe(true)

    // Check if the rendered HTML matches the expected HTML
    expect(wrapper.html()).toMatchSnapshot()

    // Check if the default props given correctly
    expect(wrapper.props()).toEqual(expectedDefaultProps)
  })
})
describe('LuiInput class tests', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiInput)
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('renders correctly when rounded prop is false', async () => {
    await wrapper.setProps({ rounded: false })
    expect(wrapper.classes()).not.contain('rounded')
    expect(wrapper.classes()).not.contain('rounded-lg')
    expect(wrapper.classes()).not.contain('rounded-full')
  })

  it('renders correctly when rounded prop is true', async () => {
    await wrapper.setProps({ rounded: true })
    expect(wrapper.find('input').classes()).contain('rounded-lg')
  })
  it('renders correctly when rounded prop is full', async () => {
    await wrapper.setProps({ rounded: 'full' })
    expect(wrapper.find('input').classes()).contain('rounded-full')
  })

  it('provides full width when block prop is given', async () => {
    await wrapper.setProps({ block: true })
    expect(wrapper.classes()).toContain('w-full')
  })
  it('renders sizes properly', async () => {
    const sizesAndClasses = {
      xs: {
        text: 'xs',
        px: 1.5,
        py: 1,
      },
      sm: {
        text: 'sm',
        px: 2,
        py: 1.5,
      },
      md: {
        text: 'base',
        px: 2.5,
        py: 2,
      },
      lg: {
        text: 'lg',
        px: 2.5,
        py: 2.5,
      },
      xl: {
        text: 'xl',
        px: 3,
        py: 3.5,
      },
    }
    for (const [key, value] of Object.entries(sizesAndClasses)) {
      await wrapper.setProps({ size: key })
      const classes = wrapper.find('[data-testid="lui-input-input"]').classes()
      expect(classes).toContain(`px-${value.px}`)
      expect(classes).toContain(`py-${value.py}`)
      expect(classes).toContain(`text-${value.text}`)
    }
  })
})

describe('LuiInput HTML tests', () => {
  const testClass = 'ri-search-line'
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiInput)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  it('renders description properly', async () => {
    await wrapper.setProps({ description: testValue })
    const description = wrapper.find('[data-testid=\'lui-input-description\']')
    expect(description.exists()).toBe(true)
    expect(description.text()).toBe(testValue)
  })

  it('renders prepend slot properly', () => {
    wrapper = mount(LuiInput as any, {
      slots: {
        prepend: `<i class=${testClass}></i>`,
      },
    })
    const prependIcon = wrapper.find(
      '[data-testid=\'lui-input-icon-prepend\'] i',
    )

    expect(prependIcon.exists()).toBe(true)
    expect(prependIcon.classes()).toContain(testClass)
  })
  it('renders append slot properly', () => {
    wrapper = mount(LuiInput as any, {
      slots: {
        append: `<i class=${testClass}></i>`,
      },
    })
    const appendIcon = wrapper.find('[data-testid=\'lui-input-icon-append\'] i')

    expect(appendIcon.exists()).toBe(true)
    expect(appendIcon.classes()).toContain(testClass)
  })
  it('executes clear feature properly', async () => {
    await wrapper.setProps({ clear: true })

    const clearButton = wrapper.find('[data-testid=\'lui-input-clear\']')
    const inputEl = wrapper.find(
      '[data-testid=\'lui-input-input\']',
    ) as DOMWrapper<HTMLInputElement>

    expect(clearButton.exists()).toBe(true)

    inputEl.setValue(testValue)
    expect(inputEl.element.value).toBe(testValue)
    clearButton.trigger('click')
    expect(inputEl.element.value).toBe('')
  })
})

describe('LuiInput state', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiInput, {
      props: {
        'description': testValue,
        'state-icon': true,
      },
    })
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('applies expected classes and renders proper icon when state prop is true', async () => {
    await wrapper.setProps({ state: true })
    // check the classes
    expect(wrapper.find('[data-testid="lui-input-input"]').classes()).toContain(
      'border-success-500',
    )
    expect(
      wrapper.find('[data-testid="lui-input-description"]').classes(),
    ).toContain('text-success-500')
    // check if proper icon is exists
    expect(wrapper.find('[data-testid="lui-input-state-true"]').exists()).toBe(
      true,
    )
  })
  it('applies expected classes and renders proper icon when state prop is warning', async () => {
    await wrapper.setProps({ state: 'warning' })
    // check the classes
    expect(wrapper.find('[data-testid="lui-input-input"]').classes()).toContain(
      'border-warning-500',
    )
    expect(
      wrapper.find('[data-testid="lui-input-description"]').classes(),
    ).toContain('text-warning-500')
    // check if proper icon is exists
    expect(
      wrapper.find('[data-testid="lui-input-state-warning"]').exists(),
    ).toBe(true)
  })
  it('applies expected classes and renders proper icon when state prop is false', async () => {
    await wrapper.setProps({ state: false })
    // check the classes
    expect(wrapper.find('[data-testid="lui-input-input"]').classes()).toContain(
      'border-danger-500',
    )
    expect(
      wrapper.find('[data-testid="lui-input-description"]').classes(),
    ).toContain('text-danger-500')

    // check if the proper icon is exists
    expect(wrapper.find('[data-testid="lui-input-state-false"]').exists()).toBe(
      true,
    )
  })

  // it("renders icons and border based on the state", () => {
  //   const trueWrapper = mount(LuiInput, {
  //     props: {
  //       description: testValue,
  //       state: true,
  //       "state-icon": true,
  //     },
  //   });
  //   expect(
  //     trueWrapper.find('[data-testid="lui-input-state-true"]').exists()
  //   ).toBe(true);
  //   expect(
  //     trueWrapper.find('[data-testid="lui-input-input"]').classes()
  //   ).toContain("border-success-500");

  //   const warningWrapper = mount(LuiInput, {
  //     props: {
  //       description: testValue,
  //       state: "warning",
  //       "state-icon": true,
  //     },
  //   });
  //   expect(
  //     warningWrapper.find('[data-testid="lui-input-state-warning"]').exists()
  //   ).toBe(true);
  //   expect(
  //     warningWrapper.find('[data-testid="lui-input-input"]').classes()
  //   ).toContain("border-warning-500");

  //   const falseWrapper = mount(LuiInput, {
  //     props: {
  //       description: testValue,
  //       state: false,
  //       "state-icon": true,
  //     },
  //   });
  // expect(
  //   falseWrapper.find('[data-testid="lui-input-state-false"]').exists()
  // ).toBe(true);
  //   expect(
  //     falseWrapper.find('[data-testid="lui-input-input"]').classes()
  //   ).toContain("border-danger-500");
  // });
})

// it("should render correctly based on the rounded prop", () => {
//   // const roundedOptions = {
//   //   false: "",
//   //   true: "lg",
//   //   full: "full",
//   // };
//   const notRoundedWrapper = mount(LuiInput, {
//     props: {
//       rounded: false,
//     },
//   });
//   const roundedWrapper = mount(LuiInput, {
//     props: {
//       rounded: true,
//     },
//   });
//   const roundedFullWrapper = mount(LuiInput, {
//     props: {
//       rounded: "full",
//     },
//   });
//   expect(notRoundedWrapper.classes()).not.contain("rounded");
//   expect(notRoundedWrapper.classes()).not.contain("rounded-lg");
//   expect(notRoundedWrapper.classes()).not.contain("rounded-full");
//   expect(
//     roundedWrapper.find('[data-testid="lui-input-input"]').classes()
//   ).contain("rounded-lg");
//   expect(
//     roundedFullWrapper.find('[data-testid="lui-input-input"]').classes()
//   ).contain("rounded-full");
// });
// it("provides full width when block prop is given", () => {
//   const blockWrapper = mount(LuiInput, {
//     props: {
//       block: true,
//     },
//   });
//   expect(blockWrapper.classes()).toContain("w-full");
//   const wrapper = mount(LuiInput, {
//     props: {
//       block: false,
//     },
//   });
//   expect(wrapper.classes()).not.toContain("w-full");
// });

// it("renders sizes properly", () => {
//   const sizesAndClasses = {
//     xs: {
//       text: "xs",
//       px: 1.5,
//       py: 1,
//     },
//     sm: {
//       text: "sm",
//       px: 2,
//       py: 1.5,
//     },
//     md: {
//       text: "base",
//       px: 2.5,
//       py: 2,
//     },
//     lg: {
//       text: "lg",
//       px: 2.5,
//       py: 2.5,
//     },
//     xl: {
//       text: "xl",
//       px: 3,
//       py: 3.5,
//     },
//   };
//   Object.entries(sizesAndClasses).forEach(([key, value]) => {
//     const wrapper = mount(LuiInput, {
//       props: {
//         size: key,
//       },
//     });
//     const inputEl = wrapper.find('[data-testid="lui-input-input"]');
//     expect(inputEl.classes()).toContain(`px-${value.px}`);
//     expect(inputEl.classes()).toContain(`py-${value.py}`);
//     expect(inputEl.classes()).toContain(`text-${value.text}`);
//   });
// });

// it("renders description properly", () => {
//   const wrapper = mount(LuiInput, {
//     props: {
//       description: testValue,
//     },
//   });
//   const description = wrapper.find("[data-testid='lui-input-description']");
//   expect(description.exists()).toBe(true);
//   expect(description.text()).toBe(testValue);
// });
// it("renders description and border based on the state prop", () => {
//   // const statesAndColors = {
//   //   null: "secondary-600",
//   //   true: "success-500",
//   //   warning: "warning-500",
//   //   false: "danger-500",
//   // };

//   // Check if classes rendered properly for each state
//   const nullWrapper = mount(LuiInput, {
//     props: {
//       description: testValue,
//       state: null,
//     },
//   });
//   expect(
//     nullWrapper.find('[data-testid="lui-input-description"]').classes()
//   ).toContain("text-secondary-600");

//   const trueWrapper = mount(LuiInput, {
//     props: {
//       description: testValue,
//       state: true,
//     },
//   });
//   expect(
//     trueWrapper.find('[data-testid="lui-input-description"]').classes()
//   ).toContain("text-success-500");
//   expect(
//     trueWrapper.find('[data-testid="lui-input-input"]').classes()
//   ).toContain("border-success-500");

//   const warningWrapper = mount(LuiInput, {
//     props: {
//       description: testValue,
//       state: "warning",
//     },
//   });
//   expect(
//     warningWrapper.find('[data-testid="lui-input-description"]').classes()
//   ).toContain("text-warning-500");
//   expect(
//     warningWrapper.find('[data-testid="lui-input-input"]').classes()
//   ).toContain("border-warning-500");

//   const falseWrapper = mount(LuiInput, {
//     props: {
//       description: testValue,
//       state: false,
//     },
//   });
//   expect(
//     falseWrapper.find('[data-testid="lui-input-description"]').classes()
//   ).toContain("text-danger-500");
//   expect(
//     falseWrapper.find('[data-testid="lui-input-input"]').classes()
//   ).toContain("border-danger-500");
// });
// it("renders icons and border based on the state", () => {
//   const trueWrapper = mount(LuiInput, {
//     props: {
//       description: testValue,
//       state: true,
//       "state-icon": true,
//     },
//   });
//   expect(
//     trueWrapper.find('[data-testid="lui-input-state-true"]').exists()
//   ).toBe(true);
//   expect(
//     trueWrapper.find('[data-testid="lui-input-input"]').classes()
//   ).toContain("border-success-500");

//   const warningWrapper = mount(LuiInput, {
//     props: {
//       description: testValue,
//       state: "warning",
//       "state-icon": true,
//     },
//   });
//   expect(
//     warningWrapper.find('[data-testid="lui-input-state-warning"]').exists()
//   ).toBe(true);
//   expect(
//     warningWrapper.find('[data-testid="lui-input-input"]').classes()
//   ).toContain("border-warning-500");

//   const falseWrapper = mount(LuiInput, {
//     props: {
//       description: testValue,
//       state: false,
//       "state-icon": true,
//     },
//   });
//   expect(
//     falseWrapper.find('[data-testid="lui-input-state-false"]').exists()
//   ).toBe(true);
//   expect(
//     falseWrapper.find('[data-testid="lui-input-input"]').classes()
//   ).toContain("border-danger-500");
// });
// it("displays icons properly", () => {
//   const testClass = "ri-search-line";

//   // Tests for prepend slot

//   const prependWrapper = mount(LuiInput, {
//     slots: {
//       prepend: `<i class=${testClass}></i>`,
//     },
//   });
//   expect(
//     prependWrapper.find("[data-testid='lui-input-icon-prepend']").exists()
//   ).toBe(true);
//   expect(
//     prependWrapper
//       .find("[data-testid='lui-input-icon-prepend']")
//       .find("i")
//       .exists()
//   ).toBe(true);
//   expect(
//     prependWrapper
//       .find("[data-testid='lui-input-icon-prepend']")
//       .find("i")
//       .classes()
//   ).toContain(testClass);

//   // Tests for append slot

//   const appendWrapper = mount(LuiInput, {
//     slots: {
//       append: `<i class=${testClass}></i>`,
//     },
//   });
//   expect(
//     appendWrapper.find("[data-testid='lui-input-icon-append']").exists()
//   ).toBe(true);
//   expect(
//     appendWrapper
//       .find("[data-testid='lui-input-icon-append']")
//       .find("i")
//       .exists()
//   ).toBe(true);
//   expect(
//     appendWrapper
//       .find("[data-testid='lui-input-icon-append']")
//       .find("i")
//       .classes()
//   ).toContain(testClass);
// });
