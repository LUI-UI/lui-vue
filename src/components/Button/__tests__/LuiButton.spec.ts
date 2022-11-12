import { describe, it, expect, test } from "vitest";

import { mount } from "@vue/test-utils";
import LuiButton from "../LuiButton.vue";

const defaultClasses = [
  "lui-button",
  "text-base",
  "leading-normal",
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
const sizeMD = ["px-5", "py-2"];
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
  it("renders properly icon element in button", () => {
    const wrapper = mount(LuiButton, { props: { prepend: "home" } });
    expect(wrapper.html()).toContain(
      '<i class="ri-home-line text-xl leading-none"></i>'
    );
  });
});

// describe("LuiButton.vue", () => {
//   it("renders properly", () => {
//     const wrapper = mount(LuiButton, { props: { type: "solid" } });
//     expect(wrapper.classes()).toContain("bg-primary-500");
//   });
// });
