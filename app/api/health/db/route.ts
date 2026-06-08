import { checkDatabaseHealth } from "@/db/health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await checkDatabaseHealth();
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.log("Database health check failed: ", error);
    return Response.json(
      {
        ok: false,
        database: "postgres",
        checkedAt: new Date().toISOString,
        error: "Database health check failed",
      },
      {
        status: 503,
      },
    );
  }
}
