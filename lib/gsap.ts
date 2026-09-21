"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * On enregistre les plugins une seule fois côté client.
 * gsap.matchMedia() gère automatiquement prefers-reduced-motion
 * quand on inclut la breakpoint "(prefers-reduced-motion: no-preference)".
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
