import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BuildingFacade from '../components/BuildingFacade.vue'
import type { Building } from '../config/buildings'

const externalBuilding: Building = {
  id: 'test-external',
  image: '/buildings/test.svg',
  alt: 'Test building',
  naturalWidth: 400,
  naturalHeight: 800,
  action: { type: 'external', target: 'https://example.com' },
}

describe('BuildingFacade', () => {
  it('renders image with correct alt and dimensions', () => {
    const wrapper = mount(BuildingFacade, { props: { building: externalBuilding } })
    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe('Test building')
    expect(img.attributes('width')).toBe('400')
    expect(img.attributes('height')).toBe('800')
  })

  it('sets aria-label from alt text', () => {
    const wrapper = mount(BuildingFacade, { props: { building: externalBuilding } })
    expect(wrapper.find('a').attributes('aria-label')).toBe('Test building')
  })

  it('opens external link in new tab on click', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const wrapper = mount(BuildingFacade, { props: { building: externalBuilding } })
    await wrapper.find('a').trigger('click')
    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer')
    openSpy.mockRestore()
  })

  it('has loading=lazy on image', () => {
    const wrapper = mount(BuildingFacade, { props: { building: externalBuilding } })
    expect(wrapper.find('img').attributes('loading')).toBe('lazy')
  })
})
