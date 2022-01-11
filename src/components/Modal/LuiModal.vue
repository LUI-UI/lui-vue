<template>
  <div
    v-show="test"
    id="dialog1"
    role="dialog"
    aria-labelledby="dialog1_label"
    aria-modal="true"
    v-bind="$attrs"
    :class="computedClasses.dialog"
    style="background-color: rgba(0, 0, 0, 0.6)"
  >
    <div class="content" :class="computedClasses.content">
      <div :class="computedClasses.iconWrapper" v-if="isIconExist">
        <slot name="icon" />
      </div>
      <div>
        <h3 class="title" :class="computedClasses.title">
          <slot name="title" />
        </h3>
        <p class="description" :class="computedClasses.description">
          <slot name="description" />
        </p>
        <div class="bottom" :class="computedClasses.bottom">
          <div class="check" :class="computedClasses.checkWrapper">
            <slot name="check" />
          </div>
          <div class="button" :class="computedClasses.buttonWrapper">
            <slot name="button" />
          </div>
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { generateClasses } from "../../mixins/methods";
import * as prop from "../../mixins/props";
export default {
  inheritAttrs: false,
  mixins: [
    prop.string("state", "info", ["info", "success", "warning", "danger"]),
    prop.boolean("vertical", false),
    prop.boolean("horizontal", false), //yatay
    prop.boolean("show", false),
  ],
  setup(props, { slots }) {
    // BG OPACITY DOES NOT WORK!
    const isIconExist = computed(() => {
      return !!slots.icon;
    });
    // showModal(toRef(props, "show"));
    const test = ref(props.show);

    const computedClasses = computed(() => {
      const classes = {
        dialog: {
          position: "fixed",
          left: "left-0",
          top: "top-0",
          overflow: "overflow-hidden",
          width: "w-screen",
          height: "h-screen",
          display: "flex",
          alignItems: "items-center",
          justifyContent: "justify-center",
          zIndex: "z-30",
        },
        content: {
          padding: "p-6",
          maxWidth: props.vertical === true ? "max-w-sm" : "",
          backgroundColor: "bg-white",
          borderWidth: "border",
          borderColor: "border-secondary-200",
          borderRadius: "rounded-xl",
          boxShadow: "shadow",
          display:
            props.vertical === true
              ? "flex"
              : props.horizontal === true
              ? "grid"
              : "",
          gridCols:
            props.horizontal === true && isIconExist.value
              ? "grid-cols-[48px_420px]"
              : "",
          gridGap: props.horizontal === true ? "gap-x-4" : "",
          alingItems: props.vertical === true ? "items-center" : "",
          flexDirection: props.vertical === true ? "flex-col" : "",
        },
        iconWrapper: {
          width: "w-12",
          height: "h-12",
          display: "grid",
          palceItems: "place-items-center",
          borderRadius: "rounded-full",
          backgroundColor:
            props.state === "info" ? "bg-primary" : `bg-${props.state}`,
          color: "text-white",
          fontSize: "text-2xl",
          lineHeight: "leading-none",
          marginBottom: props.vertical === true ? "mb-4" : "",
        },
        title: {
          color: "text-secondary-800",
          fontSize: "text-lg",
          fontWeight: "font-semibold",
          marginBottom: "mb-1",
          textAlign: props.vertical === true ? "text-center" : "",
        },
        description: {
          color: "text-secondary-600",
          fontSize: "text-base",
          marginBottom: "mb-12",
          textAlign: props.vertical === true ? "text-center" : "",
        },
        bottom: {
          display: "flex",
          alignItems: props.vertical === true ? "items-center" : "",
          flexDirection: props.vertical === true ? "flex-col" : "",
        },
        checkWrapper: {
          display: "flex",
          color: "text-secondary-600",
          alignItems: props.horizontal === true ? "items-center" : "",
          flexOrder: props.vertical === true ? "order-last" : "",
          spaceX: "space-x-2", //tailwind future
        },
        buttonWrapper: {
          display: "flex",
          alignItems: props.horizontal === true ? "items-center" : "",
          marginLeft: props.horizontal === true ? "ml-auto" : "",
          flexDirection: props.vertical === true ? "flex-col" : "",
          width: props.vertical === true ? "w-full" : "",
          spaceY: props.vertical === true ? "space-y-3" : "",
          spaceX: props.horizontal === true ? "space-x-3" : "",
          marginBottom: props.vertical === true ? "mb-4" : "",
        },
      };

      return {
        dialog: generateClasses([{ ...classes.dialog }]),
        content: generateClasses([{ ...classes.content }]),
        iconWrapper: generateClasses([{ ...classes.iconWrapper }]),
        title: generateClasses([{ ...classes.title }]),
        description: generateClasses([{ ...classes.description }]),
        bottom: generateClasses([{ ...classes.bottom }]),
        checkWrapper: generateClasses([{ ...classes.checkWrapper }]),
        buttonWrapper: generateClasses([{ ...classes.buttonWrapper }]),
      };
    });

    return { computedClasses, isIconExist, test };
  },
};
</script>
