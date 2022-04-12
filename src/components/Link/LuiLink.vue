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
  <component
    :is="componentName"
    v-else
    v-bind="tag === 'vue' ? routerLinkProps : nuxtLinkProps"
    custom
    v-slot="{ isActive, href, navigate, isExactActive, prefetchedClass }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="[
        computedClasses.classes,
        isActive ? computedClasses.activeClass : computedClasses.inactiveClass,
        isExactActive
          ? computedClasses.exactactiveClass
          : computedClasses.inactiveClass,
        prefetchedClass
          ? computedClasses.prefetchedClass
          : computedClasses.inactiveClass,
      ]"
    >
      <slot />
    </a>
  </component>
</template>

<script>
import * as prop from "../../mixins/props";
import { computed } from "vue";
import { generateClasses } from "../../mixins/methods";
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
    prop.string("tag", "a", ["a", "vue", "nuxt"]),
    prop.variant("variant", "secondary"),
    prop.variant("activeVariant", "success"),
    prop.variant("exactActiveVariant", "success"),
    prop.variant("prefetchedVariant", "success"),
    prop.boolean("prefetch", false),
    prop.boolean("noPrefetch", false),
    prop.string("ariaCurrentValue", "page"),
    prop.boolean("replace", false),
  ],
  setup(props) {
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

    const nuxtLinkProps = computed(() => {
      return {
        to: props.to,
        replace: props.replace,
        ariaCurrentValue: props.ariaCurrentValue,
        activeClass: props.activeClass,
        exacActiveClass: props.exacActiveClass,
        prefetchedClass: props.prefetchedClass,
        prefetch: props.prefetch,
        noPrefetch: props.noPrefetch,
      };
    });

    const componentName = computed(() => {
      return props.tag === "vue"
        ? "router-link"
        : props.tag === "nuxt"
        ? "nuxt-link"
        : "a";
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
      const inactiveClass = {
        fontColor: `text-${props.variant}-400 hover:text-${props.variant}-500`,
      };
      const activeClass = {
        fontColor: `text-${props.activeVariant}-400 hover:text-${props.activeVariant}-500`,
      };
      const exactactiveClass = {
        fontColor: `text-${props.exactactiveClass}-400 hover:text-${props.exactactiveClass}-500`,
      };
      const prefetchedClass = {
        fontColor: `text-${props.prefetchedVariant}-400 hover:text-${props.prefetchedVariant}-500`,
      };

      return {
        classes: generateClasses([{ ...classes }]),
        activeClass: generateClasses([{ ...activeClass }]),
        inactiveClass: generateClasses([{ ...inactiveClass }]),
        exactactiveClass: generateClasses([{ ...exactactiveClass }]),
        prefetchedClass: generateClasses([{ ...prefetchedClass }]),
      };
    });

    return {
      computedClasses,
      routerLinkProps,
      nuxtLinkProps,
      componentName,
    };
  },
};
</script>
