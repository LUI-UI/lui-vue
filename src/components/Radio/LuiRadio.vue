<template>
  <div class="container">
    <input
      type="radio"
      :class="computedClasses.input"
      v-bind="$attrs"
    >
    <span :class="computedClasses.span" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { generateClasses } from '../../mixins/methods'
import * as prop from '../../mixins/props'
export default {
  mixins: [prop.size('sm', ['sm', 'md', 'lg'])],
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
  setup(props) {
    function findSize(sizes) {
      return sizes[props.size]
    }

    const computedClasses = computed(() => {
      const classes = {
        input: {
          position: 'absolute',
          opacity: 'opacity-0',
          width: findSize({ sm: 'w-4', md: 'w-5', lg: 'w-6' }),
          height: findSize({ sm: 'h-4', md: 'h-5', lg: 'h-6' }),
          peer: 'peer',
        },
        span: {
          width: findSize({ sm: 'w-4', md: 'w-5', lg: 'w-6' }),
          height: findSize({ sm: 'h-4', md: 'h-5', lg: 'h-6' }),
          display: 'flex items-center justify-center',
          borderWidth: findSize({ sm: 'border-1.5', md: 'border-2', lg: 'border-2.5' }),
          borderColor:
            props.state === null
              ? 'border-primary'
              : props.state === 'warning'
              ? 'border-warning'
              : props.state === true
              ? 'border-success'
              : 'border-danger',
          borderRadius: 'rounded-full',
          backgroundColor: 'bg-white',
          ringWidth: props.size === 'sm' ? 'peer-focus:ring-1' : 'peer-focus:ring-2',
          ringOffset: 'peer-focus:ring-offset-2',
          ringColor: props.state === null ? 'peer-focus:ring-primary' : props.state === 'warning' ? 'peer-focus:ring-warning' : props.state === true ? 'peer-focus:ring-success' : 'peer-focus:ring-danger',
        },
        spanBefore: {
          width: findSize({ sm: 'before:w-2', md: 'before:w-2.5', lg: 'before:w-3' }),
          height: findSize({ sm: 'before:h-2', md: 'before:h-2.5', lg: 'before:h-3' }),
          borderRadius: 'before:rounded-full',
          backgroundColor: 'before:bg-white',
          backgroundColorChecked:
            props.state === null
              ? 'peer-checked:before:bg-primary'
              : props.state === 'warning'
              ? 'peer-checked:before:bg-warning'
              : props.state === true
              ? 'peer-checked:before:bg-success'
              : 'peer-checked:before:bg-danger',
        },
      }
      return {
        input: generateClasses([{ ...classes.input }]),
        span: generateClasses([{ ...classes.span }, { ...classes.spanBefore }]),
      }
    })

    return { computedClasses }
  },
}
</script>
