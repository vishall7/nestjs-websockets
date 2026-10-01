// schema/relations.ts
import { defineRelations } from 'drizzle-orm';
import { users } from './users';
import { sessions } from './sessions';
import { sessionMembers } from './sessionMembers';

export const relations = defineRelations(
  { users, sessions, sessionMembers },
  (r) => ({
    users: {
      createdSessions: r.many.sessions(),
      memberships: r.many.sessionMembers(),
    },
    sessions: {
      createdBy: r.one.users({
        from: r.sessions.createdBy,
        to: r.users.id,
      }),
      members: r.many.sessionMembers(),
    },
    sessionMembers: {
      session: r.one.sessions({
        from: r.sessionMembers.sessionId,
        to: r.sessions.id,
      }),
      user: r.one.users({
        from: r.sessionMembers.userId,
        to: r.users.id,
      }),
    },
  }),
);
