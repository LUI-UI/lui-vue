<template>
  <div class="container">
    <input
      type="checkbox"
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
  mixins: [prop.size('sm', ['sm','lg'])],
  inheritAttrs: false,
  setup(props) {
    function findSize(sizes) {
      return sizes[props.size]
    }

    const computedClasses = computed(() => {
      const classes = {
        input: {
          position: 'absolute',
          opacity: 'opacity-0',
          width: findSize({ sm: 'w-8', lg: 'w-10' }),
          height: findSize({ sm: 'h-4', lg: 'h-5' }),
          cursor: 'cursor-pointer',
          peer: 'peer',
        },
        span: {
          display: 'flex items-center',
          alignItems: 'peer-checked:justify-end' ,
          width: findSize({ sm: 'w-8', lg: 'w-10' }),
          height: findSize({ sm: 'h-4', lg: 'h-5' }),
          borderRadius: 'rounded-full',
          backgroundColor: 'bg-secondary-300 peer-checked:bg-success',
          borderWidth: 'border',
          borderColor: 'border-secondary-200 peer-checked:border-success-100',
          ringWidth: 'peer-focus:ring-2',
          ringOffset: 'peer-focus:ring-offset-2',
          ringColor: 'peer-focus:ring-success',
          paddigX: 'px-0.5',
        },
        spanBefore: {
          width: findSize({sm: 'before:w-3', lg: 'before:w-4'}),
          height: findSize({sm: 'before:h-3', lg: 'before:h-4'}),
          borderRadius: 'before:rounded-full',
          backgroundColor: 'before:bg-white',
          borderWidth: 'before:border',
          borderColor: 'before:border-secondary-200 peer-checked:before:border-success-100',
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
 