<template>
  <div :class="computedClasses.selectWrapper">
    <button
      type="button"
      aria-haspopup="listbox"
      aria-labelledby="exp_elem exp_button"
      :aria-expanded="optionsActive"
      :class="computedClasses.button"
      v-bind="$attrs"
      @click.stop="optionsActive = !optionsActive"
      @keydown="handleButtonKeyEvents($event)"
    >
      <component
        :is="selectPrepend.tag"
        v-if="selectPrepend !== null"
        v-bind="contentProps.selectPrepend"
        :class="computedClasses.prepend"
      />

      <div
        v-if="multiple && selectedOptions.length > 0"
        :class="computedClasses.multipleWrapper"
      >
        <lui-chip
          v-for="(selected, i) in selectedOptions"
          :key="i"
          filter="lighter"
          variant="primary"
          tabindex="-1"
          type="default"
          :rounded-full="rounded"
          :size="chipSize"
          icon="close"
          clickable
          :class="computedClasses.multipleItem"
          @click.stop="unselectOption(selected)"
        >
          {{ textField !== "none" ? selected[textField] : selected }}
        </lui-chip>
      </div>
      <span v-else> {{ selectedOption }} </span>
      <component
        :is="selectAppend.tag"
        v-if="selectAppend !== null"
        v-bind="contentProps.selectAppend"
        :class="computedClasses.append"
      />
    </button>
    <ul
      v-show="optionsActive"
      tabindex="-1"
      role="listbox"
      aria-labelledby="exp_elem"
      :aria-activedescendant="selectedOption"
      :class="computedClasses.options"
      @keydown.stop="handleOptionsKeyEvents($event)"
    >
      <lui-option
        v-for="(option, i) in options"
        :id="textField !== 'null' ? option[textField] : option"
        :ref="(el) => (optionsRef[i] = el)"
        :key="i"
        tabindex="-1"
        role="option"
        :selected="isOptionSelected(option)"
        :disabled="
          option.disabled !== undefined && option.disabled === true
            ? true
            : false
        "
        @click="selectOption(option, $event)"
      >
        <component
          v-if="optionPrepend !== null"
          :is="optionPrepend.tag"
          v-bind="contentProps.optionPrepend"
          :class="computedClasses.prepend"
        />
        <span>{{ textField !== "none" ? option[textField] : option }}</span>
        <component
          v-if="optionAppend !== null"
          :is="optionAppend.tag"
          v-bind="contentProps.optionAppend"
          :class="computedClasses.append"
        />
      </lui-option>
    </ul>
  </div>
</template>

<script>
import LuiOption from "./LuiOption.vue";
import LuiChip from "../Chip/LuiChip.vue";
import LuiIcon from "../Icon/LuiIcon.vue";
import LuiBadge from "../Badge/LuiBadge.vue";

import { computed, ref, provide, onUnmounted, onMounted } from "vue";
import { generateClasses } from "../../mixins/methods";
import * as prop from "../../mixins/props";
export default {
  components: { LuiChip, LuiOption, LuiIcon, LuiBadge },
  mixins: [
    prop.string("placeholder", "select item"),
    prop.string("textField", "none"),
    prop.string("valueField", "none"),
    prop.boolean("multiple", false),
    prop.boolean("rounded", true),
    prop.size("md", ["sm", "md", "lg"]),
  ],
  inheritAttrs: false,
  props: {
    //UniqField(v-fors etc.),seperatedButton,
    //optionsGroup,onChange,defaultValue
    //label, description
    //should we handle chips disable states ?
    // max height ?, open options according pozisition on page.
    // check icon on selected option
    // dynamic selec button arrow icons.
    // check all aria attrs
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: [String, Number, Array],
      default: "",
    },
    selectPrepend: {
      type: [Object, null],
      default: null,
    },
    selectAppend: {
      type: [Object, null],
      default: null,
    },
    optionPrepend: {
      type: [Object, null],
      default: null,
    },
    optionAppend: {
      type: [Object, null],
      default: null,
    },
    state: {
      type: [String, Boolean, null],
      default: null,
      validator(value) {
        return [null, "warning", true, false].includes(value);
      },
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // If the initial value of your v-model expression does not
    // match any of the options, the <select> element will render in an
    // “unselected” state. On iOS, this will prevent the user from being
    // able to select the first item, because iOS does not fire a
    // change event in this case. It is therefore recommended to
    // provide a disabled option with an empty value,
    // as demonstrated in the example above.

    const optionsActive = ref(false);
    const optionsArr = ref(props.options);
    const optionsRef = ref([]);
    let selectedOption = ref(props.placeholder);
    let selectedOptions = ref([]);
    let targetOption = ref("");
    const parentProps = ref({
      size: props.size,
      rounded: props.rounded,
      selectedOptions: selectedOptions.value,
    });

    provide("parentProps", parentProps.value);

    if (props.modelValue !== "") {
      const initalValue = ref(props.modelValue);
      if (!props.multiple) {
        selectedOption.value = initalValue.value[props.textField];
      } else {
        selectedOptions.value.push(props.modelValue);
      }
    }

    onMounted(() => {
      document.addEventListener("click", closeSelect);
    });
    onUnmounted(() => {
      document.removeEventListener("click", closeSelect);
    });

    function findSize(sizes) {
      return sizes[props.size];
    }

    function isOptionSelected(option) {
      if (!props.multiple) {
        if (props.textField !== "none") {
          return selectedOption.value === option[props.textField];
        }
        return selectedOption.value === option;
      }
      let is;
      if (props.textField !== "none") {
        is = selectedOptions.value.findIndex(
          (s) => s[props.textField] === option[props.textField]
        );
      } else {
        is = selectedOptions.value.findIndex((s) => s === option);
      }
      return is === -1 ? false : true;
    }

    function unselectOption(option) {
      let el;
      if (props.textField !== "none") {
        el = selectedOptions.value.findIndex(
          (s) => s[props.textField] === option[props.textField]
        );
      } else {
        el = selectedOptions.value.findIndex((s) => s === option);
      }
      selectedOptions.value.splice(el, 1);
    }
    function selectOption(option, event) {
      if (!option.disabled) {
        if (props.multiple) {
          // dont want to close options.
          event.stopPropagation();
          let index;
          if (props.textField !== "none") {
            index = selectedOptions.value.findIndex(
              (o) => o[props.textField] === option[props.textField]
            );
          } else {
            index = selectedOptions.value.findIndex((o) => o === option);
          }
          if (index === -1) {
            selectedOptions.value.push(option);
          } else {
            selectedOptions.value.splice(index, 1);
          }
          emit("update:modelValue", selectedOptions.value);
        } else {
          if (props.textField !== "none") {
            emit("update:modelValue", option[props.textField]);
            selectedOption.value = option[props.textField];
          } else {
            emit("update:modelValue", option);
            selectedOption.value = option;
            optionsActive.value = false;
          }
        }
      }
    }
    function closeSelect() {
      optionsActive.value = false;
    }
    function handleButtonKeyEvents(e) {
      if (e.keyCode === 40) {
        // arrowDown
        targetOption.value = 0;
        optionsRef.value[targetOption.value].$el.focus();
      }
    }
    function focusTargetOption() {
      optionsRef.value[targetOption.value].$el.focus();
    }
    function handleOptionsKeyEvents(e) {
      if (e.keyCode === 13) {
        // enter
        selectOption(props.options[targetOption.value], e);
      }
      const len = props.options.length - 1;
      if (e.keyCode === 40) {
        // arrowDown
        if (targetOption.value < len) {
          targetOption.value++;
          focusTargetOption();
        } else if (targetOption.value === len) {
          targetOption.value = 0;
          focusTargetOption();
        }
      }
      if (e.keyCode === 38) {
        // arrowup
        if (targetOption.value > 0) {
          targetOption.value--;
          focusTargetOption();
        } else if (targetOption.value === 0) {
          targetOption.value = len;
          focusTargetOption();
        }
      }
    }

    const contentProps = computed(() => {
      let attrs = {
        selectPrepend: props.selectPrepend,
        selectAppend: props.selectAppend,
        optionPrepend: props.optionPrepend,
        optionAppend: props.optionAppend,
      };
      [
        "selectPrepend",
        "selectAppend",
        "optionPrepend",
        "optionAppend",
      ].forEach((p) => {
        if (attrs[p] !== null) {
          if (attrs[p].tag === "lui-icon") {
            attrs[p].class = findSize({
              sm: "text-base leading-none",
              md: "text-xl leading-none",
              lg: "text-2xl leading-none",
            });
          } else {
            attrs[p].size = findSize({ sm: "2xs", md: "xs", lg: "sm" });
          }
        }
      });
      return attrs;
    });

    const chipSize = computed(() => {
      return props.size === "lg" ? "md" : props.size;
    });

    const computedClasses = computed(() => {
      const classes = {
        selectWrapper: {
          width: "w-max",
          position: "relative",
          zIndex: "z-10",
        },
        button: {
          display: "flex",
          alignItems: "items-center",
          paddingTop: findSize({ sm: "pt-1.5", md: "pt-2", lg: "pt-3" }),
          paddingBottom:
            selectedOptions.value.length < 0
              ? "p-0"
              : findSize({ sm: "pb-1.5", md: "pb-2", lg: "pb-3" }),
          paddingX: "px-3",
          fontSize: props.size === "sm" ? "text-xs" : "text-base",
          lineHeight: props.size === "sm" ? "leading-4.5" : "leading-6",
          textColor: "text-secondary-600",
          borderWidth: "border",
          borderColor:
            props.state === true
              ? "border-success"
              : props.state === false
              ? "border-danger"
              : props.state === "warning"
              ? "border-warning"
              : "border-secondary-200 focus:border-primary",
          borderRadius: props.rounded ? "rounded-lg" : "",
          backgroundColor: "bg-white",
          width: "w-80",
          outline: "focus:outline-none",
          ringWidth: props.state === null ? "focus:ring-4" : "ring-4",
          ringColor:
            props.state === null
              ? "focus:ring-primary-100"
              : props.state === true
              ? "ring-success-100"
              : props.state === false
              ? "ring-danger-100"
              : "ring-warning-100",
          disabled:
            "disabled:border-secondary-300 disabled:text-secondary-600 disabled:bg-secondary-100",
        },
        options: {
          backgroundColor: "bg-white",
          borderWidth: "border",
          borderRadius: props.rounded ? "rounded-lg" : "",
          borderColor:
            props.state === true
              ? "border-success"
              : props.state === false
              ? "border-danger"
              : props.state === "warning"
              ? "border-warning"
              : "border-secondary-200 focus:border-primary",
          paddingBottom: "pb-2",
          boxShadow: "shadow-md",
          marginTop: "mt-2",
          // ringWidth: props.state === null ? "focus:ring-4" : "ring-4",
          // ringColor:
          //   props.state === null
          //     ? "focus:ring-primary-100"
          //     : props.state === true
          //     ? "ring-success-100"
          //     : props.state === false
          //     ? "ring-danger-100"
          //     : "ring-warning-100",
        },
        multipleWrapper: {
          display: "flex",
          flexWrap: "flex-wrap",
          marginLeft: props.selectPrepend !== null ? "-ml-1" : "-ml-2",
          marginBottom: "-mb-2",
        },
        multipleItem: {
          marginLeft: "ml-2",
          marginBottom: "mb-2",
        },
        text: {
          marginLeft:
            props.selectPrepend !== null || props.optionPrepend !== null
              ? "ml-2"
              : "",
        },
        append: {
          marginLeft: "ml-auto",
        },
        prepend: {
          marginRight: "mr-2",
        },
      };
      return {
        selectWrapper: generateClasses([{ ...classes.selectWrapper }]),
        button: generateClasses([{ ...classes.button }]),
        options: generateClasses([{ ...classes.options }]),
        multipleItem: generateClasses([{ ...classes.multipleItem }]),
        multipleWrapper: generateClasses([{ ...classes.multipleWrapper }]),
        append: generateClasses([{ ...classes.append }]),
        prepend: generateClasses([{ ...classes.prepend }]),
      };
    });

    return {
      computedClasses,
      optionsActive,
      selectedOption,
      selectOption,
      optionsArr,
      selectedOptions,
      unselectOption,
      chipSize,
      isOptionSelected,
      handleOptionsKeyEvents,
      handleButtonKeyEvents,
      optionsRef,
      targetOption,
      contentProps,
    };
  },
};
</script>
