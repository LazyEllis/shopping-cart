import { test, expect } from "vitest";
import { matchesSearchTerm } from "./utils";

test("returns true for exact matches", () => {
  expect(matchesSearchTerm("electronics", "electronics")).toBe(true);
});

test("returns true when the search term is a starting substring", () => {
  expect(matchesSearchTerm("electronics", "electro")).toBe(true);
});

test("returns false for different but similar words", () => {
  expect(matchesSearchTerm("electronics", "electric")).toBe(false);
});

test("returns true if the search term is a continuous substring across words", () => {
  expect(matchesSearchTerm("The blue bag", "blue ba")).toBe(true);
});

test("returns false if the search term does not appear in the target text", () => {
  expect(matchesSearchTerm("The blue bag", "The re")).toBe(false);
});

test("returns false if search term words are out of order", () => {
  expect(matchesSearchTerm("The blue bag", "blue The")).toBe(false);
});

test("ignores case when matching", () => {
  expect(matchesSearchTerm("Electronics", "electronics")).toBe(true);
});

test("ignores leading and trailing whitespace in the search term", () => {
  expect(matchesSearchTerm("electronics", " electronics ")).toBe(true);
});

test("returns false when search term is empty", () => {
  expect(matchesSearchTerm("electronics", "")).toBe(false);
});
