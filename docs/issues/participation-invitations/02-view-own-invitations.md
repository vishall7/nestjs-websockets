# 02: View the current user’s invitations

**Blocked by:** 01
**Type:** AFK

## What

Allow an authenticated user to retrieve their invitations so they can decide which sessions to join. The result includes the related session information and current membership status. This is handled by the single `InvitationsController` used for the invitation resource.

## API route

```text
GET /invitations
```

## Acceptance criteria

- [ ] An authenticated user can retrieve their invitations.
- [ ] The response includes invitations addressed to the current user.
- [ ] The response includes enough session information to identify each invitation.
- [ ] A user cannot retrieve another user’s invitations.
- [ ] Invitations with `invited`, `accepted`, or `declined` status are represented accurately.
