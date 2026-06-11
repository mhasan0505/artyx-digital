"use client";

import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export function Counter({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min(
          (currentTime - startTime) / (duration * 1000),
          1,
        );
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setCount(eased * end);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, controls]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
