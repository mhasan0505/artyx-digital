import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";

const CAPABILITIES = [
  "Custom Web & Software",
  "Brand Strategy & Identity",
  "Artyx POS & OMS Products",
  "Social Media & E-commerce",
  "Performance & SEO Growth",
  "Ongoing Engineering Retainers",
];

const FLOATING_CARDS = [
  {
    title: "Founded in Dhaka · Global Delivery",
    subtitle:
      "Mirpur-based engineering and creative studio partnering with local & international brands",
    offset: "lg:-translate-x-3",
  },
  {
    title: "50+ Clients · 120+ Projects",
    subtitle:
      "Proven delivery across websites, brand systems, and full-funnel digital campaigns",
    offset: "lg:translate-x-4",
  },
  {
    title: "Build. Launch. Grow.",
    subtitle:
      "Design, custom software, owned POS/OMS products, and marketing under one roof",
    offset: "lg:-translate-x-1",
  },
];

export function AgencyAbout() {
  return (
    <section
      id="about"
      className="overflow-hidden border-b border-[#DDE3F5] bg-[#F5F7FF] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Narrative + 2-Column Bullets with Vertical Blue Bar */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="heading">
              <p className="text-[13px] font-medium tracking-[0.08em] text-[#1A56DB]">
                About Artyx
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold text-[#0D1333] sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
                A Studio That Thinks Like a Business Partner
              </h2>
            </ScrollReveal>

            <p className="mt-5 text-[15px] leading-[1.7] text-[#3D4A6B] sm:text-base">
              We&apos;re not just an agency — we&apos;re builders. Artyx Digital
              was founded in Dhaka with one goal: help businesses grow through
              design, technology and smart marketing. Alongside client websites
              and brand systems, we engineer our own Artyx POS and Order
              Management Software for startups, SMEs and retail brands across
              Bangladesh and beyond.
            </p>

            {/* Two Columns of Bullet Points with 2px x 16px Vertical Blue Accent Bar */}
            <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {CAPABILITIES.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-[#0D1333]"
                >
                  <span
                    aria-hidden="true"
                    className="h-4 w-[2px] shrink-0 rounded-full bg-[#1A56DB]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/#process"
                className="text-sm font-semibold text-[#1A56DB] underline-offset-4 transition-colors hover:text-[#1240B0] hover:underline"
              >
                Learn more about how we work →
              </Link>
              <Link
                href="/#contact"
                className="text-sm font-medium text-[#3D4A6B] transition-colors hover:text-[#1A56DB]"
              >
                Request a POS / OMS Demo →
              </Link>
            </div>
          </div>

          {/* Right: Stacked White Floating Info Cards (no glassmorphism) */}
          <ScrollReveal variant="grid" className="space-y-4 lg:col-span-5">
            {FLOATING_CARDS.map((card, idx) => (
              <div
                key={card.title}
                className={`light-card light-card-hover p-6 ${card.offset}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF2FF]"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        idx === 1 ? "bg-[#00C2FF]" : "bg-[#1A56DB]"
                      }`}
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#0D1333] sm:text-lg">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#3D4A6B] sm:text-sm">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
