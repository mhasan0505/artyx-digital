import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

const serviceLinks = [
  { label: "Digital Marketing", href: "/#services" },
  { label: "Brand Identity", href: "/#services" },
  { label: "Web & App Development", href: "/#services" },
  { label: "Social Media Management", href: "/#services" },
  { label: "Video Production", href: "/#services" },
  { label: "SEO & Performance", href: "/#services" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1E2D5A] bg-[#05091A] text-white">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-3 lg:gap-12">
          {/* Col 1: White-wordmark logo-dark.webp + Tagline + Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/logo-dark.webp"
                alt="Artyx Digital"
                width={817}
                height={109}
                className="w-[148px] h-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <p className="font-display text-sm font-semibold tracking-wide text-[#00C2FF]">
              Build. Launch. Grow.
            </p>

            <p className="max-w-xs text-sm leading-relaxed text-[#8A9BC4]">
              360° creative and software agency in Dhaka — building websites,
              brands, and business software that drive growth.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8A9BC4] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8A9BC4] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#1E2D5A] py-6 text-xs text-[#8A9BC4] sm:flex-row">
          <p>© 2026 Artyx Digital</p>
          <p className="font-medium text-[#8A9BC4]">Made in Dhaka 🇧🇩</p>
        </div>
      </div>
    </footer>
  );
}
