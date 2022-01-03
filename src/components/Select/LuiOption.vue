<template>
  <li
    v-bind="$attrs"
    :class="[computedClasses, selectedStyles]"
  >
    <slot />
  </li>
</template>
<script>
import { generateClasses } from '../../mixins/methods'
import { computed, inject } from 'vue'
export default {
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const parentProps = inject('parentProps')
    const computedClasses = computed(() => {
      const styles = {
        marginLeft: 'ml-2',
        marginRight: 'mr-2',
        marginTop: 'mt-2',
        padding:
          parentProps.size === 'sm'
            ? 'p-1.5'
            : parentProps.size === 'md'
            ? 'p-2'
            : parentProps.size === 'lg'
            ? 'p-3'
            : '',
        fontSize: props.size === 'sm' ? 'text-xs' : 'text-base',
        borderRadius: parentProps.rounded ? 'rounded-lg' : '',
        cursor: props.disabled === false ? 'cursor-pointer' : '',
        display: 'flex',
        alignItems: 'items-center',
        outline: 'outline-none'
      }
      return generateClasses([{ ...styles }])
    })

    const selectedStyles = computed(() => {
      return props.selected
        ? 'bg-primary text-white focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        : props.disabled ? 'bg-secondary-100 text-secondary-300'
        : 'bg-white hover:bg-primary-100 focus:bg-primary-100 text-secondary-600 hover:text-primary focus:text-primary'
    })
    return { computedClasses, selectedStyles }
  },
}
</script>
