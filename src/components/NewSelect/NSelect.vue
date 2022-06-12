<template>
  <div
    class="select-wrapper"
    :class="[computedClasses.wrapper, optionsActive ? 'z-50' : '']"
  >
    <button
      ref="luiSelect"
      aria-haspopup="listbox"
      :aria-expanded="optionsActive"
      aria-labelledby="lui-select"
      :class="computedClasses.button"
      @click="optionsActive = !optionsActive"
    >
      <span>{{ selectedOption }}</span>
      <!-- 16, 20 24 -->
      <lui-icon
        :line="iconLine ? true : false"
        :fill="!iconLine ? true : false"
        :name="optionsActive ? 'arrow-down-s' : 'arrow-up-s'"
        :class="computedClasses.icon"
      />
    </button>
    <ul
      v-show="optionsActive"
      tabindex="-1"
      role="listbox"
      :class="computedClasses.options"
    >
      <!-- <slot /> -->
      <lui-option
        v-for="(option, i) in options"
        :id="option"
        :ref="(el) => (optionsRef[i] = el)"
        :key="i"
        tabindex="-1"
        role="option"
        :selected="selectedOption === option"
        :disabled="
          option.disabled !== undefined && option.disabled === true
            ? true
            : false
        "
        @click="selectOption(option)"
      >
        <span>{{ option }}</span>
      </lui-option>
    </ul>
  </div>
</template>
<script>
import { ref, computed, provide, onMounted, onUnmounted } from "vue";
import * as prop from "../../mixins/props";
import { generateClasses } from "../../mixins/methods";
import LuiOption from "../Select/LuiOption.vue";
import LuiIcon from "../Icon/LuiIcon.vue";
export default {
  components: { LuiOption, LuiIcon },
  mixins: [
    prop.boolean("rounded", true),
    prop.size("md", ["sm", "md", "lg"]),
    prop.boolean("iconLine", true),
  ],
  props: {
    state: {
      type: [String, Boolean, null],
      default: null,
      validator(value) {
        return [null, "warning", true, false].includes(value);
      },
    },
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "onSelect"],
  setup(props, { emit }) {
    const optionsActive = ref(false);
    let selectedOption = ref("");
    const optionsRef = ref([]);
    const parentProps = ref({
      size: props.size,
      rounded: props.rounded,
    });
    const luiSelect = ref(null);

    provide("parentProps", parentProps.value);

    onMounted(() => {
      document.addEventListener("click", closeDropdown);
    });
    onUnmounted(() => {
      document.removeEventListener("click", closeDropdown);
    });

    function closeDropdown(e) {
      if (!luiSelect.value.contains(e.target)) optionsActive.value = false;
    }

    (function setInitalSelectedValue() {
      if (props.modelValue !== "" && props.options.includes(props.modelValue)) {
        selectedOption.value = props.modelValue;
      } else {
        selectedOption.value = props.options[0];
      }
    })();

    function findSize(sizes) {
      return sizes[props.size];
    }
    function selectOption(option) {
      selectedOption.value = option;
      emit("update:modelValue", option);
      emit("onSelect", option);
    }
    // function selectOption(option) {
    //   selectOption.value = option;
    //   console.log("selected", option)
    // }

    const computedClasses = computed(() => {
      const classes = {
        wrapper: {
          width: "w-80",
          position: "relative",
          zIndex: "z-10",
        },
        button: {
          padding: findSize({ sm: "px-2 py-1.5", md: "p-2", lg: "p-3" }),
          display: "flex",
          alignItems: "items-center",
          justifyContent: "justify-between",
          fontSize: findSize({
            sm: "text-xs",
            md: "text-base",
            lg: "text-base",
          }),
          lineHeight: findSize({
            sm: "leading-4.5",
            md: "leading-6",
            lg: "leading-6",
          }),
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
          width: "w-full",
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
          position: "absolute",
          width: "w-full",
          top: "top-full",
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
          // display: "flex flex-col"
        },
        icon: {
          lineHeight: "leading-none",
          fontSize: findSize({
            sm: "text-base	",
            md: "text-xl",
            lg: "text-2xl",
          }),
        },
      };
      return {
        wrapper: generateClasses([{ ...classes.wrapper }]),
        button: generateClasses([{ ...classes.button }]),
        options: generateClasses([{ ...classes.options }]),
        icon: generateClasses([{ ...classes.icon }]),
      };
    });
    return {
      optionsActive,
      computedClasses,
      selectedOption,
      optionsRef,
      luiSelect,
      selectOption,
      // selectOption,
    };
  },
};
</script>
