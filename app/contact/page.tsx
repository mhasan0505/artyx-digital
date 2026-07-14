"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@artyxdigital.com",
    href: "mailto:hello@artyxdigital.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1732-549551",
    href: "tel:+8801732549551",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "18/3 Jahurabad,Mirpur,Dhaka-1216, Bangladesh",
    href: "#",
  },
  { icon: Clock, label: "Hours", value: "Mon - Fri: 9AM - 6PM EST", href: "#" },
];

const services = [
  "Web Development",
  "Digital Marketing",
  "Content Creation",
  "Branding",
  "SaaS Development",
  "POS Software",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              Get in Touch
            </span>
          </ScrollReveal>
          <AnimatedText
            text="Let's Start a Conversation"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
            delay={0.2}
            staggerDelay={0.03}
          />
          <ScrollReveal delay={0.4}>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
              Have a project in mind? We'd love to hear about it. Fill out the
              form below and we'll get back to you within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
            {/* Contact Info */}
            <ScrollReveal>
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Contact Information
                </h2>
                <p className="text-gray-600">
                  Reach out through any of these channels. We're always happy to
                  discuss your next big idea.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-artyx-brand/30 group-hover:bg-artyx-brand/5 transition-all">
                        <info.icon className="w-5 h-5 text-artyx-brand" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">
                          {info.label}
                        </div>
                        <div className="text-gray-900 group-hover:text-artyx-brand transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-gray-900 font-semibold mb-4">
                    Follow Us
                  </h3>
                  <div className="flex items-center gap-3">
                    {["LinkedIn", "Instagram", "Twitter", "GitHub"].map(
                      (social) => (
                        <a
                          key={social}
                          href="#"
                          className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-artyx-brand hover:border-artyx-brand/30 transition-all text-xs font-medium"
                        >
                          {social[0]}
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.2}>
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-artyx-brand/10 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-artyx-brand" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you within
                      24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-600 text-sm mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-artyx-brand/50 focus:outline-none focus:ring-1 focus:ring-artyx-brand/20 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-artyx-brand/50 focus:outline-none focus:ring-1 focus:ring-artyx-brand/20 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-600 text-sm mb-2">
                          Service Interested In
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              service: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-artyx-brand/50 focus:outline-none focus:ring-1 focus:ring-artyx-brand/20 transition-all appearance-none"
                        >
                          <option value="" className="bg-white">
                            Select a service
                          </option>
                          {services.map((s) => (
                            <option key={s} value={s} className="bg-white">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-2">
                          Budget Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-artyx-brand/50 focus:outline-none focus:ring-1 focus:ring-artyx-brand/20 transition-all appearance-none"
                        >
                          <option value="" className="bg-white">
                            Select budget
                          </option>
                          <option value="5k-10k" className="bg-white">
                            5k - 10k
                          </option>
                          <option value="10k-25k" className="bg-white">
                            10k - 25k
                          </option>
                          <option value="25k-50k" className="bg-white">
                            25k - 50k
                          </option>
                          <option value="50k+" className="bg-white">
                            50k+
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm mb-2">
                        Project Details *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-artyx-brand/50 focus:outline-none focus:ring-1 focus:ring-artyx-brand/20 transition-all resize-none"
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                    </div>

                    <MagneticButton
                      as="button"
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-artyx-brand text-white font-semibold hover:bg-artyx-brand/90 transition-colors"
                    >
                      Send Message
                      <Send className="w-5 h-5" />
                    </MagneticButton>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
