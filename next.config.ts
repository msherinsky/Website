import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Static export → plain HTML/CSS/JS in /out. SEO-clean, host anywhere
  // (Vercel, GitHub Pages, any static host). Matches the Welgent SEO standard.
  output: "export",

  // Static export can't run the Image Optimization server, so serve images as-is.
  images: { unoptimized: true },

  // The agency repo has its own root lockfile; pin Turbopack to THIS app.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
