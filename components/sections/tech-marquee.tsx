"use client";

import { Marquee } from "@/components/ui/marquee";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Figma",
  "Stripe",
  "Shopify",
  "WordPress",
  "Laravel",
  "Vue.js",
];

export function TechMarquee() {
  return (
    <section className="py-16 border-y border-gray-100 bg-white">
      <ScrollReveal className="text-center mb-10">
        <p className="text-gray-400 text-sm tracking-widest uppercase">
          Technologies We Master
        </p>
      </ScrollReveal>

      <Marquee speed={40} pauseOnHover>
        {technologies.map((tech) => (
          <div
            key={tech}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 border border-gray-100 text-gray-600 text-sm font-medium whitespace-nowrap hover:border-artyx-brand/30 hover:text-artyx-brand transition-colors cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-artyx-brand/50" />
            {tech}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
