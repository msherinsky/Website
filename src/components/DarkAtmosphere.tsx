/**
 * Dimensional depth for the dark sections: a soft top glow + a receding
 * perspective grid floor (the NoGood-style "object over a grid" feel).
 * Pure CSS, sits behind content via -z-10. Host needs `relative isolate
 * overflow-hidden`. No animation, so reduced-motion safe by default.
 */
export function DarkAtmosphere({ grid = true }: { grid?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* ambient top glow */}
      <div className="absolute left-1/2 top-[-80px] h-[560px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(235,154,1,.16),transparent_64%)]" />
      {/* receding perspective grid floor */}
      {grid && (
        <div className="absolute inset-x-0 bottom-0 h-[52%] [perspective:620px]">
          <div className="h-full w-full origin-bottom bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:linear-gradient(to_top,black,transparent_88%)] [transform:rotateX(64deg)]" />
        </div>
      )}
    </div>
  );
}
