"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden bg-white">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 opacity-5">
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
              r="60"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke="#0078d7"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="absolute bottom-10 right-1/4 w-48 h-48 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon
              points="100,20 180,180 20,180"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-12 sm:p-16 rounded-3xl overflow-hidden bg-gray-50 border border-gray-100"
          >
            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-artyx-secondary/5 border border-artyx-secondary/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-artyx-secondary" />
                <span className="text-artyx-secondary text-sm font-medium">
                  Ready to Start?
                </span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Let&apos;s Build Something{" "}
                <span className="gradient-text">Extraordinary</span>
              </h2>

              <p className="max-w-xl mx-auto text-gray-600 text-lg mb-10">
                Whether you need a stunning website, a powerful SaaS platform,
                or a complete digital transformation — we&apos;re here to make
                it happen.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton
                  as="a"
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-artyx-brand to-artyx-secondary text-white font-semibold text-base hover:shadow-lg hover:shadow-artyx-brand/25 transition-all duration-300"
                >
                  Get a Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-artyx-brand transition-colors"
                >
                  <span className="text-sm">Or view our work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
