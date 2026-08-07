import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows loading initially', () => {
    global.fetch = vi.fn(() => new Promise(() => {})) as unknown as typeof fetch
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Loading')
  })

  it('displays message from API', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ message: 'Hello World' }) })
    ) as unknown as typeof fetch

    const wrapper = mount(App)
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Hello World')
  })

  it('shows error when API fails', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('network'))) as unknown as typeof fetch

    const wrapper = mount(App)
    await flushPromises()
    expect(wrapper.find('.error').text()).toContain('Failed to reach API')
  })
})
