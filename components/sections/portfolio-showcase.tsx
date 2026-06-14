"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { getAllProjects } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = getAllProjects();

export function PortfolioShowcase() {
  return (
    <section className="relative py-32 overflow-hidden bg-white">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect
              x="20"
              y="20"
              width="160"
              height="160"
              fill="none"
              stroke="#0078d7"
              strokeWidth="2"
              transform="rotate(45 100 100)"
            />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-artyx-brand/20 bg-artyx-brand/5 text-artyx-brand text-sm font-medium mb-6">
              Featured Work
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Our Latest <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-artyx-brand transition-colors group"
          >
            <span className="text-sm font-medium">View All Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.15}>
              <TiltCard glare className="rounded-2xl">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block"
                >
                  {/* Image Container */}
                  <div
                    className={`relative aspect-4/3 rounded-2xl overflow-hidden ${project.bg} border border-gray-100 group-hover:border-artyx-brand/30 group-hover:shadow-2xl group-hover:shadow-artyx-brand/10 group-hover:-translate-y-1 transition-all duration-500 ease-out mb-6`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain p-6 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Diagonal gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-tr from-artyx-brand/95 via-artyx-brand/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Slide-up content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-2 mb-3">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-white/80 text-xs font-semibold tracking-wider uppercase">
                        View Project
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </div>

                    {/* Glossy floating button */}
                    <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <span className="text-artyx-brand text-xs font-medium tracking-wider uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </Link>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
