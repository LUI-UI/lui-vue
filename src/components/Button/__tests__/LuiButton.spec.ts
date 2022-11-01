import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import LuiButton from "../LuiButton.vue"

describe("LuiButton.vue", () => {
  it("renders properly", () => {
    const wrapper = mount(LuiButton, { props: { type: "solid" } });
    expect(wrapper.classes()).toContain("bg-primary-500");
  });
});
