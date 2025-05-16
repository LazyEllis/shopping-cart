import { describe, it, expect } from "vitest";
import {
  formatProductText,
  formatCurrency,
  toTitleCase,
  matchesSearchTerm,
} from "./utils";

describe("utils", () => {
  describe("formatProductText()", () => {
    it("makes no changes to single word text", () => {
      expect(formatProductText("Oracle")).toBe("Oracle");
    });

    it("makes no changes to text with three words", () => {
      expect(formatProductText("Red Riding Hood")).toBe("Red Riding Hood");
    });

    it("shortens words above three words to three", () => {
      expect(formatProductText("Men's Casual Premium White T-Shirt")).toBe(
        "Men's Casual Premium"
      );
      expect(formatProductText("Injustice 2 Ultimate Edition")).toBe(
        "Injustice 2 Ultimate"
      );
    });
  });

  describe("formatCurrency()", () => {
    it("formats zero dollars properly", () => {
      expect(formatCurrency(0)).toBe("$0.00");
    });

    it("formats numbers whole numbers properly", () => {
      expect(formatCurrency(50)).toBe("$50.00");
    });

    it("keeps decimals intact when formatting", () => {
      expect(formatCurrency(7.25)).toBe("$7.25");
    });

    it("rounds decimals above two decimal places", () => {
      expect(formatCurrency(45.552)).toBe("$45.55");
      expect(formatCurrency(45.558)).toBe("$45.56");
    });

    it("adds commas for numbers after each set of three zeros", () => {
      expect(formatCurrency(1000)).toBe("$1,000.00");
      expect(formatCurrency(72000000)).toBe("$72,000,000.00");
    });
  });

  describe("toTitleCase()", () => {
    it("converts single words to title case", () => {
      expect(toTitleCase("electronics")).toBe("Electronics");
    });

    it("converts multiple words to title case", () => {
      expect(toTitleCase("men's clothing")).toBe("Men's Clothing");
    });

    it("converts words with irregular casing to title case", () => {
      expect(toTitleCase("cAsINg")).toBe("Casing");
    });
  });

  describe("matchesSearchTerm()", () => {
    it("matches identical words", () => {
      expect(matchesSearchTerm("electronics", "electronics")).toBe(true);
    });

    it("matches partially written words", () => {
      expect(matchesSearchTerm("electronics", "electro")).toBe(true);
    });

    it("does not match unrelated words", () => {
      expect(matchesSearchTerm("electronics", "electric")).toBe(false);
    });

    it("matches multiple words if search term is a valid segment", () => {
      expect(matchesSearchTerm("The blue bag", "blue ba")).toBe(true);
    });

    it("does not match multiple word if search term doesn't appear in the target", () => {
      expect(matchesSearchTerm("The blue bag", "The re")).toBe(false);
    });

    it("does not match if word segments are out of order", () => {
      expect(matchesSearchTerm("The blue bag", "blue The")).toBe(false);
    });

    it("is case insensitive", () => {
      expect(matchesSearchTerm("Electronics", "electronics")).toBe(true);
    });

    it("it doesn't consider trailing whitespace", () => {
      expect(matchesSearchTerm("electronics", " electronics ")).toBe(true);
    });

    it("it doesn't match empty strings with words", () => {
      expect(matchesSearchTerm("electronics", "")).toBe(false);
    });
  });
});
