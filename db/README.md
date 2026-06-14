# db

Database-related code lives here.

This folder owns:

- Drizzle schema
- database client setup
- migrations
- local seed data
- database health helpers
- future database test helpers

## Local PostgreSQL

The local database runs through Docker Compose.

Start the database:

```bash
pnpm db:up
```

Stop the database:

```bash
pnpm db:down
```

Reset local data:

```bash
pnpm db:reset
```

Follow logs:

```bash
pnpm db:logs
```

Default local connection string:

```env
DATABASE_URL=postgresql://analytics_dashboard:analytics_dashboard@localhost:5434/analytics_dashboard
```

## Drizzle

Drizzle ORM and Drizzle Kit are used for type-safe PostgreSQL access and migrations.

Schema entrypoint:

```text
db/schema.ts
```

Migration output:

```text
drizzle/
```

Generate migrations:

```bash
pnpm db:generate
```

Run migrations:

```bash
pnpm db:migrate
```

Open Drizzle Studio:

```bash
pnpm db:studio
```

## Seed data

Seed the local database with deterministic demo data:

```bash
pnpm db:seed
```

The seed data is used for local development and manual testing.

## Database health check

Run the local database health check script:

```bash
pnpm db:check
```

The app also exposes a database health route for local and deployment validation.

## Current schema

The database currently includes the core SaaS foundation:

- `users`
- `workspaces`
- `workspace_members`
- `projects`

Authentication uses Better Auth with PostgreSQL/Drizzle and adds auth-related persistence for sessions, accounts, and verification/reset flows.

Workspace authorization remains application-owned through `workspace_members`.

## Ownership rules

- Drizzle schema stays in `db/schema.ts`.
- Database connection setup stays in `db/client.ts`.
- Feature-specific queries should live in `features/<feature>/data`.
- Routes and UI should not import raw database queries directly.
