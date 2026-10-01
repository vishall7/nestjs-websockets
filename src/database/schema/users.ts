import { pgTable, varchar, uuid, pgEnum } from 'drizzle-orm/pg-core';

export const roles = pgEnum('role', ['admin', 'standard']);

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: roles().default('standard').notNull(),
});
