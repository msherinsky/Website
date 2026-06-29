"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * GoHighLevel booking modal. Mounted once in the root layout. Any element with
 * a `data-book` attribute opens it (CTAs stay plain server-rendered anchors
 * with an href fallback). The iframe src is set lazily on first open.
 */
const BOOKING_SRC =
  "https://api.welgent.com/widget/booking/tSaXlv1rEpGBNRjlwbuP";

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const openModal = useCallback(() => {
    setLoaded(true);
    setOpen(true);
  }, []);

  // Global delegation: any [data-book] click opens the modal.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("[data-book]");
      if (target) {
        e.preventDefault();
        openModal();
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openModal]);

  // Body scroll lock + Escape to close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      inert={!open}
      className={`fixed inset-0 z-300 flex items-center justify-center p-4 transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-coal/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book a call with Welgent"
        className="relative flex h-[88vh] max-h-[760px] w-full max-w-[460px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <button
          aria-label="Close booking"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-base text-lg text-ink-soft transition hover:bg-base-2"
        >
          ✕
        </button>
        {loaded && (
          <iframe
            ref={iframeRef}
            src={BOOKING_SRC}
            title="Book a call with Welgent"
            scrolling="no"
            className="h-full w-full border-0"
          />
        )}
      </div>
    </div>
  );
}
