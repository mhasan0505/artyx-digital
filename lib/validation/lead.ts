import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";
import { z } from "zod";

export const SERVICE_SLUGS = [
  "web-development",
  "ecommerce-website-development",
  "custom-software",
  "saas-development",
  "digital-marketing",
  "branding",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const SALES_CHANNELS = [
  "facebook",
  "instagram",
  "website",
  "marketplace",
  "other",
] as const;

export const MONTHLY_ORDER_BANDS = [
  "under_100",
  "100_500",
  "501_2000",
  "2001_10000",
  "over_10000",
  "not_sure",
] as const;

/**
 * Normalizes a phone string into E.164 format.
 * Only interprets local numbers without a '+' prefix if an explicit 2-letter ISO countryCode is supplied.
 */
export function normalizePhoneToE164(
  phone?: string | null,
  countryCode?: string | null,
): string | null {
  if (!phone || !phone.trim()) return null;
  const trimmed = phone.trim();
  const defaultCountry =
    countryCode && /^[A-Z]{2}$/i.test(countryCode)
      ? (countryCode.toUpperCase() as CountryCode)
      : undefined;

  const parsed = defaultCountry
    ? parsePhoneNumberFromString(trimmed, defaultCountry)
    : parsePhoneNumberFromString(trimmed);

  if (!parsed || !parsed.isValid()) {
    return null;
  }
  return parsed.number;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

const touchSchema = z.object({
  source: z.string().max(200).optional(),
  medium: z.string().max(200).optional(),
  campaign: z.string().max(200).optional(),
  term: z.string().max(200).optional(),
  content: z.string().max(200).optional(),
  gclid: z.string().max(500).optional(),
  fbclid: z.string().max(500).optional(),
  timestamp: z.string().max(64).optional(),
});

export const attributionSchema = z
  .object({
    firstTouch: touchSchema.optional(),
    lastTouch: touchSchema.optional(),
    landingPage: z.string().url().max(1000).optional(),
    referrer: z.string().url().max(1000).optional(),
    sourcePath: z.string().max(500).optional(),
  })
  .optional();

const commonFields = {
  idempotencyKey: z.string().uuid(),
  name: z.string().trim().min(2, "Enter your full name (at least 2 characters).").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().max(40).optional(),
  countryCode: z
    .string()
    .trim()
    .length(2, "Use a 2-letter ISO country code.")
    .toUpperCase()
    .optional(),
  company: z.string().trim().max(160).optional(),
  details: z
    .string()
    .trim()
    .min(10, "Please share at least 10 characters describing your requirements.")
    .max(5000),
  preferredContactMethod: z
    .enum(["email", "phone", "whatsapp"])
    .default("email"),
  privacyNoticeAcknowledged: z.literal(true, {
    error: "Please acknowledge the privacy notice to submit.",
  }),
  privacyNoticeVersion: z.string().min(1).max(40),
  marketingOptIn: z.boolean().default(false),
  turnstileToken: z.string().min(1, "Bot verification token is required.").max(4096),
  attribution: attributionSchema,
};

export const GeneralLeadSchema = z
  .object({
    ...commonFields,
    type: z.literal("general"),
  })
  .strict();

export const ServiceLeadSchema = z
  .object({
    ...commonFields,
    type: z.literal("service"),
    serviceSlug: z.enum(SERVICE_SLUGS),
    budgetBand: z.string().trim().max(80).optional(),
    timelineBand: z.string().trim().max(80).optional(),
  })
  .strict();

export const PosDemoLeadSchema = z
  .object({
    ...commonFields,
    type: z.literal("pos_demo"),
    businessType: z.string().trim().min(2).max(120).optional(),
    outletCount: z.number().int().min(1).max(10000).optional(),
  })
  .strict();

export const OmsDemoLeadSchema = z
  .object({
    ...commonFields,
    type: z.literal("oms_demo"),
    salesChannels: z.array(z.enum(SALES_CHANNELS)).max(10).optional(),
    monthlyOrderBand: z.enum(MONTHLY_ORDER_BANDS).optional(),
  })
  .strict();

export const LeadSchema = z
  .discriminatedUnion("type", [
    GeneralLeadSchema,
    ServiceLeadSchema,
    PosDemoLeadSchema,
    OmsDemoLeadSchema,
  ])
  .superRefine((data, ctx) => {
    if (data.phone && data.phone.trim().length > 0) {
      const normalized = normalizePhoneToE164(data.phone, data.countryCode);
      if (!normalized) {
        ctx.addIssue({
          code: "custom",
          path: ["phone"],
          message:
            "Enter a valid phone number with country code (e.g. +8801... or +1...), or select your country.",
        });
      }
    }
  });

export type LeadInput = z.infer<typeof LeadSchema>;
export type AttributionData = z.infer<typeof attributionSchema>;

