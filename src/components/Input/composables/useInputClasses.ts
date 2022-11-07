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


export function useInputClasses(
  props: ExtractPropTypes<PropTypes>, attrs: any, isInputFocused: boolean
) {
  console.log("from composable: ", props,attrs,isInputFocused)

  const iconStatus = computed(() => {
    return props.prepend === 'none'
      ? props.stateIcon ? 'rightIcon' : 'noIcon' // prepend none
      : props.stateIcon ? 'twoIcon' : 'leftIcon' // prepend not none 
  })

  const inputClasses: TwClassInterface = reactive({
    fontSize: "text-base",
    lineHeight: "leading-normal",
    width: "w-full",
    textColor:
      "text-secondary-600 placeholder:text-secondary-400 disabled:text-secondary-300 dark:text-secondary-300 dark:placeholder:text-secondary-600 dark:disabled:text-secondary-700",
    backgroundColor: "bg-secondary-50 disabled:bg-secondary-100 dark:bg-secondary-900 dark:disabled:secondary-800",
    outlineStyle: "outline-none",
    borderWidth: "border",
    borderStyle: "border-solid",
    cursor: "disabled:cursor-not-allowed",
    borderColor: classNames({
      ["border-secondary-200 focus:border-primary-500 disabled:border-secondary-200"]: props.state === null,
      ["disabled:border-secondary-200 border-warning"]: props.state === 'warning',
      ["disabled:border-secondary-200 border-danger"]: props.state === false,
      ["disabled:border-secondary-200 border-success"]: props.state === true,
    }),
    ringWidth: "focus:ring-4",
    ringColor: classNames({
      "focus:ring-primary-500/40": props.state === null,
      "ring:warning-500/40": props.state === 'warning',
      "ring:danger-500/40": props.state === false,
      "ring:success-500/40": props.state === true,
    }),
    borderRadius: classNames({
      "rounded-lg": props.rounded,
      "rounded-full": props.rounded === 'full'
    }),
    padding: classNames(
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
    ),
  });
  const descriptionClasses: TwClassInterface = reactive({
    fontSize: "text-sm",
    lineHeight: "leading-normal",
    margin: "mt-1",
    textColor: attrs.disabled
      ? "text-secondary-200 dark:text-secondary-700"
      : classNames({
        ["text-secondary-600 dark:text-secondary-400"]: props.state === null,
        ["text-warning-500"]: props.state === "warning",
        ["text-danger-500"]: props.state === false,
        ["text-success-500"]: props.state === true,
      })
  })

  // inputClasses.fontSize = "text-base";
  // inputClasses.lineHeight = "leading-normal";
  // inputClasses.width = "w-full";
  // inputClasses.textColor =
  //   "text-secondary-600 placeholder:text-secondary-400 disabled:text-secondary-300 dark:text-secondary-300 dark:placeholder:text-secondary-600 dark:disabled:text-secondary-700";
  // inputClasses.backgroundColor = "bg-secondary-50 disabled:bg-secondary-100 dark:bg-secondary-900 dark:disabled:secondary-800";
  // inputClasses.outlineStyle = "outline-none";
  // inputClasses.borderWidth = "border";
  // inputClasses.borderStyle = "border-solid";
  // inputClasses.cursor = "disabled:cursor-not-allowed"
  // inputClasses.borderColor = classNames({
  //   ["border-secondary-200 focus:border-primary-500 disabled:border-secondary-200"]: props.state === null,
  //   ["disabled:border-secondary-200 border-warning"]: props.state === 'warning',
  //   ["disabled:border-secondary-200 border-danger"]: props.state === false,
  //   ["disabled:border-secondary-200 border-success"]: props.state === true,
  // });
  // inputClasses.ringWidth = "focus:ring-4";
  // inputClasses.ringColor = classNames({
  //   "focus:ring-primary-500/40": props.state === null,
  //   "ring:warning-500/40": props.state === 'warning',
  //   "ring:danger-500/40": props.state === false,
  //   "ring:success-500/40": props.state === true,
  // });
  // inputClasses.borderRadius = classNames({
  //   "rounded-lg": props.rounded,
  //   "rounded-full": props.rounded === 'full'
  // });
  // inputClasses.padding = classNames(
  //   iconStatus.value === 'noIcon'
  //     ? {
  //       "py-1 px-2": props.size === 'sm',
  //       "py-2 px-3": props.size === 'md',
  //       "py-3 px-3": props.size === 'lg',
  //     }
  //     : iconStatus.value === 'rightIcon'
  //       ? {
  //         "py-1 pl-2 pr-8": props.size === 'sm',
  //         "py-2 pl-3 pr-10": props.size === 'md',
  //         "py-3 pl-3 pr-12": props.size === 'lg',
  //       }
  //       : iconStatus.value === 'twoIcon'
  //         ? {
  //           "py-1 px-8": props.size === 'sm',
  //           "py-2 px-10": props.size === 'md',
  //           "py-3 px-12": props.size === 'lg',
  //         }
  //         : { //leftIcon
  //           "py-1 pr-2 pl-8": props.size === 'sm',
  //           "py-2 pr-3 pl-10": props.size === 'md',
  //           "py-3 pr-3 pl-12": props.size === 'lg',
  //         }
  // );
  //
  return { descriptionClasses, inputClasses }
}