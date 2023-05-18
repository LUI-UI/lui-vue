const descriptions = {
  variant: "Controls a Lui component's appearance",
  narrowedVariant: "Controls a Lui component's appearance",
  block: 'Renders a full width Lui component (expands to the width of its parent container)',
  color: "Controls a Lui component's color",
  rounded:
    'Provides rendering of component corners without rounding, partially rounding, or completely rounding.',
  size: "Controls a Lui component's width, height and inline spacing options.",
  stateIcon: 'Provides a state icon display.',
  // border: '',
  state: 'Controls the state of a Lui component based on color',
  // filter: 'Controls the tone of the color',
  description: 'Provides a descriptive text'
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
  description: descriptions.stateIcon
}
// export const border = {
//   control: 'boolean',
//   options: [true, false],
//   description: descriptions.border
// }
export const state = {
  control: 'select',
  options: ['warning', true, false, null],
  description: descriptions.state
}
// export const filter = {
//   control: 'select',
//   options: ['lighten', 'darken', 'none'],
//   description: descriptions.filter
// }
export const description = {
  control: 'text',
  description: descriptions.description
}
