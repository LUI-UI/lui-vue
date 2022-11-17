import { describe, it, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import LuiIcon from "../LuiIcon.vue"


describe("LuiButton.vue", () => {
  it("renders properly line icon with string type prop", () => {
    const wrapper = mount(LuiIcon, { props: { icon: "home" } });
    expect(wrapper.classes()).toEqual(['ri-home-line']);
  });

  it("renders properly fill icon", () => {
    const wrapper = mount(LuiIcon, { props: { icon: { name: 'home', type: 'fill' } } });
    expect(wrapper.classes()).toEqual(['ri-home-fill']);
  });

  it("renders properly typless icon", () => {
    const wrapper = mount(LuiIcon, { props: { icon: { name: 'text' } } });
    expect(wrapper.classes()).toEqual(['ri-text']);
  });

  it("renders properly 4xl icon", () => {
    const wrapper = mount(LuiIcon, { props: { icon: "home", size: '4xl' } });
    expect(wrapper.classes()).toEqual(['ri-home-line', 'text-4xl']);
  });
})