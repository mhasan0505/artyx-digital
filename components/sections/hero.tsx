"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useRef } from "react";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "5+", label: "Years of Excellence" },
  { value: "99%", label: "Client Satisfaction" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white"
    >
      {/* Abstract Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 opacity-10"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
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
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-16 w-56 h-56 opacity-10"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
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
        </motion.div>

        {/* Floating dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-artyx-brand/20"
            style={{
              top: `${15 + ((i * 7) % 70)}%`,
              left: `${10 + ((i * 13) % 80)}%`,
            }}
            animate={{
              y: [0, -20 + i * 5],
              x: [0, 10 - i * 3],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Abstract wave pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#0078d7"
              d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,149.3C672,139,768,149,864,170.7C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-artyx-brand/20 bg-artyx-brand/5 mb-8"
        >
          <Sparkles className="w-4 h-4 text-artyx-brand" />
          <span className="text-artyx-brand text-sm font-medium tracking-wide">
            Digital Agency — Redefining Excellence
          </span>
        </motion.div>

        {/* Main Heading */}
        <AnimatedText
          text="We Build Digital Empires"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-[0.95] tracking-tight mb-8"
          delay={0.4}
          staggerDelay={0.04}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed mb-12"
        >
          From stunning websites to powerful SaaS platforms, we transform bold
          ideas into exceptional digital experiences that drive growth and
          captivate audiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            as="a"
            href="/portfolio"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-artyx-brand text-white font-semibold text-base hover:bg-artyx-brand-dark transition-colors"
          >
            View Our Work
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </MagneticButton>

          <MagneticButton
            as="a"
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-base hover:border-artyx-brand hover:text-artyx-brand transition-all"
          >
            Start a Project
          </MagneticButton>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-400 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
