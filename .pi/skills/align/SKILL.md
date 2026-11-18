---
name: align
description: Interview the user about an idea, feature, or change until both share the same understanding. Use before writing a PRD or plan.
---

# Align

Interview the user until every gap is decided, assumed, or deferred. Do not write code or files. Capture product behavior and existing constraints only; do not design implementation (modules, schema, endpoints).

## Interview

1. Read only the relevant code first (`AGENTS.md`, `flow.md`, related modules, schema, tests) for facts, not design. Never ask what the code can answer. If it is ambiguous, say what you found and ask only the decision it can't settle.
2. Ask one decision at a time (tightly coupled sub-options may share a question). Give a recommended answer with its basis (code, `flow.md`, convention, assumption) and main tradeoff. Use the project's terminology.
3. Cover what's relevant, skip the rest: problem/why, goal, users/roles and their benefit, behavior and state transitions, validation and failure cases, concurrency/idempotency, WebSocket events, data ownership, security, boundaries, out-of-scope, success criteria.
4. Success criteria must be observable and testable; push back if not.

## Handling answers

Keep a running record of decisions, assumptions, rejected alternatives, and deferred questions.

- **Vague, or conflicting with an earlier decision:** name the conflict and affected behavior, offer the smallest set of alternatives, record the choice. Never contradict a prior decision silently.
- **"I don't know" / "your call" / "later":** propose a default, label it an assumption or deferred question, and say whether it blocks the PRD or plan.
- **Scope growth:** ask: include now, defer, or out of scope?

## Finishing

Stop once problem, goal, users, behavior, boundaries, constraints, and success criteria are each decided, assumed, or deferred.

Summarize:
- Problem
- Goal
- Users/roles and benefit
- Core behavior
- Rules and edge cases
- Boundaries (owns / connects to / won't touch) and out-of-scope
- Success criteria
- Decisions (with rejected alternatives)
- Assumptions (user-accepted defaults)
- Deferred questions (mark any that block the PRD)

Ask: "Aligned?" If no, ask about what's wrong and re-summarize. If yes, suggest `to-prd` (or `plan` for small changes) and wait for the user.
