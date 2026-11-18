---
description: Implement a feature following existing project conventions
argument-hint: "<feature-request>"
---

Implement the requested feature, unless the active workflow prohibits code changes.

- Follow higher-priority and task-specific instructions; do not override constraints such as “do not edit code.”
- Use acceptance criteria and any PRD/spec/issue as the source of truth. Surface conflicts or blocking product questions; note technical assumptions.
- Inspect the working tree and relevant code first. Preserve existing changes; follow `AGENTS.md` and consult `flow.md` when relevant.
- Make the smallest correct change, avoid unrelated refactoring, and add or update relevant tests.
- Run relevant tests and checks (lint/build when appropriate); report anything not run and why.
- Summarize changed files, validation results, assumptions, and remaining risks or questions.

Task: $@
