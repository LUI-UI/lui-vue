import { reactive } from "vue";
import classNames from "classnames";
//Types
import type { PropType, ExtractPropTypes } from "vue";
import type { ButtonTag, ButtonSize } from "../button-types";
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
};
export function useButtonClasses(
  props: ExtractPropTypes<PropTypes>
): TwClassInterface {
  const buttonClasses: TwClassInterface = reactive({});
  buttonClasses.lineHeight = "leading-normal";
  buttonClasses.ringWidth = "focus:ring-4";
  buttonClasses.outlineStyle = "focus:outline-none";
  buttonClasses.translate = "active:translate-y-0.5";
  buttonClasses.transitionProperty = "transition-colors transition-transform";
  buttonClasses.fontSize = "text-base";
  buttonClasses.backgroundColor = classNames(
    props.variant === "solid"
      ? {
          [`bg-${props.color}-500 hover:bg-${props.color}-400`]:
            props.filter === "none", // filter none
          [`bg-${props.color}-100 hover:bg-${props.color}-50 `]:
            props.filter === "lighten", // filter lighten
          [`bg-${props.color}-800 hover:bg-${props.color}-700`]:
            props.filter === "darken", // filter darken
        }
      : null
  );
  buttonClasses.textColor = classNames(
    props.variant === "solid"
      ? {
          [`text-white`]: props.filter === "none", // filter none
          [`text-${props.color}-500`]: props.filter === "lighten", // filter lighten
          [`text-${props.color}-100`]: props.filter === "darken", // filter darken
        }
      : {
          [`text-${props.color}-500 hover:text-${props.color}-400`]:
            props.filter === "none", // filter none
          [`text-${props.color}-100 hover:text-${props.color}-50`]:
            props.filter === "lighten", // filter lighten
          [`text-${props.color}-800 hover:text-${props.color}-700`]:
            props.filter === "darken", // filter darken
        }
  );
  buttonClasses.borderColor = classNames(
    props.variant === "text"
      ? "border-transparent"
      : props.variant === "solid" || props.variant === "outline"
      ? {
          [`border-${props.color}-500 hover:border-${props.color}-400`]:
            props.filter === "none", // filter none
          [`border-${props.color}-100 hover:border-${props.color}-50 `]:
            props.filter === "lighten", // filter lighten
          [`border-${props.color}-800 hover:border-${props.color}-700`]:
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
  buttonClasses.ringColor = `focus:ring-${props.color}-500/40`;
  // buttonClasses.padding = classNames(
  //   props.variant != "link"
  //     ? {
  //         "p-3": props.icon !== "none" && props.size === "lg",
  //         "p-2.5": props.icon !== "none" && props.size === "md",
  //         "p-2": props.icon !== "none" && props.size === "sm",
  //         "px-6 py-3": props.icon === "none" && props.size === "lg",
  //         "px-5 py-2.5": props.icon === "none" && props.size === "md",
  //         "px-4 py-1": props.icon === "none" && props.size === "sm",
  //       }
  //     : "p-0"
  // );
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
  buttonClasses.display = classNames({
    flex:
      props.icon !== "none" ||
      props.prepend !== "none" ||
      props.append !== "none",
  });
  buttonClasses.alignItems = classNames({
    "items-center":
      props.icon !== "none" ||
      props.prepend !== "none" ||
      props.append !== "none",
  });
  buttonClasses.justifyContent = classNames({
    "justify-center":
      props.icon !== "none" ||
      props.prepend !== "none" ||
      props.append !== "none",
  });

  buttonClasses.space = classNames({
    "space-x-1.5": props.prepend !== "none" || props.append !== "none",
  });

  return buttonClasses;
}
