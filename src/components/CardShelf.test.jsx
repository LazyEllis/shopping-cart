import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { products } from "../__mocks__/products";
import CardShelf from "./CardShelf";

// Mock utility functions
vi.mock("../utils/utils", () => ({
  formatProductText: (text) => text,
  toTitleCase: (text) => text,
  formatCurrency: (number) => number,
}));

const DEFAULT_HEADING = "Product List";

const setup = (props = {}) => {
  render(
    <MemoryRouter>
      <CardShelf
        heading={DEFAULT_HEADING}
        products={props.products ?? products}
        isSearch={props.isSearch}
      />
    </MemoryRouter>
  );
};

test("displays the provided heading", () => {
  setup();

  expect(
    screen.getByRole("heading", { name: DEFAULT_HEADING })
  ).toBeInTheDocument();
});

test("renders correct number of product links", () => {
  setup();

  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(products.length);
});

test("creates proper links and images for each product", () => {
  setup();

  products.forEach((product) => {
    const link = screen.getByRole("link", { name: product.title });
    const image = screen.getByTestId(`product-${product.id}-image`);

    expect(link).toHaveAttribute("href", `/store/${product.id}`);
    expect(image).toHaveAttribute("src", product.image);
  });
});

test("shows no products when empty array is provided", () => {
  setup({ products: [] });

  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});

test("displays category empty state message", () => {
  setup({ products: [] });

  expect(
    screen.getByText("Sorry, there are no products in this category.")
  ).toBeInTheDocument();

  expect(
    screen.getByText(
      "Try browsing other categories or check back soon for new arrivals."
    )
  ).toBeInTheDocument();
});

test("displays search results count for successful searches", () => {
  setup({ isSearch: true });

  expect(
    screen.getByText(`${products.length} results found`)
  ).toBeInTheDocument();
});

test("displays search empty state message when no results found", () => {
  setup({ products: [], isSearch: true });

  expect(screen.queryByText(/results found/i)).not.toBeInTheDocument();
  expect(screen.getByText("Sorry, no matches were found.")).toBeInTheDocument();
  expect(
    screen.getByText("Try a new search or use our suggestions.")
  ).toBeInTheDocument();
});
