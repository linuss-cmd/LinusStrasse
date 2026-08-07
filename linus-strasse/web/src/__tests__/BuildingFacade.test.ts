import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import BuildingFacade from '../components/BuildingFacade.vue'
import type { Building } from '../config/buildings'

function makeRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div/>' } }, { path: '/contact', component: { template: '<div/>' } }] })
}

const externalBuilding: Building = {
  id: 'test-external',
  image: '/buildings/test.svg',
  alt: 'Test building',
  naturalWidth: 400,
  naturalHeight: 800,
  action: { type: 'external', target: 'https://example.com' },
}

const internalBuilding: Building = {
  id: 'test-internal',
  image: '/buildings/contact.png',
  alt: 'Contact Kiosk',
  naturalWidth: 1254,
  naturalHeight: 1254,
  action: { type: 'internal', target: '/contact' },
}

describe('BuildingFacade', () => {
  it('renders image with correct alt and dimensions', () => {
    const wrapper = mount(BuildingFacade, { props: { building: externalBuilding }, global: { plugins: [makeRouter()] } })
    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe('Test building')
    expect(img.attributes('width')).toBe('400')
    expect(img.attributes('height')).toBe('800')
  })

  it('sets aria-label from alt text', () => {
    const wrapper = mount(BuildingFacade, { props: { building: externalBuilding }, global: { plugins: [makeRouter()] } })
    expect(wrapper.find('a').attributes('aria-label')).toBe('Test building')
  })

  it('opens external link in new tab on click', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const wrapper = mount(BuildingFacade, { props: { building: externalBuilding }, global: { plugins: [makeRouter()] } })
    await wrapper.find('a').trigger('click')
    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer')
    openSpy.mockRestore()
  })

  it('calls router.push for internal buildings on click', async () => {
    const router = makeRouter()
    const pushSpy = vi.spyOn(router, 'push')
    const wrapper = mount(BuildingFacade, { props: { building: internalBuilding }, global: { plugins: [router] } })
    await wrapper.find('a').trigger('click')
    expect(pushSpy).toHaveBeenCalledWith('/contact')
  })

  it('has loading=lazy on image', () => {
    const wrapper = mount(BuildingFacade, { props: { building: externalBuilding }, global: { plugins: [makeRouter()] } })
    expect(wrapper.find('img').attributes('loading')).toBe('lazy')
  })
})
