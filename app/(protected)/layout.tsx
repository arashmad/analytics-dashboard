import { AppShell } from "@/features/app-shell/ui/app-shell";
import { requireSession } from "@/lib/auth/session";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireSession();

  return <AppShell>{children}</AppShell>;
}
