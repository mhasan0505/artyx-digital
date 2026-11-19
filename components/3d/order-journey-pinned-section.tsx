"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { ORDER_STAGES } from "@/lib/content/order-journey-stages";
import { journey } from "@/lib/motion/journey-state";
import { OrderJourneyMobile } from "./order-journey-mobile";
import { OrderJourneyReducedMotion } from "./order-journey-reduced-motion";
import {
  ScanLine,
  Inbox,
  Lock,
  Box,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from "lucide-react";

function subscribeResize(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

function getIsMobileSnapshot() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 1024;
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const STAGE_ICONS = [ScanLine, Inbox, Lock, Box, Send, CheckCircle2];

export function OrderJourneyPinnedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const currentStageRef = useRef(0);

  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [CanvasComponent, setCanvasComponent] = useState<React.ComponentType<{ isInView?: boolean }> | null>(null);

  const isMobile = useSyncExternalStore(subscribeResize, getIsMobileSnapshot, () => false);
  const reducedMotion = useSyncExternalStore(subscribeResize, getReducedMotionSnapshot, () => false);

  // Lazy-load 3D stage and track visibility to pause rendering off-screen (frameloop="demand")
  useEffect(() => {
    if (isMobile || reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          import("./order-journey-canvas").then((mod) => {
            setCanvasComponent(() => mod.OrderJourneyCanvas);
          });
        }
      },
      { rootMargin: "150px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile, reducedMotion]);

  // GSAP ScrollTrigger Pinning & Scrubbing
  useGSAP(
    () => {
      if (isMobile || reducedMotion || !containerRef.current || !pinTargetRef.current) {
        return;
      }

      // Clean up previous triggers for safe route transitions
      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinTargetRef.current,
        start: "top top+=72",
        end: "+=250%",
        scrub: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          journey.target = self.progress;

          if (progressLineRef.current) {
            progressLineRef.current.style.width = `calc(${self.progress * 100}% - 16px)`;
          }

          const stageIdx = Math.min(5, Math.floor(self.progress * 6));
          if (stageIdx !== currentStageRef.current) {
            currentStageRef.current = stageIdx;
            setCurrentStageIdx(stageIdx);
          }
        },
      });

      // Refresh ScrollTrigger after initial mount layout settle
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => {
        clearTimeout(timer);
        pinTrigger.kill();
      };
    },
    { dependencies: [isMobile, reducedMotion], scope: containerRef }
  );

  // Fallbacks: Reduced motion static list OR Mobile CSS/SVG view
  if (reducedMotion) {
    return <OrderJourneyReducedMotion />;
  }

  if (isMobile) {
    return <OrderJourneyMobile />;
  }

  const activeStage = ORDER_STAGES[currentStageIdx] || ORDER_STAGES[0];
  const ActiveIcon = STAGE_ICONS[currentStageIdx] || CheckCircle2;

  return (
    <div
      ref={containerRef}
      data-journey-container="true"
      className="relative w-full"
    >
      {/* Pinned Viewport Container (calc(100vh - 72px) pinned below the navbar) */}
      <div
        ref={pinTargetRef}
        data-journey-pinned-viewport="true"
        className="w-full overflow-hidden bg-[#070B06]"
        style={{ height: "calc(100vh - 72px)" }}
      >
        {/* Faint Dark Radial Vignette (No Lime Gradients or Fog) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7)_100%)]" />

        {/* 3D WebGL Canvas Layer */}
        <div className="absolute inset-0 z-10" data-journey-canvas="true">
          {CanvasComponent ? (
            <CanvasComponent isInView={isInView} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#070B06]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#9AA394]">
                Loading Interactive Stage...
              </span>
            </div>
          )}
        </div>

        {/* Floating Narrative Overlay (Side Column & Progress Line) */}
        <div className="pointer-events-none relative z-20 flex h-full w-full max-w-7xl mx-auto px-6 lg:px-8 items-center">
          <div className="w-full max-w-md pointer-events-auto">
            {/* Top pill badge (Rule 3: --green-secondary / --text-muted) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4F8A1E]/30 bg-[#1A2218] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#9AA394] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#4F8A1E]" />
              <span>One Order, End to End</span>
            </div>

            {/* Story headline */}
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
              Live Fulfillment Flow
            </h3>

            {/* Stage Crossfade Narrative Card */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0D140B]/90 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#4F8A1E]/30 bg-[#1A2218] text-[#4F8A1E]">
                    <ActiveIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        data-journey-stage-number="true"
                        className="font-mono text-xs font-bold text-[#9AA394]"
                      >
                        STAGE {activeStage.number} OF 06
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4F8A1E] animate-pulse" />
                    </div>
                    <h4
                      data-journey-stage-title="true"
                      className="font-heading text-lg font-bold text-white"
                    >
                      {activeStage.title}
                    </h4>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-[#162013] px-3 py-1 font-mono text-[11px] text-slate-300">
                  {activeStage.tag}
                </span>
              </div>

              {/* Crossfading Sentence */}
              <div className="relative mt-4 min-h-[48px]">
                <p
                  data-journey-stage-desc="true"
                  className="text-sm leading-relaxed text-[#CBD5E1] transition-opacity duration-300"
                >
                  {activeStage.description}
                </p>
              </div>

              {/* Status Milestone Indicator */}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                <span className="font-mono text-slate-400">Milestone</span>
                <span
                  data-journey-stage-badge="true"
                  className="font-semibold text-[#9AA394] flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4F8A1E]" />
                  {activeStage.badge}
                </span>
              </div>
            </div>

            {/* 6-Stage Thin Vertical Progress Line */}
            <div className="mt-6 pl-2">
              <div className="relative flex items-center justify-between gap-2">
                {/* Thin Background Rail */}
                <div className="absolute left-2 right-2 top-1/2 h-0.5 -translate-y-1/2 bg-white/10" />
                {/* Glowing Progress Fill (Rule 3: --green-secondary) */}
                <div
                  ref={progressLineRef}
                  className="absolute left-2 top-1/2 h-0.5 -translate-y-1/2 bg-[#4F8A1E] shadow-sm shadow-[#4F8A1E] transition-all duration-150"
                  style={{
                    width: `calc(0% - 16px)`,
                    maxWidth: "calc(100% - 16px)",
                  }}
                />

                {/* 6 Step Dots */}
                {ORDER_STAGES.map((s, idx) => {
                  const isCompleted = idx < currentStageIdx;
                  const isCurrent = idx === currentStageIdx;

                  return (
                    <div
                      key={s.id}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-mono font-bold transition-all duration-300 ${
                          isCurrent
                            ? "border-2 border-[#4F8A1E] bg-[#070B06] text-[#E8ECE4] shadow-md shadow-[#4F8A1E]/30 scale-110"
                            : isCompleted
                            ? "border border-[#4F8A1E] bg-[#1A2218] text-[#E8ECE4]"
                            : "border border-white/20 bg-[#11180E] text-slate-400"
                        }`}
                      >
                        {s.number}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Small Readable Scroll Chip on Solid Dark Background */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#11180E] px-3.5 py-1.5 shadow-md">
              <span className="h-2 w-2 rounded-full bg-[#4F8A1E]" />
              <span className="font-mono text-xs font-medium text-[#E8ECE4]">
                {currentStageIdx === 5
                  ? "Order delivered · Scroll to continue"
                  : "Scroll to explore journey"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
