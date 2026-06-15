export {
  PERMISSIONS,
  ROLE_PERMISSIONS,
  WORKSPACE_ROLES,
  getPermissionsForRole,
  hasAnyPermission,
  hasEveryPermission,
  hasPermission,
  isPermission,
  isWorkspaceRole,
  type Permission,
  type WorkspaceRole,
} from "@/features/rbac/domain";

export {
  AuthorizationError,
  WorkspaceMembershipRequiredError,
  WorkspacePermissionRequiredError,
  canAccessWorkspace,
  getWorkspaceAuthorizationContext,
  requireAnyWorkspacePermission,
  requireEveryWorkspacePermission,
  requireWorkspaceMembership,
  requireWorkspacePermission,
} from "@/features/rbac/application";
