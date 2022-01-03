<template>
  <button
    :class="[computedClasses]"
    v-bind="$attrs"
  >
    <lui-icon
      v-if="prepend !== 'none'"
      :name="prepend"
      :fill="!iconLine"
      :line="iconLine"
      :class="iconClasses"
    />
    <span
      v-if="prepend !== 'none' && icon !== 'none'"
      :class="size === 'sm' ? 'mx-1.5' : 'mx-2.5'"
    >
      <slot />
    </span>
    <slot v-else />
    <lui-icon
      v-if="icon !== 'none'"
      :name="icon"
      :fill="!iconLine"
      :line="iconLine"
      :class="iconClasses"
    />
  </button>
</template>
<script>
import { computed } from 'vue'
import LuiIcon from '../Icon/LuiIcon.vue'
import { generateClasses, generateVariant } from '../../mixins/methods'
import * as prop from '../../mixins/props'
export default {
  components: {
    LuiIcon,
  },
  mixins: [
    prop.variant(),
    prop.filter(),
    prop.boolean('rounded'),
    prop.boolean('roundedFull'),
    prop.boolean('block'),
    prop.boolean('uppercase'),
    prop.boolean('iconLine'),
    prop.string('prepend'),
    prop.string('icon'),
    prop.string('type', 'default', ['default', 'text', 'outline', 'link', 'link-underline']),
    prop.size('md', ['sm', 'md', 'lg']),
  ],
  inheritAttrs: false,
  props: {
    disableStyles: {
      type: [Array, Boolean],
      default: () => [''],
      validator(value) {
        return (
          typeof value === 'boolean' ||
          ['hover', 'focus', 'disable', 'underline', ''].some((r) => value.indexOf(r) >= 0)
        )
      },
    },
  },
  setup(props, context) {
    const computedClasses = computed(() => {
      const classes = {
        padding:
          props.type === 'link' || props.type === 'link-underline'
            ? 'p-0'
            : !context.slots.default // icon button
            ? props.size === 'lg'
              ? 'p-3'
              : props.size === 'md'
              ? 'p-2.5'
              : 'p-1.5'
            : props.size === 'lg' // text ve icon
            ? 'px-6 py-3'
            : props.size === 'md'
            ? 'px-4 py-2'
            : 'px-3 py-1.5',
        backgroundColor:
          props.type === 'default'
            ? generateVariant(props.variant, props.filter).backgroundColor
            : '',
        fontColor:
          props.type === 'default'
            ? generateVariant(props.variant, props.filter).fontColor
            : props.filter === 'none'
            ? `text-${props.variant}`
            : props.filter === 'darker'
            ? `text-${props.variant}-800`
            : `text-${props.variant}-50`,
        fontSize: props.size === 'sm' ? 'text-xs' : 'text-base',
        lineHeight: props.size === 'sm' ? 'leading-4.5' : 'leading-6',
        borderWidth: props.type === 'outline' || props.type === 'default' ? 'border' : '',
        borderStyle: props.type === 'outline' || props.type === 'default' ? 'border-solid' : '',
        borderColor:
          props.type === 'outline' || props.type === 'default'
            ? props.filter === 'none'
              ? `border-${props.variant}`
              : props.filter === 'darker'
              ? `border-${props.variant}-800`
              : `border-${props.variant}-50`
            : '',
        borderBottom:
          (typeof props.disableStyles === 'boolean' && props.disableStyles === true) ||
          (Array.isArray(props.disableStyles) && props.disableStyles.includes('underline'))
            ? ''
            : props.type === 'link-underline'
            ? props.filter === 'darker'
              ? `border-b border-${props.variant}-800`
              : props.filter === 'lighter'
              ? `border-b border-${props.variant}-100`
              : `border-b border-${props.variant}`
            : '',
        borderRadius:
          props.type !== 'link' && (props.rounded || props.roundedFull)
            ? props.rounded
              ? `rounded-${props.size}`
              : props.roundedFull
              ? 'rounded-full'
              : ''
            : '',
        uppercase: props.uppercase ? 'uppercase' : '',
        width: !props.block || props.type === 'link' ? '' : 'w-full',
        display: props.prepend !== 'none' || props.icon !== 'none' ? 'flex' : '',
        justifyContent: props.prepend !== 'none' || props.icon !== 'none' ? 'justify-center' : '',
        alignItems: props.prepend !== 'none' || props.icon !== 'none' ? 'items-center' : '',
      }
      let stateClasses = {
        hover: {
          backgroundColor:
            props.type === 'link' || props.type === 'link-underline'
              ? ''
              : props.type === 'outline'
              ? props.filter === 'darker'
                ? `hover:bg-${props.variant}-800`
                : props.filter === 'lighter'
                ? `hover:bg-${props.variant}-50`
                : `hover:bg-${props.variant}`
              : props.filter === 'lighter' //def,text
              ? `hover:bg-${props.variant}`
              : `hover:bg-${props.variant}-50`,
          fontColor:
            props.type === 'default'
              ? props.filter === 'none'
                ? `hover:text-${props.variant}`
                : props.filter === 'darker'
                ? `hover:text-${props.variant}`
                : 'hover:text-white'
              : props.type !== 'outline'
              ? props.filter === 'none'
                ? `hover:text-${props.variant}--400`
                : props.filter === 'darker'
                ? `hover:text-${props.variant}--700`
                : `hover:text-${props.variant}--200` // lighter
              : 'hover:text-white', // outline
          borderColor:
            props.type === 'outline'
              ? props.filter === 'darker'
                ? `hover:border-${props.variant}-800`
                : `hover:border-${props.variant}-50`
              : props.type === 'default'
              ? `hover:border-${props.variant}-50`
              : '',
        },
        disable: {
          backgroundColor:
            props.type === 'default'
              ? 'disabled:bg-secondary-300'
              : props.type === 'outline'
              ? 'disabled:bg-secondary-100'
              : '',
          fontColor:
            props.type === 'default' ? 'disabled:text-white' : 'disabled:text-secondary-300',
          borderColor: 'disabled:border-secondary-300',
        },
        focus: {
          outline: 'focus:outline-none',
          boxShadow:
            props.filter === 'darker'
              ? `focus:ring-2 focus:ring-${props.variant}-800 focus:ring-offset-2`
              : props.filter === 'lighter'
              ? `focus:ring-2 focus:ring-${props.variant}-100 focus:ring-offset-2`
              : `focus:ring-2 focus:ring-${props.variant} focus:ring-offset-2`,
        },
      }
      if (typeof props.disableStyles === 'boolean') {
        if (props.disableStyles === true) stateClasses = ''
      }
      if (Array.isArray(props.disableStyles)) props.disableStyles.map((s) => (stateClasses[s] = ''))

      const { disable, focus, hover } = stateClasses
      return generateClasses([{ ...classes }, { ...disable }, { ...focus }, { ...hover }])
    })
    const iconClasses = computed(() => {
      const classes = {
        fontSize: props.size === 'sm' ? 'text-base' : props.size === 'md' ? 'text-xl' : 'text-2xl',
        lineHeight: props.size === 'lg' ? 'leading-5' : 'leading-none',
        prependMargin:
          // prepend var, slot var, icon yoksa
          props.prepend !== 'none' && !!context.slots.default && props.icon === 'none'
            ? props.size === 'sm'
              ? 'mr-1.5 -ml-0.5'
              : 'mr-2 -ml-1'
            : 'm-0',
        suffixMargin:
          props.prepend === 'none' && !!context.slots.default && props.icon !== 'none'
            ? props.size === 'sm'
              ? 'ml-1.5 -mr-0.5'
              : 'ml-2 -mr-1'
            : 'm-0',
      }
      return generateClasses([{ ...classes }])
    })
    return { computedClasses, iconClasses }
  },
}
</script>
