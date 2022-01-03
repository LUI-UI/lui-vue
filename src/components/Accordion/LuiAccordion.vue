<template>
  <div :class="computedClasses.wrapper">
    <h3>
      <button
        :aria-expanded="isActive"
        :disabled="disabled"
        :class="computedClasses.button"
        @click="expandItem"
        @focus="btnFocus = true"
        @focusout="btnFocus = false"
      >
        <span :class="computedClasses.title">{{ title }}</span>
        <lui-icon
          :name="isActive ? 'close' : 'add'"
          line
          :class="computedClasses.icon"
        />
      </button>
    </h3>
    <div
      v-if="isActive"
      :class="computedClasses.content"
      role="region"
      tabindex="0"
    >
      <slot />
    </div>
  </div>
</template>
<script>
import { computed, ref, inject } from 'vue'
import { generateClasses } from '../../mixins/methods'
import LuiIcon from '../Icon/LuiIcon.vue'
import * as prop from '../../mixins/props'
export default {
  components: { LuiIcon },
  mixins: [prop.string('title', 'title'), prop.boolean('active'),prop.boolean('disabled')],
  setup(props) {
    let activeAccordion = inject('activeAccordion', ref(null))

    let isActive = computed(() => {
      return activeAccordion.value === props.title
    })

    function expandItem() {
      if (activeAccordion.value !== props.title) {
        activeAccordion.value = props.title
      } else {
        activeAccordion.value = ''
      }
    }
    let btnFocus = ref(false)
    
    const computedClasses = computed(() => {
      const classes = {
        wrapper: {
          width: 'w-full',
          border: 'border',
          borderColor: props.disabled ? 'border-secondary-100' : 'border-secondary-200',
          borderRadius: 'rounded-2xl',
          paddingY: 'py-8',
          paddingX: 'px-6',
          margin: 'mb-7',
          focus: btnFocus.value ? 'ring-2 ring-primary ring-offset-2' : ''
        },
        button: {
          width: 'w-full',
          display: 'flex',
          alignItems: 'items-center',
          justifyContent: 'justify-between',
          disabled: 'text-secondary-700 disabled:text-secondary-300',
          outline: 'outline-none'
        },
        title: {
          fontSize: 'text-lg',
          fontWeight: 'font-semibold',
          lineHeight: 'leading-6',
        },
        icon: {
          fontSize: 'text-2xl',
        },
        content: {
          marginTop: 'mt-6',
          fontColor: 'text-secondary-600'
        },
      }
      const { wrapper, button, title, icon, content } = classes
      return {
        wrapper: generateClasses([{ ...wrapper }]),
        button: generateClasses([{ ...button }]),
        title: generateClasses([{ ...title }]),
        icon: generateClasses([{ ...icon }]),
        content: generateClasses([{ ...content }]),
      }
    })

    return {
      expandItem,
      isActive,
      computedClasses,
      btnFocus
    }
  },
}
</script>
