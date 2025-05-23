import { test, expect } from "vitest";
import { toTitleCase } from "./utils";

test("capitalizes a single lowercase word", () => {
  expect(toTitleCase("electronics")).toBe("Electronics");
});

test("capitalizes the first letter of each word in a multi-word string", () => {
  expect(toTitleCase("men's clothing")).toBe("Men's Clothing");
});

test("normalizes irregular casing to title case", () => {
  expect(toTitleCase("cAsINg")).toBe("Casing");
});
