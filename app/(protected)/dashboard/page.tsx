import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { requireSession } from "@/lib/auth/session";
import { AuthStatusCard } from "@/features/auth/ui/auth-status-card";

const placeholderMetrics = [
  {
    label: "Events",
    value: "—",
    description: "Event ingestion will be added in a later milestone.",
  },
  {
    label: "Active users",
    value: "—",
    description: "Analytics queries will be added after ingestion exists.",
  },
  {
    label: "Conversion",
    value: "—",
    description: "Funnels are intentionally out of current scope.",
  },
];

export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Protected dashboard</p>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {session.user.name ?? session.user.email}. This is the
          dashboard foundation inside the protected app shell.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {placeholderMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardDescription>{metric.label}</CardDescription>
              <CardTitle className="text-3xl">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workspace foundation</CardTitle>
          <CardDescription>
            Workspace switching, RBAC, members, and project analytics will be
            connected through the remaining M3 tickets.
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
