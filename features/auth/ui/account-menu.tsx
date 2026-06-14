"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function AccountMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  }

  if (isPending) {
    return (
      <div className="text-sm text-muted-foreground">Checking session...</div>
    );
  }

  if (!session) {
    return (
      <Button
        variant="outline"
        onClick={() => {
          router.push("/login");
        }}
      >
        Log in
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium">{session.user.name ?? "Account"}</p>
        <p className="text-xs text-muted-foreground">{session.user.email}</p>
      </div>

      <Button variant="outline" onClick={handleSignOut}>
        Log out
      </Button>
    </div>
  );
}
