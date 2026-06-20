import {
  findProjectInWorkspace,
  type Project,
} from "../data/project-repository";
import { requireWorkspaceMembership } from "@/features/rbac";
import { ProjectNotFoundError } from "./project-error";

export async function requireProjectInWorkspace(input: {
  projectId: string;
  workspaceId: string;
}): Promise<Project> {
  const { projectId, workspaceId } = input;

  await requireWorkspaceMembership(workspaceId);

  const projectInWorkspace = await findProjectInWorkspace({
    projectId,
    workspaceId,
  });

  if (!projectInWorkspace) {
    throw new ProjectNotFoundError();
  }

  return projectInWorkspace;
}
