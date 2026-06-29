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

/* The literal before/after: a recolored-template reseller site vs. a real
   Welgent build — the contrast the whole pitch rests on, shown not told. */
function TemplateMock() {
  return (
    <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,.3)]">
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#ededed] px-2.5 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#cfcfcf]" />
        <span className="h-2 w-2 rounded-full bg-[#cfcfcf]" />
        <span className="h-2 w-2 rounded-full bg-[#cfcfcf]" />
        <div className="ml-1.5 flex-1 truncate rounded bg-white px-2 py-0.5 text-[9px] text-[#a3a3a3]">premiercontractorpros.com</div>
      </div>
      <div className="flex items-center justify-between bg-white px-3 py-2">
        <span className="rounded border border-dashed border-[#c4c4c4] px-1.5 py-0.5 text-[7.5px] font-bold uppercase tracking-wide text-[#b0b0b0]">{"{ Logo Here }"}</span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-5 rounded bg-[#e2e2e2]" />
          <span className="h-1.5 w-5 rounded bg-[#e2e2e2]" />
          <span className="rounded bg-[#3f6fc9] px-1.5 py-1 text-[7.5px] font-semibold text-white">Get Quote</span>
        </div>
      </div>
      <div className="relative h-[104px] bg-[#cdcdcd]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#cdcdcd,#cdcdcd_9px,#c4c4c4_9px,#c4c4c4_18px)]" />
        <span className="absolute left-2 top-2 rounded bg-black/10 px-1.5 py-0.5 text-[7px] font-medium text-white/80">stock photo</span>
        <div className="absolute right-2 top-2 w-[46%] rounded-md bg-white p-2 shadow-md">
          <div className="text-[8px] font-bold text-[#555]">Get A Free Quote</div>
          <div className="mt-1.5 h-2.5 rounded border border-[#e0e0e0]" />
          <div className="mt-1 h-2.5 rounded border border-[#e0e0e0]" />
          <div className="mt-1.5 rounded bg-[#3f6fc9] py-1 text-center text-[8px] font-semibold text-white">Submit</div>
        </div>
      </div>
      <div className="px-3 py-2.5">
        <div className="text-[9px] italic leading-snug text-[#a0a0a0]">
          &ldquo;Embrace the vision of a breathtaking and purposeful space, crafted with years of experience&hellip;&rdquo;
        </div>
      </div>
    </div>
  );
}

function WelgentMock() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-[0_10px_34px_rgba(235,154,1,.22)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-base-2/70 px-2.5 py-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-green-400/70" />
        <div className="ml-1.5 flex-1 truncate rounded bg-white px-2 py-0.5 text-[9px] text-slate-soft">yourbusiness.com</div>
      </div>
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="font-heading text-[11px] font-extrabold text-ink">Your Business</span>
        <span className="rounded-full bg-amber px-2 py-0.5 text-[8px] font-bold text-coal">Free Quote</span>
      </div>
      <div className="px-3 pt-2.5">
        <span className="inline-block rounded-full bg-amber-soft px-1.5 py-0.5 text-[8px] font-semibold text-amber-ink">★★★★★ 5.0 · 57 reviews</span>
        <div className="mt-1.5 font-heading text-[13px] font-bold leading-tight text-ink">Junk gone today — priced on the call.</div>
        <div className="mt-2 flex gap-1.5">
          <span className="rounded-full bg-amber px-2 py-1 text-[8px] font-bold text-coal">📞 Call Now</span>
          <span className="rounded-full border border-line px-2 py-1 text-[8px] font-semibold text-ink">Get a Quote</span>
        </div>
      </div>
      <div className="mx-3 my-2.5 rounded-lg bg-base-2/70 p-2">
        <div className="text-[8px] leading-none text-amber">★★★★★</div>
        <div className="mt-1 text-[8.5px] italic leading-snug text-ink-soft">&ldquo;Showed up within 30 minutes and hauled all of it.&rdquo;</div>
      </div>
      <div className="flex items-center justify-between bg-coal px-3 py-1.5">
        <span className="text-[8.5px] font-bold text-white">📞 (404) 632-9165</span>
        <span className="rounded-full bg-amber px-2 py-0.5 text-[8px] font-bold text-coal">Free Quote</span>
      </div>
    </div>
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
              <div className="mt-5 [filter:grayscale(0.35)]">
                <TemplateMock />
              </div>
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
              <div className="mt-5">
                <WelgentMock />
              </div>
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
