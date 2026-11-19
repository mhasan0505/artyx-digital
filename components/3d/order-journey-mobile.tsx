"use client";

import Image from "next/image";
import {
  ScanLine,
  Inbox,
  Lock,
  Box,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { ORDER_STAGES } from "@/lib/content/order-journey-stages";

const STAGE_ICONS = [
  ScanLine,
  Inbox,
  Lock,
  Box,
  Send,
  CheckCircle2,
];

export function OrderJourneyMobile() {
  return (
    <div className="w-full space-y-6 py-6 text-white">
      {/* Header Info */}
      <div className="rounded-2xl border border-white/10 bg-[#11180E] p-5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#4F8A1E]/30 bg-[#1A2218] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#9AA394]">
          <Sparkles className="h-3 w-3 text-[#4F8A1E]" />
          One Order, End to End
        </div>
        <h3 className="mt-3 font-heading text-xl font-bold text-white">
          Complete Operational Lifecycle
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[#9AA394]">
          Trace an order as it flows from physical POS counter scan through central OMS sync, stock reservation, automated packaging, and courier delivery.
        </p>
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative pl-6">
        {/* Subtle Vertical Line */}
        <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-[#4F8A1E]/40" />

        <div className="space-y-6">
          {ORDER_STAGES.map((stage, idx) => {
            const Icon = STAGE_ICONS[idx] || CheckCircle2;
            return (
              <div
                key={stage.id}
                className="relative rounded-2xl border border-white/10 bg-[#11180E] p-4 transition-all duration-300 hover:border-white/20"
              >
                {/* Node Indicator Dot */}
                <div className="absolute -left-6 top-5 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#4F8A1E] bg-[#070B06] text-[#4F8A1E]">
                  <span className="font-mono text-[10px] font-bold">{stage.number}</span>
                </div>

                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1A2218] text-[#4F8A1E]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9AA394]">
                        Stage {stage.number}
                      </span>
                      <h4 className="font-heading text-sm font-bold text-white">
                        {stage.title}
                      </h4>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-[#1A2218] px-2 py-0.5 text-[10px] font-medium text-slate-300">
                    {stage.tag}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {stage.description}
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                  <span className="text-slate-400 font-mono">Status</span>
                  <span className="font-semibold text-[#4F8A1E] flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4F8A1E] animate-pulse" />
                    {stage.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* POS & OMS Screenshot Panels (Dimmed to ~25% Opacity, Labeled Illustrative) */}
      <div className="grid grid-cols-1 gap-4 pt-2 opacity-25">
        <div className="rounded-2xl border border-white/10 bg-[#11180E] p-3 overflow-hidden">
          <div className="mb-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Artyx POS Counter Interface</span>
              <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-400">
                Illustrative
              </span>
            </div>
            <span className="text-[10px] text-[#4F8A1E] font-mono">Stage 01</span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
            <div className="absolute top-2 right-2 z-10 rounded bg-[#070B06]/90 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-slate-300 border border-white/10">
              Illustrative
            </div>
            <Image
              src="/product/pos.png"
              alt="Artyx POS System Screenshot (Illustrative)"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#11180E] p-3 overflow-hidden">
          <div className="mb-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Artyx OMS Fulfillment Interface</span>
              <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-400">
                Illustrative
              </span>
            </div>
            <span className="text-[10px] text-[#4F8A1E] font-mono">Stages 02–06</span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
            <div className="absolute top-2 right-2 z-10 rounded bg-[#070B06]/90 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-slate-300 border border-white/10">
              Illustrative
            </div>
            <Image
              src="/product/oms.png"
              alt="Artyx OMS System Screenshot (Illustrative)"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
