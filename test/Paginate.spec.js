import { mount } from '@vue/test-utils'
import Paginate from '@/components/Paginate.vue'

describe('Paginate', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Paginate, {
      propsData: {
        totalPages: 5,
        total: 50,
        perPage: 10,
        currentPage: 2,
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
