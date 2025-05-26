import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatProductText, formatCurrency, toTitleCase } from "../utils/utils";
import { products } from "../__fixtures__/data";
import Product from "./Product";

const product = products[0];

const formattedTitle = formatProductText(product.title);
const formattedCategory = toTitleCase(product.category);
const formattedPrice = formatCurrency(product.price);

const handleAddToBag = vi.fn();

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: () => ({ products, handleAddToBag }),
    useParams: () => ({ productId: product.id }),
  };
});

test("displays product details", () => {
  handleAddToBag.mockReset();

  render(
    <MemoryRouter>
      <Product />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: `Buy ${formattedTitle}` })
  ).toBeInTheDocument();
  expect(
    within(screen.getByRole("banner")).getByText(formattedCategory)
  ).toBeInTheDocument();
  expect(screen.getByText(`From ${formattedPrice}`)).toBeInTheDocument();
  expect(screen.getByText(product.description)).toBeInTheDocument();
});

test("calls onClick when product is added to bag", async () => {
  handleAddToBag.mockReset();
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Product />
    </MemoryRouter>
  );

  const addButton = screen.getByRole("button", { name: /add to bag/i });

  await user.click(addButton);

  expect(handleAddToBag).toHaveBeenCalledWith(product.id);
});
