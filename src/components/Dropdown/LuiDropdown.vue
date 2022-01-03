<template>
  <div
    role="listbox"
    class="dropdown"
    :class="computedClasses.container"
  >
    <lui-button
      type="outline"
      :variant="variant"
      :size="size"
      :rounded="rounded"
      :aria-expanded="menuActive"
      :icon="icon === 'default' ? iconName.append : icon"
      :prepend="icon === 'default' ? iconName.prepend : prepend"
      :block="block"
      :icon-line="iconLine"
      :uppercase="uppercase"
      :filter="filter"
      @click="menuActive = !menuActive"
      @blur="menuActive = false"
    >
      {{ text }}
    </lui-button>
    <ul
      v-show="menuActive"
      :class="computedClasses.content"
      class="dropdown-menu"
    >
      <slot />
    </ul>
  </div>
</template>
<script>
import LuiButton from '../Button/LuiButton.vue'
import { generateClasses } from '../../mixins/methods'
import * as prop from '../../mixins/props'
import { ref, computed, provide, watch } from 'vue'
export default {
  components: { LuiButton },
  mixins: [
    prop.variant(),
    prop.filter(),
    prop.boolean('rounded', true),
    prop.boolean('block', false),
    prop.boolean('uppercase'),
    prop.string('icon', 'default'),
    prop.string('prepend'),
    prop.boolean('iconLine', true),
    prop.string('placement', 'bottomLeft', [
      'bottomLeft',
      'bottomRight',
      'topLeft',
      'topRight',
      'rightTop',
      'rightBottom',
      'leftTop',
      'leftBottom',
    ]),
    prop.string('text', 'Dropdown'),
    prop.size('md', ['sm', 'md', 'lg']),
  ],
  emits: ['onChange'],
  setup(props, { emit }) {
    const parentProps = ref({
      variant: props.variant,
      filter: props.filter,
      rounded: props.rounded,
      block: props.block,
      size: props.size,
    })

    provide('parentProps', parentProps.value)

    const menuActive = ref(false)
    watch(menuActive, (val) => {
      emit('onChange', val)
    })

    const iconName = computed(() => {
      if (props.icon === 'default') {
        let names = { prepend: 'none', append: 'none' }
        if (props.placement.startsWith('bottom')) {
          if (menuActive.value) names.append = 'arrow-down-s'
          else names.append = 'arrow-up-s'
        }
        if (props.placement.startsWith('top')) {
          if (!menuActive.value) names.append = 'arrow-down-s'
          else names.append = 'arrow-up-s'
        }
        if (props.placement.startsWith('right')) {
          if (!menuActive.value) names.append = 'arrow-left-s'
          else names.append = 'arrow-right-s'
        }
        if (props.placement.startsWith('left')) {
          if (!menuActive.value) names.prepend = 'arrow-right-s'
          else names.prepend = 'arrow-left-s'
        }
        return names
      }

      return null
    })

    const computedClasses = computed(() => {
      const classes = {
        container: {
          position: 'relative',
          width: props.block ? 'w-full' : 'w-max',
          zIndex: 'z-10'
        },
        content: {
          position: 'absolute',
          top:
            props.placement.includes('bottom') || props.placement.includes('Bottom')
              ? 'top-full'
              : props.placement.includes('Top')
              ? 'top-0'
              : '',
          bottom: props.placement.startsWith('top') ? 'bottom-full' : '',
          left: props.placement.includes('Left')
            ? 'left-0'
            : props.placement.startsWith('right')
            ? 'left-full'
            : '',
          right: props.placement.includes('Right')
            ? 'right-0'
            : props.placement.startsWith('left')
            ? 'right-full'
            : '',
          backgroundColor: 'bg-white',
          borderRadius: props.rounded ? 'rounded-lg' : '',
          borderWidth: 'border',
          borderColor: 'border-secondary-200',
          // width: props.block ? 'w-full' : 'w-full',
          width: 'w-full',
          paddingBottom: 'pb-2',
          marginTop: props.placement.includes('bottom') ? 'mt-2' : '',
          marginBottom: props.placement.includes('top') ? 'mb-2' : '',
          marginLeft: props.placement.includes('right') ? 'ml-2' : '',
          marginRight: props.placement.includes('left') ? 'mr-2' : '',
          boxShadow: 'shadow-md',
        },
      }
      return {
        container: generateClasses([{ ...classes.container }]),
        content: generateClasses([{ ...classes.content }]),
      }
    })

    return { menuActive, computedClasses, iconName }
  },
}
</script>
