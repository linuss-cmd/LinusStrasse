# linus-strasse Project

## Purpose
Website for Linus, built iteratively based on requirements he sends via iMessage.
Deploy always via GitHub Actions pipeline (push to main → CI → deploy to dirtyclarks.com).

## Stack
- **API**: Go (net/http + chi) — `services/api/`
- **Worker**: Python — `services/fontforge/`
- **Frontend**: Vue 3 + TypeScript (Vite) — `web/`
- **Infra**: Docker Compose + Traefik, deployed to Hetzner VPS at 178.104.117.28
- **Domain**: dirtyclarks.com

---

## Workflow — Every request goes through this exact flow. No shortcuts.

### Step 1 — Understand
- Ask clarifying questions via iMessage until the requirement is unambiguous
- Confirm: what problem does this solve? What does "done" look like exactly?
- Push back on vague, over-engineered, or low-value requests with clear reasoning
- Only proceed once you have a clear, agreed-upon requirement in writing

### Step 2 — Architecture Diagram + Technical Spec
Before writing any code, produce two artefacts and share them with Linus via iMessage for sign-off:

**A) Architecture Diagram** (ASCII, committed to `docs/architecture.md`):
- Show all affected components and their relationships
- Mark new/changed components clearly
- Include data flow direction (→) between components
- Example format:
  ```
  Browser → [Vue SPA] → /api/endpoint → [Go Handler] → [Service] → [DB/External]
  ```

**B) Technical Specification** (committed to `docs/specs/issue-{N}-{title}.md`):
```markdown
## Problem
One sentence: what user pain does this solve?

## Solution
What we're building and why this approach over alternatives.

## API Contract (if applicable)
Request/response shapes, HTTP methods, error codes.

## Data Model (if applicable)
New fields, tables, or schema changes.

## Frontend (if applicable)
Component tree, state shape, user interactions.

## Out of scope
Explicitly list what this does NOT include.

## Open questions
Anything that needs Linus' input before implementation starts.
```
Do not proceed to Step 3 until Linus confirms the spec.

### Step 3 — Break into Stories
- Split into small, independently deployable user stories
- Format: "Als [Nutzer] möchte ich [Aktion], damit [Nutzen]"
- Each story must be testable and deployable on its own
- Maximum scope per story: something that can be implemented and reviewed in one sitting
- Share the story list with Linus via iMessage for confirmation before creating issues

### Step 4 — GitHub Issues
Create one issue per story with this exact body template:

```markdown
## Story
Als [Nutzer] möchte ich [Aktion], damit [Nutzen].

## Acceptance Criteria
- [ ] Criterion 1 — specific, testable, unambiguous
- [ ] Criterion 2
- [ ] ...

## Technical Notes
Affected files, approach, constraints.

## Dependencies
- Depends on: #N (reason — must be merged first)
- Blocks: #N (reason — this must merge before that can start)
- Related: #N (context only, no hard dependency)

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Unit tests written and passing
- [ ] No TypeScript `any`, no Go unhandled errors
- [ ] Self code review passed (see quality gates)
- [ ] PR description explains the why, not just the what
- [ ] CI green
- [ ] Deployed and verified on dirtyclarks.com
```

Commands:
```bash
gh issue create --repo linuss-cmd/LinusStrasse --title "feat: ..." --body "..." --label "feature"
```
Reply to Linus with all issue links before starting implementation.

### Step 5 — Implement on feature branch
- One branch per issue: `git checkout -b feat/issue-{N}-short-description`
- Commits reference the issue: `feat: add X (#N)`
- Write tests before or alongside implementation — never after
- Keep commits atomic: one logical change per commit
- Follow all architecture rules below

### Step 6 — Quality Gates (must all pass before opening PR)

**Gate 1 — Correctness**
- All acceptance criteria from the issue are met
- `make test` passes with zero failures
- No test skipped or commented out
- Edge cases covered: empty state, error state, loading state (frontend); invalid input, missing env vars (backend)

**Gate 2 — Code Quality**
- No TypeScript `any` — use proper types or `unknown` with narrowing
- No Go error ignored (`_ =` on fallible calls is a blocker)
- No `console.log` in production code
- No component exceeds 200 lines — split if needed
- No function exceeds 40 lines — extract if needed
- No magic numbers or strings — use named constants
- No commented-out code committed
- Imports are all used — no dead imports

**Gate 3 — Architecture**
- Vue: business logic lives in composables/stores, not in `<script setup>` directly
- Go: handlers delegate to services; services contain business logic; no raw SQL in handlers
- No circular dependencies between modules
- New API endpoints follow REST conventions and are documented in the spec
- No new direct DB calls from frontend (always via API)

**Gate 4 — Security**
- No secrets, tokens, or credentials hardcoded anywhere
- All user-facing inputs validated (frontend: schema/type check; backend: explicit validation before use)
- No sensitive data logged
- CORS not wildcard `*` in production

**Gate 5 — Observability**
- Go: structured log lines for every handler entry/exit and every error
- Errors returned to the client never leak internal details (log detail, return generic message)
- New endpoints have a corresponding health/smoke test in the spec

**Gate 6 — Diff review**
Run `git diff main...HEAD` and answer:
- Does every changed line serve the acceptance criteria? Remove anything that doesn't.
- Is there any duplication that could be a shared helper?
- Would a new engineer understand this code without asking questions?

Fix every failure before opening the PR. A PR that fails any gate gets closed, not merged.

### Step 7 — Pull Request
```bash
gh pr create --repo linuss-cmd/LinusStrasse --base main \
  --title "feat: ..." \
  --body "$(cat <<'EOF'
## Summary
One sentence: what this PR does and why.

## Changes
- File/component: what changed and why

## Closes
Closes #N

## How to test
Step-by-step instructions to verify the feature works.

## Quality gates
- [x] Gate 1 — Correctness
- [x] Gate 2 — Code Quality
- [x] Gate 3 — Architecture
- [x] Gate 4 — Security
- [x] Gate 5 — Observability
- [x] Gate 6 — Diff review
EOF
)"
```
- Poll CI every 30s: `gh pr checks --repo linuss-cmd/LinusStrasse {pr-number}`
- Do not merge until all checks are green

### Step 8 — Merge
```bash
gh pr merge --repo linuss-cmd/LinusStrasse --squash --delete-branch {pr-number}
```
- Confirm deploy: `curl -sf https://dirtyclarks.com`
- Close the issue: `gh issue close --repo linuss-cmd/LinusStrasse {N}`
- Notify Linus (chat_id: any;-;+491605535009): what was built, which issue it closes, live URL

---

## Architecture Rules

### Vue / Frontend
- Single responsibility per component — one component does one thing
- No component > 200 lines, no function > 40 lines
- Business logic in composables (`use*.ts`), not inline in `<script setup>`
- State management in Pinia stores for anything shared across components
- No direct DOM manipulation — use `ref`/`reactive`/template refs
- API calls always via a typed client in `src/api/` — never raw `fetch` in components
- TypeScript strict mode — no `any`, no `as unknown as X` escape hatches

### Go / Backend
- Handlers are thin: parse input → call service → return response
- Services contain all business logic and are independently testable
- Repository pattern for data access — no raw SQL in handlers or services
- Every handler logs: request received, result (success/error), duration
- Errors wrapped with context: `fmt.Errorf("service.DoThing: %w", err)`
- Return 4xx for client errors, 5xx for server errors — never mix them
- API routes always under `/api/`

### General
- YAGNI — no abstractions until the third repetition
- No secrets in code — environment variables only
- No hardcoded domain names, IPs, or ports in application code

---

## Deploy
```bash
git push origin feat/issue-{N}-...
# → open PR → CI runs → merge → pipeline deploys automatically
```
Pipeline: `test-api → test-web → test-worker → deploy`

---

## Sanity Check (runs every 15 min)
- Component size and single responsibility
- Unused imports / dead code
- TypeScript `any` usage
- Go error handling (no ignored errors)
- No hardcoded secrets or URLs
- Live site reachable: `curl -sf https://dirtyclarks.com`
