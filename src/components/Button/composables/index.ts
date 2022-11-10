import { computed, reactive } from "vue";
import classNames from "classnames";
//Types
import type { PropType, ExtractPropTypes, Ref } from "vue";
import type { ButtonTag } from "../button-types";
import type { TwClassInterface } from "@/global-interfaces";
import type {
  Variant,
  Filter,
  Rounded,
  Block,
  Icon,
  Color,
  Size
} from "@/global-types";

//Define Prop Types
type PropTypes = {
  tag: Ref<ButtonTag>;
  variant: Ref<Variant>;
  color: Ref<Color>;
  filter: Ref<Filter>;
  size: Ref<Size>;
  rounded: Ref<Rounded>;
  block: Ref<Block>;
  prepend: Ref<Icon>;
  append: Ref<Icon>;
  icon: Ref<Icon>;
};

export function useButtonClasses(
  props: PropTypes
) {
  const hasIcon = computed(() => props.icon.value !== "none")
  const hasAnyIcon = computed(() => hasIcon.value || props.prepend.value !== "none" || props.append.value !== "none")

  const computedButtonClasses = computed(() => {
    const buttonClasses: TwClassInterface = {
      fontSize: "text-base",
      lineHeight: "leading-normal",
      outlineStyle: "outline-none",
      ringWidth: "focus-visible:ring-4",
      transitionProperty: "transition-colors transition-transform",
      translate: "active:translate-y-0.5 disabled:translate-y-0",
      // pointerEvents : classNames({ 'pointer-events-none': props.loading }),
      cursor: classNames({ ['cursor-pointer disabled:cursor-not-allowed']: props.tag.value === "button" }),
      backgroundColor: classNames(
        props.variant.value === "solid"
          ? {
            [`bg-${props.color.value}-500 hover:bg-${props.color.value}-400 disabled:bg-secondary-500`]:
              props.filter.value === "none", // filter none
            [`bg-${props.color.value}-100 hover:bg-${props.color.value}-50 disabled:bg-secondary-100`]:
              props.filter.value === "lighten", // filter lighten
            [`bg-${props.color.value}-800 hover:bg-${props.color.value}-700  disabled:bg-secondary-800`]:
              props.filter.value === "darken", // filter darken
          }
          : null
      ),
      textColor: classNames(
        props.variant.value === "solid"
          ? {
            [`text-white disabled:text-secondary-300`]: props.filter.value === "none", // filter none
            [`text-${props.color.value}-500 disabled:text-secondary-300`]: props.filter.value === "lighten", // filter lighten
            [`text-${props.color.value}-100 disabled:text-secondary-300`]: props.filter.value === "darken", // filter darken
          }
          : {
            [`text-${props.color.value}-500 hover:text-${props.color.value}-400 disabled:text-secondary-500`]:
              props.filter.value === "none", // filter none
            [`text-${props.color.value}-100 hover:text-${props.color.value}-50 disabled:text-secondary-100`]:
              props.filter.value === "lighten", // filter lighten
            [`text-${props.color.value}-800 hover:text-${props.color.value}-700 disabled:text-secondary-800`]:
              props.filter.value === "darken", // filter darken
          }
      ),
      borderColor: classNames(
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
            : null
      ),
      borderWidth: classNames({ border: props.variant.value != "link" }),
      borderStyle: classNames({
        "border-solid": props.variant.value != "link",
      }),
      width: classNames({
        "w-full": props.block.value && props.variant.value !== "link",
      }),
      ringColor: `focus-visible:ring-${props.color.value}-500/40`,
      padding: classNames(
        props.variant.value !== "link"
          ? hasIcon.value
            ? {
              "p-3": props.size.value === "lg",
              "p-2.5": props.size.value === "md",
              "p-2": props.size.value === "sm",
            }
            : {
              "px-6 py-3": props.size.value === "lg",
              "px-5 py-2": props.size.value === "md",
              "px-4 py-1": props.size.value === "sm",
            }
          : "p-0"
      ),
      borderRadius: classNames({
        "rounded-lg": props.rounded.value,
        "rounded-full": props.rounded.value === "full",
      }),
      // display: "inline-block",
      display: classNames({
        flex: hasAnyIcon.value,
        "inline-block": !hasAnyIcon.value && props.tag.value !== 'button'
      }),
      alignItems: classNames({
        "items-center": hasAnyIcon.value
      }),
      justifyContent: classNames({
        "justify-center": hasAnyIcon.value
      }),
      space: classNames({
        "space-x-1.5": props.prepend.value !== "none" || props.append.value !== "none",
      }),
    }
    return classNames(Object.values({ ...buttonClasses }))
  });
  const computedIconSize = computed(() =>
    props.size.value === "sm" ? "md" : props.size.value === "md" ? "xl" : "2xl"
  );

  return { buttonClasses: computedButtonClasses, computedIconSize };
}
