"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Strictly disable on touch devices, coarse pointers, no hover, and reduced motion
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFine || !hasHover || isTouch || prefersReduced) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let rafId: number;
    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(updateRing);
    };
    rafId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-9999 overflow-hidden hidden lg:block print:hidden">
      {/* Precision Lime Center Dot */}
      <div
        ref={dotRef}
        style={{
          opacity: isVisible ? 1 : 0,
          left: -4,
          top: -4,
        }}
        className="fixed h-2 w-2 rounded-full bg-accent-text transition-opacity duration-200"
      />
      {/* Smooth Trailing Spring Ring */}
      <div
        ref={ringRef}
        style={{
          opacity: isVisible ? 1 : 0,
          left: isHovered ? -24 : -16,
          top: isHovered ? -24 : -16,
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
        }}
        className={`fixed rounded-full border transition-[width,height,left,top,opacity,background-color] duration-200 ${
          isHovered
            ? "border-accent-text bg-surface-2/40"
            : "border-border"
        }`}
      />
    </div>
  );
}
