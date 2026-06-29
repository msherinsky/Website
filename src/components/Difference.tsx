import { Reveal } from "./Reveal";
import { DarkAtmosphere } from "./DarkAtmosphere";

/**
 * Difference — head-to-head vs. the template shops. Most "websites for
 * contractors" come from one of a thousand GoHighLevel resellers shipping the
 * same recolored template. This section names that contrast: their interchangeable
 * skeleton vs. our researched, custom-built, unmistakable site + the full system.
 */
const THEM = [
  { feat: "The website:", rest: "one template, recolored per client." },
  { feat: "The words:", rest: "generic filler that fits any business." },
  { feat: "The proof:", rest: "stock photos, no real reviews, no story." },
  { feat: "Getting found:", rest: "a lead form on a page, light on SEO." },
  { feat: "The result:", rest: "one more lookalike in a crowded search." },
];

const US = [
  { feat: "The website:", rest: "custom-built from scratch around your advantage." },
  { feat: "The words:", rest: "written from real research into your business and market." },
  { feat: "The proof:", rest: "your real reviews, before-and-afters, your name and story." },
  { feat: "Getting found:", rest: "built to rank — local SEO, location pages, schema, fast load." },
  { feat: "The system:", rest: "AI receptionist, review engine, missed-call text-back, optional voice agent." },
];

function XMark() {
  return (
    <span className="mt-0.5 flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-white/[0.06]">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="3" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  );
}

function CheckMark() {
  return (
    <span className="mt-0.5 flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-amber/15">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#eb9a01" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export function Difference() {
  return (
    <section id="difference" className="relative isolate overflow-hidden bg-navy-alt py-24">
      <DarkAtmosphere grid={false} />

      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber">
            Why we&apos;re different
          </p>
          <h2 className="font-heading text-[clamp(2.3rem,5vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
            Everyone sells the same software.
            <br />
            <span className="grad-text">The difference is what we build on it.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/60">
            Most &quot;websites for contractors&quot; come from one of a thousand shops
            reselling the same toolkit. Same template, recolored. Yours is built from
            the ground up — and it shows.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl items-start gap-5 md:grid-cols-2">
          {/* THEM */}
          <Reveal>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
              <span className="inline-block rounded-full bg-white/[0.07] px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-white/50">
                Most agencies
              </span>
              <h3 className="mt-3 font-heading text-[1.45rem] font-bold tracking-[-0.02em] text-white/85">
                A template with your logo on it
              </h3>
              <p className="mt-1 text-[13.5px] text-white/40">
                The same site fifty other businesses already got.
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {THEM.map((item) => (
                  <li key={item.feat} className="flex gap-3 text-[15px] leading-snug text-white/55">
                    <XMark />
                    <span>
                      <span className="font-bold text-white/70">{item.feat}</span> {item.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* US */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border-[1.5px] border-amber/45 bg-gradient-to-b from-amber/[0.12] to-amber/[0.04] p-7 shadow-[0_8px_40px_rgba(235,154,1,0.15)] sm:p-8">
              <span className="inline-block rounded-full bg-amber/15 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-amber">
                Welgent
              </span>
              <h3 className="mt-3 font-heading text-[1.45rem] font-bold tracking-[-0.02em] text-white">
                A site built around the one thing only you can say
              </h3>
              <p className="mt-1 text-[13.5px] text-white/45">
                Researched, custom-built, and unmistakably yours.
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {US.map((item) => (
                  <li key={item.feat} className="flex gap-3 text-[15px] leading-snug text-white/90">
                    <CheckMark />
                    <span>
                      <span className="font-bold text-white">{item.feat}</span> {item.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-14 max-w-2xl text-center">
          <p className="font-heading text-[clamp(1.2rem,2.2vw,1.6rem)] font-bold leading-[1.3] tracking-[-0.02em] text-white">
            Ask any of them to show you their last ten client sites side by side.
            <br />
            <span className="grad-text">Then look at ours.</span>
          </p>
          <a
            href="mailto:matt@welgent.com"
            data-book
            className="mt-7 inline-block rounded-full bg-amber px-8 py-4 text-[16px] font-semibold text-coal shadow-[0_8px_24px_rgba(235,154,1,.32)] transition hover:bg-amber-dk"
          >
            See What&apos;s Costing You Leads
          </a>
        </Reveal>
      </div>
    </section>
  );
}
