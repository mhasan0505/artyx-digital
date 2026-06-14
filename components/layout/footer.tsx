"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import github from "@/public/github-sign.png";
import instagram from "@/public/instagram.png";
import linkedin from "@/public/linkedin.png";
import facebook from "@/public/social.png";


const footerLinks = {
  services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Digital Marketing", href: "/services/digital-marketing" },
    { label: "Content Creation", href: "/services/content-creation" },
    { label: "Branding", href: "/services/branding" },
    { label: "SaaS Development", href: "/services/saas-development" },
    { label: "POS Software", href: "/services/pos-software" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: linkedin, href: "#", label: "LinkedIn" },
  { icon: instagram, href: "#", label: "Instagram" },
  { icon: facebook, href: "#", label: "Facebook" },
  { icon: github, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative bg-gray-50 border-t border-gray-100">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-artyx-brand/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Artyx Digital"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Artyx<span className="text-artyx-brand">Digital</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              We build digital empires. From stunning websites to powerful SaaS
              platforms, we transform ideas into exceptional digital
              experiences.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-artyx-brand hover:border-artyx-brand/30 transition-colors"
                  aria-label={social.label}
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-artyx-brand transition-colors flex items-center gap-2 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-artyx-brand transition-colors flex items-center gap-2 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-artyx-brand shrink-0" />
                <span>hello@artyxdigital.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-artyx-brand shrink-0" />
                <span>+880 1732-549551</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-artyx-brand shrink-0" />
                <span>
                  18/3 Jahurabad,Mirpur
                  <br />
                  Dhaka-1216, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Artyx Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-gray-500 text-sm hover:text-artyx-brand transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 text-sm hover:text-artyx-brand transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
