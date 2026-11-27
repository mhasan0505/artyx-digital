import test from "node:test";
import assert from "node:assert/strict";
import { computeIpHmac } from "../../lib/security/request-guard.ts";

test("computeIpHmac returns consistent sha256 hex string", () => {
  const hash1 = computeIpHmac("103.205.71.12");
  const hash2 = computeIpHmac("103.205.71.12");
  const hashDifferentIp = computeIpHmac("103.205.71.99");

  assert.equal(hash1, hash2);
  assert.notEqual(hash1, hashDifferentIp);
  assert.equal(hash1?.length, 64);
});
