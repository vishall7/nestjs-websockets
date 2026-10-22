import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';

export const sessionStatus = pgEnum('session_status', [
  'draft',
  'lobby',
  'active',
  'expired',
]);

export type SessionStatus = (typeof sessionStatus.enumValues)[number];

export const sessions = pgTable('sessions', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 100 }).notNull(),
  joinCode: varchar('join_code', { length: 8 }).notNull().unique(),
  status: sessionStatus().default('draft').notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
});

export type Session = typeof sessions.$inferSelect;
