<template>
  <li>
    <a
      :class="computedClasses"
      v-bind="$attrs"
      :tabIndex="!disabled ? '0' : null"
    ><slot /></a>
  </li>
</template>
<script>
import { computed, inject } from 'vue'
import { generateClasses } from '../../mixins/methods'
import * as prop from '../../mixins/props'
export default {
  mixins: [prop.boolean('disabled')],
  inheritAttrs: false,

  setup(props) {
    const parentProps = inject('parentProps')

    const computedClasses = computed(() => {
      const classes = {
        marginLeft: 'ml-2',
        marginRight: 'mr-2',
        marginTop: 'mt-2',
        padding: parentProps.size === 'sm' ? 'p-1.5' : parentProps.size === 'md' ? 'p-2' : 'p-3',
        borderRadius: parentProps.rounded ? 'rounded-lg' : '',
        cursor: !props.disabled ? 'cursor-pointer' : 'cursor-not-allowed',
        backgroundColor: !props.disabled ? `hover:bg-${parentProps.variant}-100` : '',
        fontSize: parentProps.size === 'sm' ? 'text-xs' : 'text-base',
        lineHeight: props.size === 'sm' ? 'leading-4.5' : 'leading-6',
        fontColor: props.disabled
          ? 'text-secondary-300'
          : `text-secondary-600 hover:text-${parentProps.variant}`,
        display: 'block',
        outline: 'focus:outline-none',
        ring: !props.disabled ? `focus:ring-2 focus:ring-${parentProps.variant}` : '',
        width: parentProps.block ? 'w-full' : '',
      }

      return generateClasses([{ ...classes }])
    })
    return { computedClasses }
  },
}
</script>
