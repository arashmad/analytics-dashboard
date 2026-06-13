"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

import type { FormStatus } from "./type";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("new.user@example.com");
  const [password, setPassword] = useState("password123");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage(null);

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message ?? "Login failed.");
      return;
    }

    setStatus("success");
    setMessage("Logged in successfully.");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>Access your InsightPulse account.</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              id="email"
              name="email"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              id="password"
              minLength={8}
              name="password"
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <Button
            className="w-full"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Logging in..." : "Log in"}
          </Button>

          {message && (
            <p
              className={`text-sm ${status === "error" ? "text-destructive" : "text-muted-foreground"}`}
            >
              {message}
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            No account yet?{" "}
            <Link
              className="font-medium text-foreground underline"
              href="/register"
            >
              Create one
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
