## Parent PRD

#1

## Milestone

Mark this under milestone: `M2 - Lead Funnel, SEO, and Speed`

## What to build

Implement the signed lead-alert behavior so the composed message from the structured form payload is delivered to WhatsApp for both directors with the required lead details.

The target outcome is the signed contract behavior, not a WhatsApp bot or automated reply flow.

## Acceptance criteria

- [ ] Both directors receive WhatsApp alerts on valid form submission
- [ ] Alert content is sourced from the structured payload composed in the form layer
- [ ] Failure handling is observable and does not mislead the visitor

## Blocked by

- Blocked by #6

## Agent Guidance

| Agent | Role |
|---|---|
| Codex | Implement the alert flow and integration path |
| Claude | Review the payload and verify it matches the signed requirement |

Do not assign Codex or Claude as GitHub assignees or contributors.

## User stories addressed

- User story 7
- User story 16
- User story 17
