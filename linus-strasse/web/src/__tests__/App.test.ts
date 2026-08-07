import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../App.vue'
import StreetView from '../components/StreetView.vue'

function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: StreetView }],
  })
}

describe('App', () => {
  it('mounts without errors', async () => {
    const router = makeRouter()
    await router.push('/')
    const wrapper = mount(App, { global: { plugins: [router] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the street view on /', async () => {
    const router = makeRouter()
    await router.push('/')
    const wrapper = mount(App, { global: { plugins: [router] } })
    expect(wrapper.find('.street').exists()).toBe(true)
  })
})
