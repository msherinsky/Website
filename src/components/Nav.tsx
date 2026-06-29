"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Shared top nav — written ONCE, rendered on every page via layout.tsx.
 * Ink text over the light hero; a paper/blur backdrop appears on scroll.
 */
// Nav labels are HOOKS (the promise that earns the click), not feature names.
// The pages themselves still carry the descriptive titles.
const LINKS = [
  { href: "/website-seo", label: "Look like the best in town" },
  { href: "/answer-every-call", label: "Book jobs in your sleep" },
  { href: "/reporting", label: "Know what's working" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed inset-x-0 top-0 z-100 transition-all duration-300 ${
          scrolled
            ? "border-b border-ink/10 bg-paper/85 py-3 backdrop-blur-md"
            : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-8 px-6">
          <Link href="/" className="font-logo text-[19px] font-extrabold tracking-tight text-ink">
            Wel<span className="text-amber">gent</span>
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[14.5px] font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#audit"
                data-book
                className="rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-coal shadow-[0_4px_16px_rgba(235,154,1,.3)] transition hover:bg-amber-dk"
              >
                Get a Free Audit
              </a>
            </li>
          </ul>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex flex-col gap-[5px] p-1 md:hidden"
          >
            <span className="block h-0.5 w-6 rounded bg-ink" />
            <span className="block h-0.5 w-6 rounded bg-ink" />
            <span className="block h-0.5 w-6 rounded bg-ink" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-200 flex flex-col items-center justify-center gap-8 bg-paper md:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 p-2 text-2xl text-ink-soft hover:text-ink"
          >
            ✕
          </button>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-heading text-2xl font-bold text-ink hover:text-amber"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#audit"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-amber px-8 py-3.5 text-base font-semibold text-coal"
          >
            Get a Free Audit
          </a>
        </div>
      )}
    </>
  );
}
