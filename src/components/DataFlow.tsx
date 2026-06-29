"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * "How it works" — the data-flow conveyor as a character scene. One lead (Maria,
 * an illustrated person) and the AI Receptionist (a haloed robot) have a living
 * conversation on the left as you scroll; the AI fills a CRM contact record on
 * the right in real time. Then a specific review comes in, the CRM slides out,
 * and the review is showcased on a mock website (between its headline and CTA) —
 * closing the loop. Desktop = scroll-scrubbed; mobile / reduced-motion = a
 * static, readable stack.
 */

type StageKey = "customer" | "answer" | "booked" | "crm" | "followup" | "review" | "showcase";
const STAGES: { key: StageKey; marker: string }[] = [
  { key: "customer", marker: "Customer" },
  { key: "answer", marker: "AI Receptionist" },
  { key: "booked", marker: "Booked" },
  { key: "crm", marker: "CRM" },
  { key: "followup", marker: "Follow-up" },
  { key: "review", marker: "Review" },
  { key: "showcase", marker: "On your site" },
];
const AI_STAGES = new Set([1, 2, 3, 4, 5, 6]); // AI is "speaking"
const PACKET: Record<number, string> = {
  0: "Maria Garcia",
  1: "(404) 632-9165",
  2: "Junk pickup",
  3: "Lead details",
  4: "Confirmed",
  5: "★★★★★",
};

export function DataFlow() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-base">
      {/* desktop: two-column pinned conveyor */}
      <div className={reduce ? "hidden" : "hidden lg:block"}>
        <PinnedConveyor variant="desktop" />
      </div>

      {/* mobile: single-column pinned conveyor */}
      <div className={reduce ? "hidden" : "block lg:hidden"}>
        <PinnedConveyor variant="mobile" />
      </div>

      {/* reduced-motion: static readable stack */}
      <div className={reduce ? "block" : "hidden"}>
        <div className="px-6 py-20">
          <div className="mx-auto max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">How it works</p>
            <h2 className="mt-2 font-heading text-[clamp(1.9rem,7vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
              One lead, start to finish — live in your dashboard.
            </h2>
            <div className="mt-8">
              <Scene stage={STAGES.length} />
            </div>
            <Reveal className="mt-8">
              <LeadPanel stage={STAGES.length} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The scroll-pinned conveyor. One instance per layout (desktop two-column /
 * mobile single column); each owns its own scroll tracker. The hidden one sits
 * at 0-height so its progress stays 0 and it's inert.
 */
function PinnedConveyor({ variant }: { variant: "desktop" | "mobile" }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [stage, setStage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.min(STAGES.length - 1, Math.max(0, Math.floor(v * STAGES.length))));
  });

  const dotX = useTransform(scrollYProgress, [0, 1], ["2%", "98%"]);
  const fillW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* ── mobile: single column, conversation over the filling CRM ── */
  if (variant === "mobile") {
    return (
      <div ref={ref} className="relative h-[440vh]">
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-5 pt-16 pb-4">
          <div className="mx-auto w-full max-w-md shrink-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">How it works</p>
            <h2 className="mt-1 font-heading text-[clamp(1.45rem,5.4vw,2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
              One lead, from first call to a review on your site.
            </h2>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 items-start pt-4">
            <AnimatePresence mode="wait">
              {stage < 6 ? (
                <motion.div
                  key="m-convo"
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.4, ease: [0.5, 0, 0.2, 1] }}
                  className="w-full space-y-3.5"
                >
                  <Scene stage={stage} compact />
                  {/* the CRM fills as a card; once it's complete (review beat) it
                      collapses to a compact "saved" summary so the review fits */}
                  <AnimatePresence mode="wait">
                    {stage < 4 ? (
                      <motion.div key="crm-card" exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }}>
                        <CrmRecord stage={stage} compact />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="crm-pill"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <CrmSavedPill />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="m-climax"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="w-full"
                >
                  <Climax />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* compact rail — slim line + dot + the active step's name */}
          <div className="mx-auto w-full max-w-md shrink-0">
            <div className="relative h-px bg-line">
              <motion.div className="absolute left-0 top-0 h-px bg-amber" style={{ width: fillW }} />
              <motion.div
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_0_4px_rgba(235,154,1,.2),0_0_14px_rgba(235,154,1,.6)]"
                style={{ left: dotX }}
              />
            </div>
            <div className="mt-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-amber">
              {STAGES[stage].marker}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── desktop: two columns (conversation + CRM), climax centered ── */
  return (
    <div ref={ref} className="relative h-[360vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden px-6 pt-20 pb-6">
        <div className="mx-auto w-full max-w-[1180px]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">How it works</p>
          <h2 className="mt-2 max-w-2xl font-heading text-[clamp(1.7rem,3vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
            One lead — from first call to a review on your site.
          </h2>
        </div>

        {/* anchor to TOP so the CRM grows downward as it fills (never re-centers/drifts up) */}
        <div className="mx-auto flex w-full max-w-[1180px] flex-1 items-start pt-8">
          <AnimatePresence mode="wait">
            {stage < 6 ? (
              <motion.div
                key="convo"
                exit={{ opacity: 0, y: -70 }}
                transition={{ duration: 0.5, ease: [0.5, 0, 0.2, 1] }}
                className="grid w-full grid-cols-[1.15fr_1fr] items-start gap-12"
              >
                <Scene stage={stage} />
                <LeadPanel stage={stage} />
              </motion.div>
            ) : (
              <motion.div
                key="climax"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                className="w-full"
              >
                <Climax />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* conveyor rail */}
        <div className="mx-auto mt-6 w-full max-w-[1180px]">
          <div className="relative h-px bg-line">
            <motion.div className="absolute left-0 top-0 h-px bg-amber" style={{ width: fillW }} />
            <motion.div
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_0_4px_rgba(235,154,1,.2),0_0_16px_rgba(235,154,1,.6)]"
              style={{ left: dotX }}
            />
          </div>
          <div className="mt-3 flex justify-between">
            {STAGES.map((s, i) => (
              <span
                key={s.key}
                className={`text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                  i === stage ? "text-amber" : i < stage ? "text-ink/60" : "text-slate-soft"
                }`}
              >
                {s.marker}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── conversation content (one source, drives desktop + static) ───────────── */
const THREAD: { stage: number; who: "ai" | "customer"; node: ReactNode }[] = [
  // s0 — Maria reaches out (from phone OR web chat)
  { stage: 0, who: "customer", node: (
    <>
      <Bubble who="customer">Hey! Can you do a junk pickup tomorrow?</Bubble>
      <Channels />
    </>
  ) },
  // s1 — AI answers, Maria says yes
  { stage: 1, who: "ai", node: <Bubble who="ai">Absolutely — we&apos;ve got <b>9:00 AM</b> open. Want me to grab it for you?</Bubble> },
  { stage: 1, who: "customer", node: <Bubble who="customer">Yes please! 🙌</Bubble> },
  // s2 — booked, Maria thanks
  { stage: 2, who: "ai", node: <Bubble who="ai">Booked — you&apos;re set for <b>9 AM tomorrow</b> ✓</Bubble> },
  { stage: 2, who: "customer", node: <Bubble who="customer">Amazing, thank you! 🙏</Bubble> },
  // s3 — Maria asks, AI reassures (CRM card shows the capture visually)
  { stage: 3, who: "customer", node: <Bubble who="customer">Do I need to do anything?</Bubble> },
  { stage: 3, who: "ai", node: <Bubble who="ai">Nope — we&apos;ve got it all from here 😊</Bubble> },
  // s4 — follow-up, Maria confirms
  { stage: 4, who: "ai", node: <Bubble who="ai">Hi Maria! Quick reminder — see you at <b>9 AM</b> 👋</Bubble> },
  { stage: 4, who: "customer", node: <Bubble who="customer">Perfect, see you then!</Bubble> },
  // s5 — the review
  { stage: 5, who: "ai", node: <Bubble who="ai">All done! 🙌 Quick one — what made today easy?</Bubble> },
  { stage: 5, who: "customer", node: (
    <Bubble who="customer">
      <span className="text-amber">★★★★★</span> &ldquo;Booked me in under a minute, showed up right at 9, and left my garage spotless. Couldn&apos;t have been easier.&rdquo;
    </Bubble>
  ) },
];

/* ───────────────────────── the scene (characters) ───────────────────────── */
function Scene({ stage, compact = false }: { stage: number; compact?: boolean }) {
  const isStatic = stage >= STAGES.length;
  const aiTalking = AI_STAGES.has(stage);

  if (isStatic) {
    return (
      <div className="relative mx-auto w-full max-w-[480px]">
        <CharacterRow who="ai" speaking={false} />
        <div className="my-5 space-y-2">
          {THREAD.map((t, i) => (
            <div key={i}>{t.node}</div>
          ))}
        </div>
        <CharacterRow who="customer" speaking={false} />
      </div>
    );
  }

  // one ordered thread for this beat — bubbles alternate (AI left / Maria right)
  // and pop in back-to-back via a stagger, so it reads like a real conversation
  const items = THREAD.filter((t) => t.stage === stage);

  return (
    <div className={`relative mx-auto flex w-full max-w-[480px] flex-col ${compact ? "gap-4" : "gap-5"} lg:h-[44vh] lg:justify-center`}>
      <CharacterRow who="ai" speaking={aiTalking} />

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          variants={threadVar}
          initial="hidden"
          animate="show"
          exit="exit"
          className="flex flex-col gap-1.5"
        >
          {items.map((t, i) => (
            <motion.div key={i} variants={bubbleVar}>
              {t.node}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <CharacterRow who="customer" speaking={false} />

      {!compact && <DataPacket stage={stage} />}
    </div>
  );
}

const threadVar = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};
const bubbleVar = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0 },
};

function CharacterRow({ who, speaking }: { who: "ai" | "customer"; speaking: boolean }) {
  if (who === "ai") {
    return (
      <div className="flex items-center gap-3">
        <AIBot speaking={speaking} />
        <div>
          <div className="font-heading text-[15px] font-bold text-ink">AI Receptionist</div>
          <div className="text-[12px] text-slate">Answers calls &amp; chat · 24/7</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <CustomerAvatar />
      <div>
        <div className="font-heading text-[15px] font-bold text-ink">Maria G.</div>
        <div className="text-[12px] text-slate">Local customer</div>
      </div>
    </div>
  );
}

/* ───────────────────────── bubbles / props ───────────────────────── */
function Bubble({ who, children }: { who: "ai" | "customer"; children: ReactNode }) {
  const ai = who === "ai";
  return (
    <div className={`flex ${ai ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[14px] leading-snug shadow-[0_8px_24px_rgba(26,26,26,.08)] ${
          ai ? "rounded-br-md bg-amber text-coal" : "rounded-bl-md bg-white text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Channels() {
  return (
    <div className="mt-1.5 flex items-center justify-start gap-2 pl-1 text-[12px] text-slate-soft">
      <span>from</span>
      <span className="rounded-full bg-base-2 px-2.5 py-1 font-semibold text-slate">📞 Phone</span>
      <span className="rounded-full bg-base-2 px-2.5 py-1 font-semibold text-slate">💬 Web chat</span>
    </div>
  );
}

function DataPacket({ stage }: { stage: number }) {
  const label = PACKET[stage];
  return (
    <AnimatePresence>
      {label && (
        <motion.div
          key={stage}
          initial={{ opacity: 0, x: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 1, 0], x: [0, 70, 180, 260], scale: 1 }}
          transition={{ duration: 1.15, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
          className="pointer-events-none absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-amber px-3 py-1 text-[11px] font-bold text-coal shadow-[0_6px_18px_rgba(235,154,1,.5)]"
        >
          {label} →
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────── characters ───────────────────────── */
function AIBot({ speaking }: { speaking: boolean }) {
  return (
    <motion.div
      animate={speaking ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      transition={{ duration: 1.5, repeat: speaking ? Infinity : 0, ease: "easeInOut" }}
      className="shrink-0"
      aria-hidden
    >
      <svg viewBox="0 0 64 72" className="ai-float h-16 w-16 overflow-visible">
        {/* halo */}
        <ellipse
          className="ai-halo" cx="32" cy="9" rx="15" ry="4.6" fill="none"
          stroke="var(--color-amber)" strokeWidth="3"
          style={{ filter: "drop-shadow(0 0 3px rgba(235,154,1,.7))" }}
        />
        {/* headset band */}
        <path d="M14 33 Q32 14 50 33" fill="none" stroke="#1A1A1A" strokeWidth="2.4" strokeLinecap="round" />
        {/* ear cups */}
        <rect x="10.5" y="30" width="6.5" height="12" rx="3.2" fill="#1A1A1A" />
        <rect x="47" y="30" width="6.5" height="12" rx="3.2" fill="#1A1A1A" />
        {/* mic boom (the "on the phone" cue) */}
        <path d="M47 38 Q41 43 36 43" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
        <circle cx="35" cy="43" r="1.8" fill="var(--color-amber)" />
        {/* head */}
        <rect x="17" y="19" width="30" height="27" rx="11" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
        {/* visor */}
        <rect x="21" y="25" width="22" height="13" rx="6.5" fill="#1A1A1A" />
        {/* eyes */}
        <ellipse className="ai-eye" cx="28" cy="31.5" rx="2.4" ry="2.9" fill="var(--color-amber)" />
        <ellipse className="ai-eye" cx="36" cy="31.5" rx="2.4" ry="2.9" fill="var(--color-amber)" />
        {/* shoulders */}
        <path d="M19 58 Q32 48 45 58 L45 60 Q32 52 19 60 Z" fill="#EB9A01" opacity="0.9" />
      </svg>
    </motion.div>
  );
}

function CustomerAvatar() {
  return (
    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full shadow-[0_8px_22px_rgba(26,26,26,.18)] ring-2 ring-white" aria-hidden>
      <svg viewBox="0 0 64 64" className="h-full w-full">
        <rect width="64" height="64" fill="#FBE6D2" />
        <path d="M10 64c2-12 11-17 22-17s20 5 22 17Z" fill="#C98A52" />
        <rect x="27" y="40" width="10" height="10" rx="4" fill="#EBB88E" />
        <circle cx="32" cy="29" r="15" fill="#F3C9A1" />
        <path d="M32 11c-10 0-16 7-16 17 0 2 .3 4 .8 5.5C17 27 21 23 26 22c1-3 4-4 6-4s5 1 6 4c5 1 9 5 9.2 11.5.5-1.5.8-3.5.8-5.5 0-10-6-17-16-17Z" fill="#6E4B34" />
        <circle cx="26.5" cy="30" r="1.8" fill="#3A2A20" />
        <circle cx="37.5" cy="30" r="1.8" fill="#3A2A20" />
        <circle cx="24" cy="35" r="2.6" fill="#F2A79C" opacity="0.55" />
        <circle cx="40" cy="35" r="2.6" fill="#F2A79C" opacity="0.55" />
        <path d="M27 36.5c1.6 2.2 4 3.3 5 3.3s3.4-1.1 5-3.3" fill="none" stroke="#9C5C42" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ───────── right panel (stages 0–5): the CRM record filling live ───────── */
function LeadPanel({ stage }: { stage: number }) {
  const isStatic = stage >= STAGES.length;
  if (isStatic) {
    // mobile / reduced-motion static stack: the whole story at once
    return (
      <div className="space-y-4">
        <CrmRecord stage={5} />
        <ReviewCard />
        <SiteMock />
      </div>
    );
  }
  return <CrmRecord stage={stage} />;
}

/* compact "it's in your CRM" summary — used on mobile once the record is full,
   so the review beat has room to breathe */
function CrmSavedPill() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3.5 shadow-[0_12px_36px_rgba(26,26,26,.07)]">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e7f6ee] text-[15px] font-bold text-[#1f9d55]">✓</span>
      <div className="min-w-0">
        <div className="font-heading text-[13.5px] font-bold leading-tight text-ink">Maria Garcia · Junk pickup</div>
        <div className="mt-0.5 text-[11.5px] leading-tight text-slate-soft">Saved &amp; confirmed in your CRM · Tue 9:00 AM</div>
      </div>
    </div>
  );
}

/* ───────── the climax: the review alone in the spotlight → slid onto your site ───────── */
function Climax() {
  const [onSite, setOnSite] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOnSite(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <AnimatePresence mode="wait">
        {!onSite ? (
          <motion.div
            key="spotlight"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 90, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.5, 0, 0.2, 1] }}
            className="space-y-4"
          >
            <ReviewCard />
            <p className="px-2 text-center text-[13.5px] leading-snug text-slate">
              Specific lines like this get placed across your site — right where they sell:{" "}
              <b className="text-ink-soft">speed → booking</b>, <b className="text-ink-soft">on-time → service</b>, <b className="text-ink-soft">spotless → trust</b>.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0, x: 90, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.5, 0, 0.2, 1] }}
          >
            <SiteMock />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CRM_FIELDS: { at: number; label: string; value: string; good?: boolean }[] = [
  { at: 0, label: "Name", value: "Maria Garcia" },
  { at: 1, label: "Phone", value: "(404) 632-9165" },
  { at: 2, label: "Job", value: "Junk pickup" },
  { at: 2, label: "Appointment", value: "Tue · 9:00 AM" },
  { at: 3, label: "Email", value: "maria.garcia@email.com" },
  { at: 3, label: "Source", value: "AI Receptionist" },
  { at: 4, label: "Status", value: "Confirmed", good: true },
];

function CrmRecord({ stage, compact = false }: { stage: number; compact?: boolean }) {
  const visible = CRM_FIELDS.filter((f) => stage >= f.at);
  return (
    <div className={`rounded-2xl border border-line bg-white shadow-[0_18px_50px_rgba(26,26,26,.08)] ${compact ? "p-3.5" : "p-4"}`}>
      <div className={`flex items-center justify-between border-b border-line ${compact ? "pb-2" : "pb-2.5"}`}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-soft font-heading text-[15px] font-bold text-amber-dk">M</span>
          <div>
            <div className="font-heading text-[14px] font-bold text-ink">New contact</div>
            <div className="text-[11px] text-slate-soft">Welgent CRM</div>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#1f9d55]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f9d55] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1f9d55]" />
          </span>
          Live
        </span>
      </div>
      <div className={`flex flex-col ${compact ? "mt-2 gap-1.5" : "mt-2.5 gap-2"}`}>
        <AnimatePresence initial={false}>
          {visible.map((f) => (
            <motion.div
              key={f.label}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between gap-3"
            >
              <span className={`font-medium text-slate-soft ${compact ? "text-[11.5px]" : "text-[12px]"}`}>{f.label}</span>
              <span className={`font-semibold ${f.good ? "text-[#1f9d55]" : "text-ink"} ${compact ? "text-[12.5px]" : "text-[13.5px]"}`}>{f.value}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ReviewCard({ onSite = false }: { onSite?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border border-line p-4 shadow-[0_10px_30px_rgba(26,26,26,.08)] ${onSite ? "bg-base-2/70" : "bg-white"}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-[16px] leading-none text-amber">★★★★★</span>
        {!onSite && (
          <span className="ml-auto rounded-full bg-[#f7e3ea] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-magenta">New review</span>
        )}
      </div>
      <p className="mt-2 text-[13.5px] italic leading-snug text-ink-soft">
        &ldquo;Booked me in under a minute, showed up right at 9, and left my garage spotless. Couldn&apos;t have been easier.&rdquo;
      </p>
      <p className="mt-1.5 text-[12px] font-semibold text-slate">— Maria G.</p>
    </motion.div>
  );
}

function SiteMock() {
  const [placed, setPlaced] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPlaced(true), 520);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_50px_rgba(26,26,26,.1)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-base-2/70 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-green-400/70" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white px-2.5 py-0.5 text-[10px] text-slate-soft">yourbusiness.com</div>
      </div>
      <div className="px-6 py-7 text-center">
        <motion.div layout>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber">Sarasota Junk Removal</p>
          <h3 className="mt-2 font-heading text-[clamp(1.3rem,2vw,1.7rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
            Junk gone in an hour — book in 60 seconds.
          </h3>
          <p className="mt-2 text-[13px] text-slate">Same-day pickup · upfront pricing · 5-star service.</p>
        </motion.div>

        <AnimatePresence>
          {placed && (
            <motion.div
              key="placed-review"
              layout
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 max-w-[320px]"
            >
              <ReviewCard onSite />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          layout
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 rounded-full bg-amber px-6 py-3 text-[14px] font-semibold text-coal shadow-[0_8px_22px_rgba(235,154,1,.32)]"
        >
          Get a Free Quote
        </motion.button>
      </div>
    </div>
  );
}
