/**
 * SINGLE SOURCE OF TRUTH for Welgent's services.
 *
 * Drives the per-service page heroes, the nav, and the sitemap. Three clean
 * pillars: get found, let the AI handle every interaction, and see it all in
 * one place. Each pillar's page carries its own deep, feeling-first content.
 */

export type ServiceId = "website-seo" | "answer" | "reporting";
export type Accent = "amber" | "magenta" | "ink";
export type ServiceIcon = "search" | "headset" | "chart";

export type Service = {
  id: ServiceId;
  slug: string; // route, e.g. "/website-seo"
  short: string; // "Website & SEO"
  accent: Accent;
  icon: ServiceIcon;
  hero: { eyebrow: string; title: string; sub: string };
};

export const SERVICES: Service[] = [
  {
    id: "website-seo",
    slug: "/website-seo",
    short: "Website & SEO",
    accent: "amber",
    icon: "search",
    hero: {
      eyebrow: "Website & SEO",
      title: "Be the one they find, and the one they trust.",
      sub: "A fast, credible website plus local SEO and Google Business Profile — so you show up first when they search, and that click turns into a booked job.",
    },
  },
  {
    id: "answer",
    slug: "/answer-every-call",
    short: "AI Receptionist",
    accent: "amber",
    icon: "headset",
    hero: {
      eyebrow: "AI Receptionist",
      title: "It answers, books, follows up, and earns the review. You just do the job.",
      sub: "Every call and chat gets answered, every lead gets booked, and every customer feels taken care of — while you're on the job, asleep, or off the clock. You never touch the phone.",
    },
  },
  {
    id: "reporting",
    slug: "/reporting",
    short: "CRM & Reporting",
    accent: "ink",
    icon: "chart",
    hero: {
      eyebrow: "CRM & Reporting",
      title: "Know exactly what's bringing in the jobs.",
      sub: "One glance and you know you're winning — every lead in one place, every job traced back to where it came from. No spreadsheets, no guessing.",
    },
  },
];

export const getService = (id: ServiceId) => SERVICES.find((s) => s.id === id)!;
export const getServiceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
