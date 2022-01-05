<template>
  <a
    v-if="tag === 'a'"
    v-bind="$attrs"
    :href="to"
    target="_blank"
    :class="[computedClasses.classes, computedClasses.inactiveClass]"
  >
    <slot />
  </a>
  <router-link
    v-else-if="tag === 'vue'"
    v-bind="routerLinkProps"
    custom
    v-slot="{ isActive, href, navigate, isExactActive }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="[
        computedClasses.classes,
        isActive
          ? computedClasses.activeClass
          : computedClasses.inactiveClass,
        isExactActive
          ? computedClasses.exactactiveClass
          : computedClasses.inactiveClass,
      ]"
    >
      <slot />
    </a>
  </router-link>
  <nuxt-link v-else :to="to" active-variant="primary" />
</template>

<script>
import * as prop from "../../mixins/props";
import { computed } from "vue";
import { generateClasses } from "../../mixins/methods";
import { RouterLink } from "vue-router";
export default {
  inheritAttrs: false,
  props: {
    to: {
      type: [String, Object],
      default: "https://",
    },
  },
  mixins: [
    prop.size("sm", ["xxsm", "xsm", "sm", "lg", "xlg"]),
    prop.variant("variant", "secondary"),
    prop.variant("activeVariant", "success"),
    prop.variant("exactActiveVariant", "success"),
    prop.string("tag", "a", ["a", "vue", "nuxt"]),
    // router-link props
    // prop.string("activeClass", ""),
    // prop.string("exactactiveClass", ""),
    // prop.string("to", "http:"),
    prop.string("ariaCurrentValue", "page"),
    // prop.boolean("custom", false),
    prop.boolean("replace", false),
  ],
  setup(props) {
    console.log({ RouterLink });
    // set router-link props with comp prop
    // set active inactive classes with comp prop
    // prefec

    function findSize(sizes) {
      return sizes[props.size];
    }

    const routerLinkProps = computed(() => {
      return {
        to: props.to,
        replace: props.replace,
        ariaCurrentValue: props.ariaCurrentValue,
        activeClass: props.activeClass,
        exacActiveClass: props.exacActiveClass,
      };
    });

    const computedClasses = computed(() => {
      const classes = {
        fontSize: findSize({
          xxsm: "text-2xs",
          xsm: "text-xs",
          sm: "text-sm",
          lg: "text-base",
          xlg: "text-xl",
        }),
        lineHeight: findSize({
          xxsm: "leading-3",
          xsm: "leading-4.5",
          sm: "leading-5",
          lg: "leading-6",
          xlg: "leading-7",
        }),
        underline: "underline",
      };
      const activeClass = {
        fontColor: `text-${props.activeVariant}-400 hover:text-${props.activeVariant}-500`,
      };
      const exactactiveClass = {
        fontColor: `text-${props.exactactiveClass}-400 hover:text-${props.exactactiveClass}-500`,
      };
      const inactiveClass = {
        fontColor: `text-${props.variant}-400 hover:text-${props.variant}-500`,
      };
      return {
        classes: generateClasses([{ ...classes }]),
        activeClass: generateClasses([{ ...activeClass }]),
        inactiveClass: generateClasses([{ ...inactiveClass }]),
        exactactiveClass: generateClasses([{ ...exactactiveClass }]),
      };
    });

    return {
      computedClasses,
      routerLinkProps,
    };
  },
};
</script>
