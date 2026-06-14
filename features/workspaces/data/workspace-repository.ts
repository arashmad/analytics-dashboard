import { asc, eq } from "drizzle-orm";

import { db } from "@/db/client";
import { workspaceMembers, workspaces } from "@/db/schema";

export type UserWorkspace = {
  id: string;
  name: string;
  slug: string;
  role: "owner" | "admin" | "analyst" | "viewer";
};

export async function getWorkspacesForUser(
  userId: string,
): Promise<UserWorkspace[]> {
  return db
    .select({
      id: workspaces.id,
      name: workspaces.name,
      slug: workspaces.slug,
      role: workspaceMembers.role,
    })
    .from(workspaceMembers)
    .innerJoin(workspaces, eq(workspaceMembers.workspaceId, workspaces.id))
    .where(eq(workspaceMembers.userId, userId))
    .orderBy(asc(workspaces.name));
}
