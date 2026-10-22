import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#101010",
        color: "#efefed",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 36,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 16,
            background: "#242424",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          N.
        </div>
        <span>neon studios</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 72, fontWeight: 750, letterSpacing: -3 }}>
          Existing software.
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 750,
            letterSpacing: -3,
            color: "#d6b1e4",
          }}
        >
          Reimagined in Rust.
        </div>
        <div style={{ fontSize: 25, color: "#a0a09e", marginTop: 13 }}>
          Careful migrations. Verified compatibility. Measured change.
        </div>
      </div>
      <div style={{ fontSize: 19, color: "#a0a09e" }}>studio.neonjava.in</div>
    </div>,
    size,
  );
}
