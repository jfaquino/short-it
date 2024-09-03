-- Custom SQL migration file, put your code below! --
CREATE TABLE `url_new` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`original_url` text NOT NULL,
	`short_code` text NOT NULL,  
	`userId` text,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,  
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE NO ACTION ON DELETE SET NULL
); --> statement-breakpoint

INSERT INTO `url_new` (id, original_url, short_code, userId, created_at)
SELECT id, original_url, short_code, userId, created_at
FROM `url`;--> statement-breakpoint

DROP TABLE `url`;--> statement-breakpoint

ALTER TABLE `url_new` RENAME TO `url`;--> statement-breakpoint

CREATE UNIQUE INDEX `url_short_code_unique` ON `url` (`short_code`);--> statement-breakpoint

CREATE TABLE `url_stats_new` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`urlId` integer NOT NULL,
	`accessed_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`referrer` text,
	`user_agent` text,
	`ip_address` text,
	FOREIGN KEY (`urlId`) REFERENCES `url`(`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
);--> statement-breakpoint

INSERT INTO `url_stats_new` (id, urlId, accessed_at, referrer, user_agent, ip_address)
SELECT id, urlId, accessed_at, referrer, user_agent, ip_address
FROM `url_stats`;--> statement-breakpoint

DROP TABLE `url_stats`;--> statement-breakpoint

ALTER TABLE `url_stats_new` RENAME TO `url_stats`;
