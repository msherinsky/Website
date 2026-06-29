"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { Ambience } from "./Ambience";

/**
 * FAQ — plain, honest answers to a local owner's real objections.
 * NOTE: confirm the pricing + contract answers match your actual terms.
 * Smooth accordion via the grid-rows 0fr→1fr trick (no JS height measuring).
 */
const FAQS = [
  {
    q: "How much does it cost?",
    a: "Every business is in a different spot, so we start with a free audit and give you a straight number. Most local businesses land on a simple monthly that pays for itself with a job or two.",
  },
  {
    q: "Do I own the website?",
    a: "We custom-build and fully manage everything for you as a service. This isn't a template you buy and run yourself. We build it, host it, run it, and keep improving it. If you ever decide to leave, we'll talk through your options honestly.",
  },
  {
    q: "How long until it's up and running?",
    a: "Most setups go live within a couple of weeks. We handle the heavy lifting, so it's very little work on your end.",
  },
  {
    q: "I'm not a tech person. Is that a problem?",
    a: "Not at all. That's the whole point. You stay focused on the work you're great at, and we run the marketing and operations behind it.",
  },
  {
    q: "I already have a website. Do I need a new one?",
    a: "Maybe not. The free audit shows what's working and what's quietly costing you jobs. We only rebuild if it'll actually get you more work.",
  },
  {
    q: "Am I locked into a long contract?",
    a: "We'd rather earn it every month. We'll lay out the terms plainly in the audit, with no surprises and no fine print.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FAQ() {
  return (
    <section id="faq" className="relative isolate overflow-hidden bg-base py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <Ambience flip />
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue">FAQ</p>
          <h2 className="font-heading text-[clamp(2.4rem,5vw,3.7rem)] font-bold leading-[1.0] tracking-[-0.03em] text-ink">
            Questions, answered straight.
          </h2>
        </Reveal>

        <div className="mt-8 border-t border-line">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-[16.5px] font-semibold text-ink">{q}</span>
        <span
          className={`shrink-0 text-[22px] leading-none text-blue transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-8 text-[15px] leading-relaxed text-slate">{a}</p>
        </div>
      </div>
    </div>
  );
}
