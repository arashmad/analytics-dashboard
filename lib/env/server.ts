import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().url(),
});

const parsedServerEnv = serverEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  APP_URL: process.env.APP_URL,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!parsedServerEnv.success) {
  console.error(
    "Invalid server environment variables:",
    parsedServerEnv.error.flatten().fieldErrors,
  );
  throw new Error("Invalid server environment variables");
}

export const serverEnv = parsedServerEnv.data;
