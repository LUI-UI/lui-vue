<template>
  <div
    id="dialog1"
    v-if="show"
    role="dialog"
    aria-labelledby="dialog1_label"
    aria-modal="true"
    v-bind="$attrs"
    :class="computedClasses.dialog"
    style="background-color: rgba(0, 0, 0, 0.6)"
  >
    <div class="content" :class="computedClasses.content">
      <div v-if="showIcon" :class="computedClasses.iconWrapper">
        <slot name="icon" />
        <lui-icon v-if="!hasIconSlot" :name="iconNames[state]" line />
      </div>
      <div>
        <h3 class="title" :class="computedClasses.title">
          <slot name="title" />
          {{ title }}
        </h3>
        <p class="description" :class="computedClasses.description">
          <slot name="description" />
          {{ description }}
        </p>
        <slot />
        <div class="bottom" :class="computedClasses.bottom">
          <div
            class="check"
            v-if="showCheckbox"
            :class="computedClasses.checkWrapper"
          >
            <slot name="check" />
            <lui-checkbox
              id="lui-modal-checkbox"
              size="lg"
              @onChange="$emit('onCheckboxChanged', $event)"
            />
            <label for="lui-modal-checkbox">{{ checkboxLabel }}</label>
          </div>
          <div class="button" :class="computedClasses.buttonWrapper">
            <slot name="button" />
            <lui-button
              variant="secondary"
              type="outline"
              rounded
              block
              @click="$emit('onCancel')"
              >{{ cancelLabel }}
            </lui-button>
            <lui-button rounded block @click="$emit('onConfirm')">
              {{ confirmLabel }}
            </lui-button>
          </div>
        </div>
      </div>

      <!-- <slot /> -->
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { generateClasses } from "../../mixins/methods";
import * as prop from "../../mixins/props";
import LuiIcon from "../Icon/LuiIcon.vue";
import LuiButton from "../Button/LuiButton.vue";
import LuiCheckbox from "../Checkbox/LuiCheckbox.vue";
export default {
  inheritAttrs: false,
  components: { LuiIcon, LuiButton, LuiCheckbox },
  mixins: [
    prop.string("state", "info", ["info", "success", "warning", "danger"]),
    prop.boolean("show", false),
    prop.string("title", ""),
    prop.string("description", ""),
    prop.boolean("vertical", false),
    prop.boolean("showCheckbox", false),
    prop.boolean("showIcon", true),
    prop.string("checkboxLabel", "Dont show again"),
    prop.string("confirmLabel", "Confirm"),
    prop.string("cancelLabel", "Cancel"),
  ],
  emits: ["onConfirm", "onCancel", "onCheckboxChanged"],
  setup(props, { slots }) {
    // BG OPACITY DOES NOT WORK!
    const hasIconSlot = computed(() => {
      return !!slots.icon;
    });

    // const test = ref(props.show);

    const iconNames = {
      success: "check-double",
      warning: "feedback",
      info: "information",
      danger: "error-warning",
    };

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
          zIndex: props.show ? "z-50" : "",
        },
        content: {
          padding: "p-6",
          minWidth: "min-w-[20rem]",
          maxWidth: props.vertical ? "max-w-sm" : "",
          backgroundColor: "bg-white",
          borderWidth: "border",
          borderColor: "border-secondary-200",
          borderRadius: "rounded-xl",
          boxShadow: "shadow",
          display: props.vertical ? "flex" : "grid",
          gridCols: !props.vertical ? "grid-cols-[48px_420px]" : "",
          gridGap: !props.vertical ? "gap-x-4" : "",
          alingItems: props.vertical ? "items-center" : "",
          flexDirection: props.vertical ? "flex-col" : "",
        },
        iconWrapper: {
          width: "w-12",
          height: "h-12",
          display: "grid",
          palceItems: "place-items-center",
          borderRadius: "rounded-full",
          backgroundColor:
            props.state === "info" ? "bg-primary-50" : `bg-${props.state}-50`,
          color:
            props.state === "info" ? "text-primary" : `text-${props.state}`,
          fontSize: "text-2xl",
          lineHeight: "leading-none",
          marginBottom: props.vertical ? "mb-4" : "",
        },
        title: {
          color: "text-secondary-800",
          fontSize: "text-lg",
          fontWeight: "font-semibold",
          marginBottom: "mb-1",
          textAlign: props.vertical ? "text-center" : "",
        },
        description: {
          color: "text-secondary-600",
          fontSize: "text-base",
          marginBottom: "mb-12",
          textAlign: props.vertical ? "text-center" : "",
        },
        bottom: {
          display: "flex",
          alignItems: props.vertical ? "items-center" : "",
          flexDirection: props.vertical ? "flex-col" : "",
        },
        checkWrapper: {
          display: "flex",
          color: "text-secondary-600",
          alignItems: !props.vertical ? "items-center" : "",
          flexOrder: props.vertical ? "order-last" : "",
          spaceX: "space-x-2", //tailwind future
        },
        buttonWrapper: {
          display: "flex",
          alignItems: "items-center",
          marginLeft: !props.vertical ? "ml-auto" : "",
          flexDirection: props.vertical ? "flex-col" : "",
          width: props.vertical ? "w-full" : "",
          spaceY: props.vertical ? "space-y-3" : "",
          spaceX: !props.vertical ? "space-x-3" : "",
          marginBottom: props.vertical ? "mb-4" : "",
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

    return {
      computedClasses,
      hasIconSlot,
      iconNames,
    };
  },
};
</script>
