"use client";

import { trackAnalyticsEvent } from "@/lib/analytics/events";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export const SERVICE_NAV_ITEMS = [
  {
    label: "Web Development",
    href: "/services/web-development/",
    desc: "Business websites, landing pages & web apps",
  },
  {
    label: "E-commerce Website Development",
    href: "/services/ecommerce-website-development/",
    desc: "Online stores, catalogues & mobile checkout",
  },
  {
    label: "Custom Software Development",
    href: "/services/custom-software/",
    desc: "Internal systems, dashboards & automation",
  },
  {
    label: "SaaS Development",
    href: "/services/saas-development/",
    desc: "Scalable multi-user software products",
  },
  {
    label: "SEO & Digital Marketing",
    href: "/services/digital-marketing/",
    desc: "Technical SEO, content strategy & paid growth",
  },
  {
    label: "Branding & Creative",
    href: "/services/branding/",
    desc: "Logos, visual identity & brand guidelines",
  },
] as const;

export const PRODUCT_NAV_ITEMS = [
  {
    label: "POS Software",
    href: "/products/pos/",
    desc: "Counter sales, SKU inventory & retail reporting",
  },
  {
    label: "Order Management System (OMS)",
    href: "/products/order-management/",
    desc: "Social & website order workflow for online sellers",
  },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "products" | null>(
    null,
  );
  const navRef = useRef<HTMLElement>(null);

  // Prefetch route on hover/focus to keep initial page load featherweight while navigation remains instantaneous
  const handlePrefetch = useCallback((href: string) => {
    try {
      router.prefetch(href);
    } catch {
      // ignore
    }
  }, [router]);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg/95 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10"
            : "bg-bg/90 backdrop-blur-md border-b border-border/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo (Theme-aware, ~40px, no extra badge wrapper) */}
            <Link
              href="/"
              onMouseEnter={() => handlePrefetch("/")}
              onFocus={() => handlePrefetch("/")}
              className="relative z-50 flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text rounded-lg group"
            >
              <img
                src="/logo-compact-for-dark-bg.webp"
                alt="Artyx Digital"
                width={124}
                height={40}
                className="h-10 w-auto object-contain block dark:block light:hidden"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
              <img
                src="/logo-compact-for-light-bg.webp"
                alt="Artyx Digital"
                width={124}
                height={40}
                className="h-10 w-auto object-contain hidden dark:hidden light:block"
                fetchPriority="low"
                loading="lazy"
                decoding="async"
              />
            </Link>

            {/* Desktop Navigation: Services, Products, Our Work, About, Insights */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-1.5"
            >
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setOpenDropdown("services");
                  handlePrefetch("/services/");
                }}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-center">
                  <Link
                    href="/services/"
                    prefetch={false}
                    onMouseEnter={() => handlePrefetch("/services/")}
                    onFocus={() => handlePrefetch("/services/")}
                    className={`pl-3.5 pr-1.5 py-2 rounded-l-lg text-sm font-medium transition-colors ${
                      pathname?.startsWith("/services")
                        ? "text-text bg-surface-2 font-semibold"
                        : "text-text-muted hover:text-text hover:bg-surface-2"
                    }`}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    aria-expanded={openDropdown === "services"}
                    aria-haspopup="true"
                    aria-label="Toggle Services menu"
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === "services" ? null : "services",
                      )
                    }
                    className="pr-2.5 pl-1 py-2 rounded-r-lg text-text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-accent-text"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === "services" ? "rotate-180 text-accent-text" : ""
                      }`}
                    />
                  </button>
                </div>

                {openDropdown === "services" && (
                  <div
                    role="menu"
                    aria-label="Services submenu"
                    className="absolute top-full left-0 pt-2 w-80 z-50"
                  >
                    <div className="rounded-2xl bg-surface border border-border shadow-2xl p-2 space-y-1">
                      <Link
                        href="/services/"
                        role="menuitem"
                        prefetch={false}
                        onMouseEnter={() => handlePrefetch("/services/")}
                        onFocus={() => handlePrefetch("/services/")}
                        className="block px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border hover:border-accent-text transition-colors"
                      >
                        <div className="text-xs font-semibold uppercase tracking-wider text-accent-text">
                          All Agency Services →
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">
                          Overview of our 3 connected pillars
                        </div>
                      </Link>
                      {SERVICE_NAV_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          prefetch={false}
                          onMouseEnter={() => handlePrefetch(item.href)}
                          onFocus={() => handlePrefetch(item.href)}
                          className="block px-3.5 py-2.5 rounded-xl hover:bg-surface-2 transition-colors group"
                        >
                          <div className="text-sm font-medium text-text group-hover:text-accent-text">
                            {item.label}
                          </div>
                          <div className="text-xs text-text-muted mt-0.5">
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setOpenDropdown("products");
                  handlePrefetch("/products/");
                }}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-center">
                  <Link
                    href="/products/"
                    prefetch={false}
                    onMouseEnter={() => handlePrefetch("/products/")}
                    onFocus={() => handlePrefetch("/products/")}
                    className={`pl-3.5 pr-1.5 py-2 rounded-l-lg text-sm font-medium transition-colors ${
                      pathname?.startsWith("/products")
                        ? "text-text bg-surface-2 font-semibold"
                        : "text-text-muted hover:text-text hover:bg-surface-2"
                    }`}
                  >
                    Products
                  </Link>
                  <button
                    type="button"
                    aria-expanded={openDropdown === "products"}
                    aria-haspopup="true"
                    aria-label="Toggle Products menu"
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === "products" ? null : "products",
                      )
                    }
                    className="pr-2.5 pl-1 py-2 rounded-r-lg text-text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-accent-text"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === "products" ? "rotate-180 text-accent-text" : ""
                      }`}
                    />
                  </button>
                </div>

                {openDropdown === "products" && (
                  <div
                    role="menu"
                    aria-label="Products submenu"
                    className="absolute top-full left-0 pt-2 w-80 z-50"
                  >
                    <div className="rounded-2xl bg-surface border border-border shadow-2xl p-2 space-y-1">
                      <Link
                        href="/products/"
                        role="menuitem"
                        prefetch={false}
                        onMouseEnter={() => handlePrefetch("/products/")}
                        onFocus={() => handlePrefetch("/products/")}
                        className="block px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border hover:border-accent-text transition-colors"
                      >
                        <div className="text-xs font-semibold uppercase tracking-wider text-accent-text">
                          All Business Software Products →
                        </div>
                        <div className="text-xs text-text-muted mt-0.5">
                          Compare POS vs. Order Management (OMS)
                        </div>
                      </Link>
                      {PRODUCT_NAV_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          prefetch={false}
                          onMouseEnter={() => handlePrefetch(item.href)}
                          onFocus={() => handlePrefetch(item.href)}
                          className="block px-3.5 py-2.5 rounded-xl hover:bg-surface-2 transition-colors group"
                        >
                          <div className="text-sm font-medium text-text group-hover:text-accent-text">
                            {item.label}
                          </div>
                          <div className="text-xs text-text-muted mt-0.5">
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                      <div className="pt-1 border-t border-border">
                        <Link
                          href="/request-demo/"
                          role="menuitem"
                          prefetch={false}
                          onMouseEnter={() => handlePrefetch("/request-demo/")}
                          onFocus={() => handlePrefetch("/request-demo/")}
                          className="block px-3.5 py-2 rounded-xl text-xs font-semibold text-accent-text hover:bg-surface-2 transition-colors"
                        >
                          Request a Live Product Demo →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/work/"
                prefetch={false}
                onMouseEnter={() => handlePrefetch("/work/")}
                onFocus={() => handlePrefetch("/work/")}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname?.startsWith("/work")
                    ? "text-text bg-surface-2 font-semibold"
                    : "text-text-muted hover:text-text hover:bg-surface-2"
                }`}
              >
                Our Work
              </Link>

              <Link
                href="/about/"
                prefetch={false}
                onMouseEnter={() => handlePrefetch("/about/")}
                onFocus={() => handlePrefetch("/about/")}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname?.startsWith("/about")
                    ? "text-text bg-surface-2 font-semibold"
                    : "text-text-muted hover:text-text hover:bg-surface-2"
                }`}
              >
                About
              </Link>

              <Link
                href="/insights/"
                prefetch={false}
                onMouseEnter={() => handlePrefetch("/insights/")}
                onFocus={() => handlePrefetch("/insights/")}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname?.startsWith("/insights")
                    ? "text-text bg-surface-2 font-semibold"
                    : "text-text-muted hover:text-text hover:bg-surface-2"
                }`}
              >
                Insights
              </Link>
            </nav>

            {/* Primary CTA + Theme Toggle */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/start-a-project/"
                prefetch={false}
                onMouseEnter={() => handlePrefetch("/start-a-project/")}
                onFocus={() => handlePrefetch("/start-a-project/")}
                onClick={() =>
                  trackAnalyticsEvent("cta_click", {
                    cta_name: "Start a Project",
                    cta_location: "navbar",
                  })
                }
                className="btn-primary px-5 py-2.5 text-xs"
              >
                Start a Project
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden relative z-50 w-10 h-10 rounded-xl border border-border bg-surface flex items-center justify-center text-text focus-visible:outline-2 focus-visible:outline-accent-text"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
