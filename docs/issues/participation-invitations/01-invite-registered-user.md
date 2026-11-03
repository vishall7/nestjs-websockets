# 01: Invite a registered user to a draft session

**Blocked by:** None
**Type:** AFK

## What

Deliver the host flow for inviting an existing registered user to a session. The participation capability validates the target through `UsersModule`, confirms session ownership and `DRAFT` status through session-management capability, and creates the invitation membership.

## API route

```text
POST /invitations
```

The request must include the target `sessionId` and registered `inviteeUserId`. The authenticated user is the host and must not be supplied in the request body. This is the host action for creating an invitation, while all invitation actions remain under the single invitation resource.

## Acceptance criteria

- [x] A host can invite an existing registered user to a session in `DRAFT` using `sessionId` and `inviteeUserId`.
- [x] Invitations are rejected for unregistered users.
- [x] The authenticated host is used as the inviter; a host user ID supplied by the client is ignored or rejected.
- [x] Invitations are rejected when the requester does not own the session.
- [x] Invitations are rejected when the session is not `DRAFT`.
- [x] Duplicate membership for the same user and session is rejected.
- [x] A new invitation starts with `invited` status.

## Notes

The participation capability must use `UsersModule` rather than directly owning or manipulating user records. Invitation creation belongs to `InvitationsController` and is not part of `SessionManagementController`.
