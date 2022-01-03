<template>
  <component
    :is="tag"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script>
import * as prop from '../../mixins/props'
import { computed } from 'vue'
import { generateClasses } from '../../mixins/methods'
export default {
  mixins: [
    prop.string('tag', 'p', [
      'p',
      'span',
      'br',
      'strong',
      'em',
      'quotes',
      'blockquote',
      'code',
      'pre',
      'mark',
      'ins',
      'del',
      'sup',
      'sub',
      'small',
      'i',
      'b',
      'abbr',
      'address',
      'bdi',
      'bdo',
      'cite',
      'dfn',
      'kbs',
      'meter',
      'q',
      'rp',
      'rt',
      'ruby',
      's',
      'samp',
      'time',
      'u',
      'var',
      'wbr',
    ]),
    prop.size('md', ['xs', 'sm', 'md', 'lg']),
    prop.variant('variant', 'secondary'),
  ],
  setup(props) {
    const classes = computed(() => {
      const styles = {
        fontColor: `text-${props.variant}-600`,
        fontSize:
          props.size === 'xs'
            ? 'text-xs'
            : props.size === 'sm'
            ? 'text-sm'
            : props.size === 'md'
            ? 'text-base'
            : 'text-xl',
        lineHeight:
          props.size === 'xs'
            ? 'leading-3'
            : props.size === 'sm'
            ? 'leading-4.5'
            : props.size === 'md'
            ? 'leading-5'
            : 'leading-6',
      }
      return generateClasses([{ ...styles }])
    })
    return {
      classes,
    }
  },
}
</script>
