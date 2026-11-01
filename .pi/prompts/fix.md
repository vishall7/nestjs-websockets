---
description: Diagnose and fix a bug
argument-hint: "<bug description>"
---

Fix this bug:

$ARGUMENTS

- Follow `AGENTS.md`.
- Consult `flow.md` when relevant, but verify its guidance against the current code and tests.
- Confirm expected vs. actual behavior.
- Find the root cause before editing.
- Make the smallest focused fix.
- Add or update a regression test when practical.
- Run relevant tests, `npm run lint`, and `npm run build`.
- Avoid unrelated refactors or suppressing errors.

Report the root cause, changed files, validation performed, and any remaining uncertainty.
