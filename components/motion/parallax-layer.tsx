"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ParallaxLayerProps {
  children?: React.ReactNode;
  speed?: number; // e.g. -0.2 (moves slower/opposite), 0.3 (moves faster)
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.2,
  className = "",
}: ParallaxLayerProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!targetRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.innerWidth < 768) return;

      const movement = speed * 150;

      gsap.fromTo(
        targetRef.current,
        { y: -movement },
        {
          y: movement,
          ease: "none",
          scrollTrigger: {
            trigger: targetRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    },
    { scope: targetRef, dependencies: [speed] }
  );

  return (
    <div ref={targetRef} className={className}>
      {children}
    </div>
  );
}

