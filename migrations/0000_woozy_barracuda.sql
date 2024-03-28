CREATE TABLE `files` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`size` integer NOT NULL,
	`content` blob NOT NULL
);
