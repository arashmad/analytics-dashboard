export {
  AuthorizationError,
  WorkspaceMembershipRequiredError,
  WorkspacePermissionRequiredError,
} from "@/features/rbac/application/authorization-errors";

export {
  canAccessWorkspace,
  getWorkspaceAuthorizationContext,
  requireAnyWorkspacePermission,
  requireEveryWorkspacePermission,
  requireWorkspaceMembership,
  requireWorkspacePermission,
} from "@/features/rbac/application/authorize-workspace";
