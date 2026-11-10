import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppModal from '../components/AppModal.vue'

// Slots in -> what is shown. User action -> `close` emitted. The modal never
// closes itself; that is the parent's job.
describe('AppModal', () => {
  it('opens as a dialog and shows the default slot with a fallback OK button', () => {
    const wrapper = mount(AppModal, { slots: { default: '<p>Hello</p>' } })
    expect(wrapper.get('dialog').element.open).toBe(true)
    expect(wrapper.text()).toContain('Hello')
    expect(wrapper.get('.actions button').text()).toBe('OK')
  })

  it('emits close on OK, on Esc and on a backdrop click', async () => {
    const wrapper = mount(AppModal)
    await wrapper.get('.actions button').trigger('click')
    await wrapper.get('dialog').trigger('cancel')
    await wrapper.get('dialog').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(3)
  })

  it('does not close on a click inside the content', async () => {
    const wrapper = mount(AppModal, { slots: { default: '<p>Hello</p>' } })
    await wrapper.get('p').trigger('click')
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('names the dialog with the title slot and swaps OK for the actions slot', () => {
    const wrapper = mount(AppModal, {
      slots: { title: 'Delete this task?', actions: '<button>Cancel</button>' },
    })
    const id = wrapper.get('dialog').attributes('aria-labelledby')
    expect(wrapper.get(`#${id}`).text()).toBe('Delete this task?')
    expect(wrapper.get('.actions').text()).toBe('Cancel')
  })

  it('gives focus back to the button that opened it', () => {
    const opener = document.createElement('button')
    document.body.append(opener)
    opener.focus()

    const wrapper = mount(AppModal, { attachTo: document.body })
    // jsdom does not move focus on showModal(), so do what the browser does.
    ;(wrapper.get('.actions button').element as HTMLButtonElement).focus()
    wrapper.unmount()
    expect(document.activeElement).toBe(opener)
    opener.remove()
  })
})
