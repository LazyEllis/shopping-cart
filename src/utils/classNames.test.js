import { test, expect } from "vitest";
import { classNames } from "./utils";

test("joins multiple class names", () => {
  expect(classNames("foo", "bar")).toBe("foo bar");
});

test("filters out falsy values", () => {
  expect(classNames("foo", false, null, undefined, "bar")).toBe("foo bar");
});

test("returns an empty string if all values are falsy", () => {
  expect(classNames(false, null, undefined)).toBe("");
});

test("handles conditional expressions", () => {
  const isActive = true;
  const isDisabled = false;
  expect(
    classNames("button", isActive && "active", isDisabled && "disabled")
  ).toBe("button active");
});

test("works with a single truthy value", () => {
  expect(classNames("only-class")).toBe("only-class");
});
