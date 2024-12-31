import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { urls } from "./urls";
import { relations, sql } from "drizzle-orm";

export const urlStats = sqliteTable("url_stats", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   urlId: integer("urlId")
      .notNull()
      .references(() => urls.id),
   accessedAt: text("accessed_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
   referrer: text("referrer"),
   userAgent: text("user_agent"),
   ipAddress: text("ip_address"),
   country: text("country"),
   city: text("city"),
   deviceType: text("device_type"),
   browser: text("browser"),
   os: text("operating_system"),
});

export const urlStatsRelations = relations(urlStats, ({ one }) => ({
   url: one(urls, { fields: [urlStats.urlId], references: [urls.id] }),
}));
