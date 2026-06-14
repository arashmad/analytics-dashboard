export const WORKSPACE_ROLES = ["owner", "admin", "analyst", "viewer"] as const;

export type WorkspaceRole = (typeof WORKSPACE_ROLES)[number];

export const PERMISSIONS = [
  "workspace:read",
  "workspace:update",
  "members:read",
  "members:invite",
  "members:manage",
  "projects:read",
  "projects:create",
  "projects:update",
  "projects:delete",
  "api_keys:read",
  "api_keys:create",
  "api_keys:revoke",
  "analytics:read",
  "analytics:configure",
  "events:ingest",
  "audit_log:read",
  "demo_data:manage",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_PERMISSIONS: Record<WorkspaceRole, readonly Permission[]> = {
  owner: PERMISSIONS,
  admin: [
    "workspace:read",
    "workspace:update",
    "members:read",
    "members:invite",
    "members:manage",
    "projects:read",
    "projects:create",
    "projects:update",
    "projects:delete",
    "api_keys:read",
    "api_keys:create",
    "api_keys:revoke",
    "analytics:read",
    "analytics:configure",
    "events:ingest",
    "audit_log:read",
    "demo_data:manage",
  ],
  analyst: [
    "workspace:read",
    "projects:read",
    "analytics:read",
    "analytics:configure",
  ],
  viewer: ["workspace:read", "projects:read", "analytics:read"],
};

export function isWorkspaceRole(
  role: string | null | undefined,
): role is WorkspaceRole {
  return WORKSPACE_ROLES.includes(role as WorkspaceRole);
}

export function isPermission(
  permission: string | null | undefined,
): permission is Permission {
  return PERMISSIONS.includes(permission as Permission);
}

export function getPermissionsForRole(
  role: WorkspaceRole,
): readonly Permission[] {
  return ROLE_PERMISSIONS[role];
}

export function hasPermission(
  role: WorkspaceRole | null | undefined,
  permission: Permission,
): boolean {
  if (!role) {
    return false;
  }

  return ROLE_PERMISSIONS[role].includes(permission);
}

export function hasEveryPermission(
  role: WorkspaceRole | null | undefined,
  permissions: readonly Permission[],
): boolean {
  if (!role) {
    return false;
  }

  return permissions.every((permission) => hasPermission(role, permission));
}

export function hasAnyPermission(
  role: WorkspaceRole | null | undefined,
  permissions: readonly Permission[],
): boolean {
  if (!role) {
    return false;
  }

  return permissions.some((permission) => hasPermission(role, permission));
}
