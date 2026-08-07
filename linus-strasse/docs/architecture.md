# Architecture — linus-strasse / dirtyclarks.com

## Current System (Hello World)

```
Browser
  │
  ▼
[Traefik] (:80/:443, TLS via Let's Encrypt)
  │
  ├──  Host(dirtyclarks.com)           → [Vue SPA — nginx:80]
  │       index.html + assets
  │       onMounted: fetch /api/hello
  │                       │
  └── Host(dirtyclarks.com) &&          → [Go API — :8080]
      PathPrefix(/api)                      GET /health  → {"status":"ok"}
                                            GET /api/hello → {"message":"Hello World"}

[Python Worker] — no-op, placeholder for background jobs

Infrastructure:
  Docker Compose on Hetzner VPS (178.104.117.28)
  GitHub Actions CI/CD → push to main → test → SSH deploy
```

## Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| Traefik | TLS termination, reverse proxy, routing by host+path |
| Vue SPA | User interface, served as static files via nginx |
| Go API | Business logic, data access, JSON API under /api/ |
| Python Worker | Background jobs (currently no-op) |

## Update this file whenever a new feature changes the architecture.
