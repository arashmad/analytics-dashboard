# ADR 0001: Authentication library

## Status

Accepted

## Context

The app needs email/password authentication, sessions, password reset flows, PostgreSQL persistence, Drizzle integration, and workspace-level authorization.

The project already has a PostgreSQL/Drizzle foundation with users, workspaces, workspace_members, and projects.

## Decision

Use Better Auth for authentication.

Use the Better Auth Drizzle adapter with PostgreSQL.

Keep workspace authorization app-owned. Better Auth owns authentication concerns such as users, sessions, accounts, verification tokens, password hashing, and auth handlers. The application owns workspace roles and permissions through workspace_members.

## Consequences

- Registration, login, logout, session handling, forgot-password, and reset-password flows will be implemented through Better Auth.
- The existing users table must be aligned with Better Auth's expected user model.
- The app should not implement manual password hashing unless Better Auth requires explicit customization.
- Workspace RBAC remains separate from the auth library.
- Auth routes will be exposed through the Next.js App Router under /api/auth/\*.

## Alternatives considered

### Auth.js Credentials

Rejected for this project because it requires more custom implementation for credentials persistence, password verification, and password reset behavior.

### Custom auth

Rejected because it would add unnecessary security risk and implementation overhead for a portfolio project.

### Clerk / Supabase Auth

Rejected for now because the goal is to demonstrate database-backed full-stack engineering with local PostgreSQL, Drizzle, migrations, and explicit application-owned RBAC.
