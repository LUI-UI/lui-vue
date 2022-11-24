export const variant = {
  name: "variant",
  control: "select",
  options: ["solid", "outline", "text", "link"],
  type: { name: "solid", required: false },
  table: {
    type: { summary: '"solid", "outline", "text", "link"' },
  },
  description: "Controls Lui component appearence",
};
export const narrowedVariant = {
  name: "variant",
  control: "select",
  options: ["solid", "outline"],
  type: { name: "solid", required: false },
  table: {
    type: { summary: '"solid", "outline"' },
  },
  description: "Controls Lui component appearence",
};
export const color = {
  name: "color",
  control: "select",
  options: ["primary", "secondary", "success", "danger", "warning", "info"],
  type: { name: "color", required: false },
  table: {
    type: { summary: '"primary", "secondary", "success", "danger", "warning", "info"' },
  },
  description: "Lui components color options",
};
export const block = {
  name: "block",
  control: "boolean",
  options: [true, false],
  type: { name: "block", required: false },
  table: {
    type: { summary: 'true, false' },
  },
  description: "Renders a 100% width Lui component (expands to the width of its parent container)",
};
export const rounded = {
  name: "rounded",
  control: "select",
  options: [true, false, "full"],
  type: { name: "rounded", required: false },
  table: {
    type: { summary: 'true, false, "full"' },
  },
  description: "Provides rendering of component corners without rounding, partially rounding, or completely rounding.",
};
export const disabled = {
  control: "boolean",
  options: [true, false],
};
export const border = {
  control: "boolean",
  options: [true, false],
};
export const prepend = {
  control: "select",
  options: ["home", "add-circle", "close", "none"],
};
export const append = {
  control: "select",
  options: ["home", "add-circle", "close", "none"],
};
export const size = {
  name: "size",
  type: { name: "string", required: false },
  table: {
    type: { summary: '"xs", "sm", "md", "lg", "xl"' },
  },
  control: { type: "select" },
  options: ["xs", "sm", "md", "lg", "xl"],
  description: "Lui Component width, height and inline spacing options.",
};
export const filter = {
  control: "select",
  options: ["lighten", "darken", "none"],
};
export const icon = {
  control: "select",
  options: ["home", "add-circle", "close", "none"],
};
export const description = {
  control: "text",
};
export const state = {
  control: { type: "select" },
  options: ["warning", true, false, null],
};
