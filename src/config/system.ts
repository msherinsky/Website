/**
 * SYSTEM_NODES — the six pieces of the Welgent machine, in the order they sit
 * around the clickable ring (clockwise from the top), which is also the order
 * the lead flows through them. Each node links to the service page that covers
 * it. Drives `SystemRing.tsx`.
 */
import type { Accent } from "./services";

export type IconKey = "search" | "headset";

export type SystemNode = {
  id: string;
  label: string;
  desc: string; // short, owner-facing
  accent: Accent;
  href: string; // target service page
  icon: IconKey;
};

// The two ENGINES that orbit the hub. CRM & Reporting is no longer a node — it
// IS the central dashboard everything feeds into (see `SystemRing`).
export const SYSTEM_NODES: SystemNode[] = [
  { id: "website", label: "Website & SEO", desc: "Show up first — and look the part.", accent: "amber", href: "/website-seo", icon: "search" },
  { id: "receptionist", label: "AI Receptionist", desc: "Answers, books, follows up, gets the review.", accent: "amber", href: "/answer-every-call", icon: "headset" },
];
