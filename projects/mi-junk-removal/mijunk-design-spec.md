# M&I Junk Removal — Website Design Specification

Use this document to rebuild the site with the same visual design, layout, and component patterns. Copy/content is intentionally left out — fill that in separately.

## Reference Screenshots

- `mijunk-homepage-full.png` — full homepage scroll (full page)
- `mijunk-hero.png` — top of page viewport (shows popup modal + header)
- `mijunk-location-page.png` — location sub-page (same layout as homepage)

---

## Color Palette

| Role | Value |
|---|---|
| Header / nav background | `#7B0000` (dark crimson) |
| Primary CTA button | `#CC0000` (bright red) |
| Service cards background | `#CC0000` |
| Hero / dark section background | `#111111` (near-black) |
| Page background (light sections) | `#FFFFFF` |
| Section background (alt light) | `#F5F5F5` |
| Dark section (FAQ, footer) | `#1A1A1A` |
| Trust bar background | `#FFFFFF` |
| Body text (on light) | `#222222` |
| Body text (on dark) | `#FFFFFF` |
| Section heading underline accent | `#CC0000` |

---

## Typography

| Element | Style |
|---|---|
| Site name / logo text | Bold, uppercase, sans-serif |
| Nav links | Medium weight, sans-serif, ~15px |
| Section headings (e.g. "RESIDENTIAL JUNK REMOVAL") | Bold, uppercase, sans-serif, ~32–36px, left-aligned |
| Section heading accent | Thick red horizontal bar below the heading text |
| Hero headline | Extra bold, white, ~52–64px, stacked on multiple lines |
| Hero subtext | Regular weight, white, ~16px |
| Card headings | Bold, white, ~16px |
| Card body | Regular, white, ~13–14px |
| CTA button text | Bold, uppercase, white, ~14–15px, letter-spacing |
| Body paragraphs | Regular, dark gray, ~15px, line-height ~1.6 |
| FAQ question | Medium weight, ~15–16px |
| Footer text | Small, white/gray, ~13px |

Font stack: System sans-serif or a clean Google Font like **Open Sans** or **Roboto** — the site doesn't use a distinctive display font.

---

## Page Structure (top to bottom)

### 1. Sticky Header
- Full-width dark red (`#7B0000`) bar, ~70px tall
- **Left:** Logo — truck icon graphic + "M & I" bold text + "JUNK REMOVAL & HAULING" subtext beneath, all in white/light
- **Center:** Nav links — Home, Services (dropdown), Locations, Contact Us — white text
- **Right:** Two buttons side by side:
  - "GET FREE QUOTE" — outlined white button
  - Phone number `(864) 359-7319` — filled red button
- Sticks to top on scroll

---

### 2. Hero Section
- Full-width, ~500–600px tall
- Background: dark photo of a junk removal truck / crew at a job site (dimmed overlay so text reads)
- **Left side content:**
  - Large bold white headline (3–4 lines, stacked)
  - Short paragraph subtext in white, ~16px
  - Two CTA buttons side by side:
    - Primary: filled red "GET A FREE QUOTE"
    - Secondary: outlined white or lighter button

---

### 3. Trust Bar
- White background strip, ~80px tall
- 4 items evenly spaced, centered:
  - 📍 100% Local
  - 👨‍👩‍👧 Family Business
  - ✅ Insured
  - 📋 Fully Licensed
- Each item: small icon + bold label, dark text

---

### 4. Service Sections (repeats 3 times)
One block each for: **Residential Junk Removal**, **Commercial Junk Removal**, **Demolition & Excavation**

**Section header:**
- White background
- Large bold uppercase heading, left-aligned
- Thick red horizontal bar below heading (decorative underline, ~4px, extends ~120px)

**Content row:**
- Left: paragraph text (~3–4 sentences) + one red CTA button below ("Book Your [Service] →" style)
- Right: photo image, ~400px wide, rounded corners or square

**Card grid (below content row):**
- 4 cards in a row (2x2 on mobile)
- Each card:
  - Red background (`#CC0000`)
  - White bold heading (~16px)
  - White body text (~13px, 2–3 sentences)
  - Small icon or emoji top-right corner
  - Slight shadow or border-radius ~6px
  - Padding ~16–20px

---

### 5. Locations Section
- Dark background (`#1A1A1A`)
- Centered bold white heading "LOCATIONS SERVING" with red underline accent
- Grid of pill/rounded-rectangle buttons:
  - Red fill (`#CC0000`), white text, bold
  - Border-radius ~20–24px (pill shape)
  - ~160px wide, ~44px tall
  - Cities: Anderson SC, Belton SC, Williamston SC, Honea Path SC, Pendleton SC, Clemson SC
  - 2–3 per row, centered

---

### 6. About Section
- White or very light gray background
- Heading: "ABOUT US" with red underline
- Long-form paragraph text, left-aligned, ~600px max-width, centered in container
- Below that: a "Why Choose Us" subsection on dark background with checkmark list items in white

---

### 7. FAQ Section
- Dark background (`#1A1A1A`)
- Centered heading "Frequently Asked Questions About Junk Removal in [City]"
- Accordion-style expandable rows:
  - Each row: question text left, `+` / `▼` toggle right
  - Divider line between items
  - White text on dark
  - Expanded state shows answer text below
- Red CTA button centered below accordion: "GET A FREE QUOTE"

---

### 8. Footer
- Black background (`#0A0A0A`)
- Top strip: logo left, contact info (address, phone, email) center-right
- Main footer: 3–4 columns
  - **Quick Links** — nav link list
  - **Customer Care** — secondary links
  - **Follow Us** — social icons (Facebook, Instagram, etc.)
- Bottom bar: copyright text centered, small gray text

---

## Popup / Lead Capture Modal

Fires on page load (after ~1–2 seconds).

- White card, centered, ~500px wide, red border or top accent bar
- Logo at top center
- Bold heading "GET A FREE QUOTE!"
- Form fields:
  - Full Name (text input)
  - Phone (tel input with flag/country code selector)
  - Short message about your needs (textarea)
  - Checkbox: SMS consent disclaimer with links to Terms and Privacy Policy
- Large red "SEND" button, full width
- Close `×` button top-right corner

---

## Buttons

| Type | Style |
|---|---|
| Primary CTA | Red fill `#CC0000`, white bold uppercase text, border-radius ~4px, padding ~12px 24px |
| Secondary / ghost | White border, white text, same sizing — used on dark backgrounds |
| Nav CTA (GET FREE QUOTE) | White outlined, ~smaller padding |
| Phone button | Red fill, white text, in header |
| Location pills | Red fill, white text, border-radius ~22px (fully rounded) |
| FAQ CTA | Red fill, same as primary, centered |

---

## Responsive / Mobile Notes

- Header collapses to hamburger menu
- Hero text scales down, stacks vertically
- 4-card grids become 2-column or 1-column
- Location pills wrap to 2 per row
- Content rows (text + image) stack vertically, image below text

---

## Overall Aesthetic Summary

Bold, high-contrast, action-oriented. Dark backgrounds anchor the page with red as the single accent color throughout. Heavy use of all-caps headings, chunky red cards, and prominent CTA buttons. Photography is real/authentic (trucks, crews, job sites). No gradients, no decorative illustrations — straightforward service business site focused on lead capture.
