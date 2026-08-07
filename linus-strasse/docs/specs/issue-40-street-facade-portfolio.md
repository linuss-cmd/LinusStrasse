# Technical Spec — Street Facade Portfolio
**Issues:** #40 (Layout), #41 (Horizontal Scroll), #42 (Hover & Click), #43 (Modular System)

## Problem
Linus needs a personal portfolio that doesn't look like a generic portfolio. The concept: a horizontal street of building facades, where each facade links to a part of his digital world. The architecture itself is the navigation.

## Solution
Replace the current Hello World SPA with a full-viewport horizontal street scene. Built on the existing Vue 3 + TypeScript stack. No new JS libraries. Pure CSS layout, native scroll APIs.

Chosen over alternatives:
- **No CSS transforms / fake 3D** — would distort the artwork
- **No scroll library (Locomotive, GSAP)** — unnecessary dependency, native feels better
- **No canvas rendering** — overkill, no dynamic manipulation needed

## Architecture

```
linus-strasse/web/src/
├── config/
│   └── buildings.ts          # Single source of truth for all buildings
├── components/
│   ├── StreetView.vue         # Full-viewport scroll container + wheel handler
│   └── BuildingFacade.vue     # Single building: image + a11y link wrapper
├── composables/
│   └── useHorizontalScroll.ts # Wheel event → scrollLeft logic
├── App.vue                    # Mounts StreetView, sets background CSS var
└── main.ts
```

## API Contract
None — this is frontend-only. No new API endpoints required.

## Data Model

```typescript
// src/config/buildings.ts

export type BuildingAction =
  | { type: 'external'; target: string }   // opens in new tab
  | { type: 'internal'; target: string }   // vue-router push
  | { type: 'overlay'; target: string }    // future: show overlay panel

export interface Building {
  id: string           // unique, used as :key
  image: string        // path relative to /public/buildings/
  alt: string          // descriptive alt text
  width?: number       // natural image width hint (avoids layout shift)
  height?: number      // natural image height hint
  action: BuildingAction
}

export const buildings: Building[] = [
  {
    id: 'linkedin',
    image: '/buildings/placeholder-linkedin.svg',
    alt: 'Bürogebäude — LinkedIn Profil von Linus',
    action: { type: 'external', target: 'https://linkedin.com' },
  },
  {
    id: 'youtube',
    image: '/buildings/placeholder-youtube.svg',
    alt: 'Kino — YouTube Kanal von Linus',
    action: { type: 'external', target: 'https://youtube.com' },
  },
  {
    id: 'soundcloud',
    image: '/buildings/placeholder-soundcloud.svg',
    alt: 'Plattenladen — SoundCloud Musik von Linus',
    action: { type: 'external', target: 'https://soundcloud.com' },
  },
]
```

## Frontend

### Component tree
```
App.vue
└── StreetView.vue            (overflow-x: scroll, display: flex, height: 100dvh)
    ├── BuildingFacade.vue    (building #1)
    ├── BuildingFacade.vue    (building #2)
    └── BuildingFacade.vue    (building #3 ...)
```

### Layout rules
- `StreetView`: `display: flex; align-items: flex-end; height: 100dvh; overflow-x: scroll; overflow-y: hidden`
- `BuildingFacade`: `flex-shrink: 0; height: 100%; width: auto` — image fills height, width follows aspect ratio
- No gap, no padding, no margin between buildings
- Background: `var(--street-bg, #f5f5f0)` on body — changeable via one CSS variable

### Horizontal scroll (useHorizontalScroll.ts)
```
wheel event fired
  → if abs(deltaY) > abs(deltaX): prevent default, scrollLeft += deltaY
  → if deltaX dominant (trackpad): let browser handle natively
```
Passive: false on the listener. Attached to the StreetView container ref.

### Hover (BuildingFacade.vue)
```css
.building:hover { filter: brightness(0.92); transform: scale(1.01); }
transition: filter 120ms ease, transform 120ms ease;
```
No overlay. No text. No buttons injected over the image.

### Keyboard / A11y
- Each building wrapped in `<a>` (external) or `<RouterLink>` (internal)
- `tabindex="0"` where needed
- `alt` text required in buildings.ts — TypeScript enforces it
- Focus ring: `outline: 2px solid currentColor; outline-offset: 2px`

### Performance
- `loading="lazy"` on all `<img>` tags except the first two
- `width` + `height` attributes set from buildings.ts to prevent layout shift
- Placeholder SVGs are < 1KB each
- When Linus provides real images: drop them in `/public/buildings/`, update path in buildings.ts — done

## Out of scope
- Mobile/responsive layout (separate story later)
- Overlay panel content (just the type: 'overlay' hook for now)
- Image optimisation pipeline (WebP conversion etc.) — when real images arrive

## Open questions
- None — Linus confirmed to proceed with placeholders
