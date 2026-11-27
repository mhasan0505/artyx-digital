"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TICKER_ITEMS = [
  "BRANDING",
  "DIGITAL MARKETING",
  "WEB DEVELOPMENT",
  "POS & OMS SOFTWARE",
  "SEO",
  "VIDEO PRODUCTION",
  "SOCIAL MEDIA",
  "STRATEGY",
];

interface HeroStat {
  target: number;
  suffix: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { target: 6, suffix: "+", label: "Documented Case Studies" },
  { target: 2, suffix: "", label: "Owned SaaS Products (POS & OMS)" },
  { target: 360, suffix: "°", label: "Creative & Engineering Scope" },
  { target: 24, suffix: "h", label: "Dhaka Response SLA" },
];

function AnimatedCounter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }

    const duration = 1200;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export function AgencyHero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tickerText = TICKER_ITEMS.join(" · ") + " · ";

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#05091A] pt-20"
    >
      {/* Subtle Bottom-Left Royal Blue & Bottom-Right Cyan Radial Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 48% at 12% 88%, rgba(26, 86, 219, 0.25), transparent 70%), radial-gradient(ellipse 46% 42% at 88% 85%, rgba(0, 194, 255, 0.15), transparent 70%)",
        }}
      />

      {/* Animated Text Ticker Strip at Very Top of Hero */}
      <div
        aria-label="Capabilities ticker"
        className="relative z-10 w-full overflow-hidden border-y border-[#1E2D5A] bg-[#0D1333] py-2.5"
      >
        <div className="animate-ticker select-none whitespace-nowrap">
          {[0, 1, 2, 3].map((copy) => (
            <span
              key={copy}
              aria-hidden={copy > 0}
              className="font-display pr-6 text-xs font-semibold tracking-[0.2em] text-[#00C2FF] sm:text-[13px]"
              style={{ fontVariant: "small-caps" }}
            >
              {tickerText}
            </span>
          ))}
        </div>
      </div>

      {/* Main Centered Hero Statement */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-6 lg:px-8 lg:py-12">
        <h1
          className="font-display max-w-[1120px] font-extrabold tracking-[-0.03em] text-white"
          style={{
            fontSize: "clamp(36px, 5.2vw, 76px)",
            lineHeight: 1.06,
          }}
        >
          We Build <span className="cyan-hand-underline">Brands</span>
          <br />
          That Mean Business
        </h1>

        <p className="mt-6 max-w-[560px] text-base leading-relaxed text-[#8A9BC4] sm:text-[18px]">
          Artyx Digital is a 360° creative and software agency in Dhaka —
          turning ideas into digital experiences, websites, and business
          software that grow your business.
        </p>

        {/* Side-by-Side CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#work"
            className="btn-primary inline-flex min-w-[168px] items-center justify-center px-7 py-3.5 text-sm sm:text-[15px]"
          >
            See Our Work
          </Link>
          <Link
            href="/#contact"
            className="btn-secondary inline-flex min-w-[168px] items-center justify-center px-7 py-3.5 text-sm sm:text-[15px]"
          >
            Talk to Us
          </Link>
        </div>
      </div>

      {/* Scroll-Triggered Animated Stat Row at Bottom of Hero */}
      <div
        ref={statsRef}
        className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-12 sm:px-6 lg:px-8 lg:pb-14"
      >
        <div className="grid grid-cols-2 rounded-[16px] border border-[#1E2D5A] bg-[#0D1333]/55 backdrop-blur-md md:grid-cols-4">
          {HERO_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center px-4 py-5 text-center sm:px-6 sm:py-6 ${
                idx % 2 === 0 ? "border-r border-[#1E2D5A]" : ""
              } ${idx < 2 ? "border-b border-[#1E2D5A] md:border-b-0" : ""} ${
                idx < 3 ? "md:border-r md:border-[#1E2D5A]" : "md:border-r-0"
              }`}
            >
              <div className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  active={statsVisible}
                />
              </div>
              <div className="mt-1 text-xs font-medium text-[#8A9BC4] sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
