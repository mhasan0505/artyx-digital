import test from "node:test";
import assert from "node:assert/strict";
import { formatTelegramMessage } from "../../lib/notifications/telegram.ts";
import { computeIpHmac } from "../../lib/security/request-guard.ts";

test("formatTelegramMessage creates strictly non-PII operational message", () => {
  const payload = {
    leadId: "test-lead-uuid-1234",
    leadType: "pos_demo",
    sourcePath: "/products/pos/",
    createdAt: "2026-10-30T12:00:00Z",
    crmRecordUrl: "https://app.hubspot.com/contacts/123",
  };

  const message = formatTelegramMessage(payload);

  assert.ok(message.includes("test-lead-uuid-1234"));
  assert.ok(message.includes("pos_demo"));
  assert.ok(message.includes("/products/pos/"));

  // Verify that typical PII fields are never present in the output
  assert.equal(message.includes("name:"), false);
  assert.equal(message.includes("email:"), false);
  assert.equal(message.includes("phone:"), false);
  assert.equal(message.includes("details:"), false);
});

test("computeIpHmac returns consistent sha256 hex string", () => {
  const hash1 = computeIpHmac("103.205.71.12");
  const hash2 = computeIpHmac("103.205.71.12");
  const hashDifferentIp = computeIpHmac("103.205.71.99");

  assert.equal(hash1, hash2);
  assert.notEqual(hash1, hashDifferentIp);
  assert.equal(hash1?.length, 64); // 32 bytes hex
});
