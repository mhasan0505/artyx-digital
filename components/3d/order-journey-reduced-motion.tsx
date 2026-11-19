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

export function OrderJourneyReducedMotion() {
  return (
    <div className="w-full space-y-8 py-8 text-white">
      {/* Overview header */}
      <div className="rounded-3xl border border-white/10 bg-[#11180E] p-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#4F8A1E]/30 bg-[#1A2218] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#9AA394]">
          <Sparkles className="h-3.5 w-3.5 text-[#4F8A1E]" />
          One Order, End to End
        </div>
        <h3 className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl">
          Complete Operational Lifecycle (Static View)
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#9AA394] max-w-2xl">
          A static walkthrough of how an order moves through the unified Artyx commerce stack: from counter checkout to omnichannel stock sync, warehouse packing, and final courier handoff.
        </p>
      </div>

      {/* Static 6-Stage Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ORDER_STAGES.map((stage, idx) => {
          const Icon = STAGE_ICONS[idx] || CheckCircle2;
          return (
            <div
              key={stage.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#11180E] p-6"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A2218] text-[#4F8A1E]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-[#4F8A1E]">
                        STAGE {stage.number}
                      </span>
                      <h4 className="font-heading text-base font-bold text-white">
                        {stage.title}
                      </h4>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-[#1A2218] px-2.5 py-1 text-[11px] font-mono text-slate-300">
                    {stage.tag}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {stage.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-3 text-xs">
                <span className="text-slate-400">Milestone</span>
                <span className="font-semibold text-[#4F8A1E]">{stage.badge}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Static screenshots (Dimmed to ~25% Opacity, Labeled Illustrative) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 opacity-25">
        <div className="rounded-2xl border border-white/10 bg-[#11180E] p-5">
          <div className="mb-3 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Artyx POS Counter Interface</span>
              <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                Illustrative
              </span>
            </div>
            <span className="text-xs text-[#4F8A1E] font-mono">Stage 01</span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
            <div className="absolute top-2.5 right-2.5 z-10 rounded bg-[#070B06]/90 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-300 border border-white/10">
              Illustrative
            </div>
            <Image
              src="/product/pos.png"
              alt="Artyx POS System Screenshot (Illustrative)"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 50vw, 600px"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#11180E] p-5">
          <div className="mb-3 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Artyx OMS Fulfillment Interface</span>
              <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                Illustrative
              </span>
            </div>
            <span className="text-xs text-[#4F8A1E] font-mono">Stages 02–06</span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
            <div className="absolute top-2.5 right-2.5 z-10 rounded bg-[#070B06]/90 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-300 border border-white/10">
              Illustrative
            </div>
            <Image
              src="/product/oms.png"
              alt="Artyx OMS System Screenshot (Illustrative)"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 50vw, 600px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
