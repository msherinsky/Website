import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BookingModal } from "@/components/BookingModal";
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
  display: "swap",
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
      url: "https://welgent.com",
      email: "matt@welgent.com",
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
        <BookingModal />
        <ZoomOverlay />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />

        {/* AI chat widget config (tiny inline, first-party, no cookies) */}
        <Script id="wg-config" strategy="beforeInteractive">
          {`window.WG_CONFIG={client:"welgent",name:"Alex",subtitle:"Welgent Sales Assistant",greeting:"Hi! I'm Alex from Welgent. We help local service businesses get found on Google, look credible, and book more jobs. What can I help you with?",colorPrimary:"#EB9A01",colorDark:"#C97F00",colorHeader:"#161412",quickReplies:"Let's Talk|Never Miss a Lead|Get Found First"};`}
        </Script>

        {/* Defer the third-party embeds (GHL booking form_embed + chat widget)
            until the first real user interaction — keeps their JS + third-party
            cookies out of initial load (faster LCP, no 3p cookies in audits).
            Real users trigger it instantly on their first scroll/tap/click. */}
        <Script id="defer-3p" strategy="afterInteractive">
          {`(function(){var done=false;function go(){if(done)return;done=true;['https://api.welgent.com/js/form_embed.js','/chat-widget.js'].forEach(function(src){var s=document.createElement('script');s.src=src;s.async=true;document.body.appendChild(s);});}var evs=['pointerdown','keydown','scroll','touchstart','mousemove'];function on(){go();evs.forEach(function(e){window.removeEventListener(e,on)});}evs.forEach(function(e){window.addEventListener(e,on,{once:true,passive:true})});})();`}
        </Script>
      </body>
    </html>
  );
}
