"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { COMPANY_ENTITY } from "@/lib/content/company";
import { trackAnalyticsEvent } from "@/lib/analytics/events";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scroll3DState } from "@/lib/motion/scroll-3d-state";
import { Hero3DWrapper } from "@/components/3d/hero-3d-wrapper";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const glowOrb1 = useRef<HTMLDivElement>(null);
  const glowOrb2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.innerWidth < 768) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -18,
        duration: 0.6,
      })
        .from(
          headlineRef.current,
          {
            y: 24,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          textRef.current,
          {
            y: 18,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ctaGroupRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".hero-pillar-anchor",
          {
            opacity: 0,
            y: 15,
            stagger: 0.1,
            duration: 0.5,
          },
          "-=0.2"
        );

      // Desktop only: GSAP Parallax background scrub
      if (glowOrb1.current && glowOrb2.current) {
        gsap.to(glowOrb1.current, {
          y: 110,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        gsap.to(glowOrb2.current, {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Synchronize 3D Emblem rotation with scroll through Hero
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scroll3DState.heroScrollProgress = self.progress;
          if (self.isActive) scroll3DState.activeStage = "hero";
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-transparent pt-28 pb-16 text-text lg:pt-36 lg:pb-24"
    >
      {/* Architectural Ambient Parallax Lighting: Dark Theme only (Rule 6: Removed in light theme) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden dark:block hidden">
        <div
          ref={glowOrb1}
          className="absolute -top-36 left-1/4 h-[520px] w-[750px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[var(--surface-2)]/50 via-[var(--surface)]/70 to-transparent blur-[120px]"
        />
        <div
          ref={glowOrb2}
          className="absolute top-1/3 right-0 h-[460px] w-[580px] rounded-full bg-gradient-to-bl from-[var(--surface-2)]/30 via-[var(--bg)] to-transparent blur-[110px]"
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Positioning, Tagline & CTAs */}
          <div className="lg:col-span-7">
            {/* Rule 4: Eyebrow pill in var(--surface), 1px var(--border), var(--text) with small var(--accent-text) dot */}
            <div className="hero-badge mobile-fade-up-1 mb-5 eyebrow-pill">
              <span className="pill-dot" />
              <span>Digital Agency &amp; Owned Business Software — Bangladesh &amp; Global</span>
            </div>

            <h1
              ref={headlineRef}
              className="font-display text-4xl font-black tracking-tight text-text sm:text-6xl lg:text-7xl lg:leading-[1.14]"
            >
              <span className="block font-wordmark tracking-normal uppercase">
                Build. Launch. <span className="highlight-word">Grow</span>.
              </span>
            </h1>

            <p
              ref={textRef}
              className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-xl"
            >
              From high-performing websites and custom software to business management systems and digital growth, we bring the technology and expertise businesses need to move forward.
            </p>

            {/* Primary & Secondary CTAs with Magnetic Effect */}
            <div
              ref={ctaGroupRef}
              className="mobile-fade-up-4 mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              {/* Rule 3: Primary Button = var(--btn-primary-bg)/var(--btn-primary-fg) */}
              <MagneticButton>
                <Link
                  href="/start-a-project/"
                  prefetch={false}
                  onClick={() =>
                    trackAnalyticsEvent("cta_click", {
                      cta_name: "Start a Project",
                      cta_location: "hero_primary",
                    })
                  }
                  className="btn-primary inline-flex items-center gap-2.5 px-7 py-4 text-base"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MagneticButton>

              {/* Rule 3: Secondary button = var(--surface) with 1px var(--border) and var(--text) */}
              <MagneticButton>
                <Link
                  href="/work/"
                  prefetch={false}
                  onClick={() =>
                    trackAnalyticsEvent("cta_click", {
                      cta_name: "Explore Our Work",
                      cta_location: "hero_secondary",
                    })
                  }
                  className="btn-secondary inline-flex items-center gap-2.5 px-6 py-4 text-base"
                >
                  Explore Our Work
                </Link>
              </MagneticButton>

              {/* Rule 3: Link in var(--text) with underline offset; arrow in var(--accent-text) */}
              <Link
                href="/products/"
                prefetch={false}
                onClick={() =>
                  trackAnalyticsEvent("cta_click", {
                    cta_name: "Explore Our Products",
                    cta_location: "hero_tertiary",
                  })
                }
                className="theme-link inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold underline underline-offset-4"
              >
                Explore POS &amp; OMS Products <span className="arrow-icon">→</span>
              </Link>
            </div>

            {/* Three Pillar Quick Anchors */}
            <div className="hidden md:grid mt-10 grid-cols-1 gap-3 border-t border-border pt-7 sm:grid-cols-3">
              <div className="hero-pillar-anchor flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                <div>
                  <div className="text-xs font-semibold text-text">
                    Digital Experiences
                  </div>
                  <div className="text-xs text-text-muted">
                    Websites, E-commerce &amp; Branding
                  </div>
                </div>
              </div>
              <div className="hero-pillar-anchor flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                <div>
                  <div className="text-xs font-semibold text-text">
                    Business Technology
                  </div>
                  <div className="text-xs text-text-muted">
                    POS, OMS &amp; Custom Software
                  </div>
                </div>
              </div>
              <div className="hero-pillar-anchor flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                <div>
                  <div className="text-xs font-semibold text-text">
                    Digital Growth
                  </div>
                  <div className="text-xs text-text-muted">
                    Performance Marketing &amp; SEO
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Emblem inside rounded-3xl badge panel mirroring the logo */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Gentle contact shadow on the page beneath the badge panel */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-black/40 blur-2xl rounded-full"
            />

            {/* Rounded-3xl Badge Panel Mirroring Logo: #333333 (light), #1A2218 with 1px #333333 border (dark) */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 bg-[#333333] dark:bg-[#1A2218] dark:border dark:border-[#333333]">
              {/* Subtle inner grid at ~6% opacity */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* 3D WebGL Emblem / SVG Fallback */}
              <div className="relative h-full w-full">
                <Hero3DWrapper />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
