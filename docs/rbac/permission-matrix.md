# RBAC permission matrix

InsightPulse uses workspace-level RBAC.

Authorization is based on explicit permissions, not hard-coded role checks. Roles are only a convenient way to assign a permission set to a workspace member.

The source of truth in code is:

```text
features/rbac/domain/permissions.ts
```

## Roles

| Role      | Purpose                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------ |
| `owner`   | Full workspace control.                                                                          |
| `admin`   | Manages workspace settings, members, projects, API keys, dashboard configuration, and demo data. |
| `analyst` | Views analytics and manages analytics/dashboard configuration.                                   |
| `viewer`  | Read-only access to dashboards and project analytics.                                            |

## Permission matrix

| Permission            | Owner | Admin | Analyst | Viewer |
| --------------------- | ----- | ----- | ------- | ------ |
| `workspace:read`      | ✅    | ✅    | ✅      | ✅     |
| `workspace:update`    | ✅    | ✅    | ❌      | ❌     |
| `members:read`        | ✅    | ✅    | ❌      | ❌     |
| `members:invite`      | ✅    | ✅    | ❌      | ❌     |
| `members:manage`      | ✅    | ✅    | ❌      | ❌     |
| `projects:read`       | ✅    | ✅    | ✅      | ✅     |
| `projects:create`     | ✅    | ✅    | ❌      | ❌     |
| `projects:update`     | ✅    | ✅    | ❌      | ❌     |
| `projects:delete`     | ✅    | ✅    | ❌      | ❌     |
| `api_keys:read`       | ✅    | ✅    | ❌      | ❌     |
| `api_keys:create`     | ✅    | ✅    | ❌      | ❌     |
| `api_keys:revoke`     | ✅    | ✅    | ❌      | ❌     |
| `analytics:read`      | ✅    | ✅    | ✅      | ✅     |
| `analytics:configure` | ✅    | ✅    | ✅      | ❌     |
| `events:ingest`       | ✅    | ✅    | ❌      | ❌     |
| `audit_log:read`      | ✅    | ✅    | ❌      | ❌     |
| `demo_data:manage`    | ✅    | ✅    | ❌      | ❌     |

## Role behavior

### Owner

Owners have all permissions.

Owner-specific safety rules are handled separately from the permission matrix. For example, the app must not allow workspace membership changes that leave a workspace without a full-control member.

### Admin

Admins can manage the workspace operationally, including members, projects, API keys, analytics configuration, audit log access, and demo data.

Admins do not bypass owner safety rules.

### Analyst

Analysts can read workspace/project data and analytics. They can configure analytics/dashboard behavior, but cannot manage members, projects, API keys, audit logs, or demo data.

### Viewer

Viewers have read-only dashboard access. They can read workspace/project context and analytics, but cannot configure or mutate anything.

## Security rules

- Server-side permission checks are the security boundary.
- UI hiding is only a convenience and must not be treated as authorization.
- Missing role or missing permission must deny access by default.
- Workspace-scoped queries must be filtered by workspace membership.
- Project-scoped queries must be filtered through the active workspace.
- API keys authorize event ingestion for a project, not dashboard access for a user.

## Maintenance rule

When permissions change, update both:

```text
features/rbac/domain/permissions.ts
docs/rbac/permission-matrix.md
```

The code remains the implementation source of truth. This document exists to make review, future tickets, and portfolio explanation easier.
