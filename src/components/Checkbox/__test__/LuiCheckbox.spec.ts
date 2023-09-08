import { expect, it } from 'vitest'
import type { DOMWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import LuiCheckbox from '../LuiCheckbox.vue'

// Test Cases for checkbox:

//  v-model ile 3 farklı kullanım seklinin test edilmesi:

// boolean: v-model boolean bir degerse checkbox her değiştiğinde o deger değişmeli,
// array: eğer v-model bir arrayse, checkbox kendisine value olarak verilen degeri secili oldugunda array e pushlamali secim kaldirildiginda arrayden silmeli (bu kullanımda checkbox a mutlaka value degeri verilmeli),
// customValue: customValue native html inputun desteklediği bir özellik degil ancak vue destekliyor, checkbox a true-value ve false-value diye 2 tane attribute ekliyoruz, true-value=“yes” false-value=“no”, checkbox secili ise v-model ile baglanmis degeri yes e degilse no ya eşitliyor.

// Change eventinin test edilmesi: change eventi, her input degeri degistiginde firlatilmali ve native html elementi ile ayni eventi gondermeli,

// Disabled testi
// Attribute inheretince testi
// indeterminate testi
// Prop testleri (tum proplarin dogru sekilde calisip calismadigi test edilmeli)

// <lui-checkbox v-model="boolean" />
// <lui-checkbox v-model="string[]" />
// <lui-checkbox v-model="custom" true-value="yes" false-value="no" />

it('works properly with boolean v-model', async () => {
  const wrapper = mount(LuiCheckbox)
  const inputEl = wrapper.find(
    '[data-testid=\'lui-checkbox-input\']',
  ) as DOMWrapper<HTMLInputElement>
  expect(inputEl.exists()).toBe(true)
  // initally input element is not checked

  expect(inputEl.element.checked).toBe(false)
  // check if v-model working properly when input's value changed by testing emitted values
  inputEl.setValue(true)

  await wrapper.vm.$nextTick()
  expect(wrapper.emitted('change')).toBeTruthy()
  // since the change emit gives the handleVModel(event) and event [0][0] is the way to get the value

  expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(true)
  //   expect(wrapper.emitted('change')?.[0][0]).toBe(true)

  // tests for click event working properly
  expect(inputEl.element.checked).toBe(true)
  inputEl.trigger('click')
  await expect(inputEl.element.checked).toBe(false)
})

it('works properly with array v-model', async () => {
  const checkedNames = ref([])
  const wrapperForJohn = mount(LuiCheckbox, {
    props: {
      modelValue: checkedNames.value,
      value: 'John',
    },
  })
  const wrapperForJack = mount(LuiCheckbox, {
    props: {
      modelValue: checkedNames.value,
      value: 'Jack',
    },
  })

  const checkboxInputForJohn = wrapperForJohn.find(
    '[data-testid="lui-checkbox-input"]',
  ) as any
  const checkboxInputForJack = wrapperForJack.find(
    '[data-testid="lui-checkbox-input"]',
  ) as any

  checkboxInputForJohn.setChecked(true)
  expect(checkedNames.value).toEqual(['John'])
  checkboxInputForJack.setChecked(true)

  expect(checkedNames.value).toEqual(['John', 'Jack'])
  checkboxInputForJohn.setChecked(false)
  expect(checkedNames.value).toEqual(['Jack'])
})

it('works properly with customValue', async () => {
  const customValue = ref()
  const wrapper = mount(LuiCheckbox, {
    props: {
      trueValue: 'positive',
      falseValue: 'negative',
      modelValue: customValue.value,
    },
  })
  const inputEl = wrapper.find(
    '[data-testid=\'lui-checkbox-input\']',
  ) as any

  // Initially, it should be unchecked ('negative')
  expect(inputEl.element.checked).toBe(false)

  // Simulate checking the checkbox ('positive')
  await inputEl.setChecked(true)

  // After setting it checked, it should be 'positive'
  expect(inputEl.element.checked).toBe(true)

  expect(wrapper.props().modelValue).toBe('positive')

  // Simulate unchecking the checkbox ('negative')
  await inputEl.setChecked(false)

  // After setting it unchecked, it should be 'negative'
  expect(inputEl.element.checked).toBe(false)
})
