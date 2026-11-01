# 05: Leave a joined session

**Blocked by:** 04
**Type:** HITL

## What

Allow a joined participant to leave before gameplay begins. Leaving changes membership from `joined` to `left` and records the leave timestamp.

## Acceptance criteria

- [ ] A participant with `joined` status can leave before the session becomes `ACTIVE`.
- [ ] Leaving changes the membership status to `left` and records `leftAt`.
- [ ] A user who is not `joined` cannot leave the session as a participant.
- [ ] Leaving is rejected once the session is `ACTIVE` or `EXPIRED`.
- [ ] Leaving does not create a duplicate membership record.

## Notes

The rejoin behavior for a participant with `left` status remains an open product decision.
