/**
 * The seam between two sections. Comes in several shapes so the page stops
 * reading as stacked rectangles — soft fades, diagonal slants, a compressing
 * chevron, a quiet hairline. Each carries the journey thread (line + node) so
 * sections still feel strung on one path.
 *
 *   fade        soft vertical color blend (releases)
 *   slant-left  diagonal seam, high on the left  (bold light↔dark entries)
 *   slant-right diagonal seam, high on the right
 *   tense       short band + downward chevron (compress into tense beats)
 *   subtle      minimal hairline (quiet light→light)
 */

const HEX = {
  base: "#fafaf7",
  "base-2": "#f2f1ea",
  navy: "#161412",
  "navy-alt": "#1b1815",
} as const;

type Tone = keyof typeof HEX;
type Variant = "fade" | "slant-left" | "slant-right" | "tense" | "subtle";

const HEIGHT: Record<Variant, string> = {
  fade: "h-36",
  "slant-left": "h-28",
  "slant-right": "h-28",
  tense: "h-16",
  subtle: "h-20",
};

// clip for the upper-color overlay: the diagonal bottom edge is the seam
const CLIP: Record<"slant-left" | "slant-right", string> = {
  "slant-left": "polygon(0 0, 100% 0, 100% 78%, 0 22%)",
  "slant-right": "polygon(0 0, 100% 0, 100% 22%, 0 78%)",
};

export function SectionConnector({
  from,
  to,
  variant = "subtle",
  label,
}: {
  from: Tone;
  to: Tone;
  variant?: Variant;
  label?: string;
}) {
  const onDark = to === "navy" || to === "navy-alt";
  const isSlant = variant === "slant-left" || variant === "slant-right";

  return (
    <div aria-hidden className={`relative w-full overflow-hidden ${HEIGHT[variant]}`}>
      {isSlant ? (
        <>
          {/* lower color fills the band; upper color clipped on a diagonal */}
          <div className="absolute inset-0" style={{ background: HEX[to] }} />
          <div className="absolute inset-0" style={{ background: HEX[from], clipPath: CLIP[variant as "slant-left" | "slant-right"] }} />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              variant === "tense"
                ? `linear-gradient(to bottom, ${HEX[from]} 0%, ${HEX[from]} 35%, ${HEX[to]} 100%)`
                : `linear-gradient(to bottom, ${HEX[from]} 0%, ${HEX[to]} 100%)`,
          }}
        />
      )}

      {/* journey thread */}
      <div
        className={`absolute left-1/2 top-0 z-10 h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue/0 to-blue/0 ${
          variant === "subtle" ? "via-blue/25" : "via-blue/45"
        }`}
      />
      <div
        className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue ${
          variant === "subtle" ? "h-2 w-2 ring-2 ring-blue/15" : "h-2.5 w-2.5 ring-4 ring-blue/15"
        }`}
      />

      {/* tense: a downward chevron under the node */}
      {variant === "tense" && (
        <svg
          className={`absolute left-1/2 top-[calc(50%+12px)] z-10 -translate-x-1/2 ${onDark ? "text-white/55" : "text-slate/60"}`}
          width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M1 1l6 6 6-6" />
        </svg>
      )}

      {/* kicker (earned handoffs only) */}
      {label && (
        <span
          className={`absolute left-1/2 top-[calc(50%+18px)] z-10 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
            onDark ? "bg-coal/75 text-white/90" : "bg-base-2 text-slate"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
