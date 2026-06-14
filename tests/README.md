# tests

Shared test infrastructure will live here.

Planned contents:

- factories
- fixtures
- integration test helpers
- Playwright setup
- test database utilities
- authorization test helpers
- tenant isolation test helpers

Testing is planned for a later milestone.

Until then, feature tickets should rely on manual checks plus the existing lint, typecheck, format, and build scripts.

When test tooling is introduced, keep reusable test setup here and keep feature-specific tests close to the relevant feature when appropriate.
