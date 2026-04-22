# Local Service Business SEO Research Checklist

Use this before building an audit or demo site for any local service business.
Takes 30–60 minutes. Output feeds directly into the audit template.

---

## Step 1 — Cold Call Intel (capture during or right after the call)

- [ ] Business name (exact legal name)
- [ ] Owner first name
- [ ] Phone number
- [ ] Primary website URL
- [ ] Service type (junk removal, HVAC, pest control, etc.)
- [ ] Primary city / county
- [ ] Any other websites or domains they mention
- [ ] How long they've been in business (if said)
- [ ] Any complaints they mentioned about their current site

---

## Step 2 — Find All Their Domains

Search: `"[phone number]"` in Google to surface any domains using the same number.
Search: `"[business name]" site:yelp.com`, `site:bbb.org`, `site:angi.com`

- [ ] Primary domain (new site)
- [ ] Any old/secondary domain still live
- [ ] Yelp profile URL
- [ ] Google Business Profile (search business name + city)
- [ ] Facebook page
- [ ] BBB listing

**Red flag to note:** Same phone number on two different domains = competing signals for Google.

---

## Step 3 — Audit Each Live Domain

Run this for EVERY domain you find. Use WebFetch with prompt: *"Extract page title, meta description, all headings, service areas, schema markup, navigation links, and any business signals like phone, address, payment methods."*

For each domain record:

| Signal | Present? | Notes |
|---|---|---|
| Page `<title>` | | |
| Meta description | | |
| H1 | | |
| Schema markup | | |
| Location/service area | | |
| Contact page | | |
| Payment methods listed | | |
| Years / jobs claimed | | |

**Cross-reference domains:** Do they conflict on service areas? Payment methods? Services offered? Anything that disagrees = trust problem for Google and AI.

---

## Step 4 — Schema Audit

Open browser DevTools (F12 → Elements) or use a schema validator on each domain.

- [ ] `LocalBusiness` schema present?
- [ ] `areaServed` declared? (lists towns, or just city?)
- [ ] `FAQPage` schema on FAQ page?
- [ ] `sameAs` links to Yelp, Facebook, BBB?
- [ ] Canonical URLs on all pages?
- [ ] Any schema at all?

**Almost every local service business has zero schema. That alone is a deliverable.**

---

## Step 5 — Location Page Audit

- [ ] How many dedicated location pages exist?
- [ ] Are they unique or copy-pasted from each other? (Open 2–3 and compare body text)
- [ ] Does the footer/header show the wrong city on location pages?
- [ ] What towns are listed as served but have no dedicated page?
- [ ] Are there towns on the OLD site that never made it to the new site?

**Copy-paste location pages = Google discounts them. Unique pages = real geo signal.**

---

## Step 6 — Geo Gap Analysis

List every town/city they claim to serve. Then:

- [ ] Which ones have dedicated pages?
- [ ] Which national chains (1-800-GOT-JUNK, College Hunks, etc.) DON'T serve the rural towns?
- [ ] Does the county have bulk item pickup for unincorporated areas? (Usually no — this is your angle for rural pages)
- [ ] What's the nearest transfer station / convenience center? (This is what residents have to do instead — validates need for a hauler)
- [ ] Are there lake properties, college rentals, historic homes, or mill towns in the area? (Each has a specific junk removal angle)

---

## Step 7 — On-Page Content Quality

- [ ] Does the FAQ page have real answers or placeholders?
- [ ] Are pricing, hours, and payment methods listed anywhere?
- [ ] Is the owner named anywhere on the site?
- [ ] Is there a physical address?
- [ ] Are credentials (license, insurance, USDOT) mentioned and verifiable?
- [ ] Are there real customer quotes or reviews displayed?
- [ ] Is there a real contact page (not just a footer phone number)?

---

## Step 8 — Competitor Gap Check

Search: `"[service type] [primary city] SC"` — look at the top 3–5 results.

For each competitor note:
- [ ] Do they have location pages?
- [ ] Do they have schema?
- [ ] Do they cover the same rural towns?
- [ ] What's their title tag and meta description?

**If competitors also have no schema and no location pages, that's a wide open lane.**

---

## Step 9 — Identify the Angle

Before building anything, answer these:

1. **What is the single biggest problem with their current site?** (competing domain, no schema, copy-paste pages, etc.)
2. **What geo gap is most exploitable?** (rural towns no one covers, specific neighborhoods, lake communities)
3. **What makes this business legitimately different?** (owner answers phone, serves rural areas, USDOT licensed, longest in market, etc.)
4. **What will Google and AI see that they can't see now?** (schema, meta descriptions, unique location pages, consistent NAP across platforms)

These four answers become the four main sections of the audit.

---

## Output Checklist — What You Should Have Before Building

- [ ] Both/all domains audited
- [ ] Full list of towns they serve (+ which have pages, which don't)
- [ ] List of missing schema types
- [ ] 3–5 specific problems ranked by severity
- [ ] Clear differentiator angle for the business
- [ ] List of town-specific content angles (lake properties, college rentals, mill towns, etc.)
- [ ] Owner name, phone, address confirmed

**This research takes 30–60 minutes. The build takes 2–4 hours. The research is what makes the build worth $2,500+.**
