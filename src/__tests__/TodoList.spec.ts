import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from '../components/TodoList.vue'

// The parent and its three children working together, driven like a user would.
describe('TodoList', () => {
  it('adds, toggles and deletes a task through the child components', async () => {
    const wrapper = mount(TodoList)

    await wrapper.get('#new-task').setValue('  Push to GitHub  ')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.findAll('li')).toHaveLength(3)
    expect(wrapper.text()).toContain('3 tasks, 1 done')

    await wrapper.findAll('input[type="checkbox"]')[2]!.setValue(true)
    expect(wrapper.text()).toContain('3 tasks, 2 done')

    await wrapper.get('button[aria-label="Delete Push to GitHub"]').trigger('click')
    expect(wrapper.get('dialog').text()).toContain('"Push to GitHub" will be deleted')
    await wrapper.get('button.danger').trigger('click')
    expect(wrapper.find('dialog').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Push to GitHub')
    expect(wrapper.text()).toContain('2 tasks, 1 done')
  })

  it('keeps the task when the delete dialog is closed with OK or Esc', async () => {
    const wrapper = mount(TodoList)

    await wrapper.get('button[aria-label="Delete Buy coffee"]').trigger('click')
    await wrapper.get('dialog button[autofocus]').trigger('click')
    expect(wrapper.find('dialog').exists()).toBe(false)

    await wrapper.get('button[aria-label="Delete Buy coffee"]').trigger('click')
    await wrapper.get('dialog').trigger('cancel')
    expect(wrapper.find('dialog').exists()).toBe(false)
    expect(wrapper.findAll('li')).toHaveLength(2)
  })

  it('ignores a task that is only spaces', async () => {
    const wrapper = mount(TodoList)
    await wrapper.get('#new-task').setValue('   ')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.findAll('li')).toHaveLength(2)
  })

  it('filters the list and says when nothing matches', async () => {
    const wrapper = mount(TodoList)
    await wrapper.get('#filter').setValue('coffee')
    expect(wrapper.findAll('li')).toHaveLength(1)
    await wrapper.get('#filter').setValue('nothing here')
    expect(wrapper.text()).toContain('No tasks match "nothing here"')
  })
})
