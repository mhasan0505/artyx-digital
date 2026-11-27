import { ScrollReveal } from "./scroll-reveal";

const CONTACT_EMAIL = "hello@artyx.digital";
const WHATSAPP_URL = "https://wa.me/8801732549551";

const TEAM_MEMBERS = [
  {
    initials: "MH",
    name: "Mahmudul Hasan",
    role: "Founder & Lead Developer",
    bio: "Full-stack engineer and builder behind Artyx's web platforms, POS, and OMS products.",
    gradient: "from-[#1A56DB] via-[#0F2A7A] to-[#00C2FF]",
  },
  {
    initials: "CD",
    name: "Brand & Creative Desk",
    role: "Creative Direction & Identity",
    bio: "Visual identity systems, packaging, UI/UX architecture and campaign direction crafted in Dhaka.",
    gradient: "from-[#0D1333] via-[#1A56DB] to-[#00C2FF]",
  },
  {
    initials: "GM",
    name: "Growth & SEO Desk",
    role: "Digital Marketing Lead",
    bio: "Paid acquisition, technical SEO, analytics attribution and conversion strategy built for ROI.",
    gradient: "from-[#00C2FF]/80 via-[#1A56DB] to-[#0D1333]",
  },
];

export function AgencyTeam() {
  return (
    <section id="team" className="bg-[#05091A] py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Left-Aligned Header */}
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#00C2FF]">The People</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-[48px]">
              Meet the Team
            </h2>
          </div>

          {/* 3-Column Team Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.name}
                className="glass-card glass-card-hover overflow-hidden p-5"
              >
                {/* Square Gradient Initials Placeholder */}
                <div
                  className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[12px] border border-[#1E2D5A] bg-gradient-to-br ${member.gradient}`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#05091A]/25"
                  />
                  <span className="font-display relative z-10 text-5xl font-extrabold tracking-tight text-white/95 sm:text-6xl">
                    {member.initials}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-5">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#00C2FF]">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#8A9BC4]">
                    {member.bio}
                  </p>

                  {/* Social Icons Row (Inline SVG, Cyan on Hover) */}
                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      aria-label={`Email ${member.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#1E2D5A] bg-[#111B40]/70 text-[#8A9BC4] transition-colors hover:border-[#00C2FF] hover:text-[#00C2FF]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Connect with ${member.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#1E2D5A] bg-[#111B40]/70 text-[#8A9BC4] transition-colors hover:border-[#00C2FF] hover:text-[#00C2FF]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
