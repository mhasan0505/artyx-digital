import { ScrollReveal } from "./scroll-reveal";

const TESTIMONIALS = [
  {
    quote:
      "Artyx designed a crisp geometric monogram, dual-tone color system, and 4-plate brand guideline that works cleanly from Dhaka retail signage to online channels.",
    initials: "LP",
    name: "Laptop Point BD",
    company: "Electronics Retail · Brand Identity System",
  },
  {
    quote:
      "From the flowing monogram to our 5-page packaging and color specifications, the team delivered a complete identity ready for garment tags and social commerce.",
    initials: "SZ",
    name: "Sansli by Zebin",
    company: "Fashion & Apparel · Visual Identity",
  },
  {
    quote:
      "Having web engineering, brand design, and operational POS & OMS software under one Dhaka team meant written scope clarity and zero vendor handoff friction.",
    initials: "MR",
    name: "Mètisse & Retail Partners",
    company: "Hospitality & Commerce · Web & Systems",
  },
];

export function AgencyTestimonials() {
  return (
    <section
      id="testimonials"
      className="section-pad border-b border-[#DDE3F5] bg-[#FFFFFF]"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <ScrollReveal variant="heading" className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium tracking-[0.08em] text-[#1A56DB]">
            Client Proof
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-[#0D1333] sm:text-4xl lg:text-[48px]">
            What Clients Say
          </h2>
        </ScrollReveal>

        {/* Staggered 3-Card Row */}
        <ScrollReveal
          variant="grid"
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((item) => (
            <blockquote
              key={item.name}
              className="flex flex-col justify-between rounded-[16px] border border-[#DDE3F5] bg-[#FFFFFF] p-9 shadow-[0_4px_24px_rgba(26,86,219,0.08)] transition-shadow duration-250 hover:shadow-[0_8px_32px_rgba(26,86,219,0.14)]"
            >
              <div>
                {/* Syne 800, 80px, --color-primary, opacity 0.12, line-height 0.8 */}
                <div
                  aria-hidden="true"
                  className="font-display text-[80px] leading-[0.8] font-extrabold text-[#1A56DB] opacity-[0.12] select-none"
                >
                  &ldquo;
                </div>

                <p className="mt-3 text-[15px] leading-[1.7] italic text-[#3D4A6B]">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Bottom 48px Circle Gradient Avatar + Name + Company */}
              <footer className="mt-7 flex items-center gap-3.5 border-t border-[#DDE3F5] pt-5">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #1A56DB, #00C2FF)",
                  }}
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-display truncate text-sm font-semibold text-[#0D1333]">
                    {item.name}
                  </div>
                  <div className="truncate text-xs text-[#8A9BC4]">
                    {item.company}
                  </div>
                </div>
              </footer>
            </blockquote>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
