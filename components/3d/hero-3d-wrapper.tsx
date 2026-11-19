"use client";

import { useState, useEffect } from "react";

export function HeroSvgEmblem() {
  return (
    <div className="relative flex h-full w-full items-center justify-center min-h-[300px]">
      <div className="relative flex flex-col items-center">
        {/* Ambient Orbiting Ring */}
        <div
          className="absolute h-52 w-52 rounded-full border border-white/10 pointer-events-none"
          style={{ animation: "spin 20s linear infinite" }}
        />
        <img
          src="/artyx-icon.svg"
          alt="Artyx Geometric Emblem"
          width={180}
          height={180}
          className="relative z-10 h-36 w-36 object-contain opacity-90 transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
}

export function DesktopSticky3DCanvas() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const isLarge = window.innerWidth >= 1024;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isLarge || reducedMotion) return;

    const load3D = () => {
      import("./hero-canvas").then((mod) => {
        setComponent(() => mod.HeroCanvas);
      });
    };

    if ("requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(load3D);
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(load3D, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!Component) return null;

  return <Component />;
}

export function Hero3DWrapper() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const isLargeScreen = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isLargeScreen && !prefersReducedMotion) {
      setIsDesktop(true);
      const load3D = () => {
        import("./hero-canvas").then((mod) => {
          setComponent(() => mod.HeroCanvas);
        });
      };
      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(load3D);
      } else {
        setTimeout(load3D, 200);
      }
    }
  }, []);

  if (!isDesktop || !Component) {
    return <HeroSvgEmblem />;
  }

  return <Component />;
}
