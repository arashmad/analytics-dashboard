"use client";

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

type formStatus = "idle" | "loading" | "success" | "error";

export function RegisterForm() {
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("new.user@example.com");
  const [password, setPassword] = useState("password123");
  const [status, setStatus] = useState<formStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage(null);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message ?? "Registration failed.");
      return;
    }

    setStatus("success");
    setMessage("Account created. Login will be added in the next ticket");
  }

  return (
    <Card className="w-full max-h-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Register a user with email an password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              id="email"
              name="email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              id="password"
              name="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Creating account ... " : "Create account"}
          </Button>

          {message && (
            <p
              className={`text-sm ${status === "error" ? "text-destructive" : "text-muted-foreground"}`}
            >
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
