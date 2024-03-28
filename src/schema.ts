import { integer, sqliteTable, text, blob, int } from 'drizzle-orm/sqlite-core';

export const files = sqliteTable('files', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type').notNull(),
	size: int('size').notNull(),
	content:  blob('content').notNull(),
});