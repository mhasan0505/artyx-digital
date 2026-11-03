import test from "node:test";
import assert from "node:assert/strict";
import { mapToGoogleConsentMode } from "../../lib/consent/consent-manager.ts";
import { sanitizeAnalyticsPayload } from "../../lib/analytics/events.ts";
import {
  extractTouchFromSearchParams,
  mergeAttributionState,
} from "../../lib/attribution/tracker.ts";

test("mapToGoogleConsentMode sets defaults to denied when not consented", () => {
  const gcm = mapToGoogleConsentMode({
    analytics: false,
    advertising: false,
    personalization: false,
    decided: true,
  });

  assert.equal(gcm.analytics_storage, "denied");
  assert.equal(gcm.ad_storage, "denied");
  assert.equal(gcm.ad_user_data, "denied");
  assert.equal(gcm.ad_personalization, "denied");
});

test("mapToGoogleConsentMode grants analytics and ads when consented", () => {
  const gcm = mapToGoogleConsentMode({
    analytics: true,
    advertising: true,
    personalization: false,
    decided: true,
  });

  assert.equal(gcm.analytics_storage, "granted");
  assert.equal(gcm.ad_storage, "granted");
  assert.equal(gcm.ad_user_data, "granted");
  assert.equal(gcm.ad_personalization, "granted");
});

test("sanitizeAnalyticsPayload strips PII keys and email patterns", () => {
  const clean = sanitizeAnalyticsPayload("cta_click", {
    cta_name: "Start a Project",
    cta_location: "hero",
    page_path: "/services/web-development/",
    // Forbidden PII fields that must never pass through:
    name: "John Doe",
    email: "john@example.com",
    phone: "+8801732549551",
    details: "Sensitive budget info",
  });

  assert.equal(clean.cta_name, "Start a Project");
  assert.equal(clean.cta_location, "hero");
  assert.equal(clean.page_path, "/services/web-development/");
  assert.equal(clean.name, undefined);
  assert.equal(clean.email, undefined);
  assert.equal(clean.phone, undefined);
  assert.equal(clean.details, undefined);
});

test("extractTouchFromSearchParams extracts UTM and click IDs", () => {
  const params = new URLSearchParams(
    "utm_source=google&utm_medium=cpc&utm_campaign=pos_dhaka&gclid=test-gclid-123"
  );
  const touch = extractTouchFromSearchParams(params, "2026-10-30T12:00:00Z");

  assert.ok(touch);
  assert.equal(touch.source, "google");
  assert.equal(touch.medium, "cpc");
  assert.equal(touch.campaign, "pos_dhaka");
  assert.equal(touch.gclid, "test-gclid-123");
});

test("mergeAttributionState preserves first-touch on subsequent touches", () => {
  const firstTouch = {
    source: "google",
    medium: "organic",
    campaign: "seo",
    timestamp: "2026-10-01T00:00:00Z",
  };

  const initial = mergeAttributionState(undefined, firstTouch, "https://artyx.digital/");
  assert.equal(initial.firstTouch.source, "google");
  assert.equal(initial.lastTouch.source, "google");

  const secondTouch = {
    source: "facebook",
    medium: "paid",
    campaign: "retargeting",
    timestamp: "2026-10-15T00:00:00Z",
  };

  const updated = mergeAttributionState(initial, secondTouch, "https://artyx.digital/products/pos/");
  assert.equal(updated.firstTouch.source, "google", "First touch was overwritten!");
  assert.equal(updated.lastTouch.source, "facebook", "Last touch did not update!");
});

