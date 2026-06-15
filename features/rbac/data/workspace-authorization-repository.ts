import { and, eq } from "drizzle-orm";

import { db } from "@/db/client";
import { workspaceMembers } from "@/db/schema";
import { isWorkspaceRole, type WorkspaceRole } from "@/features/rbac/domain";

export type WorkspaceMembershipRole = {
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
};

export async function getWorkspaceMembershipRole({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}): Promise<WorkspaceMembershipRole | null> {
  const [membership] = await db
    .select({
      workspaceId: workspaceMembers.workspaceId,
      userId: workspaceMembers.userId,
      role: workspaceMembers.role,
    })
    .from(workspaceMembers)
    .where(
      and(
        eq(workspaceMembers.workspaceId, workspaceId),
        eq(workspaceMembers.userId, userId),
      ),
    )
    .limit(1);

  if (!membership || !isWorkspaceRole(membership.role)) {
    return null;
  }

  return membership;
}
