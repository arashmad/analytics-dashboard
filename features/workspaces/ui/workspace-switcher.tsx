"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { UserWorkspace } from "@/features/workspaces/data/workspace-repository";

type WorkspaceSwitcherProps = {
  workspaces: UserWorkspace[];
};

export function WorkspaceSwitcher({ workspaces }: WorkspaceSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedWorkspaceId = searchParams.get("workspaceId");
  const activeWorkspace =
    workspaces.find((workspace) => workspace.id === selectedWorkspaceId) ??
    workspaces[0];

  function handleWorkspaceChange(workspaceId: string) {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("workspaceId", workspaceId);

    router.push(`${pathname}?${nextParams.toString()}`);
  }

  if (workspaces.length === 0) {
    return (
      <div className="min-w-0">
        <p className="text-sm font-medium">No workspace</p>
        <p className="truncate text-xs text-muted-foreground">
          Workspace setup will be added in a later ticket.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label
        className="text-xs font-medium text-muted-foreground"
        htmlFor="workspace-switcher"
      >
        Active workspace
      </label>

      <select
        className="h-8 w-full max-w-64 rounded-md border border-input bg-background px-2 text-sm"
        id="workspace-switcher"
        value={activeWorkspace?.id ?? ""}
        onChange={(event) => handleWorkspaceChange(event.target.value)}
      >
        {workspaces.map((workspace) => (
          <option key={workspace.id} value={workspace.id}>
            {workspace.name} · {workspace.role}
          </option>
        ))}
      </select>
    </div>
  );
}
