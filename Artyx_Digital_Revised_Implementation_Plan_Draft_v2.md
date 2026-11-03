# Artyx Digital Website Implementation Plan — Draft v2

**Document status:** Draft v2 — decisions and implementation specification  
**Prepared:** 30 October 2026  
**Planning baseline:** Two releases over approximately 10–16 weeks  
**Markets:** Bangladesh first, international enquiries supported from Release 1  
**Business scope:** Agency services and Artyx-owned POS and Order Management System (OMS)  
**Positioning:** **Build Better. Operate Smarter. Grow Faster.**

> **Status note:** This is a developer-oriented specification with recommended provider defaults, example contracts, a database migration, task estimates, and decision gates. It is not a claim that the existing repository, accounts, product features, or integrations have already been inspected or provisioned. Items requiring an Artyx owner’s approval are explicitly marked below.

---

## 0. Decisions resolved in Draft v2

| Topic | Draft v2 decision |
|---|---|
| Homepage H1 | **Build Better. Operate Smarter. Grow Faster.** |
| E-commerce SEO page | Dedicated `/services/ecommerce-website-development/` page |
| Demo URL | `/request-demo/`; `/book-a-demo/` redirects to it if already live |
| Legal routes | `/privacy-policy/`, `/terms/`, and `/cookie-policy/` |
| Next.js / React | Next.js 16.x Active LTS + React 19.3.x; pin exact patch versions in the lockfile |
| POS / OMS schema | `SoftwareApplication` as semantic structured data; do not fabricate ratings/offers to pursue a rich result |
| Language for Release 1 | English; architecture and font stack prepared for Bangla |
| Bangla release | `/bn/` localized routes in Release 2, once translations can be maintained |
| Trailing slash | `trailingSlash: true`; use trailing slashes consistently for page routes |
| Primary data store | Supabase Postgres, Singapore region, subject to privacy/data-residency review |
| Hosting | Vercel Pro, with application functions placed in Singapore where supported |
| CRM / lead workspace | HubSpot Free initially; database remains the authoritative lead record |
| Transactional email | Resend |
| Bot protection | Cloudflare Turnstile, verified server-side |
| Internal lead alert | Telegram bot message containing minimal information and a CRM link; no lead message, phone or email in Telegram |
| Lead delivery reliability | Database outbox + retry worker using Vercel Cron |
| Phone parsing | `libphonenumber-js`; store normalized E.164 values |
| Consent | First-party consent banner; optional analytics/advertising tags off by default until the relevant consent is recorded |
| Pricing presentation | Approved “from” pricing in BDT for Bangladesh and USD for international offers where pricing is genuinely standardized; custom work uses “Request a quote” |
| Launch strategy | Release 1 conversion MVP; Release 2 proof, content depth, Bangla and advanced growth integrations |

The choices above are defaults for planning. Provider account ownership, legal wording, actual prices, product claims, and customer-facing statements still require approval by the assigned Artyx owner.

---

# Part A — Product and Website Scope

## 1. Business goals

The website must serve two connected business goals:

1. Generate qualified enquiries for web development, e-commerce website development, custom software, SaaS development, SEO, digital marketing, branding, and creative services.
2. Generate qualified demo requests and product enquiries for Artyx POS and OMS.

It must explain the difference between a service engagement and a product demo, demonstrate genuine evidence, capture leads reliably, and support search discovery in Bangladesh and international markets.

### 1.1 Primary audience groups

**Agency services**
- Businesses that need a new or improved website or e-commerce experience
- Businesses that need custom software, SaaS, workflow automation, or internal systems
- Businesses that need SEO, digital marketing, branding, or creative support

**POS**
- Retailers and shop owners who need to manage sales, inventory, staff, and reporting
- Multi-outlet businesses only where the actual product supports multi-location workflows

**OMS**
- Facebook and Instagram commerce sellers
- E-commerce businesses and online retailers handling orders across channels
- Teams that need a clearer process for order intake, confirmation, processing, and fulfilment

### 1.2 Company positioning

Use a consistent, factual company description across the website and legitimate external profiles:

> Artyx Digital is a Dhaka-based digital technology and growth company offering web development, e-commerce development, custom software, POS, order management, branding, and digital marketing services.

The company owner must approve this description and confirm that each listed service is currently offered.

### 1.3 Success metrics

Track business outcomes rather than page views alone:

- Qualified service enquiries
- POS demo requests
- OMS demo requests
- Leads contacted within the response SLA
- Qualified leads and meetings/demos completed
- Proposals sent and opportunities won
- Organic non-brand clicks to commercial pages
- Organic conversions by landing page
- Campaign-assisted qualified leads
- Lead delivery failures and recovery time

---

## 2. Information architecture

### 2.1 Primary navigation

- Home
- Services
- Products
- Our Work
- About
- Insights
- Let's Talk

**Services dropdown**
- Web Development
- E-commerce Website Development
- Custom Software Development
- SaaS Development
- SEO & Digital Marketing
- Branding & Creative

**Products dropdown**
- POS Software
- Order Management System (OMS)

### 2.2 Route list

| Page | Canonical route | Release |
|---|---|---|
| Homepage | `/` | R1 |
| Services overview | `/services/` | R1 |
| Web development | `/services/web-development/` | R1 |
| E-commerce website development | `/services/ecommerce-website-development/` | R1 |
| Digital marketing and SEO | `/services/digital-marketing/` | R1 |
| Custom software | `/services/custom-software/` | R2 |
| SaaS development | `/services/saas-development/` | R2 |
| Branding and creative | `/services/branding/` | R2 |
| Products overview | `/products/` | R1 |
| POS | `/products/pos/` | R1 |
| OMS | `/products/order-management/` | R1 |
| Work index | `/work/` | R2, unless verified work is ready for R1 |
| Case study | `/work/[slug]/` | R2 |
| Insights index | `/insights/` | R2 |
| Insight category | `/insights/category/[slug]/` | R2 |
| Insight article | `/insights/[slug]/` | R2 |
| Author profile | `/authors/[slug]/` | R2, only for genuine named authors |
| About | `/about/` | R1 |
| Contact | `/contact/` | R1 |
| Start a project | `/start-a-project/` | R1 |
| Request a demo | `/request-demo/` | R1 |
| Privacy policy | `/privacy-policy/` | R1 |
| Terms | `/terms/` | R1 |
| Cookie policy | `/cookie-policy/` | R1 |
| Bangla homepage and localized pages | `/bn/...` | R2 |

`/book-a-demo/` must not imply that a confirmed appointment has been booked. If this path already exists or has backlinks, issue a one-hop 301 redirect to `/request-demo/`. Only use a booking-oriented URL if a real calendar integration confirms available times and sends a booking confirmation.

### 2.3 Preserve existing URLs where possible

Do not rename routes solely for architectural neatness. Before migration:

1. Export current URLs from the sitemap, crawl, CMS, analytics, Search Console, and known backlinks.
2. Identify pages with impressions, clicks, links, or conversions.
3. Keep existing URLs where the content and intent remain the same.
4. Create a one-to-one 301 only when a genuinely equivalent replacement exists.
5. Update internal links to the final URL.
6. Avoid redirect chains, loops, and blanket redirects to the homepage.

Possible mappings such as `/portfolio/` to `/work/`, `/services/pos-software/` to `/products/pos/`, and `/blog/` to `/insights/` are conditional on the new page preserving the original intent. Do not redirect a content-creation page to a branding page if the offers are not equivalent.

### 2.4 Trailing slash rule

Use one convention for all HTML page routes:

```js
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default nextConfig;
```

Static assets and files retain their normal filenames. Canonicals, redirects, sitemap URLs, internal links, and route tests must all use the same convention. If the existing live site has a different established convention, the migration owner must decide whether preserving it is safer before this setting is merged.

---

## 3. Page content and conversion requirements

### 3.1 Homepage

**H1:** Build Better. Operate Smarter. Grow Faster.

Suggested section sequence:

1. Hero with concise explanation and two CTAs
2. Genuine trust evidence (approved clients, project facts, or product proof)
3. Services overview
4. POS and OMS product showcase
5. Selected verified work
6. Why Artyx
7. Delivery process
8. Approved testimonials
9. Recent insights (from R2)
10. Final CTA and contact details

Hero copy should explain that Artyx builds websites, e-commerce experiences, custom software, business systems, and digital growth programmes.

Primary CTA: **Start a Project**  
Secondary CTA: **Explore Our Work**

No zero-value counters, invented metrics, unapproved client logos, or unsupported claims. If verified numerical proof is unavailable, use an accurate process statement or real work sample.

### 3.2 POS page

Suggested H1: **Take Control of Your Sales, Inventory and Business Operations.**

Primary CTA: **Request a POS Demo**

Show only verified information:
- Target business types
- Actual workflows
- Real product screenshots, or visuals explicitly labelled “Illustrative”
- Confirmed capabilities and known limitations
- Supported devices and connectivity requirements
- Pricing or a clear pricing enquiry path
- Onboarding and support arrangements
- FAQs

Potential feature claims to verify include sales/billing, inventory, analytics, employee management, loyalty, multi-outlet support, offline operation, and support availability.

### 3.3 OMS page

Suggested H1: **Manage Every Online Order. Without the Chaos.**

Primary CTA: **Request an OMS Demo**

Explain:
- Intended users and business types
- Channels currently supported
- Order lifecycle from capture through fulfilment
- Live integrations and their limitations
- Real product screenshots and workflows
- Reporting, team roles, and automation, only where available
- Pricing/onboarding/support
- FAQs

Do not claim a courier, payment, social platform, marketplace, or website integration unless it is operational and supported.

### 3.4 Web development page

Suggested H1: **Business Websites Built to Support Your Next Stage of Growth.**

Cover business websites, corporate sites, landing pages, integrations, maintenance, performance, accessibility, and delivery process. Avoid duplicating the separate e-commerce page.

### 3.5 Dedicated e-commerce website development page

Suggested H1: **E-commerce Websites Designed to Turn Browsers into Buyers.**

This page has its own commercial search intent and must not be merged into the general web development page. Cover:
- E-commerce business models served
- Catalogue, product page, cart, checkout, payment and order workflows
- Shipping and fulfilment requirements
- Integrations actually supported by Artyx
- Platform expertise only where the team has verifiable experience
- Migration, maintenance, and optimization
- Case studies and demo/project CTA

### 3.6 Digital marketing and SEO page

Suggested H1: **Turn Your Digital Presence into a Customer Acquisition Channel.**

Explain strategy, technical SEO, content, paid campaigns, measurement, conversion optimization, and reporting. Do not guarantee Google positions, sales, leads, or a fixed ROI.

### 3.7 Case studies and portfolio integrity

For each published work item, record:
- Client/project name and permission to publish
- Relationship type: client project, in-house product/venture, internal concept, or collaboration
- Artyx's exact role and scope
- Project period
- Challenge and solution
- Verifiable deliverables
- Results with evidence, method, and measurement period
- Approved testimonial and attribution, if any

**Portfolio labelling rule:** If Laptop Point BD is owned or operated by Artyx, label it as an **in-house business/venture project**, not as an external client case study. Where Artyx delivered only part of a project, state the exact contribution. Never imply full ownership or sole delivery if that is not true.

If evidence or client permission is missing, omit the item from Release 1. Use no fabricated testimonials, client logos, percentages, or customer quotes.

### 3.8 About page

Verify founding date, company timeline, team names/roles/photos, office address, contact channels, company size, experience claims, awards, partnerships, and certifications. Do not publish placeholder team members or unverified milestones.

---

# Part B — Technical Decisions and Architecture

## 4. Recommended provider stack

These are the selected planning defaults. They require Artyx account-owner approval and account provisioning before production work.

| Layer | Selected default | Purpose | Notes |
|---|---|---|---|
| Framework | Next.js 16.x | App Router, pages, server routes | Active LTS; pin exact patch version |
| UI/runtime | React 19.3.x + TypeScript | UI and type safety | Pin exact versions and commit lockfile |
| Hosting | Vercel Pro | Preview/production deployment, CDN, cron | Commercial project should use a business-appropriate plan |
| Database | Supabase Pro / PostgreSQL | Persistent lead store | Select Singapore region after privacy review |
| CRM | HubSpot Free | Lead pipeline and team follow-up | Current free offering lists up to 2 users and 1,000 contacts; reassess if team/volume grows |
| Transactional email | Resend | Lead alerts and acknowledgement emails | Verify sender domain with SPF/DKIM; configure DMARC |
| Bot challenge | Cloudflare Turnstile | Form abuse reduction | Free plan is available; server-side Siteverify is mandatory |
| Internal alert | Telegram Bot API | Fast internal notification | Send lead ID and CRM link only; do not send PII |
| Phone parsing | `libphonenumber-js` | International validation and E.164 normalization | Do not use country-specific regex alone |
| Consent and tags | Google Tag Manager + first-party consent manager | GA4, Google Ads, Meta Pixel | Tags must follow consent categories |
| Error monitoring | Sentry | Application and worker errors | Add DSN only after project setup |
| Optional rate-limit store | Upstash Redis | Per-email/phone/IP counters | Use only if database-backed counters are insufficient |

### 4.1 Current vendor references and estimated recurring floor

Prices and free tiers can change; recheck at procurement and before renewal.

| Service | Public starting point checked 30 Oct 2026 | Budget treatment |
|---|---:|---|
| Vercel Pro | From US$20/month shown on public pricing page | Include in production baseline; usage/seat charges may apply |
| Supabase Pro | From US$25/month | Include in production baseline; usage/overages may apply |
| Resend | Free tier shown at 3,000 emails/month, 100/day; Pro shown at US$20/month for 50,000/month | Start free only if volume and daily cap fit; otherwise budget paid tier |
| HubSpot CRM | Free CRM currently lists up to 2 users and 1,000 contacts | No base CRM subscription initially; paid limits/features may be needed |
| Cloudflare Turnstile | Free plan available for most production applications | No planned baseline charge |
| Telegram | Bot API for internal notifications | No software budget assumed; operational controls still required |

**Indicative baseline:** approximately **US$45/month** for Vercel Pro plus Supabase Pro, before taxes, extra usage, email upgrades, mailbox/Workspace, domain renewal, monitoring, Redis, paid CRM features, and development labour. If Resend Pro is required, the listed baseline becomes approximately US$65/month before those additional costs. This is a planning estimate, not a quote.

### 4.2 Hosting and regional performance

- Use Vercel's global CDN for public assets and page delivery.
- Place server-side database-dependent functions in Singapore (`sin1`) where supported by the selected Vercel deployment configuration.
- Select Supabase's specific Singapore region (`ap-southeast-1`) if approved by the privacy/data-residency review.
- Keep application compute and primary database geographically aligned where practical.
- Measure real-user latency from Bangladesh, including Dhaka mobile networks and slower connections. Do not treat a Lighthouse score from a distant test server as proof of local performance.
- If international traffic becomes significant, evaluate caching, connection pooling, and read patterns before adding replicas or additional infrastructure.

Singapore is a proposed technical region, not a legal conclusion that all data may be transferred there. Supabase documents that project region determines primary data storage and that region selection alone is not proof of regulatory compliance.

### 4.3 Proposed repository structure

Adapt this structure to the actual repository; do not perform a disruptive rewrite without need.

```text
app/
  page.tsx
  services/
    page.tsx
    web-development/page.tsx
    ecommerce-website-development/page.tsx
    digital-marketing/page.tsx
    custom-software/page.tsx
    saas-development/page.tsx
    branding/page.tsx
  products/
    page.tsx
    pos/page.tsx
    order-management/page.tsx
  work/
    page.tsx
    [slug]/page.tsx
  insights/
    page.tsx
    category/[slug]/page.tsx
    [slug]/page.tsx
  authors/
    [slug]/page.tsx
  about/page.tsx
  contact/page.tsx
  start-a-project/page.tsx
  request-demo/page.tsx
  privacy-policy/page.tsx
  terms/page.tsx
  cookie-policy/page.tsx
  api/
    leads/route.ts
    cron/outbox/route.ts
  sitemap.ts
  robots.ts
  not-found.tsx

components/
  layout/
  navigation/
  sections/
  forms/
  consent/
  seo/
  ui/

lib/
  content/
  validation/
  database/
  leads/
  outbox/
  crm/
  email/
  notifications/
  analytics/
  attribution/
  security/

supabase/
  migrations/

tests/
  unit/
  integration/
  e2e/
```

---

## 5. Database design and migration

### 5.1 Principles

- PostgreSQL is the authoritative store for every submitted lead.
- The CRM is a sales workflow destination, not the only copy of a lead.
- Lead creation and outbox event creation must occur in one database transaction.
- Each delivery channel retries independently.
- Do not store raw IP addresses for lead management. If abuse correlation is needed, store a keyed HMAC hash with restricted retention.
- Do not store form content in analytics.
- Protect lead tables from public/anonymous access.

### 5.2 Initial SQL migration

Create `supabase/migrations/0001_create_leads_and_outbox.sql`:

```sql
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  idempotency_key uuid not null unique,

  lead_type text not null
    check (lead_type in ('general', 'service', 'pos_demo', 'oms_demo')),

  status text not null default 'new'
    check (status in ('new', 'assigned', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'spam')),

  name varchar(120) not null,
  email varchar(254) not null,
  phone_e164 varchar(20),
  country_code char(2),
  company varchar(160),
  service_slug varchar(100),
  preferred_contact_method text
    check (preferred_contact_method in ('email', 'phone', 'whatsapp')),

  details text not null,
  source_path varchar(500),
  landing_page varchar(1000),
  referrer varchar(1000),

  -- First-touch campaign attribution; captured only under the approved consent policy.
  first_utm_source varchar(200),
  first_utm_medium varchar(200),
  first_utm_campaign varchar(200),
  first_utm_term varchar(200),
  first_utm_content varchar(200),
  first_gclid varchar(500),
  first_fbclid varchar(500),
  first_touch_at timestamptz,

  -- Last-touch fields are useful for the converting visit.
  last_utm_source varchar(200),
  last_utm_medium varchar(200),
  last_utm_campaign varchar(200),
  last_utm_term varchar(200),
  last_utm_content varchar(200),
  last_gclid varchar(500),
  last_fbclid varchar(500),
  last_touch_at timestamptz,

  privacy_notice_version varchar(40) not null,
  privacy_notice_acknowledged boolean not null default false,
  marketing_opt_in boolean not null default false,
  marketing_opt_in_at timestamptz,

  -- HMAC hash only; never store the raw IP for routine lead processing.
  ip_hmac varchar(128),
  user_agent_family varchar(120),

  assigned_to varchar(160),
  first_response_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint leads_privacy_ack_check
    check (privacy_notice_acknowledged = true),
  constraint leads_marketing_timestamp_check
    check (
      (marketing_opt_in = false and marketing_opt_in_at is null)
      or
      (marketing_opt_in = true and marketing_opt_in_at is not null)
    )
);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create index if not exists leads_status_created_idx
  on public.leads (status, created_at desc);

create index if not exists leads_email_created_idx
  on public.leads (lower(email), created_at desc);

create index if not exists leads_type_created_idx
  on public.leads (lead_type, created_at desc);

create table if not exists public.lead_outbox (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,

  channel text not null
    check (channel in ('email', 'hubspot', 'telegram')),

  status text not null default 'pending'
    check (status in ('pending', 'processing', 'delivered', 'dead')),

  payload jsonb not null default '{}'::jsonb,
  attempts integer not null default 0 check (attempts >= 0),
  max_attempts integer not null default 8 check (max_attempts > 0),
  available_at timestamptz not null default now(),
  locked_until timestamptz,
  delivered_at timestamptz,
  provider_message_id varchar(300),
  last_error_code varchar(100),
  last_error_summary varchar(500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (lead_id, channel)
);

create index if not exists lead_outbox_ready_idx
  on public.lead_outbox (status, available_at)
  where status in ('pending', 'processing');

create index if not exists lead_outbox_lead_idx
  on public.lead_outbox (lead_id);

-- No browser/anonymous access to leads or outbox.
alter table public.leads enable row level security;
alter table public.lead_outbox enable row level security;

revoke all on table public.leads from anon, authenticated;
revoke all on table public.lead_outbox from anon, authenticated;
```

**Migration implementation notes**
- Apply migrations through the Supabase CLI or the team's established migration workflow; never edit production schema manually without recording a migration.
- `service_role` credentials bypass RLS and must remain server-only.
- The database transaction that inserts a lead must also insert one outbox row for each required channel.
- Use application code or a migration-managed trigger to update `updated_at`; choose one approach and test it.
- Do not store a full copy of a message in the Telegram outbox payload. The Telegram payload should contain lead ID, lead type, timestamp, and a link to the CRM record.
- If the company needs a formal consent audit, implement a separate immutable consent-event table in a follow-up migration after legal review. Do not infer consent from a checkbox that was not actually displayed and accepted.

### 5.3 Atomic lead creation

The API handler must use a database transaction:

1. Check `idempotency_key`.
2. If already present, return the existing accepted result without creating another lead.
3. Insert the lead.
4. Insert `email`, `hubspot`, and `telegram` outbox records.
5. Commit the transaction.
6. Return success to the visitor.
7. Let the worker deliver the outbox events asynchronously.

If the database transaction fails, return an error and do not claim that the enquiry was received. If an email/CRM/Telegram provider fails after commit, the lead remains saved and the outbox retries.

---

## 6. Form schemas and API contract

### 6.1 Form types

Use one discriminated-union API with four form types:
- `general`
- `service`
- `pos_demo`
- `oms_demo`

The form UI can be separate, but each submission must map to one of these types.

### 6.2 Zod schemas

Create `lib/validation/lead.ts`. The following is the required validation contract; adapt imports and TypeScript style to the installed Zod and phone-library versions.

```ts
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const phoneSchema = z.string().trim().max(40).optional().superRefine(
  (value, ctx) => {
    if (!value) return;

    const parsed = parsePhoneNumberFromString(value);
    if (!parsed || !parsed.isValid()) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a valid phone number with country code.",
      });
    }
  }
);

const attributionSchema = z.object({
  firstTouch: z.object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
    gclid: z.string().max(500).optional(),
    fbclid: z.string().max(500).optional(),
  }).optional(),
  lastTouch: z.object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
    gclid: z.string().max(500).optional(),
    fbclid: z.string().max(500).optional(),
  }).optional(),
  landingPage: z.string().url().max(1000).optional(),
  referrer: z.string().url().max(1000).optional(),
}).optional();

const commonFields = {
  idempotencyKey: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: phoneSchema,
  countryCode: z.string().length(2).toUpperCase().optional(),
  company: z.string().trim().max(160).optional(),
  details: z.string().trim().min(10).max(5000),
  preferredContactMethod: z.enum(["email", "phone", "whatsapp"]).default("email"),
  privacyNoticeAcknowledged: z.literal(true),
  privacyNoticeVersion: z.string().min(1).max(40),
  marketingOptIn: z.boolean().default(false),
  turnstileToken: z.string().min(1).max(4096),
  attribution: attributionSchema,
};

export const GeneralLeadSchema = z.object({
  ...commonFields,
  type: z.literal("general"),
}).strict();

export const ServiceLeadSchema = z.object({
  ...commonFields,
  type: z.literal("service"),
  serviceSlug: z.enum([
    "web-development",
    "ecommerce-website-development",
    "custom-software",
    "saas-development",
    "digital-marketing",
    "branding",
  ]),
}).strict();

export const PosDemoLeadSchema = z.object({
  ...commonFields,
  type: z.literal("pos_demo"),
  businessType: z.string().trim().min(2).max(120).optional(),
  outletCount: z.number().int().min(1).max(10000).optional(),
}).strict();

export const OmsDemoLeadSchema = z.object({
  ...commonFields,
  type: z.literal("oms_demo"),
  salesChannels: z.array(z.enum([
    "facebook",
    "instagram",
    "website",
    "marketplace",
    "other",
  ])).max(10).optional(),
  monthlyOrderBand: z.enum([
    "under_100",
    "100_500",
    "501_2000",
    "2001_10000",
    "over_10000",
    "not_sure",
  ]).optional(),
}).strict();

export const LeadSchema = z.discriminatedUnion("type", [
  GeneralLeadSchema,
  ServiceLeadSchema,
  PosDemoLeadSchema,
  OmsDemoLeadSchema,
]);

export type LeadInput = z.infer<typeof LeadSchema>;
```

Do not trust client-side validation. Repeat all validation on the server. Normalize phone numbers to E.164 before database insertion. If a phone is supplied without an international prefix, only interpret it when the user has selected a country; never assume every number is Bangladeshi.

### 6.3 Endpoint

`POST /api/leads/`

**Request content type:** `application/json`  
**Maximum request size:** 32 KB  
**Authentication:** Public form endpoint protected by origin checks, Turnstile, rate limiting, validation, and idempotency  
**Success:** `201 Created`

Example request:

```json
{
  "type": "service",
  "idempotencyKey": "8c3a1d43-e873-48da-86b2-c90ab41c80a9",
  "name": "Example Contact",
  "email": "contact@example.com",
  "phone": "+8801XXXXXXXXX",
  "countryCode": "BD",
  "company": "Example Retail",
  "serviceSlug": "ecommerce-website-development",
  "details": "We need an e-commerce website with product and order management.",
  "preferredContactMethod": "email",
  "privacyNoticeAcknowledged": true,
  "privacyNoticeVersion": "2026-10-v1",
  "marketingOptIn": false,
  "turnstileToken": "TURNSTILE_TOKEN",
  "attribution": {
    "firstTouch": {
      "source": "facebook",
      "medium": "paid_social",
      "campaign": "brand_launch",
      "fbclid": "CLICK_ID"
    },
    "lastTouch": {
      "source": "google",
      "medium": "cpc",
      "campaign": "ecommerce_search",
      "gclid": "CLICK_ID"
    },
    "landingPage": "https://artyx.digital/",
    "referrer": "https://www.google.com/"
  }
}
```

This is an illustrative payload. Do not place the sample contact details into production test data or analytics.

### 6.4 Success response

```json
{
  "success": true,
  "leadId": "6b2fe8ce-40c7-46ac-bb75-cf633b157d50",
  "message": "Your enquiry has been received. Our team will contact you within our stated business response window.",
  "requestId": "req_01J..."
}
```

For a repeat request with the same idempotency key, return `200 OK` with `success: true`, the same `leadId`, and `"duplicate": true`. Do not create a second lead.

### 6.5 Error contract

All error responses must use the same shape:

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Please review the highlighted fields.",
  "fieldErrors": {
    "email": "Enter a valid email address."
  },
  "requestId": "req_01J..."
}
```

| HTTP status | Error code | Meaning | Visitor action |
|---:|---|---|---|
| 400 | `BAD_REQUEST` | Invalid JSON or malformed request | Retry with corrected form |
| 403 | `ORIGIN_NOT_ALLOWED` | Origin/referrer policy failed | Show generic security error |
| 403 | `BOT_VERIFICATION_FAILED` | Turnstile token invalid/expired/reused | Refresh challenge and retry |
| 413 | `PAYLOAD_TOO_LARGE` | Body exceeds 32 KB | Reduce message length |
| 422 | `VALIDATION_ERROR` | Field/schema validation failed | Highlight fields |
| 429 | `RATE_LIMITED` | Email/phone/risk controls triggered | Ask visitor to retry later or contact directly |
| 503 | `LEAD_STORAGE_UNAVAILABLE` | Database unavailable; lead was not accepted | Show retry/contact fallback |
| 500 | `INTERNAL_ERROR` | Unexpected server error | Show generic retry/contact fallback |

Do not return stack traces, provider API responses, secrets, SQL messages, or internal configuration to the browser.

### 6.6 API acceptance criteria

- Valid form submission returns `201` and creates exactly one lead.
- Duplicate idempotency key returns the existing lead ID and creates no duplicate.
- Invalid data returns `422` with field-level errors.
- Invalid/expired/replayed Turnstile token is rejected server-side.
- Origin restrictions are tested for production and staging domains.
- Oversized payload returns `413`.
- Rate-limited submissions return `429` without leaking whether an email or phone already exists.
- A provider outage does not delete or lose a committed lead.
- If database commit fails, the UI does not display a success state.

---

## 7. Lead pipeline, notifications, and response SLA

### 7.1 Lead flow

```text
Visitor form
   |
   v
Next.js POST /api/leads/
   |
   +--> Zod validation + phone normalization
   |
   +--> Cloudflare Turnstile Siteverify
   |
   +--> Origin/risk/rate checks
   |
   v
Postgres transaction
   |
   +--> Insert lead
   +--> Insert email outbox item
   +--> Insert HubSpot outbox item
   +--> Insert Telegram outbox item (minimal metadata)
   |
   v
Return 201 to visitor
   |
   v
Vercel Cron worker (every minute)
   |
   +--> Email via Resend
   +--> Contact/deal sync via HubSpot
   +--> Internal alert via Telegram
   |
   v
Retry with backoff --> dead-letter status + operational alert
```

### 7.2 Outbox worker requirements

Use `app/api/cron/outbox/route.ts` protected by `CRON_SECRET`. Configure Vercel Cron to run once per minute on the selected Pro plan.

Worker behavior:
1. Verify the cron secret.
2. Claim a bounded batch of eligible rows using row locks and `FOR UPDATE SKIP LOCKED`.
3. Mark each claimed item as processing with a lease expiry.
4. Deliver each channel independently.
5. On success, set `delivered`, `delivered_at`, and provider ID if available.
6. On transient failure, increment attempts and set a future `available_at`.
7. Use exponential backoff with jitter, for example 1, 5, 15, 60, and 180 minutes.
8. After 8 attempts, set `dead` and alert the engineering/operations owner.
9. Expired processing leases return to pending after worker interruption.
10. Never mark a lead itself as failed just because a downstream notification failed.

The worker must be idempotent. A retry must not create duplicate deals or send repeated customer acknowledgements without checking the event/lead identity.

### 7.3 CRM and internal lead view

**Selected initial CRM:** HubSpot Free.

- Database is the system of record.
- HubSpot is the team's day-to-day pipeline.
- Sync a contact and a deal (or the agreed CRM object) using lead ID as an external correlation property.
- Store CRM record IDs in a follow-up migration if needed.
- Alert the team if sync fails; retry from the outbox.
- Reassess the free tier when the number of active users exceeds two or the contact limit approaches 1,000.

**Release 1 does not include a custom admin portal.** The team reads and updates leads in HubSpot. If the chosen HubSpot setup cannot provide required access or pipeline functionality, the business owner must approve either a paid HubSpot tier or a protected internal admin page before launch. Do not expose Supabase tables or service-role credentials to browsers.

### 7.4 Email delivery and domain alignment

The current website/domain and published email were previously observed as `artyx.digital` and `hello@artyxdigital.com`. Resolve this mismatch before configuring the sender.

Recommended direction, subject to domain/mailbox ownership confirmation:
- Website canonical host: preserve the currently established indexed host after crawl/Search Console review.
- Transactional sender: `notifications@artyx.digital`
- Reply-to: a monitored mailbox on the approved business email domain
- Customer-facing business email: select one domain and use it consistently

Before sending production email:
- Verify the sender domain in Resend.
- Publish the exact SPF and DKIM records generated by Resend.
- Inspect existing SPF records and merge rather than publishing multiple SPF records for one domain.
- Publish a DMARC record, initially at monitoring policy (`p=none`) while all legitimate sending sources are inventoried.
- Review DMARC reports and align all legitimate services before moving to a stricter policy.
- Do not change existing MX records or mailbox routing without the email administrator's approval.
- Test delivery to Gmail, Outlook, and common Bangladesh providers; monitor bounces, spam placement, and provider webhooks.

### 7.5 Internal Telegram notification

Use a private Telegram group/chat with an internal bot. Message contents should be limited to:
- Lead ID
- Lead type
- Created timestamp
- Page/form origin
- HubSpot record link, once available

Do not send full name, email, phone, company, message content, or sensitive details to Telegram. Treat Telegram as a notification channel, not a CRM or lead database. Keep bot token server-side.

### 7.6 Lead response SLA

Recommended initial SLA:
- First human response within **2 staffed business hours**.
- If no owner is assigned within 1 business hour, notify the business owner.
- If the first-response SLA is missed, escalate to the business owner and record the breach.
- Send an immediate automated receipt acknowledging submission; do not imply that a human has reviewed it.

The business owner must specify the actual working days, working hours, holiday calendar, response mailbox, primary lead owner, backup owner, and escalation recipient. Use `Asia/Dhaka` for the Bangladesh team operating calendar.

---

## 8. Spam protection, rate limiting, and security controls

### 8.1 Turnstile

- Use separate Turnstile widgets/keys for local, staging, and production environments.
- Restrict hostnames to the correct domains.
- Send the token to the API.
- Verify it server-side using Cloudflare Siteverify.
- Validate expected hostname and action where configured.
- Treat token expiry, replay, provider failure, and invalid token as distinct operational outcomes.
- Do not expose the secret key in client code.

Turnstile tokens expire after five minutes and are single-use. A client widget without server-side Siteverify is not sufficient.

### 8.2 Rate limits

Do not use IP-only hard blocking as the primary mechanism. Mobile networks and shared carrier NAT can cause many legitimate Bangladesh users to share an IP.

Use layered controls:
- Turnstile challenge/risk signals
- Per-email normalized hash limits
- Per-phone E.164 hash limits
- Per-IP HMAC risk counters as a secondary signal, not an automatic permanent block
- Request-size and endpoint limits
- Idempotency keys
- Duplicate/abuse monitoring

Suggested starting thresholds for tuning in staging:
- Per normalized email: 3 accepted attempts per 15 minutes
- Per normalized phone: 3 accepted attempts per 15 minutes
- Per IP HMAC: 20 attempts per 15 minutes before additional challenge or temporary throttling, not immediate indefinite blocking
- Global endpoint burst control to contain attacks

These are initial engineering thresholds, not universal security values. Monitor legitimate rejection rates and tune them after launch. Keep counters short-lived and avoid exposing whether an email/phone is already in the CRM.

### 8.3 Security headers and dependency controls

Configure and test:
- Content-Security-Policy (start in report-only mode; move to enforced after resolving violations)
- Strict-Transport-Security after HTTPS and subdomain coverage are verified
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy` appropriate to analytics and external links
- `Permissions-Policy` for unused browser features
- Frame protection through CSP `frame-ancestors`
- Secure, HttpOnly, SameSite cookies as appropriate
- Request size and method limits
- No secrets in `NEXT_PUBLIC_*` variables
- Dependency lockfile committed; use exact resolved versions and automated vulnerability monitoring
- Secret rotation and least-privilege access

Do not enable `includeSubDomains` or HSTS preload without confirming every relevant subdomain is HTTPS-ready.

---

# Part C — Attribution, Consent, Privacy and Legal

## 9. First-touch attribution and paid media tracking

### 9.1 Attribution fields

Capture, where consent and applicable law permit:
- First-touch UTM: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- Last-touch UTM: same fields
- `gclid`
- `fbclid`
- First landing page
- Last converting page
- Referrer
- First-touch and last-touch timestamps

Do not treat URL parameters as trusted business or security data. Validate length and format; use them for attribution only.

### 9.2 Persistence behavior

- First-touch attribution must not be overwritten by later visits.
- Last-touch attribution updates on a later campaign visit.
- Use a first-party attribution cookie with a proposed 90-day lifetime, subject to privacy review.
- Store campaign parameters only according to the visitor's applicable consent choice and the approved legal policy. Before consent, keep values in transient page/form state if needed to complete the current form; do not silently create persistent advertising profiles.
- Use `SameSite=Lax`, `Secure`, and appropriate `Path`/host-only settings for production cookies.
- If the cookie is signed, verify it server-side; if unsigned, treat it as untrusted attribution metadata.
- On submit, attach the available first/last-touch values to the lead record.

### 9.3 Tags and conversion systems

**Release 1**
- Google Tag Manager
- GA4
- Google Ads conversion tag, if an active Ads account and conversion action exist
- Meta Pixel, if an active Meta Business/Ads account exists
- Consent gating for every non-essential tag
- Events for form start, validation error, successful submit, CTA click, WhatsApp click, phone click, and email click

**Release 2**
- Meta Conversions API, if there is sufficient campaign volume and a valid business need
- Google Ads enhanced conversion configuration, if approved and lawful
- CRM-to-ad-platform offline conversion feedback, only after consent, matching, access, and retention requirements are reviewed

Browser Pixel and server-side Conversions API must use a documented deduplication strategy where the relevant platform supports it. Server-side tracking must not be used to bypass a visitor's denied consent. Any hashed identifiers remain personal data/pseudonymous identifiers for privacy analysis; hashing is not anonymization.

### 9.4 Analytics event specification

| Event | Trigger | Allowed parameters |
|---|---|---|
| `cta_click` | Main CTA clicked | `cta_name`, `cta_location`, `page_path` |
| `whatsapp_click` | WhatsApp link clicked | `page_path`, `cta_location` |
| `phone_click` | Phone link clicked | `page_path`, `cta_location` |
| `email_click` | Email link clicked | `page_path`, `cta_location` |
| `form_start` | First user interaction | `form_type`, `page_path` |
| `form_validation_error` | Field validation fails | `form_type`, `field_name` only |
| `form_submit_success` | API returns accepted lead | `form_type`, `page_path`, `lead_id` only if pseudonymous and approved |
| `form_submit_error` | API returns an error | `form_type`, `error_code` |
| `demo_request_start` | POS/OMS demo form starts | `product_type`, `page_path` |
| `demo_request_success` | POS/OMS lead accepted | `product_type`, `page_path` |

Never send names, email addresses, phone numbers, company names, message content, raw lead IDs that reveal personal records, or other PII to GA4, Meta Pixel, Google Ads, or general analytics tools.

---

## 10. Cookie consent and legal pages

### 10.1 Required routes

- `/privacy-policy/`
- `/terms/`
- `/cookie-policy/`

All content must be reviewed for the actual business model, processors, hosting region, lead fields, retention period, advertising configuration, and markets served.

### 10.2 Consent banner specification

Display a clear first-party banner with:
- **Accept all**
- **Reject optional**
- **Customize**

Required categories:
- Necessary (always active; explain why)
- Analytics
- Advertising/marketing
- Optional personalization, only if used

Behavior:
- Optional categories default to off until consent is recorded.
- Rejecting optional cookies must be as easy as accepting all.
- Do not preselect advertising or analytics.
- Store the decision and policy version in a first-party consent record/cookie.
- Provide a persistent “Cookie settings” link in the footer.
- Allow users to change or withdraw their choice.
- Make the banner keyboard accessible and screen-reader friendly.
- Do not load Meta Pixel or non-essential analytics tags before the applicable consent.
- Configure Google Consent Mode v2 defaults and updates to reflect the user's choices.
- Test every category by inspecting network requests and browser storage, not only the banner UI.

Google Consent Mode communicates consent state to supported Google tags; it does not itself provide a consent banner or replace a legal consent-management process.

### 10.3 Applicable privacy review

The legal owner must review, at minimum:
- Bangladesh's **Personal Data Protection Act, 2026** and related applicable rules/guidance
- GDPR where Artyx is established in the EU or offers goods/services to people in the EU or monitors their behaviour there
- UK GDPR where the relevant UK territorial-scope criteria apply
- Contractual and processor terms for Supabase, Vercel, Resend, HubSpot, Telegram, Google, Meta, and any other vendor
- Cross-border data processing and data-transfer requirements
- Data subject request handling, retention, security, breach response, and marketing opt-in wording

Do not assume that serving international visitors alone makes every foreign privacy law apply in the same way. The EU and UK scope must be assessed against the actual targeting and monitoring activity. Obtain legal advice for the actual controller/processor roles and transfer arrangements.

### 10.4 Data retention defaults for legal review

Proposed operational policy for approval:
- Unqualified enquiries: delete or anonymize after 24 months from last meaningful interaction.
- Qualified opportunities/customers: retain according to contract, tax, accounting, and dispute requirements.
- Security/rate-limit hashes: retain only as long as needed for abuse prevention, with a short defined TTL.
- Consent records: retain evidence for the period advised by counsel.
- Provider logs: use the shortest retention that still supports operational troubleshooting.

These are proposals, not a statement of statutory retention periods. The privacy owner must approve the final schedule before production.

---

# Part D — Language, Pricing, Design and Content

## 11. Bangla and international language strategy

### Release 1
- English-only public content.
- Build content structures and routing so a second locale can be added without rewriting all page components.
- Keep copy, SEO metadata, navigation labels, and form messages in locale dictionaries rather than scattering hard-coded strings.
- Include Bengali-capable font definitions in the design system.

### Release 2
- Add `/bn/` routes for genuinely translated pages.
- Translate key commercial pages first: homepage, services, POS, OMS, contact, and request-demo.
- Use human-reviewed Bangla copy, not unreviewed machine translation.
- Add reciprocal hreflang only when the English and Bangla pages are true equivalents.
- Provide language switching that preserves the equivalent page where a translation exists; otherwise send the user to the Bangla homepage.
- Add Bangla metadata and localized structured-data text where applicable.

Font system:
- Latin display/body: Space Grotesk and Inter, if retained by design.
- Bengali: Noto Sans Bengali or Hind Siliguri.
- Test mixed Latin/Bangla text, numerals, buttons, forms, and fallback behavior on Android and Windows.

Do not publish `/bn/` pages until the translation and editorial review workflow exists.

## 12. Pricing display policy

Use a transparent, market-aware approach:

**Bangladesh**
- Show BDT for approved standard packages and product subscription prices.
- Use “Starting from ৳…” only if the minimum price is real, available, and not misleading.
- If scope is variable, show the main pricing factors and **Request a quote**.

**International**
- Show USD for approved international packages/products where the scope and support are offered internationally.
- State what is included and any regional/tax limitations.
- Do not convert a BDT price dynamically and imply it is the international price unless the company intends to honour that pricing.

**POS and OMS**
- Publish a plan/price table only after product owner approval of billing unit, setup fee, support, taxes, user/outlet/order limits, and cancellation terms.
- If pricing is not ready, present the product value and a demo CTA without fake prices.

**Blocking input:** Business owner must provide the approved price list or approve a quote-only approach before pricing content is implemented.

## 13. Design and conversion standards

- Premium, modern, technology-led design.
- Preserve established brand elements where useful; prioritize clarity and conversion over decorative complexity.
- Use a clear hierarchy and concise section copy.
- Provide a visible CTA on all commercial pages.
- Use genuine product screenshots and approved project imagery.
- Avoid heavy scroll effects and animation that damage mobile performance.
- Ensure form fields, errors, navigation, and buttons work on touch devices.
- Keep the homepage H1 exactly aligned with the agreed brand promise.

### 13.1 Pricing and lead CTA behavior

| Page | Primary CTA | Expected action |
|---|---|---|
| Homepage | Start a Project | Project enquiry |
| POS | Request a POS Demo | POS demo request |
| OMS | Request an OMS Demo | OMS demo request |
| Web development | Discuss Your Website | Service enquiry |
| E-commerce | Discuss Your E-commerce Project | E-commerce enquiry |
| Digital marketing | Request a Marketing Audit | Audit/service enquiry |
| Contact | Send an Enquiry | General lead |

The confirmation page/message must say the request was received—not that a meeting or demo has been booked.

---

# Part E — SEO, AEO and GEO

## 14. Keyword-to-URL map and page-level metadata

The following are strategic keyword targets, not verified search-volume or ranking forecasts. Validate them using Search Console, Keyword Planner, and actual lead/search data before committing to content priorities.

| URL | Primary target theme | Suggested SEO title | H1 |
|---|---|---|---|
| `/` | Digital agency Bangladesh; digital solutions company | `Artyx Digital \| Digital Agency in Bangladesh — Websites, Software & Growth` | Build Better. Operate Smarter. Grow Faster. |
| `/services/web-development/` | Website development company Bangladesh; business website development | `Website Development Company in Bangladesh \| Artyx Digital` | Business Websites Built to Support Your Next Stage of Growth |
| `/services/ecommerce-website-development/` | E-commerce website development Bangladesh; e-commerce development company | `E-commerce Website Development in Bangladesh \| Artyx Digital` | E-commerce Websites Designed to Turn Browsers into Buyers |
| `/services/custom-software/` | Custom software development Bangladesh; business software | `Custom Software Development \| Artyx Digital` | Custom Software Designed Around the Way Your Business Works |
| `/services/saas-development/` | SaaS development company; SaaS product development | `SaaS Development Services \| Artyx Digital` | Turn Your Software Idea into a Scalable Product |
| `/services/digital-marketing/` | Digital marketing agency Bangladesh; SEO services Bangladesh | `Digital Marketing & SEO Services in Bangladesh \| Artyx Digital` | Turn Your Digital Presence into a Customer Acquisition Channel |
| `/services/branding/` | Branding agency Bangladesh; brand identity design | `Branding and Brand Identity Services \| Artyx Digital` | Build a Brand People Recognize and Remember |
| `/products/pos/` | POS software Bangladesh; retail POS system | `POS Software for Retail Businesses in Bangladesh \| Artyx Digital` | Take Control of Your Sales, Inventory and Business Operations |
| `/products/order-management/` | Order management system Bangladesh; social commerce order management | `Order Management System for Online Sellers \| Artyx Digital` | Manage Every Online Order. Without the Chaos. |
| `/work/` | Web development portfolio; software projects | `Our Work and Case Studies \| Artyx Digital` | Work That Solves Real Business Problems |
| `/about/` | Artyx Digital company/about | `About Artyx Digital \| Digital Technology and Growth` | We Help Businesses Build, Operate and Grow |
| `/contact/` | Contact Artyx Digital | `Contact Artyx Digital \| Start a Conversation` | Let's Talk About What You Want to Build |

**Metadata requirements**
- Every indexable page has its own title and meta description.
- Titles and descriptions must accurately describe the page; do not mechanically stuff every keyword into the title.
- One clear primary H1 per page.
- Canonical must point to the preferred final URL.
- Open Graph title/description/image must be page-specific where practical.
- Use noindex for thin utility/search/filter pages where appropriate.
- Do not copy the same description across every service page.

### 14.1 Internal linking rules

- Homepage links to services overview, POS, OMS, and priority case studies.
- Web development links to e-commerce development but does not duplicate its core content.
- E-commerce links to relevant case studies and OMS only where the relationship is useful to the visitor.
- POS articles link to the POS landing page and related retail/operations articles.
- OMS articles link to the OMS page and related social-commerce/order workflow articles.
- Service pages link to relevant case studies and a matching enquiry CTA.
- Articles link to one relevant commercial page, one related article, and a useful source where appropriate.
- Breadcrumbs appear on service, product, case study, and insight pages.
- Avoid orphan pages; every indexable page must have at least one relevant internal link.
- Do not add sitewide keyword-heavy footer links.

## 15. Five content clusters

### Cluster 1 — POS and retail operations
Pillar: POS Software for Retail Businesses  
Supporting topics:
- What should a retail POS system track?
- POS vs spreadsheet-based inventory management
- How to reduce stock mismatch in a retail shop
- Retail sales and inventory reporting checklist
- POS implementation checklist for a new outlet

### Cluster 2 — Online order management and social commerce
Pillar: Order Management for Online Sellers  
Supporting topics:
- How to manage Facebook and Instagram orders in one workflow
- Order confirmation process for social-commerce sellers
- Common causes of missed or duplicate online orders
- Order management system vs spreadsheet workflow
- Daily order reconciliation checklist

### Cluster 3 — Website and e-commerce development
Pillar: Business Website and E-commerce Development  
Supporting topics:
- Business website project planning checklist
- E-commerce website features that support conversion
- Custom e-commerce vs hosted platform: how to choose
- Website redesign: migration and SEO checklist
- Website maintenance and security basics

### Cluster 4 — SEO and digital growth
Pillar: Practical SEO and Digital Growth for Businesses  
Supporting topics:
- Technical SEO checklist for a business website
- Local SEO fundamentals for eligible Bangladesh businesses
- Measuring qualified leads from digital marketing
- SEO vs paid advertising: when to use each
- Landing page conversion audit checklist

### Cluster 5 — Custom software and SaaS
Pillar: Custom Software and SaaS Product Development  
Supporting topics:
- When a business should invest in custom software
- SaaS MVP planning checklist
- Build vs buy: evaluating business software
- Software project requirements checklist
- SaaS onboarding and product adoption basics

## 16. Insights information architecture

Recommended content structure:

- `/insights/` — all published articles
- `/insights/category/pos-retail/`
- `/insights/category/order-management/`
- `/insights/category/web-ecommerce/`
- `/insights/category/seo-growth/`
- `/insights/category/custom-software-saas/`
- `/insights/[slug]/` — article pages
- `/authors/[slug]/` — genuine author profiles only

### Content model

Each article record should contain:
- Title and slug
- Short excerpt
- Main content
- Primary category
- Optional secondary category
- Author ID and author display name
- Author bio/profile link
- Published and updated timestamps
- Featured image and alt text
- SEO title and description
- Canonical URL
- Article status (`draft`, `review`, `published`, `archived`)
- Related articles
- Primary related service/product
- Editorial reviewer/approver

Only publish author pages when the author is a real contributor with a meaningful biography and authored work. Do not create empty archive pages. Thin tag archives should be omitted or set `noindex` until they contain useful curated content.

## 17. 90-day content calendar

This calendar starts from the first public release. It is a workload target and depends on approved facts, product screenshots, and editorial capacity.

| Period | Core page/content work | Articles and proof | Distribution |
|---|---|---|---|
| Month 1 | Finalize homepage, web development, e-commerce, digital marketing, POS and OMS pages | 2 verified case studies if permission/evidence exists; 4 helpful articles | Share launch pages and articles through company channels |
| Month 2 | Improve priority product/service pages using actual enquiry questions | 4 articles; 1–2 verified case studies; 2 comparison/how-to guides | Expert posts, relevant communities, partner/client sharing where approved |
| Month 3 | Refresh pages using Search Console and lead data | 4 articles; 1–2 case studies; one substantial checklist/guide | Relevant contributions, outreach, email distribution to opted-in contacts |

Suggested first-month article topics:
1. Retail POS Software: What a Shop Owner Should Evaluate Before Choosing
2. How Online Sellers Can Organize Facebook and Instagram Orders
3. E-commerce Website Development: A Practical Project Checklist
4. Website Development Project Brief: What a Business Should Prepare

Do not publish content merely to hit a volume target. Every article should answer a real buyer question, include first-hand experience or a useful framework where possible, and link to a relevant service/product page.

## 18. AEO and GEO implementation

### AEO
Add answer-first sections to commercial pages:
- What it is
- Who it is for
- Which problem it solves
- How it works
- What is included
- What is not included
- What it costs or how pricing is determined
- How onboarding works
- How to evaluate alternatives

Use FAQs based on actual sales/support questions. FAQ schema does not guarantee a rich result.

### GEO
- Maintain a consistent organization identity across the website and legitimate public profiles.
- Publish accurate service/product descriptions, original case studies, product documentation, and real screenshots.
- Make page content crawlable and clear without requiring hidden interaction.
- Build genuine third-party references and partnerships.
- Review `OAI-SearchBot` access separately from `GPTBot`; choose and document the company's policy for each.
- Track AI-search discovery as an observation, not a guaranteed deliverable.
- Do not buy fake mentions or publish fake awards, reviews, clients, or case studies.

### 18.1 Structured data

Use JSON-LD that matches visible content:
- `Organization`
- `WebSite`
- `Service`
- `BreadcrumbList`
- `Article`
- `Person` for genuine authors
- `SoftwareApplication` for POS and OMS where the products genuinely qualify as software applications

For POS/OMS, `SoftwareApplication` is a semantic description of the software entity, not a promise of a Google rich result. Google's current software-app rich-result eligibility requires specified properties including an offer price and an authentic rating or review. Do not invent an offer, rating, or review. Add eligibility properties only if they are accurate, visible, and supported by genuine evidence. Otherwise retain accurate semantic markup and do not expect the rich-result treatment.

### 18.2 Google Business Profile

Create or maintain a Google Business Profile only if Artyx meets Google's real-world eligibility rules. A business must make in-person contact with customers during stated hours; virtual offices and unstaffed coworking addresses do not qualify. If Artyx serves customers at a staffed business location, use the accurate address. If it is a qualifying service-area business that visits customers, configure the actual service area and hide the address where appropriate. Never use a false address or create duplicate location profiles.

---

# Part F — Performance, Accessibility and QA

## 19. Performance targets

Use Core Web Vitals as the target:
- LCP: 2.5 seconds or less
- INP: 200 milliseconds or less
- CLS: 0.1 or less

Implementation:
- Correctly size and compress images.
- Use modern image formats where supported.
- Avoid unnecessary client-side JavaScript.
- Lazy-load below-the-fold media where appropriate.
- Limit heavy animations and third-party scripts.
- Use caching/CDN appropriately.
- Test real devices and lower bandwidth.
- Collect real-user performance from Bangladesh and international visitors after launch.

### 19.1 Dhaka and Bangladesh test plan

Before Release 1:
- Test on at least one common Android device over a Bangladesh mobile network.
- Test on a standard desktop connection and a slower mobile profile.
- Measure HTML response, image loading, form submission, and API response separately.
- Repeat tests from at least two Bangladesh networks when available.
- Compare synthetic lab results with field data; do not treat a single test as a stable baseline.
- Verify that the Singapore application/database region does not create unacceptable form/API latency.

## 20. Accessibility

Target WCAG 2.2 AA.

Test:
- Keyboard-only navigation
- Visible focus and logical focus order
- Screen-reader labels and validation errors
- Contrast and text resizing
- Reduced-motion preferences
- Mobile touch targets
- Dialog and menu operation
- Semantic heading/landmark structure
- Form progress and Back/Continue controls
- Consent banner keyboard access and focus behavior

Multi-step forms must preserve answers, show progress, validate each step, provide clear errors, and have a simple fallback path.

## 21. Automated testing and launch QA

### Unit tests
- Zod form schemas
- Phone normalization
- Attribution validation
- Metadata helpers
- Content schemas
- Consent-state mapping

### Integration tests
- Lead API validation and status codes
- Database transaction and idempotency
- Outbox rows created atomically
- Turnstile success/failure/timeout/replay
- Rate limits by email, phone and IP risk
- Email/HubSpot/Telegram success and failure
- Retry/backoff and expired locks
- Cookie consent and blocked tags before consent

### End-to-end tests
- All navigation routes
- Service enquiry
- POS demo request
- OMS demo request
- Validation errors
- Success state
- Mobile navigation
- Language switcher when R2 is live
- 301 redirects
- Cookie preference update and withdrawal

### Launch checklist
- [ ] All R1 routes load.
- [ ] All primary CTAs work.
- [ ] Lead record persists in production Postgres.
- [ ] Outbox records are committed with the lead.
- [ ] Email, CRM, and Telegram delivery are tested.
- [ ] Retry and dead-letter handling are tested.
- [ ] Turnstile is verified server-side.
- [ ] Per-email/per-phone and secondary IP-risk controls are active.
- [ ] Email domain SPF, DKIM, and DMARC are checked.
- [ ] Product and company claims are approved.
- [ ] Portfolio items have correct relationship labels and permissions.
- [ ] Privacy, terms, and cookie pages are approved.
- [ ] Consent banner is tested at network level.
- [ ] GA4, Google Ads, and Meta tags respect consent.
- [ ] No PII is sent to analytics.
- [ ] Redirects and canonical host are verified.
- [ ] Sitemap and robots rules are correct.
- [ ] Structured data validates.
- [ ] Accessibility checks pass.
- [ ] Mobile and browser checks pass.
- [ ] Dhaka network performance is measured.
- [ ] Backups and restore are tested.
- [ ] Rollback is documented.
- [ ] Monitoring and alerts are enabled.

---

# Part G — Delivery Plan, Estimates and Decision Gates

## 22. Two-release delivery strategy

A single 60-day big-bang release is not the recommended plan. The main schedule risk is content/product approval latency—not only development. Deliver a focused conversion MVP first, then add proof, content depth, Bangla, and advanced attribution.

### Release 1 — Conversion MVP

**Target elapsed time:** 8–10 weeks after Gate 0 decisions and account access  
**Goal:** Publish core commercial pages and a reliable lead pipeline.

#### R1 page/build order

1. Homepage and global navigation
2. POS and OMS product pages
3. Web development, dedicated e-commerce development, and digital marketing pages
4. Contact, start-a-project, and request-demo forms
5. Persistent lead storage, outbox, CRM, email, and Telegram pipeline
6. About/contact details and legal pages
7. Essential SEO, analytics, consent, redirects, and QA

Backend and database engineering should start early in parallel with design; the order above is the public page/content priority, not an instruction to postpone lead architecture.

#### R1 ships

- Homepage with agreed H1
- Core service/product routes listed as R1
- Separate e-commerce commercial page
- Contact, project, and demo forms
- Supabase lead database and outbox worker
- HubSpot, Resend, Telegram, Turnstile integrations
- Privacy, terms, and cookie policy
- Consent banner and consent-aware GA4/Google/Meta tags, where account access exists
- Page metadata, canonicals, sitemap, robots, schema, redirects
- Verified About/contact data
- Minimal case-study section only if at least one item is fully approved

#### R1 cut line when content is late

- If a case study lacks written permission or evidence, hide it; do not use a placeholder.
- If a product screenshot is unavailable, use a clearly labelled neutral product visual or omit the screenshot block.
- If POS/OMS capability evidence is incomplete, use a product overview and demo CTA only; do not publish a feature grid with unverified features.
- If pricing is unapproved, show “Request pricing” and explain the factors rather than inventing a number.
- If testimonial approval is missing, omit the quote.
- If Bangla translation is not reviewed, keep the English release; do not publish machine-translated `/bn/` pages.
- If an optional advanced integration is not ready, keep the lead in the database and deliver the required R1 notifications; do not delay launch for optional CAPI or automation.

### Release 2 — Authority, content and expansion

**Target elapsed time:** 4–6 weeks after R1, depending on editorial and localization readiness.

R2 includes:
- Remaining service pages (custom software, SaaS, branding)
- Full verified Work index and case-study library
- Insights CMS/workflow, categories, author profiles, and initial content calendar
- Bangla `/bn/` routes for approved core pages
- Meta Conversions API and enhanced/offline conversion work where consent and account prerequisites are satisfied
- Further CRM automation and lead reporting
- Additional content clusters and technical refinements based on actual search and lead data

### Overall target

**Planning range: 12–16 weeks for both releases**, assuming the minimum team below and timely approvals. If product evidence, translations, permissions, or legal review are delayed, R1 can still ship with the cut line above while R2 moves later.

---

## 23. Team and resourcing assumptions

The schedule assumes this minimum delivery capacity:

| Role | Allocation | Main responsibility |
|---|---:|---|
| Full-stack/technical owner | 1.0 FTE | Architecture, Next.js, API, database, integrations, deployment |
| Front-end/UI implementer | 0.75–1.0 FTE | Design system, responsive pages, form UI, accessibility |
| Business/product owner | 0.2–0.3 FTE | Product truth, pricing, contact, decisions, lead workflow approval |
| Content/SEO owner | 0.5 FTE | Copy, metadata, keyword mapping, case studies, editorial calendar |
| Designer | 0.25–0.5 FTE | Visual system and product/page assets |
| QA tester | 0.25–0.5 FTE during test windows | Test plans, devices, regression, release acceptance |

A small team may combine roles, but every responsibility must have one accountable person. If only one developer is available, extend the elapsed schedule rather than removing database, security, consent, or QA requirements.

### Effort estimate

These are initial person-day ranges for planning, not fixed-price quotes.

| Workstream | R1 effort |
|---|---:|
| Discovery, repository audit, URL/content/product verification | 5–8 days |
| Design system and responsive templates | 5–8 days |
| Homepage, navigation, About/contact and core commercial pages | 10–14 days |
| POS/OMS pages and product content integration | 4–6 days |
| Database, API, Zod, outbox and provider integrations | 9–13 days |
| Forms, analytics, consent, metadata and redirects | 6–9 days |
| QA, accessibility, performance, release and monitoring | 7–10 days |
| **R1 total** | **46–68 person-days** |

| Workstream | R2 effort |
|---|---:|
| Remaining service pages and content model | 4–6 days |
| Work index and verified case studies | 5–8 days |
| Insights CMS/categories/authors and initial content | 6–9 days |
| Bangla localization and review | 7–12 days |
| CAPI/advanced conversion reporting | 4–7 days |
| SEO refinements, content migration and QA | 5–8 days |
| **R2 total** | **31–50 person-days** |

Estimates exclude the time clients/partners take to grant permissions, provide screenshots, approve claims, and review translations. Track approval wait time separately from engineering effort.

---

## 24. Task-level backlog and acceptance criteria

| ID | Task | Estimate | Owner | Acceptance criteria |
|---|---|---:|---|---|
| T01 | Repository and deployment audit | 2–3 days | Technical owner | Framework, runtime, scripts, hosting, current routes, build and deployment process documented |
| T02 | URL crawl and migration inventory | 1–2 days | SEO owner | Every known current URL has keep/redirect/remove decision and reason |
| T03 | Product capability register | 1–2 days plus owner review | Product owner | Every POS/OMS claim marked Available/In development/Planned with evidence and approved wording |
| T04 | Brand/contact/portfolio verification | 2–4 days plus external approvals | Business owner | Company details, email domain, team, logos, case studies, permissions signed off |
| T05 | Design system and page templates | 5–8 days | Design/front-end owner | Responsive tokens/components approved; core pages pass visual review |
| T06 | Route and navigation implementation | 2–3 days | Front-end owner | R1 route map matches spec; menus usable on mobile and keyboard |
| T07 | Database migration and access controls | 2–3 days | Technical owner | Migration applies cleanly; RLS enabled; anonymous access denied; indexes tested |
| T08 | Zod validation and phone normalization | 1–2 days | Technical owner | All four lead types validate on server; invalid phone/fields return expected errors |
| T09 | Lead API and idempotency | 2–3 days | Technical owner | Contract/status codes pass automated integration tests |
| T10 | Outbox worker and retries | 2–3 days | Technical owner | Atomic inserts, independent channels, retry/backoff, dead-letter alerts verified |
| T11 | HubSpot/Resend/Telegram/Turnstile setup | 3–5 days | Technical owner | Test lead reaches CRM/email/alert; provider outage leaves retryable outbox item |
| T12 | R1 forms and success/error UX | 3–4 days | Front-end owner | Keyboard/mobile accessible; success only after accepted API response |
| T13 | Consent manager and tag integration | 2–4 days | Analytics/privacy owner | No optional tags before consent; accept/reject/customize and withdrawal verified |
| T14 | Metadata, schema, sitemap, robots | 2–3 days | SEO owner | R1 pages have unique metadata/canonicals; schema validated; sitemap matches canonical routes |
| T15 | Redirects and pre-launch crawl comparison | 1–2 days | SEO/technical owners | No loops/chains; old-vs-new crawl report reviewed and approved |
| T16 | Security/performance/accessibility QA | 3–5 days | QA + technical owner | Header, device, form, performance and accessibility checks documented |
| T17 | Production release and rollback | 1–2 days | Technical owner | Smoke tests pass; backups and rollback procedure verified |
| T18 | R2 content/CMS/localization | 20–35 days combined | Content, design, technical owners | Published content is fact-checked, translated, linked and technically validated |

The task estimates overlap with the workstream totals; do not add both tables together.

---

## 25. Blocking decision register

**T0** means the formal project kickoff date. Deadlines are relative to T0. A decision is not “confirmed” until the named individual accepts ownership and the decision is recorded.

| Decision / input | Recommended default | Accountable owner | Deadline | Blocking? |
|---|---|---|---|---|
| Actual repository and deployment access | Read-only repo + staging access for technical owner | Artyx technical owner — name to be assigned | T0 + 1 business day | Yes |
| Final framework/dependency baseline | Next.js 16.x + React 19.3.x after compatibility audit | Technical owner | T0 + 2 business days | Yes |
| Hosting account and billing owner | Vercel Pro under Artyx-owned account | Business owner — name to be assigned | T0 + 2 business days | Yes |
| Database account and region | Supabase Pro, Singapore, subject to legal approval | Technical owner + privacy owner | T0 + 3 business days | Yes |
| CRM owner and pipeline stages | HubSpot Free, DB as source of truth | Business/sales owner — name to be assigned | T0 + 3 business days | Yes |
| Sender and reply-to domain | Prefer `artyx.digital` if owned and mailbox-ready | Email/domain administrator — name to be assigned | T0 + 2 business days | Yes |
| Contact email/domain mismatch | Confirm whether `artyxdigital.com` remains active or migrate contact identity | Business owner + email admin | T0 + 2 business days | Yes |
| Telegram alert recipient/group | Private internal group; no PII | Operations owner — name to be assigned | T0 + 4 business days | Yes |
| Product capability register | Approve all POS/OMS claims and limitations | POS/OMS product owner — name to be assigned | T0 + 5 business days | Yes for product claims |
| Product screenshots | Supply approved live screenshots or authorize omission | Product owner | T0 + 7 business days | No; cut line applies |
| Case studies, logos, testimonials | Supply proof and written permission | Business/project owner | T0 + 10 business days | No; omit unapproved items |
| Legal/privacy policy and data transfer review | Bangladesh PDPA 2026 + relevant EU/UK scope review | Legal/privacy owner — name to be assigned | T0 + 7 business days | Yes before production |
| Consent categories and tags | Necessary/analytics/advertising; optional off by default | Marketing/privacy owner | T0 + 5 business days | Yes before tags |
| Pricing | Approved BDT and USD “from” prices, or quote-only | Business/product owner | T0 + 7 business days | Yes for prices; no for quote-only |
| Bangla translation capacity | English R1; professionally reviewed `/bn/` in R2 | Business/content owner | T0 + 10 business days | No for R1 |
| Work calendar and response SLA | 2 staffed business hours; define actual shifts/holidays | Sales/operations owner | T0 + 3 business days | Yes before forms go live |
| Actual team/role mapping | Name one accountable person per workstream | Business owner | T0 + 1 business day | Yes |

If an owner name is still blank at T0 + 1 business day, the business sponsor must assign one. Do not invent people's names in this plan. Technical work that depends on an unresolved blocker must not silently proceed on an assumed production configuration.

---

## 26. Environment variables

Create `.env.example` with variable names only; never commit real values.

```dotenv
# Public application
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_DEFAULT_LOCALE=en
NODE_ENV=

# Supabase — server only
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_URL=

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Resend
RESEND_API_KEY=
EMAIL_FROM=
EMAIL_REPLY_TO=
LEAD_ALERT_TO=

# HubSpot
HUBSPOT_PRIVATE_APP_TOKEN=

# Telegram internal alert
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Cron and attribution/security
CRON_SECRET=
ATTRIBUTION_COOKIE_SECRET=
IP_HASH_SECRET=

# Analytics and advertising IDs (public IDs, not secrets)
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_META_PIXEL_ID=

# Optional Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Monitoring
SENTRY_DSN=
```

Rules:
- Only variables beginning `NEXT_PUBLIC_` may be exposed to browser code, and only if the value is explicitly designed to be public.
- `SUPABASE_SERVICE_ROLE_KEY`, database URLs, Turnstile secret, Resend key, HubSpot token, Telegram token, cron secret, and HMAC secrets must be server-only.
- Validate required environment variables at startup.
- Use separate credentials and provider widgets for local, staging, and production.
- Store production secrets in the hosting provider's encrypted environment settings or a secrets manager.
- Rotate a secret immediately if it is exposed in logs, code, screenshots, or chat.

---

## 27. SEO migration and post-launch monitoring

### Pre-launch old-vs-new comparison

Run a crawl of the current site and the staging site. Compare:
- Status code
- Final URL
- Title
- Meta description
- H1
- Canonical
- Robots/indexability
- Structured data
- Internal link destination
- Image alt text
- Redirect chain
- Sitemap inclusion

Produce an exception list and get SEO/technical approval before launch.

### First 30 days after launch

**Daily for the first 7 days**
- Check form submissions and outbox dead letters.
- Check 404s, 5xx responses, and redirect errors.
- Check key route availability and conversion events.
- Check whether critical URLs are crawlable/indexable.

**Weekly through Day 30**
- Review Google Search Console performance/indexing.
- Review Bing Webmaster Tools and crawl errors.
- Compare organic clicks/impressions against the pre-launch baseline.
- Review landing page conversion and lead quality.
- Investigate unexpected canonical changes, deindexing, or traffic drops.
- Review Dhaka mobile performance and form/API latency.

Do not make large-scale URL or copy changes based on a few days of normal ranking volatility.

---

## 28. Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Product details or screenshot approval is late | Product pages blocked | R1 cut line: accurate overview and demo CTA only |
| Client permission/results are unavailable | Portfolio proof blocked | Omit the item; never fabricate |
| Lead stored only in local files | Lost records | Supabase Postgres authoritative store |
| Notification provider is down | Lead not followed up | Transactional outbox, retries, dead-letter alert |
| IP-only rate limiting harms mobile users | Legitimate Bangladesh users blocked | Turnstile + per-email/phone + soft IP risk |
| Email domain mismatch | Poor deliverability and trust | Confirm one sender/reply-to identity and align SPF/DKIM/DMARC |
| CRM free tier too small | Access or workflow limits | DB remains canonical; define upgrade trigger |
| Consent implementation is incomplete | Privacy/ad-platform risk | Test actual network calls before tag release |
| CAPI used to bypass consent | Privacy and platform risk | Enforce identical consent policy server-side |
| R1 scope grows to include everything | Launch slips | Enforce cut line and R2 backlog |
| No named approver | Decisions stall | Owner register and T0 deadlines |
| Dhaka experience is slow | Lower conversion | Bangladesh device/network test and real-user monitoring |
| No post-launch SEO watch | Migration problems persist | 30-day Search Console and crawl monitoring |

---

## 29. Final release approval

### Release 1 approval requires
1. Approved provider accounts and named operational owners.
2. Persistent lead database, atomic outbox, retry worker, and tested API.
3. Turnstile server-side verification and layered rate limits.
4. CRM, email, and Telegram delivery verified.
5. SPF, DKIM, and DMARC reviewed for the selected sender domain.
6. Privacy/terms/cookie policies approved and consent behavior tested.
7. Approved homepage, POS, OMS, web development, e-commerce, and digital marketing content.
8. All product claims and public company facts verified.
9. Redirect, canonical, sitemap, schema, and crawl comparison approved.
10. Mobile, accessibility, performance, security, backup, monitoring, and rollback checks pass.

### Release 2 approval requires
1. Verified case studies and portfolio relationship labels.
2. CMS/content publishing workflow with named editorial approver.
3. Insights categories, author pages, and internal linking.
4. Reviewed Bangla translations and correct hreflang.
5. Advanced conversion integrations enabled only after consent and platform prerequisites are confirmed.
6. Search/lead performance review and an updated content plan.

**Final recommendation:** Build in two releases. Release 1 should prioritize the homepage, POS/OMS, web and e-commerce development, digital marketing, reliable forms/lead operations, legal/consent essentials, and technical SEO. Release 2 should deepen proof, services, editorial content, Bangla, and advanced growth integrations. Do not trade lead reliability, legal review, or factual accuracy for a shorter calendar.

---

## 30. Reference documentation checked for this draft

These sources support provider capabilities and current platform/legal references. They do not replace account-specific checks or legal advice.

- [Next.js Support Policy](https://nextjs.org/support-policy) — Next.js 16.x is listed as Active LTS.
- [React Versions](https://react.dev/versions) — React documentation lists 19.3 as the latest version at the time checked.
- [Vercel Pricing](https://vercel.com/pricing) — public plan pricing and usage notes.
- [Vercel Cron usage and pricing](https://vercel.com/docs/cron-jobs/usage-and-pricing) — Pro supports per-minute cron scheduling; cron invokes Vercel Functions.
- [Supabase Pricing](https://supabase.com/pricing) — public Pro plan starting price and included resources.
- [Supabase Available Regions](https://supabase.com/docs/guides/platform/regions) — Singapore `ap-southeast-1` is an available region; region selection alone does not establish compliance.
- [HubSpot Free CRM](https://www.hubspot.com/products/crm) — current public free CRM user/contact limits.
- [Resend Pricing](https://resend.com/pricing) — current public email tier limits and pricing.
- [Cloudflare Turnstile Plans](https://developers.cloudflare.com/turnstile/plans/) — free plan availability.
- [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) — Siteverify is mandatory; tokens are single-use and expire after five minutes.
- [Google Consent Mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode) and [website setup guide](https://developers.google.com/tag-platform/security/guides/consent) — consent choices must be obtained and passed to supported tags; Consent Mode is not itself a banner/CMP.
- [Google Software App structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app) — software rich-result required properties and eligibility.
- [Google Business Profile eligibility](https://support.google.com/business/answer/13763036) and [representation guidelines](https://support.google.com/business/answer/3038177) — in-person customer contact and accurate location rules.
- [Next.js `trailingSlash` configuration](https://nextjs.org/docs/pages/api-reference/config/next-config-js/trailingSlash) — route slash behavior.
- [next-intl routing configuration](https://next-intl.dev/docs/routing/configuration) — locale-prefixed route patterns.
- [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) — international phone parsing/validation library.
- [Bangladesh Personal Data Protection Act, 2026](https://bdlaws.minlaw.gov.bd/act-details-1692.html?lang=en) — official Bangladesh Laws database entry for the 2026 Act.
- [European Commission: Application of the GDPR](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en) — territorial scope for EU-established entities and certain non-EU entities offering services or monitoring people in the EU.

---

## Appendix A — Required evidence checklist

Before publishing any claim, record its source and approver.

| Claim type | Evidence required | Approval |
|---|---|---|
| Company start date and years in business | Registration/business records or verifiable company history | Business owner |
| Number of projects/clients | CRM/project register with counting method | Business owner |
| Satisfaction or growth percentage | Survey/analytics method, sample, timeframe | Business owner |
| Client logo | Written permission or applicable brand-use approval | Account owner |
| Client testimonial | Original approved wording and attribution consent | Account owner |
| Case-study result | Analytics/report and measurement period | Project owner |
| POS feature | Live product test or current documentation | POS product owner |
| OMS integration | Working integration and documented limits | OMS product owner |
| 24/7 support | Actual contracted staffing and support process | Operations owner |
| Team biography | Person's approval and current role | Business owner |
| Address/phone/email | Current operational contact details | Business owner |

## Appendix B — Definition of done for every public page

A page is done only when:
- Copy is approved by its accountable owner.
- Claims are evidence-backed.
- URL, title, description, H1, canonical, Open Graph metadata, and schema are set.
- Primary CTA works and has an event.
- Images are optimized and have appropriate alt text.
- Page is usable on mobile and keyboard.
- Internal links point to canonical destinations.
- Page is included or excluded from sitemap intentionally.
- No placeholder copy, invented proof, or broken links remain.
- Content owner and last-verified date are recorded.

**Document owner:** Artyx business sponsor (to be named at kickoff)  
**Technical owner:** To be named at kickoff  
**Next review:** At Gate 0, then at the end of each release.
