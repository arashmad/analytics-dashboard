# app

Next.js App Router entry points live here.

Use this folder for:

- route segments
- layouts
- pages
- loading and error boundaries
- route handlers when the route belongs to the app boundary

Keep this folder thin. Do not put database queries, business rules, or reusable feature logic directly inside page components or route handlers. Move that work into feature/application/data modules when those layers are introduced.
