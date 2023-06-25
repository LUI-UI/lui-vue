<!-- <script setup lang="ts">
import type {
  Filter,
  Color,
  Size,
  Border,
  Text,
  NarrowedVariant,
} from "@/globals/types";
import { ref, computed, toRefs, useSlots } from "vue";
import type { PropType } from "vue";
import type {
  TwClassInterface,
  LayoutInterface,
  FlexGridInterface,
} from "@/globals/interfaces";
import { useGlobalColorClasses } from "../../composables";
type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const slots = useSlots();
const props = defineProps({
  variant: {
    type: String as PropType<NarrowedVariant>,
    default: "solid",
  },
  color: {
    type: String as PropType<Color>,
    default: "primary",
  },
  filter: {
    type: String as PropType<Filter>,
    default: "none",
  },
  size: {
    type: String as PropType<Size>,
    default: "md",
  },
  border: {
    type: Boolean as PropType<Border>,
    default: false,
  },
  text: {
    type: String as PropType<Text>,
    default: "",
  },
  position: {
    type: String as PropType<Position>,
    default: "bottom-right",
  },
});
const { backgroundColorClasses, textColorClasses, borderColorClasses } =
  useGlobalColorClasses(toRefs(props));
const badgeWrapper = ref<HTMLDivElement>();
const badgeContent = ref<HTMLSpanElement>();

// const overflow = ref(false);
const overflow = computed(() => props.text.length > 2);

// watchEffect(() => {
//   const wrapperWidh = badgeWrapper.value?.scrollWidth;
//   const contentWidth = badgeContent.value?.scrollWidth;
//   if (wrapperWidh && contentWidth) {
//     if (contentWidth > wrapperWidh) {
//       overflow.value = true;
//     } else {
//       overflow.value = false;
//     }
//   }
// });
const computedContainerClasses = computed(() => {
  const containerClasses: LayoutInterface = {
    position: "relative",
    display: "inline-block",
  };
  return Object.values(containerClasses);
});
const computedIconClasses = computed(() => {
  const iconClasses: LayoutInterface | FlexGridInterface = {
    display: "flex",
    justifyContent: "justify-center",
    alignItems: "items-center",
  };
  return Object.values(iconClasses);
});
const computedBadgeClasses = computed(() => {
  const badgeClasses: TwClassInterface = {
    display: overflow.value ? "inline-block" : "flex",
    position: { absolute: !!slots.default },
    top: slots.default
      ? {
          "top-0":
            props.position === "top-left" || props.position === "top-right",
        }
      : null,
    bottom: slots.default
      ? {
          "bottom-0":
            props.position === "bottom-left" ||
            props.position === "bottom-right",
        }
      : null,
    left: slots.default
      ? {
          "left-0":
            props.position === "bottom-left" || props.position === "top-left",
        }
      : null,
    right: slots.default
      ? {
          "right-0":
            props.position === "bottom-right" || props.position === "top-right",
        }
      : null,
    translate: slots.default
      ? {
          "-translate-y-1/2 -translate-x-1/2": props.position === "top-left",
          "-translate-y-1/2 translate-x-1/2": props.position === "top-right",
          "translate-y-1/2 -translate-x-1/2": props.position === "bottom-left",
          "translate-y-1/2 translate-x-1/2": props.position === "bottom-right",
        }
      : null,
    borderRadius: "rounded-full",
    borderWidth: "border",
    borderStyle: "border-solid",
    justifyContent: { ["justify-center"]: !overflow.value },
    alignItems: { ["items-center"]: !overflow.value },
    padding:
      props.text.length > 0 || !!slots.icon
        ? {
            "px-0.5": props.size === "xs",
            "px-1": props.size === "sm",
            "px-1.5": props.size === "md",
            "px-2": props.size === "lg",
            "px-2.5": props.size === "xl",
          }
        : null,
    width:
      props.text.length > 0 || !!slots.icon
        ? !overflow.value
          ? {
              "w-3": props.size === "xs",
              "w-4": props.size === "sm",
              "w-5": props.size === "md",
              "w-6": props.size === "lg",
              "w-7": props.size === "xl",
            }
          : null
        : {
            "w-1.5": props.size === "xs",
            "w-2": props.size === "sm",
            "w-2.5": props.size === "md",
            "w-3": props.size === "lg",
            "w-3.5": props.size === "xl",
          },

    height:
      props.text.length > 0 || !!slots.icon
        ? !overflow.value
          ? {
              "h-3": props.size === "xs",
              "h-4": props.size === "sm",
              "h-5": props.size === "md",
              "h-6": props.size === "lg",
              "h-7": props.size === "xl",
            }
          : null
        : {
            "h-1.5": props.size === "xs",
            "h-2": props.size === "sm",
            "h-2.5": props.size === "md",
            "h-3": props.size === "lg",
            "h-3.5": props.size === "xl",
          },
    fontSize: {
      "text-xs": props.size === "xs" || props.size === "sm",
      "text-sm": props.size === "md",
      "text-base": props.size === "lg" || props.size === "xl",
    },
    backgroundColor: backgroundColorClasses.value,
    textColor: textColorClasses.value,
    borderColor: borderColorClasses.value,
  };
  return Object.values(badgeClasses);
});
</script> -->
<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useGlobalColorClasses } from '../../composables'
import type { Border, Color, Filter, NarrowedVariant, Size, Text } from '@/globals/types'
import type { FlexGridInterface, LayoutInterface, TwClassInterface } from '@/globals/interfaces'

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export default defineComponent({
  name: 'LuiBadge',
  props: {
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
    text: {
      type: String as PropType<Text>,
      default: '',
    },
    position: {
      type: String as PropType<Position>,
      default: 'bottom-right',
    },
  },
  setup(props, { slots }) {
    const { backgroundColorClasses, textColorClasses, borderColorClasses } = useGlobalColorClasses(
      toRefs(props),
    )
    const badgeWrapper = ref<HTMLDivElement>()
    const badgeContent = ref<HTMLSpanElement>()

    // const overflow = ref(false);
    const overflow = computed(() => props.text.length > 2)

    // watchEffect(() => {
    //   const wrapperWidh = badgeWrapper.value?.scrollWidth;
    //   const contentWidth = badgeContent.value?.scrollWidth;
    //   if (wrapperWidh && contentWidth) {
    //     if (contentWidth > wrapperWidh) {
    //       overflow.value = true;
    //     } else {
    //       overflow.value = false;
    //     }
    //   }
    // });
    const computedContainerClasses = computed(() => {
      const containerClasses: LayoutInterface = {
        position: 'relative',
        display: 'inline-block',
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
    const computedBadgeClasses = computed(() => {
      const badgeClasses: TwClassInterface = {
        display: overflow.value ? 'inline-block' : 'flex',
        position: { absolute: !!slots.default },
        top: slots.default
          ? {
              'top-0': props.position === 'top-left' || props.position === 'top-right',
            }
          : null,
        bottom: slots.default
          ? {
              'bottom-0': props.position === 'bottom-left' || props.position === 'bottom-right',
            }
          : null,
        left: slots.default
          ? {
              'left-0': props.position === 'bottom-left' || props.position === 'top-left',
            }
          : null,
        right: slots.default
          ? {
              'right-0': props.position === 'bottom-right' || props.position === 'top-right',
            }
          : null,
        translate: slots.default
          ? {
              '-translate-y-1/2 -translate-x-1/2': props.position === 'top-left',
              '-translate-y-1/2 translate-x-1/2': props.position === 'top-right',
              'translate-y-1/2 -translate-x-1/2': props.position === 'bottom-left',
              'translate-y-1/2 translate-x-1/2': props.position === 'bottom-right',
            }
          : null,
        borderRadius: 'rounded-full',
        borderWidth: 'border',
        borderStyle: 'border-solid',
        justifyContent: { 'justify-center': !overflow.value },
        alignItems: { 'items-center': !overflow.value },
        padding:
          props.text.length > 0 || !!slots.icon
            ? {
                'px-0.5': props.size === 'xs',
                'px-1': props.size === 'sm',
                'px-1.5': props.size === 'md',
                'px-2': props.size === 'lg',
                'px-2.5': props.size === 'xl',
              }
            : null,
        width:
          props.text.length > 0 || !!slots.icon
            ? !overflow.value
                ? {
                    'w-3': props.size === 'xs',
                    'w-4': props.size === 'sm',
                    'w-5': props.size === 'md',
                    'w-6': props.size === 'lg',
                    'w-7': props.size === 'xl',
                  }
                : null
            : {
                'w-1.5': props.size === 'xs',
                'w-2': props.size === 'sm',
                'w-2.5': props.size === 'md',
                'w-3': props.size === 'lg',
                'w-3.5': props.size === 'xl',
              },

        height:
          props.text.length > 0 || !!slots.icon
            ? !overflow.value
                ? {
                    'h-3': props.size === 'xs',
                    'h-4': props.size === 'sm',
                    'h-5': props.size === 'md',
                    'h-6': props.size === 'lg',
                    'h-7': props.size === 'xl',
                  }
                : null
            : {
                'h-1.5': props.size === 'xs',
                'h-2': props.size === 'sm',
                'h-2.5': props.size === 'md',
                'h-3': props.size === 'lg',
                'h-3.5': props.size === 'xl',
              },
        fontSize: {
          'text-xs': props.size === 'xs' || props.size === 'sm',
          'text-sm': props.size === 'md',
          'text-base': props.size === 'lg' || props.size === 'xl',
        },
        backgroundColor: backgroundColorClasses.value,
        textColor: textColorClasses.value,
        borderColor: borderColorClasses.value,
      }
      return Object.values(badgeClasses)
    })
    return {
      computedBadgeClasses,
      computedIconClasses,
      computedContainerClasses,
      badgeWrapper,
      badgeContent,
      backgroundColorClasses,
      textColorClasses,
      borderColorClasses,
    }
  },
})
</script>

<template>
  <div class="lui-badge" :class="computedContainerClasses">
    <slot />
    <div ref="badgeWrapper" :class="computedBadgeClasses">
      <span v-if="$slots.icon" :class="computedIconClasses"><slot name="icon" /></span>
      <span v-if="text.length > 0" ref="badgeContent">{{ text }}</span>
    </div>
  </div>
</template>
