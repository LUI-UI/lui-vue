<template>
  <div class="lui-card" :class="computedClasses">
    <img v-if="img !== 'none'" :src="img" :alt="imgAlt" :class="imgClasses" />
    <div
      v-if="$slots.default"
      class="lui-card--body"
      :class="bodyPadding ? 'p-6' : 'p-0'"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { generateClasses, generateColorVariant } from "../../mixins/methods";
import * as prop from "../../mixins/props";
export default {
  mixins: [
    prop.string("img", "none"),
    prop.string("imgAlt", "imgAlt"),
    prop.boolean("border"),
    prop.boolean("rounded"),
    prop.boolean("bodyPadding", true),
    prop.filter("borderFilter"),
    prop.filter("bgFilter"),
    prop.filter("textFilter"),
    prop.variant("bgVariant", "light"),
    prop.variant("textVariant", "dark"),
    prop.variant("borderVariant", "secondary"),
  ],
  setup(props) {
    const computedClasses = computed(() => {
      const classes = {
        backgroundColor: generateColorVariant(
          props.bgVariant,
          props.bgFilter,
          "bg"
        ).colorClasses,
        backgroundClip: "bg-clip-border",
        border: props.border ? "border" : "",
        borderStyle: props.border ? "border-solid" : "",
        borderColor: generateColorVariant(
          props.borderVariant,
          props.borderFilter,
          "border"
        ).colorClasses,
        color: generateColorVariant(props.textVariant, props.textFilter, "text")
          .colorClasses,
        borderRadius: props.rounded ? "rounded-md" : "",
        flexDirection: "flex-col",
        display: "flex",
        minWidth: "min-w-0",
        position: "relative",
        wordBreak: "break-words",
        // overflow: "overflow-hidden",
      };
      return generateClasses([{ ...classes }]);
    });
    const imgClasses = computed(() => {
      const classes = {
        width: "w-full",
        height: "h-full",
      };
      return generateClasses([{ ...classes }]);
    });
    return {
      computedClasses,
      imgClasses,
    };
  },
};
</script>

<style></style>
