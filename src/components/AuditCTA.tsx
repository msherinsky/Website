import { Reveal } from "./Reveal";
import { DarkAtmosphere } from "./DarkAtmosphere";

/**
 * Closing CTA (id="audit" — target of every "Get a Free Audit" button).
 * Strong dark finish. NOTE: wire the real GoHighLevel booking embed/modal in
 * place of the mailto link before launch.
 */
export function AuditCTA() {
  return (
    <section id="audit" className="relative isolate overflow-hidden bg-navy py-28 text-white">
      <DarkAtmosphere />
      <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-heading text-[clamp(2.7rem,5.8vw,4.5rem)] font-bold leading-[0.99] tracking-[-0.03em]">
          Ready to be the obvious choice?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[18px] leading-relaxed text-white/70">
          Start with a free audit. We&apos;ll show you exactly what&apos;s costing
          you jobs right now, and what we&apos;d do about it. No pressure, no
          jargon.
        </p>
        <a
          href="mailto:matt@welgent.com"
          data-book
          className="mt-9 inline-block rounded-full bg-amber px-8 py-4 text-[16px] font-semibold text-coal shadow-[0_8px_24px_rgba(235,154,1,.32)] transition hover:bg-amber-dk"
        >
          Get a Free Audit
        </a>
        <p className="mt-4 text-[13px] text-white/45">Free 30-minute call · No obligation</p>
      </Reveal>
    </section>
  );
}
