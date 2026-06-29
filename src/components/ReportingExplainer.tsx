/**
 * CRM & Reporting — the FEELING + OUTCOME: calm, in-control, "one glance and I
 * know I'm winning." The visual is a clean dashboard; the copy sells peace of
 * mind and trust that the marketing is working, never the tooling.
 */

const OUTCOMES = [
  {
    t: "Always know where you stand",
    b: "How many calls came in, how many turned into jobs, and exactly where they came from — at a glance, in plain English. No spreadsheets, no logging into five tools.",
  },
  {
    t: "Nothing slips through the cracks",
    b: "Every lead, call, and review lands in one place the moment it happens. The callback you'd have forgotten is right there waiting for you.",
  },
  {
    t: "Finally trust that it's working",
    b: "See the jobs, not vanity metrics — proof your marketing is actually paying for itself, so you never second-guess the spend again.",
  },
];

export function ReportingExplainer() {
  return (
    <section className="bg-base px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-ink">In control</p>
          <h2 className="mt-2 font-heading text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
            One glance. You know you&apos;re winning.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate">
            No wondering if the phone&apos;s ringing enough or whether the marketing&apos;s worth it. Just the clear picture — the moment you want it.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,420px)_1fr]">
          <DashboardMock />

          <ol className="grid gap-6">
            {OUTCOMES.map((p) => (
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
    </section>
  );
}

/* ---- one clean dashboard: everything, in one place, in real time ---- */
const SOURCES = [
  { label: "Google", n: 11, w: "100%" },
  { label: "AI chat", n: 6, w: "55%" },
  { label: "Reviews", n: 2, w: "22%" },
];

function DashboardMock() {
  return (
    <div className="mx-auto flex w-full max-w-[420px] flex-col items-center">
      <div className="w-full rounded-2xl border border-line bg-white p-5 shadow-[0_22px_55px_rgba(26,26,26,.12)]">
        {/* header */}
        <div className="flex items-center justify-between">
          <span className="font-logo text-[16px] font-extrabold tracking-tight text-ink">
            Wel<span className="text-amber">gent</span>
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#157a40]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f9d55] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1f9d55]" />
            </span>
            Live
          </span>
        </div>
        <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-soft">This month</div>

        {/* headline metrics */}
        <div className="mt-3 grid grid-cols-3 gap-2.5 text-center">
          {[
            { n: "24", l: "Calls" },
            { n: "19", l: "Jobs booked" },
            { n: "4.9★", l: "Rating" },
          ].map((m) => (
            <div key={m.l} className="rounded-xl bg-base/80 px-1 py-3">
              <div className="font-heading text-[22px] font-extrabold leading-none text-ink">{m.n}</div>
              <div className="mt-1.5 text-[10px] text-slate">{m.l}</div>
            </div>
          ))}
        </div>

        {/* leads trend */}
        <div className="mt-3 rounded-xl bg-base/80 px-3.5 py-3">
          <div className="mb-1.5 flex items-center justify-between text-[10.5px] text-slate-soft">
            <span>Leads this month</span>
            <span className="font-semibold text-[#157a40]">▲ 38%</span>
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
      </div>

      <p className="mt-4 text-center text-[14px] font-semibold text-ink">
        Everything, in one place, in real time.
      </p>
    </div>
  );
}
