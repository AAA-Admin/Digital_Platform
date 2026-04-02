# Plan: AAA Events Digital Platform

> Source PRD: [aaa-events-production-prd.md](C:\Users\yuvar\OneDrive\Documents\GitHub\AAA\plans\aaa-events-production-prd.md)

## Architectural decisions

Durable decisions that apply across all phases:

- **Delivery model**: Greenfield production rebuild, not incremental cleanup of the current demo files.
- **Frontend**: Next.js single-page marketing site deployed on Vercel.
- **Brand asset**: Use the animated SVG logo at `C:\Users\yuvar\OneDrive\Documents\GitHub\AAA\AAA_logo.svg` with transparent-background live-site integration.
- **Positioning**: Present AAA as a complete event infrastructure support company, not only a scaffolding company.
- **Launch strategy**: Ship the signed website, form, SEO, and alert scope first.
- **Lead system**: Required form plus instant WhatsApp alerts to both directors.
- **Performance rule**: The build must be optimized to support the signed under-0.8-second target.
- **Operations**: Business-owned domain, repo, and deployment accounts must control production assets.
- **Design benchmark**: At every stage of website implementation, use award-winning sites featured on Awwwards as a recurring inspiration pool for craft, hierarchy, motion, and polish without directly copying other sites.

---

## Phase 1: Ownership, Site Shell, And First Draft

**User stories**: 1, 2, 3, 4, 5, 8, 9, 10, 14, 15, 16, 17

### What to build

Build the correct business-owned setup, production app foundation, and first-draft single-page site with real business content, portfolio structure, location details, contact actions, intentional use of the animated logo, and positioning that reflects the company’s broader event infrastructure support offering.

### Acceptance criteria

- [ ] Production app scaffold exists and can deploy on Vercel
- [ ] Public site has core sections for hero, services, portfolio, founders/company details, location, and contact CTA
- [ ] Site works on mobile and desktop
- [ ] Animated SVG logo is integrated intentionally in the header/hero brand system
- [ ] Direct WhatsApp, phone, and email actions work
- [ ] Production ownership gaps are documented, including repo remote alignment

---

## Phase 2: Form, Alerts, SEO, And Performance

**User stories**: 5, 6, 7, 11, 12, 13, 16, 17

### What to build

Add the agreed enquiry flow with required fields, spam protection, instant WhatsApp alerts to both directors, basic SEO and indexing setup, and hard performance work including the image optimization procedure for gallery assets. The SEO implementation should support broader growth across event-infrastructure search terms, not only the original narrow keyword list.

### Acceptance criteria

- [ ] Public enquiry form collects the agreed business fields
- [ ] Form includes basic anti-spam protection
- [ ] Both directors receive instant WhatsApp alerts on valid submission
- [ ] Success and failure states are clear to the visitor
- [ ] Metadata, sitemap, robots.txt, schema, and indexing basics are present
- [ ] Image optimization procedure is defined and applied to interim gallery assets
- [ ] Performance targets and Core Web Vitals are verified before handover

---

## Phase 3: Handover, Revisions, And Final Sign-Off

**User stories**: 1, 2, 5, 8, 9, 12, 13, 16, 17

### What to build

Finish the signed engagement with first-draft review handling, final verification, account walkthrough, and launch-ready handover on business-owned infrastructure.

### Acceptance criteria

- [ ] First-draft review checklist is completed against the signed scope
- [ ] In-scope revision pass is applied
- [ ] Final verification covers UX, alerts, SEO, and performance evidence
- [ ] Handover notes cover domain, Vercel, Search Console, and Analytics ownership
- [ ] Final sign-off checklist is ready for payment milestone release
