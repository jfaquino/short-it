PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_url_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`urlId` integer NOT NULL,
	`accessed_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`referrer` text,
	`user_agent` text,
	`ip_address` text,
	`country` text,
	`city` text,
	`device_type` text,
	`browser` text,
	`operating_system` text,
	FOREIGN KEY (`urlId`) REFERENCES `url`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_url_stats`("id", "urlId", "accessed_at", "referrer", "user_agent", "ip_address", "country", "city", "device_type", "browser", "operating_system") SELECT "id", "urlId", "accessed_at", "referrer", "user_agent", "ip_address", "country", "city", "device_type", "browser", "operating_system" FROM `url_stats`;--> statement-breakpoint
DROP TABLE `url_stats`;--> statement-breakpoint
ALTER TABLE `__new_url_stats` RENAME TO `url_stats`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX "url_short_code_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `url` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT (CURRENT_TIMESTAMP);--> statement-breakpoint
CREATE UNIQUE INDEX `url_short_code_unique` ON `url` (`short_code`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);