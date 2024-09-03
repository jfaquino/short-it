ALTER TABLE `url` RENAME COLUMN `shortened_url` TO `short_code`;--> statement-breakpoint
DROP INDEX IF EXISTS `url_shortened_url_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `url_short_code_unique` ON `url` (`short_code`);