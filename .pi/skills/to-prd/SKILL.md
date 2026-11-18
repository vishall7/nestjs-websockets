---
name: to-prd
description: Turn the aligned conversation into a PRD file. Use after align is done.
---

# To PRD

Write the confirmed align summary to `docs/prd/PRD-<short-name>.md` (name = feature or module; create the folder if needed).

Use only what was agreed. Do not invent content or ask new questions. Only two things may be asked: if there is no confirmed ("Aligned?" = yes) summary, say so and stop; if the file exists, ask before overwriting.

## Sections

1. **Problem**: What is missing or wrong, and why it matters.
2. **Goal**: Desired outcome in 1–2 sentences.
3. **User Stories**: "As a [user], I want [action], so that [benefit]."
4. **Requirements**: Numbered (R1, R2…) behaviors, edge cases, and constraints.
5. **Boundaries**: What this owns, what it connects to, what it won't touch.
6. **Out of Scope**: What we are not building.
7. **Success Criteria**: Testable checks, each referencing the requirement(s) it proves.
8. **Decisions**: One line each: choice, and rejected alternative.
9. **Assumptions**: User-accepted defaults.
10. **Open Questions**: Deferred or unresolved items only; mark any that block the work.

## Rules

- Say **what** and **why**, never **how**: no code or implementation details. For realtime, describe triggers, recipients, and outcomes, not event names or payloads.
- Use the project's terminology.
- Aim for one page. If trimming, cut prose first; never cut requirements, edge cases, success criteria, or open questions.
- When done, report the file path and open questions, then suggest `to-spec`.
