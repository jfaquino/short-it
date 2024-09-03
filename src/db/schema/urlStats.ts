import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { urls } from "./urls";
import { sql } from "drizzle-orm";

export const urlStats = sqliteTable("url_stats", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   urlId: integer("urlId")
      .notNull()
      .references(() => urls.id),
   accessedAt: integer("accessed_at", { mode: "timestamp" })
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
   referrer: text("referrer"),
   userAgent: text("user_agent"),
   ipAddress: text("ip_address"),
});
