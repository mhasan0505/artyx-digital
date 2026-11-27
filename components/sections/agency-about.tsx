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
    title: "Mirpur, Dhaka · Bangladesh",
    subtitle: "Dhaka-grown studio shipping for local & global teams",
    rotation: "lg:-rotate-2 lg:-translate-x-4",
  },
  {
    title: "Owned Products · POS & OMS",
    subtitle: "Retail billing & social-commerce software built in-house",
    rotation: "lg:rotate-[1.5deg] lg:translate-x-5",
  },
  {
    title: "Build. Launch. Grow.",
    subtitle: "Design, software engineering & marketing under one roof",
    rotation: "lg:-rotate-1 lg:-translate-x-2",
  },
];

export function AgencyAbout() {
  return (
    <section
      id="about"
      className="overflow-hidden border-t border-[#1E2D5A]/60 bg-[#05091A] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: Narrative + 2-Column Bullets + CTA */}
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#00C2FF]">About Artyx</p>
              <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
                A Studio That Thinks Like a Business Partner
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#8A9BC4]">
                We&apos;re not just an agency — we&apos;re builders. Artyx
                Digital was founded in Dhaka with one goal: help businesses grow
                through design, technology and smart marketing. Alongside client
                websites and brand systems, we engineer our own Artyx POS and
                Order Management Software for startups, SMEs and retail brands
                across Bangladesh and beyond.
              </p>

              {/* Two Columns of Bullet Points with Cyan Dot Marker */}
              <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {CAPABILITIES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-medium text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="text-lg leading-none text-[#00C2FF]"
                    >
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link
                  href="/#process"
                  className="theme-link text-sm font-medium"
                >
                  Learn more about how we work →
                </Link>
                <Link
                  href="/#contact"
                  className="text-sm font-medium text-[#8A9BC4] transition-colors hover:text-[#00C2FF]"
                >
                  Request a POS / OMS Demo →
                </Link>
              </div>
            </div>

            {/* Right: Stacked Floating Glassmorphism Info Cards */}
            <div className="relative lg:col-span-5">
              {/* Subtle Ambient Glow Behind Stack */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(26, 86, 219, 0.3), transparent 60%), radial-gradient(circle at 75% 75%, rgba(0, 194, 255, 0.2), transparent 60%)",
                }}
              />

              <div className="relative space-y-4">
                {FLOATING_CARDS.map((card, idx) => (
                  <div
                    key={card.title}
                    className={`glass-card p-6 transition-all duration-300 hover:rotate-0 hover:translate-x-0 hover:border-[#00C2FF]/60 hover:shadow-[0_0_24px_rgba(0,194,255,0.18)] ${card.rotation}`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#00C2FF]/40 bg-[#111B40]"
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            idx === 1 ? "bg-[#1A56DB] ring-2 ring-[#00C2FF]/50" : "bg-[#00C2FF]"
                          }`}
                        />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-[#8A9BC4] sm:text-sm">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
