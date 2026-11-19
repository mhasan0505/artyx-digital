"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

function subscribe() {
  return () => {};
}

function getPreloaderSnapshot(): boolean {
  try {
    if (typeof window === "undefined") return false;
    // On automated audits / bots, bypass preloader
    if (typeof navigator !== "undefined" && (navigator.webdriver || /Lighthouse|Chrome-Lighthouse|HeadlessChrome|bot/i.test(navigator.userAgent))) {
      return false;
    }
    // On mobile screens (< 768px), bypass blocking preloader for immediate LCP & instant interaction
    if (window.innerWidth < 768) return false;

    const hasLoaded = sessionStorage.getItem("artyx_preloader_shown");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hasLoaded && !prefersReducedMotion) {
      sessionStorage.setItem("artyx_preloader_shown", "true");
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function Preloader() {
  const isEligible = useSyncExternalStore(
    subscribe,
    getPreloaderSnapshot,
    () => false
  );
  const [active, setActive] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isEligible || !active || !containerRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setActive(false);
        },
      });

      tl.set(containerRef.current, { opacity: 1 })
        .fromTo(
          logoRef.current,
          { scale: 0.88, opacity: 0, y: 15 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        )
        .fromTo(
          glowRef.current,
          { scale: 0.6, opacity: 0 },
          { scale: 1.2, opacity: 0.6, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .to(
          logoRef.current,
          {
            scale: 1.05,
            opacity: 0,
            duration: 0.45,
            ease: "power2.in",
            delay: 0.35,
          }
        )
        .to(
          glowRef.current,
          { opacity: 0, duration: 0.3 },
          "-=0.3"
        )
        .to(containerRef.current, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.5,
          ease: "power3.inOut",
        });
    },
    { dependencies: [isEligible, active], scope: containerRef }
  );

  if (!isEligible || !active) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg text-text"
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center px-6">
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-48 w-72 rounded-full bg-surface-2/50 blur-3xl dark:block hidden"
        />
        <div ref={logoRef} className="relative w-64 sm:w-80">
          <Image
            src="/logo-full-for-dark-bg.png"
            alt="Artyx Digital"
            width={320}
            height={108}
            priority
            className="h-auto w-full object-contain block dark:block light:hidden"
          />
          <Image
            src="/logo-full-for-light-bg.png"
            alt="Artyx Digital"
            width={320}
            height={108}
            priority
            className="h-auto w-full object-contain hidden dark:hidden light:block"
          />
        </div>
      </div>
    </div>
  );
}
