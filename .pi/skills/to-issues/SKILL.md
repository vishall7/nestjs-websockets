---
name: to-issues
description: Split a PRD into vertical-slice issue files. Use after to-prd.
---

# To Issues

Read `docs/prd/PRD-<name>.md`. If several PRDs exist, ask which one to use. Inspect the codebase before proposing issues. Do not write code.

## Slicing rules

- Each issue is a thin, end-to-end path across the necessary data, logic, API, UI, and tests.
- Never split work by layer alone.
- Every slice must be independently buildable and testable.
- Prefer thin slices over thick slices.
- Make the first slice the thinnest working path—the tracer bullet.
- Order slices by dependency.
- Use the terminology from the PRD.

## Workflow

1. Read the selected PRD and inspect the relevant codebase.
2. Show the proposed issue list with the number, title, blockers, and type for each issue.
3. Ask exactly: **“Good to write?”**
4. Only after the user confirms, write one issue file per slice.

## Issue files

Write files to `docs/issues/<name>/NN-<slug>.md`, creating folders as needed. Use this format:

```markdown
# NN: <title>

**Blocked by:** <issue numbers or None>
**Type:** <AFK or HITL>

## What

<Behavior delivered in 1–3 sentences.>

## Acceptance criteria

- [ ] <Testable check>
- [ ] <Testable check>

## Notes

<Include only when needed.>
```

`AFK` means an agent can complete the issue alone. `HITL` means it needs a human decision or input.

Do not modify the PRD.
