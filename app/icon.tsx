import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#08090B",
          borderRadius: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#E8EAEE",
            lineHeight: 1,
            fontFamily: "sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          J
        </div>
        <div
          style={{
            width: 14,
            height: 2,
            background: "#4EBFC9",
            borderRadius: 1,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
