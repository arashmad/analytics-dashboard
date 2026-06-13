import { requireSession } from "@/lib/auth/session";
import { AuthStatusCard } from "@/features/auth/ui/auth-status-card";

export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Protected route</p>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {session.user.name ?? session.user.email}.
          </p>
        </div>

        <AuthStatusCard />
      </section>
    </main>
  );
}
