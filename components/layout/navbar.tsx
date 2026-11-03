"use client";

import { trackAnalyticsEvent } from "@/lib/analytics/events";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MobileNav } from "./mobile-nav";

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
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "products" | null>(
    null,
  );
  const navRef = useRef<HTMLElement>(null);

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
            ? "bg-[#0B1020]/95 backdrop-blur-xl border-b border-[#273248] shadow-lg"
            : "bg-[#0B1020]/90 backdrop-blur-md border-b border-[#273248]/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              href="/"
              className="relative z-50 flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4D7CFE] rounded-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center border border-white/10">
                <Image
                  src="/logo.png"
                  alt="Artyx Digital logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-[#F8FAFC] tracking-tight font-heading">
                Artyx<span className="text-[#4D7CFE]">Digital</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-1"
            >
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "text-white bg-white/10"
                    : "text-[#A7B0C0] hover:text-white hover:bg-white/5"
                }`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("services")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-center">
                  <Link
                    href="/services/"
                    className={`pl-3.5 pr-1.5 py-2 rounded-l-lg text-sm font-medium transition-colors ${
                      pathname?.startsWith("/services")
                        ? "text-white bg-white/10"
                        : "text-[#A7B0C0] hover:text-white hover:bg-white/5"
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
                    className="pr-2.5 pl-1 py-2 rounded-r-lg text-[#A7B0C0] hover:text-white focus-visible:outline-2 focus-visible:outline-[#4D7CFE]"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === "services" ? "rotate-180 text-[#4D7CFE]" : ""
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
                    <div className="rounded-2xl bg-[#121A2D] border border-[#273248] shadow-2xl p-2 space-y-1">
                      <Link
                        href="/services/"
                        role="menuitem"
                        className="block px-3.5 py-2.5 rounded-xl bg-[#0B1020]/60 border border-[#273248] hover:border-[#4D7CFE] transition-colors"
                      >
                        <div className="text-xs font-semibold uppercase tracking-wider text-[#4D7CFE]">
                          All Agency Services →
                        </div>
                        <div className="text-xs text-[#A7B0C0] mt-0.5">
                          Overview of our 3 connected pillars
                        </div>
                      </Link>
                      {SERVICE_NAV_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className="block px-3.5 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <div className="text-sm font-medium text-[#F8FAFC] group-hover:text-[#4D7CFE]">
                            {item.label}
                          </div>
                          <div className="text-xs text-[#A7B0C0] mt-0.5">
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
                onMouseEnter={() => setOpenDropdown("products")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-center">
                  <Link
                    href="/products/"
                    className={`pl-3.5 pr-1.5 py-2 rounded-l-lg text-sm font-medium transition-colors ${
                      pathname?.startsWith("/products")
                        ? "text-white bg-white/10"
                        : "text-[#A7B0C0] hover:text-white hover:bg-white/5"
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
                    className="pr-2.5 pl-1 py-2 rounded-r-lg text-[#A7B0C0] hover:text-white focus-visible:outline-2 focus-visible:outline-[#4D7CFE]"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === "products" ? "rotate-180 text-[#4D7CFE]" : ""
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
                    <div className="rounded-2xl bg-[#121A2D] border border-[#273248] shadow-2xl p-2 space-y-1">
                      <Link
                        href="/products/"
                        role="menuitem"
                        className="block px-3.5 py-2.5 rounded-xl bg-[#0B1020]/60 border border-[#273248] hover:border-[#4D7CFE] transition-colors"
                      >
                        <div className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
                          All Business Software Products →
                        </div>
                        <div className="text-xs text-[#A7B0C0] mt-0.5">
                          Compare POS vs. Order Management (OMS)
                        </div>
                      </Link>
                      {PRODUCT_NAV_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className="block px-3.5 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <div className="text-sm font-medium text-[#F8FAFC] group-hover:text-[#4D7CFE]">
                            {item.label}
                          </div>
                          <div className="text-xs text-[#A7B0C0] mt-0.5">
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                      <div className="pt-1 border-t border-[#273248]">
                        <Link
                          href="/request-demo/"
                          role="menuitem"
                          className="block px-3.5 py-2 rounded-xl text-xs font-semibold text-[#4D7CFE] hover:bg-[#4D7CFE]/10 transition-colors"
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
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname?.startsWith("/work")
                    ? "text-white bg-white/10"
                    : "text-[#A7B0C0] hover:text-white hover:bg-white/5"
                }`}
              >
                Our Work
              </Link>

              <Link
                href="/about/"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname?.startsWith("/about")
                    ? "text-white bg-white/10"
                    : "text-[#A7B0C0] hover:text-white hover:bg-white/5"
                }`}
              >
                About
              </Link>

              <Link
                href="/insights/"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname?.startsWith("/insights")
                    ? "text-white bg-white/10"
                    : "text-[#A7B0C0] hover:text-white hover:bg-white/5"
                }`}
              >
                Insights
              </Link>

              <Link
                href="/contact/"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname?.startsWith("/contact")
                    ? "text-white bg-white/10"
                    : "text-[#A7B0C0] hover:text-white hover:bg-white/5"
                }`}
              >
                Let&apos;s Talk
              </Link>
            </nav>

            {/* Primary & Secondary CTAs (Section 2.1) */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/products/"
                onClick={() =>
                  trackAnalyticsEvent("cta_click", {
                    cta_name: "Explore Products",
                    cta_location: "navbar",
                  })
                }
                className="px-4 py-2.5 rounded-xl border border-[#273248] bg-[#121A2D] text-[#F8FAFC] text-xs font-semibold hover:border-[#4D7CFE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D7CFE]"
              >
                Explore Products
              </Link>
              <Link
                href="/start-a-project/"
                onClick={() =>
                  trackAnalyticsEvent("cta_click", {
                    cta_name: "Start a Project",
                    cta_location: "navbar",
                  })
                }
                className="px-5 py-2.5 rounded-xl bg-[#4D7CFE] text-white text-xs font-semibold hover:bg-[#3b69eb] transition-colors shadow-md shadow-[#4D7CFE]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
              className="lg:hidden relative z-50 w-10 h-10 rounded-xl border border-[#273248] bg-[#121A2D] flex items-center justify-center text-[#F8FAFC] focus-visible:outline-2 focus-visible:outline-[#4D7CFE]"
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
