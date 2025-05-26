import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { formatProductText } from "../utils/utils";
import { products } from "../__fixtures__/data";
import CardShelf from "./CardShelf";

const HEADING = "product list";

test("displays the provided heading capitalized", () => {
  render(
    <MemoryRouter>
      <CardShelf heading={HEADING} products={products} />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: "Product List" })
  ).toBeInTheDocument();
});

test("renders correct number of product links", () => {
  render(
    <MemoryRouter>
      <CardShelf heading={HEADING} products={products} />
    </MemoryRouter>
  );

  expect(screen.getAllByRole("link")).toHaveLength(products.length);
});

test("creates proper links and images for each product", () => {
  render(
    <MemoryRouter>
      <CardShelf heading={HEADING} products={products} />
    </MemoryRouter>
  );

  products.forEach((product) => {
    expect(
      screen.getByRole("link", { name: formatProductText(product.title) })
    ).toHaveAttribute("href", `/store/${product.id}`);
    expect(screen.getByTestId(`product-${product.id}-image`)).toHaveAttribute(
      "src",
      product.image
    );
  });
});

test("shows no products when empty array is provided", () => {
  render(
    <MemoryRouter>
      <CardShelf heading={HEADING} products={[]} />
    </MemoryRouter>
  );

  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});

test("displays category empty state message", () => {
  render(
    <MemoryRouter>
      <CardShelf heading={HEADING} products={[]} />
    </MemoryRouter>
  );

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
  render(
    <MemoryRouter>
      <CardShelf heading={HEADING} products={products} isSearch={true} />
    </MemoryRouter>
  );

  expect(
    screen.getByText(`${products.length} results found`)
  ).toBeInTheDocument();
});

test("displays search empty state message when no results found", () => {
  render(
    <MemoryRouter>
      <CardShelf heading={HEADING} products={[]} isSearch={true} />
    </MemoryRouter>
  );

  expect(screen.queryByText(/results found/i)).not.toBeInTheDocument();
  expect(screen.getByText("Sorry, no matches were found.")).toBeInTheDocument();
  expect(
    screen.getByText("Try a new search or use our suggestions.")
  ).toBeInTheDocument();
});
