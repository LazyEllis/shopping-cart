import { test, expect } from "vitest";
import { groupBy } from "./utils";

test("groups objects by a string property", () => {
  const users = [
    { name: "Alice", department: "Engineering" },
    { name: "Bob", department: "Marketing" },
    { name: "Charlie", department: "Engineering" },
    { name: "Diana", department: "HR" },
  ];

  const result = groupBy(users, "department");

  expect(result).toEqual({
    Engineering: [
      { name: "Alice", department: "Engineering" },
      { name: "Charlie", department: "Engineering" },
    ],
    Marketing: [{ name: "Bob", department: "Marketing" }],
    HR: [{ name: "Diana", department: "HR" }],
  });
});

test("groups objects by a numeric property", () => {
  const products = [
    { name: "Laptop", price: 1000, category: 1 },
    { name: "Mouse", price: 25, category: 2 },
    { name: "Desktop", price: 1500, category: 1 },
    { name: "Keyboard", price: 75, category: 2 },
  ];

  const result = groupBy(products, "category");

  expect(result).toEqual({
    1: [
      { name: "Laptop", price: 1000, category: 1 },
      { name: "Desktop", price: 1500, category: 1 },
    ],
    2: [
      { name: "Mouse", price: 25, category: 2 },
      { name: "Keyboard", price: 75, category: 2 },
    ],
  });
});

test("groups objects by a boolean property", () => {
  const items = [
    { name: "Alice", isActive: true },
    { name: "Bob", isActive: false },
    { name: "Charlie", isActive: true },
    { name: "Diana", isActive: false },
  ];

  const result = groupBy(items, "isActive");

  expect(result).toEqual({
    true: [
      { name: "Alice", isActive: true },
      { name: "Charlie", isActive: true },
    ],
    false: [
      { name: "Bob", isActive: false },
      { name: "Diana", isActive: false },
    ],
  });
});

test("handles empty array", () => {
  const result = groupBy([], "any-key");
  expect(result).toEqual({});
});

test("handles single item array", () => {
  const items = [{ name: "Alice", role: "admin" }];
  const result = groupBy(items, "role");

  expect(result).toEqual({
    admin: [{ name: "Alice", role: "admin" }],
  });
});

test("handles zero as a grouping value", () => {
  const items = [
    { name: "Alice", score: 0 },
    { name: "Bob", score: 1 },
    { name: "Charlie", score: 0 },
  ];

  const result = groupBy(items, "score");

  expect(result).toEqual({
    0: [
      { name: "Alice", score: 0 },
      { name: "Charlie", score: 0 },
    ],
    1: [{ name: "Bob", score: 1 }],
  });
});
