<script setup lang="ts">
import type {
  Filter,
  Color,
  Size,
  Border,
  Text,
  NarrowedVariant,
  Rounded,
} from "@/globals/types";

import {
  TwClassInterface,
  LayoutInterface,
  FlexGridInterface,
  SizingInterface,
  BordersInterface,
} from "@/globals/interfaces";

import { PropType, computed, toRefs } from "vue";

import { useGlobalColorClasses } from "../../composables";

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
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false,
  },
  text: {
    type: String as PropType<Text>,
    default: "",
  },
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
});

const { backgroundColorClasses, textColorClasses, borderColorClasses } =
  useGlobalColorClasses(toRefs(props));

const computedImageClasses = computed(() => {
  const containerClasses: LayoutInterface | SizingInterface | BordersInterface =
    {
      display: "block",
      width: "w-full",
      height: "h-full",
      objectFit: "object-cover",
      borderRadius: {
        "rounded-lg": props.rounded === true,
        "rounded-full": props.rounded === "full",
      },
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

const computedAvatarClasses = computed(() => {
  const avatarClasses: TwClassInterface = {
    display: "flex",
    borderRadius: {
      "rounded-lg": props.rounded === true,
      "rounded-full": props.rounded === "full",
    },
    borderWidth: "border",
    borderStyle: "border-solid",
    justifyContent: "justify-center",
    alignItems: "items-center",
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
    width: {
      "w-6": props.size === "xs",
      "w-8": props.size === "sm",
      "w-12": props.size === "md",
      "w-16": props.size === "lg",
      "w-20": props.size === "xl",
    },

    height: {
      "h-6": props.size === "xs",
      "h-8": props.size === "sm",
      "h-12": props.size === "md",
      "h-16": props.size === "lg",
      "h-20": props.size === "xl",
    },
    fontSize: {
      "text-sm": props.size === "xs" || props.size === "sm",
      "text-xl": props.size === "md",
      "text-3xl": props.size === "lg" || props.size === "xl",
    },
    backgroundColor:
      props.src.length === 0 ? backgroundColorClasses.backgroundColor : null,
    textColor: textColorClasses.textColor,
    borderColor:
      props.src.length === 0
        ? borderColorClasses.borderColor
        : "border-transparent",
  };
  return Object.values(avatarClasses);
});
</script>
<template>
  <div class="lui-avatar" :class="computedAvatarClasses">
    <img
      :src="src"
      :alt="alt"
      :class="computedImageClasses"
      v-if="src.length > 0"
    />
    <span :class="computedIconClasses" v-if="$slots.icon"
      ><slot name="icon"></slot
    ></span>
    <span v-if="text.length > 0" ref="avatarContent">{{ text }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "LuiAvatar",
};
</script>
