import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { formatProductText, toTitleCase } from "../utils/utils";
import { products, featuredProducts } from "../__fixtures__/data";
import Home from "./Home";

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: () => ({ products }),
  };
});

test("displays featured products (highest rated per category)", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getAllByRole("link", { name: /learn more/i })).toHaveLength(
    featuredProducts.length
  );

  featuredProducts.forEach((product) => {
    const formattedTitle = formatProductText(product.title);
    const formattedCategory = toTitleCase(product.category);

    expect(
      screen.getByRole("heading", { name: formattedTitle })
    ).toBeInTheDocument();
    expect(screen.getByText(formattedCategory)).toBeInTheDocument();
    expect(
      screen.getByTestId(`product-image-${product.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: `Learn more, ${formattedTitle}` })
    ).toHaveAttribute("href", `/store/${product.id}`);
  });
});
