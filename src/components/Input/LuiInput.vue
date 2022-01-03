<template>
  <div
    :class="attrClasses"
    class="w-max"
  >
    <div :class="parentClasses">
      <lui-icon
        v-if="prepend !== 'none'"
        :name="prepend"
        :class="[iconClasses.size, iconClasses.position, iconClasses.prepend]"
        line
      />
      <input
        ref="Linput"
        v-bind="$attrs"
        :class="computedClasses"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <lui-button
        v-if="clear && !$attrs.disabled"
        type="link"
        variant="secondary"
        icon="close"
        :size="size"
        disable-styles
        :class="[iconClasses.position, iconClasses.clear]"
        @click="$refs.Linput.value = ''"
      />
      <lui-icon
        v-if="state !== null"
        :name="iconClasses.name"
        :class="[iconClasses.size, iconClasses.color, iconClasses.position, iconClasses.state]"
        line
      />
    </div>
    <p
      v-if="description !== 'none'"
      :class="descriptionClasses"
    >
      {{ description }}
    </p>
  </div>
</template>
<script>
import { computed } from 'vue'
import { generateClasses } from '../../mixins/methods'
import LuiIcon from '../Icon/LuiIcon.vue'
import LuiButton from '../Button/LuiButton.vue'
import * as prop from '../../mixins/props'
export default {
  components: {
    LuiIcon,
    LuiButton,
  },
  mixins: [
    prop.string('prepend'),
    prop.string('modelValue', ''),
    prop.size('sm', ['sm', 'md', 'lg']),
    prop.boolean('clear'),
    prop.string('description'),
  ],
  inheritAttrs: false,
  props: {
    state: {
      type: [String, Boolean, null],
      default: null,
      validator(value) {
        return [null, 'warning', true, false].includes(value)
      },
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const attrClasses = computed(() => {
      return context.attrs.class
    })
    const computedClasses = computed(() => {
      const classes = {
        paddingLeft:
          props.prepend === 'none'
            ? props.size === 'lg'
              ? 'pl-3'
              : 'pl-2'
            : props.size === 'lg' // icon varsa
            ? 'pl-11'
            : props.size === 'md'
            ? 'pl-9'
            : 'pl-8',
        paddingRight:
          props.state !== null && props.clear === true // two icon on right
            ? props.size === 'lg'
              ? 'pr-20'
              : props.size === 'md'
              ? 'pr-16'
              : 'pr-14'
            : props.state === null && props.clear === false // no icon on right
            ? props.size === 'lg'
              ? 'pr-3'
              : 'pr-2'
            : props.size === 'lg' // one icon on right
            ? 'pr-11'
            : props.size === 'md'
            ? 'pr-9'
            : 'pr-8',
        paddingY: props.size === 'sm' ? 'py-1.5' : props.size === 'md' ? 'py-2' : 'py-3',
        border:
          props.state === 'warning'
            ? 'border border-warning'
            : props.state === true
            ? 'border border-success'
            : props.state === false
            ? 'border border-danger'
            : 'border border-secondary-200',
        ring:
          props.state === 'warning'
            ? 'ring-4 ring-warning-100'
            : props.state === true
            ? 'ring-4 ring-success-100'
            : props.state === false
            ? 'ring-4 ring-danger-100'
            : '',
        borderRadius: `rounded-${props.size}`,
        fontSize: props.size === 'sm' ? 'text-xs' : 'text-base',
        lineHeight: props.size === 'sm' ? 'leading-4.5' : 'leading-6',
        fontColor: 'placeholder-secondary-400 text-secondary-600',
        width: 'w-44'
      }
      const stateClasses = {
        focus: {
          ring: props.state === null ? 'focus:ring-4 focus:ring-primary-100' : '',
          outline: 'outline-none',
          border: props.state === null ? 'focus:border-primary' : '',
        },
        disabled: {
          border: 'disabled:border-secondary',
          backgroundColor: 'disabled:bg-secondary-100',
          fontColor: 'disabled:text-secondary-300',
          ring: 'disabled:ring-0 disabled:ring-transparent',
        },
      }

      const { focus, disabled } = stateClasses
      return generateClasses([{ ...classes }, { ...focus }, { ...disabled }])
    })

    const descriptionClasses = computed(() => {
      const textColor =
        props.state === true
          ? 'text-success'
          : props.state === false
          ? 'text-danger'
          : props.state === 'warning'
          ? 'text-warning'
          : 'text-secondary-600'
      return `${textColor} inline-block text-xs leading-4.5 mt-1`
    })

    const iconClasses = computed(() => {
      return {
        name:
          !!context.attrs.disabled === true
            ? 'forbid'
            : props.state === 'warning'
            ? 'feedback'
            : props.state === false
            ? 'error-warning'
            : props.state === true
            ? 'checkbox-circle'
            : '',
        size: props.size === 'sm' ? 'text-base' : props.size === 'md' ? 'text-xl' : 'text-2xl',
        color:
          !!context.attrs.disabled === true
            ? 'text-secondary-300'
            : props.state === 'warning'
            ? 'text-warning'
            : props.state === false
            ? 'text-danger'
            : props.state === true
            ? 'text-success'
            : '',
        position: 'absolute top-2/4 transform -translate-y-1/2',
        prepend: props.size === 'lg' ? 'text-secondary-400 left-3' : 'text-secondary-400 left-2',
        state: props.size === 'lg' ? 'right-3' : 'right-2',
        clear:
          props.state === null
            ? props.size === 'lg'
              ? 'right-3'
              : 'right-2'
            : // sm:56 md:64 - 16 lg:48 = 20
            props.size === 'lg'
            ? 'right-12'
            : props.size === 'md'
            ? 'right-9'
            : 'right-8',
      }
    })
    const parentClasses = 'relative'
    return {
      computedClasses,
      descriptionClasses,
      iconClasses,
      parentClasses,
      attrClasses
    }
  },
}
</script>
