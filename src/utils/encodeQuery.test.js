import { test, expect } from "vitest";
import { encodeQuery } from "./utils";

test("does not change URLs with no spaces", () => {
  expect(encodeQuery("electronics")).toBe("electronics");
  expect(encodeQuery("Hardy's")).toBe("Hardy's");
});

test("converts spaces to plus signs", () => {
  expect(encodeQuery("mobile phones")).toBe("mobile+phones");
});

test("encodes queries with multiple words", () => {
  expect(encodeQuery("blue tote bags")).toBe("blue+tote+bags");
});
