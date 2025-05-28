import { test, expect } from "vitest";
import { formatCurrency } from "./utils";

test("should format zero as $0.00", () => {
  expect(formatCurrency(0)).toBe("$0.00");
});

test("should format whole numbers with two decimal places", () => {
  expect(formatCurrency(50)).toBe("$50.00");
});

test("should preserve existing decimal places when two or fewer", () => {
  expect(formatCurrency(7.25)).toBe("$7.25");
});

test("should round to two decimal places when more than two provided", () => {
  expect(formatCurrency(45.552)).toBe("$45.55");
  expect(formatCurrency(45.558)).toBe("$45.56");
});

test("should add thousands separators for large numbers", () => {
  expect(formatCurrency(1000)).toBe("$1,000.00");
  expect(formatCurrency(72000000)).toBe("$72,000,000.00");
});
