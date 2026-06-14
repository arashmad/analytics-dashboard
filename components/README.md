# components

Shared React components live here.

Use this folder for generic, reusable UI that is not owned by a specific feature.

Conventions:

- `components/ui` is reserved for shadcn/ui primitives.
- Shared layout or display components can live directly under `components/` when they are not feature-specific.
- Feature-specific UI should live under `features/<feature>/ui`.
- Components in this folder should not import database code, repositories, or server-only feature logic.

Examples of acceptable shared components:

- buttons and form primitives from shadcn/ui
- cards
- badges
- generic empty states
- generic loading states
- generic error states
- reusable layout primitives

Do not put product-specific workspace, member, project, or analytics logic here. That belongs in `features/`.
