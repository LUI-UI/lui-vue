const descriptions = {
  variant: "Controls a Lui component's appearance",
  narrowedVariant: "Controls a Lui component's appearance",
  block: 'Renders a full width Lui component (expands to the width of its parent container)',
  color: "Controls a Lui component's color",
  rounded:
    'Provides rendering of component corners without rounding, partially rounding, or completely rounding.',
  size: "Controls a Lui component's width, height and inline spacing options.",
  disabled: 'Controls active or passive state of a Lui component',
  border: '',
  state: 'Controls the state of a Lui component based on color',
  prepend: '',
  append: '',
  filter: 'Controls the tone of the color',
  description: 'Provides a descriptive text',
  icon: 'Provides an icon display',
  stateIcon: 'Provides a state icon display.'
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
  control: { type: 'select' },
  options: ['xs', 'sm', 'md', 'lg', 'xl'],
  description: descriptions.size
}
export const disabled = {
  control: 'boolean',
  options: [true, false],
  description: descriptions.disabled
}
export const border = {
  control: 'boolean',
  options: [true, false],
  description: descriptions.border
}
export const prepend = {
  control: 'select',
  options: ['home', 'add-circle', 'close', 'none'],
  description: descriptions.prepend
}
export const append = {
  control: 'select',
  options: ['home', 'add-circle', 'close', 'none'],
  description: descriptions.append
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
export const state = {
  control: { type: 'select' },
  options: ['warning', true, false, null],
  description: descriptions.state
}
export const icon = {
  control: 'select',
  options: ['home', 'add-circle', 'close', 'none'],
  description: descriptions.icon
}
export const stateIcon = {
  control: { type: 'boolean' },
  options: [true, false],
  description: descriptions.stateIcon
}
