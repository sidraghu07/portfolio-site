"use client";

import { useEffect, useRef, useState } from "react";
import { Pipette } from "lucide-react";

const CELL = 48;
const MAX_PAINTED = 300;
const PALETTE = ["#10EDF5", "#F2720C", "#F5BF0F", "#FC0C04", "#A39C8E"];

function hashCell(cx: number, cy: number) {
  const n = Math.abs((cx * 73856093) ^ (cy * 19349663));
  return PALETTE[n % PALETTE.length];
}

function hexToRgba(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type Painted = { key: string; cx: number; cy: number; color: string };
type Cell = { cx: number; cy: number };

export function SiteBackground() {
  const highlightRef = useRef<HTMLDivElement>(null);
  const [painted, setPainted] = useState<Painted[]>([]);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState("#8A3FFC");
  const [expanded, setExpanded] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [snakeTrail, setSnakeTrail] = useState<Cell[]>([]);
  const [snakeStep, setSnakeStep] = useState(16);
  const activeColorRef = useRef<string | null>(null);
  const clearingRef = useRef(false);
  const snakeTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    activeColorRef.current = activeColor;
  }, [activeColor]);

  useEffect(() => {
    return () => {
      if (snakeTimeoutRef.current) window.clearTimeout(snakeTimeoutRef.current);
    };
  }, []);

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    if (clearingRef.current || painted.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setPainted([]);
      return;
    }

    const cxs = painted.map((p) => p.cx);
    const cys = painted.map((p) => p.cy);
    const minCx = Math.min(...cxs);
    const maxCx = Math.max(...cxs);
    const minCy = Math.min(...cys);
    const maxCy = Math.max(...cys);

    const path: Cell[] = [];
    for (let cy = minCy; cy <= maxCy; cy++) {
      const leftToRight = (cy - minCy) % 2 === 0;
      if (leftToRight) {
        for (let cx = minCx; cx <= maxCx; cx++) path.push({ cx, cy });
      } else {
        for (let cx = maxCx; cx >= minCx; cx--) path.push({ cx, cy });
      }
    }

    clearingRef.current = true;
    setClearing(true);
    const targetDuration = Math.min(2200, Math.max(500, path.length * 14));
    const stepMs = Math.max(4, targetDuration / path.length);
    setSnakeStep(stepMs);

    let i = 0;
    const tick = () => {
      if (i >= path.length) {
        clearingRef.current = false;
        setClearing(false);
        setSnakeTrail([]);
        setPainted([]);
        return;
      }
      const cell = path[i];
      const key = `${cell.cx},${cell.cy}`;
      setSnakeTrail((prev) => [cell, ...prev].slice(0, 5));
      setPainted((prev) => {
        const idx = prev.findIndex((p) => p.key === key);
        return idx === -1 ? prev : prev.filter((p) => p.key !== key);
      });
      i++;
      snakeTimeoutRef.current = window.setTimeout(tick, stepMs);
    };
    tick();
  }

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;

    function onMove(e: MouseEvent) {
      if (!canHover || prefersReducedMotion) return;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = highlightRef.current;
        if (!el) return;
        const cx = Math.floor(e.clientX / CELL);
        const cy = Math.floor(e.clientY / CELL);
        const color = activeColorRef.current ?? hashCell(cx, cy);
        el.style.transform = `translate(${cx * CELL}px, ${cy * CELL}px)`;
        el.style.background = hexToRgba(color, 0.14);
        el.style.borderColor = color;
        el.style.opacity = "1";
      });
    }

    function onLeave() {
      const el = highlightRef.current;
      if (el) el.style.opacity = "0";
    }

    function onClick(e: MouseEvent) {
      const cx = Math.floor(e.clientX / CELL);
      const cy = Math.floor(e.clientY / CELL);
      const key = `${cx},${cy}`;
      const color = activeColorRef.current ?? hashCell(cx, cy);

      setPainted((prev) => {
        const next = [...prev.filter((p) => p.key !== key), { key, cx, cy, color }];
        return next.length > MAX_PAINTED ? next.slice(next.length - MAX_PAINTED) : next;
      });
    }

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(23,20,15,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(23,20,15,0.055) 1px, transparent 1px)",
            backgroundSize: `${CELL}px ${CELL}px`,
          }}
        />

        {painted.map((p) => (
          <div
            key={p.key}
            className="animate-block-pop absolute left-0 top-0"
            style={
              {
                width: CELL,
                height: CELL,
                background: hexToRgba(p.color, 0.32),
                borderWidth: 1.5,
                borderStyle: "solid",
                borderColor: p.color,
                "--tx": `${p.cx * CELL}px`,
                "--ty": `${p.cy * CELL}px`,
              } as React.CSSProperties
            }
          />
        ))}

        {snakeTrail.map((seg, i) => (
          <div
            key={`snake-${i}`}
            aria-hidden="true"
            className="absolute left-0 top-0 transition-transform ease-linear"
            style={{
              width: CELL,
              height: CELL,
              transform: `translate(${seg.cx * CELL}px, ${seg.cy * CELL}px)`,
              transitionDuration: `${snakeStep}ms`,
              background: i === 0 ? "var(--ink)" : hexToRgba("#17140F", Math.max(0.1, 0.5 - i * 0.1)),
              zIndex: 5 - i,
            }}
          >
            {i === 0 && (
              <>
                <span
                  className="absolute h-1 w-1 rounded-full bg-paper"
                  style={{ top: 10, left: 10 }}
                />
                <span
                  className="absolute h-1 w-1 rounded-full bg-paper"
                  style={{ top: 10, right: 10 }}
                />
              </>
            )}
          </div>
        ))}

        <div
          ref={highlightRef}
          aria-hidden="true"
          className="absolute left-0 top-0 opacity-0 transition-opacity duration-150 ease-out"
          style={{
            width: CELL,
            height: CELL,
            borderWidth: 1.5,
            borderStyle: "solid",
            transitionProperty: "opacity, transform",
            transitionDuration: "150ms, 90ms",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper/60" />
      </div>

      <div
        role="toolbar"
        aria-label="Background paint color"
        className="pointer-events-auto fixed bottom-4 right-4 z-40 border border-line bg-card font-mono text-[10px] uppercase tracking-wide text-muted sm:bottom-6 sm:right-6"
      >
        {expanded ? (
          <div className="px-3 py-2.5">
            <div className="mb-2 flex items-center justify-between gap-6">
              <span>paint</span>
              <button
                type="button"
                aria-label="Close paint tool"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
                className="text-ink/50 transition-colors hover:text-ink"
              >
                [ x ]
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Random color per block"
                aria-pressed={activeColor === null}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveColor(null);
                }}
                className={`h-5 w-5 shrink-0 border transition-shadow ${
                  activeColor === null
                    ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-card"
                    : "border-line"
                }`}
                style={{
                  background:
                    "conic-gradient(from 0deg, #10EDF5, #F2720C, #F5BF0F, #FC0C04, #A39C8E, #10EDF5)",
                }}
              />
              {PALETTE.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Paint with ${color}`}
                  aria-pressed={activeColor === color}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColor(color);
                  }}
                  className={`h-5 w-5 shrink-0 border transition-shadow ${
                    activeColor === color
                      ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-card"
                      : "border-line"
                  }`}
                  style={{ background: color }}
                />
              ))}
              <label
                aria-label="Pick a custom paint color"
                className={`relative h-5 w-5 shrink-0 cursor-pointer overflow-hidden border transition-shadow ${
                  activeColor === customColor
                    ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-card"
                    : "border-line"
                }`}
                style={{ background: customColor }}
              >
                <input
                  type="color"
                  value={customColor}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    setActiveColor(e.target.value);
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <Pipette
                  size={11}
                  strokeWidth={2}
                  className="pointer-events-none absolute inset-0 m-auto text-white mix-blend-difference"
                />
              </label>
              <button
                type="button"
                onClick={handleClear}
                disabled={clearing || painted.length === 0}
                className="ml-1 shrink-0 border border-line px-1.5 py-1 text-ink/60 transition-colors hover:border-ink hover:text-ink disabled:pointer-events-none disabled:opacity-40"
              >
                {clearing ? "clearing" : "clear"}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            aria-label="Open paint tool"
            aria-expanded={false}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(true);
            }}
            className="px-3 py-2 transition-colors hover:text-ink"
          >
            [ paint ]
          </button>
        )}
      </div>
    </>
  );
}
