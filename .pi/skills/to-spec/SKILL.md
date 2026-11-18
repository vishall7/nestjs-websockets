---
name: to-spec
description: Turn the PRD and session context into a technical spec. Use after to-prd, before to-issues.
---

# To Spec

Write the technical design for `docs/prd/PRD-<name>.md` to `docs/spec/SPEC-<name>.md` (create the folder if needed). Run in the same session as align and to-prd: reuse what is already in context and do not re-read files you have already seen. If there is no PRD, say so and stop. If the spec exists, ask before overwriting.

The PRD is the source of truth for behavior. Never change it or contradict it. If it is missing something or conflicts with the code, record it under **Open Questions** instead of deciding product behavior.

## Before writing

Inspect only the code the PRD touches that is not yet in context (`flow.md`, related modules, schema, tests). Follow existing architecture and conventions. Every file, module, table, or event name you cite must exist in the code or be marked **new**.

## Sections

1. **Context**: Existing modules and files this builds on, and the relevant conventions.
2. **Design**: Approach in a few sentences, and the components involved (new or changed).
3. **Data**: Schema and migration changes (tables, columns, constraints, indexes).
4. **Interfaces**: HTTP routes and WebSocket events: name, direction, payload, auth, errors.
5. **Logic**: Flow, state transitions, concurrency and idempotency handling, validation, failure handling.
6. **Requirement Map**: Each R# mapped to the components and sections that implement it.
7. **Testing**: What to test at which level (unit, e2e, WebSocket), including edge cases from the PRD.
8. **Decisions**: One line each: choice, rejected alternative, reason.
9. **Risks and Open Questions**: Technical risks, and unresolved items (mark any that block work).

## Rules

- Decide the "how" using a recommended default. Ask the user only when a choice has product impact or a major tradeoff, and record the answer under Decisions.
- Be specific enough for an issue to be written from one section: names, types, signatures, and schema are fine, but do not write full implementations.
- Cover every R#. Skip sections that do not apply, and say "none" rather than padding.
- Use the project's terminology.
- When done, report the file path and open questions, then suggest `to-issues`.
