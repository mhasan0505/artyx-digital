"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  wordClassName?: string;
  highlightWord?: string;
  highlightClassName?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
}

export function SplitText({
  text,
  as: Component = "h2",
  className,
  wordClassName,
  highlightWord,
  highlightClassName = "highlight-word",
  stagger = 0.035,
  duration = 0.75,
  delay = 0,
}: SplitTextProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLDivElement | HTMLElement | null>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.innerWidth < 768) return;

      const wordNodes = containerRef.current.querySelectorAll(".split-word");
      if (wordNodes.length === 0) return;

      gsap.fromTo(
        wordNodes,
        {
          y: "115%",
          opacity: 0,
          rotateX: 20,
        },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [text, stagger, duration, delay] }
  );

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={containerRef as any}
      className={cn("split-text-container", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-top"
          aria-hidden="true"
        >
          <span
            className={cn(
              "split-word inline-block will-change-transform",
              wordClassName,
              highlightWord &&
                word.toLowerCase().includes(highlightWord.toLowerCase()) &&
                highlightClassName
            )}
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Component>
  );
}
