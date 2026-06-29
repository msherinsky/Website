/**
 * Subtle background character for the open light sections — a faint dot grid
 * for texture + two soft blue glows that slowly drift. Very restrained (keeps
 * it competent, not busy). Sits behind content via -z-10; the host section
 * needs `relative isolate overflow-hidden`. Reduced-motion freezes the drift.
 */
export function Ambience({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* faint dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(20,22,26,.04)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_45%,black,transparent_82%)]" />
      {/* slow-drifting soft glows */}
      <div
        className={`amb-drift-a absolute h-[480px] w-[480px] rounded-full bg-blue/[0.06] blur-3xl ${
          flip ? "-right-24 top-1/3" : "-left-24 top-1/4"
        }`}
      />
      <div
        className={`amb-drift-b absolute h-[420px] w-[420px] rounded-full bg-blue/[0.05] blur-3xl ${
          flip ? "-left-24 bottom-2" : "-right-24 bottom-6"
        }`}
      />
    </div>
  );
}
