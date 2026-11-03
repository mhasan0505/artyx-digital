import test from "node:test";
import assert from "node:assert/strict";
import { normalizePhoneToE164, normalizeEmail, LeadSchema } from "../../lib/validation/lead.ts";

test("normalizePhoneToE164 parses Bangladesh numbers correctly", () => {
  const bdLocal = normalizePhoneToE164("01732549551", "BD");
  assert.equal(bdLocal, "+8801732549551");

  const bdWithPlus = normalizePhoneToE164("+880 1732-549551");
  assert.equal(bdWithPlus, "+8801732549551");

  const intlNumber = normalizePhoneToE164("+1 202 555 0123");
  assert.equal(intlNumber, "+12025550123");

  const invalid = normalizePhoneToE164("12345");
  assert.equal(invalid, null);
});

test("normalizeEmail trims and lowercases properly", () => {
  assert.equal(normalizeEmail("  Hello@ArtyxDigital.COM "), "hello@artyxdigital.com");
});

test("LeadSchema accepts valid general lead", () => {
  const result = LeadSchema.safeParse({
    type: "general",
    idempotencyKey: "11111111-1111-4111-8111-111111111111",
    name: "Tariqul Islam",
    email: "tariq@example.com",
    details: "We need an assessment of our current web infrastructure and CRM.",
    preferredContactMethod: "email",
    privacyNoticeAcknowledged: true,
    privacyNoticeVersion: "2026-10-v1",
    turnstileToken: "test-token",
  });
  assert.equal(result.success, true);
});

test("LeadSchema accepts valid POS demo request", () => {
  const result = LeadSchema.safeParse({
    type: "pos_demo",
    idempotencyKey: "22222222-2222-4222-8222-222222222222",
    name: "Rahim Chowdhury",
    email: "rahim@store.com",
    phone: "01732549551",
    countryCode: "BD",
    company: "Chowdhury Electronics",
    businessType: "Electronics Retail",
    outletCount: 2,
    details: "We want to see counter billing, barcode scanning, and stock alerts.",
    preferredContactMethod: "whatsapp",
    privacyNoticeAcknowledged: true,
    privacyNoticeVersion: "2026-10-v1",
    turnstileToken: "test-token",
  });
  assert.equal(result.success, true);
});

test("LeadSchema accepts valid OMS demo request", () => {
  const result = LeadSchema.safeParse({
    type: "oms_demo",
    idempotencyKey: "33333333-3333-4333-8333-333333333333",
    name: "Nusrat Jahan",
    email: "nusrat@boutique.com",
    salesChannels: ["facebook", "instagram", "website"],
    monthlyOrderBand: "501_2000",
    details: "Need to manage Facebook message orders and courier dispatch.",
    preferredContactMethod: "phone",
    privacyNoticeAcknowledged: true,
    privacyNoticeVersion: "2026-10-v1",
    turnstileToken: "test-token",
  });
  assert.equal(result.success, true);
});

test("LeadSchema rejects invalid phone format when phone is supplied", () => {
  const result = LeadSchema.safeParse({
    type: "general",
    idempotencyKey: "44444444-4444-4444-8444-444444444444",
    name: "Test User",
    email: "test@example.com",
    phone: "invalid-phone",
    details: "Need consulting regarding digital growth.",
    privacyNoticeAcknowledged: true,
    privacyNoticeVersion: "2026-10-v1",
    turnstileToken: "test-token",
  });
  assert.equal(result.success, false);
});

