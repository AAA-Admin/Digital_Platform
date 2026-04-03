# PRD: AAA Events Digital Platform

> Source inputs: signed agreement at `01_Client_Facing/AAA_Events_Project_Agreement.docx`, supporting client-facing docs, current static demo, and repo audit on 2026-04-02.

## Problem Statement

AAA Events & Production currently has no production-grade digital platform. The business depends heavily on calls, WhatsApp conversations, and offline credibility, which means:

- new leads can be lost outside working hours
- the brand does not yet present itself like a premium, trustworthy event infrastructure company
- there is no fast, custom-coded web presence owned on business-controlled accounts
- there is no reliable lead form that routes enquiries instantly to the directors
- the business is missing basic SEO and Google indexing setup

The initial version of the website must solve these problems within the signed agreement scope and budget, using a production-ready build rather than a sales demo.

## Solution

Build a modern AAA-owned single-page website on `aaa-events.in` that:

- establishes premium trust for event organizers and corporate buyers
- highlights AAA as a complete event infrastructure support company, with ringlock scaffolding as a core capability rather than the only positioning
- includes the agreed custom-coded gallery, service sections, founders section, Google Maps embed, and contact details
- captures leads through a structured enquiry form
- sends instant WhatsApp alerts with lead details to both directors
- delivers the agreed basic SEO and Google indexing setup
- is optimized to satisfy the signed under-0.8-second performance target

This build must stay inside the contract. Future add-ons can be tracked separately, but they should not contaminate the signed delivery backlog.

## User Stories

1. As a first-time visitor, I want the website to load quickly and feel premium, so that I trust AAA with high-value event work.
2. As a mobile visitor, I want the site to work cleanly on my phone, so that I can browse and contact AAA without friction.
3. As a prospective client, I want to understand AAA's full event infrastructure support offering, so that I know they are relevant for my event.
4. As a prospective client, I want to see past work, so that I can judge scale, finish quality, and professionalism.
5. As a prospective client, I want clear contact actions for WhatsApp, phone, and enquiry, so that I can reach AAA through my preferred channel.
6. As a prospective client, I want to submit an enquiry form, so that I can share event details even if I do not want to call immediately.
7. As an AAA owner, I want both directors to receive instant WhatsApp alerts from the form, so that lead follow-up starts immediately.
8. As an AAA owner, I want the site deployed on infrastructure AAA controls, so that the project is portable and not tied to a developer's personal accounts.
9. As an AAA owner, I want domain, deployment, analytics, and search-console ownership documented clearly, so that operations stay manageable if people change.
10. As an AAA owner, I want the public site copy and assets to reflect the actual business, so that the website matches ground reality.
11. As an AAA owner, I want the gallery asset pipeline optimized before final content arrives, so that the live site can preserve the under-0.8-second performance target.
12. As an AAA owner, I want basic SEO and metadata in place, so that the business can be discovered organically.
13. As an AAA owner, I want Google indexing readiness handled properly, so that the site can start ranking after launch.
14. As a prospective client, I want to see location and service area details, so that I know AAA operates in Bangalore and nearby areas.
15. As a prospective client, I want reassurance about reliability and safety, so that I feel comfortable reaching out for large events.
16. As an AAA owner, I want the build tracked through clean GitHub issues and milestones, so that execution is systematic.
17. As an AAA owner, I do not want Codex or Claude assigned as contributors on issues, so that issues stay human-owned and operationally clean.

## Implementation Decisions

- The project should be treated as a production hardening effort around an existing static demo reference. The current demo at `C:\Users\yuvar\OneDrive\Documents\GitHub\AAA\01_Client_Facing\demo\index.html` should be mined for reusable sections, motion ideas, content structure, and visual direction where that accelerates delivery without carrying over demo-only compromises.
- The recommended frontend foundation is Next.js on Vercel because it supports a fast custom-coded single-page site on business-owned infrastructure.
- The canonical brand logo asset is `C:\Users\yuvar\OneDrive\Documents\GitHub\AAA\AAA_logo.svg`, and the live site should use a transparent-background variant for header/hero placement.
- The signed scope is limited to:
  - single-page custom website
  - gallery using provided or interim images
  - lead capture form
  - instant WhatsApp alerts to both directors
  - basic SEO and Google indexing setup
  - deployment on AAA-owned infrastructure
- The following are explicitly out of scope for this build and should not appear as implementation issues in the main backlog:
  - custom admin panel/CMS
  - WhatsApp bot / automated reply flow
  - AI lead research or database enrichment
  - booking/scheduling integration
  - Google My Business setup
  - backlink campaigns
  - blog/content writing
  - additional pages beyond the single-page scope
- The production UI should use the real animated SVG logo instead of recreating logo motion in CSS/JS unless a later optimization requires a fallback.
- The messaging and information architecture should position AAA as a broader event infrastructure partner, not only a scaffolding vendor.
- Throughout the website build, visual and interaction quality should be benchmarked against award-winning sites featured on Awwwards. The inspiration source is the showcased work, not Awwwards' own site chrome, and it does not permit direct copying of another site's assets or implementation.
- The gallery slice should define a standard image-optimization procedure using an open-source test subject before final client assets arrive.
- SEO should be implemented as a strong baseline for growth, not just a minimal keyword checkbox. The signed build still covers basic SEO/indexing, but the content and page structure should support broader discoverability across event-infrastructure search intent.
- Domain, repo, and deployment should be aligned to business-owned accounts before launch, with the current remote mismatch corrected as part of setup.
- The planning backlog should keep issues unassigned by default while still documenting recommended Codex vs Claude pickup in issue bodies.

## Testing Decisions

- Tests should verify externally visible behavior rather than implementation details.
- The public site should be checked for:
  - responsive rendering
  - functional contact links
  - form submission success and error states
  - SEO and metadata basics
  - deployment readiness
- Lead-flow tests should verify:
  - validation of required fields
  - basic anti-spam behavior
  - alert dispatch behavior to both directors
  - failure handling when downstream services are unavailable
- Performance checks should verify:
  - gallery assets follow the optimization procedure
  - page speed remains under the target budget
  - Core Web Vitals pass before handover

## Out of Scope

- custom admin panel/CMS
- WhatsApp bot automation
- AI lead research/database enrichment
- booking or payment workflows
- Google My Business setup
- backlink campaigns
- blog/content writing
- additional pages beyond the single-page scope
- paid ads and marketing execution

## Further Notes

- The current local git remote points to `yuvaraj-97/AAA`, which should be corrected before production work starts.
- The logo direction is now transparent background for live-site integration.
