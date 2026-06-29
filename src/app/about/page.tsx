import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { AuditCTA } from "@/components/AuditCTA";

export const metadata: Metadata = {
  title: "About — Welgent",
  description:
    "Welgent builds and runs the full marketing and operations system for local service businesses — so owners can stop juggling tools and just run the jobs.",
};

const VALUES = [
  {
    title: "Done-for-you, end to end",
    body: "You shouldn't need to learn SEO, wrangle a website builder, or babysit a phone. We build it, run it, and keep it working — you just do the work you're great at.",
  },
  {
    title: "One connected system",
    body: "Most owners get sold a website here, an answering service there, a review tool somewhere else. We run it all as one machine, where each piece makes the next one work better.",
  },
  {
    title: "Built for local service pros",
    body: "Junk removal, HVAC, plumbing, landscaping, fencing — trades where the next job comes from showing up first, looking credible, and answering fast. That's exactly what we handle.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-base px-6 pt-32 pb-16">
        <div className="warm-bloom pointer-events-none absolute left-1/2 top-[-180px] h-[520px] w-[860px] -translate-x-1/2" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber">About Welgent</p>
            <h1 className="font-heading text-[clamp(2.4rem,5.4vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
              We build the system. <span className="grad-text">You run the jobs.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-slate">
              Welgent builds and runs the entire online presence for local service businesses — website, local SEO,
              AI receptionist, follow-ups, reviews, and reporting — so leads come in and jobs get booked while
              you&apos;re out on a job.
            </p>
          </Reveal>
        </div>
      </section>

      {/* belief */}
      <section className="bg-base-2 px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
            Great local businesses don&apos;t lose work because the work is bad. They lose it because customers
            never found them, couldn&apos;t reach them, or weren&apos;t sure they could trust them.
          </p>
          <p className="mt-5 text-[17px] leading-relaxed text-slate">
            We exist to close that gap — quietly, in the background, every single day.
          </p>
        </Reveal>
      </section>

      {/* values */}
      <section className="bg-base px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-amber">What we believe</p>
            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
              How we think about your business.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.08 * i}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-sm">
                  <span className="font-heading text-[15px] font-bold text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-heading text-[1.3rem] font-bold tracking-[-0.01em] text-ink">{v.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* founder */}
      <section className="bg-base px-6 pb-24">
        <Reveal className="mx-auto max-w-2xl rounded-2xl border border-line bg-base-2/60 p-8 sm:p-10">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-amber font-heading text-xl font-extrabold text-coal">
              MS
            </span>
            <div>
              <div className="font-heading text-[17px] font-bold text-ink">Matt Sherinsky</div>
              <div className="text-[13px] text-slate">Founder, Welgent</div>
            </div>
          </div>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
            &ldquo;I started Welgent because the owners doing the best work were getting beaten by competitors who
            were just easier to find and easier to book. That&apos;s a fixable problem — and it&apos;s the whole
            point of what we build. You focus on the job; we make sure the next one is already lined up.&rdquo;
          </p>
          <Link href="/#system" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-amber transition-colors hover:text-amber-dk">
            See how the system works →
          </Link>
        </Reveal>
      </section>

      <AuditCTA />
    </>
  );
}
