import { computed, reactive } from "vue";
import classNames from "classnames";
//Types
import type { PropType, ExtractPropTypes } from "vue";
import type { ButtonTag, ButtonSize, disableStyles, loaderPosition } from "../button-types";
import type { TwClassInterface } from "../../../global-interfaces";
import type {
  Variant,
  Filter,
  Rounded,
  Block,
  Icon,
  Color,
} from "../../../global-types";

//Define Prop Types
type PropTypes = {
  tag: PropType<ButtonTag>;
  variant: PropType<Variant>;
  color: PropType<Color>;
  filter: PropType<Filter>;
  size: PropType<ButtonSize>;
  rounded: PropType<Rounded>;
  block: PropType<Block>;
  prepend: PropType<Icon>;
  append: PropType<Icon>;
  icon: PropType<Icon>;
  disableStyles: PropType<disableStyles>;
  // loading: PropType<Loading>;
  // loaderPosition: PropType<loaderPosition>;
};
export function useButtonClasses(
  props: ExtractPropTypes<PropTypes>
): TwClassInterface {

  const buttonClasses: TwClassInterface = reactive({});
  buttonClasses.fontSize = "text-base";
  buttonClasses.lineHeight = "leading-normal";
  buttonClasses.outlineStyle = "outline-none";
  buttonClasses.ringWidth = "focus-visible:ring-4";
  buttonClasses.transitionProperty = "transition-colors transition-transform";
  buttonClasses.translate = "active:translate-y-0.5 disabled:translate-y-0";
  // buttonClasses.pointerEvents = classNames({ 'pointer-events-none': props.loading });
  buttonClasses.cursor = classNames({['cursor-pointer disabled:cursor-not-allowed']: props.tag === "button" });
  buttonClasses.backgroundColor = classNames(
    props.variant === "solid"
      ? {
        [`bg-${props.color}-500 hover:bg-${props.color}-400 disabled:bg-secondary-500`]:
          props.filter === "none", // filter none
        [`bg-${props.color}-100 hover:bg-${props.color}-50 disabled:bg-secondary-100`]:
          props.filter === "lighten", // filter lighten
        [`bg-${props.color}-800 hover:bg-${props.color}-700  disabled:bg-secondary-800`]:
          props.filter === "darken", // filter darken
      }
      : null
  );
  buttonClasses.textColor = classNames(
    props.variant === "solid"
      ? {
        [`text-white disabled:text-secondary-300`]: props.filter === "none", // filter none
        [`text-${props.color}-500 disabled:text-secondary-300`]: props.filter === "lighten", // filter lighten
        [`text-${props.color}-100 disabled:text-secondary-300`]: props.filter === "darken", // filter darken
      }
      : {
        [`text-${props.color}-500 hover:text-${props.color}-400 disabled:text-secondary-500`]:
          props.filter === "none", // filter none
        [`text-${props.color}-100 hover:text-${props.color}-50 disabled:text-secondary-100`]:
          props.filter === "lighten", // filter lighten
        [`text-${props.color}-800 hover:text-${props.color}-700 disabled:text-secondary-800`]:
          props.filter === "darken", // filter darken
      }
  );
  buttonClasses.borderColor = classNames(
    props.variant === "text"
      ? "border-transparent"
      : props.variant === "solid" || props.variant === "outline"
        ? {
          [`border-${props.color}-500 hover:border-${props.color}-400 disabled:border-secondary-500`]:
            props.filter === "none", // filter none
          [`border-${props.color}-100 hover:border-${props.color}-50 disabled:border-secondary-100`]:
            props.filter === "lighten", // filter lighten
          [`border-${props.color}-800 hover:border-${props.color}-700 disabled:border-secondary-800`]:
            props.filter === "darken", // filter darken
        }
        : null
  );
  buttonClasses.borderWidth = classNames({ border: props.variant != "link" });
  buttonClasses.borderStyle = classNames({
    "border-solid": props.variant != "link",
  });
  buttonClasses.width = classNames({
    "w-full": props.block && props.variant !== "link",
  });
  buttonClasses.ringColor = `focus-visible:ring-${props.color}-500/40`;
  buttonClasses.padding = classNames(
    props.variant !== "link"
      ? props.icon !== "none"
        ? {
          "p-3": props.size === "lg",
          "p-2.5": props.size === "md",
          "p-2": props.size === "sm",
        }
        : {
          "px-6 py-3": props.size === "lg",
          "px-5 py-2": props.size === "md",
          "px-4 py-1": props.size === "sm",
        }
      : "p-0"
  );
  buttonClasses.borderRadius = classNames({
    "rounded-lg": props.rounded,
    "rounded-full": props.rounded === "full",
  });
  const isIconActive = computed(() => props.icon !== "none" || props.prepend !== "none" || props.append !== "none")
  buttonClasses.display = classNames({
    flex: isIconActive.value
  });
  buttonClasses.alignItems = classNames({
    "items-center": isIconActive.value
  });
  buttonClasses.justifyContent = classNames({
    "justify-center": isIconActive.value
  });
  // buttonClasses.justifyContent = classNames({
  //   "justify-center":
  //     props.icon !== "none" ||
  //     props.prepend !== "none" ||
  //     props.append !== "none",
  // });

  buttonClasses.space = classNames({
    "space-x-1.5": props.prepend !== "none" || props.append !== "none",
  });

  return buttonClasses;
}
