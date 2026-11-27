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
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#05091A]/85 backdrop-blur-[20px] border-b border-[#1E2D5A]/80 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-6">
            {/* Left: Artyx Logo at 140px wide */}
            <Link
              href="/"
              className="relative z-50 inline-flex shrink-0 items-center transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00C2FF]"
            >
              <img
                src="/logo-dark.webp"
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
                  className="text-sm font-medium text-[#8A9BC4] transition-colors duration-200 hover:text-[#00C2FF]"
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
              className="lg:hidden relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#1E2D5A] bg-[#0D1333]/80 text-white transition hover:border-[#00C2FF] hover:text-[#00C2FF]"
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
