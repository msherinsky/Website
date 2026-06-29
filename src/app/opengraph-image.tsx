import { ImageResponse } from "next/og";

export const alt = "Welgent — Get Seen. Build Trust. Book Every Job.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAF7",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* soft amber bloom */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 320,
            width: 760,
            height: 600,
            borderRadius: 600,
            background: "radial-gradient(circle, rgba(235,154,1,0.30), rgba(235,154,1,0) 65%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 800, letterSpacing: -1, color: "#1A1A1A" }}>
          Wel<span style={{ color: "#EB9A01" }}>gent</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, color: "#1A1A1A" }}>
            Get seen. Build trust.
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, color: "#EB9A01" }}>
            Book every job.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#6B675E", maxWidth: 900 }}>
            Done-for-you website, SEO, AI receptionist, and reporting for local service businesses.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 44, height: 8, borderRadius: 8, background: "#EB9A01" }} />
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#2B2B2B" }}>welgent.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
