"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./GlobalGridSpotlight.module.css";

/**
 * Spotlight curseur globale — n'est actif QUE sous le hero.
 * Le hero (id="hero") a sa propre animation ambient (HeroAmbientGrid).
 *
 * - Un mask CSS cache la partie de la grille au-dessus de hero.bottom
 * - Les mousemove au-dessus de hero.bottom sont ignores (les cellules
 *   allumees dans la zone hero seraient de toute façon invisibles,
 *   mais on evite le travail inutile)
 *
 * Le hero.bottom est recalcule au scroll et au resize.
 *
 * Desactive < 780px et sous prefers-reduced-motion.
 */

const CELL_SIZE = 48;
const RADIUS = 140;
const MAX_ALPHA = 0.85;

export function GlobalGridSpotlight() {
  const [dims, setDims] = useState<{ cols: number; rows: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<Array<HTMLDivElement | null>>([]);
  const litRef = useRef<Set<HTMLDivElement>>(new Set());
  const heroBottomRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    if (window.innerWidth < 780) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function measure() {
      const cols = Math.ceil(window.innerWidth / CELL_SIZE) + 1;
      const rows = Math.ceil(window.innerHeight / CELL_SIZE) + 1;
      setDims({ cols, rows });
    }

    function updateHeroOffset() {
      const heroEl = document.getElementById("hero");
      if (!heroEl) {
        heroBottomRef.current = 0;
        return;
      }
      const rect = heroEl.getBoundingClientRect();
      heroBottomRef.current = Math.max(0, rect.bottom);
      if (gridRef.current) {
        gridRef.current.style.setProperty(
          "--spotlight-start",
          `${heroBottomRef.current}px`
        );
      }
    }

    measure();
    updateHeroOffset();
    window.addEventListener("resize", measure);
    window.addEventListener("resize", updateHeroOffset);
    window.addEventListener("scroll", updateHeroOffset, { passive: true });

    let raf: number | null = null;

    function clearLit() {
      for (const cell of litRef.current) {
        cell.style.borderRightColor = "";
        cell.style.borderBottomColor = "";
      }
      litRef.current = new Set();
    }

    function update(mx: number, my: number) {
      // Curseur dans la zone hero → on éteint tout et on sort
      if (my < heroBottomRef.current) {
        if (litRef.current.size > 0) clearLit();
        return;
      }

      const cols = Math.ceil(window.innerWidth / CELL_SIZE) + 1;
      const rows = Math.ceil(window.innerHeight / CELL_SIZE) + 1;

      const startCol = Math.max(0, Math.floor((mx - RADIUS) / CELL_SIZE));
      const endCol = Math.min(cols - 1, Math.ceil((mx + RADIUS) / CELL_SIZE));
      const startRow = Math.max(0, Math.floor((my - RADIUS) / CELL_SIZE));
      const endRow = Math.min(rows - 1, Math.ceil((my + RADIUS) / CELL_SIZE));

      const newLit = new Set<HTMLDivElement>();

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const idx = row * cols + col;
          const cell = cellsRef.current[idx];
          if (!cell) continue;

          const cx = col * CELL_SIZE + CELL_SIZE / 2;
          const cy = row * CELL_SIZE + CELL_SIZE / 2;
          const dist = Math.hypot(mx - cx, my - cy);

          if (dist < RADIUS) {
            const intensity = 1 - dist / RADIUS;
            const color = `rgba(90, 155, 216, ${intensity * MAX_ALPHA})`;
            cell.style.borderRightColor = color;
            cell.style.borderBottomColor = color;
            newLit.add(cell);
          }
        }
      }

      for (const cell of litRef.current) {
        if (!newLit.has(cell)) {
          cell.style.borderRightColor = "";
          cell.style.borderBottomColor = "";
        }
      }
      litRef.current = newLit;
    }

    function onMove(e: MouseEvent) {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        update(e.clientX, e.clientY);
        raf = null;
      });
    }

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("resize", updateHeroOffset);
      window.removeEventListener("scroll", updateHeroOffset);
      window.removeEventListener("mousemove", onMove);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  // Recalcule le masque à chaque changement de route (navigation client-side).
  // Sans ça, --spotlight-start reste calqué sur le hero de la home page
  // et masque toute la grille sur les autres pages.
  useEffect(() => {
    const heroEl = document.getElementById("hero");
    const start = heroEl ? Math.max(0, heroEl.getBoundingClientRect().bottom) : 0;
    heroBottomRef.current = start;
    if (gridRef.current) {
      gridRef.current.style.setProperty("--spotlight-start", `${start}px`);
    }
  }, [pathname]);

  if (!dims) return null;

  const total = dims.cols * dims.rows;

  return (
    <div
      ref={gridRef}
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${dims.cols}, ${CELL_SIZE}px)`,
        gridAutoRows: `${CELL_SIZE}px`,
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            cellsRef.current[i] = el;
          }}
          className={styles.cell}
        />
      ))}
    </div>
  );
}
