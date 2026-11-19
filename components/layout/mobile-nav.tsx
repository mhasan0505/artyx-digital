"use client";

import { trackAnalyticsEvent } from "@/lib/analytics/events";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_NAV_ITEMS, SERVICE_NAV_ITEMS } from "./navbar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-bg/80 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-200 animate-in fade-in"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className="fixed top-0 right-0 bottom-0 w-88 max-w-[90vw] bg-bg border-l border-border z-50 lg:hidden overflow-y-auto transition-transform duration-250 ease-out animate-in slide-in-from-right"
      >
        <div className="flex flex-col min-h-full pt-20 pb-8 px-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <Link href="/" prefetch={false} onClick={onClose} className="inline-flex items-center">
              <Image
                src="/logo-compact-for-dark-bg.png"
                alt="Artyx Digital"
                width={110}
                height={36}
                className="h-8 w-auto object-contain block dark:block light:hidden"
              />
              <Image
                src="/logo-compact-for-light-bg.png"
                alt="Artyx Digital"
                width={110}
                height={36}
                className="h-8 w-auto object-contain hidden dark:hidden light:block"
              />
            </Link>
            <ThemeToggle />
          </div>
          <nav aria-label="Mobile navigation" className="space-y-6">
            <div className="space-y-1">
              <Link
                href="/"
                prefetch={false}
                onClick={onClose}
                className="block py-2 text-base font-semibold text-text hover:text-accent-text"
              >
                Home
              </Link>
              <Link
                href="/work/"
                prefetch={false}
                onClick={onClose}
                className="block py-2 text-base font-semibold text-text hover:text-accent-text"
              >
                Our Work
              </Link>
              <Link
                href="/about/"
                prefetch={false}
                onClick={onClose}
                className="block py-2 text-base font-semibold text-text hover:text-accent-text"
              >
                About
              </Link>
              <Link
                href="/insights/"
                prefetch={false}
                onClick={onClose}
                className="block py-2 text-base font-semibold text-text hover:text-accent-text"
              >
                Insights
              </Link>
              <Link
                href="/contact/"
                prefetch={false}
                onClick={onClose}
                className="block py-2 text-base font-semibold text-text hover:text-accent-text"
              >
                Let&apos;s Talk
              </Link>
            </div>

            {/* Products Section */}
            <div className="pt-4 border-t border-border">
              <Link
                href="/products/"
                prefetch={false}
                onClick={onClose}
                className="block text-xs font-semibold uppercase tracking-wider text-accent-text mb-3"
              >
                Owned Software Products →
              </Link>
              <div className="space-y-2">
                {PRODUCT_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={onClose}
                    className="block p-3 rounded-xl bg-surface border border-border hover:border-accent-text"
                  >
                    <div className="text-sm font-semibold text-text">
                      {item.label}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5">
                      {item.desc}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div className="pt-4 border-t border-border">
              <Link
                href="/services/"
                prefetch={false}
                onClick={onClose}
                className="block text-xs font-semibold uppercase tracking-wider text-accent-text mb-3"
              >
                Agency Services →
              </Link>
              <div className="space-y-1.5">
                {SERVICE_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={onClose}
                    className="block py-2 px-3 rounded-lg text-sm text-text-muted hover:text-text hover:bg-surface-2"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-border space-y-3">
            <Link
              href="/start-a-project/"
              prefetch={false}
              onClick={() => {
                trackAnalyticsEvent("cta_click", {
                  cta_name: "Start a Project",
                  cta_location: "mobile_nav",
                });
                onClose();
              }}
              className="btn-primary block w-full py-3.5 text-center text-sm font-bold"
            >
              Start a Project
            </Link>
            <Link
              href="/request-demo/"
              prefetch={false}
              onClick={() => {
                trackAnalyticsEvent("cta_click", {
                  cta_name: "Request a Product Demo",
                  cta_location: "mobile_nav",
                });
                onClose();
              }}
              className="btn-secondary block w-full py-3.5 text-center text-sm font-semibold"
            >
              Request a POS / OMS Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
