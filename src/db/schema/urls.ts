import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { sql } from "drizzle-orm";

export const urls = sqliteTable("url", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   originalUrl: text("original_url").notNull(),
   shortenedUrl: text("shortened_url").notNull().unique(),
   userId: text("userId").references(() => users.id, { onDelete: "set null" }),
   createdAt: integer("created_at")
      .default(sql`(CURENT_TIMESTAMP)`)
      .notNull(),
});
