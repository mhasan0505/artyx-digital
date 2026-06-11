"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  ArrowRight,
  Heart,
  Lightbulb,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every pixel, every line of code is crafted with meticulous attention to detail.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We push boundaries and embrace cutting-edge technologies to deliver forward-thinking solutions.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Our team is driven by a genuine love for creating exceptional digital experiences.",
  },
  {
    icon: Shield,
    title: "Trust",
    description:
      "We build lasting partnerships through transparency, reliability, and consistent delivery.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Your vision is our mission. We work closely with you at every step of the journey.",
  },
  {
    icon: Zap,
    title: "Speed",
    description:
      "Fast delivery without compromising quality. We move at the speed of your ambition.",
  },
];

const milestones = [
  {
    year: "2019",
    title: "Founded",
    description:
      "Artyx Digital was born from a vision to redefine digital excellence.",
  },
  {
    year: "2020",
    title: "First 50 Clients",
    description:
      "Rapid growth as businesses recognized our unique approach to digital solutions.",
  },
  {
    year: "2021",
    title: "SaaS Division Launch",
    description:
      "Expanded into software development, building scalable platforms for enterprises.",
  },
  {
    year: "2022",
    title: "100+ Projects",
    description:
      "Reached a major milestone with over 100 successful project deliveries.",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description:
      "Started serving international clients across multiple continents.",
  },
  {
    year: "2024",
    title: "Industry Awards",
    description:
      "Recognized for excellence in web development and digital marketing.",
  },
];

const team = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    avatar: "AM",
    color: "from-artyx-brand to-artyx-cyan",
  },
  {
    name: "Sarah Chen",
    role: "Creative Director",
    avatar: "SC",
    color: "from-artyx-gold to-artyx-rose",
  },
  {
    name: "Marcus Johnson",
    role: "Lead Developer",
    avatar: "MJ",
    color: "from-artyx-purple to-artyx-brand",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Head",
    avatar: "ER",
    color: "from-artyx-emerald to-artyx-brand",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
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
              Our Story
            </span>
          </ScrollReveal>
          <AnimatedText
            text="Crafting Digital Excellence Since 2019"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
            delay={0.2}
            staggerDelay={0.03}
          />
          <ScrollReveal delay={0.4}>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
              We're a team of passionate creators, developers, and strategists
              dedicated to transforming bold ideas into extraordinary digital
              experiences that drive real business results.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              The principles that guide everything we do.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-artyx-brand/30 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-artyx-brand/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <value.icon className="w-5 h-5 text-artyx-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200" />

            {milestones.map((milestone, i) => (
              <ScrollReveal key={milestone.year} delay={i * 0.15}>
                <div className="relative flex gap-8 pb-12 last:pb-0">
                  {/* Dot */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-artyx-brand/5 border-2 border-artyx-brand/30 flex items-center justify-center shrink-0">
                    <span className="text-artyx-brand font-bold text-sm">
                      {milestone.year}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="pt-3">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              The talented people behind Artyx Digital.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:border-artyx-brand/30 hover:shadow-md transition-all group">
                  <div className="w-20 h-20 mx-auto rounded-full bg-artyx-brand flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                    {member.avatar}
                  </div>
                  <h3 className="text-gray-900 font-semibold">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Want to Join Our <span className="gradient-text">Story</span>?
            </h2>
            <p className="text-gray-600 mb-8">
              Whether you're looking for a career change or want to collaborate
              on a project, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                as="a"
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-artyx-brand text-white font-semibold"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <Link
                href="/careers"
                className="text-gray-500 hover:text-artyx-brand transition-colors text-sm"
              >
                View Open Positions →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
