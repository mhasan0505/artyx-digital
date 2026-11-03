"use client";

import { trackAnalyticsEvent } from "@/lib/analytics/events";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { PRODUCT_NAV_ITEMS, SERVICE_NAV_ITEMS } from "./navbar";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 right-0 bottom-0 w-88 max-w-[90vw] bg-[#0B1020] border-l border-[#273248] z-50 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col min-h-full pt-24 pb-8 px-6 space-y-6">
              <nav aria-label="Mobile navigation" className="space-y-6">
                <div className="space-y-1">
                  <Link
                    href="/"
                    onClick={onClose}
                    className="block py-2 text-base font-semibold text-[#F8FAFC] hover:text-[#4D7CFE]"
                  >
                    Home
                  </Link>
                  <Link
                    href="/work/"
                    onClick={onClose}
                    className="block py-2 text-base font-semibold text-[#F8FAFC] hover:text-[#4D7CFE]"
                  >
                    Our Work
                  </Link>
                  <Link
                    href="/about/"
                    onClick={onClose}
                    className="block py-2 text-base font-semibold text-[#F8FAFC] hover:text-[#4D7CFE]"
                  >
                    About
                  </Link>
                  <Link
                    href="/insights/"
                    onClick={onClose}
                    className="block py-2 text-base font-semibold text-[#F8FAFC] hover:text-[#4D7CFE]"
                  >
                    Insights
                  </Link>
                  <Link
                    href="/contact/"
                    onClick={onClose}
                    className="block py-2 text-base font-semibold text-[#F8FAFC] hover:text-[#4D7CFE]"
                  >
                    Let&apos;s Talk
                  </Link>
                </div>

                {/* Products Section */}
                <div className="pt-4 border-t border-[#273248]">
                  <Link
                    href="/products/"
                    onClick={onClose}
                    className="block text-xs font-semibold uppercase tracking-wider text-[#8B5CF6] mb-3"
                  >
                    Owned Software Products →
                  </Link>
                  <div className="space-y-2">
                    {PRODUCT_NAV_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="block p-3 rounded-xl bg-[#121A2D] border border-[#273248] hover:border-[#4D7CFE]"
                      >
                        <div className="text-sm font-semibold text-[#F8FAFC]">
                          {item.label}
                        </div>
                        <div className="text-xs text-[#A7B0C0] mt-0.5">
                          {item.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Services Section */}
                <div className="pt-4 border-t border-[#273248]">
                  <Link
                    href="/services/"
                    onClick={onClose}
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4D7CFE] mb-3"
                  >
                    Agency Services →
                  </Link>
                  <div className="space-y-1.5">
                    {SERVICE_NAV_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="block py-2 px-3 rounded-lg text-sm text-[#A7B0C0] hover:text-white hover:bg-white/5"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="mt-auto pt-6 border-t border-[#273248] space-y-3">
                <Link
                  href="/start-a-project/"
                  onClick={() => {
                    trackAnalyticsEvent("cta_click", {
                      cta_name: "Start a Project",
                      cta_location: "mobile_nav",
                    });
                    onClose();
                  }}
                  className="block w-full py-3.5 rounded-xl bg-[#4D7CFE] text-white text-center text-sm font-semibold hover:bg-[#3b69eb]"
                >
                  Start a Project
                </Link>
                <Link
                  href="/request-demo/"
                  onClick={() => {
                    trackAnalyticsEvent("cta_click", {
                      cta_name: "Request a Product Demo",
                      cta_location: "mobile_nav",
                    });
                    onClose();
                  }}
                  className="block w-full py-3.5 rounded-xl border border-[#273248] bg-[#121A2D] text-[#F8FAFC] text-center text-sm font-semibold hover:border-[#4D7CFE]"
                >
                  Request a POS / OMS Demo
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
