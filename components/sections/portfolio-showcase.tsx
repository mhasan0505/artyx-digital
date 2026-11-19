"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { TiltCard } from "@/components/motion/tilt-card";
import { StaggerReveal } from "@/components/motion/stagger-reveal";
import { SplitText } from "@/components/motion/split-text";
import { ParallaxLayer } from "@/components/motion/parallax-layer";

export function PortfolioShowcase() {
  const projects = getAllProjects().slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-bg py-24 text-text lg:py-28">
      {/* Subtle background glow: Dark Theme only (Rule 6) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden dark:block hidden">
        <ParallaxLayer speed={-0.2} className="absolute top-1/2 right-0 h-[450px] w-[450px] rounded-full bg-[var(--surface-2)]/40 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-10 sm:flex-row sm:items-end">
          <div>
            {/* Rule 4: Eyebrow pill */}
            <div className="eyebrow-pill">
              <span className="pill-dot" />
              <span>Selected Portfolio &amp; Case Studies</span>
            </div>
            <SplitText
              text="Documented Brand, Web & E-commerce Work"
              as="h2"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl"
            />
            <p className="mt-3 max-w-2xl text-base text-text-muted">
              Every project below documents our exact role, deliverables, and relationship
              transparently—without inflated vanity metrics.
            </p>
          </div>

          {/* Rule 3: Secondary button */}
          <Link
            href="/work/"
            prefetch={false}
            className="btn-secondary inline-flex items-center gap-2 self-start px-5 py-3 text-sm"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <StaggerReveal className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2" itemSelector=".project-item">
          {projects.map((project) => {
            return (
              <TiltCard
                key={project.slug}
                maxTilt={5}
                className="project-item rounded-3xl border border-border bg-surface shadow-2xl backdrop-blur-md transition hover:border-accent-text"
              >
                <Link
                  href={`/work/${project.slug}/`}
                  prefetch={false}
                  className="group flex flex-col justify-between h-full overflow-hidden"
                >
                  <div>
                    <div
                      className={`relative aspect-[16/10] w-full overflow-hidden ${project.bg} border-b border-border`}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.category}`}
                        fill
                        className="object-contain pt-16 pb-6 px-6 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                        <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold text-text shadow-sm">
                          {project.relationshipType}
                        </span>
                        <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-text-muted shadow-sm">
                          {project.industry}
                        </span>
                      </div>
                    </div>

                    <div className="p-7">
                      <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        {project.category}
                      </div>
                      <h3 className="mt-1.5 font-heading text-2xl font-bold text-text transition group-hover:text-accent-text">
                        {project.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                        {project.description}
                      </p>
                      <div className="mt-4 rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-xs text-text-muted">
                        <strong className="text-text">Role &amp; Scope:</strong>{" "}
                        {project.roleAndScope}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border bg-surface-2 px-7 py-4 text-xs font-semibold text-text transition group-hover:text-accent-text">
                    <span>View Case Study</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent-text" />
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
