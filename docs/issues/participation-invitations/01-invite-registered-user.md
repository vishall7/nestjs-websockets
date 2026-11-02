# 01: Invite a registered user to a draft session

**Blocked by:** None
**Type:** AFK

## What

Deliver the host flow for inviting an existing registered user to a session. The participation capability validates the target through `UsersModule`, confirms session ownership and `DRAFT` status through session-management capability, and creates the invitation membership.

## API route

```text
POST /invitations
```

The request identifies the target session and registered user. This is the host action for creating an invitation, while all invitation actions remain under the single invitation resource.

## Acceptance criteria

- [ ] A host can invite an existing registered user to a session in `DRAFT`.
- [ ] Invitations are rejected for unregistered users.
- [ ] Invitations are rejected when the requester does not own the session.
- [ ] Invitations are rejected when the session is not `DRAFT`.
- [ ] Duplicate membership for the same user and session is rejected.
- [ ] A new invitation starts with `invited` status.

## Notes

The participation capability must use `UsersModule` rather than directly owning or manipulating user records. Invitation creation belongs to `InvitationsController` and is not part of `SessionManagementController`.
