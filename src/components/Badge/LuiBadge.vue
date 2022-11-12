<script setup lang="ts">
import type { Filter, Color, Size, Border } from "@/global-types";
import type { PropType } from "vue";
import { TwClassInterface } from "../../global-interfaces";
import { computed, toRefs } from "vue";
import classNames from "classnames";
import { useGlobalColorClasses } from "../../composables";
// @ ile import'da Storybook hata veriyor
const props = defineProps({
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
  }, // Ne yapılacak karar verelim
});
const { backgroundColorClasses } = useGlobalColorClasses(toRefs(props));

const computedBadgeClasses = computed(() => {
  const badgeClasses: TwClassInterface = {
    display: "inline-block",
    borderRadius: "rounded-full",
    width: classNames({
      "w-2": props.size === "sm",
      "w-3": props.size === "md",
      "w-4": props.size === "lg",
    }),
    height: classNames({
      "h-2": props.size === "sm",
      "h-3": props.size === "md",
      "h-4": props.size === "lg",
    }),
    backgroundColor: backgroundColorClasses.backgroundColor,
  };
  return Object.values(badgeClasses);
});
</script>
<template>
  <span class="lui-badge" :class="computedBadgeClasses" />
</template>

<script lang="ts">
export default {
  name: "LuiBadge",
};
</script>
