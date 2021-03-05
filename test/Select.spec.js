import { mount } from '@vue/test-utils'
import Select from '@/components/form/Select.vue'

describe('Select', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Select)
    expect(wrapper.vm).toBeTruthy()
  })
})
