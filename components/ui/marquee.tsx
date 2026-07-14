"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const firstChild = containerRef.current.firstElementChild;
      if (firstChild) {
        setContentWidth(firstChild.scrollWidth);
      }
    }
  }, [children]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          ...(pauseOnHover
            ? { "&:hover": { animationPlayState: "paused" } }
            : {}),
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover) {
            (e.currentTarget as HTMLDivElement).style.animationPlayState =
              "paused";
          }
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover) {
            (e.currentTarget as HTMLDivElement).style.animationPlayState =
              "running";
          }
        }}
      >
        <div className="flex shrink-0 gap-8 items-center">{children}</div>
        <div className="flex shrink-0 gap-8 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
