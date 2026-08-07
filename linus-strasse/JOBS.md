# Linus Straße — Background Jobs

Sag einfach **"Linus hat neue iMessage Nachrichten geschrieben"** um alle Jobs neu zu starten.

## Job 1 — iMessage Poller (alle 2 min)

Linus' Handle: `+491605535009` | Chat-ID: `any;-;+491605535009`

Prüft alle 2 Minuten ob Linus neue Website-Anforderungen geschickt hat und führt den kompletten 7-Schritt-Workflow aus (Verstehen → Stories → GitHub Issues → Implementieren → Code Review → PR → Merge → Deploy-Bestätigung).

Letzte verarbeitete Nachricht: `/tmp/linus_last_processed_ts`

## Job 2 — Pipeline Notify (alle 2 min)

Prüft die GitHub Actions Pipeline für `linuss-cmd/LinusStrasse`. Sobald ein Deploy auf `main` erfolgreich oder fehlgeschlagen ist, benachrichtigt er Linus per iMessage.

Letzter notifizierter Run: `/tmp/linus_last_notified_run_id`

## Job 3 — Sanity Check (alle 15 min)

Prüft Code-Qualität nach `.claude/sanity-check.md`:
- Vue component sizes (<200 Zeilen)
- TypeScript `any`
- `console.log` in Prod-Code
- Hardcoded Secrets
- Go ignored errors
- Live site erreichbar

## Offene Tasks
- [ ] YouTube-Kanal URL von Linus → in `web/src/config/buildings.ts` eintragen
- [ ] /contact Seite inhaltlich füllen
- [ ] /about Seite inhaltlich füllen
- [ ] GitHub Secrets für napkin-notes CI: `NAPKIN_DB_NAME`, `NAPKIN_DB_USER`, `NAPKIN_DB_PASSWORD`, `NAPKIN_JWT_SECRET`

## Server / Infra
- Server: `178.104.117.28` (root) — Credentials in `.env`
- `linusssaschek.com` → linus-strasse Stack (Portfolio)
- `dirtyclarks.com` → napkin-notes Stack (Napkin Notes App)
- Shared Traefik in `linus-strasse` Stack, Netzwerk: `traefik-public`
