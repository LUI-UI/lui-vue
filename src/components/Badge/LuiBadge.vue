<template>
  <span :class="computedClasses" />
</template>

<script>
import { computed } from 'vue'
import { generateClasses, generateVariant } from '../../mixins/methods'

import * as prop from '../../mixins/props'

export default {
  mixins: [prop.variant(), prop.boolean('border'), prop.size(), prop.filter()],
  setup(props) {
    const computedClasses = computed(() => {
      const classes = {
        width:
          props.size === '2xs'
            ? 'w-2'
            : props.size === 'xs'
            ? 'w-3'
            : props.size === 'sm'
            ? 'w-4'
            : props.size === 'md'
            ? 'w-5'
            : 'w-6',
        height:
          props.size === '2xs'
            ? 'h-2'
            : props.size === 'xs'
            ? 'h-3'
            : props.size === 'sm'
            ? 'h-4'
            : props.size === 'md'
            ? 'h-5'
            : 'h-6',
        backgroundColor: generateVariant(props.variant, props.filter).backgroundColor,
        border: props.border ? 'border border-white' : '',
        display: 'inline-block',
        borderRadius: 'rounded-full',
      }
      return generateClasses([{ ...classes }])
    })
    return { computedClasses }
  },
}
</script>
