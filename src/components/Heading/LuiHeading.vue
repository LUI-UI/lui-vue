<template>
  <component :is="setLevel" :class="computedClasses">
    <slot />
  </component>
</template>

<script>
import { computed } from "vue";
import * as prop from "../../mixins/props";
import { generateClasses } from "../../mixins/methods";
export default {
  mixins: [
    prop.size("default", ["2xs", "xs", "sm", "md", "lg", "xl", "default"]),
    prop.string("level", "2", ["1", "2", "3", "4", "5", "6"]),
    prop.boolean("display"),
  ],
  setup(props) {

    function findFontSize(size, isDisplay) {
      const display = isDisplay ? "display" : "normal";
      const sizes = {
        6: {
          normal: "text-sm",
          display: "text-4xl",
        },
        5: {
          normal: "text-base",
          display: "text-5xl",
        },
        4: {
          normal: "text-lg",
          display: "text-6xl",
        },
        3: {
          normal: "text-xl",
          display: "text-7xl",
        },
        2: {
          normal: "text-2xl",
          display: "text-8xl",
        },
        1: {
          normal: "text-3xl",
          display: "text-9xl",
        },
        "2xs": {
          normal: "text-sm",
          display: "text-4xl",
        },
        xs: {
          normal: "text-base",
          display: "text-5xl",
        },
        sm: {
          normal: "text-lg",
          display: "text-6xl",
        },
        md: {
          normal: "text-xl",
          display: "text-7xl",
        },
        lg: {
          normal: "text-2xl",
          display: "text-8xl",
        },
        xl: {
          normal: "text-3xl",
          display: "text-9xl",
        },
      };
      return sizes[size][display];
    }

    function findLineHeight(size) {
      const sizes = {
        6: "leading-4.5",
        5: "leading-5",
        4: "leading-6",
        3: "leading-6",
        2: "leading-8",
        1: "leading-9",
        "2xs": "leading-4.5",
        xs: "leading-5",
        sm: "leading-6",
        md: "leading-6",
        lg: "leading-8",
        xl: "leading-9",
      };
      return sizes[size];
    }

    const setLevel = computed(() => {
      return `h${props.level}`;
    });
    const computedClasses = computed(() => {
      const classes = {
        fontSize:
          props.size === "default"
            ? findFontSize(props.level, props.display)
            : findFontSize(props.size, props.display),
        lineHeight: props.display
          ? ""
          : props.size === "default"
          ? findLineHeight(props.level)
          : findLineHeight(props.size),
      };
      return generateClasses([{ ...classes }]);
    });
    return { setLevel, computedClasses };
  },
};
</script>
