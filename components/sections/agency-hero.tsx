"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TICKER_ITEMS = [
  "BRANDING",
  "DIGITAL MARKETING",
  "WEB DEVELOPMENT",
  "SEO",
  "VIDEO PRODUCTION",
  "SOCIAL MEDIA",
  "POS & OMS SOFTWARE",
  "STRATEGY",
];

interface HeroStat {
  target: number;
  suffix: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { target: 50, suffix: "+", label: "Clients" },
  { target: 120, suffix: "+", label: "Projects Delivered" },
  { target: 5, suffix: "", label: "Years in Business" },
  { target: 3, suffix: "", label: "Owned Products" },
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      const raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }

    const duration = 1100;
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
  }, [target]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export function AgencyHero() {
  const tickerText = TICKER_ITEMS.join(" · ") + " · ";

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-between overflow-hidden bg-[#FFFFFF] pt-20"
    >
      {/* Main Hero Content: Left 55% Copy, Right 45% Abstract Geometric Visual */}
      <div className="mx-auto w-full max-w-[1200px] px-5 pt-14 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left 55% — Left-Aligned Headline, Subtext & CTAs */}
          <div className="lg:col-span-7">
            <h1
              className="font-display font-extrabold tracking-[-0.03em] text-[#0D1333]"
              style={{
                fontSize: "clamp(42px, 5.4vw, 78px)",
                lineHeight: 1.06,
              }}
            >
              We Build Digital
              <br />
              Brands That <span className="hero-grow-underline">Grow</span>
            </h1>

            <p className="mt-6 max-w-[500px] text-base leading-relaxed text-[#3D4A6B] sm:text-[18px]">
              360° creative and software agency in Dhaka — websites, brands and
              marketing that actually move the needle.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                href="/#work"
                className="btn-primary inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-[15px]"
              >
                See Our Work
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A56DB] underline-offset-4 transition-colors hover:text-[#1240B0] hover:underline sm:text-[15px]"
              >
                <span>Talk to Us</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Right 45% — Subtle Overlapping Geometric Circles & Arcs SVG */}
          <div
            aria-hidden="true"
            className="relative flex items-center justify-center lg:col-span-5 lg:justify-end"
          >
            <svg
              viewBox="0 0 460 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[440px] h-auto select-none"
            >
              {/* Soft outer geometric orbit */}
              <circle
                cx="245"
                cy="195"
                r="165"
                stroke="#1A56DB"
                strokeOpacity="0.18"
                strokeWidth="1.5"
              />
              {/* Main overlapping royal blue filled circle */}
              <circle
                cx="205"
                cy="185"
                r="128"
                fill="#1A56DB"
                fillOpacity="0.11"
                stroke="#1A56DB"
                strokeOpacity="0.38"
                strokeWidth="2"
              />
              {/* Overlapping cyan circle */}
              <circle
                cx="298"
                cy="215"
                r="108"
                fill="#00C2FF"
                fillOpacity="0.14"
                stroke="#00C2FF"
                strokeOpacity="0.42"
                strokeWidth="2"
              />
              {/* Precision intersecting upper arc */}
              <path
                d="M112 128 A150 150 0 0 1 368 112"
                stroke="#1A56DB"
                strokeOpacity="0.4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Lower counter-arc in cyan */}
              <path
                d="M168 338 A140 140 0 0 0 388 265"
                stroke="#00C2FF"
                strokeOpacity="0.42"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Architectural inner circle */}
              <circle
                cx="252"
                cy="198"
                r="58"
                fill="#FFFFFF"
                fillOpacity="0.72"
                stroke="#1A56DB"
                strokeOpacity="0.36"
                strokeWidth="2"
              />
              {/* Small solid geometric anchor nodes */}
              <circle cx="112" cy="128" r="5.5" fill="#1A56DB" fillOpacity="0.42" />
              <circle cx="368" cy="112" r="5.5" fill="#00C2FF" fillOpacity="0.5" />
              <circle cx="252" cy="198" r="7" fill="#1A56DB" fillOpacity="0.45" />
              <circle cx="388" cy="265" r="5" fill="#00C2FF" fillOpacity="0.45" />
            </svg>
          </div>
        </div>
      </div>

      {/* Capability Ticker Strip — Below Hero CTAs, Above Stats Row */}
      <div
        aria-label="Agency capabilities ticker"
        className="w-full overflow-hidden border-y border-[#DDE3F5] bg-[#F5F7FF] py-3"
      >
        <div className="animate-ticker select-none whitespace-nowrap">
          {[0, 1, 2, 3].map((copy) => (
            <span
              key={copy}
              aria-hidden={copy > 0}
              className="font-display pr-6 text-xs font-semibold tracking-[0.18em] text-[#1A56DB] sm:text-[13px]"
            >
              {tickerText}
            </span>
          ))}
        </div>
      </div>

      {/* Full-Width White Stats Row at Bottom of Hero */}
      <div className="w-full border-b border-[#DDE3F5] bg-[#FFFFFF]">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {HERO_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-start justify-center px-4 py-7 sm:px-6 md:items-center md:text-center ${
                  idx % 2 === 0 ? "border-r border-[#DDE3F5]" : ""
                } ${idx < 2 ? "border-b border-[#DDE3F5] md:border-b-0" : ""} ${
                  idx < 3 ? "md:border-r md:border-[#DDE3F5]" : "md:border-r-0"
                }`}
              >
                <div className="font-display text-[32px] leading-none font-bold text-[#1A56DB]">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm font-normal text-[#3D4A6B]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
