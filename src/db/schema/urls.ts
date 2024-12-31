import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { relations, sql } from "drizzle-orm";
import { urlStats } from "./urlStats";

export const urls = sqliteTable("url", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   originalUrl: text("original_url").notNull(),
   shortCode: text("short_code").notNull().unique(),
   userId: text("userId").references(() => users.id, { onDelete: "set null" }),
   createdAt: text("created_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
});

export const urlsRelations = relations(urls, ({ many }) => ({
   urlStats: many(urlStats),
}));
