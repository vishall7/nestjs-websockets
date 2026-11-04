# Quiz Arena

## Product description

Quiz Arena is a technical prototype of a real-time multiplayer quiz system. An admin creates and runs a quiz session, registered users participate through a lobby, answers are scored in real time, and the final leaderboard is shown to participants.

## Product objective

Build a complete, production-shaped real-time quiz flow that demonstrates:

- Host-controlled session lifecycle
- Registered-user participation
- Lobby and WebSocket coordination
- Real-time question answering
- Scoring and final leaderboard

## Core flow

```text
Host creates a quiz session
  → Invites registered users
  → Opens the lobby
  → Participants join
  → Host starts the quiz
  → Participants answer questions
  → System calculates scores
  → Participants view the leaderboard
```

## Prototype scope

The prototype is complete when a host can run a quiz from session creation through the final leaderboard and participants can complete the experience as authenticated users.

The prototype should prioritize one coherent end-to-end flow over broad feature coverage.

## Out of scope

- Email, push, or external invitation delivery
- Inviting unregistered users
- Public session discovery
- Teams and tournaments
- Payments or monetization
- Multi-tenant organization features
- Advanced moderation
- Production-scale infrastructure

## Technical focus

Quiz Arena is currently a technical and architectural prototype rather than a validated business product. Its value is demonstrating real-time system design with NestJS, PostgreSQL, Drizzle ORM, authentication, session state transitions, participation rules, WebSockets, scoring, and leaderboards.
