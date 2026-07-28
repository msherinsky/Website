import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://welgent.com";
  const routes = ["", "/about", "/website-seo", "/answer-every-call", "/reporting"];
  // Legal pages are listed so carrier / TCR reviewers can find them, but kept
  // at low priority since they aren't ranking targets.
  const legal = ["/privacy", "/terms"];
  return [
    ...routes.map((r) => ({
      url: `${base}${r}`,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...legal.map((r) => ({
      url: `${base}${r}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
