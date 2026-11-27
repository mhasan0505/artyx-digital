"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileNav } from "./mobile-nav";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] transition-shadow duration-200 ${
          isScrolled ? "shadow-[0_1px_0_#DDE3F5]" : ""
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-6">
            {/* Left: Original logo.webp on white background */}
            <Link
              href="/"
              className="relative z-50 inline-flex shrink-0 items-center transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A56DB]"
            >
              <img
                src="/logo.webp"
                alt="Artyx Digital"
                width={817}
                height={109}
                className="w-[140px] h-auto object-contain"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </Link>

            {/* Center: Section Anchor Links */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-8"
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-[#3D4A6B] transition-colors duration-200 hover:text-[#1A56DB]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right: Get a Quote CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/#contact"
                className="btn-primary inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#DDE3F5] bg-[#FFFFFF] text-[#0D1333] transition hover:border-[#1A56DB] hover:text-[#1A56DB]"
            >
              {mobileOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
}
