# features

Feature modules will live here once the app has real product flows.

Expected feature structure:

```text
features/<feature>/
  ui/             # feature-specific React components
  application/    # use cases and orchestration
  domain/         # pure domain types, policies, permissions, rules
  data/           # repositories, Drizzle queries, persistence mapping
```

Dependency direction:

- UI calls application/use-case functions.
- Application can call domain policies and data repositories.
- Domain must stay framework-independent.
- Data modules own database access.

Do not add empty feature folders before there is a real feature ticket.
