import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SYSTEM_NODES, type IconKey } from "@/config/system";
import type { Accent } from "@/config/services";

/**
 * "What we do" — two ENGINES (Website & SEO, AI Receptionist) feeding one solid
 * HUB (the live CRM & Reporting dashboard). The engines bring in and book the
 * work; everything flows down into the dashboard, where the owner sees it all.
 * Every piece is a link into its page (the hub → /reporting), and carries
 * `data-zoom` so the click zooms into that block.
 */

const ACCENT: Record<Accent, { text: string; ring: string; chip: string }> = {
  amber: { text: "text-amber", ring: "group-hover:border-amber/60", chip: "bg-amber-soft" },
  magenta: { text: "text-magenta", ring: "group-hover:border-magenta/55", chip: "bg-[#f7e3ea]" },
  ink: { text: "text-ink", ring: "group-hover:border-ink/40", chip: "bg-base-2" },
};

export function SystemRing() {
  return (
    <section id="system" className="relative overflow-hidden bg-base px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-[1140px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber">What we do</p>
          <h2 className="font-heading text-[clamp(2.2rem,4.6vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
            One system that gets you found, booked, and trusted.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate">
            Two engines bring in and book the work — and everything feeds the one dashboard where you see it all. Tap any piece to dive in.
          </p>
        </Reveal>

        {/* ── desktop: two engines → one hub ── */}
        <Reveal delay={0.1} className="mt-16 hidden lg:block">
          <div className="relative mx-auto h-[600px] w-full max-w-[940px]">
            {/* soft amber core glow behind the hub */}
            <div className="absolute left-1/2 top-[62%] h-[360px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(235,154,1,.16),transparent_70%)] blur-2xl" />

            {/* connectors: the engines flow down into the hub */}
            <svg viewBox="0 0 940 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <path d="M150,150 C 200,210 250,225 312,232" fill="none" stroke="rgba(235,154,1,.34)" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="route-flow" />
              <path d="M790,150 C 740,210 690,225 628,232" fill="none" stroke="rgba(235,154,1,.34)" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="route-flow" />
            </svg>

            {/* the two engines */}
            <EngineCard node={SYSTEM_NODES[0]} style={{ left: "16%", top: "2%" }} />
            <EngineCard node={SYSTEM_NODES[1]} style={{ left: "84%", top: "2%" }} />

            {/* the hub — the live dashboard everything feeds into */}
            <div className="absolute left-1/2 top-[39%] w-[460px] -translate-x-1/2">
              <HubDashboard />
            </div>
          </div>
        </Reveal>

        {/* ── mobile: engines stacked, then the hub ── */}
        <div className="mx-auto mt-12 grid max-w-md gap-3 lg:hidden">
          {SYSTEM_NODES.map((n, i) => {
            const a = ACCENT[n.accent];
            return (
              <Reveal key={n.id} delay={0.05 * i}>
                <Link href={n.href} data-zoom={n.href} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${a.chip} ${a.text}`}>{ICONS[n.icon]}</span>
                  <span className="min-w-0">
                    <span className="block font-heading text-[16px] font-bold text-ink">{n.label}</span>
                    <span className="block text-[13px] leading-snug text-slate">{n.desc}</span>
                  </span>
                  <span className={`ml-auto ${a.text} transition-transform group-hover:translate-x-1`}>→</span>
                </Link>
              </Reveal>
            );
          })}
          <Reveal delay={0.15}>
            <HubDashboard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---- an engine node (desktop card) ---- */
function EngineCard({ node: n, style }: { node: (typeof SYSTEM_NODES)[number]; style: React.CSSProperties }) {
  const a = ACCENT[n.accent];
  return (
    <div className="absolute w-[206px] -translate-x-1/2" style={style}>
      <Link
        href={n.href}
        data-zoom={n.href}
        className={`group block rounded-2xl border border-line bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(26,26,26,.12)] ${a.ring}`}
      >
        <span className={`mx-auto grid h-12 w-12 place-items-center rounded-xl ${a.chip} ${a.text}`}>{ICONS[n.icon]}</span>
        <span className="mt-3 block font-heading text-[16.5px] font-bold tracking-[-0.01em] text-ink">{n.label}</span>
        <span className="mt-1 block text-[12.5px] leading-snug text-slate">{n.desc}</span>
      </Link>
    </div>
  );
}

/* ---- the hub: the live CRM & Reporting dashboard everything feeds into ---- */
const SOURCES = [
  { label: "Google", n: 11, w: "100%" },
  { label: "AI chat", n: 6, w: "55%" },
  { label: "Reviews", n: 2, w: "22%" },
];

function HubDashboard() {
  return (
    <Link href="/reporting" data-zoom="/reporting" className="group relative block">
      {/* soft halo */}
      <div className="absolute -inset-5 rounded-[40px] bg-[radial-gradient(circle,rgba(235,154,1,.18),transparent_72%)] blur-lg" aria-hidden />
      {/* stacked card behind, for depth */}
      <div className="absolute inset-x-4 -bottom-2.5 top-4 rounded-[26px] border border-line bg-white/60 shadow-sm" aria-hidden />

      {/* the card */}
      <div className="relative overflow-hidden rounded-[26px] border border-line bg-white p-6 shadow-[0_34px_80px_rgba(26,26,26,.20)] transition-transform duration-300 group-hover:-translate-y-1">
        {/* amber accent rail */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber via-amber to-magenta/70" aria-hidden />

        {/* header */}
        <div className="flex items-center justify-between">
          <span className="font-logo text-[17px] font-extrabold tracking-tight text-ink">
            Wel<span className="text-amber">gent</span>
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#1f9d55]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f9d55] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1f9d55]" />
            </span>
            Live
          </span>
        </div>
        <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-soft">CRM &amp; Reporting · this month</div>

        {/* headline metrics */}
        <div className="mt-3.5 grid grid-cols-3 gap-2.5 text-center">
          {[
            { n: "24", l: "Calls" },
            { n: "19", l: "Jobs booked" },
            { n: "4.9★", l: "Rating" },
          ].map((m) => (
            <div key={m.l} className="rounded-xl bg-base/80 px-1 py-3">
              <div className="font-heading text-[23px] font-extrabold leading-none text-ink">{m.n}</div>
              <div className="mt-1.5 text-[10.5px] text-slate">{m.l}</div>
            </div>
          ))}
        </div>

        {/* leads trend */}
        <div className="mt-3 rounded-xl bg-base/80 px-3.5 py-3">
          <div className="mb-1.5 flex items-center justify-between text-[10.5px] text-slate-soft">
            <span>Leads this month</span>
            <span className="font-semibold text-[#1f9d55]">▲ 38%</span>
          </div>
          <svg viewBox="0 0 200 40" className="h-9 w-full" preserveAspectRatio="none" aria-hidden>
            <polyline points="0,34 28,30 56,31 84,22 112,24 140,14 168,11 200,4" fill="none" stroke="var(--color-amber)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* where the jobs came from */}
        <div className="mt-3 rounded-xl bg-base/80 px-3.5 py-3">
          <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wide text-slate-soft">Where jobs came from</div>
          <div className="space-y-2">
            {SOURCES.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className="w-14 shrink-0 text-[11px] font-medium text-ink">{s.label}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-line/70">
                  <span className="block h-full rounded-full bg-amber" style={{ width: s.w }} />
                </span>
                <span className="w-5 shrink-0 text-right text-[11px] font-bold text-ink">{s.n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* click affordance */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-amber-dk transition-colors group-hover:text-amber">
          Know what&apos;s working
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}

/* ---- node icons ---- */
const ic = "h-[22px] w-[22px]";
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const ICONS: Record<IconKey, ReactNode> = {
  search: (
    <svg className={ic} viewBox="0 0 24 24" {...stroke}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
  ),
  headset: (
    <svg className={ic} viewBox="0 0 24 24" {...stroke}><path d="M4 13a8 8 0 0 1 16 0" /><path d="M4 13v3a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Zm16 0v3a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z" /><path d="M18 18a4 4 0 0 1-4 3h-2" /></svg>
  ),
};
