import { shallowMount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'

/*
 * https://reactgo.com/vue-testing-mount-vs-shallowmount/#:~:text=The%20shallowMount%20method%20also%20works,not%20included%20in%20the%20test.
 * The shallowMount method also works similar to the mount method the main difference is shallowMount doesn’t render child components so that it allows us to test the component in isolation to make sure that child components are not included in the test.
 */

describe('Pagination', () => {
  /*
   * https://jestjs.io/docs/api#testname-fn-timeout
   * it is an alias of test.
   * They are exactly the same.
   */
  it('If total <= 5 pages (default) first page button and left ... should NOT be showing', () => {
    const wrapper = shallowMount(Pagination)
    const leftSeparator = wrapper.find('[data-testid="separator-left"]')
    const firstPage = wrapper.find('[data-testid="page-first"]')
    expect(firstPage.exists()).toBe(false)
    expect(leftSeparator.exists()).toBe(false)
  })

  it('If total <= 5 pages (default) last page button and right ... should NOT be showing', () => {
    const wrapper = shallowMount(Pagination)
    const rightSeparator = wrapper.find('[data-testid="separator-right"]')
    const lastPage = wrapper.find('[data-testid="page-last"]')

    expect(rightSeparator.exists()).toBe(false)
    expect(lastPage.exists()).toBe(false)
  })

  it('If total 6 pages, current page is 1, first page button and left ... should NOT be showing', () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        pages: 6
      }
    })

    const leftSeparator = wrapper.find('[data-testid="separator-left"]')
    const firstPage = wrapper.find('[data-testid="page-first"]')

    expect(firstPage.exists()).toBe(false)
    expect(leftSeparator.exists()).toBe(false)
  })

  it('If total 6 pages, current page is 1, last page button should show 6 and right ... should be showing', () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        pages: 6
      }
    })

    const rightSeparator = wrapper.find('[data-testid="separator-right"]')
    const lastPage = wrapper.find('[data-testid="page-last"]')

    expect(rightSeparator.exists()).toBe(true)
    expect(lastPage.exists()).toBe(true)
    expect(lastPage.text()).toMatch('6')
  })

  it('If total 10 pages, current page is 5, first page button shows 1, left ... should be showing', () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        pages: 10,
        currentPage: 5,
        nextPage: 6
      }
    })

    const leftSeparator = wrapper.find('[data-testid="separator-left"]')
    const firstPage = wrapper.find('[data-testid="page-first"]')

    expect(firstPage.exists()).toBe(true)
    expect(leftSeparator.exists()).toBe(true)
    expect(firstPage.text()).toMatch('1')
  })

  it('If total 10 pages, current page is 5, last page button shows 10, right ... should be showing', () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        pages: 10,
        currentPage: 5,
        nextPage: 6
      }
    })

    const rightSeparator = wrapper.find('[data-testid="separator-right"]')
    const lastPage = wrapper.find('[data-testid="page-last"]')

    expect(rightSeparator.exists()).toBe(true)
    expect(lastPage.exists()).toBe(true)
    expect(lastPage.text()).toMatch('10')
  })

  it('If total 10 pages, current page is 5, pagination shows 3/4/5/6/7, page 5 should be highlighted', () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        pages: 10,
        currentPage: 5,
        nextPage: 6
      }
    })

    for (let i = 0; i < 5; i++) {
      const pageNumber = 5 - 2 + i
      const pagination = wrapper.find(`[data-testid="active-page-${i}"]`)

      expect(pagination.text()).toMatch(pageNumber.toString())

      if (wrapper.props().currentPage.toString() === pagination.text()) {
        expect(pagination.classes('page-current')).toBe(true)
      }
    }
  })
})
