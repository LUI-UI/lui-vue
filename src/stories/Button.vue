<template>
  <button type="button" :class="classes" @click="onClick" :style="style">
    {{ label }}
  </button>
</template>

<script>
import "./button.css";
// import { reactive, computed } from "vue";

export default {
  name: "my-button",

  // props: {
  //   label: {
  //     type: String,
  //     required: true,
  //   },
  //   primary: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   size: {
  //     type: String,
  //     validator: function (value) {
  //       return ["small", "medium", "large"].indexOf(value) !== -1;
  //     },
  //   },
  //   backgroundColor: {
  //     type: String,
  //   },
  // },

  emits: ["click"],

  // setup(props, { emit }) {
  //   props = reactive(props);
  //   return {
  //     classes: computed(() => ({
  //       "storybook-button": true,
  //       "storybook-button--primary": props.primary,
  //       "storybook-button--secondary": !props.primary,
  //       [`storybook-button--${props.size || "medium"}`]: true,
  //     })),
  //     style: computed(() => ({
  //       backgroundColor: props.backgroundColor,
  //     })),
  //     onClick() {
  //       emit("click");
  //     },
  //   };
  // },
};
</script>
<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    validator: function (value) {
      return ["small", "medium", "large"].indexOf(value) !== -1;
    },
  },
  backgroundColor: {
    type: String,
  },
});

const classes = computed(() => ({
  "storybook-button": true,
  "storybook-button--primary": props.primary,
  "storybook-button--secondary": !props.primary,
  [`storybook-button--${props.size || "medium"}`]: true,
}));
const style = computed(() => ({
  backgroundColor: props.backgroundColor,
}));
</script>
