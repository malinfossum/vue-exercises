import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders the heading and the counter', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Vue exercises')
    expect(wrapper.text()).toContain('Count')
  })
})
