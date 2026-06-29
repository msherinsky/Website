/**
 * AI Receptionist — the FEELING + OUTCOME, not the mechanics. The visual proof
 * is a phone booking a job at 11:42 PM (you're asleep, it's still handled); the
 * copy sells freedom + never losing a lead, never the "how."
 */

const OUTCOMES = [
  {
    t: "Never lose a job to a missed call",
    b: "Every call and every web chat is answered on the first ring — day, night, weekend, mid-haul. The lead that used to hit voicemail (and then your competitor) gets booked instead.",
  },
  {
    t: "You're off the hook — the customer isn't",
    b: "Work, sleep, dinner with your family. Every customer still feels instantly taken care of, and you wake up to a calendar that filled itself.",
  },
  {
    t: "The relationship stays warm",
    b: "It follows up so nothing goes cold and asks for the 5-star review at just the right moment — your reputation grows while you do the work.",
  },
];

export function AnswerExplainer() {
  return (
    <section className="bg-base px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Always answered</p>
          <h2 className="mt-2 font-heading text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
            Put the phone down. It&apos;s handled.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate">
            The lead that used to slip to voicemail — and then to your competitor — is now answered, booked, and followed up with, all on its own.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,400px)_1fr]">
          <PhoneMock />

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

/* ---- a phone booking a job at 11:42 PM (you're asleep, it's handled) ---- */
function PhoneMock() {
  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-col items-center">
      <div className="w-[270px] rounded-[2.6rem] border border-coal/15 bg-coal p-2.5 shadow-[0_26px_60px_rgba(26,26,26,.22)]">
        <div className="overflow-hidden rounded-[2.1rem] bg-base">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] font-semibold text-slate-soft">
            <span>11:42 PM</span>
            <span className="h-1 w-10 rounded-full bg-coal/15" />
            <span>●●● ▾</span>
          </div>

          {/* call header */}
          <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-amber text-coal">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 13a8 8 0 0 1 16 0" /><path d="M4 13v3a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Zm16 0v3a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block font-heading text-[13px] font-bold leading-tight text-ink">AI Receptionist</span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[#1f9d55]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1f9d55]" /> Answered · new customer
              </span>
            </span>
          </div>

          {/* conversation */}
          <div className="space-y-2.5 px-4 py-4">
            <Bubble side="in">Hey, can someone haul off an old couch tomorrow?</Bubble>
            <Bubble side="out">Absolutely — I&apos;ve got 9:00 AM open tomorrow. Want me to lock it in?</Bubble>
            <Bubble side="in">Yes please 🙌</Bubble>
            <Bubble side="out">Done! You&apos;re all set. ✓</Bubble>

            {/* booked confirmation */}
            <div className="!mt-3 flex items-center gap-2 rounded-xl bg-[#e7f6ee] px-3 py-2.5">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#1f9d55] text-white text-[12px]">✓</span>
              <span className="text-[11.5px] font-semibold leading-tight text-[#177a44]">
                Booked · Tomorrow 9:00 AM
                <span className="block text-[9.5px] font-medium text-[#3f9466]">Couch haul-away · added to calendar</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[14px] font-semibold text-ink">
        You were asleep. It still booked the job.
      </p>
    </div>
  );
}

function Bubble({ side, children }: { side: "in" | "out"; children: React.ReactNode }) {
  const out = side === "out";
  return (
    <div className={`flex ${out ? "justify-end" : "justify-start"}`}>
      <span
        className={`max-w-[78%] rounded-2xl px-3 py-1.5 text-[11px] leading-snug ${
          out ? "rounded-br-sm bg-amber text-coal" : "rounded-bl-sm bg-white text-ink shadow-sm"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
