import { ImageResponse } from "next/og";

/**
 * Favicon dynamique (généré au build).
 * Un cercle cyan sur fond ardoise — la signature "point qui pulse"
 * du site, statique et lisible à taille réduite.
 */
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#4EBFC9",
            boxShadow: "0 0 10px #4EBFC9",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
