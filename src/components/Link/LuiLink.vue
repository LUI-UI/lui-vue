<template>
  <component
    :is="linkName"
    v-bind="$attrs"
    :class="classes"
  >
    <slot />
  </component>
</template>

<script>
import * as prop from '../../mixins/props'
import { computed, } from 'vue'
import { generateClasses } from '../../mixins/methods'
import * as packageJSON from '../../../package.json'
export default {
  mixins: [prop.size('sm', ['xxsm', 'xsm', 'sm', 'lg', 'xlg']), prop.variant('variant', 'primary')],
  setup(props,context) {
    const linkName = computed(() => {
      if (context.attrs.to !== undefined) {
        if (packageJSON.dependencies.vue !== undefined) return 'router-link'
        return 'nuxt-link'
      }
      return 'a'
    })
    const classes = computed(() => {
      const styles = {
        fontColor: `text-${props.variant}-400 hover:text-${props.variant}-500`,
        fontSize:
          props.size === 'xxsm'
            ? 'text-2xs'
            : props.size === 'xsm'
            ? 'text-xs'
            : props.size === 'sm'
            ? 'text-sm'
            : props.size === 'lg'
            ? 'text-base'
            : 'text-xl',
        lineHeight:
          props.size === 'xxsm'
            ? 'leading-3'
            : props.size === 'xsm'
            ? 'leading-4.5'
            : props.size === 'sm'
            ? 'leading-5'
            : props.size === 'lg'
            ? 'leading-6'
            : 'leading-7',
        underline: 'underline',
      }
      return generateClasses([{ ...styles }])
    })

    return {
      classes,
      linkName,
    }
  },
}
</script>
