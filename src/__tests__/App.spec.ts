import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders the heading and the counter', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Vue exercises')
    expect(wrapper.text()).toContain('Count')
  })

  it('opens and closes the About dialog', async () => {
    const wrapper = mount(App)
    expect(wrapper.find('dialog').exists()).toBe(false)
    await wrapper.get('header button').trigger('click')
    expect(wrapper.get('dialog').text()).toContain('About this app')
    await wrapper.get('dialog .actions button').trigger('click')
    expect(wrapper.find('dialog').exists()).toBe(false)
  })
})
