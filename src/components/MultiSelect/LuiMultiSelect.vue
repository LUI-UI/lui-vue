<script setup lang="ts">
import type { Rounded, Block, Size, State, StateIcon, Description } from '@/globals/types'
import type { PropType } from 'vue'
import type { OptionsType, ModelValue } from '../Select/select-types'
import LuiBadge from '../Badge/LuiBadge.vue'

defineProps({
  rounded: {
    type: [Boolean, String] as PropType<Rounded>,
    default: false
  },
  block: {
    type: Boolean as PropType<Block>,
    default: false
  },
  state: {
    type: [String, Boolean, null] as PropType<State>,
    default: null
  },
  stateIcon: {
    type: [Boolean] as PropType<StateIcon>,
    default: null
  },
  options: {
    type: Array as PropType<OptionsType>,
    default: () => []
  },
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  size: {
    type: String as PropType<Size>,
    default: 'md'
  },
  description: {
    type: [String, null] as PropType<Description>,
    default: null
  },
  searchable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  modelValue: {
    type: [Object, String, undefined] as PropType<ModelValue>,
    default: undefined
  }
})
// Props: max-length, selectedItemType
// Template:
// a11y
// functions
const names = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' }
]
</script>
<template>
  <div
    tabindex="0"
    class="flex flex-wrap w-64 py-2 px-4 border border-secondary-200 rounded-sm bg-white focus-within:border-primary-500"
  >
    <LuiBadge v-for="{ id, name } in names" :key="id" size="xs" :text="name" />
    <input type="text" />
  </div>
</template>
