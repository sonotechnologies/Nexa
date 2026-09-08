import { ImageResponse } from "next/og";

export const alt = "Nexa — premium gadget store";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#fbfbfc";
const ACCENT = "#4b3ecb";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(155deg, #1c1e24 0%, #24262c 100%)",
          color: PAPER,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 22, height: 22, background: ACCENT }} />
            <div
              style={{
                fontSize: 104,
                fontWeight: 800,
                letterSpacing: "0.01em",
                lineHeight: 1,
              }}
            >
              NEXA
            </div>
          </div>
          <div style={{ width: 640, height: 2, background: "rgba(251,251,252,0.18)" }} />
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.4,
              maxWidth: 780,
              color: "rgba(251,251,252,0.82)",
            }}
          >
            Phones, laptops, headsets, and power delivery. Built for precision, priced without theatre.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.14em",
            color: ACCENT,
          }}
        >
          PHONES · LAPTOPS · HEADSETS · POWER BANKS
        </div>
      </div>
    ),
    { ...size }
  );
}
