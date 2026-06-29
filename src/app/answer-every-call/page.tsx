import type { Metadata } from "next";
import { ServiceHero } from "@/components/ServiceHero";
import { AnswerExplainer } from "@/components/AnswerExplainer";
import { AuditCTA } from "@/components/AuditCTA";
import { getService } from "@/config/services";

const s = getService("answer");

export const metadata: Metadata = {
  title: `${s.short} — Welgent`,
  description: s.hero.sub,
};

export default function Page() {
  return (
    <>
      {/* hero — unchanged, so the click-to-zoom from the ring still lands cleanly */}
      <ServiceHero service={s} />

      {/* the feeling + outcome: never miss a job, you're off the hook */}
      <AnswerExplainer />

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
