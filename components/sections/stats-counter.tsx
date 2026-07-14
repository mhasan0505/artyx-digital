"use client";

import { Counter } from "@/components/ui/counter";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { end: 150, suffix: "+", label: "Projects Delivered", icon: "🚀" },
  { end: 50, suffix: "+", label: "Happy Clients", icon: "🤝" },
  { end: 5, suffix: "+", label: "Years Experience", icon: "⏱️" },
  { end: 99, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
];

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-48 h-48 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon
              points="100,20 180,180 20,180"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
            <polygon
              points="100,50 155,160 45,160"
              fill="none"
              stroke="#0078d7"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="absolute bottom-10 left-20 w-40 h-40 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Numbers That <span className="gradient-text">Speak</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Our track record of delivering exceptional digital solutions across
            industries.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.15}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  delay: i * 0.15,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-artyx-secondary/40 hover:shadow-lg hover:shadow-artyx-secondary/10 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                  <Counter end={stat.end} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
