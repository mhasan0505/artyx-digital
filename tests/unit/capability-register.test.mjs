import test from "node:test";
import assert from "node:assert/strict";
import {
  getAvailableProductCapabilities,
  getAllRegisteredCapabilities,
} from "../../lib/content/capability-register.ts";

test("getAvailableProductCapabilities returns only available items for POS", () => {
  const posCaps = getAvailableProductCapabilities("pos");
  assert.ok(posCaps.length > 0);
  for (const cap of posCaps) {
    assert.equal(cap.status, "available");
    assert.equal(cap.product, "pos");
  }
});

test("getAvailableProductCapabilities returns only available items for OMS", () => {
  const omsCaps = getAvailableProductCapabilities("oms");
  assert.ok(omsCaps.length > 0);
  for (const cap of omsCaps) {
    assert.equal(cap.status, "available");
    assert.equal(cap.product, "oms");
  }
});

test("in_development capabilities are registered but excluded from available lists", () => {
  const allPos = getAllRegisteredCapabilities("pos");
  const inDevPos = allPos.filter((c) => c.status === "in_development");
  const availablePos = getAvailableProductCapabilities("pos");

  for (const devCap of inDevPos) {
    const leaked = availablePos.find((c) => c.id === devCap.id);
    assert.equal(leaked, undefined, `Roadmap capability ${devCap.id} leaked into available list!`);
  }
});

