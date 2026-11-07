# Adapt Community — Website Source

A dark, premium, responsive, multi-page website for Adapt Community, built with **plain HTML, CSS, and JavaScript**. It does not require React, a bundler, or a CSS framework.

## Included pages

1. `index.html` — Home, mission introduction, ecosystem pillars, featured wider network, development journey, projects, Projecta, and global preview.
2. `about.html` — Adapt story, vision, mission, philosophy, audience, values, and differentiators.
3. `ecosystem.html` — Nine connected ecosystem pillars with detailed explanations.
4. `programs.html` — All nine Capacity Building tracks, Adapt Media Lab, Adapt PR Academy, and technology pathways. Includes search, filters, and expandable details.
5. `hackathons.html` — Project-TA Hackathon and its eight-stage experience.
6. `incubation.html` — Projecta and its eight-stage development pathway.
7. `projects.html` — Project profiles for Achieva, SOE, AcidX, Trash Cash, and CAOA, with category filters.
8. `global-network.html` — Interactive country selector and globe-style network visualization for Egypt, Nigeria, Pakistan, India, and the United States.
9. `partners.html` — Wider network directory with official identity checks and carefully qualified relationship notes.
10. `join.html` — Participant, volunteer, committee, collaboration, and mentor pathways, plus a validated inquiry form.

## Run locally

Because the JavaScript files are loaded as regular scripts, no build step is needed.

**Option A — Python**

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

**Option B — VS Code**

Open this folder and run `index.html` with the Live Server extension.

## Main files

```text
adapt-community-website/
├── index.html
├── about.html
├── ecosystem.html
├── programs.html
├── hackathons.html
├── incubation.html
├── projects.html
├── global-network.html
├── partners.html
├── join.html
├── styles.css
├── assets/
│   ├── adapt-mark.svg
│   ├── adapt-logo-placeholder.svg
│   ├── adapt-favicon.svg
│   ├── adapt-og.svg
│   ├── partners/
│   ├── projects/
│   └── js/
│       ├── config.js
│       ├── data.js
│       └── app.js
├── CODEX_HANDOFF.md
└── README.md
```

## Replace the Adapt logo and other assets

All Adapt-owned asset paths are centralized in `assets/js/config.js` under `ADAPT_CONFIG.brand` and `ADAPT_CONFIG.assets`. Replace the SVG placeholder files or change the paths in that file. The same configuration contains centralized paths for project logos, project images, program images, community images, and partner logos.

Partner logo tiles currently use editable text wordmarks rather than unofficial or stretched logos. This is intentional: a few official logo resources were identified during the source review, but the image files could not be downloaded into this working environment. Add approved, locally stored logo files under `assets/partners/`, then set their paths in `config.js`. See `assets/partners/README.md` for the source list. Keep each organization's original logo proportions and brand rules.

The Adapt logo is explicitly a **replaceable placeholder**, not a claim that this is Adapt's official brand mark.

## Contact form — important

The form on `join.html` validates the fields. By default, it opens an email draft addressed to the contact email in `assets/js/config.js`. The user still needs to review and press **Send** in their email application. The site does not claim that an application was submitted.

To use a real form backend, set `ADAPT_CONFIG.contact.formEndpoint` in `assets/js/config.js` to a real POST endpoint. The JavaScript will show a success message only when the endpoint responds successfully. Do not use a made-up endpoint.

## Partner and collaborator verification notes

The site uses the label **“Wider network”** rather than implying that every listed organization is a current formal sponsor or contractual partner. The presence of a name on the page is not an endorsement claim.

The public-source review found official identity or event pages for:

- Hack Club — official press kit: <https://hackclub.com/press>
- CREATIVA — official initiative: <https://creativa.gov.eg/about-creativa/>
- ITIDA / TIEC — official ITIDA and TIEC pages: <https://www.itida.gov.eg/English/Programs/TIEC/Pages/default.aspx> and <https://tiec.gov.eg/English/Pages/FAQs.aspx>
- The VentureX — official site: <https://www.theventurex.com/>
- Goethe-Institut — Cultural Garage, Alexandria: <https://www.goethe.de/ins/eg/en/kul/ser/kulturgarage.html>
- IEEE Egypt Section — official site: <https://ieee.org.eg/>
- Daydream Alexandria — official Hack Club event page: <https://daydream.hackclub.com/alexandria>

These sources verify the organizations' public identities or event context, **not** the existence of a formal relationship with Adapt. The Adapt-specific connection text is qualified accordingly.

No authoritative public source matching the exact names **The Fourth Dimension**, **Syn Code**, or **Revivles** in the stated Adapt context was identified in this review. Those entries are marked “Needs confirmation”; confirm their official identities, spellings, websites, logos, and relationship details before presenting them as formal partners.

## Content decisions and items to review before publication

- The source description says the nine Capacity Building track names were originally proposed names, while the master website brief explicitly says to present them as established CBP components. The Programs page follows the more specific master brief. Confirm that all nine tracks are approved for public presentation.
- The source material provides only brief descriptions for AcidX and CAOA and limited detail for Achieva. Their profiles intentionally avoid inventing a problem statement, solution, status, technology stack, team, results, or funding.
- The global page presents the countries from Adapt's supplied network description. It does not invent office addresses, member counts, local team sizes, or branch achievements.
- No event dates, testimonials, user counts, impact metrics, funding figures, or awards were fabricated.
- The contact email is centralized in `assets/js/config.js`; confirm it is the address Adapt wants to publish.

## Features implemented

- Responsive multi-page navigation with mobile menu and active-page states.
- Sticky glass-style header.
- Animated hero network canvas (disabled for reduced-motion users).
- Reveal-on-scroll transitions.
- Project and partner directories rendered from centralized data.
- Program search, program category filters, project filters, and partner verification filters.
- Expandable program details using native accessible `<details>` controls.
- Interactive country selector tied to the globe-style visual.
- Contact form validation and truthful no-backend fallback behavior.
- SEO page titles/descriptions, Open Graph metadata, SVG favicon, semantic section structure, and reduced-motion support.

## Before launch

1. Replace the Adapt logo placeholder with the approved mark and wordmark.
2. Add only approved and locally stored partner logos and project images.
3. Confirm the nine CBP track names and the project descriptions.
4. Confirm the public contact email and connect a real form endpoint if online applications are needed.
5. Review partner relationships with each organization before using the words “official partner”, “sponsor”, or “endorsed by”.
6. Test all pages on actual phones and desktop browsers after adding final assets.
