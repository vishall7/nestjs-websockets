import { pgTable, varchar, uuid, pgEnum } from 'drizzle-orm/pg-core';

export const roles = pgEnum('role', ['admin', 'standard']);

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 100 }).notNull(),
  role: roles().default('standard').notNull(),
});
