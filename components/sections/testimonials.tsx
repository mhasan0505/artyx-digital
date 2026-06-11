"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "Artyx Digital transformed our online presence completely. The website they built increased our leads by 250% in just three months.",
    author: "Sarah Chen",
    role: "CEO, TechVentures Inc.",
    avatar: "SC",
  },
  {
    quote:
      "Their SaaS development team delivered a platform that exceeded all our expectations. Scalable, beautiful, and lightning fast.",
    author: "Marcus Johnson",
    role: "CTO, DataFlow Systems",
    avatar: "MJ",
  },
  {
    quote:
      "The branding work was exceptional. They captured our vision perfectly and created an identity that truly resonates with our audience.",
    author: "Emily Rodriguez",
    role: "Founder, Bloom Studio",
    avatar: "ER",
  },
  {
    quote:
      "From strategy to execution, Artyx Digital delivered a marketing campaign that drove real, measurable results for our business.",
    author: "David Park",
    role: "Marketing Director, Nexus Corp",
    avatar: "DP",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-32 overflow-hidden bg-gray-50">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-16 w-36 h-36 opacity-5">
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
        <div className="absolute bottom-16 right-16 w-32 h-32 opacity-5">
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

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-artyx-brand/20 bg-artyx-brand/5 text-artyx-brand text-sm font-medium mb-6">
            Client Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </ScrollReveal>

        {/* Testimonial Card */}
        <ScrollReveal>
          <div className="relative p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 shadow-sm">
            {/* Quote Icon */}
            <Quote className="absolute top-8 left-8 w-12 h-12 text-artyx-brand/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8 text-center">
                  "{testimonials[active].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-artyx-brand flex items-center justify-center text-white font-bold text-sm">
                    {testimonials[active].avatar}
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold">
                      {testimonials[active].author}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonials[active].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-artyx-brand hover:border-artyx-brand transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-8 bg-artyx-brand"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-artyx-brand hover:border-artyx-brand transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
