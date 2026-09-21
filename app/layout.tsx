/**
 * Root layout — enveloppe minimale.
 * La vraie logique (locale, messages, fonts, styles) vit dans
 * app/[locale]/layout.tsx.
 */
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
