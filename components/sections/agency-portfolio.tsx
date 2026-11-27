"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import projectsData from "@/lib/projects.json";
import { ScrollReveal } from "./scroll-reveal";

type FilterKey = "All" | "Branding" | "Web" | "E-commerce";
type ProjectItem = (typeof projectsData)[number];

const FILTER_TABS: FilterKey[] = ["All", "Branding", "Web", "E-commerce"];

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
      className="border-b border-[#DDE3F5] bg-[#FFFFFF] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* Right-Aligned Header + Filter Tabs */}
        <ScrollReveal
          variant="heading"
          className="flex flex-col items-start md:items-end md:text-right"
        >
          <p className="text-[13px] font-medium tracking-[0.08em] text-[#1A56DB]">
            Our Work
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-[#0D1333] sm:text-4xl lg:text-[48px] lg:leading-[1.1]">
            Results We&apos;re Proud Of
          </h2>

          {/* Pill Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter portfolio by category"
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
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm ${
                    isActive
                      ? "bg-[#1A56DB] text-white"
                      : "bg-[#F5F7FF] text-[#3D4A6B] hover:bg-[#EEF2FF] hover:text-[#1A56DB]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Staggered 3-Column Portfolio Grid */}
        <ScrollReveal
          variant="grid"
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => setSelectedProject(project)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-[12px] border border-[#DDE3F5] bg-[#FFFFFF] text-left shadow-[0_2px_12px_rgba(26,86,219,0.06)] transition-all duration-250 hover:-translate-y-1 hover:border-[#1A56DB] hover:shadow-[0_8px_32px_rgba(26,86,219,0.14)]"
            >
              {/* Top 60% Image Area: --color-bg-soft resting -> --color-bg-dark on hover */}
              <div className="relative flex h-[200px] w-full items-center justify-center bg-[#F5F7FF] p-6 transition-colors duration-300 group-hover:bg-[#05091A]">
                <img
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  className="max-h-[70%] max-w-[60%] object-contain transition-all duration-300 group-hover:opacity-80"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Bottom 40% White Info Strip */}
              <div className="flex flex-1 flex-col justify-between border-t border-[#DDE3F5] bg-[#FFFFFF] px-5 py-4">
                <div>
                  <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-2.5 py-0.5 text-[11px] font-medium text-[#1A56DB]">
                    {project.category}
                  </span>
                  <h3 className="font-display mt-2 text-lg font-semibold text-[#0D1333] transition-colors group-hover:text-[#1A56DB]">
                    {project.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-xs text-[#3D4A6B]">
                    {project.industry}
                  </p>
                </div>

                <div className="mt-3 overflow-hidden pt-1">
                  <span className="inline-flex translate-y-1 items-center gap-1 text-xs font-semibold text-[#1A56DB] opacity-80 transition-all duration-250 group-hover:translate-y-0 group-hover:opacity-100">
                    <span>View</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </ScrollReveal>

        {/* Centered "View all case studies ->" Link Below Grid */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => {
              setActiveFilter("All");
              if (projectsData[0]) setSelectedProject(projectsData[0]);
            }}
            className="cursor-pointer text-sm font-semibold text-[#1A56DB] underline-offset-4 transition-colors hover:text-[#1240B0] hover:underline"
          >
            View all case studies →
          </button>
        </div>
      </div>

      {/* Light-Theme Case Study Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1333]/60 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[16px] border border-[#DDE3F5] bg-[#FFFFFF] p-6 shadow-[0_24px_60px_rgba(13,19,51,0.2)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium text-[#1A56DB]">
                  {selectedProject.category} · {selectedProject.industry}
                </span>
                <h3 className="font-display mt-2 text-2xl font-bold text-[#0D1333] sm:text-3xl">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close case study"
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-[#DDE3F5] bg-[#F5F7FF] text-[#3D4A6B] transition hover:border-[#1A56DB] hover:text-[#1A56DB]"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[12px] border border-[#DDE3F5] bg-[#F5F7FF] p-8">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="max-h-[75%] max-w-[65%] object-contain"
              />
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-[#3D4A6B]">
              {selectedProject.solution}
            </p>

            <div className="mt-5">
              <h4 className="font-display text-sm font-semibold text-[#0D1333]">
                Deliverables
              </h4>
              <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {selectedProject.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-xs text-[#3D4A6B]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-[2px] shrink-0 rounded-full bg-[#1A56DB]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-end gap-3 border-t border-[#DDE3F5] pt-5">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="cursor-pointer rounded-[8px] border border-[#DDE3F5] bg-[#F5F7FF] px-4 py-2.5 text-xs font-medium text-[#3D4A6B] transition hover:border-[#1A56DB] hover:text-[#1A56DB]"
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
