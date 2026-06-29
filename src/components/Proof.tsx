import { Reveal } from "./Reveal";
import { Ambience } from "./Ambience";

/**
 * Proof — testimonials from local owners. NOTE: these are placeholders written
 * in a real owner's voice; swap with actual client quotes before launch.
 */
const QUOTES = [
  {
    quote:
      "I used to lose half my calls when I was up on a roof. Now every one gets answered and booked. I just show up and do the work.",
    name: "Mike R.",
    role: "Roofing",
  },
  {
    quote:
      "The reviews basically run themselves now. We went from a handful to over a hundred in a few months, and the calls followed.",
    name: "Dana L.",
    role: "Cleaning service",
  },
  {
    quote:
      "I stopped dropping my prices to win work. Customers find me first, and they call me first. That changed everything.",
    name: "Carlos M.",
    role: "HVAC",
  },
];

export function Proof() {
  return (
    <section className="relative isolate overflow-hidden bg-base-2 py-24">
      <Ambience />
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue">Proof</p>
          <h2 className="font-heading text-[clamp(2.5rem,5.4vw,4.1rem)] font-bold leading-[1.0] tracking-[-0.03em] text-ink">
            Local businesses that stopped guessing.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-slate">
            Real owners, real results. Here&apos;s what changes once the system is
            running.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={0.08 * i}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_4px_16px_rgba(26,26,26,0.05)]">
                <div className="text-[13px] tracking-tight text-blue">★★★★★</div>
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/85">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-5 text-[14px] font-semibold text-ink">
                  {q.name}
                  <span className="font-normal text-slate-soft"> · {q.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
