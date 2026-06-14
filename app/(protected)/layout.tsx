import { AppShell } from "@/features/app-shell/ui/app-shell";
import { getWorkspacesForUser } from "@/features/workspaces/data/workspace-repository";
import { requireSession } from "@/lib/auth/session";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();
  const workspaces = await getWorkspacesForUser(session.user.id);

  return <AppShell workspaces={workspaces}>{children}</AppShell>;
}
