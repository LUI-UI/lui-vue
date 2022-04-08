<template>
  <div :class="computedClasses.parent">
    <input
      type="checkbox"
      :class="computedClasses.input"
      v-bind="$attrs"
      @change="$emit('onChange', $event.target.checked)"
    />
    <span :for="computedFor" :class="computedClasses.label">
      <svg
        :width="iconSizes.width"
        :height="iconSizes.height"
        :viewBox="
          size === 'sm' ? '0 0 8 6' : size === 'md' ? '0 0 12 10' : '0 0 14 12'
        "
        fill="none"
        :class="computedClasses.icon"
      >
        <path
          :d="
            size === 'sm'
              ? 'M1 3.4L2.71429 5L7 1'
              : size === 'md'
              ? 'M2 5.6L4.28571 8L10 2'
              : 'M2 6.8L4.85714 10L12 2'
          "
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </div>
</template>
<script>
import { computed } from "vue";
import { generateClasses } from "../../mixins/methods";
import * as prop from "../../mixins/props";
export default {
  mixins: [prop.size("sm", ["sm", "md", "lg"])],
  inheritAttrs: false,
  props: {
    state: {
      type: [String, Boolean, null],
      default: null,
      validator(value) {
        return [null, "warning", true, false].includes(value);
      },
    },
  },
  setup(props, { attrs }) {
    function findSize(sizes) {
      return sizes[props.size];
    }

    const computedFor = computed(() => {
      return attrs.id;
    });

    const iconSizes = computed(() => {
      const sizes = {
        width: findSize({ sm: "8px", md: "12px", lg: "14px" }),
        height: findSize({ sm: "6px", md: "10px", lg: "12px" }),
      };
      return { width: sizes.width, height: sizes.height };
    });

    const computedClasses = computed(() => {
      const classes = {
        parent: {
          display: "flex items-center",
        },
        input: {
          position: "absolute",
          overflow: "overflow-hidden",
          outline: "outline-none",
          width:
            props.size === "sm" ? "w-4" : props.size === "md" ? "w-5" : "w-6",
          height:
            props.size === "sm" ? "h-4" : props.size === "md" ? "h-5" : "h-6",
          zIndex: "z-20",
          border: "border-0",
          // visibilty: 'invisible',
          // want to hide input without display-none
          opacity: "opacity-0",
          // visibilty: 'invisible',
          // peer for tailwind: to catch checked from siblings.
          peer: "peer",
        },
        label: {
          position: "relative",
          display: "inline-flex",
          alignItems: "items-center",
          justifyContent: "justify-center",
          fontSize: findSize({ sm: "text-xs", md: "text-sm", lg: "text-base" }),
          color: "text-secondary-600",
          cursor: "cursor-pointer",
          border: "border",
          width: findSize({
            sm: "w-4",
            md: "w-5",
            lg: "w-6",
          }),
          height: findSize({
            sm: "h-4",
            md: "h-5",
            lg: "h-6",
          }),
          ringWidth: "peer-focus:ring-2",
          ringOffset: "peer-focus:ring-offset-2",
          ringColor:
            props.state === null
              ? "peer-focus:ring-primary"
              : props.state === "warning"
              ? "peer-focus:ring-warning"
              : props.state === false
              ? "peer-focus:ring-danger"
              : "peer-focus:ring-success",
          borderColorDisabled: "peer-disabled:border-secondary-300",
          borderColorChecked: "peer-checked:border-white",
          borderColor:
            props.state === null
              ? "border-primary"
              : props.state === "warning"
              ? "border-warning"
              : props.state === false
              ? "border-danger"
              : "border-success",
          borderRadius: findSize({
            sm: "rounded-xs",
            md: "rounded-xs",
            lg: "rounded-sm",
          }),
          backgroundColorDisabled: "peer-disabled:bg-secondary-100",
          backgroundColorChecked:
            props.state === null
              ? "peer-checked:bg-primary"
              : props.state === "warning"
              ? "peer-checked:bg-warning"
              : props.state === false
              ? "peer-checked:bg-danger"
              : "peer-checked:bg-success",
          backgroundColor: `bg-white`,
        },
        icon: {
          // display: 'opacity-0 peer-checked:opacity-100',
          position: "relative",
          left: "left-0",
          top: "top-0",
          // left: props.size === 'sm' ? 'left-5' : props.size === 'md' ? 'left-5' : 'left-4.5',
          zIndex: "z-10",
          color: "text-white peer-disabled:text-secondary-300",
        },
      };
      return {
        parent: generateClasses([{ ...classes.parent }]),
        input: generateClasses([{ ...classes.input }]),
        label: generateClasses([{ ...classes.label }]),
        icon: generateClasses([{ ...classes.icon }]),
      };
    });

    return { computedClasses, computedFor, iconSizes };
  },
};
</script>
