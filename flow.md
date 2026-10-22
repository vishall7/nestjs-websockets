Your idea is clear. The important part is to organize the application around **what users can do**, not around database tables.

For example, avoid modules such as:

```text
UsersModule
SessionsTableModule
SessionMembersModule
QuestionsModule
ScoresModule
```

Instead, organize the system around business capabilities.

## Recommended business module boundaries

### 1. Identity and Access

**Purpose:** Identify users and control access to the application.

Responsibilities:

- Signup and login
- Password authentication
- JWT issuing and validation
- Current user/profile
- Roles such as `admin` and `standard`
- Authorization policies

Your existing `auth` and `users` code belongs here.

A possible future structure:

```text
identity/
  auth/
  profile/
  authorization/
```

The `users` table is only an implementation detail of this capability. Other modules should not directly manipulate it.

---

### 2. Session Management

**Purpose:** Allow an admin to create and control a game session.

Responsibilities:

- Create a session
- Configure the session name
- Configure the duration
- Generate a unique join identifier
- Define who the host/admin is
- Open or close registration
- Start the session
- End the session
- Enforce session state transitions

Possible lifecycle:

```text
DRAFT
  ↓
OPEN
  ↓
LOBBY
  ↓
ACTIVE
  ↓
FINISHED
```

The current `sessions.ts` table is currently only a persistence model. It does not yet express the business lifecycle.

The business module should own rules such as:

```text
Only the session host can start a session.
A finished session cannot be started again.
A session cannot start without questions.
A closed session cannot accept new participants.
```

Suggested name:

```text
GameSessionsModule
```

or:

```text
SessionManagementModule
```

I would use `GameSessionsModule`, because it represents the business concept rather than merely a database record.

---

### 3. Participation and Invitations

**Purpose:** Manage how users become participants in a session.

Responsibilities:

- Invite a user
- Accept an invitation
- Decline an invitation
- Join using a unique session identifier
- Leave a session
- Prevent duplicate participation
- Check whether joining is allowed
- Check whether the user is already a participant

This capability should own the rules around membership. It should not be placed inside `UsersModule`.

Your current `sessionMembers.ts` table supports this capability, but the table itself should not determine the module boundary.

Suggested name:

```text
ParticipationModule
```

The invitation flow could be:

```text
Admin invites user
  ↓
User sees invitation
  ↓
User accepts or declines
  ↓
Accepted user joins the lobby
```

The join-by-identifier flow could be:

```text
User submits session code
  ↓
System validates session is open
  ↓
System validates user may join
  ↓
Participant is added
  ↓
User enters lobby
```

---

### 4. Lobby and Presence

**Purpose:** Coordinate users before the game begins.

Responsibilities:

- Show current participants
- Notify users when someone joins or leaves
- Show participant readiness
- Allow the host to see lobby status
- Broadcast session state changes
- Decide whether the session can start
- Handle WebSocket connection and disconnection events

This is a realtime capability and should be separated from ordinary session CRUD.

Suggested name:

```text
LobbyModule
```

The lobby can use the participation capability to obtain membership information, but it owns realtime behavior such as:

```text
participant.joined
participant.left
participant.ready
session.started
```

A useful distinction is:

```text
Participation = Who is allowed to participate?
Lobby = Who is currently present and waiting?
```

---

### 5. Quiz Authoring

**Purpose:** Allow the admin to define what the session contains.

Responsibilities:

- Add questions
- Edit questions
- Delete questions
- Add exactly four options
- Mark the correct option
- Order questions
- Attach questions to a session
- Validate that the quiz is ready before starting

Suggested name:

```text
QuizAuthoringModule
```

Although questions belong to a session, they should not necessarily be implemented directly inside `GameSessionsModule`. They represent a separate business capability: creating and validating quiz content.

Rules might include:

```text
Every question must have four options.
Exactly one option must be correct.
A session cannot start without at least one question.
Questions cannot be modified after the session starts.
```

---

### 6. Live Gameplay

**Purpose:** Run the active competition.

Responsibilities:

- Deliver questions to participants
- Track the current question
- Enforce the session timer
- Accept answers
- Reject late answers
- Prevent multiple answers for the same question
- Calculate points
- Broadcast question and timer events
- End gameplay when time expires

Suggested name:

```text
GameplayModule
```

This module should not expose the correct answer to clients before the question is completed.

A typical flow:

```text
Session starts
  ↓
Question is published
  ↓
Player submits answer
  ↓
Answer is validated
  ↓
Score is calculated
  ↓
Next question is published
  ↓
Timer expires or all questions are completed
```

This is likely the most WebSocket-heavy part of the project.

---

### 7. Results and Leaderboard

**Purpose:** Close the competition and communicate the outcome.

Responsibilities:

- Calculate final scores
- Rank participants
- Resolve ties
- Store final results
- Expose leaderboard
- Announce winner
- Allow participants to view their result

Suggested name:

```text
ResultsModule
```

Keep scoring rules in this capability or in `GameplayModule`, but establish one clear owner.

For example:

```text
GameplayModule:
  Records answers and raw answer timing.

ResultsModule:
  Calculates final ranking and publishes the leaderboard.
```

This separation makes it easier to change scoring later.

---

## Overall boundary map

```text
Identity and Access
        |
        v
Game Sessions -----> Participation and Invitations
        |                         |
        v                         v
Quiz Authoring              Lobby and Presence
        |
        v
Live Gameplay
        |
        v
Results and Leaderboard
```

A more practical NestJS layout could be:

```text
src/
  identity/
    auth/
    profile/
    authorization/

  game-sessions/
    game-sessions.module.ts
    game-sessions.controller.ts
    game-sessions.service.ts
    session-lifecycle.service.ts

  participation/
    participation.module.ts
    invitations.controller.ts
    participation.controller.ts
    participation.service.ts

  lobby/
    lobby.module.ts
    lobby.gateway.ts
    lobby.service.ts

  quiz-authoring/
    quiz-authoring.module.ts
    quiz-authoring.controller.ts
    quiz-authoring.service.ts

  gameplay/
    gameplay.module.ts
    gameplay.gateway.ts
    gameplay.service.ts
    scoring.service.ts

  results/
    results.module.ts
    results.controller.ts
    results.service.ts

  database/
  common/
```

The database schemas can still remain together in `src/database/schema`. That does not mean your business modules are table-based. The database layer is infrastructure; the business modules own the rules.

## Suggested first implementation phase

Do not start with the full quiz engine or leaderboard. Build one complete vertical slice first:

### Phase 1: Session lifecycle and lobby

Implement:

1. Admin creates a session.
2. System generates a unique join code.
3. Admin invites or allows users to join.
4. Standard users accept invitations or join with the code.
5. Users enter the lobby.
6. Lobby shows current participants.
7. Admin starts the session.
8. Session changes from `LOBBY` to `ACTIVE`.

This phase proves the most important foundation:

```text
Authentication
  → authorization
  → session ownership
  → participation
  → WebSocket lobby
  → session lifecycle
```

You will probably need to extend the current session persistence model with concepts such as:

```text
session code
session status
duration
opened at
started at
ended at
```

The exact fields are implementation details. The important business rule is that the session has a controlled lifecycle.

## Phase 2: Quiz authoring

Add:

1. Admin creates questions.
2. Each question receives four options.
3. One option is marked correct.
4. Questions are attached to a session.
5. The session cannot start unless the quiz is valid.

## Phase 3: Live gameplay

Add:

1. Start countdown.
2. Publish questions.
3. Accept answers.
4. Enforce timing.
5. Calculate points.
6. Broadcast game state over WebSockets.

## Phase 4: Results

Add:

1. Finalize scores.
2. Rank participants.
3. Store the leaderboard.
4. Broadcast the winner.
5. Allow users to retrieve their results.

## Important boundary rule

Other modules should not directly call the database or update another module's tables.

For example:

```text
Bad:
GameplayService directly updates session_members and users tables.

Better:
GameplayService asks ParticipationService:
"Is this user an eligible participant in this session?"
```

Similarly:

```text
Bad:
LobbyService directly changes the session status in the database.

Better:
LobbyService requests GameSessionsService to start the session.
```

Your current `UsersService` should remain responsible for user/profile operations. It should not grow methods such as:

```ts
joinSession();
acceptInvitation();
submitAnswer();
calculateScore();
```

Those belong to the corresponding business capabilities.

The first boundary I would implement is therefore:

```text
Identity and Access
Game Sessions
Participation
Lobby
```
