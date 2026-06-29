"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/**
 * Website & SEO — two in-page tabs that sell the FEELING + OUTCOME, never the
 * mechanics ("sell Maui, not the TSA line"):
 *  - Web Design → you're the obvious choice the second they land (premium = trust,
 *    feels made for them → they book). Premium site mock as proof.
 *  - SEO        → you're the name everyone around you already knows; your reach
 *    spills past your backyard. A ReachMap visual carries the "how" implicitly.
 */

type Tab = "design" | "seo";

export function WebsiteSeoExplainer() {
  const [tab, setTab] = useState<Tab>("design");
  const reduce = useReducedMotion();

  return (
    <section className="bg-base px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        {/* tabs */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-line bg-white p-1 shadow-sm">
            {([
              ["design", "Web Design"],
              ["seo", "SEO"],
            ] as [Tab, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-full px-6 py-2.5 text-[14.5px] font-semibold transition-colors ${
                  tab === key ? "bg-amber text-coal" : "text-slate hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === "design" ? <DesignTab /> : <SeoTab reduce={!!reduce} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Web Design tab ───────────────────────── */
const DESIGN_OUTCOMES = [
  {
    t: "Premium enough to trust on sight",
    b: "They land and instantly feel they're dealing with an established pro. The quiet doubt — “is this person even legit?” — never gets the chance to start.",
  },
  {
    t: "It feels built for them",
    b: "Within seconds they think “this is exactly who I need.” No shopping around, no second-guessing — they just reach out and book.",
  },
];

function DesignTab() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Web Design</p>
        <h2 className="mt-2 font-heading text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
          The obvious choice, the second they land.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate">
          Your site isn&apos;t a brochure people skim for info. It&apos;s the moment a stranger decides you&apos;re the one — and it&apos;s built so that decision is easy.
        </p>
      </div>

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,440px)_1fr]">
        {/* premium site mock — proof it *looks* the part (no mechanism labels) */}
        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_22px_55px_rgba(26,26,26,.12)]">
            <div className="flex items-center gap-1.5 border-b border-line bg-base-2/70 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-red-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/80" />
              <span className="h-2 w-2 rounded-full bg-green-400/70" />
              <div className="ml-2 flex-1 truncate rounded-md bg-white px-2.5 py-0.5 text-[10px] text-slate-soft">yourbusiness.com</div>
            </div>
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-heading text-[13px] font-extrabold text-ink">Your Business</span>
              <span className="rounded-full bg-amber px-2.5 py-1 text-[9px] font-bold text-coal">Free Quote</span>
            </div>
            <div className="px-5 pt-5">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-soft px-2 py-0.5 text-[10px] font-semibold text-amber-dk">
                ★★★★★ 5.0 · 57 reviews
              </span>
              <div className="mt-2 font-heading text-[18px] font-bold leading-tight tracking-[-0.01em] text-ink">
                Junk gone today — priced on the call.
              </div>
              <p className="mt-1.5 text-[11px] leading-snug text-slate">
                Same-day pickup across North Georgia. The price we quote is the price you pay.
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-amber px-3 py-1.5 text-[10px] font-bold text-coal">📞 Call Now</span>
                <span className="rounded-full border border-line px-3 py-1.5 text-[10px] font-semibold text-ink">Get a Quote</span>
              </div>
            </div>
            <div className="mx-5 my-4 rounded-xl bg-base-2/70 p-3">
              <div className="text-[11px] leading-none text-amber">★★★★★</div>
              <p className="mt-1.5 text-[10.5px] italic leading-snug text-ink-soft">&ldquo;Showed up within 30 minutes and hauled all of it.&rdquo;</p>
              <p className="mt-1 text-[9.5px] text-slate-soft">— Myra S.</p>
            </div>
            <div className="flex items-center justify-between bg-coal px-4 py-2.5">
              <span className="text-[11px] font-bold text-white">📞 (404) 632-9165</span>
              <span className="rounded-full bg-amber px-2.5 py-1 text-[9px] font-bold text-coal">Free Quote</span>
            </div>
          </div>
        </div>

        {/* two feeling blocks */}
        <ol className="grid gap-6">
          {DESIGN_OUTCOMES.map((p) => (
            <li key={p.t} className="flex gap-4">
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-amber" />
              <span>
                <span className="block font-heading text-[19px] font-bold leading-snug tracking-[-0.01em] text-ink">{p.t}</span>
                <span className="mt-1.5 block text-[15px] leading-relaxed text-slate">{p.b}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ───────────────────────── SEO tab ───────────────────────── */
const SEO_OUTCOMES = [
  {
    t: "Found everywhere they look",
    b: "Whenever someone nearby goes searching, you're the one that comes up — top of the map, top of the results.",
  },
  {
    t: "Your reach spills past your backyard",
    b: "Customers in the next town over — and the one after that — find you first, while the competition stays stuck on their own block.",
  },
  {
    t: "The obvious local authority",
    b: "You become the established name people trust on sight, not one of ten they're nervously comparing.",
  },
];

function SeoTab({ reduce }: { reduce: boolean }) {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Your Reach</p>
        <h2 className="mt-2 font-heading text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
          The name everyone around you already knows.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate">
          Most businesses only show up on their own block. We expand your presence so customers find you across the whole area — not just where you happen to sit.
        </p>
      </div>

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,440px)_1fr]">
        <ReachMap reduce={reduce} />

        <ol className="grid gap-6">
          {SEO_OUTCOMES.map((p) => (
            <li key={p.t} className="flex gap-4">
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-amber" />
              <span>
                <span className="block font-heading text-[19px] font-bold leading-snug tracking-[-0.01em] text-ink">{p.t}</span>
                <span className="mt-1.5 block text-[15px] leading-relaxed text-slate">{p.b}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mx-auto mt-12 max-w-xl text-center font-heading text-[clamp(1.2rem,2.4vw,1.7rem)] font-bold tracking-[-0.01em] text-ink">
        More people, in more places, <span className="text-amber">calling you first.</span>
      </p>
    </div>
  );
}

/* ---- ReachMap: home base + expanding reach into the towns around you ---- */
const TOWNS = [
  { name: "Canton", x: 50, y: 8 },
  { name: "Cumming", x: 86, y: 28 },
  { name: "Woodstock", x: 88, y: 72 },
  { name: "Dahlonega", x: 50, y: 92 },
  { name: "Ellijay", x: 12, y: 72 },
  { name: "Gainesville", x: 14, y: 28 },
];

function ReachMap({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[400px]">
      {/* soft amber field */}
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(235,154,1,.14),transparent_70%)]" />

      {/* spokes from home base to each town */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {TOWNS.map((t) => (
          <line key={t.name} x1="50" y1="50" x2={t.x} y2={t.y} stroke="rgba(235,154,1,.28)" strokeWidth="0.4" strokeDasharray="1.4 1.8" />
        ))}
      </svg>

      {/* expanding radar rings = reach growing outward */}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border border-amber/45"
            style={{ width: "78%", height: "78%", x: "-50%", y: "-50%" }}
            initial={{ scale: 0.25, opacity: 0.55 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut", repeat: Infinity, delay: i }}
          />
        ))}
      {reduce && (
        <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/35" />
      )}

      {/* town pins lighting up around you */}
      {TOWNS.map((t, i) => (
        <motion.div
          key={t.name}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${t.x}%`, top: `${t.y}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: reduce ? 0 : 0.5 + i * 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_0_4px_rgba(235,154,1,.18)]" />
          <span className="mt-1 whitespace-nowrap rounded-full bg-white/90 px-1.5 py-0.5 text-[9.5px] font-semibold text-ink shadow-sm">
            {t.name}
          </span>
        </motion.div>
      ))}

      {/* home base — your Google Business Profile */}
      <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-amber text-coal shadow-[0_8px_24px_rgba(235,154,1,.45)]">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </span>
        <span className="mt-1.5 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-white">
          You · home base
        </span>
      </div>
    </div>
  );
}
