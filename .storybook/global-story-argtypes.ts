const descriptions = {
  variant: 'Controls Lui component appearence',
  narrowedVariant: 'Controls Lui component appearence',
  block: 'Renders a 100% width Lui component (expands to the width of its parent container)',
  rounded:
    'Provides rendering of component corners without rounding, partially rounding, or completely rounding.',
  size: 'Lui Component width, height and inline spacing options.',
  stateIcon: 'Controls state icon display.'
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
export const color = {
  description: 'Lui components color options',
  options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger']
}
export const block = {
  control: 'boolean',
  description: descriptions.block
}
export const rounded = {
  control: 'select',
  options: [true, false, 'full'],
  description: descriptions.rounded
}
export const disabled = {
  control: 'boolean',
  options: [true, false]
}
export const border = {
  control: 'boolean',
  options: [true, false]
}
export const prepend = {
  control: 'select',
  options: ['home', 'add-circle', 'close', 'none']
}
export const append = {
  control: 'select',
  options: ['home', 'add-circle', 'close', 'none']
}
export const size = {
  control: 'select',
  options: ['xs', 'sm', 'md', 'lg', 'xl'],
  description: descriptions.size
}
export const filter = {
  control: 'select',
  options: ['lighten', 'darken', 'none']
}
export const icon = {
  control: 'select',
  options: ['home', 'add-circle', 'close', 'none']
}
export const description = {
  control: 'text'
}
export const state = {
  control: 'select',
  options: ['warning', true, false, null]
}
export const stateIcon = {
  control: 'boolean',
  description: descriptions.stateIcon
}
