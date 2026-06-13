"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clientEnv } from "@/lib/env/client";
import { authClient } from "@/lib/auth-client";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("new.user@example.com");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage(null);

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${clientEnv.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message ?? "Password reset request failed.");
      return;
    }

    setStatus("success");
    setMessage(
      "If an account exists for this email, a password reset link has been sent.",
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot password</CardTitle>
        <CardDescription>
          Request a password reset link for your account.
        </CardDescription>
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

          <Button
            className="w-full"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Sending reset link..." : "Send reset link"}
          </Button>

          {message ? (
            <p
              className={
                status === "error"
                  ? "text-sm text-destructive"
                  : "text-sm text-muted-foreground"
              }
            >
              {message}
            </p>
          ) : null}

          <p className="text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link
              className="font-medium text-foreground underline"
              href="/login"
            >
              Log in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
