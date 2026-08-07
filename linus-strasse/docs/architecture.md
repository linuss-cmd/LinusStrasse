# Architecture — linus-strasse / dirtyclarks.com

## Infrastructure

```
Browser
  │
  ▼
[Traefik] (:80/:443, TLS via Let's Encrypt)
  │
  ├── Host(dirtyclarks.com)          → [Vue SPA — nginx:80]
  │
  └── Host(dirtyclarks.com) &&       → [Go API — :8080]
      PathPrefix(/api)                   GET /health
                                         GET /api/hello

[Python Worker] — no-op placeholder

Docker Compose on Hetzner VPS (178.104.117.28)
GitHub Actions: push main → test-api / test-web / test-worker → deploy via SSH
```

## Frontend Architecture (Street Facade — issues #40–#43)

```
Browser viewport (100dvh)
  │
  ▼
App.vue
  └── StreetView.vue
        display: flex
        align-items: flex-end        ← all facades share bottom baseline
        height: 100dvh
        overflow-x: scroll
        │
        ├── BuildingFacade.vue       ← LinkedIn (Bürogebäude)
        │     <a href="...">
        │       <img height=100% width=auto loading=lazy>
        │     </a>
        │     hover: brightness(0.92) + scale(1.01)
        │
        ├── BuildingFacade.vue       ← YouTube (Kino)
        ├── BuildingFacade.vue       ← SoundCloud (Plattenladen)
        └── ...                      ← more buildings via buildings.ts

src/config/buildings.ts              ← single source of truth
  Building: { id, image, alt, action: BuildingAction }
  BuildingAction: external | internal | overlay

src/composables/useHorizontalScroll.ts
  wheel(deltaY dominant) → scrollLeft += deltaY
  wheel(deltaX dominant) → native browser handles

Background: body { background: var(--street-bg, #f5f5f0) }
```

## Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| Traefik | TLS termination, reverse proxy, host+path routing |
| Vue SPA (nginx) | Full portfolio UI, served as static files |
| StreetView.vue | Horizontal scroll container, wheel handler |
| BuildingFacade.vue | Single building: image, link, hover, a11y |
| buildings.ts | All building data — add new buildings here only |
| Go API | JSON API under /api/, health check |
| Python Worker | Background jobs (currently no-op) |

## Update this file whenever a new feature changes the architecture.
