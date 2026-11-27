"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import projectsData from "@/lib/projects.json";
import { ScrollReveal } from "./scroll-reveal";

type FilterKey = "All" | "Branding" | "Web" | "E-commerce";
type ProjectItem = (typeof projectsData)[number];

const FILTER_TABS: FilterKey[] = ["All", "Branding", "Web", "E-commerce"];

const CARD_GRADIENTS = [
  "from-[#1A56DB]/35 via-[#0D1333] to-[#00C2FF]/20",
  "from-[#00C2FF]/25 via-[#111B40] to-[#1A56DB]/30",
  "from-[#1A56DB]/30 via-[#0B1230] to-[#00C2FF]/25",
  "from-[#00C2FF]/20 via-[#0D1333] to-[#1A56DB]/35",
  "from-[#1A56DB]/40 via-[#111B40] to-[#00C2FF]/15",
  "from-[#00C2FF]/30 via-[#0D1333] to-[#1A56DB]/25",
];

function matchesFilter(category: string, filter: FilterKey): boolean {
  if (filter === "All") return true;
  if (filter === "Web") return category.toLowerCase().includes("web");
  if (filter === "E-commerce")
    return category.toLowerCase().includes("e-commerce");
  return category.toLowerCase() === filter.toLowerCase();
}

export function AgencyPortfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  const visibleProjects = projectsData.filter((project) =>
    matchesFilter(project.category, activeFilter),
  );

  return (
    <section
      id="work"
      className="border-t border-[#1E2D5A]/60 bg-[#05091A] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Right-Aligned Section Header */}
          <div className="flex flex-col items-start md:items-end md:text-right">
            <p className="text-sm font-medium text-[#00C2FF]">Our Work</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-[48px] lg:leading-[1.1]">
              Results We&apos;re Proud Of
            </h2>

            {/* Pill Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter portfolio by discipline"
              className="mt-7 flex flex-wrap items-center gap-2.5 md:justify-end"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(tab)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${
                      isActive
                        ? "bg-[#1A56DB] text-white shadow-[0_0_20px_rgba(26,86,219,0.45)]"
                        : "border border-[#1E2D5A] bg-[#0D1333] text-[#8A9BC4] hover:border-[#00C2FF]/60 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Column 4/3 Portfolio Grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, idx) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => setSelectedProject(project)}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[16px] border border-[#1E2D5A] bg-[#0D1333] text-left transition-all duration-300 hover:border-[#00C2FF]/60 hover:shadow-[0_0_28px_rgba(0,194,255,0.18)]"
              >
                {/* Brand-Toned Dark Gradient Backdrop */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    CARD_GRADIENTS[idx % CARD_GRADIENTS.length]
                  }`}
                />

                {/* Real Client Project Visual Plate */}
                <div className="relative flex h-full w-full items-center justify-center p-6 sm:p-8">
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] border border-white/10 bg-white/95 p-4 shadow-lg transition-transform duration-500 group-hover:scale-[1.04]">
                    <img
                      src={project.image}
                      alt={`${project.title} — ${project.category}`}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Top Category Chip */}
                <div className="pointer-events-none absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center rounded-full border border-[#1E2D5A] bg-[#05091A]/85 px-3 py-1 text-[11px] font-medium text-[#00C2FF] backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Slide-Up Dark Overlay on Hover */}
                <div className="absolute inset-x-0 bottom-0 z-20 translate-y-2 bg-gradient-to-t from-[#05091A] via-[#05091A]/95 to-transparent p-6 pt-14 opacity-95 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <span className="text-xs font-medium text-[#00C2FF]">
                    {project.category} · {project.industry}
                  </span>
                  <h3 className="font-display mt-1 text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00C2FF]">
                    <span>View</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Case Study Lightbox Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#05091A]/85 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-[#1E2D5A] bg-[#0D1333] p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-medium text-[#00C2FF]">
                  {selectedProject.category} · {selectedProject.industry}
                </span>
                <h3 className="font-display mt-1 text-2xl font-bold text-white sm:text-3xl">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-[#1E2D5A] bg-[#111B40] text-[#8A9BC4] transition hover:border-[#00C2FF] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[12px] border border-[#1E2D5A] bg-white p-6">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[#8A9BC4]">
              {selectedProject.solution}
            </p>

            <div className="mt-5">
              <h4 className="font-display text-sm font-semibold text-white">
                Key Deliverables
              </h4>
              <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {selectedProject.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-[#8A9BC4]"
                  >
                    <span className="text-[#00C2FF]">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-end gap-3 border-t border-[#1E2D5A] pt-5">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="cursor-pointer rounded-[8px] border border-[#1E2D5A] px-4 py-2.5 text-xs font-medium text-[#8A9BC4] transition hover:border-[#00C2FF] hover:text-white"
              >
                Close
              </button>
              <Link
                href="/#contact"
                onClick={() => setSelectedProject(null)}
                className="btn-primary inline-flex items-center px-5 py-2.5 text-xs font-semibold"
              >
                Start a Similar Project →
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
