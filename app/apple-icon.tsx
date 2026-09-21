import { ImageResponse } from "next/og";

/**
 * Apple touch icon (180×180) — écran d'accueil iOS.
 * Version plus large de l'icône : point cyan + brand mono en dessous.
 */
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
          gap: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#4EBFC9",
            boxShadow: "0 0 24px #4EBFC9",
          }}
        />
        <div
          style={{
            fontSize: 24,
            color: "#E8EAEE",
            letterSpacing: "-0.02em",
            fontFamily: "sans-serif",
            fontWeight: 500,
          }}
        >
          JM
        </div>
      </div>
    ),
    { ...size }
  );
}
