import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LuiSwitch from '../LuiSwitch.vue'

// const inputClasses = "absolute overflow-hidden outline-none disabled:cursor-not-allowed border-0 opacity-0 z-10 peer w-5 h-5 rounded-full"
const inputClasses = [
  'absolute',
  'overflow-hidden',
  'outline-none',
  'disabled:cursor-not-allowed',
  'border-0',
  'opacity-0',
  'z-10',
  'peer',
  'rounded-full',
]
// leading-none w-[38px] before:w-4 h-5 before:h-4 bg-secondary-500 dark:bg-secondary-800 peer-disabled:bg-secondary-100 peer-checked:peer-disabled:bg-success-100 peer-checked:bg-success-500 before:bg-white rounded-full before:rounded-full inline-flex relative before:absolute before:top-0 before:bottom-0 before:translate-x-0.5 peer-checked:before:translate-x-5 before:my-auto before:transition transition peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/40
const spanClasses = [
  'leading-none',
  'bg-secondary-500',
  'dark:bg-secondary-800',
  'peer-disabled:bg-secondary-100',
  'peer-checked:peer-disabled:bg-success-100',
  'peer-checked:bg-success-500',
  'before:bg-white',
  'rounded-full',
  'before:rounded-full',
  'inline-flex',
  'relative',
  'before:absolute',
  'before:top-0',
  'before:bottom-0',
  'before:my-auto',
  'before:transition',
  'transition',
  'peer-focus-visible:ring-2',
  'before:translate-x-0.5',
]

const inputSizeMD = ['w-[38px]', 'h-5']
const spanSizeSM = [
  'w-[30px]',
  'h-4',
  'before:w-3',
  'before:h-3',
  'peer-checked:before:translate-x-4',
]
const spanSizeMD = [
  'w-[38px]',
  'h-5',
  'before:w-4',
  'before:h-4',
  'peer-checked:before:translate-x-5',
]
const stateNull = ['peer-focus-visible:ring-primary-500/40']

describe('LuiSwitch.vue', () => {
  // disabled - size - state - description
  it('renders properly switch html structure', () => {
    const wrapper = mount(LuiSwitch)
    expect(wrapper.find('div')).toBeDefined()
    expect(wrapper.find('span')).toBeDefined()
    expect(wrapper.find('input').attributes('type')).toBe('checkbox')
  })
  it('should inherit attributes corretly', () => {
    const wrapper = mount(LuiSwitch, {
      attrs: { id: 'lui-checkbox' },
    })
    expect(wrapper.find('input').attributes('id')).toBe('lui-checkbox')
  })
  it('should render classes correctly', () => {
    const wrapper = mount(LuiSwitch)
    expect(wrapper.classes().sort()).toEqual(['inline-block', 'leading-3'])
    expect(wrapper.find('input').classes().sort()).toEqual(inputClasses.concat(inputSizeMD).sort())
    expect(wrapper.find('span').classes().sort()).toEqual(
      spanClasses.concat(spanSizeMD, stateNull).sort(),
    )
  })
  it('sould render size classes correctly', () => {
    const wrapper = mount(LuiSwitch, { props: { size: 'sm' } })
    spanSizeSM.forEach((size) => {
      expect(wrapper.find('span').classes().sort()).toContain(size)
    })
    expect(wrapper.find('span').classes().sort()).toEqual(
      spanClasses.concat(spanSizeSM, stateNull).sort(),
    )
  })
})
