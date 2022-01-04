<template>
  <div
    class="lui-avatar"
    :class="[computedClasses]"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <lui-icon
      v-if="icon !== 'none'"
      :name="icon"
      fill
      :class="iconClasses"
    />
    <img
      v-if="img !== 'none'"
      :src="img"
      :class="imgClasses"
      alt="Lui avatar"
    >
    <span v-else>
      {{ text.toUpperCase().slice(0, 2) }}
    </span>
    <lui-badge
      v-if="badge.variant !== '' && badge.position !== ''"
      :class="badgeClasses"
      :variant="badge.variant"
      border
      :size="['2xs', 'xs', 'sm'].includes(size) ? '2xs' : 'xs'"
    />
  </div>
</template>
<script>
import { computed } from 'vue'
import LuiIcon from '../Icon/LuiIcon.vue'
import LuiBadge from '../Badge/LuiBadge.vue'
import { generateClasses, generateVariant } from '../../mixins/methods'
import * as prop from '../../mixins/props'
export default {
  components: {
    LuiIcon,
    LuiBadge,
  },
  mixins: [
    prop.variant(),
    prop.filter(),
    prop.size(),
    prop.boolean('rounded'),
    prop.boolean('roundedFull'),
    prop.boolean('border'),
    prop.string('icon','none'),
    prop.string('img', 'none'),
  ],
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: '',
      validator(value) {
        return value.length <= 2
      },
    },
    badge: {
      type: [Object],
      default() {
        return {
          position: '',
          variant: '',
        }
      },
      validator(obj) {
        return (
          ['', 'primary', 'secondary', 'info', 'success', 'warning', 'danger'].includes(
            obj.variant
          ) && ['', 'top', 'bottom'].includes(obj.position)
        )
      },
    },
  },
  emits: ['click'],
  setup(props) {
    const computedClasses = computed(() => {
      const classes = {
        width:
          props.size === '2xs'
            ? 'w-5'
            : props.size === 'xs'
            ? 'w-6'
            : props.size === 'sm'
            ? 'w-8'
            : props.size === 'md'
            ? 'w-12'
            : props.size === 'lg'
            ? 'w-16'
            : 'w-12',
        height:
          props.size === '2xs'
            ? 'h-5'
            : props.size === 'xs'
            ? 'h-6'
            : props.size === 'sm'
            ? 'h-8'
            : props.size === 'md'
            ? 'h-12'
            : props.size === 'lg'
            ? 'h-16'
            : 'h-12',
        display: 'flex',
        justifyContent: 'justify-center',
        alignItems: 'items-center',
        verticalAlign: 'align-middle',
        textAlign: 'text-center',
        position: 'relative',
        borderSize: props.border
          ? ['2xs', 'xs', 'sm'].includes(props.size)
            ? 'border'
            : 'border-2'
          : '',
        borderColor: props.border ? 'border-white' : '',
        borderStyle: props.border ? 'border-solid' : '',
        borderRadius: props.roundedFull
          ? 'rounded-full'
          : props.rounded
          ? `rounded-${props.size}`
          : '',
        backgroundColor: generateVariant(props.variant, props.filter).backgroundColor,
        fontColor: generateVariant(props.variant, props.filter).fontColor,
        fontSize:
          props.size === '2xs'
            ? 'text-2xs'
            : props.size === 'xs'
            ? 'text-2xs'
            : props.size === 'sm'
            ? 'text-sm'
            : props.size === 'md'
            ? 'text-md'
            : props.size === 'lg'
            ? 'text-xl'
            : '',
        fontWeight: 'font-semibold',
      }
      return generateClasses([{ ...classes }])
    })
    const iconClasses = computed(() => {
      const classes = {
        fontSize: ['2xs', 'xs'].includes(props.size)
          ? 'text-2xs'
          : props.size === 'sm'
          ? 'text-sm'
          : props.size === 'md'
          ? 'text-xl'
          : 'text-2xl',
      }
      return generateClasses([{ ...classes }])
    })
    const imgClasses = computed(() => {
      const classes = {
        width: 'w-full',
        height: 'h-full',
        borderRadius: props.roundedFull
          ? 'rounded-full'
          : props.rounded
          ? `rounded-${props.size}`
          : '',
        objectFit: 'object-cover',
      }
      return generateClasses([{ ...classes }])
    })
    const badgeClasses = computed(() => {
      const classes = {
        position: 'absolute',
        top: props.badge.position === 'top' ? 'bottom-full' : 'top-full',
        left: 'left-full',
        transform:
          props.badge.position === 'top'
            ? '-translate-x-1/2 translate-y-1/2'
            : '-translate-x-1/2 -translate-y-1/2',
        margin: props.roundedFull
          ? props.badge.position === 'top'
            ? props.size === 'lg'
              ? '-ml-2 -mb-2'
              : props.size === 'md'
              ? '-ml-1.5 -mb-1.5'
              : props.size === 'sm'
              ? '-ml-1 -mb-1'
              : props.size === 'xs'
              ? '-ml-0.5 -mb-0.5'
              : '-ml-0.5 -mb-0.5'
            : props.size === 'lg'
            ? '-ml-2 -mt-2'
            : props.size === 'md'
            ? '-ml-1.5 -mt-1.5'
            : props.size === 'sm'
            ? '-ml-1 -mt-1'
            : props.size === 'xs'
            ? '-ml-0.5 -mt-0.5'
            : '-ml-0.5 -mt-0.5'
          : '',
      }
      return generateClasses([{ ...classes }])
    })
    return { computedClasses, iconClasses, imgClasses, badgeClasses }
  },
}
</script>
