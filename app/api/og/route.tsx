import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

/**
 * Génération d'OG images à la volée.
 * URL : /api/og?kind=default|case&title=...&subtitle=...&kicker=...
 * Signature visuelle : palette OLED chaude + accent bleu/cyan,
 * gros titre Inter + label mono JetBrains, ligne accent.
 * 1200×630 (ratio Open Graph standard).
 */

export const runtime = "edge";

const BG = "#08090B";
const PANEL = "#12141A";
const TEXT = "#E8EAEE";
const MUTED = "#7C818C";
const BLUE = "#5A9BD8";
const CYAN = "#4EBFC9";
const GOLD = "#C9A961";
const BORDER = "#22262F";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const kind = searchParams.get("kind") ?? "default";
  const title = searchParams.get("title") ?? "Julios Mayem";
  const subtitle =
    searchParams.get("subtitle") ??
    "Ingénieur logiciel · vision par ordinateur";
  const kicker = searchParams.get("kicker") ?? "Yaoundé · 2026";
  const accent = kind === "case" ? CYAN : BLUE;
  const accentLabel = kind === "case" ? "case study" : "portfolio";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* --- Grille de fond très discrète --- */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              `linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),` +
              `linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* --- Header : brand + label --- */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: MUTED,
            letterSpacing: "0.02em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: CYAN,
                boxShadow: `0 0 20px ${CYAN}`,
              }}
            />
            <span style={{ color: TEXT, fontWeight: 500 }}>julios.mayem</span>
          </div>
          <span
            style={{
              padding: "8px 16px",
              background: PANEL,
              border: `1px solid ${BORDER}`,
              borderRadius: 6,
              color: accent,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontSize: 18,
            }}
          >
            {accentLabel}
          </span>
        </div>

        {/* --- Corps : kicker + titre + subtitle --- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            marginTop: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              color: accent,
              letterSpacing: "0.06em",
              marginBottom: 28,
            }}
          >
            <span style={{ width: 44, height: 2, background: accent, opacity: 0.6 }} />
            {kicker}
          </div>

          <div
            style={{
              fontSize: title.length > 40 ? 76 : 96,
              fontWeight: 600,
              color: TEXT,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              marginBottom: 24,
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 32,
              color: MUTED,
              lineHeight: 1.35,
              maxWidth: 900,
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* --- Footer : filet + emplacement + année --- */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            borderTop: `1px solid ${BORDER}`,
            fontSize: 22,
            color: MUTED,
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ color: TEXT }}>Julios Mayem — Yaoundé, Cameroun</span>
          <span style={{ color: GOLD, fontWeight: 500 }}>portfolio.julios.dev</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
