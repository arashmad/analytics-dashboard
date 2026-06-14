import { AppSidebar } from "@/features/app-shell/ui/app-sidebar";
import { AppTopbar } from "@/features/app-shell/ui/app-topbar";
import type { UserWorkspace } from "@/features/workspaces/data/workspace-repository";

type AppShellProps = Readonly<{
  workspaces: UserWorkspace[];
  children: React.ReactNode;
}>;

export function AppShell({ children, workspaces }: AppShellProps) {
  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[16rem_1fr]">
        <AppSidebar />

        <div className="flex min-w-0 flex-col">
          <AppTopbar workspaces={workspaces} />

          <main className="flex-1 px-6 py-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
