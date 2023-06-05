const descriptions = {
  variant: "Controls the component's appearance",
  narrowedVariant: "Controls the component's appearance",
  block: 'Renders a full width component (expands to the width of its parent container)',
  color: "Controls the component's color",
  text: 'Used to place a text in the component',
  rounded: "Controls the rounding of the component's corners",
  size: "Controls the component's width, height and inline spacing options",
  stateIcon:
    'Provides a state icon inside the component and is used for validation and error handling',
  state:
    'Provides a colored border around the component and is used for validation and error handling',
  filter: "Controls the tone of the component's color",
  description: 'Used to add a description to the component',
  border: "Controls the component's border"
}

export const variant = {
  control: 'select',
  options: ['solid', 'outline', 'text', 'link'],
  description: descriptions.variant
}
export const narrowedVariant = {
  control: 'select',
  options: ['solid', 'outline'],
  description: descriptions.narrowedVariant
}
export const block = {
  control: 'boolean',
  options: [true, false],
  description: descriptions.block
}
export const border = {
  control: 'boolean',
  options: [true, false],
  description: descriptions.block
}
export const color = {
  control: 'select',
  options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger'],
  description: descriptions.color
}
export const rounded = {
  control: 'select',
  options: [true, false, 'full'],
  description: descriptions.rounded
}
export const size = {
  control: 'select',
  options: ['xs', 'sm', 'md', 'lg', 'xl'],
  description: descriptions.size
}
export const stateIcon = {
  control: 'boolean',
  options: [true, false],
  description: descriptions.stateIcon
}
export const state = {
  control: 'select',
  options: ['warning', true, false, null],
  description: descriptions.state
}
export const filter = {
  control: 'select',
  options: ['lighten', 'darken', 'none'],
  description: descriptions.filter
}
export const description = {
  control: 'text',
  description: descriptions.description
}
export const text = {
  control: 'text',
  description: descriptions.text
}
