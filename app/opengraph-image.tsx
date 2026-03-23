import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "盆栽タイクーン";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #e8f5e9 0%, #f5f0e8 50%, #fff8e7 100%)",
          fontFamily: "serif",
        }}
      >
        {/* Top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: "#1b4332" }} />

        {/* SVG Pine Tree */}
        <svg viewBox="0 0 64 64" width={160} height={160} style={{ marginBottom: 24 }}>
          <rect x="28" y="46" width="8" height="12" rx="2" fill="#6B4F2A"/>
          <polygon points="32,6 14,34 50,34" fill="#2D5A1B"/>
          <polygon points="32,16 18,40 46,40" fill="#3A7023"/>
          <polygon points="32,26 20,46 44,46" fill="#4A8A2D"/>
        </svg>

        <div style={{ fontSize: 80, fontWeight: 900, color: "#1b4332", marginBottom: 16, textAlign: "center" }}>
          盆栽タイクーン
        </div>
        <div style={{ fontSize: 36, color: "#4a7c59", marginBottom: 12, textAlign: "center" }}>
          静かに育て、大きく稼ぐ
        </div>
        <div style={{ fontSize: 28, color: "#888", marginBottom: 32, textAlign: "center" }}>
          放置しても成長する癒し系タイクーンゲーム
        </div>
        <div style={{ fontSize: 22, color: "#aaa" }}>
          bonsai-tycoon.vercel.app
        </div>

        {/* Bottom bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 10, background: "#1b4332" }} />
      </div>
    ),
    { ...size }
  );
}
