import { Reveal } from "./Reveal";
import { ObviousChoiceScene } from "./ObviousChoiceScene";
import { DarkAtmosphere } from "./DarkAtmosphere";

/**
 * Problem / agitation section. The animated phone scene lives here — where
 * the prospect is primed to feel the pain — narrating the real customer
 * journey: search → cookie-cutter competitors fighting on price → your
 * custom site → you're the obvious choice.
 */
export function Problem() {
  return (
    <section id="problem" className="relative isolate overflow-hidden bg-navy-alt py-24">
      <DarkAtmosphere grid={false} />
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-mid">
            What actually happens
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,5.4vw,4rem)] font-bold leading-[1.0] tracking-[-0.03em] text-white">
            You do good work.
            <br />
            <span className="grad-text">That should be enough. It&apos;s not.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] leading-snug text-white/60">
            Here&apos;s what really happens the moment a customer goes looking
            for someone like you.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mx-auto mt-14 max-w-5xl px-6">
        <ObviousChoiceScene />
      </Reveal>
    </section>
  );
}
