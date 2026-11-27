import { ScrollReveal } from "./scroll-reveal";

const CONTACT_EMAIL = "hello@artyx.digital";
const WHATSAPP_URL = "https://wa.me/8801732549551";

const TEAM_MEMBERS = [
  {
    initials: "MH",
    name: "Mahmudul Hasan",
    role: "Founder & Lead Developer",
    bio: "Full-stack engineer and builder behind Artyx's web platforms, POS, and OMS products.",
  },
  {
    initials: "CD",
    name: "Brand & Creative Desk",
    role: "Creative Direction & Identity",
    bio: "Visual identity systems, packaging, UI/UX architecture and campaign direction crafted in Dhaka.",
  },
  {
    initials: "GM",
    name: "Growth & SEO Desk",
    role: "Digital Marketing Lead",
    bio: "Paid acquisition, technical SEO, analytics attribution and conversion strategy built for ROI.",
  },
];

export function AgencyTeam() {
  return (
    <section
      id="team"
      className="section-pad border-b border-[#DDE3F5] bg-[#F5F7FF]"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {/* Left-Aligned Header */}
        <ScrollReveal variant="heading" className="max-w-xl">
          <p className="text-[13px] font-medium tracking-[0.08em] text-[#1A56DB]">
            The People
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-[#0D1333] sm:text-4xl lg:text-[48px]">
            Meet the Team
          </h2>
        </ScrollReveal>

        {/* Staggered 3-Column Centered Team Cards */}
        <ScrollReveal
          variant="grid"
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.name}
              className="flex flex-col items-center rounded-[16px] border border-[#DDE3F5] bg-[#FFFFFF] p-9 text-center shadow-[0_4px_24px_rgba(26,86,219,0.10)] transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(26,86,219,0.18)]"
            >
              {/* 96px x 96px Double-Ringed Circle Avatar */}
              <div
                className="flex h-[96px] w-[96px] items-center justify-center rounded-full font-display text-[28px] font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #1A56DB 0%, #00C2FF 100%)",
                  boxShadow: "0 0 0 4px #EEF2FF, 0 0 0 6px #1A56DB",
                }}
              >
                {member.initials}
              </div>

              <h3 className="font-display mt-6 text-xl font-semibold text-[#0D1333]">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#1A56DB]">
                {member.role}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#3D4A6B]">
                {member.bio}
              </p>

              {/* Social Icons Row: --color-muted default, --color-primary on hover */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  aria-label={`Email ${member.name}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#DDE3F5] bg-[#F5F7FF] text-[#8A9BC4] transition-colors hover:border-[#1A56DB] hover:text-[#1A56DB]"
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#DDE3F5] bg-[#F5F7FF] text-[#8A9BC4] transition-colors hover:border-[#1A56DB] hover:text-[#1A56DB]"
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
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
