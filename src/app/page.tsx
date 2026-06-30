import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { SystemRing } from "@/components/SystemRing";
import { DataFlow } from "@/components/DataFlow";
import { Mornings } from "@/components/Mornings";
import { Difference } from "@/components/Difference";
import { FAQ } from "@/components/FAQ";
import { AuditCTA } from "@/components/AuditCTA";
import { SectionConnector } from "@/components/SectionConnector";

/**
 * Home — the BRAND page as a customer-journey story (problem-first). Each
 * section answers the owner's next question:
 *   Hero          → "What do you do for me?"
 *   Problem       → "Why does this matter to me?"   (the painful reality)
 *   What we do    → "So what do you actually do?"   (clickable ring → pages)
 *   How it works  → "How does it work for me?"      (data-flow conveyor)
 *   Mornings      → "What changes for me?"          (the payoff)
 *   FAQ           → "What about…?"
 *   Close         → "How do I start?"
 */
export default function Home() {
  return (
    <>
      {/* 1 — HERO (hook) */}
      <Hero />
      <SectionConnector from="base" to="navy-alt" variant="slant-left" />

      {/* 2 — WHAT ACTUALLY HAPPENS (the reality — one dramatic dark band) */}
      <Problem />
      <SectionConnector from="navy-alt" to="base" variant="fade" label="So here's the fix" />

      {/* 3 — WHAT WE DO (clickable system ring → service pages) */}
      <SystemRing />

      {/* 4 — HOW IT WORKS (data-flow conveyor + live dashboard) */}
      <DataFlow />
      <SectionConnector from="base" to="base" variant="subtle" />

      {/* 5 — YOUR MORNINGS (the payoff) */}
      <Mornings />
      <SectionConnector from="base" to="navy-alt" variant="slant-left" label="Why we're different" />

      {/* 6 — WHY WE'RE DIFFERENT (vs. the template shops) */}
      <Difference />
      <SectionConnector from="navy-alt" to="base" variant="fade" />

      {/* 8 — FAQ */}
      <FAQ />
      <SectionConnector from="base" to="navy" variant="slant-left" />

      {/* 9 — CLOSE (free audit) */}
      <AuditCTA />
    </>
  );
}
