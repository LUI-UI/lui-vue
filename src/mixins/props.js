
export function variant(name, defaultValue) {
  return {
    props: {
      [name || 'variant']: {
        type: String,
        default: defaultValue || 'primary',
        validator(value) {
          const list =
            name === 'variant'
              ? ['primary', 'secondary', 'info', 'success', 'warning', 'danger']
              : [
                  'light',
                  'dark',
                  'white',
                  'black',
                  'primary',
                  'secondary',
                  'info',
                  'success',
                  'warning',
                  'danger',
                ]
          return list.includes(value)
        },
      },
    },
  }
}

export function filter(name) {
  return {
    props: {
      [name || 'filter']: {
        type: String,
        default: 'none',
        validator(value) {
          return ['darker', 'lighter', 'none'].includes(value)
        },
      },
    },
  }
}

export function size(defaultValue, validator) {
  const sizes = ['2xs', 'xs', 'sm', 'md', 'lg']
  const options = validator || sizes
  return {
    props: {
      size: {
        type: String,
        default: defaultValue || 'md',
        validator: (value) => options.includes(value),
      },
    },
  }
}

export function boolean(name, defaultValue) {
  return {
    props: {
      [name]: {
        type: Boolean,
        default: defaultValue || false,
      },
    },
  }
}
export function string(name, defaultValue, validator) {
  let propOptions = {
    type: String,
    default: defaultValue || '',
  }
  if (validator !== undefined) {
    propOptions.validator = (value) => validator.includes(value)
  }
  return {
    props: {
      [name]: propOptions,
    },
  }
}
