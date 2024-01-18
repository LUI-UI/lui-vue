import { computed, toRef } from 'vue'

export function useGlobalCheckbox(props: any, attrs: any) {
  const modelValueAsArray = toRef(props, 'modelValue')
  const handleVModel = function (e: any) {
    if (typeof props.modelValue === 'boolean' || props.modelValue === undefined)
      return e.target.checked
    if (e.target.checked) {
      modelValueAsArray.value.push(e.target.value)
    }
    else {
      const index = modelValueAsArray.value.indexOf(e.target.value)
      modelValueAsArray.value.splice(index, 1)
    }
    return modelValueAsArray.value
  }

  const isInputChecked = computed(() => {
    return props.modelValue === undefined
      ? attrs.checked !== undefined
        ? attrs.checked
        : false
      : typeof props.modelValue === 'boolean'
        ? props.modelValue
        : modelValueAsArray.value.includes(props.value)
  })
  return { handleVModel, isInputChecked }
}
