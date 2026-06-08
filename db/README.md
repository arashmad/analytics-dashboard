# db

Database code will live here.

Future contents:

- database client setup
- Drizzle schema
- migrations
- seed scripts
- database test helpers when needed

This ticket only creates the placeholder structure. Drizzle, PostgreSQL configuration, migrations, and seed scripts belong to later database tickets.

## Local PostgreSQL

Start the local database:

```bash
pnpm db:up
```

Stop it:

```bash
pnpm db:down
```

Reset it and delete local data:

```bash
pnpm db:reset
```

Follow logs:

```bash
pnpm db:logs
```

Default local connection string:
`DATABASE_URL=postgresql://analytics_dashboard:analytics_dashboard@localhost:5434/analytics_dashboard`

## Drizzle

Drizzle ORM and Drizzle Kit are used for type-safe PostgreSQL access and migrations.

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

Schema entrypoint:

```bash
db/schema.ts
```

Migration output:

```bash
drizzle/
```

## First schema

The first migration creates the core SaaS foundation:

- `users`
- `workspaces`
- `workspace_members`
- `projects`

The schema intentionally stays auth-library-neutral. Passwords, sessions, accounts, and reset tokens belong to the later authentication milestone.

Generate migrations:

```bash
pnpm db:generate
```

## Seed data

Seed the local database with deterministic demo data:

````bash
pnpm db:seed```
````
