import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

const parsedClientEnv = clientEnvSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!parsedClientEnv.success) {
  console.error(
    "Invalid client environment variables:",
    parsedClientEnv.error.flatten().fieldErrors,
  );
  throw new Error("Invalid client environment variables");
}

export const clientEnv = parsedClientEnv.data;
