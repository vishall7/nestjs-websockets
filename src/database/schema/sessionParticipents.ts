import { pgTable, uuid, timestamp, pgEnum, unique } from 'drizzle-orm/pg-core';
import { sessions } from './sessions';
import { users } from './users';

export const participantStatus = pgEnum('participant_status', [
  'invited',
  'accepted',
  'declined',
]);

export const sessionParticipants = pgTable(
  'session_participants',
  {
    id: uuid().primaryKey().defaultRandom(),
    sessionId: uuid('session_id')
      .notNull()
      .references(() => sessions.id),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    status: participantStatus().default('invited').notNull(),
    invitedAt: timestamp('invited_at').notNull().defaultNow(),
    respondedAt: timestamp('responded_at'),
  },
  (table) => [unique().on(table.sessionId, table.userId)],
);
