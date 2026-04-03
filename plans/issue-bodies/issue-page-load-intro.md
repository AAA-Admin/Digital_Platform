## Parent PRD

#1

## Milestone

Mark this under milestone: `Future - Separate Agreement`

## What to build

Design and implement a cinematic page-load intro where an event-infrastructure setup assembles on screen using line-art / blueprint / figure-drawing style motion inspired by the supplied visual reference.

This should be treated as a separate workstream because it is materially larger than the signed “logo animation on page load” requirement.

Direction:
- keep using [Awwwards](https://www.awwwards.com/) as a quality benchmark and inspiration source throughout concepting and implementation
- actively ask the user for feedback on visual direction during implementation checkpoints
- transparent-background AAA logo remains part of the brand system
- intro animation should evoke full event infrastructure support, not only scaffolding
- prefer vector/line-figure or blueprint-like construction animation over heavy bitmap/video payloads
- use the NEP motion reference (`The Stamp Blue`) as a pacing and transformation reference only; do not copy their asset, sequence, or exact visual treatment
- performance impact must be tightly budgeted so the site can still target fast loads

Current logo-animation inspiration order:
1. `https://dribbble.com/shots/20335565-Logo-Animation-for-Sandbox-Concept`
2. `https://dribbble.com/shots/17972310-Lasso-Logo-Animation-Concept`
3. `https://dribbble.com/shots/18516438-Status-Effects-logo-animation-pack`

## Acceptance criteria

- [ ] Intro concept is defined with a clear visual direction
- [ ] Animation scope is separated from the signed delivery issues
- [ ] Implementation plan accounts for performance budget and graceful skip/fallback behavior
- [ ] Visual storytelling reflects broader event infrastructure work

## Blocked by

None - separate future track.

## Agent Guidance

| Agent | Role |
|---|---|
| Codex | Prototype and implement the intro animation when approved |
| Claude | Review the narrative clarity, performance tradeoffs, and visual quality |

Do not assign Codex or Claude as GitHub assignees or contributors.

## Suggested Skills

- Use `grill-me` before implementation if the visual story, sequencing, or motion tradeoffs are still ambiguous.
- Use `design-an-interface` if multiple intro directions should be explored before one is chosen.
- If the animation workflow becomes a repeated specialized pattern, create a dedicated skill rather than re-deciding the process each time.

## User stories addressed

- User story 1
- User story 3
- User story 10
- User story 16
- User story 17
