<template>
  <div
    class="select-wrapper"
    :class="[
      $attrs.class,
      computedClasses.wrapper,
      optionsActive ? 'z-50' : '',
    ]"
    :style="$attrs.style"
  >
    <button
      ref="luiSelect"
      aria-haspopup="listbox"
      :aria-expanded="optionsActive"
      :aria-labelledby="$attrs.id"
      :class="computedClasses.button"
      v-bind="$attrs"
      @click="optionsActive = !optionsActive"
      @keydown="handleButtonKeyEvents($event)"
    >
      <span>{{ selectedOption }}</span>
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
      @keydown.stop="handleOptionsKeyEvents($event)"
    >
      <lui-option v-if="placeholder" tabindex="-1" role="option" disabled>
        {{ placeholder }}
      </lui-option>
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
    <p v-if="description !== ''" :class="computedClasses.description">
      {{ description }}
    </p>
  </div>
</template>
<script>
import { ref, computed, provide, onMounted, onUnmounted, nextTick } from "vue";
import * as prop from "../../mixins/props";
import { generateClasses } from "../../mixins/methods";
import LuiOption from "../Select/LuiOption.vue";
import LuiIcon from "../Icon/LuiIcon.vue";
export default {
  inheritAttrs: false,
  components: { LuiOption, LuiIcon },
  mixins: [
    prop.size("md", ["sm", "md", "lg"]),
    prop.boolean("rounded", true),
    prop.boolean("iconLine", true),
    prop.string("placeholder", ""),
    prop.string("modelValue", ""),
    prop.string("description", ""),
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
    // modelValue: {
    //   type: String,
    //   default: "",
    // },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const optionsRef = ref([]);
    const luiSelect = ref(null);
    const parentProps = ref({
      size: props.size,
      rounded: props.rounded,
    });
    let optionsActive = ref(false);
    let activeOptionIndex = ref(0);
    let selectedOption = ref("");

    provide("parentProps", parentProps.value);

    onMounted(() => {
      document.addEventListener("click", closeDropdown);
    });
    onUnmounted(() => {
      document.removeEventListener("click", closeDropdown);
    });

    function closeDropdown(e) {
      // if clicked a select when another select open be able to close first one we check the contains(e.target)
      if (!luiSelect.value.contains(e.target)) optionsActive.value = false;
    }

    (function setInitalSelected() {
      if (props.placeholder !== "") {
        selectedOption.value = props.placeholder;
        activeOptionIndex.value = 0;
      } else if (
        props.modelValue !== "" &&
        props.options.includes(props.modelValue)
      ) {
        selectedOption.value = props.modelValue;
        const index = props.options.findIndex((o) => o === props.modelValue);
        activeOptionIndex.value = index;
      } else {
        selectedOption.value = props.options[0];
        activeOptionIndex.value = 0;
      }
    })();

    function findSize(sizes) {
      return sizes[props.size];
    }

    function selectOption(option) {
      selectedOption.value = option;
      emit("update:modelValue", option);
      emit("change", option);
      luiSelect.value.focus();
    }

    function setActiveOptionIndex(target) {
      switch (target) {
        case "next":
          if (activeOptionIndex.value + 1 === props.options.length) {
            activeOptionIndex.value = 0;
          } else {
            activeOptionIndex.value++;
          }
          break;
        case "previous":
          if (activeOptionIndex.value === 0) {
            activeOptionIndex.value = props.options.length - 1;
          } else {
            activeOptionIndex.value--;
          }
          break;
        case "first":
          activeOptionIndex.value = 0;
          break;
        case "last":
          activeOptionIndex.value = props.options.length - 1;
          break;
        default:
      }
    }

    function focusOption() {
      optionsRef.value[activeOptionIndex.value].$el.focus();
    }

    async function handleButtonKeyEvents(e) {
      if (e.code === "ArrowDown" || e.code === "Enter" || e.code === "Space") {
        optionsActive.value = true;
        await nextTick();
        focusOption();
      }
    }

    function handleOptionsKeyEvents(e) {
      switch (e.code) {
        case "Escape":
          optionsActive.value = false;
          luiSelect.value.focus();
          break;
        case "Enter":
          const option = props.options[activeOptionIndex.value];
          selectOption(option);
          break;
        case "ArrowDown":
          setActiveOptionIndex("next");
          focusOption();
          break;
        case "ArrowUp":
          setActiveOptionIndex("previous");
          focusOption();
          break;
        case "Home":
          setActiveOptionIndex("first");
          focusOption();
          break;
        case "End":
          setActiveOptionIndex("last");
          focusOption();
          break;
        default:
        // code block
      }
    }

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
          cursor: "disabled:cursor-not-allowed",
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
        description: {
          display: "inline-block",
          fontSize: findSize({ sm: "text-xs", md: "text-xs", lg: "text-sm" }),
          lineHeight: findSize({ sm: "leading-4.5", md: "leading-4.5", lg: "leading-5" }),
          marginTop: "mt-2",
          textColor:
            props.state === true
              ? "text-success"
              : props.state === false
              ? "text-danger"
              : props.state === "warning"
              ? "text-warning"
              : "text-secondary-600",
        },
      };
      return {
        wrapper: generateClasses([{ ...classes.wrapper }]),
        button: generateClasses([{ ...classes.button }]),
        options: generateClasses([{ ...classes.options }]),
        icon: generateClasses([{ ...classes.icon }]),
        description: generateClasses([{ ...classes.description }]),
      };
    });

    return {
      optionsActive,
      computedClasses,
      selectedOption,
      optionsRef,
      luiSelect,
      selectOption,
      handleButtonKeyEvents,
      handleOptionsKeyEvents,
    };
  },
};
</script>
