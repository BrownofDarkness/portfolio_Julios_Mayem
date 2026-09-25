"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./HeroAmbientGrid.module.css";

const CELL_SIZE = 48;
const DIM_BORDER = "rgba(255, 255, 255, 0.024)";

// BPM 50 → 1200 ms par battement
const BEAT_MS       = Math.round((60 / 50) * 1000);
const DUB_OFFSET_MS = 180;

// ─────────────────────────────────────────────────────────────
// OPTION B — Perlin noise × BPM (commenté)
// ─────────────────────────────────────────────────────────────
// const BPM_PERIOD = 60 / 55;
// function noise2d(x, y, t) {
//   return (
//     Math.sin(x * 0.35 + t * 0.55) * Math.cos(y * 0.42 + t * 0.48) * 0.45 +
//     Math.sin(x * 0.78 + y * 0.32 + t * 0.95) * 0.35 +
//     Math.cos(x * 0.22 + y * 0.68 + t * 0.38) * 0.20
//   );
// }
// ... boucle rAF qui met à jour borderRightColor / borderBottomColor
// de chaque cellule selon noise2d(col, row, t) + spike BPM.

export function HeroAmbientGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    // Sur mobile (display:none → offsetWidth = 0), on sort immédiatement.
    if (container.offsetWidth === 0) return;

    const cols = Math.ceil(container.offsetWidth  / CELL_SIZE) + 1;
    const rows = Math.ceil(container.offsetHeight / CELL_SIZE) + 1;

    container.style.gridTemplateColumns = `repeat(${cols}, ${CELL_SIZE}px)`;
    container.style.gridAutoRows        = `${CELL_SIZE}px`;

    const cells: HTMLDivElement[] = [];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < cols * rows; i++) {
      const cell = document.createElement("div");
      cell.className = styles.cell;
      frag.appendChild(cell);
      cells.push(cell);
    }
    container.appendChild(frag);

    function fireRipple(
      intensity: number,
      each: number,
      litDuration: number,
      fadeDuration: number,
    ) {
      const color   = `rgba(90, 155, 216, ${intensity})`;
      const stagger = { each, from: "center" as const, grid: [rows, cols] as [number, number] };

      gsap.timeline()
        .to(cells, {
          borderRightColor:  color,
          borderBottomColor: color,
          duration: litDuration,
          stagger,
          ease: "power2.out",
        })
        .to(cells, {
          borderRightColor:  DIM_BORDER,
          borderBottomColor: DIM_BORDER,
          duration: fadeDuration,
          stagger,
          ease: "power2.in",
        }, `+=${litDuration * 0.3}`);
    }

    // Scope sur container : mm.revert() ne tue que les animations de cette
    // grille, pas celles des autres composants (HeroIntro, etc.)
    const mm = gsap.matchMedia(container);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let dubTimer: ReturnType<typeof setTimeout> | undefined;

      function beat() {
        // lub — onde légère, propagation lente
        fireRipple(0.30, 0.045, 0.15, 0.50);
        // dub — onde plus forte, légèrement plus rapide
        if (dubTimer !== undefined) clearTimeout(dubTimer);
        dubTimer = setTimeout(() => fireRipple(0.54, 0.028, 0.22, 0.65), DUB_OFFSET_MS);
      }

      const initTimer = setTimeout(beat, 350);
      const interval  = setInterval(beat, BEAT_MS);

      return () => {
        clearTimeout(initTimer);
        clearTimeout(dubTimer);
        clearInterval(interval);
      };
    });

    return () => {
      mm.revert();
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className={styles.grid} aria-hidden="true" />;
}
