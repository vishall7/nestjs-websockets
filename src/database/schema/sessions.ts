import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const sessionStatus = pgEnum('session_status', [
  'draft',
  'open',
  'lobby',
  'active',
  'finished',
]);

export const sessions = pgTable('sessions', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 100 }).notNull(),
  joinCode: varchar('join_code', { length: 8 }).notNull().unique(),
  durationMinutes: integer('duration_minutes').notNull(),
  status: sessionStatus().default('draft').notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
