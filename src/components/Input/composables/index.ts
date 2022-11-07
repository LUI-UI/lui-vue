import { computed, watchEffect } from "vue";
import classNames from "classnames";
//Types
import type { PropType, ExtractPropTypes } from "vue";
// import type { TwClassInterface } from "../../../global-interfaces";
import type { TwClassInterface } from "@/global-interfaces";
import type { Clear, stateIcon } from "../input-types";
import type {
  State,
  Rounded,
  Block,
  Icon,
  Size
} from "@/global-types";

//Define Prop Types
type PropTypes = {
  size: PropType<Size>;
  rounded: PropType<Rounded>;
  state: PropType<State>;
  stateIcon: PropType<stateIcon>;
  block: PropType<Block>;
  clear: PropType<Clear>;
  prepend: PropType<Icon>;
  icon: PropType<Icon>;
};

export function useInputClasses(
  props: ExtractPropTypes<PropTypes>, attrs: any
) {
  const iconStatus = computed(() => {
    return props.stateIcon === true && props.state !== null
      ? props.prepend !== 'none' ? 'twoIcon' : 'rightIcon' // stateIcon-active
      : props.prepend === 'none' ? 'noIcon' : 'leftIcon' // stateIcn-deactive
  })
  
  let inputClasses: TwClassInterface = {}
  let descriptionClasses: TwClassInterface = {}
  let preprendClasses: TwClassInterface = {}
  let stateIconClasses: TwClassInterface = {}
  let closeClasses: TwClassInterface = {}
  let iconClasses: TwClassInterface = {
    position: "absolute",
    translate: "-translate-y-1/2",
    top: "top-2/4",
    fontSize: classNames({
      'text-base': props.size === 'sm',
      'text-xl': props.size === 'md',
      'text-2xl': props.size === 'lg'
    })
  }

  function setClasses() {
    inputClasses.peer = "peer";
    inputClasses.fontSize = "text-base";
    inputClasses.lineHeight = "leading-normal";
    inputClasses.width = "w-full";
    inputClasses.textColor =
      "text-secondary-600 placeholder:text-secondary-400 disabled:placeholder:text-secondary-300 dark:text-secondary-300 dark:placeholder:text-secondary-600 dark:disabled:text-secondary-700";
    inputClasses.backgroundColor = "bg-secondary-50 disabled:bg-secondary-100 dark:bg-secondary-900 dark:disabled:secondary-800";
    inputClasses.outlineStyle = "outline-none";
    inputClasses.borderWidth = "border";
    inputClasses.borderStyle = "border-solid";
    inputClasses.cursor = "disabled:cursor-not-allowed";
    inputClasses.borderColor = classNames({
      ["border-secondary-200 focus:border-primary-500 disabled:border-secondary-200"]: props.state === null,
      ["disabled:border-secondary-200 border-warning-500"]: props.state === 'warning',
      ["disabled:border-secondary-200 border-danger-500"]: props.state === false,
      ["disabled:border-secondary-200 border-success-500"]: props.state === true,
    });
    inputClasses.ringWidth = attrs.disabled ? 'ring-0' : props.state === null ? "focus:ring-4" : "ring-4";
    inputClasses.ringColor = classNames({
      "focus:ring-primary-500/40": props.state === null,
      "ring-warning-500/40": props.state === 'warning',
      "ring-danger-500/40": props.state === false,
      "ring-success-500/40": props.state === true,
    });
    inputClasses.borderRadius = classNames({
      "rounded-lg": props.rounded,
      "rounded-full": props.rounded === 'full'
    });
    inputClasses.padding = classNames(
      iconStatus.value === 'noIcon'
        ? {
          "py-1 px-2": props.size === 'sm',
          "py-2 px-3": props.size === 'md',
          "py-3 px-3": props.size === 'lg',
        }
        : iconStatus.value === 'rightIcon'
          ? {
            "py-1 pl-2 pr-8": props.size === 'sm',
            "py-2 pl-3 pr-10": props.size === 'md',
            "py-3 pl-3 pr-12": props.size === 'lg',
          }
          : iconStatus.value === 'twoIcon'
            ? {
              "py-1 px-8": props.size === 'sm',
              "py-2 px-10": props.size === 'md',
              "py-3 px-12": props.size === 'lg',
            }
            : { //leftIcon
              "py-1 pr-2 pl-8": props.size === 'sm',
              "py-2 pr-3 pl-10": props.size === 'md',
              "py-3 pr-3 pl-12": props.size === 'lg',
            }
    );
    //
    descriptionClasses.fontSize = "text-sm";
    descriptionClasses.lineHeight = "leading-normal";
    descriptionClasses.margin = "mt-1";
    descriptionClasses.textColor = attrs.disabled
      ? "text-secondary-200 dark:text-secondary-700"
      : classNames({
        "text-secondary-600 dark:text-secondary-400": props.state === null,
        "text-warning-500": props.state === "warning",
        "text-danger-500": props.state === false,
        "text-success-500": props.state === true,
      });
    //
    preprendClasses.position = "absolute";
    preprendClasses.translate = "-translate-y-1/2";
    preprendClasses.top = "top-2/4";
    preprendClasses.left = classNames({
      'left-2': props.size === 'sm',
      'left-3': props.size === 'md',
      'left-4': props.size === 'lg'
    });
    preprendClasses.fontSize = classNames({
      'text-base': props.size === 'sm',
      'text-xl': props.size === 'md',
      'text-2xl': props.size === 'lg'
    });
    preprendClasses.textColor = classNames({
      "text-secondary-300 dark:text-secondary-700": attrs.disabled,
      "text-secondary-400 peer-focus:text-secondary-600 dark:text-secondary-600 dark:peer-focus:text-secondary-300": !attrs.disabled
    })
    // State icon
    stateIconClasses.position = "absolute";
    stateIconClasses.translate = "-translate-y-1/2";
    stateIconClasses.top = "top-2/4";
    stateIconClasses.right = classNames({
      'right-2': props.size === 'sm',
      'right-3': props.size === 'md',
      'right-4': props.size === 'lg'
    });
    stateIconClasses.fontSize = classNames({
      'text-base': props.size === 'sm',
      'text-xl': props.size === 'md',
      'text-2xl': props.size === 'lg'
    });
    stateIconClasses.textColor = classNames(attrs.disabled ? 'text-secondary-300'
      : {
        "text-warning-500": props.state === 'warning',
        "text-danger-500": props.state === false,
        "text-success-500": props.state === true
      });
    // Close
    closeClasses = { ...iconClasses }
    closeClasses.right = classNames({
      'right-2': props.size === 'sm',
      'right-3': props.size === 'md',
      'right-4': props.size === 'lg'
    });
    closeClasses.display = 'flex';
    closeClasses.outlineStyle = "outline-none";
    closeClasses.textColor = "text-secondary-400 peer-focus:text-secondary-600 dark:text-secondary-600 dark:peer-focus:text-secondary-300";
    closeClasses.ringWidth = "focus-visible:ring-2";
    closeClasses.ringColor = "focus-visible:ring-secondary-200";
    
  }


  setClasses()
  watchEffect(setClasses)

  return { inputClasses, descriptionClasses, preprendClasses, stateIconClasses, closeClasses }
}
