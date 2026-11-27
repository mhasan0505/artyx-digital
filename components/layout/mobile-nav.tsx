"use client";

import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ label: string; href: string }>;
}

export function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#FFFFFF] px-6 lg:hidden"
    >
      <nav
        aria-label="Mobile navigation"
        className="flex flex-col items-center gap-6 text-center"
      >
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="font-display text-3xl font-bold text-[#0D1333] transition-colors hover:text-[#1A56DB]"
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="/#contact"
          onClick={onClose}
          className="btn-primary mt-4 inline-flex min-w-[200px] items-center justify-center px-8 py-3.5 text-base font-semibold"
        >
          Get a Quote
        </Link>
      </nav>
    </div>
  );
}
