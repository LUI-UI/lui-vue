import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import LuiAvatar from '../LuiAvatar.vue'
import type { Color, Filter, Size } from '@/globals/types'

const colors: Color[] = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'danger',
]
interface filteredAvatar {
  color: Color
  filter: Filter
  expectedClasses: {
    bg: string
    text: string
    border: string
  }
}
const filteredAvatars: filteredAvatar[] = [
  {
    color: 'primary',
    filter: 'darken',
    expectedClasses: {
      bg: 'bg-primary-800',
      text: 'text-primary-100',
      border: 'border-primary-100',
    },
  },
  {
    color: 'secondary',
    filter: 'darken',
    expectedClasses: {
      bg: 'bg-secondary-800',
      text: 'text-secondary-100',
      border: 'border-secondary-100',
    },
  },
  {
    color: 'info',
    filter: 'darken',
    expectedClasses: {
      bg: 'bg-info-800',
      text: 'text-info-100',
      border: 'border-info-100',
    },
  },
  {
    color: 'success',
    filter: 'darken',
    expectedClasses: {
      bg: 'bg-success-800',
      text: 'text-success-100',
      border: 'border-success-100',
    },
  },
  {
    color: 'warning',
    filter: 'darken',
    expectedClasses: {
      bg: 'bg-warning-800',
      text: 'text-warning-100',
      border: 'border-warning-100',
    },
  },
  {
    color: 'danger',
    filter: 'darken',
    expectedClasses: {
      bg: 'bg-danger-800',
      text: 'text-danger-100',
      border: 'border-danger-100',
    },
  },
  {
    color: 'primary',
    filter: 'lighten',
    expectedClasses: {
      bg: 'bg-primary-100',
      text: 'text-primary-500',
      border: 'border-primary-500',
    },
  },
  {
    color: 'secondary',
    filter: 'lighten',
    expectedClasses: {
      bg: 'bg-secondary-100',
      text: 'text-secondary-500',
      border: 'border-secondary-500',
    },
  },
  {
    color: 'info',
    filter: 'lighten',
    expectedClasses: {
      bg: 'bg-info-100',
      text: 'text-info-500',
      border: 'border-info-500',
    },
  },
  {
    color: 'success',
    filter: 'lighten',
    expectedClasses: {
      bg: 'bg-success-100',
      text: 'text-success-500',
      border: 'border-success-500',
    },
  },
  {
    color: 'warning',
    filter: 'lighten',
    expectedClasses: {
      bg: 'bg-warning-100',
      text: 'text-warning-500',
      border: 'border-warning-500',
    },
  },
  {
    color: 'danger',
    filter: 'lighten',
    expectedClasses: {
      bg: 'bg-danger-100',
      text: 'text-danger-500',
      border: 'border-danger-500',
    },
  },
]
export function getFilteredColor(filter: string): string {
  const filterMap: Record<string, string> = {
    none: '500',
    lighten: '100',
    darken: '800',
  }

  // Return the corresponding color suffix, defaulting to "500" for unknown filters
  return filterMap[filter] || '500'
}

const expectedDefaultProps = {
  variant: 'solid',
  color: 'primary',
  filter: 'none',
  size: 'md',
  border: false,
  rounded: false,
  text: '',
  src: '',
  alt: '',
}
describe('Default LuiAvatar', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiAvatar)
  })

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })

  it('renders properly based on default values', () => {
    // Check if the component exists
    expect(wrapper.exists()).toBe(true)

    // Check if the rendered HTML matches the expected HTML
    expect(wrapper.html()).toMatchSnapshot()

    // Check if the default props given correctly
    expect(wrapper.props()).toEqual(expectedDefaultProps)
  })
})

describe('LuiAvatar class tests', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiAvatar)
  })

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })

  it('renders solid variant properly', async () => {
    await wrapper.setProps({ variant: 'solid' })
    // Check if background class rendering properly according to the variant
    expect(wrapper.find('[data-testid="lui-avatar"]').classes()).toContain(
      `bg-${wrapper.props().color}-${getFilteredColor(wrapper.props().filter)}`,
    )
  })
  it('renders outline variant properly', async () => {
    await wrapper.setProps({ variant: 'outline' })
    // Check if background class rendering properly according to the variant
    expect(wrapper.find('[data-testid="lui-avatar"]').classes()).not.toContain(
      'bg',
    )
    // Check if border class rendering properly according to the variant
    expect(wrapper.find('[data-testid="lui-avatar"]').classes()).toContain(
      `border-${wrapper.props().color}-${getFilteredColor(
        wrapper.props().filter,
      )}`,
    )
  })

  it('should render sizes correctly', async () => {
    const sizesAndValues = {
      xs: 6,
      sm: 8,
      md: 10,
      lg: 12,
      xl: 16,
    }

    for (const [key, value] of Object.entries(sizesAndValues)) {
      // Use `await` when setting props
      await wrapper.setProps({
        size: key as Size,
      })

      expect(wrapper.find('[data-testid="lui-avatar"]').classes()).toContain(
        `w-${value}`,
      )
      expect(wrapper.find('[data-testid="lui-avatar"]').classes()).toContain(
        `h-${value}`,
      )
    }
  })
  it('renders correctly not rounded avatar', async () => {
    await wrapper.setProps({ rounded: false })
    expect(wrapper.find('[data-testid="lui-avatar"]').classes()).not.contain(
      'rounded',
    )
    expect(wrapper.find('[data-testid="lui-avatar"]').classes()).not.contain(
      'rounded-lg',
    )
    expect(wrapper.find('[data-testid="lui-avatar"]').classes()).not.contain(
      'rounded-full',
    )
  })
  it('renders correctly rounded avatar', async () => {
    await wrapper.setProps({ rounded: true })
    expect(wrapper.find('[data-testid="lui-avatar"]').classes()).contain(
      'rounded-lg',
    )
  })
  it('renders correctly full rounded avatar', async () => {
    await wrapper.setProps({ rounded: 'full' })
    expect(wrapper.find('[data-testid="lui-avatar"]').classes()).contain(
      'rounded-full',
    )
  })
  it('renders properly based on the color attribute', async () => {
    for (const colorOption of colors) {
      await wrapper.setProps({
        color: colorOption,
      })

      expect(wrapper.find('[data-testid="lui-avatar"]').classes()).toContain(
        `bg-${colorOption}-500`,
      )
    }
  })
  it('applies filters properly', async () => {
    for (const avatar of filteredAvatars) {
      await wrapper.setProps({
        color: avatar.color,
        filter: avatar.filter,
      })
      expect(wrapper.find('[data-testid="lui-avatar"]').classes()).contain(
        avatar.expectedClasses.bg,
      )
      expect(wrapper.find('[data-testid="lui-avatar"]').classes()).contain(
        avatar.expectedClasses.text,
      )
    }
  })
  it('displays filtered avatars\' border properly ', async () => {
    // Check the border of filtered avatars
    for (const avatar of filteredAvatars) {
      await wrapper.setProps({
        color: avatar.color,
        filter: avatar.filter,
        border: true,
      })
      expect(wrapper.find('[data-testid="lui-avatar"]').classes()).contain(
        avatar.expectedClasses.border,
      )
    }
    // Check the border of unfiltered avatars
    for (const colorOption of colors) {
      await wrapper.setProps({
        color: colorOption,
        border: true,
      })
      expect(wrapper.find('[data-testid="lui-avatar"]').classes()).contain(
        'border',
      )
      expect(wrapper.find('[data-testid="lui-avatar"]').classes()).contain(
        'border-solid',
      )
    }
  })
})

describe('LuiAvatar with image', () => {
  let wrapper: VueWrapper<any>
  const testSrc = 'https://www.w3schools.com/howto/img_avatar.png'

  beforeEach(() => {
    wrapper = mount(LuiAvatar, {
      props: {
        src: testSrc,
      },
    })
  })

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })
  it('displays image with the src prop', async () => {
    expect(wrapper.find('[data-testid="lui-avatar-img"]').exists()).toBe(true)
    expect(
      wrapper.find('[data-testid="lui-avatar-img"]').element.getAttribute('src'),
    ).toEqual(testSrc)
    // Check if the other elements are not rendered
    expect(wrapper.find('[data-testid="lui-avatar-icon"]').exists()).toBe(
      false,
    )
    expect(wrapper.find('[data-testid="lui-avatar-text"]').exists()).toBe(
      false,
    )
  })
  it('gives an alt text to img by the alt prop', async () => {
    const testAlt = 'User Avatar'
    await wrapper.setProps({
      alt: testAlt,
    })
    expect(wrapper.find('[data-testid="lui-avatar-img"]').exists()).toBe(true)
    expect(
      wrapper.find('[data-testid="lui-avatar-img"]').element.getAttribute('alt'),
    ).toEqual(testAlt)
  })
})

it('displays text properly', () => {
  const testText = 'T'
  const wrapper = mount(LuiAvatar, {
    props: {
      text: testText,
    },
  })
  expect(wrapper.find('[data-testid="lui-avatar-text"]').exists()).toBe(true)
  expect(wrapper.find('[data-testid="lui-avatar-text"]').text()).toBe(testText)
  // Check if the other elements are not rendered
  expect(wrapper.find('[data-testid="lui-avatar-icon"]').exists()).toBe(false)
  expect(wrapper.find('[data-testid="lui-avatar-img"]').exists()).toBe(false)
})
it('displays icon properly', () => {
  const testClass = 'ri-home-line'
  const wrapper = mount(LuiAvatar, {
    slots: {
      icon: `<i class=${testClass}></i>`,
    },
  })

  expect(wrapper.find('[data-testid="lui-avatar-icon"]').exists()).toBe(true)
  expect(
    wrapper.find('[data-testid="lui-avatar-icon"]').find('i').classes(),
  ).toContain(testClass)
  // Check if the other elements are not rendered
  expect(wrapper.find('[data-testid="lui-avatar-text"]').exists()).toBe(false)
  expect(wrapper.find('[data-testid="lui-avatar-img"]').exists()).toBe(false)
})
