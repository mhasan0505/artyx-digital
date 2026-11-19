"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface StaggerRevealProps {
  children: React.ReactNode;
  itemSelector?: string;
  stagger?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}

export function StaggerReveal({
  children,
  itemSelector = ".stagger-item",
  stagger = 0.12,
  duration = 0.7,
  className = "",
  yOffset = 30,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.innerWidth < 768) return;

      const items = containerRef.current.querySelectorAll(itemSelector);
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: yOffset,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [itemSelector, stagger, duration, yOffset] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

