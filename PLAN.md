# Analytics Dashboard Project Plan

## Product idea

**InsightPulse** — a small SaaS-style product analytics dashboard.

The app lets a user create a workspace, create a product/project, generate an API key, ingest product events, and view analytics such as event volume, active users, conversion funnels, retention, and feature usage.

This is intentionally **not geospatial** for v1. The goal is to practice modern JavaScript/TypeScript, full-stack product architecture, testing, database design, deployment, and portfolio-quality engineering without drifting into GIS complexity.

## Portfolio goal

Build a realistic full-stack prototype that demonstrates:

- React + TypeScript UI architecture
- Next.js App Router, routing, layouts, server/client components
- API design with Next.js Route Handlers
- PostgreSQL data modeling and migrations
- Authentication and protected app routes
- Analytics/data-heavy dashboard UI
- Unit, integration, and end-to-end tests
- GitHub Actions CI
- Auto deployment
- Event-driven/outbox-style processing as a later phase
- GraphQL as an optional API layer after the REST MVP is stable

## Core stack decision

Use **Next.js full-stack** first. Do **not** add Express in v1.

Reason: Next.js Route Handlers are enough for the prototype API, keep deployment simpler, and avoid maintaining two server runtimes before the product exists.

Proposed stack:

- App: Next.js + React + TypeScript
- UI: Tailwind CSS + shadcn/ui
- Data fetching/state: TanStack Query
- Tables: TanStack Table
- Charts: Recharts or Tremor/Recharts
- Forms: React Hook Form + Zod
- Auth: Better Auth or Auth.js, final choice during implementation spike
- Database: PostgreSQL on Neon
- ORM/migrations: Drizzle ORM + Drizzle Kit
- Local DB: Docker Compose PostgreSQL
- Tests: Vitest, React Testing Library, Playwright, MSW where useful
- CI/CD: GitHub Actions
- Deployment: Vercel first; Cloudflare Workers/OpenNext as later deployment spike

## Product scope

### Users

- Visitor can see landing page.
- User can register, login, logout.
- User can request password reset.
- Authenticated user can access dashboard.
- User belongs to one or more workspaces.

### Analytics domain

- Workspace owns projects.
- Project has API keys.
- API key can ingest events.
- Event has name, timestamp, user identifier, session identifier, properties, and source.
- Dashboard shows high-level metrics and charts.
- Funnels and retention are later phases, not day-one scope.

### Non-goals for v1

- No geospatial features.
- No Kafka or heavy message broker.
- No microservices.
- No separate Express API unless Next.js API becomes a real blocker.
- No production billing/payment.
- No multi-tenant enterprise permission model beyond basic workspace membership.

## Branch and deployment strategy

- `main`: stable branch, auto-deployed to production/demo.
- `feat/<ticket-id>-short-name`: one feature branch per ticket.
- Pull requests: required for each meaningful change.
- CI runs on every PR.
- Preview deployment per PR if platform supports it.
- Neon: use main database for demo, dev/test databases or branches for development/testing.
- Delete temporary DB branches after merge to avoid quota/storage drift.

## Milestones and tickets

### Milestone 0 — Project setup

| ID | Ticket | Short description |
|---|---|---|
| M0-01 | Bootstrap Next.js app | Create Next.js TypeScript app with App Router. |
| M0-02 | Add base tooling | Configure ESLint, Prettier, TypeScript strict mode. |
| M0-03 | Add UI foundation | Install Tailwind and shadcn/ui base components. |
| M0-04 | Add project structure | Create folders for app, components, lib, db, tests. |
| M0-05 | Add local env handling | Add `.env.example` and typed env validation. |

### Milestone 1 — Database foundation

| ID | Ticket | Short description |
|---|---|---|
| M1-01 | Add Docker Postgres | Add local PostgreSQL via Docker Compose. |
| M1-02 | Add Drizzle | Configure Drizzle ORM and Drizzle Kit. |
| M1-03 | Create first migration | Add users, workspaces, projects, memberships. |
| M1-04 | Add seed script | Generate demo workspace/project data. |
| M1-05 | Add DB health check | Add API route that validates DB connection. |

### Milestone 2 — Authentication

| ID | Ticket | Short description |
|---|---|---|
| M2-01 | Choose auth library | Compare Better Auth vs Auth.js and decide. |
| M2-02 | Register user | Implement email/password registration. |
| M2-03 | Login user | Implement login form and session handling. |
| M2-04 | Logout user | Implement logout and redirect behavior. |
| M2-05 | Protect app routes | Block dashboard routes for anonymous users. |
| M2-06 | Forgot password | Add password reset request flow. |
| M2-07 | Reset password | Add token-based password reset page. |

### Milestone 3 — App shell and dashboard UI

| ID | Ticket | Short description |
|---|---|---|
| M3-01 | Build app layout | Add sidebar, top nav, account menu. |
| M3-02 | Add dashboard route | Create protected dashboard home page. |
| M3-03 | Add metric cards | Show users, sessions, events, conversion. |
| M3-04 | Add chart components | Add time-series and breakdown charts. |
| M3-05 | Add data table | Add recent events table with sorting/filtering. |
| M3-06 | Add loading/error states | Standardize empty, loading, and error UI. |

### Milestone 4 — Analytics ingestion API

| ID | Ticket | Short description |
|---|---|---|
| M4-01 | Add API key model | Store hashed project API keys. |
| M4-02 | Create API key UI | Let user create/revoke project API keys. |
| M4-03 | Add event schema | Create events and sessions tables. |
| M4-04 | Add ingest endpoint | Implement `POST /api/events` with API key auth. |
| M4-05 | Validate event payloads | Validate payloads with Zod. |
| M4-06 | Add demo event generator | Generate fake traffic for dashboard testing. |

### Milestone 5 — Analytics queries

| ID | Ticket | Short description |
|---|---|---|
| M5-01 | Event volume query | Aggregate events by time bucket. |
| M5-02 | Active users query | Calculate daily/weekly active users. |
| M5-03 | Top events query | List most common event names. |
| M5-04 | Session metrics query | Calculate sessions and average duration. |
| M5-05 | Conversion summary | Calculate simple signup-to-action conversion. |
| M5-06 | Dashboard API routes | Expose analytics queries to UI. |

### Milestone 6 — Testing workflow

| ID | Ticket | Short description |
|---|---|---|
| M6-01 | Unit test setup | Add Vitest and first utility tests. |
| M6-02 | Component tests | Add React Testing Library examples. |
| M6-03 | API integration tests | Test route handlers against test DB. |
| M6-04 | DB migration tests | Verify migrations run on clean database. |
| M6-05 | E2E setup | Add Playwright for auth and dashboard flows. |
| M6-06 | Test data factories | Add reusable test factories/fixtures. |

### Milestone 7 — CI/CD and deployment

| ID | Ticket | Short description |
|---|---|---|
| M7-01 | Add CI workflow | Run lint, typecheck, unit tests on PRs. |
| M7-02 | Add integration workflow | Run DB-backed tests with PostgreSQL service. |
| M7-03 | Add E2E workflow | Run Playwright in CI for core flows. |
| M7-04 | Configure Neon | Create demo database and env variables. |
| M7-05 | Configure Vercel deploy | Connect repo and deploy `main`. |
| M7-06 | Add preview deploy notes | Document PR preview deployment behavior. |
| M7-07 | Add release checklist | Define pre-merge and pre-release checks. |

### Milestone 8 — Portfolio polish

| ID | Ticket | Short description |
|---|---|---|
| M8-01 | Add landing page | Explain product and demo use case. |
| M8-02 | Add demo mode | Let visitors explore seeded analytics safely. |
| M8-03 | Add README | Document stack, setup, tests, deployment. |
| M8-04 | Add architecture notes | Document app/data/auth/deployment decisions. |
| M8-05 | Add screenshots | Add dashboard screenshots for GitHub. |
| M8-06 | Add portfolio summary | Write concise case-study style summary. |

### Milestone 9 — Event-driven extension

| ID | Ticket | Short description |
|---|---|---|
| M9-01 | Add outbox table | Store domain events for async processing. |
| M9-02 | Emit event-created event | Write outbox record during ingestion. |
| M9-03 | Add worker route/job | Process pending outbox records. |
| M9-04 | Add derived metrics table | Precompute selected analytics metrics. |
| M9-05 | Add retry handling | Track attempts and failed event processing. |

### Milestone 10 — GraphQL extension

| ID | Ticket | Short description |
|---|---|---|
| M10-01 | Add GraphQL spike | Compare Yoga/Apollo for Next.js Route Handler. |
| M10-02 | Add GraphQL schema | Model dashboard analytics read operations. |
| M10-03 | Add GraphQL endpoint | Expose read-only analytics endpoint. |
| M10-04 | Add GraphQL tests | Test queries and auth behavior. |
| M10-05 | Compare REST vs GraphQL | Document tradeoffs in architecture notes. |

### Milestone 11 — Cloudflare deployment spike

| ID | Ticket | Short description |
|---|---|---|
| M11-01 | Review Cloudflare support | Check OpenNext compatibility for current app. |
| M11-02 | Test Cloudflare deploy | Deploy a branch to Cloudflare Workers. |
| M11-03 | Validate auth/runtime | Check auth, DB connection, middleware behavior. |
| M11-04 | Compare with Vercel | Document DX, limits, cost, and blockers. |
| M11-05 | Decide hosting target | Keep Vercel or switch to Cloudflare. |

## Recommended implementation order

1. M0 project setup
2. M1 database foundation
3. M2 authentication
4. M3 dashboard shell
5. M4 ingestion API
6. M5 analytics queries
7. M6 tests
8. M7 deployment
9. M8 portfolio polish
10. M9 event-driven extension
11. M10 GraphQL extension
12. M11 Cloudflare spike

## Architecture guardrails

- Prefer boring, working architecture over impressive complexity.
- Add one advanced concept only after the previous layer works.
- Every feature should be visible in the UI or demonstrable through tests.
- Keep tickets small enough for one focused branch/PR.
- Do not introduce Kafka, Redis, background queues, or a separate API service before the MVP is stable.
- If a feature does not improve learning, portfolio value, or product realism, defer it.

## First useful next step

Start with **M0-01 Bootstrap Next.js app** and **M0-02 Add base tooling**.

Do not start auth, GraphQL, or event-driven work until the app boots, lint/typecheck pass, and the base folder structure is stable.
