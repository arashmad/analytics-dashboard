import { requireSession } from "@/lib/auth/session";
import { findProjectInWorkspace } from "../data/project-repository";
import { getWorkspaceMembershipRole } from "@/features/rbac/data/workspace-authorization-repository";
import { WorkspaceMembershipRequiredError } from "@/features/rbac";
import { ProjectNotFoundError } from "./find-project-error";

type ProjectInWorkspaceContext = {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  description: string | null;
};

export async function requireProjectInWorkspace(input: {
  projectId: string;
  workspaceId: string;
}): Promise<ProjectInWorkspaceContext> {
  const { projectId, workspaceId } = input;

  const session = await requireSession();

  const memberShip = await getWorkspaceMembershipRole({
    workspaceId,
    userId: session.user.id,
  });

  if (!memberShip) {
    throw new WorkspaceMembershipRequiredError();
  }

  const projectInWorkspace = await findProjectInWorkspace({
    projectId,
    workspaceId,
  });

  /**
   * ! Security Reason
   * No matter if the project not found in workspace or
   * or user doesn't have access to the workspace where looks for the project
   */
  if (!projectInWorkspace) {
    throw new ProjectNotFoundError();
  }

  return projectInWorkspace;
}
