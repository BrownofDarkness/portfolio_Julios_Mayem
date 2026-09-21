import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Inter — variable, self-hébergée au build.
 * On garde tous les poids qu'on utilise réellement (400, 500, 600).
 * "swap" : évite le FOIT sans faire clignoter la métrique.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * JetBrains Mono — pour les métadonnées, tags, petits libellés techniques.
 * Poids 400/500 suffisent pour notre usage discipliné.
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
