## Parent PRD

#1

## Milestone

Mark this under milestone: `M2 - Lead Funnel, SEO, and Speed`

## What to build

Add the public enquiry form path with the signed field set, validation, basic spam protection, and clear success/error behavior so visitors can submit event requirements without calling immediately.

This issue owns the structured capture layer on the webpage. When all required fields are filled, the frontend/backend flow should produce a composed WhatsApp-ready message payload from those structured values so the next issue can deliver it.

Signed fields:
- Name
- Phone Number
- City / Location
- Type of Event
- Approximate Budget Range
- Brief Requirement

## Acceptance criteria

- [ ] Users can submit an enquiry from the site
- [ ] Required fields are validated correctly
- [ ] Basic anti-spam protection is in place
- [ ] Form data is normalized into a structured payload using the signed field set
- [ ] A composed WhatsApp-ready message is generated from the structured payload
- [ ] Success and failure states are clear to the visitor

## Blocked by

- Blocked by #4

## Agent Guidance

| Agent | Role |
|---|---|
| Codex | Implement the enquiry form end to end |
| Claude | Review field completeness and user-facing behavior |

Do not assign Codex or Claude as GitHub assignees or contributors.

## User stories addressed

- User story 5
- User story 6
- User story 16
- User story 17
