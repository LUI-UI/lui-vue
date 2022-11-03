import { computed, reactive } from "vue";
import classNames from "classnames";
//Types
import type { PropType, ExtractPropTypes } from "vue";
import type { TwClassInterface } from "../../../global-interfaces";
import type { Clear, stateIcon } from "../input-types";
import type {
  State,
  Rounded,
  Block,
  Icon,
  Size
} from "../../../global-types";


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

export function usePrependClasses(
  props: ExtractPropTypes<PropTypes>
): TwClassInterface {
  const prependClasses: TwClassInterface = reactive({});
  // prependClasses.textColor = "text-secondary-400";
  prependClasses.position = "absolute";
  prependClasses.translate = "-translate-y-1/2";
  prependClasses.top = "top-2/4";
  prependClasses.left = classNames({
    'left-0.5': props.size === 'sm',
    'left-3': props.size === 'md',
    'left-4': props.size === 'lg'
  })
  // prepend: position,size,color,left
  return prependClasses
}
export function useInputClasses(
  props: ExtractPropTypes<PropTypes>
): TwClassInterface {
  const inputClasses: TwClassInterface = reactive({});
  inputClasses.fontSize = "text-base";
  inputClasses.lineHeight = "leading-normal";
  inputClasses.width = "w-full";
  inputClasses.textColor =
    "text-secondary-600 placeholder:text-secondary-400 disabled:text-secondary-300 dark:text-secondary-300 dark:placeholder:text-secondary-600 dark:disabled:text-secondary-700";
  inputClasses.backgroundColor = "bg-secondary-50 dark:bg-secondary-900";
  inputClasses.outlineStyle = "outline-none";
  inputClasses.borderWidth = "border";
  inputClasses.borderStyle = "border-solid";
  inputClasses.borderColor = classNames({
    ["border-secondary-200 focus:border-primary-500"]: props.state === null,
    ["border-warning"]: props.state === 'warning',
    ["border-danger"]: props.state === false,
    ["border-success"]: props.state === true,
  });
  inputClasses.ringWidth = "focus:ring-4";
  inputClasses.ringColor = classNames({
    "focus:ring-primary-500/40": props.state === null,
    "ring:warning-500/40": props.state === 'warning',
    "ring:danger-500/40": props.state === false,
    "ring:success-500/40": props.state === true,
  });
  inputClasses.borderRadius = classNames({
    "rounded-lg": props.rounded,
    "rounded-full": props.rounded === 'full'
  });
  inputClasses.padding = classNames(
    props.size === 'lg' ?
      {
        "py-3 px-3": props.prepend === null && !props.stateIcon, // no-icon
        "py-3 px-4": props.prepend !== null && props.stateIcon, // two-icon
        "py-3 pl-4 pr-3": props.prepend !== null && !props.stateIcon, // left-icon
        "py-3 pl-3 pr-4": props.prepend === null && props.stateIcon, // right-icon
      } :
      {
        "py-1 px-2": props.size === 'sm',
        "py-2 px-3": props.size === 'md',
      }
  );
  return inputClasses
}