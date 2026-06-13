"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export function AuthStatusCard() {
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
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Checking session...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>You are not logged in.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Create account</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
        <CardDescription>Logged in as {session.user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={handleSignOut}>
          Log out
        </Button>
      </CardContent>
    </Card>
  );
}
