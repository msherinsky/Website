"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import { Ambience } from "./Ambience";

/**
 * "Your mornings" — the human payoff. The system ran overnight; the owner
 * wakes up to a lock screen full of good news (jobs booked, reviews in, leads
 * handled). Calm, specific, warm. Light section with a dark phone for contrast.
 */
const NOTIFS = [
  { title: "3 new jobs booked overnight", time: "now" },
  { title: "New 5-star review just came in", time: "6:18 AM" },
  { title: "A new lead got an instant quote", time: "11:52 PM" },
  { title: "Missed call answered and texted back", time: "9:41 PM" },
  { title: "You moved up to #1 in local search", time: "yesterday" },
];

export function Mornings() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-base py-36">
      <Ambience flip />
      <div className="mx-auto grid max-w-5xl items-center gap-16 px-6 lg:grid-cols-[1fr_auto]">
        {/* copy */}
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue">
            Your mornings
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,5.4vw,4.1rem)] font-bold leading-[1.0] tracking-[-0.03em] text-ink">
            Wake up to jobs already booked.
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-slate">
            While you were asleep or out on a job, the system kept working. New
            jobs on the calendar, fresh reviews, leads followed up. You just
            grab your coffee and check your phone.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "No more missed calls turning into lost jobs",
              "No more chasing customers for reviews",
              "No more wondering where the next job comes from",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[15px] text-ink/80">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue/10 text-[11px] font-bold text-blue">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] font-semibold text-ink">Want mornings like that?</p>
          <a
            href="#audit"
            data-book
            className="mt-3 inline-block rounded-full bg-amber px-7 py-3.5 text-[15px] font-semibold text-coal shadow-[0_8px_22px_rgba(235,154,1,.3)] transition hover:bg-amber-dk"
          >
            Get a Free Audit
          </a>
        </Reveal>

        {/* phone lock screen */}
        <Reveal delay={0.1} className="flex justify-center">
          <div className="w-[300px] rounded-[2.4rem] border border-white/10 bg-gradient-to-b from-[#211c17] to-[#0e0c0a] p-2.5 shadow-[0_30px_80px_rgba(26,26,26,0.22)]">
            <div className="relative h-[560px] overflow-hidden rounded-[1.8rem] bg-gradient-to-b from-[#171411] to-[#0e0c0a]">
              <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(235,154,1,.2),transparent_70%)]" />

              {/* status bar */}
              <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-medium text-white/55">
                <span>6:42</span>
                <span className="h-3 w-10 rounded-full bg-white/10" />
              </div>

              {/* clock */}
              <div className="mt-7 text-center">
                <div className="text-[12px] font-medium text-white/55">Tuesday, June 9</div>
                <div className="font-heading text-[64px] font-semibold leading-none text-white">6:42</div>
              </div>

              {/* notifications */}
              <div className="absolute inset-x-3 bottom-5 space-y-2">
                {NOTIFS.map((n, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: reduce ? 0 : 0.25 + i * 0.16, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-2.5 rounded-2xl bg-white/10 p-2.5 backdrop-blur-md"
                  >
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-amber text-[13px] font-extrabold text-coal">
                      W
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-semibold text-white">Welgent</span>
                        <span className="text-white/45">{n.time}</span>
                      </div>
                      <div className="mt-0.5 text-[11.5px] leading-snug text-white/85">{n.title}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
