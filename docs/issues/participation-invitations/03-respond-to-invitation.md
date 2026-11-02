# 03: Accept or decline an invitation

**Blocked by:** 02
**Type:** AFK

## What

Allow an invited user to accept or decline their invitation while the session is in `DRAFT` or `LOBBY`. Record the response and enforce the membership transitions `invited → accepted` and `invited → declined`. These actions are handled by the same `InvitationsController` as invitation creation and retrieval.

## API routes

```text
POST /invitations/:invitationId/accept
POST /invitations/:invitationId/decline
```

## Acceptance criteria

- [ ] The invited user can accept their own invitation in `DRAFT`.
- [ ] The invited user can accept their own invitation in `LOBBY`.
- [ ] Accepting changes the status to `accepted` and records `respondedAt`.
- [ ] The invited user can decline their own invitation in `DRAFT` or `LOBBY`.
- [ ] Declining changes the status to `declined` and records `respondedAt`.
- [ ] A user cannot respond to another user’s invitation.
- [ ] An already-responded invitation cannot be accepted or declined again.
- [ ] Responses are rejected for `ACTIVE` and `EXPIRED` sessions.
