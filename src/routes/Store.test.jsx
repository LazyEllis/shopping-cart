import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { products, productsByCategory, categories } from "../__fixtures__/data";
import Store from "./Store";

vi.mock("../components/CardShelf", () => ({
  default: ({ heading, products, isSearch }) => (
    <div data-testid="card-shelf">
      <h2>{heading}</h2>
      <div data-testid="products-count">{products.length}</div>
      {isSearch && <div data-testid="is-search">Search Results</div>}
      <div data-testid="products">
        {products.map((product) => (
          <div key={product.id} data-testid="product">
            {product.title}
          </div>
        ))}
      </div>
    </div>
  ),
}));

// Mock useOutletContext to return products
vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => ({ products }),
  };
});

test("renders store header and subtitle", () => {
  render(
    <MemoryRouter>
      <Store />
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: "Store." })).toBeInTheDocument();
  expect(
    screen.getByText("Everything you desire, all in one place.")
  ).toBeInTheDocument();
});

test("displays all categories when no search params are provided", () => {
  render(
    <MemoryRouter>
      <Store />
    </MemoryRouter>
  );

  const cardShelves = screen.getAllByTestId("card-shelf");
  expect(cardShelves.length).toBe(categories.length);

  categories.forEach((category) => {
    expect(screen.getByText(category)).toBeInTheDocument();
  });
});

test("filters products by category when category param is provided", () => {
  const category = products[0].category;
  const expectedProducts = products.filter(
    (product) => product.category === category
  );

  render(
    <MemoryRouter initialEntries={[`/?category=${category}`]}>
      <Store />
    </MemoryRouter>
  );

  expect(screen.getAllByTestId("card-shelf")).toHaveLength(1);
  expect(screen.getByText(category)).toBeInTheDocument();
  expect(screen.getByTestId("products-count")).toHaveTextContent(
    expectedProducts.length
  );
  expectedProducts.forEach((product) => {
    expect(screen.getByText(product.title)).toBeInTheDocument();
  });
});

test("filters products by search term when search param is provided", () => {
  const searchTerm = "test";

  render(
    <MemoryRouter initialEntries={[`/?search=${searchTerm}`]}>
      <Store />
    </MemoryRouter>
  );

  expect(screen.getAllByTestId("card-shelf")).toHaveLength(1);
  expect(screen.getByText(searchTerm)).toBeInTheDocument();
  expect(screen.getByTestId("is-search")).toBeInTheDocument();
  expect(screen.getByText("Search Results")).toBeInTheDocument();
});

test("displays correct products for each category in default view", () => {
  render(
    <MemoryRouter>
      <Store />
    </MemoryRouter>
  );

  Object.entries(productsByCategory).forEach(([category, categoryProducts]) => {
    expect(screen.getByText(category)).toBeInTheDocument();

    categoryProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });
});
