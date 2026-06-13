/**
 * Drizzle schema entrypoint.
 *
 * Real tables are added in issue #8.
 */
import {
  index,
  pgEnum,
  pgTable,
  text,
  boolean,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const workspaceRoleEnum = pgEnum("workspace_role", [
  "owner",
  "admin",
  "analyst",
  "viewer",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "active",
  "archived",
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
};

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    imageUrl: text("image_url"),
    ...timestamps,
  },
  (table) => [uniqueIndex("users_email_unique_idx").on(table.email)],
);

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("sessions_token_unique_idx").on(table.token),
    index("sessions_user_id_idx").on(table.userId),
  ],
);

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      withTimezone: true,
    }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    ...timestamps,
  },
  (table) => [
    index("accounts_user_id_idx").on(table.userId),
    uniqueIndex("accounts_provider_id_account_id_unique_idx").on(
      table.providerId,
      table.accountId,
    ),
  ],
);

export const verifications = pgTable(
  "verifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ...timestamps,
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)],
);

export const workspaces = pgTable(
  "workspaces",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    createdById: uuid("created_by_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("workspaces_slug_unique_idx").on(table.slug),
    index("workspaces_created_by_id_idx").on(table.createdById),
  ],
);

export const workspaceMembers = pgTable(
  "workspace_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: workspaceRoleEnum("role").notNull().default("viewer"),
    invitedById: uuid("invited_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("workspace_members_workspace_id_user_id_unique_idx").on(
      table.workspaceId,
      table.userId,
    ),
    index("workspace_members_workspace_id_idx").on(table.workspaceId),
    index("workspace_members_user_id_idx").on(table.userId),
    index("workspace_members_role_idx").on(table.role),
  ],
);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    description: text("description"),
    status: projectStatusEnum("status").notNull().default("active"),
    createdById: uuid("created_by_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("projects_workspace_id_slug_unique_idx").on(
      table.workspaceId,
      table.slug,
    ),
    index("projects_workspace_id_idx").on(table.workspaceId),
    index("projects_created_by_id_idx").on(table.createdById),
    index("projects_status_idx").on(table.status),
  ],
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Verification = typeof verifications.$inferSelect;
export type NewVerification = typeof verifications.$inferInsert;

export type Workspace = typeof workspaces.$inferSelect;
export type NewWorkspace = typeof workspaces.$inferInsert;

export type WorkspaceMember = typeof workspaceMembers.$inferSelect;
export type NewWorkspaceMember = typeof workspaceMembers.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
