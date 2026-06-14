# features

Feature modules live here.

Use this folder for product-owned functionality such as authentication UI, workspaces, members, RBAC, projects, ingestion, and analytics.

Expected feature structure:

```text
features/<feature>/
  ui/             # feature-specific React components
  application/    # use cases and orchestration
  domain/         # pure domain types, policies, permissions, rules
  data/           # repositories, Drizzle queries, persistence mapping
```
