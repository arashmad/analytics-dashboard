import {
  hasAnyPermission,
  hasEveryPermission,
  hasPermission,
  type Permission,
  type WorkspaceRole,
} from "@/features/rbac/domain";
import { getWorkspaceMembershipRole } from "@/features/rbac/data/workspace-authorization-repository";
import {
  WorkspaceMembershipRequiredError,
  WorkspacePermissionRequiredError,
} from "@/features/rbac/application/authorization-errors";
import { requireSession } from "@/lib/auth/session";

type WorkspaceAuthorizationContext = {
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
};

export async function getWorkspaceAuthorizationContext(
  workspaceId: string,
): Promise<WorkspaceAuthorizationContext | null> {
  const session = await requireSession();

  const membership = await getWorkspaceMembershipRole({
    workspaceId,
    userId: session.user.id,
  });

  if (!membership) {
    return null;
  }

  return {
    userId: session.user.id,
    workspaceId,
    role: membership.role,
  };
}

export async function requireWorkspaceMembership(
  workspaceId: string,
): Promise<WorkspaceAuthorizationContext> {
  const context = await getWorkspaceAuthorizationContext(workspaceId);

  if (!context) {
    throw new WorkspaceMembershipRequiredError();
  }

  return context;
}

export async function canAccessWorkspace({
  workspaceId,
  permission,
}: {
  workspaceId: string;
  permission: Permission;
}): Promise<boolean> {
  const context = await getWorkspaceAuthorizationContext(workspaceId);

  if (!context) {
    return false;
  }

  return hasPermission(context.role, permission);
}

export async function requireWorkspacePermission({
  workspaceId,
  permission,
}: {
  workspaceId: string;
  permission: Permission;
}): Promise<WorkspaceAuthorizationContext> {
  const context = await requireWorkspaceMembership(workspaceId);

  if (!hasPermission(context.role, permission)) {
    throw new WorkspacePermissionRequiredError();
  }

  return context;
}

export async function requireEveryWorkspacePermission({
  workspaceId,
  permissions,
}: {
  workspaceId: string;
  permissions: readonly Permission[];
}): Promise<WorkspaceAuthorizationContext> {
  const context = await requireWorkspaceMembership(workspaceId);

  if (!hasEveryPermission(context.role, permissions)) {
    throw new WorkspacePermissionRequiredError();
  }

  return context;
}

export async function requireAnyWorkspacePermission({
  workspaceId,
  permissions,
}: {
  workspaceId: string;
  permissions: readonly Permission[];
}): Promise<WorkspaceAuthorizationContext> {
  const context = await requireWorkspaceMembership(workspaceId);

  if (!hasAnyPermission(context.role, permissions)) {
    throw new WorkspacePermissionRequiredError();
  }

  return context;
}
