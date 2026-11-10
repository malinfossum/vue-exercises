import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from '../components/TodoItem.vue'

// Props in -> what is shown. User action -> what is emitted.
describe('TodoItem', () => {
  const task = { id: 1, text: 'Buy coffee', done: false }

  it('shows the text from props', () => {
    const wrapper = mount(TodoItem, { props: { task } })
    expect(wrapper.text()).toContain('Buy coffee')
  })

  it('emits toggle with the id when checked', async () => {
    const wrapper = mount(TodoItem, { props: { task } })
    await wrapper.get('input[type="checkbox"]').trigger('change')
    expect(wrapper.emitted('toggle')).toEqual([[1]])
  })

  it('emits remove with the id when Delete is clicked', async () => {
    const wrapper = mount(TodoItem, { props: { task } })
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('remove')).toEqual([[1]])
  })

  it('marks a done task with the done class', () => {
    const wrapper = mount(TodoItem, { props: { task: { ...task, done: true } } })
    expect(wrapper.find('span').classes()).toContain('done')
  })
})
