---
name: to-issues
description: Split a PRD into vertical-slice issue files. Use after to-prd.
---

# To Issues

Turn `docs/prd/PRD-<name>.md` and, if present, `docs/spec/SPEC-<name>.md` into issue files. If several PRDs exist, ask which one; if none, say so and stop. Write only issue files, never code. Never modify the PRD.

## Slicing rules

- Each issue is a thin, end-to-end path through every layer it needs (data, logic, API, realtime, tests), never a single layer.
- Independently buildable and testable; ordered by dependency.
- The first slice is the thinnest working path (tracer bullet).
- Use the PRD's terminology and respect its Boundaries, Out of Scope, Decisions, and Assumptions. Follow the spec's design. Create no issues for out-of-scope work.
- Every requirement (R#) and success criterion must be covered by at least one issue. Report any that are not.
- Work that depends on a blocking Open Question: make it a HITL issue, or exclude it and say so in the list.

## Workflow

1. Read the PRD and spec (skip files already in context), then inspect only code the spec does not cover (`AGENTS.md`, `flow.md`, related modules, tests).
2. Show the proposed list: number, title, blockers, type, and requirements covered (R#).
3. Ask exactly: **"Good to write?"** If the user requests changes, revise and show the list again.
4. After confirmation, write one file per slice to `docs/issues/<name>/NN-<slug>.md` (`<name>` from the PRD filename; create folders as needed). If the folder has issues, ask before overwriting.
5. Report the files written and suggest starting with issue 01.

## Issue format

```markdown
# NN: <title>

**Blocked by:** <issue numbers or None>
**Type:** <AFK or HITL>
**Covers:** <R#s>

## What

<Behavior delivered, 1-3 sentences.>

## Acceptance criteria

- [ ] <Testable check, from the PRD's success criteria>

## Notes

<Only when needed. Technical context from the spec: files, schema, interfaces.>
```

`AFK`: an agent can finish it alone. `HITL`: needs a human decision or input.
