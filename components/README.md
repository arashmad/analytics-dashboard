# components

Shared React components live here.

Use this folder for generic, reusable UI that is not owned by a specific feature.

Conventions:

- `components/ui` is reserved for shadcn/ui primitives.
- Feature-specific UI should live under the future `features/<feature>/ui` folder.
- Components in this folder should not import database code or feature repositories.
