import Link from "next/link";

/** Shared footer — written once, rendered on every page via layout.tsx. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="mx-auto max-w-[1140px] px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-logo text-xl font-extrabold">
              Wel<span className="text-blue-mid">gent</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
              We handle the website, search rankings, AI agent, and back office.
              You just run the jobs.
            </p>
            <a
              href="#audit"
              data-book
              className="mt-5 inline-block rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-coal shadow-[0_4px_16px_rgba(235,154,1,.3)] transition hover:bg-amber-dk"
            >
              Get a Free Audit
            </a>
          </div>

          <FooterCol
            title="Services"
            links={[
              { href: "/website-seo", label: "Website & SEO" },
              { href: "/answer-every-call", label: "AI Receptionist" },
              { href: "/reporting", label: "CRM & Reporting" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { href: "/about", label: "About" },
              { href: "/#system", label: "How It Works" },
              { href: "/#faq", label: "FAQ" },
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              { href: "mailto:matt@welgent.com", label: "matt@welgent.com" },
              { href: "#audit", label: "Let's Talk" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row">
          <p>© 2026 Welgent. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex gap-6">
            <a href="#" className="hover:text-white/80">Privacy Policy</a>
            <a href="#" className="hover:text-white/80">Terms of Service</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
        {title}
      </div>
      <ul className="space-y-2 text-sm text-white/65">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
