import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth, verificationSchema } from "better-auth";

import { db } from "@/db/client";
import * as schema from "@/db/schema";
import { serverEnv } from "./env/server";

export const auth = betterAuth({
  baseURL: serverEnv.BETTER_AUT_URL,
  secret: serverEnv.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: { enabled: true },
  user: { modelName: "users" },
  session: { modelName: "sessions" },
  account: { modelName: "accounts" },
  verification: { modelName: "verifications" },
  advanced: { database: { generateId: false } },
});
