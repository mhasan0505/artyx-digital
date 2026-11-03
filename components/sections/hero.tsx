"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Monitor,
  ShoppingCart,
  TrendingUp,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { COMPANY_ENTITY } from "@/lib/content/company";
import { trackAnalyticsEvent } from "@/lib/analytics/events";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { HeroCanvas } from "@/components/3d/hero-canvas";

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

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -20,
        duration: 0.6,
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 35,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          textRef.current,
          {
            opacity: 0,
            y: 25,
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

      // GSAP Parallax background scrub
      if (glowOrb1.current && glowOrb2.current) {
        gsap.to(glowOrb1.current, {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        gsap.to(glowOrb2.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#070B18] pt-28 pb-20 text-[#F8FAFC] lg:pt-36 lg:pb-28"
    >
      {/* GSAP-Scrubbed Architectural Parallax Background Orbs & Cyber Grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={glowOrb1}
          className="absolute -top-40 left-1/4 h-[550px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#00E5FF]/18 via-[#8B5CF6]/15 to-transparent blur-[120px]"
        />
        <div
          ref={glowOrb2}
          className="absolute top-1/3 right-0 h-[480px] w-[600px] rounded-full bg-gradient-to-bl from-[#10B981]/15 via-[#6366F1]/10 to-transparent blur-[110px]"
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #94A3B8 1px, transparent 1px), linear-gradient(to bottom, #94A3B8 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Positioning, H1 & Primary CTAs */}
          <div className="lg:col-span-7">
            <div className="hero-badge mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-[#0F172A]/90 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              <span>Digital Agency &amp; Owned Business Software — Bangladesh &amp; Global</span>
            </div>

            <h1
              ref={headlineRef}
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                {COMPANY_ENTITY.tagline}
              </span>
            </h1>

            <p
              ref={textRef}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-[#CBD5E1] sm:text-xl"
            >
              We help ambitious businesses build powerful websites, simplify operations
              with custom technology, and grow through digital marketing.
            </p>

            {/* Primary & Secondary CTAs with Magnetic Effect */}
            <div
              ref={ctaGroupRef}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Link
                  href="/start-a-project/"
                  onClick={() =>
                    trackAnalyticsEvent("cta_click", {
                      cta_name: "Start a Project",
                      cta_location: "hero_primary",
                    })
                  }
                  className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0078D7] to-[#0099FF] px-7 py-4 text-base font-semibold text-white shadow-xl shadow-[#0078D7]/30 transition hover:shadow-cyan-500/25 hover:brightness-110"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/work/"
                  onClick={() =>
                    trackAnalyticsEvent("cta_click", {
                      cta_name: "Explore Our Work",
                      cta_location: "hero_secondary",
                    })
                  }
                  className="inline-flex items-center gap-2.5 rounded-xl border border-slate-700 bg-[#0F172A]/80 px-6 py-4 text-base font-semibold text-slate-100 backdrop-blur-sm transition hover:border-cyan-400/60 hover:bg-[#1E293B]"
                >
                  Explore Our Work
                </Link>
              </MagneticButton>

              <Link
                href="/products/"
                onClick={() =>
                  trackAnalyticsEvent("cta_click", {
                    cta_name: "Explore Our Products",
                    cta_location: "hero_tertiary",
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                Explore POS &amp; OMS Products →
              </Link>
            </div>

            {/* Three Pillar Quick Anchors */}
            <div className="mt-10 grid grid-cols-1 gap-3 border-t border-slate-800/80 pt-7 sm:grid-cols-3">
              <div className="hero-pillar-anchor flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00E5FF]" />
                <div>
                  <div className="text-xs font-semibold text-white">
                    Digital Experiences
                  </div>
                  <div className="text-xs text-slate-400">
                    Websites, E-commerce &amp; Branding
                  </div>
                </div>
              </div>
              <div className="hero-pillar-anchor flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A855F7]" />
                <div>
                  <div className="text-xs font-semibold text-white">
                    Business Technology
                  </div>
                  <div className="text-xs text-slate-400">
                    POS, OMS, Custom Software &amp; SaaS
                  </div>
                </div>
              </div>
              <div className="hero-pillar-anchor flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                <div>
                  <div className="text-xs font-semibold text-white">
                    Digital Growth
                  </div>
                  <div className="text-xs text-slate-400">
                    Technical SEO, AEO &amp; Performance
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Digital Nexus Visualizer */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-slate-800 bg-[#0A1022]/90 p-3 shadow-2xl backdrop-blur-xl">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-800/90 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-medium text-slate-300">
                    Artyx Connected 3D Nexus
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-[#060A16] px-2 py-0.5 text-[10px] font-medium text-cyan-300">
                  <Sparkles className="h-3 w-3" />
                  <span>Interactive WebGL</span>
                </div>
              </div>

              {/* 3D WebGL Canvas Viewport */}
              <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#060A16] to-[#0D152B] sm:h-[380px]">
                <HeroCanvas />

                {/* Subtitle / Interaction Guide */}
                <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-slate-800/80 bg-[#0B1020]/80 px-3 py-1.5 text-[10px] text-slate-400 backdrop-blur-md">
                  <span>Hover / tilt cursor to inspect</span>
                  <span className="font-semibold text-cyan-400">3-Pillar Nexus</span>
                </div>
              </div>

              {/* Three Pillar Live Status Cards underneath */}
              <div className="mt-3 grid grid-cols-3 gap-2 px-1 text-center">
                <div className="rounded-xl border border-cyan-500/20 bg-[#080E1E] p-2">
                  <Monitor className="mx-auto h-3.5 w-3.5 text-cyan-400" />
                  <div className="mt-1 text-[10px] font-semibold text-white">Experiences</div>
                  <div className="text-[9px] text-slate-400">Next.js 16</div>
                </div>
                <div className="rounded-xl border border-purple-500/20 bg-[#080E1E] p-2">
                  <ShoppingCart className="mx-auto h-3.5 w-3.5 text-purple-400" />
                  <div className="mt-1 text-[10px] font-semibold text-white">POS &amp; OMS</div>
                  <div className="text-[9px] text-slate-400">Real-Time</div>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-[#080E1E] p-2">
                  <TrendingUp className="mx-auto h-3.5 w-3.5 text-emerald-400" />
                  <div className="mt-1 text-[10px] font-semibold text-white">AEO &amp; Growth</div>
                  <div className="text-[9px] text-slate-400">Attribution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
