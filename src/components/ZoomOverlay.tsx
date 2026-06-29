"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { ServiceHero } from "./ServiceHero";
import { getServiceBySlug, type Service } from "@/config/services";

/**
 * Click-to-zoom page transition. Mounted once in the root layout (survives the
 * route change, like BookingModal). Any ring node with `data-zoom="/slug"` is
 * intercepted ON THE CAPTURE PHASE — stopping the underlying next/link from
 * navigating — and we capture a CLONE of the clicked block at its on-screen
 * rect, scale it up from its own centre (the screen zooms INTO that block) while
 * the destination hero crossfades in and settles. At full zoom the hero fills
 * the screen, so we navigate; the real page's identical hero is already
 * underneath → the overlay drops away seamlessly.
 */

type Zoom = { service: Service; rect: DOMRect; html: string; vw: number; vh: number };

export function ZoomOverlay() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [zoom, setZoom] = useState<Zoom | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = (e.target as HTMLElement | null)?.closest("[data-zoom]") as HTMLElement | null;
      if (!el) return;
      const slug = el.getAttribute("data-zoom");
      if (!slug) return;
      const service = getServiceBySlug(slug);
      if (!service) return;
      // stop the underlying next/link from also navigating
      e.preventDefault();
      e.stopPropagation();
      if (reduce) {
        router.push(slug);
        return;
      }
      const rect = el.getBoundingClientRect();
      setZoom({ service, rect, html: el.outerHTML, vw: window.innerWidth, vh: window.innerHeight });
    }
    // capture phase: runs before React's delegated Link handler
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduce, router]);

  const onDone = useCallback(() => {
    if (!zoom) return;
    router.push(zoom.service.slug);
    // hold the full-screen hero over the freshly-mounted identical page, then drop it.
    window.setTimeout(() => setZoom(null), 160);
  }, [zoom, router]);

  if (!zoom) return null;

  const { rect, vw, vh } = zoom;
  // how far the clicked block must scale (from its centre) to cover the screen
  const cover = Math.max(vw / rect.width, vh / rect.height) * 1.25;

  return (
    <div className="pointer-events-none fixed inset-0 z-[250]" aria-hidden>
      {/* the clicked block itself, zooming in toward the viewer and dissolving */}
      <motion.div
        className="fixed overflow-hidden"
        style={{
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          transformOrigin: "center center",
        }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: cover, opacity: 0 }}
        transition={{ duration: 0.62, ease: [0.5, 0, 0.2, 1] }}
        dangerouslySetInnerHTML={{ __html: zoom.html }}
      />

      {/* the destination page's hero, arriving as you land */}
      <motion.div
        className="fixed inset-0 overflow-hidden"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={onDone}
      >
        <ServiceHero service={zoom.service} inOverlay />
      </motion.div>
    </div>
  );
}
