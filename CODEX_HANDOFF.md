# Codex handoff — Adapt Community website

Open this folder in Codex and ask it to continue the implementation with the instruction below.

---

You are continuing an existing, working static multi-page website for Adapt Community. Read `README.md`, `assets/js/config.js`, `assets/js/data.js`, `assets/js/app.js`, and all ten HTML pages before making changes.

## Goal

Bring the website to production-ready quality while preserving the current dark, premium, futuristic visual identity and the requirement to deliver separate HTML, CSS, and JavaScript files.

## Non-negotiable requirements

1. Keep all ten independent pages and all existing content areas.
2. Keep plain HTML, CSS, and JavaScript unless a migration is explicitly requested. Do not collapse the site into a single long landing page.
3. Keep brand, project, program, community, and partner asset paths centralized in `assets/js/config.js`.
4. Do not fabricate statistics, testimonials, results, event dates, office locations, funding, project status, team details, or formal partner relationships.
5. Keep the partner list labelled as Adapt's wider network unless an individual relationship is independently confirmed. Do not infer a formal partnership from a public organization profile.
6. The contact form must not claim to submit unless a configured backend returns success. Keep the email-draft fallback truthful.
7. Preserve mobile responsiveness, keyboard navigation, semantic structure, contrast, image alt text, and `prefers-reduced-motion` support.
8. Keep the Capacity Building naming discrepancy documented: the original source description calls the nine track names proposed; the master website brief says to present them as established components. Do not silently change that publication decision.

## Tasks

- Audit every route, navigation link, anchor, button, filter, search control, form state, and mobile menu.
- Fix console errors and accessibility problems.
- Improve layout consistency and responsive behavior across common mobile, tablet, laptop, and desktop breakpoints.
- Optimize animations and avoid expensive continuous work when a page is backgrounded or reduced motion is requested.
- Ensure local assets load from relative paths and have fallbacks.
- If approved partner logos are added, download them only from official sources, preserve brand specifications, store them locally under `assets/partners/`, and update `config.js`.
- Do not invent identities for The Fourth Dimension, Syn Code, or Revivles; request verified source details or keep their pending status.
- Add tests or an automated static QA script if useful, but do not add unnecessary dependencies.

## Completion criteria

Return a concise change report that lists the files changed, tests actually run, unresolved content/brand approvals, and any backend still required for live form submissions. Do not claim browser or device testing unless it was actually performed.
