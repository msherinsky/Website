import { DotField } from "./DotField";

/**
 * Warm, type-led hero (Octopush mood, Welgent brand). Big confident headline,
 * an amber pill CTA, an honest stat strip, and a quiet platform marquee — over
 * a mouse-reactive amber dot field. Restraint + warmth reads as a real studio.
 */
const STATS = [
  { num: "24/7", label: "Calls answered by AI — never miss a lead" },
  { num: "~3 wks", label: "From kickoff to live, not months" },
  { num: "5-in-1", label: "Site · SEO · Calls · CRM · Reports" },
  { num: "0", label: "Work on your end — fully done for you" },
];

const PLATFORMS = [
  "Google Business Profile",
  "Google Maps",
  "Local SEO",
  "Custom Website",
  "AI Call Answering",
  "CRM Automation",
  "Review Engine",
  "Smart Follow-ups",
  "Web Chat",
  "Monthly Reports",
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-base px-6 pt-32 pb-28 text-center">
      {/* backdrop: warm top bloom + mouse-reactive amber dot field */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="warm-bloom bloom-drift-a absolute left-1/2 top-[-160px] h-[620px] w-[980px] -translate-x-1/2" />
        <DotField className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_72%_64%_at_50%_42%,black,transparent_78%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="rise mb-7 flex items-center justify-center gap-3 text-slate">
          <span className="hidden h-px w-8 bg-gradient-to-r from-transparent to-amber/60 sm:block" />
          <span className="text-[13px] font-semibold tracking-[0.01em]">
            Marketing + operations for local service businesses
          </span>
          <span className="hidden h-px w-8 bg-gradient-to-l from-transparent to-amber/60 sm:block" />
        </div>

        <h1 className="rise font-heading text-[clamp(2.9rem,7vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.035em] text-ink">
          When they search,
          <br />
          be the <span className="grad-text">obvious choice</span>.
        </h1>

        <p className="rise mx-auto mt-7 max-w-2xl text-[18px] leading-[1.6] text-slate" style={{ animationDelay: "0.08s" }}>
          We build you a website that actually brings in jobs, an AI that
          answers and books them for you, and follow-ups that earn a review
          after every job. We run all of it, because{" "}
          <span className="font-semibold text-ink">we want to help you grow.</span>
        </p>

        <div className="rise mt-9 flex flex-wrap items-center justify-center gap-5" style={{ animationDelay: "0.16s" }}>
            <a
              href="#audit"
              data-book
              className="rounded-full bg-amber px-8 py-4 text-[15.5px] font-semibold text-coal shadow-[0_8px_22px_rgba(235,154,1,.32)] transition hover:bg-amber-dk hover:shadow-[0_10px_28px_rgba(235,154,1,.4)]"
            >
              Get a Free Audit
            </a>
            <a
              href="#system"
              className="px-2 text-[15px] font-semibold text-ink/75 transition-colors hover:text-amber"
            >
              See how it works →
            </a>
          </div>
        </div>

      {/* honest stat strip */}
      <div className="rise relative z-10 mt-16 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-9 sm:grid-cols-4 sm:text-left" style={{ animationDelay: "0.24s" }}>
        {STATS.map((s) => (
          <div key={s.num} className="px-1">
            <div className="font-heading text-[clamp(1.9rem,3vw,2.6rem)] font-extrabold leading-none tracking-[-0.03em] text-ink">
              {s.num}
            </div>
            <div className="mt-2.5 text-[12.5px] leading-snug text-slate">{s.label}</div>
          </div>
        ))}
      </div>

      {/* quiet platform marquee */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)]"
        aria-hidden
      >
        <div className="flex w-max gap-11 proof-scroll-x">
          {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
            <span
              key={i}
              className="flex items-center gap-11 whitespace-nowrap text-[12.5px] font-semibold uppercase tracking-[0.16em] text-slate-soft after:h-[5px] after:w-[5px] after:rounded-full after:bg-amber/70 after:content-['']"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
