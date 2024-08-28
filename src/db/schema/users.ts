import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
   id: text("id").primaryKey(),
   name: text("name"),
   email: text("email").unique(),
   emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
   image: text("image"),
});
