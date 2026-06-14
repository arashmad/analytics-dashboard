import { AccountMenu } from "@/features/auth/ui/account-menu";

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between gap-4 px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-sm font-medium">Demo workspace</p>
          <p className="truncate text-xs text-muted-foreground">
            Workspace switcher will be added in M3-02.
          </p>
        </div>

        <AccountMenu />
      </div>
    </header>
  );
}
