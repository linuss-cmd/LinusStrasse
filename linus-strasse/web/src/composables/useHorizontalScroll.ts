import { onMounted, onUnmounted, type Ref } from 'vue'

// Redirects vertical mouse wheel scrolling to horizontal scrolling on the container.
// Trackpad horizontal swipes (deltaX dominant) are passed through to the browser as-is.
export function useHorizontalScroll(containerRef: Ref<HTMLElement | null>): void {
  function onWheel(event: WheelEvent): void {
    const el = containerRef.value
    if (!el) return

    // If horizontal movement dominates (trackpad swipe), let the browser handle it.
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

    // Vertical wheel: redirect to horizontal scroll.
    event.preventDefault()
    el.scrollLeft += event.deltaY
  }

  onMounted(() => {
    const el = containerRef.value
    if (!el) return
    // passive: false is required to allow preventDefault()
    el.addEventListener('wheel', onWheel, { passive: false })
  })

  onUnmounted(() => {
    const el = containerRef.value
    if (!el) return
    el.removeEventListener('wheel', onWheel)
  })
}
