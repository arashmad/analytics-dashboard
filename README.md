# InsightPulse — Analytics Dashboard

InsightPulse is a small SaaS-style product analytics dashboard built as a full-stack portfolio project.

The app is designed to practice realistic product engineering: authentication, protected app routes, workspace-based access, role-based authorization, PostgreSQL data modeling, API design, analytics dashboard UI, testing, CI/CD, and deployment.

## Product scope

InsightPulse will let users:

- create and access protected dashboard routes
- belong to one or more workspaces
- switch active workspace
- manage workspace members and roles
- create projects
- generate API keys for event ingestion
- ingest product events
- view analytics such as event volume, active users, top events, and dashboard summaries

The project is intentionally not geospatial in v1. The goal is to focus on modern full-stack TypeScript product architecture without adding GIS complexity too early.

## Current status

Completed foundations:

- Next.js App Router app
- TypeScript strict setup
- Tailwind CSS and shadcn/ui foundation
- typed environment validation with Zod
- local PostgreSQL through Docker Compose
- Drizzle ORM and Drizzle Kit
- initial database schema and migrations
- deterministic seed script
- database health check route
- Better Auth setup with PostgreSQL/Drizzle
- email/password registration
- login/logout
- protected dashboard route
- forgot-password and reset-password flows

Next milestone:

- workspace app shell
- workspace switcher
- app-owned RBAC model
- server-side authorization helpers
- tenant isolation helpers
- member management foundation
- dashboard foundation

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Drizzle ORM
- Drizzle Kit
- Better Auth
- Docker Compose
- Zod
- pnpm

Planned later:

- TanStack Query
- TanStack Table
- charting library for analytics
- Vitest
- React Testing Library
- Playwright
- GitHub Actions
- Vercel deployment
- Neon PostgreSQL

## Local setup

Install dependencies:

```bash
pnpm install
```

Create local environment file:

```bash
cp .env.example .env.local
```

Generate a Better Auth secret:

```bash
openssl rand -base64 32
```

Then update `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://analytics_dashboard:analytics_dashboard@localhost:5434/analytics_dashboard
BETTER_AUTH_SECRET=replace-with-generated-secret
BETTER_AUTH_URL=http://localhost:3000
```

Start PostgreSQL:

```bash
pnpm db:up
```

Run migrations:

```bash
pnpm db:migrate
```

Seed local demo data:

```bash
pnpm db:seed
```

Start the app:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Useful scripts

Run the development server:

```bash
pnpm dev
```

Run production build:

```bash
pnpm build
```

Run linting:

```bash
pnpm lint
```

Run TypeScript checks:

```bash
pnpm typecheck
```

Run formatting:

```bash
pnpm format
```

Run all core checks:

```bash
pnpm check
```

Start local PostgreSQL:

```bash
pnpm db:up
```

Stop local PostgreSQL:

```bash
pnpm db:down
```

Reset local PostgreSQL data:

```bash
pnpm db:reset
```

Generate Drizzle migrations:

```bash
pnpm db:generate
```

Run Drizzle migrations:

```bash
pnpm db:migrate
```

Open Drizzle Studio:

```bash
pnpm db:studio
```

Seed local data:

```bash
pnpm db:seed
```

Check database connectivity:

```bash
pnpm db:check
```

## Project structure

```text
app/          Next.js routes, layouts, pages, route handlers
components/   shared reusable UI components
db/           Drizzle schema, migrations, database client
features/     feature-specific UI, application, domain, and data modules
lib/          cross-cutting utilities such as env and auth helpers
tests/        future shared test infrastructure
```

Architecture direction:

- `app/` should stay thin.
- Feature logic belongs under `features/<feature>/...`.
- Database access belongs in data/repository modules.
- Domain rules should not import React, Next.js, Drizzle, or environment variables.
- Server-side authorization is the security boundary.
- UI can hide unavailable actions, but must not be the only permission check.

## Authentication

Authentication uses Better Auth with PostgreSQL and Drizzle.

Implemented flows:

- register
- login
- logout
- protected routes
- forgot password
- reset password

Email sending is not connected to a real provider yet. Password reset links are logged in local development.

## Database

Local PostgreSQL runs through Docker Compose on host port `5434`.

Default local connection string:

```env
DATABASE_URL=postgresql://analytics_dashboard:analytics_dashboard@localhost:5434/analytics_dashboard
```

The schema currently includes the SaaS foundation tables and Better Auth tables.

Core app tables:

- `users`
- `workspaces`
- `workspace_members`
- `projects`

Auth-related tables:

- `sessions`
- `accounts`
- `verifications`

## Roadmap

Milestone 3 focuses on:

- app shell
- workspace switching
- RBAC model
- permission matrix
- authorization helpers
- tenant isolation helpers
- member list
- workspace invitations
- role changes
- role invariants
- role-aware navigation
- dashboard foundation
- shared loading/error states
- architecture notes

Later milestones add:

- project management
- API keys
- event ingestion API
- analytics queries
- charts and dashboard UI
- testing workflow
- CI/CD
- deployment
- portfolio polish
