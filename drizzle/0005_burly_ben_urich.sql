CREATE TABLE `url` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`original_url` text NOT NULL,
	`shortened_url` text NOT NULL,
	`userId` text,
	`created_at` integer DEFAULT '(CURENT_TIMESTAMP)' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `url_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`urlId` integer NOT NULL,
	`accessed_at` integer DEFAULT '(CURENT_TIMESTAMP)' NOT NULL,
	`referrer` text,
	`user_agent` text,
	`ip_address` text,
	FOREIGN KEY (`urlId`) REFERENCES `url`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `url_shortened_url_unique` ON `url` (`shortened_url`);