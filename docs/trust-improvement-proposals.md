# MediaPath EU — Trust & Credibility Improvement Proposals

**Document date:** June 9, 2026  
**Site:** mediapath.eu  
**Purpose:** Actionable recommendations to increase trust, conversion, and E-E-A-T for a B2B iGaming user acquisition agency.

---

## Executive Summary

MediaPath EU currently reads like a template agency site: generic claims (“proven success”, “specialized team”) with little supporting evidence. Player-facing affiliates and B2B iGaming agencies that convert trust lean on **evidence, people, process, and compliance** — most of these elements are missing today.

This document maps industry patterns from successful gaming affiliate and iGaming B2B sites to concrete page-level implementations for MediaPath EU.

---

## Current State Assessment

### Existing pages

| Route | File | Nav linked? |
|-------|------|-------------|
| `/` | `src/pages/index.astro` | Yes (logo) |
| `/about/` | `src/pages/about/index.astro` | Yes |
| `/services/` | `src/pages/services/index.astro` | Yes |
| `/blog/` | `src/pages/blog/index.astro` | No (homepage CTA only) |
| `/blog/[slug]/` | `src/pages/blog/[slug].astro` | — |
| `/articles/` | `src/pages/articles/index.astro` | No |
| `/articles/[slug]/` | `src/pages/articles/[slug].astro` | — |
| 404 | `src/pages/404.astro` | — |

**Missing:** reviews, contact, privacy, terms, team, case studies, methodology pages.

### Existing trust signals

| Signal | Present? | Notes |
|--------|----------|-------|
| Client testimonials / reviews | No | — |
| Case studies / client logos | No | — |
| Named team / author bios | No | Schema supports author fields; not rendered in UI |
| Methodology / process | Partial | One blog post on CAC methodology |
| Mission / expertise claims | Yes | About, homepage — unsubstantiated |
| Organization schema | Yes | `src/utils/schema.ts` |
| Contact email | Yes | `team.mediapath@gmail.com` on About/Services |
| Legal pages (privacy, terms, disclaimer) | No | — |
| FAQ schema | Defined, unused | `createFAQPageSchema` in `schema.ts` |
| Blog/Articles in nav | No | Low discoverability |

### Content depth

- **Homepage:** Hero, 3 strength cards, services summary, “Why Choose MediaPath” bullets, CTA. No stats, logos, or named clients.
- **About:** Short agency intro, mission/expertise cards, email CTA. No team photos, bios, history, or credentials.
- **Services:** 4 service cards with short blurbs. No pricing, process, deliverables, or case examples.
- **Blog:** 1 published post (`lower-igaming-cac-affiliate-media-mix.md`) — strongest methodology content on the site.
- **Articles:** Empty collection.

---

## What Works Elsewhere (Industry Patterns)

Patterns observed on successful player-facing affiliates and B2B iGaming agencies, adapted for MediaPath EU.

| Pattern | Reference examples | Why it works |
|---------|-------------------|--------------|
| **Editorial / methodology page** | [24Spins Editorial Policy](https://24spins.com/editorial-policy/), [PlayWithStakes Editorial Policy](https://playwithstakes.com/editorial-policy/) | Shows how partners are evaluated, traffic is scored, and editorial independence is maintained |
| **Named authors + bios** | Top casino review sites; BISAM E-E-A-T guidance | Google treats iGaming as YMYL — anonymous content signals low trust |
| **“Last updated” + changelog** | PlayWithStakes; Aff Rate 2026 playbook | Proves content isn’t stale; critical for bonus/CAC/compliance advice |
| **Responsible gambling stance** | Compliant affiliates; NY Gaming Commission advertising rules | Even B2B sites benefit — shows regulated-market understanding |
| **Case studies (Problem → Solution → Result)** | Absolute Digital (Ladbrokes, 888), Uberman Agency | Named or anonymized outcomes beat generic “proven track record” claims |
| **Team with operator/affiliate background** | [Uberman Agency](https://uberman.agency/) | B2B buyers want people who’ve done the work, not only managed it |
| **Process on service pages** | Plug & Bet; professional services best practice | “What you get in week 1–4” reduces perceived risk |
| **FAQ with real friction points** | iGB Affiliate schema guidance | KYC delays, geo restrictions, payout speed — not filler |
| **Legal / disclosure pages** | Every serious affiliate | Privacy, terms, affiliate disclosure — footer minimum |
| **Thought leadership hub** | MediaPath blog CAC post (good start) | One strong article isn’t enough; operators need a content footprint |

### E-E-A-T priorities for iGaming (Google YMYL)

From industry guidance (Exquisite Media, BISAM, Aff Rate):

1. **Experience** — Document real campaign work, testing processes, screenshots where appropriate.
2. **Expertise** — Named team with verifiable iGaming background (operator, affiliate, agency).
3. **Authoritativeness** — Case studies, conference presence, citations to regulators and official sources.
4. **Trustworthiness** — Clear company info, disclosures, responsible gambling links, correction policy.

### Compliance baseline (2026 iGaming affiliates)

Even as a B2B agency, demonstrating compliance awareness builds operator confidence:

- Clear commercial disclosure where affiliate relationships are discussed
- 18+ messaging and responsible gambling resource links
- Geo-fencing awareness — offers/traffic only where legal
- No “guaranteed wins” or misleading income framing
- Honest methodology including negatives and limitations

---

## Proposed Implementations

### Priority P0 — Foundation (implement first)

#### 1. Expand `/about/`

**Goal:** Replace anonymous agency copy with verifiable identity.

**Add:**
- Company legal entity, registration country, year founded
- 2–4 team cards: photo, name, role, 2-line bio (prior operator/affiliate/agency experience)
- “Who we work with”: operator types, geos, verticals (sportsbook, casino, crypto)
- Links to LinkedIn profiles and conference presence (if applicable)

**SEO notes:**
- Unique title/description (50–60 / 150–160 chars)
- `Organization` + `Person` JSON-LD for team members
- One H1, proper H2 hierarchy

---

#### 2. New page: `/methodology/` or `/how-we-work/`

**Goal:** Show process and compliance rigor (adapted from affiliate editorial policies).

**Sections:**
- How affiliate partners are sourced and vetted
- Traffic quality gates (fraud filters, KPI thresholds, hold periods)
- Compliance checklist per geo (#ad, RG messaging, geo-fencing)
- What MediaPath will not do (misleading promos, unlicensed markets, predatory targeting)
- Re-review cadence (e.g. quarterly partner audits, monthly bonus-term checks for content partners)

**SEO notes:**
- `WebPage` schema with clear `description`
- Internal links from Services and Homepage
- FAQ block at bottom (3–5 questions) with `FAQPage` schema

---

#### 3. Footer legal block

**Goal:** Minimum trust floor for any iGaming-related business.

**New pages:**
- `/privacy/` — data collection, cookies, contact for data requests
- `/terms/` — site use, liability, jurisdiction
- `/affiliate-disclosure/` — commercial relationships, how commissions work (B2B context)

**Footer additions:**
- Links to all legal pages
- Responsible gambling resources (BeGambleAware, GamCare, etc.)
- Full contact info (email; link to contact form when added)
- Blog and Articles in footer nav

---

#### 4. Homepage proof blocks

**Goal:** Replace unsubstantiated claims with evidence.

**Add sections:**
- **Metrics strip** — only real numbers (e.g. markets served, partner types, avg. CAC improvement)
- **Social proof** — 1–2 client quotes (anonymized OK: “Tier-1 EU sportsbook, Head of Acquisition”)
- **Logo bar** — if NDAs allow; otherwise vertical/geo tags (“Trusted by operators in DE, UK, Nordics”)
- **How we work** — 4-step timeline (Discovery → Strategy → Launch → Optimize)
- **Case snippet** — one mini case study linking to full `/case-studies/`

**Replace or support:**
- “Proven success” → specific outcome or quote
- “Specialized team” → link to team section on About

---

### Priority P1 — Conversion trust

#### 5. New page: `/case-studies/`

**Goal:** Highest-value trust page for B2B services (per professional services best practice).

**Structure per case study:**
- **Challenge** — market, budget, CAC problem, compliance constraints
- **Approach** — channels, partner mix, tools, timeline
- **Result** — measurable KPIs (CAC ↓, FTD ↑, ROI, geo expansion)
- **Stack** — tracker, affiliate platform, ad networks used
- **Quote** — client or internal lead (anonymized if needed)

**Example titles (anonymized):**
- “Mid-size EU casino — 32% CAC reduction via affiliate mix rebalance”
- “Sportsbook launch — compliant affiliate network build in 90 days”

**SEO notes:**
- `Article` or dedicated case study schema
- Trailing slashes on all URLs
- Unique meta per case

**Target:** 2–3 cases at launch; add one per quarter.

---

#### 6. Expand `/services/`

**Goal:** Clarify what clients buy and reduce sales friction.

**Per service** (Affiliate Marketing, Media Buying, Acquisition Tools, SaaS/B2B):

| Block | Content |
|-------|---------|
| Deliverables | Bullet list of tangible outputs |
| Timeline | 4-week onboarding (week-by-week) |
| Reporting | KPIs reported weekly/monthly |
| FAQ | 3–5 real questions per service |
| Mini case | Link to relevant case study |

**Sample FAQs:**
- “Do you work on CPA, rev share, or hybrid?”
- “Which geos do you cover?”
- “Minimum budget / commitment?”
- “How do you handle fraud and low-quality traffic?”
- “What compliance do you enforce on partners?”

---

#### 7. New page: `/contact/`

**Goal:** Professional intake vs. bare `mailto:` links.

**Include:**
- Contact form with use-case selector (operator / affiliate network / SaaS / other)
- Expected response time (e.g. “within 2 business days”)
- Email fallback: `team.mediapath@gmail.com`
- Optional: Calendly or similar booking embed
- `ContactPage` schema

---

### Priority P2 — Authority & SEO (E-E-A-T)

#### 8. Blog author bylines

**Goal:** Use existing content schema; render trust in UI.

**Implement on** `src/pages/blog/[slug].astro` **and** `src/pages/articles/[slug].astro`:
- Author name, photo (`author_image_url`), bio, link (`author_url`)
- Publication date + “Last updated” when `updatedDate` exists
- Related internal links at end of post

**Schema:** `BlogPosting` / `Article` with `author` as `Person`.

---

#### 9. Fill `/articles/` with operator-focused content

**Suggested topics:**
- Affiliate vs paid media mix by geo
- Fraud signals in iGaming traffic
- Compliance checklist for EU affiliate campaigns
- Partner vetting framework
- Case-style long reads (can mirror case study content)

**Cadence:** 1–2 pieces per month minimum for credible footprint.

---

#### 10. Improve content discoverability

- Add **Blog** and **Articles** to header and footer nav
- Homepage section: “Latest insights” with 2–3 recent posts
- Cross-link Services ↔ relevant blog/articles

---

#### 11. FAQ page with structured data

**New page:** `/faq/` or FAQ section on `/methodology/`

**Use existing** `createFAQPageSchema` **in** `src/utils/schema.ts`.

**Sample questions:**
- How do you measure affiliate traffic quality?
- What compliance do you enforce on partners?
- Do you work with unlicensed operators? (clear policy)
- Which markets do you support?
- How is pricing structured?
- What does onboarding look like?

---

### Priority P3 — Industry-specific trust (iGaming B2B)

#### 12. Compliance & responsible gambling page

**Route:** `/compliance/` or dedicated About section

**Content:**
- 18+ and RG tool awareness
- Geo markets you operate in vs. avoid
- Partner vetting criteria (license verification, regulator links)
- Links to BeGambleAware, GamCare, NCPG, etc.
- Statement on ethical acquisition (no vulnerable targeting)

---

#### 13. Partners / ecosystem page (optional)

**Route:** `/partners/` or section on Services

**If applicable, list integrations:**
- Affiliate platforms (Cellxpert, Affilka, etc.)
- Tracking and analytics tools
- Ad networks and programmatic partners

Shows operational depth without naming clients.

---

#### 14. Testimonials & social proof widget

**Options:**
- Client quotes with role + company type (anonymized)
- LinkedIn recommendations embedded or quoted
- Conference badges (SiGMA, iGB, etc.) if attended or spoken
- “As featured in” only if verifiable

---

## Page-by-Page Implementation Map

| Page | Add / change |
|------|----------------|
| **Home** | Proof metrics, process steps, case snippet, client logos/quotes, latest insights |
| **About** | Team bios, company facts, who we work with, compliance stance link |
| **Services** | Process, deliverables, FAQs, mini case per service |
| **Blog / Articles** | Author UI, update dates, more depth, nav links |
| **Case Studies** *(new)* | 2–3 anonymized wins with Problem → Solution → Result |
| **Methodology** *(new)* | Vetting, quality gates, compliance, what we won’t do |
| **Contact** *(new)* | Form, response time, schema |
| **Legal** *(new)* | Privacy, Terms, Affiliate Disclosure |
| **FAQ** *(new)* | Real operator questions + FAQPage schema |
| **Compliance** *(new)* | RG links, geo policy, partner criteria |
| **Footer** | Legal links, RG resources, Blog/Articles nav, contact |

---

## What NOT to Copy from Player-Facing Affiliates

MediaPath EU is a **B2B agency**, not a casino review site. Avoid:

| Don’t implement | Reason |
|-----------------|--------|
| Star ratings / self-assigned Review schema | Manual action risk if not a genuine review publisher |
| “Best casino” listicles | Wrong business model unless pivoting to publisher |
| Bonus comparison tables as primary content | Operators need process proof, not player promos |
| Generic FAQ filler | Hurts trust and schema quality |
| Stock team photos | Use real people or skip photos until available |

---

## Fastest Wins (estimated 1–2 days each)

1. **Team section on About** — real names, roles, bios  
2. **Footer legal + RG links** — Privacy, Terms, Disclosure stubs  
3. **Author bylines on blog** — wire up existing schema fields  
4. **Homepage “How we work”** — 4-step block  
5. **One anonymized case study** — single page proof point  

---

## Content & SEO Checklist (per new/changed page)

Before publishing any new page:

- [ ] Title 50–60 characters with primary keyword  
- [ ] Meta description 150–160 characters  
- [ ] Canonical URL with trailing slash  
- [ ] Complete Open Graph + Twitter card tags  
- [ ] JSON-LD appropriate to page type  
- [ ] One H1; no skipped heading levels  
- [ ] All internal links use trailing slashes  
- [ ] Images WebP with descriptive alt text  
- [ ] External links use `rel="noopener noreferrer"`  
- [ ] Run `bun run build` and `bun run seo:check`  

---

## Suggested Rollout Phases

### Phase 1 (Week 1–2)
- About team section  
- Footer legal pages (Privacy, Terms, Disclosure)  
- Homepage process + proof section  
- Blog author bylines  

### Phase 2 (Week 3–4)
- `/methodology/` page  
- `/contact/` page  
- Services FAQs and deliverables  
- Nav: Blog + Articles in header/footer  

### Phase 3 (Month 2)
- `/case-studies/` with 2–3 cases  
- `/faq/` with schema  
- 2 new blog or article pieces  
- `/compliance/` page  

### Phase 4 (Ongoing)
- One case study or article per month  
- Quarterly content refresh dates on key pages  
- Partner/ecosystem page when integrations are confirmed  

---

## References & Further Reading

- [E-E-A-T for Gambling Sites — Exquisite Media](https://weareexquisite.co.uk/e-e-a-t-for-gambling-sites-building-trust-with-google/)
- [Affiliate Compliance 2026 — Aff Rate](https://affrate.com/guides-playbooks/compliance-rg/affiliate-compliance-2026-igaming/)
- [Why Trust Is the Most Important Metric for iGaming Affiliates — First Look Games](https://firstlookgames.com/flg/why-trust-is-the-most-important-metric-for-igaming-affiliates/)
- [How schema can make good affiliate sites shine — iGB Affiliate](https://www.igbaffiliate.com/en/articles/seo/how-schema-can-make-good-affiliate-sites-shine-in-ai-search/)
- [24Spins Editorial Policy](https://24spins.com/editorial-policy/)
- [PlayWithStakes Editorial Policy](https://playwithstakes.com/editorial-policy/)
- [Uberman Agency — B2B iGaming trust example](https://uberman.agency/)
- [How to Build Trust as a Casino Affiliate — Lucky Buddha Affiliates](https://luckybuddhaaffiliates.com/affiliate-marketing-guides/how-to-build-trust-with-your-audience-as-a-casino-affiliate/)

---

## Appendix: Technical Notes

**Stack:** Astro 5, Tailwind CSS 4, Cloudflare Workers, content collections in `src/content/`.

**Key files for implementation:**
- Pages: `src/pages/`
- Layout: `src/layouts/Layout.astro`
- Components: `src/components/Header.astro`, `Footer.astro`
- Schema helpers: `src/utils/schema.ts`
- Content config: `src/content/config.ts` (author fields already defined)
- SEO component: `src/components/SEO.astro`

**Known issues to fix alongside trust work:**
- `robots.txt` may reference stale WordPress sitemap — update to `mediapath.eu`
- Articles collection is empty — prioritize 2–3 launch pieces
- Blog/Articles not in main navigation

---

*End of document*
