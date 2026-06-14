# app

Next.js App Router entry points live here.

Use this folder for:

- route segments
- layouts
- pages
- loading and error boundaries
- route handlers when the route belongs to the app boundary

Keep this folder thin.

Routes and pages may compose feature modules, but they should not contain database queries, business rules, authorization rules, or reusable product logic directly.

Current responsibilities:

- public landing page
- auth pages such as register, login, forgot password, and reset password
- protected dashboard routes
- API route handlers such as auth and health checks

Protected app routes should delegate auth, workspace, and permission logic to `lib/` or `features/` modules.

Do not import raw database queries directly into page components unless the query is intentionally part of a very small boundary adapter. Prefer feature-level application/data modules.
