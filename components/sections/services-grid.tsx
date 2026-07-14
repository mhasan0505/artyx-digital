"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import {
  ArrowRight,
  Code,
  Globe,
  Megaphone,
  Palette,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites and web applications built with cutting-edge technology for blazing performance and stunning design.",
    href: "/services/web-development",
    gradient: "from-artyx-brand/20 to-artyx-cyan/20",
    iconColor: "text-artyx-brand",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven campaigns that amplify your reach, boost conversions, and deliver measurable ROI across all channels.",
    href: "/services/digital-marketing",
    gradient: "from-artyx-gold/20 to-artyx-rose/20",
    iconColor: "text-artyx-gold",
  },
  {
    icon: Palette,
    title: "Content Creation",
    description:
      "Compelling visual and written content that tells your brand story and engages your audience across platforms.",
    href: "/services/content-creation",
    gradient: "from-artyx-purple/20 to-artyx-rose/20",
    iconColor: "text-artyx-purple",
  },
  {
    icon: Megaphone,
    title: "Branding & Identity",
    description:
      "Strategic brand development that creates lasting impressions and builds trust with your target audience.",
    href: "/services/branding",
    gradient: "from-artyx-emerald/20 to-artyx-brand/20",
    iconColor: "text-artyx-emerald",
  },
  {
    icon: Code,
    title: "SaaS Development",
    description:
      "Scalable software-as-a-service platforms engineered for performance, security, and seamless user experience.",
    href: "/services/saas-development",
    gradient: "from-artyx-cyan/20 to-artyx-purple/20",
    iconColor: "text-artyx-cyan",
  },
  {
    icon: ShoppingCart,
    title: "POS Software",
    description:
      "Intelligent point-of-sale systems that streamline operations, manage inventory, and accelerate your business growth.",
    href: "/services/pos-software",
    gradient: "from-artyx-rose/20 to-artyx-gold/20",
    iconColor: "text-artyx-rose",
  },
];

export function ServicesGrid() {
  return (
    <section className="relative py-32 overflow-hidden bg-gray-50">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 opacity-5">
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
            <rect
              x="40"
              y="40"
              width="120"
              height="120"
              fill="none"
              stroke="#0078d7"
              strokeWidth="1.5"
              transform="rotate(45 100 100)"
            />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-32 h-32 opacity-5">
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
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full border border-artyx-brand/20 bg-artyx-brand/5 text-artyx-brand text-sm font-medium mb-6">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Services That <span className="gradient-text">Drive Results</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            End-to-end digital solutions crafted with precision, creativity, and
            a relentless focus on your success.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <Link
                  href={service.href}
                  className="group block h-full p-8 rounded-2xl bg-white border border-gray-100 hover:border-artyx-brand/30 hover:shadow-lg hover:shadow-artyx-brand/5 transition-all duration-500"
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-artyx-brand/5 flex items-center justify-center mb-6 group-hover:bg-artyx-brand/10 transition-colors duration-300`}
                  >
                    <service.icon className={`w-6 h-6 text-artyx-brand`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-artyx-brand transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-artyx-brand transition-colors">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
