import { pgTable, uuid, timestamp, pgEnum, unique } from 'drizzle-orm/pg-core';
import { sessions } from './sessions';
import { users } from './users';

export const memberStatus = pgEnum('member_status', [
  'invited',
  'declined',
  'accepted',
  'joined',
  'left',
]);

export const sessionMembers = pgTable(
  'session_members',
  {
    id: uuid().primaryKey().defaultRandom(),
    sessionId: uuid('session_id')
      .notNull()
      .references(() => sessions.id),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    status: memberStatus().default('invited').notNull(),

    invitedAt: timestamp('invited_at').notNull().defaultNow(),
    respondedAt: timestamp('responded_at'),
    joinedAt: timestamp('joined_at'),
    leftAt: timestamp('left_at'),
  },
  (table) => [unique().on(table.sessionId, table.userId)],
);
