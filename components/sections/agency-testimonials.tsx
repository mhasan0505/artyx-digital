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
      className="border-t border-[#1E2D5A]/60 bg-[#05091A] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Centered Header */}
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-medium text-[#00C2FF]">Client Proof</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-[48px]">
              What Clients Say
            </h2>
          </div>

          {/* 3 Testimonial Cards in a Row */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <blockquote
                key={item.name}
                className="glass-card flex flex-col justify-between p-7"
              >
                <div>
                  {/* Large Opening Quote Mark in Cyan, Faded */}
                  <div
                    aria-hidden="true"
                    className="font-display text-6xl leading-none font-extrabold text-[#00C2FF] opacity-30 select-none"
                  >
                    &ldquo;
                  </div>

                  <p className="mt-2 text-[15px] leading-relaxed italic text-white/95">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Avatar + Name + Company */}
                <footer className="mt-7 flex items-center gap-3.5 border-t border-[#1E2D5A]/80 pt-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1A56DB] to-[#00C2FF] font-display text-sm font-bold text-white">
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display truncate text-sm font-semibold text-white">
                      {item.name}
                    </div>
                    <div className="truncate text-xs text-[#8A9BC4]">
                      {item.company}
                    </div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
