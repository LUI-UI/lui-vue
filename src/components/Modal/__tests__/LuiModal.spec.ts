import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import LuiModal from '../LuiModal.vue'
import LuiButton from '../../Button/LuiButton.vue'

describe('LuiModal', () => {
  it('shows the modal when show prop is true', async () => {
    const myTemplate = {
      template: `<lui-modal :show="true">
        <lui-button tabindex>test</lui-button>
      </lui-modal>`,
      components: { LuiModal, LuiButton },
    }

    const wrapper = mount(myTemplate)

    // Wait for the next tick to ensure any reactivity updates have taken place
    await wrapper.vm.$nextTick()
    const modalInTeleport = document.querySelector('.lui-modal')
    expect(modalInTeleport).toBeTruthy()

    wrapper.unmount()
  })
  it('hides the modal when show prop is false', async () => {
    const showModal = ref(true)

    const myTemplate = {
      template: `<lui-modal :show="showModal" @close="showModal=false">
        <lui-button tabindex>test</lui-button>
      </lui-modal>`,
      components: { LuiModal, LuiButton },
      setup() {
        return {
          showModal,
        }
      },
    }

    const wrapper = mount(myTemplate)

    // Wait for the next tick to ensure any reactivity updates have taken place
    await wrapper.vm.$nextTick()

    let modalInTeleport = document.querySelector('.lui-modal')
    expect(modalInTeleport).toBeTruthy()

    const closeButton: HTMLElement | null = document.querySelector(
      '[data-testid="lui-modal-close-button"]',
    )
    if (closeButton)
      closeButton.click()

    // Wait for the next tick to ensure the modal has had time to close
    await wrapper.vm.$nextTick()

    expect(showModal.value).toBe(false)
    modalInTeleport = document.querySelector('.lui-modal')
    expect(modalInTeleport).toBeFalsy()
    wrapper.unmount()
  })
  it('teleports the modal to desired teleportId', async () => {
    const myTemplate = {
      template: `<lui-modal>
        <lui-button tabindex>test</lui-button>
      </lui-modal>`,
      components: { LuiModal, LuiButton },
    }
    const wrapper = mount(myTemplate)
    const desiredId = (wrapper.findComponent(LuiModal).vm as any).teleportId
    // access the lui-modal inside of the teleport with the desiredId
    expect(document.querySelector(`body #${desiredId} .lui-modal`)).toBeFalsy()
    await wrapper.setProps({
      show: true,
    })
    expect(document.querySelector(`body #${desiredId} .lui-modal`)).toBeTruthy()
    wrapper.unmount()
  })
  // it("renders default slot content properly", () => {
  //   const content = `<div class="w-full">
  //   <h2 class="text-xl font-bold mb-4">Information message</h2>
  //   <p class="mb-6">
  //     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
  //   </p>
  // </div>
  // <div class="flex space-x-3 ml-auto">
  //   <button >Confirm</button>
  //   <button @click="showModal=false">Cancel</button>
  // </div>`;
  //   const wrapper = mount(LuiModal, {
  //     slots: {
  //       default: { content },
  //     },
  //   });
  //   // expect(wrapper.html()).toContain(content);
  // });
})

describe('LuiModal showIcon prop', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    const myTemplate = {
      template: `<lui-modal :show="true">
        <lui-button tabindex>test</lui-button>
      </lui-modal>`,
      components: { LuiModal, LuiButton },
    }

    wrapper = mount(myTemplate)
  })
  afterEach(() => {
    wrapper.unmount()
  })
  it('shows the icon when prop is true', async () => {
    await wrapper.setProps({ showIcon: true })
    const iconInTeleport = document.querySelector(
      '[data-testid="lui-modal-close-button"]',
    )
    expect(iconInTeleport).toBeTruthy()
  })
  it('hiddens the icon when prop is false', async () => {
    await wrapper.setProps({ showIcon: false })
    const iconInTeleport = document.querySelector(
      '[data-testid="lui-modal-close-button"]',
    )
    expect(iconInTeleport).toBeFalsy()
  })
})
