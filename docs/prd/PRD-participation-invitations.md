# Participation and Session Invitations

## Problem

The project needs a clear way for registered users to be invited to and participate in game sessions. Without defined invitation and membership rules, invitation delivery, acceptance, lobby entry, and session-state restrictions could become inconsistent across the application.

## Goal

Provide a consistent participation flow in which a host invites registered users during session preparation, users respond to invitations in the application, and accepted users explicitly join the session lobby.

## User Stories

- As a host, I want to invite registered users to a session, so that I can prepare participants before opening the lobby.
- As a user, I want to view my invitations, so that I can decide which sessions to join.
- As a user, I want to accept or decline an invitation, so that my participation choice is recorded.
- As a user, I want to join an accepted session, so that I can enter its lobby.
- As a host, I want to open the lobby even when some invitations are unanswered, so that one unresponsive user cannot block the session.
- As a user, I want to leave a session, so that I can stop participating before gameplay begins.

## Requirements

- Participation and invitations belong to the `ParticipationModule` business capability; a separate invitation module is not required.
- Only existing registered users may be invited.
- Invitation delivery is out of scope for now; users are assumed to access invitations through the application.
- A host may create invitations only while the session is `DRAFT`.
- An invitation starts as `invited` and may become `accepted` or `declined`.
- Users may accept or decline an invitation while the session is `DRAFT` or `LOBBY`.
- Accepting an invitation changes membership from `invited` to `accepted`.
- Declining an invitation changes membership from `invited` to `declined`.
- A host may move a session to `LOBBY` while invitations are still pending.
- A user may join only when the session is `LOBBY` and their invitation status is `accepted`.
- Joining changes membership from `accepted` to `joined`.
- A joined participant may leave, changing membership from `joined` to `left`.
- New invitations and new joins are not allowed after the session becomes `ACTIVE`.
- `EXPIRED` sessions are terminal and do not accept new participation.
- The current user must only be able to view and respond to their own invitations.
- Duplicate participation for the same user and session must be prevented.
- The participation capability must use `UsersModule` to verify invited users rather than directly owning user records.

## Boundaries

This capability owns invitations, invitation responses, eligibility to join, joining, leaving, and membership state transitions. An invitation is the participation record connecting a registered user to a session; it is owned by `ParticipationModule`, not by session management or user profile management. It depends on `UsersModule` to verify that invited users are registered, on `SessionManagementModule` for session ownership and lifecycle state, and on the identity and access capability to identify authenticated users. Session creation, user profile management, session lifecycle management, realtime lobby presence, gameplay, scoring, notification delivery, and leaderboard behavior are owned elsewhere.

## Out of Scope

- Email, push, or external invitation delivery.
- Inviting unregistered users.
- Invitation resend or expiration behavior.
- Realtime lobby presence and broadcasts.
- Gameplay, scoring, and leaderboard behavior.
- A separate `InvitationModule`.

## Success Criteria

- Hosts can invite registered users only during `DRAFT`.
- Users can view, accept, and decline their invitations in the application.
- Accepted users can explicitly enter a `LOBBY` session.
- Pending invitations do not prevent the host from opening the lobby.
- Users cannot join sessions without an accepted invitation or after gameplay starts.
- Membership transitions remain consistent: `invited → accepted/declined`, `accepted → joined`, and `joined → left`.
- Duplicate memberships and unauthorized invitation access are rejected.

## Open Questions

- Whether a participant whose status is `left` may rejoin the same session has not yet been defined.
