import type { Metadata } from "next";
import { ServiceHero } from "@/components/ServiceHero";
import { WebsiteSeoExplainer } from "@/components/WebsiteSeoExplainer";
import { AuditCTA } from "@/components/AuditCTA";
import { getService } from "@/config/services";

const s = getService("website-seo");

export const metadata: Metadata = {
  title: `${s.short} — Welgent`,
  description: s.hero.sub,
};

export default function Page() {
  return (
    <>
      {/* hero — unchanged, so the click-to-zoom from the ring still lands cleanly */}
      <ServiceHero service={s} />

      {/* the feeling + outcome: Web Design (obvious choice) + SEO (your reach) */}
      <WebsiteSeoExplainer />

      <AuditCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${s.short} — Welgent`,
            serviceType: s.hero.eyebrow,
            description: s.hero.sub,
            provider: { "@type": "Organization", name: "Welgent", url: "https://welgent.com" },
            areaServed: "United States",
          }),
        }}
      />
    </>
  );
}
