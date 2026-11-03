"use client";

import { trackAnalyticsEvent } from "@/lib/analytics/events";
import { openCookieSettingsModal } from "@/lib/consent/consent-manager";
import { COMPANY_ENTITY } from "@/lib/content/company";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  services: [
    { label: "Services Overview", href: "/services/" },
    { label: "Web Development", href: "/services/web-development/" },
    {
      label: "E-commerce Website Development",
      href: "/services/ecommerce-website-development/",
    },
    { label: "Custom Software Development", href: "/services/custom-software/" },
    { label: "SaaS Development", href: "/services/saas-development/" },
    { label: "SEO & Digital Marketing", href: "/services/digital-marketing/" },
    { label: "Branding & Creative", href: "/services/branding/" },
  ],
  productsAndCompany: [
    { label: "Products Overview", href: "/products/" },
    { label: "POS Software", href: "/products/pos/" },
    {
      label: "Order Management System (OMS)",
      href: "/products/order-management/",
    },
    { label: "Request a Product Demo", href: "/request-demo/" },
    { label: "Our Work & Case Studies", href: "/work/" },
    { label: "Insights & Guides", href: "/insights/" },
    { label: "About Artyx Digital", href: "/about/" },
    { label: "Start a Project", href: "/start-a-project/" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#0B1020] text-[#F8FAFC] border-t border-[#273248]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1.1fr_1.1fr_1.3fr] gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center border border-white/10">
                <Image
                  src="/logo.png"
                  alt="Artyx Digital"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-[#F8FAFC] font-heading">
                Artyx<span className="text-[#4D7CFE]">Digital</span>
              </span>
            </Link>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4D7CFE]">
              {COMPANY_ENTITY.tagline}
            </p>
            <p className="text-[#A7B0C0] text-sm leading-relaxed max-w-sm">
              {COMPANY_ENTITY.consistentDescription}
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <Link
                href="/start-a-project/"
                onClick={() =>
                  trackAnalyticsEvent("cta_click", {
                    cta_name: "Start a Project",
                    cta_location: "footer",
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4D7CFE] text-white text-xs font-semibold hover:bg-[#3b69eb] transition-colors"
              >
                Start a Project
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/request-demo/"
                onClick={() =>
                  trackAnalyticsEvent("cta_click", {
                    cta_name: "Request a Demo",
                    cta_location: "footer",
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#273248] bg-[#121A2D] text-[#F8FAFC] text-xs font-semibold hover:border-[#4D7CFE] transition-colors"
              >
                Request a Demo
              </Link>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8FAFC] mb-5">
              Agency Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A7B0C0] text-sm hover:text-[#4D7CFE] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products & Company Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8FAFC] mb-5">
              Products & Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.productsAndCompany.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A7B0C0] text-sm hover:text-[#4D7CFE] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8FAFC] mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={`mailto:${COMPANY_ENTITY.email}`}
                  onClick={() =>
                    trackAnalyticsEvent("email_click", {
                      cta_location: "footer",
                    })
                  }
                  className="flex items-start gap-3 text-[#A7B0C0] hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-[#4D7CFE] shrink-0" />
                  <span>{COMPANY_ENTITY.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY_ENTITY.phoneE164}`}
                  onClick={() =>
                    trackAnalyticsEvent("phone_click", {
                      cta_location: "footer",
                    })
                  }
                  className="flex items-start gap-3 text-[#A7B0C0] hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-[#4D7CFE] shrink-0" />
                  <span>{COMPANY_ENTITY.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_ENTITY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackAnalyticsEvent("whatsapp_click", {
                      cta_location: "footer",
                    })
                  }
                  className="flex items-start gap-3 text-[#A7B0C0] hover:text-emerald-400 text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                  <span>WhatsApp Business ({COMPANY_ENTITY.phoneDisplay})</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#A7B0C0] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-[#4D7CFE] shrink-0" />
                <span>{COMPANY_ENTITY.address.fullDisplay}</span>
              </li>
              <li className="flex items-start gap-3 text-[#A7B0C0] text-xs">
                <Clock className="w-4 h-4 mt-0.5 text-[#4D7CFE] shrink-0" />
                <span>{COMPANY_ENTITY.operatingHoursDisplay}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Consent Bar */}
        <div className="py-6 border-t border-[#273248] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A7B0C0] text-xs">
            © {new Date().getFullYear()} {COMPANY_ENTITY.name}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy-policy/"
              className="text-[#A7B0C0] text-xs hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms/"
              className="text-[#A7B0C0] text-xs hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie-policy/"
              className="text-[#A7B0C0] text-xs hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
            <button
              type="button"
              onClick={openCookieSettingsModal}
              className="text-[#A7B0C0] text-xs hover:text-[#4D7CFE] underline transition-colors cursor-pointer"
            >
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
