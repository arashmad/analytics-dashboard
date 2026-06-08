import { checkDatabaseHealth } from "@/db/health";

async function main() {
  const result = await checkDatabaseHealth();
  console.log("Database health check passed: ");
  console.table(result);
}

main().catch((error) => {
  console.error("Database health check failed: ", error);
  process.exitCode = 1;
});
