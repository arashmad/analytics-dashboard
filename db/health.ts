import { sql } from "drizzle-orm";

import { db } from "@/db/client";

export type DatabaseHealthResult = {
  ok: true;
  database: "postgres";
  checkedAt: string;
  latencyMs: number;
};

export async function checkDatabaseHealth(): Promise<DatabaseHealthResult> {
  const startedAt = Date.now();

  await db.execute(sql`select 1;`);

  return {
    ok: true,
    database: "postgres",
    checkedAt: new Date().toISOString(),
    latencyMs: Date.now() - startedAt,
  };
}
