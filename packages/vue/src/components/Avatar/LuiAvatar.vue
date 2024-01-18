<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import type { PropType } from 'vue'

import { useGlobalColorClasses } from '../../composables'
import type {
  BordersInterface,
  FlexGridInterface,
  LayoutInterface,
  SizingInterface,
  TwClassInterface,
} from '../../globals/interfaces'
import type { Border, Color, Filter, NarrowedVariant, Rounded, Size, Text } from '../../globals/types'

const props = defineProps({
  variant: {
    type: String as PropType<NarrowedVariant>,
    default: 'solid',
  },
  color: {
    type: String as PropType<Color>,
    default: 'primary',
  },
  filter: {
    type: String as PropType<Filter>,
    default: 'none',
  },
  size: {
    type: String as PropType<Size>,
    default: 'md',
  },
  border: {
    type: Boolean as PropType<Border>,
    default: false,
  },
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
  text: {
    type: String as PropType<Text>,
    default: '',
  },
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
})

const { backgroundColorClasses, textColorClasses, borderColorClasses } = useGlobalColorClasses(
  toRefs(props),
)

const computedImageClasses = computed(() => {
  const containerClasses: LayoutInterface | SizingInterface | BordersInterface = {
    borderWidth: 'border',
    borderStyle: 'border-solid',
    display: 'block',
    width: 'w-full',
    height: 'h-full',
    objectFit: 'object-contain',
    borderRadius: {
      'rounded-lg': props.rounded === true,
      'rounded-full': props.rounded === 'full',
    },
    borderColor: borderColorClasses.value,
  }
  return Object.values(containerClasses)
})

const computedIconClasses = computed(() => {
  const iconClasses: LayoutInterface | FlexGridInterface = {
    display: 'flex',
    justifyContent: 'justify-center',
    alignItems: 'items-center',
  }
  return Object.values(iconClasses)
})

const computedAvatarClasses = computed(() => {
  const avatarClasses: TwClassInterface = {
    display: 'flex',
    borderRadius: {
      'rounded-lg': props.rounded === true,
      'rounded-full': props.rounded === 'full',
    },
    borderWidth: 'border',
    borderStyle: 'border-solid',
    justifyContent: 'justify-center',
    alignItems: 'items-center',
    // padding:
    //   props.text.length > 0 || !!slots.icon
    //     ? {
    //         "px-0.5": props.size === "xs",
    //         "px-1": props.size === "sm",
    //         "px-1.5": props.size === "md",
    //         "px-2": props.size === "lg",
    //         "px-2.5": props.size === "xl",
    //       }
    //     : null,
    // 10 - 12 - 16
    width: {
      'w-6': props.size === 'xs',
      'w-8': props.size === 'sm',
      'w-10': props.size === 'md',
      'w-12': props.size === 'lg',
      'w-16': props.size === 'xl',
    },

    height: {
      'h-6': props.size === 'xs',
      'h-8': props.size === 'sm',
      'h-10': props.size === 'md',
      'h-12': props.size === 'lg',
      'h-16': props.size === 'xl',
    },
    fontSize: {
      'text-sm': props.size === 'xs' || props.size === 'sm',
      'text-xl': props.size === 'md',
      'text-3xl': props.size === 'lg' || props.size === 'xl',
    },
    backgroundColor: props.src.length === 0 ? backgroundColorClasses.value : null,
    textColor: textColorClasses.value,
    borderColor: props.src.length === 0 ? borderColorClasses.value : 'border-transparent',
  }
  return Object.values(avatarClasses)
})
// TODO: check avatarContent
const avatarContent = ref<HTMLElement | null>(null)
</script>

<script lang="ts">
export default {
  name: 'LuiAvatar',
}
</script>

<template>
  <div class="lui-avatar" :class="computedAvatarClasses">
    <img v-if="src.length > 0" :src="src" :alt="alt" :class="computedImageClasses">
    <span v-if="$slots.icon" :class="computedIconClasses"><slot name="icon" /></span>
    <span v-if="text.length > 0" ref="avatarContent">{{ text }}</span>
  </div>
</template>
