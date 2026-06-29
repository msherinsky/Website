"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * "The Obvious Choice" — the Problem section's animated phone scene.
 *
 * Industry-agnostic (search reads "[your service] near me"). Drives the point:
 * everyone else competes on being the cheapest and their cookie-cutter sites
 * all blur together, so no one trusts them — then the customer hits YOUR
 * custom, credible site and picks you without haggling.
 *
 *   0 Search · 1 Results · 2 Generic site A · 3 Generic site B (identical) ·
 *   4 Your custom site · 5 You win #1 · 6 Resolve
 */

const STAGE_MS = [2000, 2600, 3000, 3000, 3400, 2800, 2600];

const CAPTIONS: ReactNode[] = [
  <>Every customer starts the same way. A quick search.</>,
  <>A dozen options come up. They all blur together.</>,
  <>They tap one. Generic site, lowest price.</>,
  <>Another. Same template, also the cheapest.</>,
  <>
    Then they hit yours. It actually looks{" "}
    <span className="font-semibold text-blue-mid">legit</span>.
  </>,
  <>No haggling. No second-guessing.</>,
  <>
    You&apos;re the <span className="font-semibold text-blue-mid">obvious choice</span>.
    And you charge what you&apos;re worth.
  </>,
];

type Card = { name: string; rating: string; reviews: string; meta: string; you?: boolean };

const CARDS: Card[] = [
  { name: "Citywide Services", rating: "3.7", reviews: "14", meta: "Lowest price guarantee" },
  { name: "Metro Home Pros", rating: "3.9", reviews: "9", meta: "Cheapest in town" },
  { name: "Your Business", rating: "4.9", reviews: "212", meta: "Open · Trusted locally", you: true },
  { name: "Apex Local Co.", rating: "3.6", reviews: "7", meta: "We beat any quote" },
];

function peekFor(stage: number) {
  if (stage === 2)
    return { variant: "generic", name: "Citywide Services", url: "citywide-services.biz", price: "$89", hue: "#3b82f6" } as const;
  if (stage === 3)
    return { variant: "generic", name: "Metro Home Pros", url: "metropros.net", price: "$79", hue: "#0ea96b" } as const;
  if (stage === 4) return { variant: "custom", url: "yourbusiness.com" } as const;
  return null;
}

export function ObviousChoiceScene() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(reduce ? 5 : 0);

  useEffect(() => {
    if (reduce) return setStage(5);
    let t: ReturnType<typeof setTimeout>;
    const run = (s: number) => {
      setStage(s);
      t = setTimeout(() => run((s + 1) % STAGE_MS.length), STAGE_MS[s]);
    };
    run(0);
    return () => clearTimeout(t);
  }, [reduce]);

  const resultsIn = stage >= 1;
  const won = stage >= 5;
  const peek = peekFor(stage);
  const ordered = won
    ? [...CARDS].sort((a, b) => (a.you === b.you ? 0 : a.you ? -1 : 1))
    : CARDS;

  return (
    <div className="relative grid items-center gap-x-14 gap-y-10 lg:grid-cols-[300px_minmax(0,1fr)]">
      <div className="pointer-events-none absolute -left-10 top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-amber/15 blur-3xl" />

      {/* Phone (left) */}
      <motion.div
        className="relative z-10 mx-auto w-[300px] rounded-[2.4rem] border border-white/10 bg-gradient-to-b from-[#1a1d29] to-[#0a0c14] p-2.5 shadow-[0_30px_80px_rgba(0,0,0,.55)]"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-[560px] overflow-hidden rounded-[1.8rem] bg-[#0e1422]">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-medium text-white/55">
            <span>9:41</span>
            <span className="h-3 w-12 rounded-full bg-white/10" />
          </div>

          {/* search bar (industry-agnostic) */}
          <div className="mx-4 mt-3 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
            <GoogleG />
            <span className="flex items-center gap-1 text-[13px] text-zinc-700">
              <span className="rounded bg-blue-light px-1.5 py-0.5 text-[11px] font-medium text-blue">
                your service
              </span>
              near me
              {stage === 0 && (
                <span className="ml-px inline-block h-3.5 w-px animate-pulse bg-zinc-500 align-middle" />
              )}
            </span>
          </div>

          {/* map strip */}
          <div className="mx-4 mt-3 h-16 overflow-hidden rounded-xl border border-white/5 bg-[linear-gradient(135deg,#13203a,#0c1526)]">
            <div className="flex h-full items-center justify-center">
              <MapPin />
            </div>
          </div>

          {/* results */}
          <div className="mt-3 flex flex-col gap-2 px-4">
            {!resultsIn && (
              <div className="space-y-2 pt-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-12 animate-pulse rounded-xl bg-white/5" />
                ))}
              </div>
            )}

            {resultsIn &&
              ordered.map((c, i) => (
                <motion.div
                  key={c.name}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    layout: { type: "spring", stiffness: 360, damping: 32 },
                    delay: reduce ? 0 : 0.1 * i,
                    duration: 0.4,
                  }}
                  className={`relative rounded-xl border p-2.5 transition-colors duration-500 ${
                    c.you
                      ? won
                        ? "border-amber/60 bg-amber/[0.12] shadow-[0_0_0_1px_rgba(235,154,1,.45),0_8px_30px_rgba(235,154,1,.22)]"
                        : "border-white/10 bg-white/[0.04]"
                      : `border-white/10 bg-white/[0.03] ${won ? "opacity-35 grayscale" : ""}`
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`mt-0.5 h-8 w-8 shrink-0 rounded-lg ${
                        c.you ? "bg-gradient-to-br from-blue to-blue-mid" : "bg-white/10"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-[12px] font-semibold text-white/90">{c.name}</span>
                        {c.you && won && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 18 }}
                            className="grid h-4 w-4 place-items-center rounded-full bg-amber text-[9px] font-bold text-coal"
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-[10px]">
                        <span className={c.you ? "text-amber-300" : "text-white/40"}>
                          {"★".repeat(Math.round(Number(c.rating)))}
                          <span className="text-white/30">{"★".repeat(5 - Math.round(Number(c.rating)))}</span>
                        </span>
                        <span className={c.you ? "text-white/70" : "text-white/35"}>
                          {c.rating} ({c.reviews})
                        </span>
                      </div>
                      <div className={`mt-0.5 truncate text-[9.5px] ${c.you ? "text-blue-mid" : "text-white/35"}`}>
                        {c.meta}
                      </div>
                    </div>
                    {c.you && (
                      <div
                        className={`mt-1 shrink-0 rounded-full px-2.5 py-1 text-[9.5px] font-semibold transition-colors duration-500 ${
                          won ? "bg-amber text-coal" : "bg-white/10 text-white/60"
                        }`}
                      >
                        Call
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>

          {/* website preview overlay */}
          <AnimatePresence>
            {peek && (
              <motion.div
                key={stage}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 34 }}
                className="absolute inset-x-0 bottom-0 top-[52px] z-30 overflow-hidden rounded-b-[1.8rem]"
              >
                {peek.variant === "generic" ? (
                  <GenericSite name={peek.name} url={peek.url} price={peek.price} hue={peek.hue} />
                ) : (
                  <CustomSite url={peek.url} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* synced narration (right, big) */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
        <div className="flex min-h-[150px] items-center lg:min-h-[210px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={stage}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[520px] font-heading text-[clamp(1.7rem,2.6vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white"
            >
              {CAPTIONS[stage]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex gap-1.5">
          {CAPTIONS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === stage ? "w-6 bg-amber" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- refined mini website mockups ---------- */

function ChromeBar({ url, dark }: { url: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-2 ${dark ? "bg-[#0f1626]" : "bg-zinc-100"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
      <div
        className={`ml-1 flex-1 truncate rounded px-2 py-0.5 text-[8px] ${
          dark ? "bg-white/10 text-white/55" : "bg-white text-zinc-500"
        }`}
      >
        {url}
      </div>
    </div>
  );
}

// Generic = a real-looking but templated, cheap site. Variants share a layout
// so they read as interchangeable. A loud lowest-price badge does the talking.
function GenericSite({ name, url, price, hue }: { name: string; url: string; price: string; hue: string }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <ChromeBar url={url} />
      {/* header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded" style={{ background: hue }} />
          <span className="text-[10.5px] font-bold text-zinc-700">{name}</span>
        </div>
        <div className="flex gap-2 text-[7.5px] font-medium text-zinc-400">
          <span>Home</span>
          <span>Services</span>
          <span>Contact</span>
        </div>
      </div>
      {/* hero with stock-photo placeholder */}
      <div className="flex h-[88px] items-center justify-center bg-zinc-200">
        <span className="text-[8px] font-medium uppercase tracking-wide text-zinc-400">stock photo</span>
      </div>
      <div className="p-3">
        <div className="text-[11px] font-bold text-zinc-700">Quality Service You Can Trust</div>
        <div className="mt-1.5 h-1.5 w-3/4 rounded bg-zinc-200" />
        <div className="mt-1 h-1.5 w-1/2 rounded bg-zinc-200" />
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          <div className="h-7 rounded bg-zinc-100" />
          <div className="h-7 rounded bg-zinc-100" />
          <div className="h-7 rounded bg-zinc-100" />
        </div>
        <button className="mt-2.5 rounded px-2.5 py-1 text-[9px] font-bold text-white" style={{ background: hue }}>
          Free Quote
        </button>
      </div>
      {/* loud cheapest-price banner */}
      <div className="mt-auto bg-[#e0322f] py-2 text-center text-[10px] font-extrabold uppercase tracking-wide text-white">
        {price} · Lowest Price in Town
      </div>
    </div>
  );
}

// Custom = a polished, credible site. Trust signals, real branding, no price war.
function CustomSite({ url }: { url: string }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <ChromeBar url={url} />
      <div className="flex items-center justify-between px-3 py-2.5">
        <span className="text-[12px] font-extrabold text-ink">
          Your<span className="text-blue">Business</span>
        </span>
        <span className="rounded-md bg-amber px-2.5 py-1 text-[9px] font-bold text-coal">Book Now</span>
      </div>
      {/* premium hero */}
      <div className="mx-3 overflow-hidden rounded-xl bg-gradient-to-br from-[#1b1714] to-[#3d2f12] p-3.5 text-white">
        <div className="text-[13px] font-bold leading-tight">Top-rated local service, done right.</div>
        <div className="mt-1.5 flex items-center gap-1 text-[9px]">
          <span className="text-amber-300">★★★★★</span>
          <span className="text-white/80">4.9 · 212 reviews</span>
        </div>
        <button className="mt-2.5 rounded-full bg-white px-3 py-1 text-[9px] font-bold text-ink">
          Get a Free Quote
        </button>
      </div>
      {/* trust row */}
      <div className="mt-3 flex justify-around px-3 text-[8.5px] font-semibold text-slate">
        <span>✓ Licensed</span>
        <span>✓ Insured</span>
        <span>✓ Same-day</span>
      </div>
      {/* clean content */}
      <div className="mx-3 mt-3 grid grid-cols-3 gap-1.5">
        <div className="h-9 rounded-lg bg-base-2" />
        <div className="h-9 rounded-lg bg-base-2" />
        <div className="h-9 rounded-lg bg-base-2" />
      </div>
      <div className="mx-3 mt-2 h-1.5 w-2/3 rounded bg-base-2" />
    </div>
  );
}

function GoogleG() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" className="shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function MapPin() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EB9A01" />
      <circle cx="12" cy="9" r="2.5" fill="#fff" />
    </svg>
  );
}
