import { test, expect } from "vitest";
import { formatProductText } from "./utils";

test("returns the original string if it contains only one word", () => {
  expect(formatProductText("Oracle")).toBe("Oracle");
});

test("returns the original string if it contains exactly three words", () => {
  expect(formatProductText("Red Riding Hood")).toBe("Red Riding Hood");
});

test("truncates text to the first three words if more than three words are present", () => {
  expect(formatProductText("Men's Casual Premium White T-Shirt")).toBe(
    "Men's Casual Premium"
  );
  expect(formatProductText("Injustice 2 Ultimate Edition")).toBe(
    "Injustice 2 Ultimate"
  );
});
