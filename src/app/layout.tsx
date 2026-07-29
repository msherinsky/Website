import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ZoomOverlay } from "@/components/ZoomOverlay";

/*
 * Type system, self-hosted via next/font/local (zero CLS, no Google fetch):
 * - Bricolage Grotesque → display/headings/logo (warm, editorial, distinctive)
 * - DM Sans → body/UI (the Octopush body face — clean, friendly, legible)
 * Both are variable woff2 files we own (assets/fonts → app/fonts).
 */
const heading = localFont({
  variable: "--font-heading",
  src: "./fonts/bricolage-grotesque.woff2",
  weight: "400 800",
  // `optional`: hero headline (LCP) paints in the size-matched fallback and
  // never re-paints for the web font, so mobile LCP isn't font-swap-bound.
  display: "optional",
});
const body = localFont({
  variable: "--font-body",
  src: [
    { path: "./fonts/dm-sans.woff2", style: "normal", weight: "300 800" },
    { path: "./fonts/dm-sans-italic.woff2", style: "italic", weight: "300 800" },
  ],
  display: "swap",
});

const DESCRIPTION =
  "We build and run the website, local SEO, AI receptionist, follow-ups, reviews, and reporting for local service businesses — so leads come in and jobs get booked while you're out on a job.";

export const metadata: Metadata = {
  metadataBase: new URL("https://welgent.com"),
  title: "Welgent — Get Seen. Build Trust. Book Every Job.",
  description: DESCRIPTION,
  applicationName: "Welgent",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Welgent",
    url: "https://welgent.com",
    title: "Welgent — Get Seen. Build Trust. Book Every Job.",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welgent — Get Seen. Build Trust. Book Every Job.",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://welgent.com/#organization",
      name: "Welgent",
      legalName: "Welgent",
      url: "https://welgent.com",
      email: "matt@welgent.com",
      telephone: "+1-443-856-9230",
      // Must match the A2P/TCR brand registration and the footer.
      address: {
        "@type": "PostalAddress",
        streetAddress: "7412 Newham Ln",
        addressLocality: "Sarasota",
        addressRegion: "FL",
        postalCode: "34240",
        addressCountry: "US",
      },
      description: DESCRIPTION,
      founder: { "@type": "Person", name: "Matt Sherinsky", jobTitle: "Founder" },
      areaServed: { "@type": "Country", name: "United States" },
      serviceType: [
        "Web Design & Development",
        "Local SEO",
        "Google Business Profile Optimization",
        "AI Call Answering",
        "CRM Automation",
        "Marketing Automation",
        "Monthly Reporting",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://welgent.com/#website",
      url: "https://welgent.com",
      name: "Welgent",
      description: DESCRIPTION,
      publisher: { "@id": "https://welgent.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base font-body text-ink">
        {/* Nav + Footer are written ONCE here and wrap every page. */}
        <SmoothScroll />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <ZoomOverlay />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />

        {/* LeadConnector chat widget, exactly as GHL supplies it. This is the
            site's ONLY data-collection surface — there are no forms and no
            booking embeds anywhere, so the chat is the single opt-in point
            (required for A2P registration).

            Deliberately a plain <script>, NOT next/script: the A2P compliance
            scanner reads the served HTML, and next/script injects the tag
            client-side after hydration, so the snippet never appeared in the
            source. Keep this snippet verbatim — no added attributes, no
            wrapper JS driving it. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- kept verbatim as GHL supplies it */}
        <script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a6a0ce626a343b92b5219ab"
          data-source="WEB_USER"
        />
      </body>
    </html>
  );
}
