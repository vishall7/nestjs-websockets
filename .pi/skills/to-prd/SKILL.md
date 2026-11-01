---
name: to-prd
description: Turn the aligned conversation into a PRD file. Use after align is done.
---

# To PRD

Write the agreed understanding to `docs/prd/PRD-<short-name>.md`. The name must match the feature or module. Create the folder if it does not exist.

Do not ask new questions or invent anything. Put unresolved gaps under **Open Questions**.

## Required sections

1. **Problem**: What is missing or wrong, and why it matters.
2. **Goal**: The desired outcome in 1–2 sentences.
3. **User Stories**: Use the format: “As a [user], I want [action], so that [benefit].”
4. **Requirements**: Behaviors, edge cases, and constraints.
5. **Boundaries**: What this owns, which existing parts it connects to, and what it will not touch.
6. **Out of Scope**: What we are not building.
7. **Success Criteria**: How we know it works.
8. **Open Questions**: Anything unresolved.

## Rules

- Say **what** and **why**, never **how**. Do not include code or implementation details.
- Use the project's own terminology.
- Keep the PRD to one page.
- Preserve the agreed understanding from the conversation.
