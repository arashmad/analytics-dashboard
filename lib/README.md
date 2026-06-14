## `lib/README.md`

```md
# lib

Cross-cutting utilities live here.

Appropriate examples:

- environment helpers
- shared error classes
- auth/session helpers
- logging helpers
- small generic utilities
- framework adapters that are not owned by one feature

Current responsibilities:

- typed environment validation
- Better Auth setup
- auth client setup
- server-side session helpers

Avoid putting feature business logic here.

If logic belongs to a product area, create or use a feature module instead.

Examples:

- workspace permission rules belong in `features/rbac/domain`
- workspace queries belong in `features/workspaces/data`
- member invitation flows belong in `features/members/application`
- dashboard query orchestration belongs in `features/dashboard/application`

`lib/` is for shared infrastructure, not product behavior.
```
