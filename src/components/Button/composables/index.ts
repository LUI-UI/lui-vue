import { computed, useSlots } from "vue";
//Types
import type { Ref } from "vue";
import type { ButtonTag } from "../button-types";
import type { TwClassInterface } from "@/globals/interfaces";
import type {
  Variant,
  Filter,
  Rounded,
  Block,
  Color,
  Size,
} from "@/globals/types";

//Define Prop Types
type PropTypes = {
  tag: Ref<ButtonTag>;
  variant: Ref<Variant>;
  color: Ref<Color>;
  filter: Ref<Filter>;
  size: Ref<Size>;
  rounded: Ref<Rounded>;
  block: Ref<Block>;
};

export function useButtonClasses(props: PropTypes) {
  const slots = useSlots();
  const hasIcon = computed(() => !!slots.icon);
  const hasAnyIcon = computed(
    () => !!slots.icon || !!slots.prepend || !!slots.append
  );

  const computedButtonClasses = computed(() => {
    const buttonClasses: TwClassInterface = {
      // lineHeight: "leading-normal",
      outlineStyle: "outline-none",
      ringWidth: "focus-visible:ring-4",
      transitionProperty: "transition-colors transition-transform",
      translate: "active:translate-y-0.5 disabled:translate-y-0",
      // pointerEvents : { 'pointer-events-none': props.loading }),
      cursor: {
        ["cursor-pointer disabled:cursor-not-allowed"]:
          props.tag.value === "button",
      },
      fontSize: {
        "text-xs": props.size.value === "xs",
        "text-sm": props.size.value === "sm",
        "text-base": props.size.value === "md",
        "text-lg": props.size.value === "lg",
        "text-xl": props.size.value === "xl",
      },
      backgroundColor:
        props.variant.value === "solid"
          ? {
              [`bg-${props.color.value}-500 hover:bg-${props.color.value}-400 disabled:bg-secondary-500`]:
                props.filter.value === "none", // filter none
              [`bg-${props.color.value}-100 hover:bg-${props.color.value}-50 disabled:bg-secondary-100`]:
                props.filter.value === "lighten", // filter lighten
              [`bg-${props.color.value}-800 hover:bg-${props.color.value}-700  disabled:bg-secondary-800`]:
                props.filter.value === "darken", // filter darken
            }
          : null,
      textColor:
        props.variant.value === "solid"
          ? {
              [`text-white disabled:text-secondary-300`]:
                props.filter.value === "none", // filter none
              [`text-${props.color.value}-500 disabled:text-secondary-300`]:
                props.filter.value === "lighten", // filter lighten
              [`text-${props.color.value}-100 disabled:text-secondary-300`]:
                props.filter.value === "darken", // filter darken
            }
          : {
              [`text-${props.color.value}-500 hover:text-${props.color.value}-400 disabled:text-secondary-500`]:
                props.filter.value === "none", // filter none
              [`text-${props.color.value}-100 hover:text-${props.color.value}-50 disabled:text-secondary-100`]:
                props.filter.value === "lighten", // filter lighten
              [`text-${props.color.value}-800 hover:text-${props.color.value}-700 disabled:text-secondary-800`]:
                props.filter.value === "darken", // filter darken
            },
      borderColor:
        props.variant.value === "text"
          ? "border-transparent"
          : props.variant.value === "solid" || props.variant.value === "outline"
          ? {
              [`border-${props.color.value}-500 hover:border-${props.color.value}-400 disabled:border-secondary-500`]:
                props.filter.value === "none", // filter none
              [`border-${props.color.value}-100 hover:border-${props.color.value}-50 disabled:border-secondary-100`]:
                props.filter.value === "lighten", // filter lighten
              [`border-${props.color.value}-800 hover:border-${props.color.value}-700 disabled:border-secondary-800`]:
                props.filter.value === "darken", // filter darken
            }
          : null,
      borderWidth: { border: props.variant.value != "link" },
      borderStyle: {
        "border-solid": props.variant.value != "link",
      },
      width: {
        "w-full": props.block.value && props.variant.value !== "link",
      },
      ringColor: `focus-visible:ring-${props.color.value}-500/40`,
      // xs: 12-4 sm: 16-6 md: 20-8 lg: 24-10 xl: 28-14
      // 6 - 8 - 10 - 14 - 16
      padding:
        props.variant.value !== "link"
          ? hasIcon.value
            ? {
                "p-1.5": props.size.value === "xs",
                "p-2": props.size.value === "sm",
                "p-2.5": props.size.value === "md",
                "p-3.5": props.size.value === "lg",
                "p-4": props.size.value === "xl",
                // "p-3": props.size.value === "lg",
                // "p-2.5": props.size.value === "md",
                // "p-2": props.size.value === "sm",
              }
            : {
                "py-1 px-3": props.size.value === "xs",
                "py-1.5 px-4": props.size.value === "sm",
                "py-2 px-5": props.size.value === "md",
                "py-2.5 px-6": props.size.value === "lg",
                "py-3.5 px-7": props.size.value === "xl",
                // "px-6 py-3": props.size.value === "lg",
                // "px-5 py-2": props.size.value === "md",
                // "px-4 py-1": props.size.value === "sm",
              }
          : "p-0",
      borderRadius: {
        "rounded-lg": props.rounded.value === true,
        "rounded-full": props.rounded.value === "full",
      },
      // display: "inline-block",
      display: {
        flex: hasAnyIcon.value,
        "inline-block": !hasAnyIcon.value && props.tag.value !== "button",
      },
      alignItems: {
        "items-center": hasAnyIcon.value,
      },
      justifyContent: {
        "justify-center": hasAnyIcon.value,
      },
      // 4 4 6 8 8
      space:
        !!slots.prepend || !!slots.append
          ? {
              "space-x-1":
                props.size.value === "xs" || props.size.value === "sm",
              "space-x-1.5": props.size.value === "md",
              "space-x-2":
                props.size.value === "lg" || props.size.value === "xl",
            }
          : "",
    };
    return Object.values({ ...buttonClasses });
  });
  const computedIconSize = computed(
    () =>
      // 12 - 16- 20 - 20 - 24
      props.size.value === "xs"
        ? "text-xs"
        : props.size.value === "sm"
        ? "text-base"
        : props.size.value === "xl"
        ? "text-2xl"
        : "text-xl"
    // props.size.value === "sm" ? "md" : props.size.value === "md" ? "xl" : "2xl"
  );

  return { buttonClasses: computedButtonClasses, computedIconSize };
}
