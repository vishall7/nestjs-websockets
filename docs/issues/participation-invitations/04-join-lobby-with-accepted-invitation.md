# 04: Join a lobby with an accepted invitation

**Blocked by:** 03; session-management capability must allow the session to enter `LOBBY`
**Type:** AFK

## What

Allow a user with `accepted` membership to join a session lobby. Joining is permitted only while the session is in `LOBBY` and changes membership to `joined`.

## Acceptance criteria

- [ ] A user with `accepted` membership can join a session in `LOBBY`.
- [ ] Joining changes the membership status to `joined` and records `joinedAt`.
- [ ] A user with `invited` or `declined` membership cannot join.
- [ ] Joining is rejected for `DRAFT`, `ACTIVE`, and `EXPIRED` sessions.
- [ ] A user cannot join another user’s participation record.
- [ ] Repeated joining does not create duplicate membership.
- [ ] Pending invitations do not prevent the session from entering or remaining in `LOBBY`.
