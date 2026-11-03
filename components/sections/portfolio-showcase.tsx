"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";

export function PortfolioShowcase() {
  const projects = getAllProjects().slice(0, 4);

  return (
    <section className="bg-[#050814] py-24 text-white lg:py-28 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-800 pb-10 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Selected Portfolio &amp; Case Studies
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Documented Brand, Web &amp; E-commerce Work
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[#94A3B8]">
              Every project below documents our exact role, deliverables, and relationship
              transparently—without inflated vanity metrics.
            </p>
          </div>

          <Link
            href="/work/"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-700 bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <StaggerReveal className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2" itemSelector=".project-item">
          {projects.map((project) => {
            const isInHouse = project.relationshipType
              .toLowerCase()
              .includes("in-house");
            return (
              <TiltCard
                key={project.slug}
                maxTilt={5}
                glowColor="rgba(0, 229, 255, 0.12)"
                className="project-item rounded-3xl border border-slate-800 bg-[#0A1022]/90 shadow-2xl backdrop-blur-md transition hover:border-slate-700"
              >
                <Link
                  href={`/work/${project.slug}/`}
                  className="group flex flex-col justify-between h-full overflow-hidden"
                >
                  <div>
                    <div
                      className={`relative aspect-[16/10] w-full overflow-hidden ${project.bg} border-b border-slate-800/80`}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.category}`}
                        fill
                        className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold shadow-md ${
                            isInHouse
                              ? "border border-amber-500/40 bg-amber-950/90 text-amber-200"
                              : "border border-slate-700 bg-slate-900/90 text-slate-100"
                          }`}
                        >
                          {project.relationshipType}
                        </span>
                        <span className="rounded-full bg-slate-900/90 border border-slate-700 px-3 py-1 text-[11px] font-medium text-slate-200 shadow-md">
                          {project.industry}
                        </span>
                      </div>
                    </div>

                    <div className="p-7">
                      <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                        {project.category}
                      </div>
                      <h3 className="mt-1.5 font-display text-2xl font-bold text-white transition group-hover:text-cyan-300">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">
                        {project.description}
                      </p>
                      <div className="mt-4 rounded-xl border border-slate-800 bg-[#060A16] px-3.5 py-2.5 text-xs text-slate-400">
                        <strong className="text-slate-200">Role &amp; Scope:</strong>{" "}
                        {project.roleAndScope}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800/80 bg-[#060A16] px-7 py-4 text-xs font-semibold text-cyan-400">
                    <span>View Case Study</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </TiltCard>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
