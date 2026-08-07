import { describe, it, expect } from 'vitest'
import { buildings } from '../config/buildings'

describe('buildings config', () => {
  it('has at least one building', () => {
    expect(buildings.length).toBeGreaterThan(0)
  })

  it('every building has a unique id', () => {
    const ids = buildings.map(b => b.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every building has a non-empty alt text', () => {
    for (const b of buildings) {
      expect(b.alt.trim().length).toBeGreaterThan(0)
    }
  })

  it('every building has positive natural dimensions', () => {
    for (const b of buildings) {
      expect(b.naturalWidth).toBeGreaterThan(0)
      expect(b.naturalHeight).toBeGreaterThan(0)
    }
  })

  it('every building has a valid action type', () => {
    const validTypes = ['external', 'internal', 'overlay']
    for (const b of buildings) {
      expect(validTypes).toContain(b.action.type)
      expect(b.action.target.trim().length).toBeGreaterThan(0)
    }
  })
})
