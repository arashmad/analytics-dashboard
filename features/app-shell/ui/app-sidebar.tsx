import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    description: "Overview",
  },
  {
    label: "Workspace",
    href: "/dashboard/workspace",
    description: "Coming in M3",
    disabled: true,
  },
  {
    label: "Members",
    href: "/dashboard/members",
    description: "Coming in M3",
    disabled: true,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    description: "Later milestone",
    disabled: true,
  },
];

export function AppSidebar() {
  return (
    <aside className="hidden border-r bg-background lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b px-5 py-4">
          <Link className="block" href="/dashboard">
            <p className="text-lg font-semibold tracking-tight">InsightPulse</p>
            <p className="text-sm text-muted-foreground">Product analytics</p>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigationItems.map((item) => {
            if (item.disabled) {
              return (
                <div
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground"
                  key={item.href}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{item.label}</span>
                    <Badge variant="outline">{item.description}</Badge>
                  </div>
                </div>
              );
            }

            return (
              <Link
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium",
                  "bg-muted text-foreground",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t px-5 py-4 text-xs text-muted-foreground">
          Workspace and RBAC navigation will be connected in later M3 tickets.
        </div>
      </div>
    </aside>
  );
}
