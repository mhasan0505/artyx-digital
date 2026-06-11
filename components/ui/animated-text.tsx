"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  once?: boolean;
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  as: Component = "h1",
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  const words = text.split(" ");

  return (
    <Component
      ref={(node: HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | null) => {
        ref.current = node as HTMLElement | null;
      }}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block overflow-hidden mr-[0.25em]"
        >
          <span className="inline-block">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: delay + wordIndex * staggerDelay + charIndex * 0.02,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </span>
      ))}
    </Component>
  );
}
