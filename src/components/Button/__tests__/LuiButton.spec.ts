import { describe, it, expect, test } from "vitest";

import { mount } from "@vue/test-utils";
import LuiButton from "../LuiButton.vue";

// "text-base",
// "leading-normal",
const defaultClasses = [
  "lui-button",
  "outline-none",
  "cursor-pointer",
  "transition-colors",
  "transition-transform",
  "focus-visible:ring-4",
  "active:translate-y-0.5",
  "disabled:translate-y-0",
  "disabled:cursor-not-allowed",
];
const solidClasses = [
  "text-white",
  "bg-primary-500",
  "border",
  "border-solid",
  "border-primary-500",
  "hover:bg-primary-400",
  "hover:border-primary-400",
  "focus-visible:ring-primary-500/40",
  "disabled:border-secondary-500",
  "disabled:text-secondary-300",
  "disabled:bg-secondary-500",
];
const outlineClasses = [
  "text-primary-500",
  "border",
  "border-solid",
  "border-primary-500",
  "hover:text-primary-400",
  "hover:border-primary-400",
  "disabled:border-secondary-500",
  "disabled:text-secondary-500",
  "focus-visible:ring-primary-500/40",
];
const textClasses = [
  "text-primary-500",
  "border",
  "border-solid",
  "border-transparent",
  "hover:text-primary-400",
  "disabled:text-secondary-500",
  "focus-visible:ring-primary-500/40",
];

const rounded = "rounded-lg";
const roundedFull = "rounded-full";
const sizeIconSM = "p-2";
const sizeIconMD = "p-2.5";
const sizeIconLG = "p-3";
const sizeSM = ["px-4", "py-1"];
const sizeMD = ["py-2", "px-5", "text-base"];
const sizeLG = ["px-6", "py-3"];

const arr1 = ["1", "2", "3"];
const arr2 = ["1", "3", "2"];

test("check if array equal.", () => {
  expect(arr1.sort()).toEqual(arr2.sort());
});

describe("LuiButton.vue", () => {
  it("renders properly solid/primary button", () => {
    const wrapper = mount(LuiButton);
    expect(wrapper.classes().sort()).toEqual(
      defaultClasses.concat(solidClasses, sizeMD).sort()
    );
  });
  it("renders properly outline/primary button", () => {
    const wrapper = mount(LuiButton, { props: { variant: "outline" } });
    expect(wrapper.classes().sort()).toEqual(
      defaultClasses.concat(outlineClasses, sizeMD).sort()
    );
  });
  it("renders properly text/primary button", () => {
    const wrapper = mount(LuiButton, { props: { variant: "text" } });
    expect(wrapper.classes().sort()).toEqual(
      defaultClasses.concat(textClasses, sizeMD).sort()
    );
  });
  // icon - prepend - append
  // anyIcon ? flex items-center justify-center
  // prepend ya da append ? size md: space-x-1.5
  it("renders properly classes for append slot", () => {
    const textAndIconClasses = [
      "flex",
      "items-center",
      "justify-center",
      "space-x-1.5",
    ];
    const wrapper = mount(LuiButton, {
      slots: {
        default: () => "LuiButton",
        append: () =>
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>',
      },
    });
    textAndIconClasses.forEach((c) => {
      expect(wrapper.classes()).toContain(c);
    });
  });
  it("renders properly classes for icon button", () => {
    const iconButtonClasses = [
      "p-2.5",
      "flex",
      "items-center",
      "justify-center",
    ];
    const wrapper = mount(LuiButton, {
      slots: {
        icon: () =>
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>',
      },
    });
    iconButtonClasses.forEach((c) => {
      expect(wrapper.classes()).toContain(c);
    });
  });
  it("renders properly classes for link/primary button", () => {
    const wrapper = mount(LuiButton, { props: { variant: "link" } });
    expect(wrapper.classes()).toContain("p-0");
  });
});

// describe("LuiButton.vue", () => {
//   it("renders properly", () => {
//     const wrapper = mount(LuiButton, { props: { type: "solid" } });
//     expect(wrapper.classes()).toContain("bg-primary-500");
//   });
// });
