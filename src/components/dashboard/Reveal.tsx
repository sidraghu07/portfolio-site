"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);

    const fallback = setTimeout(() => setVisible(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className={`terminal-reveal ${visible ? "is-visible" : ""}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
      <span
        aria-hidden="true"
        className={`terminal-cursor pointer-events-none absolute inset-y-0 w-[2px] bg-ink ${
          visible ? "is-visible" : ""
        }`}
        style={{ animationDelay: `${delay}ms, ${delay + 480}ms` }}
      />
    </div>
  );
}
