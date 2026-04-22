"use client";

import { useEffect, useRef } from "react";

interface DynamicTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span" | "div";
}

/**
 * Pretext-enhanced dynamic text component
 * Adds subtle text animation on mount
 */
export default function DynamicText({
  children,
  className = "",
  as: Component = "div",
}: DynamicTextProps) {
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !ref.current) return;

    // Simple entrance animation
    const el = ref.current;
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";

    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    hasAnimated.current = true;
  }, []);

  return (
    <Component ref={ref as any} className={className}>
      {children}
    </Component>
  );
}

/**
 * Staggered text animation for lists
 */
export function StaggerText({
  items,
  className = "",
  staggerDelay = 50,
}: {
  items: string[];
  className?: string;
  staggerDelay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    Array.from(children).forEach((child, i) => {
      const el = child as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";

      setTimeout(() => {
        el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * staggerDelay);
    });
  }, [items, staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  );
}
