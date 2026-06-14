"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { getAllProjects, getCategories } from "@/lib/projects";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const projects = getAllProjects();
const categories = getCategories();

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
        {/* Abstract background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-48 h-48 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#0078d7"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="100"
                r="50"
                fill="none"
                stroke="#0078d7"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="absolute bottom-20 left-20 w-40 h-40 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon
                points="100,20 180,180 20,180"
                fill="none"
                stroke="#0078d7"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-artyx-brand/20 bg-artyx-brand/5 text-artyx-brand text-sm font-medium mb-6">
              Our Work
            </span>
          </ScrollReveal>
          <AnimatedText
            text="Projects That Speak for Themselves"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
            delay={0.2}
            staggerDelay={0.03}
          />
          <ScrollReveal delay={0.4}>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
              A curated selection of our finest work across web development,
              branding, SaaS, and digital marketing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter Bar */}
          <ScrollReveal className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Filter className="w-4 h-4 text-gray-400" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-artyx-brand text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((project, i) => (
                <ScrollReveal key={project.slug} delay={i * 0.1}>
                  <TiltCard glare className="rounded-2xl">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="group block"
                    >
                      <div
                        className={`relative aspect-4/3 rounded-2xl overflow-hidden ${project.bg} border border-gray-200 group-hover:border-artyx-brand/30 group-hover:shadow-2xl group-hover:shadow-artyx-brand/10 group-hover:-translate-y-1 transition-all duration-500 ease-out mb-6`}
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

                      <span className="text-artyx-brand text-xs font-medium tracking-wider uppercase">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {project.description}
                      </p>
                    </Link>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Be Our Next{" "}
              <span className="text-artyx-brand">Success Story</span>?
            </h2>
            <p className="text-gray-600 mb-8">
              Let's discuss how we can bring your vision to life with the same
              level of excellence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-artyx-brand text-white font-semibold hover:bg-artyx-brand/90 transition-colors"
            >
              Start Your Project
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
