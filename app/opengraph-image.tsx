import { ImageResponse } from "next/og";

export const alt = "C3 Unisex Salon, Belgaum";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fbf8f4",
          color: "#1e1916",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 10, color: "#8a6a3a" }}>C3 UNISEX SALON · BELGAUM</div>
        <div style={{ fontSize: 110, marginTop: 30, fontFamily: "serif" }}>Look good.</div>
        <div style={{ fontSize: 110, fontStyle: "italic", color: "#8a6a3a", fontFamily: "serif" }}>
          Feel confident.
        </div>
        <div style={{ fontSize: 26, marginTop: 36, letterSpacing: 6 }}>HAIR · MAKEUP · SKIN · GROOMING</div>
      </div>
    ),
    size,
  );
}
