import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { label: "Events tracked", value: "24.8K" },
  { label: "Active users", value: "1.2K" },
  { label: "Conversion", value: "8.4%" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit" variant="secondary">
            UI foundation
          </Badge>

          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              InsightPulse analytics dashboard
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              A portfolio-grade product analytics dashboard built with Next.js, React, TypeScript,
              Tailwind CSS, and shadcn/ui.
            </p>
          </div>

          <div className="flex gap-3">
            <Button>View dashboard</Button>
            <Button variant="outline">Read plan</Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardHeader>
                <CardDescription>{metric.label}</CardDescription>
                <CardTitle className="text-3xl">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Static placeholder metric for validating the UI system.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
