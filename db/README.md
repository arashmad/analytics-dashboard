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
