import type { ReactNode } from "react";

/**
 * Shared shell for the legal pages (privacy, terms).
 *
 * Deliberately static — no Reveal/IntersectionObserver. Carrier and TCR
 * reviewers checking A2P consent must be able to read this content
 * immediately, including with JS disabled.
 */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-base px-6 pt-32 pb-12">
        <div
          className="warm-bloom pointer-events-none absolute left-1/2 top-[-180px] h-[520px] w-[860px] -translate-x-1/2"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-ink">
            Legal
          </p>
          <h1 className="font-heading text-[clamp(2.2rem,4.8vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em] text-ink">
            {title}
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-slate">{intro}</p>
          <p className="mt-4 text-[14px] text-slate">Last updated: {updated}</p>
        </div>
      </section>

      <section className="bg-base px-6 pb-24">
        <div className="legal-body mx-auto max-w-3xl">{children}</div>
      </section>
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-heading text-[1.35rem] font-bold tracking-[-0.01em] text-ink">
        {heading}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
