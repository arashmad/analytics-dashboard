import { and, eq } from "drizzle-orm";

import { db } from "@/db/client";
import { projects as projectsTable } from "@/db/schema";

export type Project = {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  description: string | null;
  status: string;
};

export async function findProjectInWorkspace(input: {
  projectId: string;
  workspaceId: string;
}): Promise<Project | null> {
  // TODO
  const { projectId, workspaceId } = input;
  const [project] = await db
    .select({
      id: projectsTable.id,
      workspaceId: projectsTable.workspaceId,
      name: projectsTable.name,
      slug: projectsTable.slug,
      description: projectsTable.description,
      status: projectsTable.status,
    })
    .from(projectsTable)
    .where(
      and(
        eq(projectsTable.id, projectId),
        eq(projectsTable.workspaceId, workspaceId),
      ),
    )
    .limit(1);

  if (!project) {
    return null;
  }

  return project;
}
