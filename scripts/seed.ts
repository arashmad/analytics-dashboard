import { loadEnvConfig } from "@next/env";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { projects, users, workspaceMembers, workspaces } from "../db/schema";

loadEnvConfig(process.cwd());

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const pool = new Pool({
  connectionString: databaseUrl,
});

const db = drizzle({ client: pool });

async function seed() {
  const now = new Date();

  console.log("Seeding database...");

  const [owner] = await db
    .insert(users)
    .values({
      email: "demo.owner@example.com",
      name: "Demo Owner",
    })
    .onConflictDoUpdate({
      target: users.email,
      set: {
        name: "Demo Owner",
        updatedAt: now,
      },
    })
    .returning({ id: users.id });

  if (!owner) {
    throw new Error("Failed to create demo owner");
  }

  const [analyst] = await db
    .insert(users)
    .values({
      email: "demo.analyst@example.com",
      name: "Demo Analyst",
    })
    .onConflictDoUpdate({
      target: users.email,
      set: {
        name: "Demo Analyst",
        updatedAt: now,
      },
    })
    .returning({ id: users.id });

  if (!analyst) {
    throw new Error("Failed to create demo analyst");
  }

  const [workspace] = await db
    .insert(workspaces)
    .values({
      name: "Demo Workspace",
      slug: "demo-workspace",
      createdById: owner.id,
    })
    .onConflictDoUpdate({
      target: workspaces.slug,
      set: {
        name: "Demo Workspace",
        createdById: owner.id,
        updatedAt: now,
      },
    })
    .returning({ id: workspaces.id });

  if (!workspace) {
    throw new Error("Failed to create demo workspace");
  }

  await db
    .insert(workspaceMembers)
    .values([
      {
        workspaceId: workspace.id,
        userId: owner.id,
        role: "owner",
        invitedById: null,
      },
      {
        workspaceId: workspace.id,
        userId: analyst.id,
        role: "analyst",
        invitedById: owner.id,
      },
    ])
    .onConflictDoUpdate({
      target: [workspaceMembers.workspaceId, workspaceMembers.userId],
      set: {
        updatedAt: now,
      },
    });

  await db
    .insert(projects)
    .values([
      {
        workspaceId: workspace.id,
        name: "Marketing Website",
        slug: "marketing-website",
        description: "Demo project for website analytics events.",
        status: "active",
        createdById: owner.id,
      },
      {
        workspaceId: workspace.id,
        name: "Product App",
        slug: "product-app",
        description: "Demo project for product usage analytics.",
        status: "active",
        createdById: owner.id,
      },
    ])
    .onConflictDoUpdate({
      target: [projects.workspaceId, projects.slug],
      set: {
        status: "active",
        updatedAt: now,
      },
    });

  const seededUsers = await db.select().from(users);
  const seededWorkspaces = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.slug, "demo-workspace"));
  const seededProjects = await db.select().from(projects);

  console.log("Seed complete.");
  console.table({
    users: seededUsers.length,
    workspaces: seededWorkspaces.length,
    projects: seededProjects.length,
  });
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
