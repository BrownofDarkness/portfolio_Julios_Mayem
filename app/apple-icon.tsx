import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#08090B",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 118,
            fontWeight: 700,
            color: "#E8EAEE",
            lineHeight: 1,
            fontFamily: "sans-serif",
            letterSpacing: "-0.04em",
          }}
        >
          J
        </div>
        <div
          style={{
            width: 72,
            height: 6,
            background: "#4EBFC9",
            borderRadius: 3,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
