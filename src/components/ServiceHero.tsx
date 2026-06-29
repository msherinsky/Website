import Link from "next/link";
import type { ReactNode } from "react";
import { type Service, type Accent, type ServiceIcon } from "@/config/services";

/**
 * The first section (hero) of a service page. Rendered STATICALLY (no scroll
 * reveal) so it looks identical in two places: at the top of each service page,
 * AND inside the `ZoomOverlay` during the click-to-zoom transition — so the
 * moment you land is exactly what you saw zooming in.
 */

const ACCENT: Record<Accent, { grad: string; icon: string }> = {
  amber: { grad: "from-[#FFD98A] to-[#EB9A01]", icon: "text-coal" },
  magenta: { grad: "from-[#F4A6C2] to-[#CC3366]", icon: "text-white" },
  ink: { grad: "from-[#3a352f] to-[#161412]", icon: "text-white" },
};

export function ServiceHero({ service: s, inOverlay = false }: { service: Service; inOverlay?: boolean }) {
  const a = ACCENT[s.accent];
  return (
    <section className="relative overflow-hidden bg-base px-6 pt-32 pb-20">
      <div className="warm-bloom pointer-events-none absolute left-1/2 top-[-180px] h-[560px] w-[900px] -translate-x-1/2" aria-hidden />
      <div className="relative mx-auto max-w-3xl text-center">
        <Link
          href="/#system"
          tabIndex={inOverlay ? -1 : undefined}
          className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate transition-colors hover:text-ink"
        >
          ← The whole system
        </Link>

        <div
          id={`medallion-${s.id}`}
          className={`mx-auto mb-7 grid h-24 w-24 place-items-center rounded-[28px] bg-gradient-to-br ${a.grad} shadow-[0_18px_44px_rgba(26,26,26,.18)]`}
        >
          <span className={`h-11 w-11 ${a.icon}`}>{ICONS[s.icon]}</span>
        </div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-ink">
          {s.hero.eyebrow}
        </p>
        <h1 className="font-heading text-[clamp(2.4rem,5.4vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
          {s.hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-slate">{s.hero.sub}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <a
            href="#audit"
            data-book
            tabIndex={inOverlay ? -1 : undefined}
            className="rounded-full bg-amber px-8 py-4 text-[15.5px] font-semibold text-coal shadow-[0_8px_22px_rgba(235,154,1,.32)] transition hover:bg-amber-dk"
          >
            Get a Free Audit
          </a>
          <Link
            href="/#system"
            tabIndex={inOverlay ? -1 : undefined}
            className="px-2 text-[15px] font-semibold text-ink/75 transition-colors hover:text-amber"
          >
            See the whole system →
          </Link>
        </div>
      </div>
    </section>
  );
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ICONS: Record<ServiceIcon, ReactNode> = {
  search: (
    <svg viewBox="0 0 24 24" className="h-full w-full" {...stroke}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" className="h-full w-full" {...stroke}><path d="M4 13a8 8 0 0 1 16 0" /><path d="M4 13v3a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Zm16 0v3a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z" /><path d="M18 18a4 4 0 0 1-4 3h-2" /></svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" className="h-full w-full" {...stroke}><path d="M4 20V4M4 20h16M8 16v-4M13 16V8M18 16v-7" /></svg>
  ),
};
