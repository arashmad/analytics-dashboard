"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

type FormStatus = "idle" | "loading" | "success" | "error";

type ResetPasswordFormProps = {
  token?: string;
  error?: string;
};

export function ResetPasswordForm({ token, error }: ResetPasswordFormProps) {
  const router = useRouter();

  const [password, setPassword] = useState("password1234");
  const [confirmPassword, setConfirmPassword] = useState("password1234");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const hasInvalidToken = !token || Boolean(error);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      setStatus("error");
      setMessage("The password reset link is missing or invalid.");
      return;
    }

    if (password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    if (resetError) {
      setStatus("error");
      setMessage(resetError.message ?? "Password reset failed.");
      return;
    }

    setStatus("success");
    setMessage("Password reset successfully. Redirecting to login...");
    router.push("/login");
    router.refresh();
  }

  if (hasInvalidToken) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset link invalid</CardTitle>
          <CardDescription>
            This password reset link is missing, invalid, or expired.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Request a new password reset link and try again.
          </p>

          <Button asChild className="w-full">
            <Link href="/forgot-password">Request new reset link</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>
          Choose a new password for your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              New password
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

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="confirmPassword">
              Confirm new password
            </label>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              id="confirmPassword"
              minLength={8}
              name="confirmPassword"
              required
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <Button
            className="w-full"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Resetting password..." : "Reset password"}
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
