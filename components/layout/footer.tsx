"use client";

import { trackAnalyticsEvent } from "@/lib/analytics/events";
import { openCookieSettingsModal } from "@/lib/consent/consent-manager";
import { COMPANY_ENTITY } from "@/lib/content/company";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const footerLinks = {
  services: [
    { label: "Services Overview", href: "/services/" },
    { label: "Web Development", href: "/services/web-development/" },
    {
      label: "E-commerce Development",
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
    <footer className="relative border-t border-border bg-bg text-text">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1.1fr_1.1fr_1.3fr] lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" prefetch={false} className="inline-flex items-center">
              <Image
                src="/logo-compact-for-dark-bg.png"
                alt="Artyx Digital"
                width={124}
                height={40}
                className="h-10 w-auto object-contain block dark:block light:hidden"
              />
              <Image
                src="/logo-compact-for-light-bg.png"
                alt="Artyx Digital"
                width={124}
                height={40}
                className="h-10 w-auto object-contain hidden dark:hidden light:block"
              />
            </Link>

            {/* Tagline */}
            <p className="font-heading text-xs font-bold uppercase tracking-widest text-text-muted">
              {COMPANY_ENTITY.tagline}
            </p>

            <p className="max-w-sm text-sm leading-relaxed text-text-muted">
              {COMPANY_ENTITY.consistentDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary CTA */}
              <Link
                href="/start-a-project/"
                prefetch={false}
                onClick={() =>
                  trackAnalyticsEvent("cta_click", {
                    cta_name: "Start a Project",
                    cta_location: "footer",
                  })
                }
                className="btn-primary inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold"
              >
                Start a Project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              {/* Secondary CTA */}
              <Link
                href="/request-demo/"
                prefetch={false}
                onClick={() =>
                  trackAnalyticsEvent("cta_click", {
                    cta_name: "Request a Demo",
                    cta_location: "footer",
                  })
                }
                className="btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold"
              >
                Request a Demo
              </Link>
              <ThemeToggle />
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-text">
              Agency Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="inline-flex items-center text-sm text-text-muted transition hover:text-text"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products & Company Column */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-text">
              Products &amp; Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.productsAndCompany.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="inline-flex items-center text-sm text-text-muted transition hover:text-text"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-text">
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
                  className="flex items-start gap-3 text-sm text-text-muted transition hover:text-text"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
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
                  className="flex items-start gap-3 text-sm text-text-muted transition hover:text-text"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
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
                  className="flex items-start gap-3 text-sm text-text-muted transition hover:text-text"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                  <span>WhatsApp Business ({COMPANY_ENTITY.phoneDisplay})</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                <span>{COMPANY_ENTITY.address.fullDisplay}</span>
              </li>
              <li className="flex items-start gap-3 text-xs text-text-muted">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                <span>{COMPANY_ENTITY.operatingHoursDisplay}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Consent Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {COMPANY_ENTITY.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy-policy/"
              prefetch={false}
              className="text-xs text-text-muted transition hover:text-text"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms/"
              prefetch={false}
              className="text-xs text-text-muted transition hover:text-text"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie-policy/"
              prefetch={false}
              className="text-xs text-text-muted transition hover:text-text"
            >
              Cookie Policy
            </Link>
            <button
              type="button"
              onClick={openCookieSettingsModal}
              className="cursor-pointer text-xs text-text-muted underline transition hover:text-text"
            >
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
