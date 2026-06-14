import { AccountMenu } from "@/features/auth/ui/account-menu";
import type { UserWorkspace } from "@/features/workspaces/data/workspace-repository";
import { WorkspaceSwitcher } from "@/features/workspaces/ui/workspace-switcher";

type AppTopbarProps = {
  workspaces: UserWorkspace[];
};

export function AppTopbar({ workspaces }: AppTopbarProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between gap-4 px-6 lg:px-8">
        <WorkspaceSwitcher workspaces={workspaces} />

        <AccountMenu />
      </div>
    </header>
  );
}
