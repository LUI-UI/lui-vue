import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import LuiBadge from '../LuiBadge.vue'
import LuiAvatar from '../../Avatar/LuiAvatar.vue'
import type { Color, Filter, Size } from '@/globals/types'

interface filteredBadge {
  color: Color
  filter: Filter
  expectedClasses: {
    bg: string
    text: string
    border: string
  }
}
const filteredBadges: filteredBadge[] = [
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
const colors: Color[] = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'danger',
]

const expectedDefaultProps = {
  variant: 'solid',
  color: 'primary',
  filter: 'none',
  size: 'md',
  border: false,
  text: '',
  position: 'bottom-right',
}

describe('Default LuiBadge', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiBadge as any)
  })

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })
  wrapper = mount(LuiBadge)
  it('renders properly based on default values', () => {
    // Check if the component exists
    expect(wrapper.exists()).toBe(true)

    // Check if the rendered HTML matches the expected HTML
    expect(wrapper.html()).toMatchSnapshot()

    // Check if the default props given correctly
    expect(wrapper.props()).toEqual(expectedDefaultProps)
  })
})
describe('LuiBadge class tests', () => {
  let wrapper: VueWrapper<any>
  beforeEach(() => {
    wrapper = mount(LuiBadge)
  })

  afterEach(() => {
    // Clean up after each test
    wrapper.unmount()
  })
  it('renders solid variant properly', async () => {
    await wrapper.setProps({ variant: 'solid' })
    // Check if background class rendering properly according to the variant
    expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).toContain(
      `bg-${wrapper.props().color}-${getFilteredColor(wrapper.props().filter)}`,
    )
  })
  it('renders outline variant properly', async () => {
    await wrapper.setProps({ variant: 'outline' })
    // Check if background class rendering properly according to the variant
    expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).not.toContain(
      'bg',
    )
    // Check if border class rendering properly according to the variant
    expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).toContain(
      `border-${wrapper.props().color}-${getFilteredColor(
        wrapper.props().filter,
      )}`,
    )
  })
  it('should render sizes correctly', async () => {
    const sizesAndValues = {
      xs: 1.5,
      sm: 2,
      md: 2.5,
      lg: 3,
      xl: 3.5,
    }

    for (const [key, value] of Object.entries(sizesAndValues)) {
      // Use `await` when setting props
      await wrapper.setProps({
        size: key as Size,
      })

      expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).toContain(
        `w-${value}`,
      )
      expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).toContain(
        `h-${value}`,
      )
    }
  })
  it('renders properly based on the color attribute', async () => {
    for (const colorOption of colors) {
      await wrapper.setProps({
        color: colorOption,
      })

      expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).toContain(
        `bg-${colorOption}-500`,
      )
    }
  })
  it('applies filters properly', async () => {
    for (const badge of filteredBadges) {
      await wrapper.setProps({
        color: badge.color,
        filter: badge.filter,
      })
      expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).contain(
        badge.expectedClasses.bg,
      )
      expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).contain(
        badge.expectedClasses.text,
      )
    }
  })

  it('displays filtered avatars\' border properly ', async () => {
    // Check the border of filtered avatars
    for (const badge of filteredBadges) {
      await wrapper.setProps({
        color: badge.color,
        filter: badge.filter,
        border: true,
      })
      expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).contain(
        badge.expectedClasses.border,
      )
    }
    // Check the border of unfiltered avatars
    for (const colorOption of colors) {
      await wrapper.setProps({
        color: colorOption,
        border: true,
      })
      expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).contain(
        'border',
      )
      expect(wrapper.find('[data-testid="lui-badge-wrapper"]').classes()).contain(
        'border-solid',
      )
    }
  })
})

it('displays text properly', () => {
  const testText = 'T'
  const wrapper = mount(LuiBadge, {
    props: {
      text: testText,
    },
  })
  expect(wrapper.find('[data-testid=\'lui-badge-text\']').exists()).toBe(true)
  expect(wrapper.find('[data-testid=\'lui-badge-text\']').text()).toBe(testText)
})

it('displays icon properly', () => {
  const testClass = 'ri-wifi-line'
  const wrapper = mount(LuiBadge, {
    slots: {
      icon: `<i class=${testClass}></i>`,
    },
  })
  expect(wrapper.find('[data-testid=\'lui-badge-icon\']').exists()).toBe(true)
  expect(
    wrapper.find('[data-testid=\'lui-badge-wrapper\']').find('i').classes(),
  ).toContain(testClass)
})

it('locates correctly based position prop', () => {
  const positions = [
    {
      position: 'top-left',
      expectedClasses: { vertical: 'top-0', horizontal: 'left-0' },
    },
    {
      position: 'bottom-left',
      expectedClasses: { vertical: 'bottom-0', horizontal: 'left-0' },
    },
    {
      position: 'top-right',
      expectedClasses: { vertical: 'top-0', horizontal: 'right-0' },
    },
    {
      position: 'bottom-right',
      expectedClasses: { vertical: 'bottom-0', horizontal: 'right-0' },
    },
  ]

  positions.forEach((positionOption) => {
    const combinedComponents = {
      template: `
          <lui-badge position=${positionOption.position} text="9">
            <lui-avatar color="secondary" :rounded="true">
              <template #icon>
                <i class="ri-user-fill"></i>
              </template>
            </lui-avatar>
          </lui-badge>

          `,
      components: {
        LuiAvatar,
        LuiBadge,
      },
    }
    const wrapper = mount(combinedComponents)
    // Getting the desired div for checking if it is located correctly
    const absoluteBadgeClasses = wrapper
      .find('[data-testid=\'lui-badge-wrapper\']')
      .classes()
    // Check necessary classes
    expect(absoluteBadgeClasses).toContain('absolute')
    expect(absoluteBadgeClasses).toContain(
      positionOption.expectedClasses.vertical,
    )
    expect(absoluteBadgeClasses).toContain(
      positionOption.expectedClasses.horizontal,
    )
  })
})
